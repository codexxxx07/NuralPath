import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Plus, Send } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { MaterialTag } from "../../components/skeuo/Surfaces";
import { cn } from "../../lib/utils";

const STORE_KEY = "nuralpath-doubts";
const CATEGORIES = ["DSA", "VLSI", "SystemVerilog", "Career", "Other"];

const emptyForm = { title: "", category: "DSA", body: "", code: "" };

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [composing, setComposing] = useState(false);
  const [filter, setFilter] = useState("All");
  const [replyText, setReplyText] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      setDoubts(JSON.parse(localStorage.getItem(STORE_KEY) || "[]"));
    } catch {
      setDoubts([]);
    }
  }, []);

  const persist = (next) => {
    setDoubts(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      setStatus("Could not write to browser storage.");
    }
  };

  const ask = () => {
    if (!form.title.trim() || !form.body.trim()) {
      setStatus("A title and description are required.");
      return;
    }
    const entry = {
      id: `doubt-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      body: form.body.trim(),
      code: form.code.trim(),
      resolved: false,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    persist([entry, ...doubts]);
    setForm(emptyForm);
    setComposing(false);
    setStatus("Question posted to this browser's wall.");
  };

  const reply = (id) => {
    const text = (replyText[id] || "").trim();
    if (!text) return;
    persist(
      doubts.map((d) =>
        d.id === id
          ? { ...d, replies: [...d.replies, { id: `r-${Date.now()}`, text, at: new Date().toISOString() }] }
          : d
      )
    );
    setReplyText({ ...replyText, [id]: "" });
  };

  const toggleResolved = (id) => {
    persist(doubts.map((d) => (d.id === id ? { ...d, resolved: !d.resolved } : d)));
  };

  const remove = (id) => persist(doubts.filter((d) => d.id !== id));

  const visible = doubts.filter((d) => filter === "All" || d.category === filter);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Doubts wall"
          meta="Classroom board"
          title="Pin the question; leave with a next step."
          description="Questions and replies are stored in this browser. There is no shared backend and no fabricated answer count — every reply shown was actually written here."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Community", to: "/community" }, { label: "Doubts" }]}
          actions={
            <button
              type="button"
              onClick={() => setComposing((c) => !c)}
              className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
            >
              <Plus className="h-4 w-4" /> {composing ? "Close form" : "Ask a question"}
            </button>
          }
        />

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-[4px] border px-2.5 py-1 text-xs transition-colors",
                filter === c
                  ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto self-center text-[11px] text-muted-foreground">
            {doubts.filter((d) => !d.resolved).length} open · {doubts.filter((d) => d.resolved).length} resolved
          </span>
        </div>

        {composing ? (
          <div className="paper mt-4 rounded-lg p-4 shadow-[var(--shadow-sm)] sm:p-5">
            <h2 className="font-display text-lg text-foreground">Ask precisely</h2>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              State the goal, what you tried, and what actually happened. A minimal reproduction is worth
              more than a paragraph of context.
            </p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-[1fr_160px]">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Question title"
                aria-label="Question title"
                className="h-9 text-sm"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                aria-label="Question category"
                className="field h-9 rounded-[4px] px-2 text-xs"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={4}
              placeholder="What are you trying to do? What did you expect? What happened instead?"
              aria-label="Question description"
              className="mt-2.5 text-sm"
            />
            <Textarea
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              rows={4}
              placeholder="Optional: paste code or a command. Plain text only; images cannot be uploaded."
              aria-label="Code or command"
              className="mt-2.5 font-mono text-xs"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={ask}
                className="btn-ink btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium"
              >
                <Send className="h-3.5 w-3.5" /> Post question
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setComposing(false);
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              {status ? <span className="text-[11px] text-muted-foreground">{status}</span> : null}
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {visible.map((d) => (
            <article
              key={d.id}
              className={cn(
                "paper relative rounded-lg p-4 shadow-[var(--shadow-sm)]",
                d.resolved && "opacity-90"
              )}
            >
              <span
                className={cn(
                  "absolute -top-1.5 left-4 h-3.5 w-14 rotate-[-2deg]",
                  d.resolved
                    ? "bg-[color-mix(in_srgb,var(--color-highlight-green)_80%,transparent)]"
                    : "bg-[color-mix(in_srgb,var(--color-highlight-yellow)_80%,transparent)]"
                )}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-2">
                <MaterialTag tone={d.resolved ? "green" : "yellow"}>
                  {d.resolved ? "Resolved" : "Open"}
                </MaterialTag>
                <MaterialTag>{d.category}</MaterialTag>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {new Date(d.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="mt-2 text-sm font-semibold leading-snug text-foreground">{d.title}</h2>
              <p className="mt-1 whitespace-pre-wrap text-[12.5px] leading-relaxed text-muted-foreground">{d.body}</p>
              {d.code ? (
                <pre className="code-block mt-2 max-h-40 overflow-auto rounded-[4px] p-2.5 text-[11px] leading-relaxed">
                  <code>{d.code}</code>
                </pre>
              ) : null}

              {d.replies.length ? (
                <ul className="mt-2.5 space-y-1.5 border-t border-border/70 pt-2.5">
                  {d.replies.map((r) => (
                    <li key={r.id} className="rounded-[3px] bg-[var(--color-paper-warm)] px-2.5 py-1.5">
                      <p className="text-[12px] leading-relaxed text-foreground/90">{r.text}</p>
                      <p className="mt-0.5 text-[9.5px] text-muted-foreground">
                        {new Date(r.at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MessageSquare className="h-3 w-3" /> No replies yet.
                </p>
              )}

              <div className="mt-2.5 flex gap-1.5">
                <Input
                  value={replyText[d.id] || ""}
                  onChange={(e) => setReplyText({ ...replyText, [d.id]: e.target.value })}
                  placeholder="Write a reply…"
                  aria-label={`Reply to ${d.title}`}
                  className="h-8 text-xs"
                />
                <button
                  type="button"
                  onClick={() => reply(d.id)}
                  className="btn-paper grid h-8 w-8 shrink-0 place-items-center rounded-[4px]"
                  aria-label="Send reply"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleResolved(d.id)}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {d.resolved ? "Reopen" : "Mark resolved"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(d.id)}
                  className="text-[11px] text-muted-foreground hover:text-[var(--color-destructive)]"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {!visible.length ? (
          <div className="mt-5 rounded-lg border border-dashed border-border px-5 py-12 text-center">
            <MessageSquare className="mx-auto h-6 w-6 text-muted-foreground/50" />
            <p className="mt-2 text-sm font-medium text-foreground">The wall is empty</p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Ask the first question. It will be saved in this browser so you can return to it.
            </p>
          </div>
        ) : null}

        <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
          Attachments are plain text only. Image and file upload require backend storage, which this
          build does not include.
        </p>
      </Container>
    </div>
  );
}
