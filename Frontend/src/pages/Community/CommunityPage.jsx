import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Megaphone, MessageSquare, Send, Users } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { MaterialTag, StickyNote } from "../../components/skeuo/Surfaces";
import { cn } from "../../lib/utils";

const STORE_KEY = "nuralpath-community";
const TABS = ["Board", "Study groups", "Announcements", "Events", "Resources"];

const announcements = [
  {
    date: "2026-11-18",
    title: "DSA and VLSI libraries are open",
    body: "All seven DSA topics and nine VLSI topics are written, with roadmaps, practice prompts and printable cheat sheets.",
  },
  {
    date: "2026-11-10",
    title: "Notes and daily challenges have local storage",
    body: "Notes, roadmap progress and challenge records are saved in your browser. Nothing is synced to an account yet.",
  },
  {
    date: "2026-10-30",
    title: "Community board is a local prototype",
    body: "Posts you write here are visible only in this browser. A shared backend is not connected, so activity is not fabricated.",
  },
];

const events = [
  { date: "Weekly", title: "DSA problem circle", body: "Pick one pattern, solve two prompts, explain the invariant to each other.", place: "Community board thread" },
  { date: "Weekly", title: "RTL review hour", body: "Bring a module and a testbench. Review assignment style, resets and constraint coverage.", place: "Community board thread" },
  { date: "Monthly", title: "Project demo day", body: "Show what you built. No rankings, no pitch competition — feedback only.", place: "Community board thread" },
];

const resources = [
  { title: "DSA library", note: "Seven topics from arrays to dynamic programming.", to: "/dsa" },
  { title: "VLSI workstation", note: "Devices, CMOS, RTL, timing and verification.", to: "/vlsi" },
  { title: "Cheat sheets", note: "Printable DSA and VLSI references.", to: "/dsa/cheat-sheets" },
  { title: "Notes", note: "Your own notebook, saved in this browser.", to: "/notes" },
  { title: "Quizzes", note: "Timed exam-style papers with explanations.", to: "/quizzes" },
  { title: "Doubts wall", note: "Ask, reply and mark questions resolved.", to: "/doubts" },
];

export default function CommunityPage() {
  const [tab, setTab] = useState("Board");
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", kind: "Discussion" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      setPosts(JSON.parse(localStorage.getItem(STORE_KEY) || "[]"));
    } catch {
      setPosts([]);
    }
  }, []);

  const persist = (next) => {
    setPosts(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      setStatus("Could not write to browser storage.");
    }
  };

  const post = () => {
    if (!form.message.trim()) {
      setStatus("Write something before posting.");
      return;
    }
    const entry = {
      id: `post-${Date.now()}`,
      name: form.name.trim() || "Anonymous student",
      message: form.message.trim(),
      kind: tab === "Study groups" ? "Study group" : form.kind,
      createdAt: new Date().toISOString(),
    };
    persist([entry, ...posts]);
    setForm({ name: form.name, message: "", kind: form.kind });
    setStatus("Posted to this browser's board.");
  };

  const remove = (id) => {
    persist(posts.filter((p) => p.id !== id));
    setStatus("Post removed.");
  };

  const visible = posts.filter((p) =>
    tab === "Study groups" ? p.kind === "Study group" : tab === "Board" ? p.kind !== "Study group" : true
  );

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Community"
          meta="Local prototype"
          title="The classroom board, without invented activity."
          description="Discussions, study groups, announcements and shared resources. Posts are stored in this browser only; there is no shared backend, so the board starts empty on a new device."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Community" }]}
          actions={
            <Link
              to="/doubts"
              className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
            >
              Ask a doubt <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Community sections">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => {
                setTab(t);
                setStatus("");
              }}
              className={cn(
                "rounded-[4px] border px-3 py-1.5 text-xs transition-colors",
                tab === t
                  ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                  : "border-border bg-[var(--color-card)] text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {(tab === "Board" || tab === "Study groups") && (
          <div className="mt-5 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="paper h-fit rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <h2 className="font-display text-lg text-foreground">
                {tab === "Study groups" ? "Propose a study group" : "Post to the board"}
              </h2>
              <div className="mt-3 space-y-2.5">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name (optional)"
                  aria-label="Your name"
                  className="h-9 text-xs"
                />
                {tab === "Board" ? (
                  <select
                    value={form.kind}
                    onChange={(e) => setForm({ ...form, kind: e.target.value })}
                    aria-label="Post type"
                    className="field h-9 w-full rounded-[4px] px-2 text-xs"
                  >
                    <option>Discussion</option>
                    <option>Question</option>
                    <option>Resource</option>
                  </select>
                ) : null}
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder={
                    tab === "Study groups"
                      ? "What are you studying, and what would you like to work through together?"
                      : "Share a thought, a resource, or something you are stuck on."
                  }
                  aria-label="Post message"
                  className="text-xs"
                />
                <button
                  type="button"
                  onClick={post}
                  className="btn-ink btn-tactile inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-xs font-medium"
                >
                  <Send className="h-3.5 w-3.5" /> {tab === "Study groups" ? "Propose group" : "Post"}
                </button>
                {status ? <p className="text-[11px] text-muted-foreground">{status}</p> : null}
              </div>
              <p className="mt-3 border-t border-border/70 pt-2 text-[10px] leading-relaxed text-muted-foreground">
                Local only. Do not post anything private — this is a prototype board.
              </p>
            </div>

            <div className="space-y-2.5">
              {visible.length ? (
                visible.map((p) => (
                  <article key={p.id} className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-wood)] font-hand text-sm text-white">
                          {p.name.slice(0, 1).toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-foreground">{p.name}</span>
                        <MaterialTag>{p.kind}</MaterialTag>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(p.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-6 text-foreground/90">{p.message}</p>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="mt-2 text-[10px] text-muted-foreground hover:text-[var(--color-destructive)]"
                    >
                      Delete
                    </button>
                  </article>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-border px-5 py-12 text-center">
                  <MessageSquare className="mx-auto h-6 w-6 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-medium text-foreground">No posts in this browser yet</p>
                  <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                    {tab === "Study groups"
                      ? "There are no groups recorded here. Propose one with a focus and a rhythm."
                      : "The board starts empty by design. Write the first post; it will appear here after a reload too."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "Announcements" && (
          <div className="mt-5 space-y-3">
            {announcements.map((a) => (
              <article key={a.title} className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
                <div className="flex flex-wrap items-center gap-2">
                  <Megaphone className="h-4 w-4 text-[var(--color-wood)]" />
                  <h2 className="text-sm font-semibold text-foreground">{a.title}</h2>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {new Date(a.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{a.body}</p>
              </article>
            ))}
          </div>
        )}

        {tab === "Events" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {events.map((e) => (
              <div key={e.title} className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[var(--color-wood)]" />
                  <MaterialTag tone="brass">{e.date}</MaterialTag>
                </div>
                <h2 className="mt-2 text-sm font-semibold text-foreground">{e.title}</h2>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{e.body}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{e.place}</p>
              </div>
            ))}
            <p className="sm:col-span-3 text-[11px] text-muted-foreground">
              These are recurring community formats, not scheduled bookings. There is no ticketing or
              calendar integration on this build.
            </p>
          </div>
        )}

        {tab === "Resources" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link key={r.to + r.title} to={r.to} className="card-depth card-depth-hover group p-4">
                <h2 className="text-sm font-semibold text-foreground">{r.title}</h2>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{r.note}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-lg border border-border bg-[var(--color-paper-warm)] p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--color-wood)]" />
              <h2 className="text-sm font-semibold text-foreground">Peer learning, honestly</h2>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              A shared community needs accounts, moderation and a server. This build has none of those, so
              it does not pretend to. Use the board to draft posts and the doubts wall to practise asking
              precise questions.
            </p>
          </div>
          <StickyNote tone="yellow">
            <p className="font-hand text-xl leading-6">
              A good question includes what you tried and what actually happened.
            </p>
          </StickyNote>
        </div>
      </Container>
    </div>
  );
}
