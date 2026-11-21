import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, Save } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, StickyNote } from "../../components/skeuo/Surfaces";
import { mockInterviewSets } from "../../data/learningData";
import { cn } from "../../lib/utils";

const STORE_KEY = "nuralpath-mock-sessions";
const RATINGS = ["Weak", "Okay", "Strong"];

export default function MockInterviewsPage() {
  const [setId, setSetId] = useState(null);
  const [index, setIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [savedMessage, setSavedMessage] = useState("");

  const set = mockInterviewSets.find((s) => s.id === setId);

  useEffect(() => {
    try {
      setSessions(JSON.parse(localStorage.getItem(STORE_KEY) || "[]"));
    } catch {
      setSessions([]);
    }
  }, []);

  useEffect(() => {
    if (!set) return undefined;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [set]);

  const start = (id) => {
    setSetId(id);
    setIndex(0);
    setRatings({});
    setNotes({});
    setSeconds(0);
    setSavedMessage("");
  };

  const finish = () => {
    if (!set) return;
    const rated = Object.values(ratings);
    const entry = {
      id: `session-${Date.now()}`,
      setId: set.id,
      title: set.title,
      date: new Date().toISOString(),
      seconds,
      rated: rated.length,
      total: set.questions.length,
      strong: rated.filter((r) => r === "Strong").length,
      okay: rated.filter((r) => r === "Okay").length,
      weak: rated.filter((r) => r === "Weak").length,
    };
    const next = [entry, ...sessions].slice(0, 12);
    setSessions(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
      setSavedMessage("Session saved in this browser.");
    } catch {
      setSavedMessage("Could not save to browser storage.");
    }
  };

  if (set) {
    const q = set.questions[index];
    const rated = Object.values(ratings).filter(Boolean).length;
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    return (
      <div className="min-h-screen">
        <Container className="max-w-3xl py-8 sm:py-10">
          <button
            type="button"
            onClick={() => setSetId(null)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Leave session
          </button>

          <div className="metal mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2">
            <span className="font-mono text-[11px] uppercase tracking-widest">
              {set.category} · practice room
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
            </span>
          </div>

          <div className="paper mt-3 rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
              <div>
                <h1 className="font-display text-2xl text-foreground">{set.title}</h1>
                <p className="mt-1 text-xs text-muted-foreground">
                  {set.questions.length} questions · suggested {set.minutes} min
                </p>
              </div>
              <MaterialTag tone="brass">Self-review</MaterialTag>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Question {index + 1} of {set.questions.length}</span>
              <span>{rated} rated</span>
            </div>

            <div className="ruled mt-3 min-h-24 rounded-md border border-border px-4 py-4 pl-8">
              <p className="text-base font-medium leading-7 text-foreground">{q}</p>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Answer aloud or write your outline. There is no AI evaluator on this page — rate yourself
              honestly and record what you want to improve.
            </p>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Your rating
              </p>
              <div className="mt-1.5 flex gap-1.5">
                {RATINGS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRatings({ ...ratings, [index]: r })}
                    className={cn(
                      "rounded-[3px] border px-3 py-1.5 text-xs transition-colors",
                      ratings[index] === r
                        ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-3 flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Notes for next time
              <textarea
                value={notes[index] || ""}
                onChange={(e) => setNotes({ ...notes, [index]: e.target.value })}
                rows={3}
                placeholder="What would you add, tighten or change?"
                className="field mt-1 rounded-[4px] px-3 py-2 text-sm font-normal normal-case tracking-normal"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
              {index < set.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setIndex((i) => i + 1)}
                  className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs"
                >
                  Next question <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finish}
                  className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs"
                >
                  <Save className="h-3.5 w-3.5" /> Finish and save
                </button>
              )}
            </div>

            {savedMessage ? (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-[#3f6b4e]">
                <Check className="h-3.5 w-3.5" /> {savedMessage}
              </p>
            ) : null}

            <div className="mt-4 rounded-md border border-border bg-[var(--color-paper-warm)] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Session notes so far
              </p>
              <ul className="mt-1.5 space-y-1">
                {Object.entries(notes)
                  .filter(([, v]) => v.trim())
                  .map(([k, v]) => (
                    <li key={k} className="text-[12px] leading-relaxed text-muted-foreground">
                      <span className="font-mono text-[10px] text-foreground">Q{Number(k) + 1}:</span> {v}
                    </li>
                  ))}
                {!Object.values(notes).some((v) => v.trim()) ? (
                  <li className="text-[12px] text-muted-foreground">No notes yet.</li>
                ) : null}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="leather"
          eyebrow="Mock interviews"
          meta="Self-review"
          title="Practise the room before you enter it."
          description="Structured question sets with a timer and your own written review. No invented AI feedback and no simulated scores."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Career" }, { label: "Mock interviews" }]}
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {mockInterviewSets.map((s) => (
            <div key={s.id} className="paper flex flex-col rounded-xl p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2">
                <MaterialTag tone="brass">{s.category}</MaterialTag>
                <span className="font-mono text-[10px] text-muted-foreground">{s.minutes} min</span>
              </div>
              <h2 className="mt-3 font-display text-xl text-foreground">{s.title}</h2>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-[11px] text-muted-foreground">{s.questions.length} questions · {s.level}</p>
              <button
                type="button"
                onClick={() => start(s.id)}
                className="btn-ink btn-tactile mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium"
              >
                Start session
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="paper rounded-xl p-5 shadow-[var(--shadow-sm)]">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl text-foreground">Past sessions</h2>
              {sessions.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setSessions([]);
                    localStorage.removeItem(STORE_KEY);
                  }}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" /> Clear history
                </button>
              ) : null}
            </div>
            {sessions.length ? (
              <ul className="mt-3 divide-y divide-border/70">
                {sessions.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs">
                    <span>
                      <span className="font-medium text-foreground">{s.title}</span>
                      <span className="ml-2 text-muted-foreground">
                        {new Date(s.date).toLocaleDateString()} · {Math.floor(s.seconds / 60)} min
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      {s.rated}/{s.total} rated · {s.strong} strong / {s.okay} okay / {s.weak} weak
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No sessions recorded yet. Your self-ratings will appear here after you finish a set.
              </p>
            )}
            <p className="mt-3 text-[10px] text-muted-foreground">Stored in this browser only.</p>
          </div>

          <StickyNote tone="pink">
            <p className="font-hand text-xl leading-6">
              Recording yourself is uncomfortable and unreasonably effective.
            </p>
          </StickyNote>
        </div>
      </Container>
    </div>
  );
}
