import { useEffect, useMemo, useState } from "react";
import { Bookmark, Folder, Pin, Plus, Save, Search, Trash2 } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

const STORE_KEY = "nuralpath-notes";
const FOLDERS = ["General", "DSA", "VLSI", "Career"];

const emptyDraft = () => ({
  id: null,
  title: "",
  body: "",
  folder: "General",
  category: "",
  tags: "",
  pinned: false,
  createdAt: null,
  updatedAt: null,
});

const relative = (iso) => {
  if (!iso) return "not saved yet";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(iso).toLocaleDateString();
};

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [folder, setFolder] = useState("All");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      setNotes(Array.isArray(stored) ? stored : []);
    } catch {
      setNotes([]);
    }
  }, []);

  const persist = (next) => {
    setNotes(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
      return true;
    } catch {
      setStatus("Could not write to browser storage.");
      return false;
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes
      .filter((n) => (folder === "All" ? true : n.folder === folder))
      .filter((n) => !q || `${n.title} ${n.body} ${n.category} ${n.tags}`.toLowerCase().includes(q))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }, [notes, folder, query]);

  const openNote = (note) => {
    setDraft({ ...note, tags: Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "" });
    setStatus("");
    setConfirmDelete(false);
  };

  const newNote = () => {
    setDraft(emptyDraft());
    setStatus("");
    setConfirmDelete(false);
  };

  const save = () => {
    if (!draft.title.trim() && !draft.body.trim()) {
      setStatus("Add a title or some content before saving.");
      return;
    }
    const now = new Date().toISOString();
    const tags = draft.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    let next;
    let saved;
    if (draft.id) {
      saved = { ...draft, tags, updatedAt: now };
      next = notes.map((n) => (n.id === draft.id ? saved : n));
    } else {
      saved = { ...draft, id: `note-${Date.now()}`, tags, createdAt: now, updatedAt: now };
      next = [saved, ...notes];
    }
    if (persist(next)) {
      setDraft({ ...saved, tags: tags.join(", ") });
      setStatus(`Saved ${relative(now)}`);
    }
  };

  const remove = () => {
    if (!draft.id) {
      newNote();
      return;
    }
    persist(notes.filter((n) => n.id !== draft.id));
    setDraft(emptyDraft());
    setStatus("Note deleted from this browser.");
    setConfirmDelete(false);
  };

  const togglePin = () => {
    if (!draft.id) {
      setStatus("Save the note before pinning it.");
      return;
    }
    const saved = { ...draft, pinned: !draft.pinned, updatedAt: new Date().toISOString(), tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    persist(notes.map((n) => (n.id === draft.id ? saved : n)));
    setDraft({ ...saved, tags: saved.tags.join(", ") });
  };

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Notebook"
          meta="Saved in this browser"
          title="Your notes, in a notebook that stays open."
          description="Create, search and organise notes by folder, category and tag. Notes are written to this browser's local storage — they are not synced to an account or shared."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn" }, { label: "Notes" }]}
          actions={
            <button
              type="button"
              onClick={newNote}
              className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
            >
              <Plus className="h-4 w-4" /> New note
            </button>
          }
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[180px_280px_minmax(0,1fr)]">
          {/* Folders */}
          <aside className="paper h-fit rounded-lg p-3 shadow-[var(--shadow-sm)]">
            <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Folders
            </p>
            <ul className="space-y-0.5">
              {["All", ...FOLDERS].map((f) => {
                const count = f === "All" ? notes.length : notes.filter((n) => n.folder === f).length;
                return (
                  <li key={f}>
                    <button
                      type="button"
                      onClick={() => setFolder(f)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-[3px] px-2 py-1.5 text-left text-xs transition-colors",
                        folder === f
                          ? "bg-[var(--color-paper-deep)] font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-[var(--color-paper-warm)] hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        <Folder className="h-3.5 w-3.5" /> {f === "All" ? "All notes" : f}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Note list */}
          <section>
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes…"
                aria-label="Search notes"
                className="h-9 pl-8 text-xs"
              />
            </div>

            <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1" data-lenis-prevent>
              {filtered.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => openNote(note)}
                  className={cn(
                    "w-full rounded-md border px-3 py-2 text-left transition-colors",
                    draft.id === note.id
                      ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)]"
                      : "border-border bg-[var(--color-card)] hover:border-[var(--color-wood)]/60"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1 text-xs font-semibold text-foreground">
                      {note.title || "Untitled note"}
                    </span>
                    {note.pinned ? <Pin className="h-3 w-3 shrink-0 text-[var(--color-wood)]" /> : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                    {note.body || "No content yet."}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[9.5px] uppercase tracking-wider text-muted-foreground/80">
                    <span>{note.folder}</span>
                    <span>{relative(note.updatedAt)}</span>
                  </div>
                </button>
              ))}
              {!filtered.length ? (
                <div className="rounded-md border border-dashed border-border px-3 py-8 text-center">
                  <Bookmark className="mx-auto h-5 w-5 text-muted-foreground/60" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {notes.length ? "No notes match this filter." : "No notes yet. Start with a blank page."}
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          {/* Editor */}
          <section className="paper overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-[var(--color-paper-warm)] px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {draft.id ? `editing · ${relative(draft.updatedAt)}` : "new page"}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePin}
                  className={cn(
                    "flex h-7 items-center gap-1 rounded-[3px] border px-2 text-[10px]",
                    draft.pinned ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)]" : "border-border text-muted-foreground"
                  )}
                >
                  <Pin className="h-3 w-3" /> {draft.pinned ? "Pinned" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="btn-ink btn-tactile flex h-7 items-center gap-1 rounded-[3px] px-2 text-[10px]"
                >
                  <Save className="h-3 w-3" /> Save
                </button>
                {confirmDelete ? (
                  <span className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={remove}
                      className="flex h-7 items-center rounded-[3px] bg-[var(--color-destructive)] px-2 text-[10px] text-white"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="h-7 rounded-[3px] border border-border px-2 text-[10px] text-muted-foreground"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    aria-label="Delete note"
                    className="grid h-7 w-7 place-items-center rounded-[3px] border border-border text-muted-foreground hover:text-[var(--color-destructive)]"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Note title"
                aria-label="Note title"
                className="w-full border-b border-border bg-transparent pb-2 font-display text-xl text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-[var(--color-wood)]"
              />

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Folder
                  <select
                    value={draft.folder}
                    onChange={(e) => setDraft({ ...draft, folder: e.target.value })}
                    className="field h-8 rounded-[3px] px-1.5 text-xs normal-case tracking-normal"
                  >
                    {FOLDERS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Category
                  <input
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    placeholder="e.g. Revision"
                    className="field h-8 rounded-[3px] px-1.5 text-xs normal-case tracking-normal"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Tags
                  <input
                    value={draft.tags}
                    onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                    placeholder="trees, recursion"
                    className="field h-8 rounded-[3px] px-1.5 text-xs normal-case tracking-normal"
                  />
                </label>
              </div>

              <textarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                rows={14}
                placeholder="Write in your own words. The act of rewriting is the revision."
                aria-label="Note body"
                className="ruled mt-3 w-full resize-y rounded-[4px] border border-border px-4 py-3 pl-9 text-sm leading-7 text-foreground outline-none focus:border-[var(--color-wood)]"
              />

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] text-muted-foreground">{status || "Changes are not saved until you press Save."}</p>
                <p className="text-[10px] text-muted-foreground">
                  {draft.id ? `Created ${new Date(draft.createdAt).toLocaleDateString()}` : "New page"}
                </p>
              </div>
            </div>
          </section>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Local-only by design: clearing site data removes these notes. A synced notebook needs a backend,
          which this build does not include.
        </p>
      </Container>
    </div>
  );
}
