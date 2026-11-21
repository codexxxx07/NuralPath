import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/ui/input";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, StickyNote } from "../../components/skeuo/Surfaces";
import { dsaPracticeProblems } from "../../data/dsaTopics";

const STATUS_KEY = "nuralpath-problem-log";
const STATUSES = ["Not started", "Attempted", "Solved"];

const DIFFICULTY_TONE = { Easy: "green", Medium: "yellow", Hard: "pink" };

export default function DsaPracticePage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [difficulty, setDifficulty] = useState("All levels");
  const [log, setLog] = useState({});
  const [open, setOpen] = useState(null);

  useEffect(() => {
    try {
      setLog(JSON.parse(localStorage.getItem(STATUS_KEY) || "{}"));
    } catch {
      setLog({});
    }
  }, []);

  const setStatus = (title, status) => {
    const next = { ...log, [title]: status };
    setLog(next);
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const topics = ["All topics", ...new Set(dsaPracticeProblems.map((p) => p.topic))];
  const levels = ["All levels", "Easy", "Medium", "Hard"];

  const filtered = useMemo(
    () =>
      dsaPracticeProblems.filter((p) => {
        const matchesQuery =
          !query ||
          `${p.title} ${p.pattern} ${p.prompt}`.toLowerCase().includes(query.toLowerCase());
        return (
          matchesQuery &&
          (topic === "All topics" || p.topic === topic) &&
          (difficulty === "All levels" || p.difficulty === difficulty)
        );
      }),
    [query, topic, difficulty]
  );

  const solved = Object.values(log).filter((s) => s === "Solved").length;
  const attempted = Object.values(log).filter((s) => s === "Attempted").length;

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="blue"
          eyebrow="Problem set"
          meta={`${dsaPracticeProblems.length} prompts`}
          title="Practice, filtered the way you think."
          description="Written prompts grouped by topic, difficulty and pattern. Your progress log lives in this browser — it records only what you mark, never invented solved counts."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "DSA", to: "/dsa" }, { label: "Practice" }]}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, patterns or keywords…"
            aria-label="Search practice problems"
            className="h-10"
          />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Filter by topic"
            className="field h-10 rounded-md px-2 text-sm"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Filter by difficulty"
            className="field h-10 rounded-md px-2 text-sm"
          >
            {levels.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {dsaPracticeProblems.length}</span>
          <span className="h-3 w-px bg-border" />
          <span>Your log: {solved} solved · {attempted} attempted</span>
        </div>

        <div className="mt-5 space-y-2.5">
          {filtered.map((p) => {
            const status = log[p.title] || "Not started";
            const isOpen = open === p.title;
            return (
              <div key={p.title} className="paper rounded-lg shadow-[var(--shadow-sm)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.title)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{p.title}</span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      {p.topic} · {p.pattern}
                    </span>
                  </span>
                  <MaterialTag tone={DIFFICULTY_TONE[p.difficulty]}>{p.difficulty}</MaterialTag>
                  <MaterialTag tone={status === "Solved" ? "green" : status === "Attempted" ? "yellow" : "paper"}>
                    {status}
                  </MaterialTag>
                </button>
                {isOpen ? (
                  <div className="animate-fade-in border-t border-border/70 px-4 py-3">
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{p.prompt}</p>
                    <p className="mt-2 rounded-[3px] bg-[color-mix(in_srgb,var(--color-highlight-yellow)_38%,transparent)] px-2.5 py-1.5 text-xs leading-relaxed text-foreground">
                      <span className="font-semibold">Hint:</span> {p.hint}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(p.title, s)}
                          className={`rounded-[3px] border px-2.5 py-1 text-[11px] transition-colors ${
                            status === s
                              ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Mark {s.toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          {!filtered.length ? (
            <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              No problems match these filters.
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <StickyNote tone="pink" className="max-w-md">
            <p className="font-hand text-xl leading-6">
              Log honestly. &ldquo;Attempted&rdquo; is useful information — a fake &ldquo;solved&rdquo; is not.
            </p>
          </StickyNote>
          <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground">
            There is no code execution or judge on this page. Write and run your solution in your own
            editor, then record the outcome here.
          </p>
        </div>
      </Container>
    </div>
  );
}
