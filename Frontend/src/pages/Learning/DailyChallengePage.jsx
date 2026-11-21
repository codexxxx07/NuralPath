import { useEffect, useMemo, useState } from "react";
import { Check, CalendarDays, X } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, StickyNote } from "../../components/skeuo/Surfaces";
import { dailyChallenges } from "../../data/learningData";
import { cn } from "../../lib/utils";

const STORE_KEY = "nuralpath-daily-challenges";
const DAY_MS = 86400000;

const isoDate = (d) => d.toISOString().slice(0, 10);

function dayIndex(date) {
  const start = Date.UTC(2026, 0, 1);
  return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / DAY_MS);
}

export default function DailyChallengePage() {
  const today = useMemo(() => new Date(), []);
  const index = dayIndex(today);
  const challenge = dailyChallenges[((index % dailyChallenges.length) + dailyChallenges.length) % dailyChallenges.length];
  const todayKey = isoDate(today);

  const [log, setLog] = useState({});
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      setLog(stored);
      const entry = stored[todayKey];
      if (entry) {
        setChoice(entry.choice ?? null);
        setChecked(true);
      }
    } catch {
      setLog({});
    }
  }, [todayKey]);

  const save = (entry) => {
    const next = { ...log, [todayKey]: entry };
    setLog(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const submit = () => {
    if (choice === null) return;
    setChecked(true);
    save({ choice, correct: choice === challenge.answer });
  };

  const wasCorrect = choice !== null && choice === challenge.answer;

  const previous = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (i + 1) * DAY_MS);
    const key = isoDate(d);
    return {
      key,
      date: d,
      completed: Boolean(log[key]),
      correct: log[key]?.correct,
    };
  });

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="brass"
          eyebrow="Daily challenge"
          meta="One task a day"
          title="Today's page on the study calendar."
          description="A single question, a short explanation, and a record of what you actually completed. Challenges rotate on a ten-day cycle."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn" }, { label: "Daily challenge" }]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Calendar page */}
          <div className="print-sheet paper relative overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between gap-3 border-b border-border bg-[var(--color-paper-warm)] px-5 py-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Study calendar
                </p>
                <p className="mt-1 font-display text-2xl text-foreground">
                  {today.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="text-right">
                <span className="block font-mono text-4xl leading-none text-[var(--color-wood)]">
                  {String(today.getDate()).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {today.toLocaleDateString(undefined, { month: "short" })}
                </span>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-center gap-2">
                <MaterialTag tone="brass">{challenge.subject}</MaterialTag>
                <MaterialTag>{challenge.topic}</MaterialTag>
                <MaterialTag tone={challenge.difficulty === "Hard" ? "pink" : challenge.difficulty === "Medium" ? "yellow" : "green"}>
                  {challenge.difficulty}
                </MaterialTag>
              </div>

              <h2 className="mt-3 font-display text-2xl leading-snug text-foreground">{challenge.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{challenge.instructions}</p>

              <div className="ruled mt-4 rounded-md border border-border px-4 py-3 pl-8">
                <p className="text-sm font-medium leading-relaxed text-foreground">{challenge.question}</p>
              </div>

              <div className="mt-4 space-y-2">
                {challenge.options.map((option, i) => {
                  const selected = choice === i;
                  const isCorrect = checked && i === challenge.answer;
                  const isWrongChoice = checked && selected && i !== challenge.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={checked}
                      onClick={() => setChoice(i)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                        isCorrect
                          ? "border-[#4f7d5f] bg-[color-mix(in_srgb,#4f7d5f_14%,transparent)] font-medium"
                          : isWrongChoice
                            ? "border-[var(--color-destructive)] bg-[color-mix(in_srgb,var(--color-destructive)_8%,transparent)]"
                            : selected
                              ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-medium"
                              : "border-border bg-[var(--color-card)] hover:border-[var(--color-wood)]/60"
                      )}
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current/30 font-mono text-[10px]">
                        {isCorrect ? <Check className="h-3 w-3" /> : isWrongChoice ? <X className="h-3 w-3" /> : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-foreground/90">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {!checked ? (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={choice === null}
                    className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium disabled:opacity-40"
                  >
                    Check answer
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {wasCorrect ? (
                      <><Check className="h-4 w-4 text-[#4f7d5f]" /> Correct</>
                    ) : (
                      <><X className="h-4 w-4 text-[var(--color-destructive)]" /> Not quite</>
                    )}
                  </span>
                )}
                {checked ? (
                  <span className="text-[11px] text-muted-foreground">
                    Saved for {todayKey} in this browser.
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground">One attempt is recorded per day.</span>
                )}
              </div>

              {checked ? (
                <div className="mt-3 animate-fade-in rounded-md border border-border bg-[var(--color-paper-warm)] px-3 py-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explanation</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-foreground">{challenge.explanation}</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Side rail */}
          <aside className="space-y-4">
            <div className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[var(--color-wood)]" />
                <h2 className="text-sm font-semibold text-foreground">Previous days</h2>
              </div>
              <ul className="mt-3 space-y-1.5">
                {previous.map((p) => (
                  <li key={p.key} className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {p.date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    {!p.completed ? (
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">No record</span>
                    ) : p.correct ? (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-[#3f6b4e]">
                        <Check className="h-3 w-3" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-destructive)]">
                        <X className="h-3 w-3" /> Attempted
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-border/70 pt-2 text-[10px] leading-relaxed text-muted-foreground">
                Only challenges you opened and checked appear here. Unvisited days show “No record”.
              </p>
            </div>

            <StickyNote tone="yellow" taped>
              <p className="font-hand text-xl leading-6">
                Ten minutes every day beats six hours once a week.
              </p>
            </StickyNote>

            <div className="rounded-lg border border-border bg-[var(--color-paper-warm)] p-4">
              <h3 className="text-sm font-semibold text-foreground">A fair record</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                There are no streaks or completion percentages on this page unless you actually recorded
                them. Missing a day is simply missing a day.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
