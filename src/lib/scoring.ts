import type { Dataset, Party, Question, Topic } from './schema';

/**
 * Scoring model.
 *
 * Three properties matter, and a naive "count which party the user picked most"
 * has none of them:
 *
 *  1. Questions where every party wants the same thing carry no information
 *     about the user, so they must not move the ranking. Each question is
 *     therefore weighted by its DISCRIMINATING POWER, computed from how spread
 *     out the parties actually are across the options (Simpson diversity,
 *     normalised so an even spread scores 1 and unanimity scores 0). This is
 *     derived from the data, never hand-authored.
 *
 *  2. The user cares about some topics more than others, so each topic carries
 *     a user-declared importance multiplier.
 *
 *  3. Parties are scored INDEPENDENTLY per question rather than one winner
 *     taking the point. That is what lets the same computation produce a full
 *     ranking, a percentage adherence, and the agreement/conflict lists.
 *
 * A party that stays silent on a question is excluded from that question's
 * denominator rather than scored zero — otherwise vagueness would be rewarded.
 * `coverage` reports how much of the user's answered set a party actually had
 * positions on, so silence stays visible instead of being laundered into a
 * high score.
 */

export type Importance = 'high' | 'normal' | 'low';

export const IMPORTANCE_WEIGHT: Record<Importance, number> = {
  high: 2,
  normal: 1,
  low: 0.33,
};

/** `null` means the user skipped; 'none' means they rejected every option. */
export type Answer = string | 'none' | null;

export interface UserResponses {
  /** questionId -> chosen optionId, 'none', or null for skipped. */
  answers: Record<string, Answer>;
  /** topicId -> how much the user says it matters. Defaults to 'normal'. */
  importance: Record<string, Importance>;
}

export interface QuestionBreakdown {
  questionId: string;
  topicId: string;
  /** 1 exact match, 0.5 partial, 0 disagreement. */
  agreement: number;
  /** Weight this question carried for this user. */
  weight: number;
  chosenOptionId: string;
  partyOptionId: string | null;
}

export interface PartyResult {
  partyId: string;
  /**
   * 1-based competition rank. Parties with the same score share a rank, so a
   * three-way tie is three parties at rank 1 followed by rank 4. Presenting a
   * tie as an ordered list would dress up the alphabetical tie-break as a real
   * difference in alignment.
   */
  rank: number;
  /** True when at least one other party shares this rank. */
  tied: boolean;
  /** 0-1. Weighted agreement over questions where the party has a position. */
  score: number;
  /** Same as `score`, rounded to a whole percentage for display. */
  percentage: number;
  /** 0-1. Share of the user's answered questions the party had a position on. */
  coverage: number;
  /** Number of questions that actually contributed to `score`. */
  scoredQuestions: number;
  agreements: QuestionBreakdown[];
  conflicts: QuestionBreakdown[];
  breakdown: QuestionBreakdown[];
}

export interface Results {
  /** Highest score first. Ties broken by coverage, then party id for stability. */
  ranking: PartyResult[];
  /** Questions the user actually answered (not skipped). */
  answeredCount: number;
  /** True when too little was answered for the ranking to mean anything. */
  insufficientData: boolean;
}

/** Minimum answered questions before we are willing to show a ranking. */
export const MIN_ANSWERS_FOR_RESULTS = 3;

/**
 * How spread out the parties are across a question's options, in [0, 1].
 * 0 = every party takes the same option (question tells us nothing about the
 * user), 1 = parties are spread evenly across all available options.
 */
export function discriminatingPower(question: Question): number {
  const stated = question.positions.filter(
    (p) => p.stance === 'maps_to_option' && p.optionId,
  );
  const n = stated.length;
  const k = question.options.length;
  if (n < 2 || k < 2) return 0;

  const counts = new Map<string, number>();
  for (const p of stated) {
    counts.set(p.optionId!, (counts.get(p.optionId!) ?? 0) + 1);
  }

  let sumSquares = 0;
  for (const c of counts.values()) {
    const share = c / n;
    sumSquares += share * share;
  }

  const diversity = 1 - sumSquares;
  const maxDiversity = 1 - 1 / k;
  if (maxDiversity <= 0) return 0;
  return Math.max(0, Math.min(1, diversity / maxDiversity));
}

/**
 * How well a party's plan matches the option the user picked.
 * `null` means "not comparable" — the party has no stated position — and the
 * question is dropped from that party's denominator.
 */
export function agreementFor(
  question: Question,
  partyId: string,
  chosenOptionId: string,
): number | null {
  const position = question.positions.find((p) => p.partyId === partyId);
  if (!position || position.stance === 'no_stated_position') return null;
  if (position.optionId === chosenOptionId) return 1;
  if (position.partialMatch.includes(chosenOptionId)) return 0.5;
  return 0;
}

function findTopicOf(topics: Topic[], questionId: string): Topic | undefined {
  return topics.find((t) => t.questions.some((q) => q.id === questionId));
}

export function computeResults(dataset: Dataset, responses: UserResponses): Results {
  const allQuestions: Array<{ question: Question; topic: Topic }> = [];
  for (const topic of dataset.topics) {
    for (const question of topic.questions) {
      allQuestions.push({ question, topic });
    }
  }

  let answeredCount = 0;
  for (const { question } of allQuestions) {
    const a = responses.answers[question.id];
    // 'none' counts as engagement but contributes no weight to any party.
    if (a !== null && a !== undefined) answeredCount += 1;
  }

  const ranking: PartyResult[] = dataset.parties.map((party: Party) => {
    let weightedSum = 0;
    let weightTotal = 0;
    let answeredWithPosition = 0;
    let answeredScorable = 0;
    const breakdown: QuestionBreakdown[] = [];

    for (const { question, topic } of allQuestions) {
      const chosen = responses.answers[question.id];
      if (chosen === null || chosen === undefined || chosen === 'none') continue;

      answeredScorable += 1;

      const agreement = agreementFor(question, party.id, chosen);
      if (agreement === null) continue;
      answeredWithPosition += 1;

      const importance = responses.importance[topic.id] ?? 'normal';
      const weight = IMPORTANCE_WEIGHT[importance] * discriminatingPower(question);
      if (weight <= 0) continue;

      weightedSum += weight * agreement;
      weightTotal += weight;

      const position = question.positions.find((p) => p.partyId === party.id);
      breakdown.push({
        questionId: question.id,
        topicId: topic.id,
        agreement,
        weight,
        chosenOptionId: chosen,
        partyOptionId: position?.optionId ?? null,
      });
    }

    const score = weightTotal > 0 ? weightedSum / weightTotal : 0;
    const heaviestFirst = (a: QuestionBreakdown, b: QuestionBreakdown) =>
      b.weight - a.weight;

    return {
      partyId: party.id,
      rank: 0, // assigned after sorting
      tied: false,
      score,
      percentage: Math.round(score * 100),
      coverage: answeredScorable > 0 ? answeredWithPosition / answeredScorable : 0,
      scoredQuestions: breakdown.length,
      agreements: breakdown.filter((b) => b.agreement === 1).sort(heaviestFirst),
      conflicts: breakdown.filter((b) => b.agreement === 0).sort(heaviestFirst),
      breakdown,
    };
  });

  ranking.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.coverage !== a.coverage) return b.coverage - a.coverage;
    return a.partyId.localeCompare(b.partyId);
  });

  // Competition ranking: equal scores share a rank, and the next distinct
  // score skips ahead. Scores are floats, so compare with a tolerance.
  const SAME = 1e-9;
  ranking.forEach((result, i) => {
    const prev = ranking[i - 1];
    result.rank = prev && Math.abs(result.score - prev.score) < SAME ? prev.rank : i + 1;
  });
  for (const result of ranking) {
    result.tied = ranking.some(
      (other) => other !== result && other.rank === result.rank,
    );
  }

  return {
    ranking,
    answeredCount,
    insufficientData: answeredCount < MIN_ANSWERS_FOR_RESULTS,
  };
}

/** Look up a topic for a question id — used by the results view. */
export function topicForQuestion(dataset: Dataset, questionId: string): Topic | undefined {
  return findTopicOf(dataset.topics, questionId);
}
