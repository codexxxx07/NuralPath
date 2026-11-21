import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, FileText, RotateCcw, X } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, StickyNote } from "../../components/skeuo/Surfaces";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { quizzes } from "../../data/learningData";
import { cn } from "../../lib/utils";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function QuizRunner({ quiz, onExit }) {
  const [answers, setAnswers] = useState(() => new Array(quiz.questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(quiz.minutes * 60);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return undefined;
    if (remaining <= 0) {
      setSubmitted(true);
      return undefined;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, submitted]);

  const answeredCount = answers.filter((a) => a !== null).length;

  const score = useMemo(
    () => quiz.questions.reduce((n, q, i) => (answers[i] === q.answer ? n + 1 : n), 0),
    [answers, quiz.questions]
  );

  const q = quiz.questions[current];
  const timeLow = remaining < 60;

  if (submitted) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="mx-auto max-w-3xl">
        <div className="paper rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Result summary
              </p>
              <h1 className="mt-1 font-display text-2xl text-foreground">{quiz.title}</h1>
            </div>
            <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-[var(--color-wood)] bg-[var(--color-paper-warm)] font-mono text-lg font-semibold text-foreground">
              {pct}%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md border border-border p-3">
              <p className="font-mono text-xl text-foreground">{score}</p>
              <p className="text-[11px] text-muted-foreground">Correct</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="font-mono text-xl text-foreground">{quiz.questions.length - score}</p>
              <p className="text-[11px] text-muted-foreground">Incorrect</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="font-mono text-xl text-foreground">{answeredCount}</p>
              <p className="text-[11px] text-muted-foreground">Answered</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {quiz.questions.map((item, i) => {
              const chosen = answers[i];
              const correct = chosen === item.answer;
              return (
                <div key={item.q} className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                        correct ? "bg-[#4f7d5f] text-white" : "bg-[var(--color-destructive)] text-white"
                      )}
                    >
                      {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {i + 1}. {item.q}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Your answer: <span className="font-medium text-foreground">{chosen === null ? "Not answered" : item.options[chosen]}</span>
                    {!correct ? (
                      <>
                        {" · "}Correct: <span className="font-medium text-foreground">{item.options[item.answer]}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-1.5 rounded-[3px] bg-[var(--color-paper-warm)] px-2.5 py-1.5 text-xs leading-relaxed text-muted-foreground">
                    {item.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => { setAnswers(new Array(quiz.questions.length).fill(null)); setCurrent(0); setRemaining(quiz.minutes * 60); setSubmitted(false); }}>
              <RotateCcw className="h-4 w-4" /> Retake paper
            </Button>
            <Button variant="outline" onClick={onExit}>
              <ArrowLeft className="h-4 w-4" /> All quizzes
            </Button>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Results are not saved or shared. Retaking starts a fresh paper.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Exam header strip */}
      <div className="metal mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-widest">NuralPath · examination paper</span>
        <span className={cn("flex items-center gap-1.5 font-mono text-xs", timeLow && "text-[var(--color-destructive)]")}>
          <Clock className="h-3.5 w-3.5" /> {formatTime(remaining)}
        </span>
      </div>

      <div className="paper rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-double border-border pb-3">
          <div>
            <h1 className="font-display text-2xl text-foreground">{quiz.title}</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {quiz.subject} · {quiz.level} · {quiz.questions.length} questions
            </p>
          </div>
          <div className="text-right text-[11px] text-muted-foreground">
            <p>Total marks: {quiz.questions.length}</p>
            <p>One mark per question</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span>Question {current + 1} of {quiz.questions.length}</span>
          <span>{answeredCount} answered</span>
        </div>

        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--color-paper-deep)]">
          <div
            className="h-full bg-[var(--color-wood)] transition-[width] duration-300"
            style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="mt-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-muted-foreground">Q{current + 1}.</span>
            <h2 className="text-lg font-medium leading-snug text-foreground">{q.q}</h2>
          </div>

          <div className="mt-4 space-y-2">
            {q.options.map((option, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    const next = [...answers];
                    next[current] = i;
                    setAnswers(next);
                  }}
                  aria-pressed={selected}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                    selected
                      ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-medium text-foreground shadow-[inset_2px_0_0_var(--color-wood)]"
                      : "border-border bg-[var(--color-card)] text-foreground/85 hover:border-[var(--color-wood)]/60"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold",
                      selected ? "border-[var(--color-wood)] bg-[var(--color-wood)] text-white" : "border-border text-muted-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs disabled:opacity-40"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Previous
          </button>
          <div className="flex items-center gap-1.5">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to question ${i + 1}`}
                aria-current={i === current}
                className={cn(
                  "h-6 w-6 rounded-[3px] border font-mono text-[10px] transition-colors",
                  i === current
                    ? "border-[var(--color-wood)] bg-[var(--color-wood)] text-white"
                    : answers[i] !== null
                      ? "border-[#4f7d5f] bg-[color-mix(in_srgb,#4f7d5f_18%,transparent)] text-foreground"
                      : "border-border text-muted-foreground"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {current < quiz.questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.min(quiz.questions.length - 1, c + 1))}
              className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs"
            >
              Next <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs"
            >
              Submit paper
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <button type="button" onClick={onExit} className="text-xs text-muted-foreground hover:text-foreground">
            ← Leave without submitting
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Submit now
          </button>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit this paper?</DialogTitle>
            <DialogDescription>
              {answeredCount} of {quiz.questions.length} questions are answered. Unanswered questions are
              marked incorrect. You can review before submitting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Keep working
            </Button>
            <Button
              onClick={() => {
                setConfirmOpen(false);
                setSubmitted(true);
              }}
            >
              Submit and mark
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function QuizzesPage() {
  const [activeId, setActiveId] = useState(null);
  const active = quizzes.find((q) => q.id === activeId);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        {!active ? (
          <>
            <PageHeader
              accent="brass"
              eyebrow="Examination room"
              meta={`${quizzes.length} papers`}
              title="Quizzes marked like an exam paper."
              description="Fixed time, one mark per question, explanations after submission. Nothing is scored into a public profile."
              breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn", to: "/quizzes" }, { label: "Quizzes" }]}
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="paper relative overflow-hidden rounded-xl p-5 shadow-[var(--shadow-card)]">
                  <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[var(--color-wood-light)] to-[var(--color-wood-dark)]" />
                  <div className="flex items-start justify-between gap-3">
                    <MaterialTag tone="brass">{quiz.subject}</MaterialTag>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {quiz.minutes} min
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl text-foreground">{quiz.title}</h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{quiz.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {quiz.questions.length} questions · {quiz.level}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveId(quiz.id)}
                      className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium"
                    >
                      <FileText className="h-3.5 w-3.5" /> Start paper
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_260px]">
              <div className="rounded-lg border border-border bg-[var(--color-paper-warm)] p-4">
                <h2 className="text-sm font-semibold text-foreground">How marking works</h2>
                <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  <li>• One mark per correct answer; nothing is deducted for a wrong answer.</li>
                  <li>• Leaving a question blank counts as incorrect in the summary.</li>
                  <li>• The timer submits the paper automatically when it reaches zero.</li>
                  <li>• Explanations appear only after submission.</li>
                </ul>
              </div>
              <StickyNote tone="pink">
                <p className="font-hand text-xl leading-6">
                  Attempt first. Explanations are a check, not a shortcut.
                </p>
              </StickyNote>
            </div>
          </>
        ) : (
          <QuizRunner quiz={active} onExit={() => setActiveId(null)} />
        )}
      </Container>
    </div>
  );
}
