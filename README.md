# Frelection

A comparator for the 2027 French presidential election. Users answer questions
about **specific measures the parties actually propose** — not "more or less
immigration" — and get a ranked alignment profile with their strongest
agreements and sharpest conflicts.

Current state: **vertical slice**. One topic (immigration, 6 questions × 8
parties) fully built end to end, so the cost and shape of the content work is
known before the remaining topics are committed to.

## Running it

```bash
npm install
npm run dev        # local dev server
npm run test       # scoring maths + dataset integrity
npm run build      # type-check and build the static site
```

## Design decisions worth knowing

**No backend, ever.** Responses are political opinions, which are Article 9
special-category data under the GDPR. The site is fully static, scoring runs in
the browser, and there is no account, database, or analytics on answers. Share
links encode results in the URL fragment, which is never sent to a server. This
is not just caution: the 2022 app *Elyze* was pulled into a CNIL review within
weeks over exactly this, and a design where the data never exists is far cheaper
to defend than one where it is protected by policy.

**Parties are the primary key, candidates are a mutable attribute.** The PS
designates on 2026-10-10 and the unified-left primary runs 2026-10-11; several
`candidate` fields are expected to change. Keying the dataset on candidates
would orphan half of it in October.

**Unsourced positions cannot ship.** `src/lib/schema.ts` rejects any position
that asserts a plan without at least one source, and `dataset.test.ts` enforces
full party coverage, valid option references, comparable summary lengths across
parties, and that no question is unanimous. These run in CI because they are the
project's defence if it is accused of bias.

**Silence is not disagreement.** A party with no established position on a
question is excluded from that question's denominator rather than scored zero,
and the UI reports each party's *coverage* so vagueness stays visible instead of
being laundered into a high score.

**Consensus questions carry zero weight.** Each question's weight is derived
from how far apart the parties actually are across the options (normalised
Simpson diversity), so a question everyone agrees on cannot move the ranking.
See `src/lib/scoring.ts`.

## Content review workflow

The dataset ships as `status: 'draft_unverified'` and the site shows a warning
banner while it does. Every source carries `verified: false` until a human opens
the URL and confirms the quote appears there.

To promote the dataset to reviewed:

1. Work through `src/data/topics/*.ts`, checking each `quote` against its `url`.
2. Flip that source's `verified` to `true`.
3. Once all are verified, set `status: 'reviewed'` in `src/data/index.ts`.

The schema refuses to parse a `reviewed` dataset that still contains an
unverified source, so the banner cannot be removed prematurely.

## Known gaps

- Quotes are drafted from the cited sources but **not yet verified verbatim**.
- Full 2027 platforms mostly do not exist yet. Positions currently lean on 2024
  legislative platforms, tabled bills, and votes on the 26 January 2024
  immigration law.
- Only one topic is built. Remaining candidates for coverage: cost of living,
  pensions, health, security and justice, education, climate and energy,
  institutions, Europe and defence, taxation, housing, agriculture.
- No `mentions légales` page yet — legally required before a public launch in
  France.

## Structure

```
src/
  data/
    parties.ts              party metadata + inclusion criteria
    topics/immigration.ts   the one built topic, every cell sourced
    index.ts                schema-validated dataset snapshot
  lib/
    schema.ts               Zod schema; enforces sourcing and bilinguality
    scoring.ts              weighting and alignment computation
    i18n.ts                 UI chrome strings (content is bilingual in-place)
  components/Quiz.tsx       blind quiz + reveal toggle + results
  pages/[lang]/             FR and EN routes
```
