import { useMemo, useState } from 'react';
import { dataset, partyById } from '../data';
import { ui } from '../lib/i18n';
import type { Lang, Party, Position, Question, Topic } from '../lib/schema';
import {
  computeResults,
  IMPORTANCE_WEIGHT,
  type Answer,
  type Importance,
  type PartyResult,
  type QuestionBreakdown,
  type UserResponses,
} from '../lib/scoring';

interface Props {
  lang: Lang;
}

interface Flat {
  question: Question;
  topic: Topic;
}

const flatQuestions: Flat[] = dataset.topics.flatMap((topic) =>
  topic.questions.map((question) => ({ question, topic })),
);

/** Options are shuffled deterministically per question so ordering carries no signal. */
function displayOrder(question: Question): Question['options'] {
  const seed = [...question.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const opts = [...question.options];
  const offset = seed % opts.length;
  return [...opts.slice(offset), ...opts.slice(0, offset)];
}

function partiesFor(question: Question, optionId: string): Party[] {
  return question.positions
    .filter((p) => p.optionId === optionId)
    .map((p) => partyById.get(p.partyId))
    .filter((p): p is Party => Boolean(p));
}

function PartyChip({ party }: { party: Party }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-white px-2 py-0.5 text-xs font-medium"
      title={party.name.fr}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: party.color }}
        aria-hidden="true"
      />
      {party.shortName}
    </span>
  );
}

function SourceList({ position, t }: { position: Position; t: typeof ui.fr }) {
  if (position.sources.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1 text-xs text-ink/55">
      {position.sources.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-ink/20 underline-offset-2 hover:decoration-ink/60"
          >
            {s.publisher} — {s.title}
          </a>{' '}
          <span className="whitespace-nowrap text-ink/40">
            ({s.date}
            {!s.verified && `, ${t.unverified}`})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Quiz({ lang }: Props) {
  const t = ui[lang];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [importance, setImportance] = useState<Record<string, Importance>>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const responses: UserResponses = useMemo(
    () => ({ answers, importance }),
    [answers, importance],
  );
  const results = useMemo(() => computeResults(dataset, responses), [responses]);

  const current = flatQuestions[index];
  const isLast = index === flatQuestions.length - 1;

  function choose(optionId: Answer) {
    setAnswers((prev) => ({ ...prev, [current.question.id]: optionId }));
    if (isLast) setFinished(true);
    else setIndex((i) => i + 1);
  }

  function restart() {
    setAnswers({});
    setImportance({});
    setIndex(0);
    setFinished(false);
    setCopied(false);
  }

  async function share() {
    // Result state travels in the URL fragment, which is never sent to a
    // server. That is deliberate: it is the only way to make results
    // shareable without ever holding someone's political opinions.
    const payload = btoa(
      encodeURIComponent(
        JSON.stringify({ v: dataset.version, a: answers, i: importance }),
      ),
    );
    const url = `${window.location.origin}${window.location.pathname}#r=${payload}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.share, url);
    }
  }

  if (finished) {
    return (
      <Results
        lang={lang}
        results={results}
        answers={answers}
        onRestart={restart}
        onShare={share}
        copied={copied}
      />
    );
  }

  const options = displayOrder(current.question);
  const topicImportance = importance[current.topic.id] ?? 'normal';

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-ink/45">
            {current.topic.title[lang]}
          </p>
          <p className="text-xs text-ink/45">
            {t.question} {index + 1} {t.of} {flatQuestions.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="rounded-full border border-edge bg-white px-3 py-1.5 text-xs font-medium hover:border-ink/40"
        >
          {revealed ? t.hide : t.reveal}
        </button>
      </div>

      <div
        className="mb-6 h-0.5 w-full overflow-hidden rounded bg-edge"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={flatQuestions.length}
      >
        <div
          className="h-full bg-ink transition-all duration-300"
          style={{ width: `${((index + 1) / flatQuestions.length) * 100}%` }}
        />
      </div>

      <h2 className="text-2xl font-semibold leading-snug">{current.question.prompt[lang]}</h2>
      <p className="mt-3 border-l-2 border-edge pl-4 text-sm leading-relaxed text-ink/60">
        {current.question.context[lang]}
      </p>

      {revealed && <p className="mt-3 text-xs italic text-ink/45">{t.revealHint}</p>}

      <div className="mt-7 grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const holders = partiesFor(current.question, option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              className="group flex flex-col rounded-lg border border-edge bg-white p-4 text-left transition hover:border-ink/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
            >
              <span className="font-semibold">{option.label[lang]}</span>
              <span className="mt-2 text-sm leading-relaxed text-ink/65">
                {option.detail[lang]}
              </span>
              {revealed && holders.length > 0 && (
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {holders.map((p) => (
                    <PartyChip key={p.id} party={p} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose('none')}
          className="rounded-lg border border-edge bg-white px-3 py-2 text-sm hover:border-ink/40"
        >
          {t.none}
        </button>
        <button
          type="button"
          onClick={() => choose(null)}
          className="rounded-lg px-3 py-2 text-sm text-ink/55 hover:text-ink"
        >
          {t.skip}
        </button>
        {index > 0 && (
          <button
            type="button"
            onClick={() => setIndex((i) => i - 1)}
            className="ml-auto rounded-lg px-3 py-2 text-sm text-ink/55 hover:text-ink"
          >
            ← {t.back}
          </button>
        )}
      </div>

      <fieldset className="mt-8 rounded-lg border border-edge bg-white/60 p-4">
        <legend className="px-2 text-xs uppercase tracking-widest text-ink/45">
          {t.importanceTitle}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(['high', 'normal', 'low'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() =>
                setImportance((prev) => ({ ...prev, [current.topic.id]: level }))
              }
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                topicImportance === level
                  ? 'border-ink bg-ink text-paper'
                  : 'border-edge bg-white hover:border-ink/40'
              }`}
            >
              {level === 'high'
                ? t.importanceHigh
                : level === 'normal'
                  ? t.importanceNormal
                  : t.importanceLow}
            </button>
          ))}
        </div>
      </fieldset>

      {Object.keys(answers).length > 0 && (
        <button
          type="button"
          onClick={() => setFinished(true)}
          className="mt-6 text-sm underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          {t.seeResults} →
        </button>
      )}
    </div>
  );
}

function findQuestion(questionId: string): Flat | undefined {
  return flatQuestions.find((f) => f.question.id === questionId);
}

function BreakdownRow({
  item,
  lang,
  partyId,
  t,
}: {
  item: QuestionBreakdown;
  lang: Lang;
  partyId: string;
  t: typeof ui.fr;
}) {
  const flat = findQuestion(item.questionId);
  if (!flat) return null;
  const position = flat.question.positions.find((p) => p.partyId === partyId);
  const chosen = flat.question.options.find((o) => o.id === item.chosenOptionId);

  return (
    <li className="border-t border-edge py-3 first:border-t-0">
      <p className="text-sm font-medium">{flat.question.prompt[lang]}</p>
      <p className="mt-1.5 text-xs text-ink/50">
        <span className="font-medium text-ink/70">{t.yourPick} :</span>{' '}
        {chosen?.label[lang] ?? '—'}
      </p>
      {position && position.stance === 'maps_to_option' && (
        <>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
            {position.summary[lang]}
          </p>
          <SourceList position={position} t={t} />
        </>
      )}
    </li>
  );
}

function Results({
  lang,
  results,
  answers,
  onRestart,
  onShare,
  copied,
}: {
  lang: Lang;
  results: ReturnType<typeof computeResults>;
  answers: Record<string, Answer>;
  onRestart: () => void;
  onShare: () => void;
  copied: boolean;
}) {
  const t = ui[lang];
  const [expanded, setExpanded] = useState<string | null>(
    results.ranking[0]?.partyId ?? null,
  );

  if (results.insufficientData) {
    return (
      <div className="rounded-lg border border-edge bg-white p-6">
        <p className="text-sm">{t.insufficient}</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 rounded-lg border border-edge px-3 py-2 text-sm hover:border-ink/40"
        >
          {t.restart}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">{t.results}</h2>
      <p className="mt-2 text-sm text-ink/55">{t.privacy}</p>

      <ol className="mt-6 space-y-3">
        {results.ranking.map((result: PartyResult, i) => {
          const party = partyById.get(result.partyId);
          if (!party) return null;
          const open = expanded === result.partyId;

          return (
            <li key={result.partyId} className="rounded-lg border border-edge bg-white">
              <button
                type="button"
                onClick={() => setExpanded(open ? null : result.partyId)}
                className="flex w-full items-center gap-4 p-4 text-left"
                aria-expanded={open}
              >
                <span
                  className="h-9 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: party.color }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-widest text-ink/45">
                    {t.rank[i] ?? `${i + 1}`}
                  </span>
                  <span className="block truncate font-semibold">{party.name[lang]}</span>
                  <span className="block truncate text-xs text-ink/50">
                    {party.candidate && party.candidate.status !== 'undesignated'
                      ? party.candidate.name
                      : t.candidateUndesignated}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-2xl font-semibold tabular-nums">
                    {result.percentage}%
                  </span>
                  <span className="block text-xs text-ink/45">{t.adherence}</span>
                </span>
              </button>

              <div className="px-4 pb-2">
                <div className="h-1 w-full overflow-hidden rounded bg-edge">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${result.percentage}%`,
                      backgroundColor: party.color,
                    }}
                  />
                </div>
                <p className="mt-2 pb-2 text-xs text-ink/45">
                  {t.coverage} {Math.round(result.coverage * 100)}% {t.ofAnswered}
                </p>
              </div>

              {open && (
                <div className="border-t border-edge px-4 py-4">
                  <h3 className="text-xs uppercase tracking-widest text-ink/45">
                    {t.agreementsTitle}
                  </h3>
                  {result.agreements.length > 0 ? (
                    <ul className="mt-2">
                      {result.agreements.map((item) => (
                        <BreakdownRow
                          key={item.questionId}
                          item={item}
                          lang={lang}
                          partyId={result.partyId}
                          t={t}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-ink/55">{t.noAgreements}</p>
                  )}

                  <h3 className="mt-6 text-xs uppercase tracking-widest text-ink/45">
                    {t.conflictsTitle}
                  </h3>
                  {result.conflicts.length > 0 ? (
                    <ul className="mt-2">
                      {result.conflicts.map((item) => (
                        <BreakdownRow
                          key={item.questionId}
                          item={item}
                          lang={lang}
                          partyId={result.partyId}
                          t={t}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-ink/55">{t.noConflicts}</p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onShare}
          className="rounded-lg border border-edge bg-white px-3 py-2 text-sm hover:border-ink/40"
        >
          {copied ? t.shared : t.share}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg px-3 py-2 text-sm text-ink/55 hover:text-ink"
        >
          {t.restart}
        </button>
      </div>
    </div>
  );
}
