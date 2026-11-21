import { Link } from "react-router-dom";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "DSA library", to: "/dsa" },
      { label: "VLSI workstation", to: "/vlsi" },
      { label: "Quizzes", to: "/quizzes" },
      { label: "Daily challenge", to: "/daily-challenge" },
      { label: "Notes", to: "/notes" },
    ],
  },
  {
    title: "Prepare",
    links: [
      { label: "DSA roadmap", to: "/dsa/roadmap" },
      { label: "VLSI roadmap", to: "/vlsi/roadmap" },
      { label: "Practice problems", to: "/dsa/practice" },
      { label: "Interview questions", to: "/dsa/interview-questions" },
      { label: "Cheat sheets", to: "/dsa/cheat-sheets" },
    ],
  },
  {
    title: "Career",
    links: [
      { label: "Placement planner", to: "/placement" },
      { label: "Mock interviews", to: "/mock-interviews" },
      { label: "Resume builder", to: "/resume" },
      { label: "Courses", to: "/courses" },
      { label: "Libraries", to: "/libraries" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community board", to: "/community" },
      { label: "Doubts wall", to: "/doubts" },
      { label: "Blog", to: "/blogs" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-10 border-t border-[var(--color-wood-dark)]/40">
      <div className="wood">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-xl text-[#fbf3e4]">Keep the desk warm.</p>
            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-white/70">
              Pick a topic, keep a notebook, and practise before you feel ready. The study environment
              is here whenever you return.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/dsa"
              className="btn-paper btn-tactile inline-flex h-9 items-center rounded-[5px] px-3 text-xs font-medium"
            >
              Open DSA
            </Link>
            <Link
              to="/vlsi"
              className="inline-flex h-9 items-center rounded-[5px] border border-white/25 bg-white/10 px-3 text-xs font-medium text-white/90 transition-colors hover:bg-white/15"
            >
              Open VLSI
            </Link>
          </div>
        </div>
      </div>

      <div className="paper">
        <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-[linear-gradient(160deg,var(--color-wood-light),var(--color-wood)_55%,var(--color-wood-dark))] font-display text-xs font-bold text-[#fdf4e4] shadow-[0_1px_0_rgba(255,255,255,0.3)_inset]">
                  N
                </span>
                <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                  NuralPath
                </span>
              </Link>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                A digital study environment for DSA, VLSI, quizzes and interview preparation — built
                around notebooks, shelves and workbenches rather than dashboards.
              </p>
              <p className="mt-3 text-[11px] text-muted-foreground">
                No fabricated activity. Features without a backend are labelled.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="link-underline text-[13px] text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
            <span>© 2026 NuralPath.</span>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/faq" className="hover:text-foreground">FAQ</Link>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
            Learn · practise · build
          </p>
        </div>
      </div>
    </footer>
  );
}
