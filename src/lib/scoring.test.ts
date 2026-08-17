import { describe, expect, it } from 'vitest';
import { datasetSchema, type Dataset } from './schema';
import {
  agreementFor,
  computeResults,
  discriminatingPower,
  type UserResponses,
} from './scoring';

const src = {
  url: 'https://example.org/programme',
  title: 'Programme',
  publisher: 'Test',
  type: 'programme' as const,
  date: '2026-01-01',
  quote: 'Une citation.',
  verified: false,
};

const loc = (s: string) => ({ fr: s, en: s });

function makeParty(id: string) {
  return {
    id,
    name: loc(id),
    shortName: id.toUpperCase(),
    family: 'centre' as const,
    color: '#123456',
    candidate: null,
    inclusionReason: loc('test'),
  };
}

/** A question where `mapping` says which option each party takes. */
function makeQuestion(
  id: string,
  optionIds: string[],
  mapping: Record<string, string | null>,
  partial: Record<string, string[]> = {},
) {
  return {
    id,
    prompt: loc('prompt'),
    context: loc('context'),
    options: optionIds.map((o) => ({ id: o, label: loc(o), detail: loc(o) })),
    positions: Object.entries(mapping).map(([partyId, optionId]) => ({
      partyId,
      stance: optionId === null ? ('no_stated_position' as const) : ('maps_to_option' as const),
      optionId,
      partialMatch: partial[partyId] ?? [],
      summary: loc('summary'),
      sources: optionId === null ? [] : [src],
      confidence: 'high' as const,
    })),
  };
}

function makeDataset(questions: ReturnType<typeof makeQuestion>[], partyIds: string[]): Dataset {
  return datasetSchema.parse({
    status: 'draft_unverified',
    version: 'test',
    updatedAt: '2026-01-01',
    parties: partyIds.map(makeParty),
    topics: [
      {
        id: 'topic',
        title: loc('topic'),
        intro: loc('intro'),
        questions,
      },
    ],
  });
}

const respond = (answers: Record<string, string | null>): UserResponses => ({
  answers,
  importance: {},
});

describe('discriminatingPower', () => {
  it('is 0 when every party takes the same option', () => {
    const q = makeQuestion('q', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'a' });
    expect(discriminatingPower(q)).toBe(0);
  });

  it('is 1 when parties are spread evenly across all options', () => {
    const q = makeQuestion('q', ['a', 'b'], { p1: 'a', p2: 'b' });
    expect(discriminatingPower(q)).toBeCloseTo(1, 10);
  });

  it('sits between the extremes for a lopsided split', () => {
    const q = makeQuestion('q', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'a', p4: 'b' });
    const d = discriminatingPower(q);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(1);
  });

  it('ignores parties with no stated position', () => {
    const spread = makeQuestion('q', ['a', 'b'], { p1: 'a', p2: 'b' });
    const withSilent = makeQuestion('q', ['a', 'b'], { p1: 'a', p2: 'b', p3: null });
    expect(discriminatingPower(withSilent)).toBeCloseTo(discriminatingPower(spread), 10);
  });
});

describe('agreementFor', () => {
  const q = makeQuestion('q', ['a', 'b', 'c'], { p1: 'a', p2: 'b', p3: null }, { p2: ['a'] });

  it('gives full credit for an exact match', () => {
    expect(agreementFor(q, 'p1', 'a')).toBe(1);
  });

  it('gives half credit for a declared partial match', () => {
    expect(agreementFor(q, 'p2', 'a')).toBe(0.5);
  });

  it('gives no credit for a genuine disagreement', () => {
    expect(agreementFor(q, 'p1', 'c')).toBe(0);
  });

  it('returns null — not zero — when the party has no stated position', () => {
    expect(agreementFor(q, 'p3', 'a')).toBeNull();
  });
});

describe('computeResults', () => {
  it('ranks the party matching every answer first', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q3', ['a', 'b'], { p1: 'a', p2: 'b' }),
      ],
      ['p1', 'p2'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: 'a', q3: 'a' }));
    expect(results.ranking[0].partyId).toBe('p1');
    expect(results.ranking[0].percentage).toBe(100);
    expect(results.ranking[1].percentage).toBe(0);
  });

  it('gives a consensus question no influence on the ranking', () => {
    // q2 is unanimous, so answering against it must not change anything.
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'a' }),
      ],
      ['p1', 'p2'],
    );
    const withConsensusAgreed = computeResults(ds, respond({ q1: 'a', q2: 'a' }));
    const withConsensusOpposed = computeResults(ds, respond({ q1: 'a', q2: 'b' }));
    expect(withConsensusAgreed.ranking[0].percentage).toBe(
      withConsensusOpposed.ranking[0].percentage,
    );
    expect(withConsensusAgreed.ranking[0].partyId).toBe('p1');
  });

  it('weights a high-importance topic above a low-importance one', () => {
    const ds = datasetSchema.parse({
      status: 'draft_unverified',
      version: 'test',
      updatedAt: '2026-01-01',
      parties: ['p1', 'p2'].map(makeParty),
      topics: [
        {
          id: 'cares',
          title: loc('cares'),
          intro: loc('i'),
          questions: [makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' })],
        },
        {
          id: 'shrugs',
          title: loc('shrugs'),
          intro: loc('i'),
          questions: [makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'b' })],
        },
      ],
    });

    // Agrees with p2 on the topic they care about, p1 on the one they don't.
    const results = computeResults(ds, {
      answers: { q1: 'b', q2: 'a' },
      importance: { cares: 'high', shrugs: 'low' },
    });
    expect(results.ranking[0].partyId).toBe('p2');
  });

  it('excludes silent parties from their own denominator rather than scoring them 0', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'b', p2: null }),
      ],
      ['p1', 'p2'],
    );
    const results = computeResults(ds, respond({ q1: 'b', q2: 'b' }));
    const p2 = results.ranking.find((r) => r.partyId === 'p2')!;
    // p2 agreed on its only answerable question, so 100% — but coverage shows
    // it only had a position on half of what the user answered.
    expect(p2.percentage).toBe(100);
    expect(p2.coverage).toBe(0.5);
    expect(p2.scoredQuestions).toBe(1);
  });

  it('treats "none of these" as engagement that scores nobody', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'b' }),
      ],
      ['p1', 'p2'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: 'none' as string }));
    expect(results.answeredCount).toBe(2);
    const p1 = results.ranking.find((r) => r.partyId === 'p1')!;
    expect(p1.scoredQuestions).toBe(1);
  });

  it('ignores skipped questions entirely', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'b' }),
      ],
      ['p1', 'p2'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: null }));
    expect(results.answeredCount).toBe(1);
    expect(results.insufficientData).toBe(true);
  });

  it('separates agreements from conflicts', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'b', p2: 'a' }),
        makeQuestion('q3', ['a', 'b'], { p1: 'a', p2: 'b' }),
      ],
      ['p1', 'p2'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: 'a', q3: 'a' }));
    const p1 = results.ranking.find((r) => r.partyId === 'p1')!;
    expect(p1.agreements.map((a) => a.questionId).sort()).toEqual(['q1', 'q3']);
    expect(p1.conflicts.map((c) => c.questionId)).toEqual(['q2']);
  });

  it('flags insufficient data below the answer threshold', () => {
    const ds = makeDataset([makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'b' })], ['p1', 'p2']);
    expect(computeResults(ds, respond({ q1: 'a' })).insufficientData).toBe(true);
  });

  it('gives tied parties the same rank instead of an arbitrary order', () => {
    // p1 and p2 hold identical positions, so a user agreeing with both must
    // not be told one of them is "closest" — that would dress the alphabetical
    // tie-break up as a real difference.
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
        makeQuestion('q3', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
      ],
      ['p1', 'p2', 'p3'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: 'a', q3: 'a' }));
    const byId = Object.fromEntries(results.ranking.map((r) => [r.partyId, r]));

    expect(byId.p1.rank).toBe(1);
    expect(byId.p2.rank).toBe(1);
    expect(byId.p1.tied).toBe(true);
    expect(byId.p2.tied).toBe(true);
  });

  it('skips ranks after a tie rather than renumbering', () => {
    const ds = makeDataset(
      [
        makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
        makeQuestion('q2', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
        makeQuestion('q3', ['a', 'b'], { p1: 'a', p2: 'a', p3: 'b' }),
      ],
      ['p1', 'p2', 'p3'],
    );
    const results = computeResults(ds, respond({ q1: 'a', q2: 'a', q3: 'a' }));
    const byId = Object.fromEntries(results.ranking.map((r) => [r.partyId, r]));
    // Two parties share rank 1, so the next distinct score is rank 3.
    expect(byId.p3.rank).toBe(3);
    expect(byId.p3.tied).toBe(false);
  });

  it('is deterministic when scores tie', () => {
    const ds = makeDataset([makeQuestion('q1', ['a', 'b'], { p1: 'a', p2: 'a' })], ['p1', 'p2']);
    const a = computeResults(ds, respond({ q1: 'a' })).ranking.map((r) => r.partyId);
    const b = computeResults(ds, respond({ q1: 'a' })).ranking.map((r) => r.partyId);
    expect(a).toEqual(b);
  });
});
