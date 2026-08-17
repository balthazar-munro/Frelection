import { datasetSchema, type Dataset } from '../lib/schema';
import { parties } from './parties';
import { immigration } from './topics/immigration';

/**
 * The dataset snapshot. Parsed through the schema at module load, so a
 * malformed or unsourced position fails the build rather than reaching a user.
 *
 * `version` is pinned into shared result links: if someone shares a result in
 * November and the data moves in February, the link still says which snapshot
 * it was computed against.
 */
const raw = {
  status: 'draft_unverified' as const,
  version: '2026.08.17-slice1',
  updatedAt: '2026-08-17',
  parties,
  topics: [immigration],
};

export const dataset: Dataset = datasetSchema.parse(raw);

export const partyById = new Map(dataset.parties.map((p) => [p.id, p]));
