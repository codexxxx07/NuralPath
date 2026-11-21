import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bookmark, Check, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "../../lib/utils";
import { MaterialTag, StickyNote } from "./Surfaces";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "concepts", label: "Concepts" },
  { id: "visual", label: "Visual explanation" },
  { id: "code", label: "Code examples" },
  { id: "complexity", label: "Complexity" },
  { id: "practice", label: "Practice" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "related", label: "Related topics" },
];

function useBookmark(slug) {
  const key = "nuralpath-bookmarks";
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      setSaved(list.includes(slug));
    } catch {
      setSaved(false);
    }
  }, [key, slug]);

  const toggle = () => {
    try {
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
      localStorage.setItem(key, JSON.stringify(next));
      setSaved(next.includes(slug));
    } catch {
      /* storage unavailable — the button simply stays inactive */
    }
  };

  return [saved, toggle];
}

function CodeBlock({ item }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <figure className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[var(--color-paper-warm)] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {item.lang}
          </span>
          <span className="truncate text-xs font-medium text-foreground">{item.title}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="btn-paper shrink-0 rounded-[3px] px-2 py-1 text-[10px] uppercase tracking-wider"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="code-block overflow-x-auto p-4">
        <pre className="text-[12.5px] leading-relaxed">
          <code>{item.code}</code>
        </pre>
      </div>
      {item.note ? (
        <figcaption className="border-t border-border bg-[var(--color-paper-warm)] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          {item.note}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function TopicLayout({
  topic,
  kind = "dsa",
  breadcrumbs,
  visual,
  diagram,
  prev,
  next,
}) {
  const [saved, toggleSaved] = useBookmark(`${kind}-${topic.slug}`);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {breadcrumbs.map((b, i) => (
          <span key={`${b.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <span className="text-muted-foreground/50">/</span> : null}
            {b.to ? (
              <Link to={b.to} className="link-underline hover:text-foreground">
                {b.label}
              </Link>
            ) : (
              <span className="text-foreground">{b.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-10">
        {/* Notebook margin with table of contents */}
        <aside className="no-print order-2 lg:order-1">
          <div className="lg:sticky lg:top-24">
            <div className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </p>
              <ol className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-baseline gap-2 rounded-[3px] px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-[var(--color-paper-warm)] hover:text-foreground"
                    >
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-4 border-t border-border/70 pt-3">
                <button
                  type="button"
                  onClick={toggleSaved}
                  aria-pressed={saved}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-[4px] border px-2 py-1.5 text-xs transition-colors",
                    saved
                      ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-medium text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-[var(--color-wood)]")} />
                  {saved ? "Saved to bookmarks" : "Bookmark this topic"}
                </button>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  Bookmarks are stored in this browser.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <article className="order-1 min-w-0 lg:order-2">
          <header className="paper relative overflow-hidden rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-7">
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r",
                kind === "vlsi"
                  ? "from-[#9dc7b6] via-[var(--color-circuit)] to-[#1d4a3a]"
                  : "from-[#c3d7e8] via-[var(--color-notebook-blue)] to-[#7093b3]"
              )}
            />
            <div className="flex flex-wrap items-center gap-2">
              <MaterialTag tone={kind === "vlsi" ? "green" : "paper"}>{topic.label}</MaterialTag>
              <MaterialTag>{topic.level}</MaterialTag>
              <MaterialTag>{topic.readTime} read</MaterialTag>
            </div>
            <h1 className="mt-3 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
              {topic.title}
            </h1>
            <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {topic.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {topic.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-[3px] border border-border/80 bg-[var(--color-paper-warm)] px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </header>

          <section id="introduction" className="scroll-mt-28 pt-8">
            <h2 className="text-xl font-semibold text-foreground">Introduction</h2>
            <div className="mt-3 space-y-3 text-[14.5px] leading-7 text-muted-foreground">
              {topic.intro.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </section>

          <section id="concepts" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">Concepts</h2>
            <div className="mt-4 space-y-4">
              {topic.concepts.map((c, i) => (
                <div key={c.title} className="rounded-lg border border-border/80 bg-[var(--color-card)] p-5 shadow-[var(--shadow-xs)]">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.body}</p>
                  {c.bullets?.length ? (
                    <ul className="mt-3 space-y-1.5">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/85">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--color-wood)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3">
              <StickyNote tone="yellow" className="max-w-md">
                <span className="flex items-center gap-1.5 font-hand text-lg font-semibold">
                  <Lightbulb className="h-4 w-4" /> Study note
                </span>
                <p className="mt-1 font-hand text-lg leading-6">
                  If you can state the invariant in one sentence, you can rebuild the code from it.
                </p>
              </StickyNote>
            </div>
          </section>

          <section id="visual" className="scroll-mt-28 pt-9">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-semibold text-foreground">
                {kind === "vlsi" ? "Circuit diagram" : "Visual explanation"}
              </h2>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {kind === "vlsi" ? "Educational schematic" : "Interactive"}
              </span>
            </div>
            <div className="mt-4">{visual || diagram}</div>
            {kind === "vlsi" ? (
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                These diagrams explain structure and signal flow. They are not connected to a simulator
                and do not represent verified hardware behaviour.
              </p>
            ) : null}
          </section>

          <section id="code" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">Code examples</h2>
            <div className="mt-4 space-y-4">
              {topic.code.map((c) => (
                <CodeBlock key={c.title} item={c} />
              ))}
            </div>
          </section>

          <section id="complexity" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">
              {kind === "vlsi" ? "Technical reference" : "Complexity analysis"}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[var(--color-paper-warm)] text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-2.5 font-semibold">Operation</th>
                    <th className="px-4 py-2.5 font-semibold">{kind === "vlsi" ? "Behaviour" : "Time"}</th>
                    <th className="px-4 py-2.5 font-semibold">{kind === "vlsi" ? "Resource" : "Space"}</th>
                    <th className="px-4 py-2.5 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.complexity.map((row) => (
                    <tr key={row.operation} className="table-row border-t border-border/70">
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.operation}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.time}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.space}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="practice" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">Practice problems</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topic.practice.map((p, i) => (
                <div key={p.title} className="rounded-lg border border-border/80 bg-[var(--color-card)] p-4 shadow-[var(--shadow-xs)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">P-{i + 1}</span>
                    <MaterialTag tone={p.difficulty === "Hard" ? "pink" : p.difficulty === "Medium" ? "yellow" : "green"}>
                      {p.difficulty}
                    </MaterialTag>
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{p.prompt}</p>
                  <details className="group mt-3">
                    <summary className="cursor-pointer text-xs font-medium text-primary hover:underline">
                      Show hint
                    </summary>
                    <p className="mt-1.5 rounded-[3px] bg-[color-mix(in_srgb,var(--color-highlight-yellow)_42%,transparent)] px-2 py-1.5 text-xs leading-relaxed text-foreground">
                      {p.hint}
                    </p>
                  </details>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              These are written practice prompts, not an online judge. Work them in your own editor.
            </p>
          </section>

          <section id="mistakes" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">Common mistakes</h2>
            <ul className="mt-3 space-y-2">
              {topic.mistakes.map((m) => (
                <li key={m} className="flex gap-2.5 rounded-md border border-[color-mix(in_srgb,var(--color-destructive)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-destructive)_6%,transparent)] px-3 py-2 text-[13px] leading-relaxed text-foreground">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-destructive)]" />
                  {m}
                </li>
              ))}
            </ul>
          </section>

          <section id="related" className="scroll-mt-28 pt-9">
            <h2 className="text-xl font-semibold text-foreground">Related topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {topic.related.map((r) => (
                <Link
                  key={r.to + r.label}
                  to={r.to}
                  className="group inline-flex items-center gap-2 rounded-[4px] border border-border bg-[var(--color-card)] px-3 py-2 text-sm text-foreground shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-wood)]"
                >
                  {r.label}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </section>

          <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            {prev ? (
              <Link to={prev.to} className="group flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span className="truncate">{prev.label}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={next.to} className="group flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <span className="truncate">{next.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </nav>

          <p className="mt-6 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Check className="h-3.5 w-3.5" /> Content reviewed {kind === "vlsi" ? "for technical accuracy" : "against standard references"} · Last editorial pass November 2026
          </p>
        </article>
      </div>
    </div>
  );
}
