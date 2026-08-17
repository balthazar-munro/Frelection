import { z } from 'zod';

/**
 * Content schema for the 2027 comparator.
 *
 * Two rules are enforced here rather than by convention, because they are the
 * two failure modes that would destroy the project's credibility:
 *
 *  1. A party position that asserts anything MUST carry at least one source
 *     with a verbatim quote. The only stance exempt from this is
 *     `no_stated_position`, which by definition asserts nothing.
 *  2. Every user-facing string is bilingual. A missing translation is a build
 *     error, not a runtime fallback to the other language.
 *
 * If you find yourself wanting to relax either rule to get a cell filled in,
 * the correct move is `no_stated_position` instead.
 */

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const localized = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
});
export type Localized = z.infer<typeof localized>;

/** Where a claim comes from. `quote` is always in the original French. */
export const sourceSchema = z.object({
  url: z.string().url(),
  /** Title of the document or article, as published. */
  title: z.string().min(1),
  /** Who published it — used to show source diversity on the reveal screen. */
  publisher: z.string().min(1),
  /**
   * programme  — the party's own platform document (strongest)
   * law        — text of a bill/law the party tabled or voted
   * vote       — a recorded parliamentary vote (scrutin public)
   * statement  — public declaration by the candidate or party leadership
   * press      — journalistic reporting summarising a position (weakest)
   */
  type: z.enum(['programme', 'law', 'vote', 'statement', 'press']),
  /** ISO date of the source itself, not of when we read it. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD'),
  /** The claim this source supports, in French. */
  quote: z.string().min(1),
  /**
   * True only once a human has opened the URL and confirmed `quote` appears
   * there verbatim. Drafting sets this to false; the review pass flips it.
   * A dataset cannot be marked `reviewed` while any source is unverified,
   * which is what makes the review gate real rather than aspirational.
   */
  verified: z.boolean().default(false),
});
export type Source = z.infer<typeof sourceSchema>;

export const partySchema = z.object({
  id: z.string().min(1),
  name: localized,
  shortName: z.string().min(1),
  /** Broad bloc, used only for neutral grouping in the reveal view. */
  family: z.enum([
    'gauche-radicale',
    'gauche',
    'ecologiste',
    'centre',
    'droite',
    'droite-nationale',
  ]),
  /** Hex colour, conventional for the party in French media. */
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  candidate: z
    .object({
      name: z.string().min(1),
      /**
       * declared     — has publicly announced
       * presumed     — widely expected, not announced
       * undesignated — party has not chosen yet (primary pending)
       */
      status: z.enum(['declared', 'presumed', 'undesignated']),
      /** When this candidate fact was last checked. */
      asOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      note: localized.optional(),
    })
    .nullable(),
  /** Why this party met the published inclusion threshold. */
  inclusionReason: localized,
});
export type Party = z.infer<typeof partySchema>;

/** One concrete policy plan a user can pick. Never a vague direction. */
export const optionSchema = z.object({
  id: z.string().min(1),
  /** Short label shown on the card. */
  label: localized,
  /** The actual mechanism: what would change, and how. */
  detail: localized,
});
export type Option = z.infer<typeof optionSchema>;

export const positionSchema = z
  .object({
    partyId: z.string().min(1),
    stance: z.enum(['maps_to_option', 'no_stated_position']),
    /** Which option this party's actual plan corresponds to. */
    optionId: z.string().nullable(),
    /**
     * Options that are a partial match for this party's plan. Scored at half
     * credit. Use sparingly — it exists for genuinely adjacent positions, not
     * to hedge weak research.
     */
    partialMatch: z.array(z.string()).default([]),
    /** Comprehensive but short: what they'd actually do. 2-4 sentences. */
    summary: localized,
    sources: z.array(sourceSchema).default([]),
    /**
     * high   — party's own programme or a recorded vote
     * medium — consistent reporting from multiple outlets
     * low    — inferred from adjacent statements; needs verification
     */
    confidence: z.enum(['high', 'medium', 'low']),
    /** Where the stated plan and the actual voting record diverge. */
    divergenceNote: localized.optional(),
  })
  .superRefine((pos, ctx) => {
    if (pos.stance === 'maps_to_option') {
      if (!pos.optionId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `position for "${pos.partyId}" maps to an option but has no optionId`,
        });
      }
      if (pos.sources.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `position for "${pos.partyId}" asserts a plan with no source — use no_stated_position instead`,
        });
      }
    }
    if (pos.stance === 'no_stated_position' && pos.optionId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `position for "${pos.partyId}" is no_stated_position but still sets optionId`,
      });
    }
  });
export type Position = z.infer<typeof positionSchema>;

export const questionSchema = z.object({
  id: z.string().min(1),
  /** The concrete question at stake, phrased without a preferred answer. */
  prompt: localized,
  /** Neutral framing: what the current law is, so options make sense. */
  context: localized,
  options: z.array(optionSchema).min(2),
  positions: z.array(positionSchema).min(1),
});
export type Question = z.infer<typeof questionSchema>;

export const topicSchema = z.object({
  id: z.string().min(1),
  title: localized,
  /** One paragraph on why this topic is contested in 2027. */
  intro: localized,
  questions: z.array(questionSchema).min(1),
});
export type Topic = z.infer<typeof topicSchema>;

export const datasetSchema = z.object({
  /**
   * draft_unverified — drafted from sources but not yet human-reviewed
   * reviewed         — a human has checked every cell against its sources
   */
  status: z.enum(['draft_unverified', 'reviewed']),
  /** Snapshot version. Shared result links pin to this. */
  version: z.string().min(1),
  /** When this snapshot was cut. */
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  parties: z.array(partySchema).min(2),
  topics: z.array(topicSchema).min(1),
})
  .superRefine((ds, ctx) => {
    if (ds.status !== 'reviewed') return;
    for (const topic of ds.topics) {
      for (const q of topic.questions) {
        for (const pos of q.positions) {
          for (const src of pos.sources) {
            if (!src.verified) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                  `dataset is marked "reviewed" but ${topic.id}/${q.id}/${pos.partyId} ` +
                  `cites an unverified source (${src.url})`,
              });
            }
          }
        }
      }
    }
  });
export type Dataset = z.infer<typeof datasetSchema>;
