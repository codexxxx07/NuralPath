import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookmarkCheck, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { LeatherPanel, ProgressMeter } from "./Surfaces";

/**
 * Roadmap as a leather-bound journal. Completion is stored per track in
 * localStorage — it reflects exactly the stages this learner marked, no more.
 */
export default function Roadmap({ stages, trackKey, title, subtitle, backTo, backLabel }) {
  const storageKey = `nuralpath-roadmap-${trackKey}`;
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(storageKey) || "{}"));
    } catch {
      setDone({});
    }
  }, [storageKey]);

  const toggle = (index) => {
    const next = { ...done, [index]: !done[index] };
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* storage unavailable — state still reflects this session */
    }
  };

  const completed = stages.filter((_, i) => done[i]).length;
  const percent = Math.round((completed / stages.length) * 100);
  const nextIndex = stages.findIndex((_, i) => !done[i]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <LeatherPanel className="overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            NuralPath · learning journal
          </span>
          <span className="h-2 w-2 rounded-full bg-[#d9c08b] shadow-[0_0_6px_rgba(217,192,139,0.8)]" />
        </div>
        <div className="px-5 py-7 sm:px-9 sm:py-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
            {backLabel || "Roadmap"}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-[#fbf3e4] sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{subtitle}</p>

          <div className="mt-6 rounded-lg border border-white/15 bg-black/20 p-4">
            <ProgressMeter value={percent} label={`${completed} of ${stages.length} stages marked`} tone="wood" />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-white/65">
                {nextIndex === -1
                  ? "All stages marked. Revisit any stage or move to interview practice."
                  : `Recommended next: ${stages[nextIndex].title}`}
              </p>
              {nextIndex !== -1 ? (
                <span className="bookmark-ribbon inline-flex h-7 items-center px-2 text-[10px] font-semibold">
                  next
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </LeatherPanel>

      <div className="relative mt-6 pl-6 sm:pl-10">
        <div className="roadmap-rail absolute bottom-4 left-[11px] top-2 w-px sm:left-[19px]" aria-hidden="true" />
        <ol className="space-y-4">
          {stages.map((stage, i) => {
            const isDone = Boolean(done[i]);
            const isNext = i === nextIndex;
            return (
              <li key={stage.stage} className="relative">
                <span
                  className={cn(
                    "absolute -left-6 top-5 grid h-[22px] w-[22px] place-items-center rounded-full border text-[10px] font-semibold sm:-left-10",
                    isDone
                      ? "border-[#4f7d5f] bg-[#4f7d5f] text-white"
                      : isNext
                        ? "border-[var(--color-brass)] bg-[var(--color-paper)] text-foreground shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brass)_25%,transparent)]"
                        : "border-border bg-[var(--color-paper)] text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {isDone ? <Check className="h-3 w-3" /> : i + 1}
                </span>

                <div
                  className={cn(
                    "paper rounded-lg p-4 shadow-[var(--shadow-sm)] transition-colors sm:p-5",
                    isNext && "border-[color-mix(in_srgb,var(--color-brass)_55%,var(--color-border))]"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {stage.stage}
                      </p>
                      <h2 className="mt-1 font-display text-xl text-foreground">{stage.title}</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-pressed={isDone}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-[4px] border px-2 py-1 text-[11px] transition-colors",
                        isDone
                          ? "border-[#4f7d5f] bg-[color-mix(in_srgb,#4f7d5f_14%,transparent)] font-medium text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isDone ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5" /> Done
                        </>
                      ) : (
                        "Mark complete"
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{stage.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stage.topics.map((t) => (
                      <Link
                        key={t.to + t.label}
                        to={t.to}
                        className="group inline-flex items-center gap-1 rounded-[3px] border border-border bg-[var(--color-card)] px-2 py-1 text-xs text-foreground hover:border-[var(--color-wood)]"
                      >
                        {t.label}
                        <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>

                  <p className="mt-3 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground/80">Prerequisite:</span> {stage.prerequisite}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link to={backTo} className="text-sm text-muted-foreground hover:text-foreground">
          ← {backLabel || "Back"}
        </Link>
        <p className="text-[11px] text-muted-foreground">
          Progress is saved in this browser only.
        </p>
      </div>
    </div>
  );
}
