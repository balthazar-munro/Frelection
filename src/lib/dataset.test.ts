import { describe, expect, it } from 'vitest';
import { dataset } from '../data';
import { discriminatingPower } from './scoring';

/**
 * Editorial integrity checks. These are the rules that make the comparator
 * defensible if someone accuses it of bias, so they run in CI, not by hand.
 */

const allQuestions = dataset.topics.flatMap((t) =>
  t.questions.map((q) => ({ topic: t, question: q })),
);

describe('dataset integrity', () => {
  it('parses against the schema', () => {
    expect(dataset.parties.length).toBeGreaterThan(1);
    expect(dataset.topics.length).toBeGreaterThan(0);
  });

  it('covers every party on every question', () => {
    for (const { topic, question } of allQuestions) {
      const covered = new Set(question.positions.map((p) => p.partyId));
      for (const party of dataset.parties) {
        expect(
          covered.has(party.id),
          `${topic.id}/${question.id} has no entry for "${party.id}" — every party needs a cell, even if it is no_stated_position`,
        ).toBe(true);
      }
    }
  });

  it('never references an option that does not exist', () => {
    for (const { topic, question } of allQuestions) {
      const ids = new Set(question.options.map((o) => o.id));
      for (const pos of question.positions) {
        if (pos.optionId) {
          expect(ids.has(pos.optionId), `${topic.id}/${question.id}/${pos.partyId}`).toBe(true);
        }
        for (const partial of pos.partialMatch) {
          expect(
            ids.has(partial),
            `${topic.id}/${question.id}/${pos.partyId} partialMatch "${partial}"`,
          ).toBe(true);
        }
      }
    }
  });

  it('never lists the party own option as a partial match', () => {
    for (const { topic, question } of allQuestions) {
      for (const pos of question.positions) {
        if (pos.optionId) {
          expect(
            pos.partialMatch.includes(pos.optionId),
            `${topic.id}/${question.id}/${pos.partyId} lists its own option as a partial match`,
          ).toBe(false);
        }
      }
    }
  });

  it('sources every asserted position', () => {
    for (const { topic, question } of allQuestions) {
      for (const pos of question.positions) {
        if (pos.stance === 'maps_to_option') {
          expect(
            pos.sources.length,
            `${topic.id}/${question.id}/${pos.partyId} asserts a plan with no source`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('treats parties even-handedly in summary length', () => {
    // Wildly uneven summary lengths read as bias even when the content is fair.
    // Allow a 2.5x spread between the shortest and longest summary per question.
    for (const { topic, question } of allQuestions) {
      const lengths = question.positions.map((p) => p.summary.fr.length);
      const min = Math.min(...lengths);
      const max = Math.max(...lengths);
      expect(
        max / min,
        `${topic.id}/${question.id} summary lengths range ${min}-${max} chars, which is lopsided enough to read as bias`,
      ).toBeLessThan(2.5);
    }
  });

  it('offers questions that actually discriminate between parties', () => {
    for (const { topic, question } of allQuestions) {
      expect(
        discriminatingPower(question),
        `${topic.id}/${question.id} is unanimous, so it cannot tell users anything`,
      ).toBeGreaterThan(0);
    }
  });

  it('uses every option it offers, or is honest that it does not', () => {
    // An option no party holds is fine (it can represent a coherent position
    // nobody currently takes) but it should be rare enough to be deliberate.
    for (const { topic, question } of allQuestions) {
      const taken = new Set(
        question.positions.filter((p) => p.optionId).map((p) => p.optionId!),
      );
      const unused = question.options.filter((o) => !taken.has(o.id));
      expect(
        unused.length,
        `${topic.id}/${question.id} has ${unused.length} options no party holds: ${unused
          .map((o) => o.id)
          .join(', ')}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  it('gives each party a visually distinct colour', () => {
    // Party colour is the only chromatic signal in the UI, so two parties
    // sharing one makes the reveal view and the results ranking ambiguous.
    const colors = dataset.parties.map((p) => p.color.toLowerCase());
    const duplicates = colors.filter((c, i) => colors.indexOf(c) !== i);
    expect(duplicates, `duplicate party colours: ${duplicates.join(', ')}`).toEqual([]);
  });

  it('keeps every party colour legible on both light and dark grounds', () => {
    // The site renders in the viewer's theme. A colour tuned only for paper
    // disappears on the dark surface, which is how Reconquête's original
    // near-black grey went invisible in dark mode.
    const luminance = (hex: string) => {
      const channel = (v: number) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      const r = channel(parseInt(hex.slice(1, 3), 16));
      const g = channel(parseInt(hex.slice(3, 5), 16));
      const b = channel(parseInt(hex.slice(5, 7), 16));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a: string, b: string) => {
      const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };

    const LIGHT_SURFACE = '#ffffff';
    const DARK_SURFACE = '#1c1f24';
    const MIN = 1.6;

    for (const party of dataset.parties) {
      expect(
        contrast(party.color, LIGHT_SURFACE),
        `${party.id} (${party.color}) is too faint on the light surface`,
      ).toBeGreaterThan(MIN);
      expect(
        contrast(party.color, DARK_SURFACE),
        `${party.id} (${party.color}) is too faint on the dark surface`,
      ).toBeGreaterThan(MIN);
    }
  });

  it('has unique ids throughout', () => {
    const partyIds = dataset.parties.map((p) => p.id);
    expect(new Set(partyIds).size).toBe(partyIds.length);

    const questionIds = allQuestions.map(({ question }) => question.id);
    expect(new Set(questionIds).size).toBe(questionIds.length);

    for (const { question } of allQuestions) {
      const optionIds = question.options.map((o) => o.id);
      expect(new Set(optionIds).size).toBe(optionIds.length);
    }
  });

  it('keeps the draft banner honest', () => {
    // If any source is unverified, the dataset must not claim to be reviewed.
    const anyUnverified = allQuestions.some(({ question }) =>
      question.positions.some((p) => p.sources.some((s) => !s.verified)),
    );
    if (anyUnverified) {
      expect(dataset.status).toBe('draft_unverified');
    }
  });
});
