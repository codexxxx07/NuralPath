import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Calculator,
  CalendarDays,
  Check,
  CircuitBoard,
  Code2,
  Compass,
  ListChecks,
  MessageSquareText,
  NotebookPen,
  Pencil,
  Pin,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "../../components/skeuo/Page";
import {
  Eyebrow,
  MaterialTag,
  PaperCard,
  ProgressMeter,
  SectionHeading,
  StickyNote,
  WoodPanel,
} from "../../components/skeuo/Surfaces";

const platforms = [
  {
    title: "DSA Library",
    note: "Seven topics on a shelf, from arrays to dynamic programming.",
    to: "/dsa",
    icon: Code2,
    tone: "blue",
  },
  {
    title: "VLSI Workstation",
    note: "Devices, CMOS, RTL, timing and verification, with schematics.",
    to: "/vlsi",
    icon: CircuitBoard,
    tone: "green",
  },
  {
    title: "Quizzes",
    note: "Timed exam papers with explanations after submission.",
    to: "/quizzes",
    icon: ListChecks,
    tone: "amber",
  },
  {
    title: "Daily Challenge",
    note: "One question a day on a physical calendar page.",
    to: "/daily-challenge",
    icon: CalendarDays,
    tone: "pink",
  },
  {
    title: "Notebook",
    note: "Write, tag and search notes saved in this browser.",
    to: "/notes",
    icon: NotebookPen,
    tone: "amber",
  },
  {
    title: "Community",
    note: "A board for discussions and a wall for doubts.",
    to: "/community",
    icon: Users,
    tone: "green",
  },
  {
    title: "Career Desk",
    note: "Placement planner, mock interviews and a resume sheet.",
    to: "/placement",
    icon: Compass,
    tone: "blue",
  },
];

const journey = [
  { title: "Learn", note: "Read a topic end to end. Understand the invariant before the syntax.", icon: BookOpen },
  { title: "Practice", note: "Rebuild the code without looking, then work two prompts.", icon: Pencil },
  { title: "Test", note: "Sit a timed paper or attempt the daily challenge.", icon: ListChecks },
  { title: "Improve", note: "Read the explanation and fix the specific mistake you made.", icon: Sparkles },
  { title: "Build", note: "Apply the pattern in a project or interview answer.", icon: CircuitBoard },
];

const shelfPreview = [
  { title: "Arrays", to: "/dsa/arrays", tone: "#3f6285", label: "DS-01" },
  { title: "Trees", to: "/dsa/trees", tone: "#4d6b4f", label: "DS-05" },
  { title: "Graphs", to: "/dsa/graphs", tone: "#41617a", label: "DS-06" },
  { title: "CMOS", to: "/vlsi/cmos", tone: "#7a5a3c", label: "VLSI-03" },
];

const deskNotes = [
  { text: "Practise the invariant, not the output.", tone: "yellow" },
  { text: "A fake solved count teaches nothing.", tone: "green" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero — the study desk */}
      <section className="relative overflow-hidden pt-8 sm:pt-12">
        <Container>
          <div className="desk relative overflow-hidden rounded-2xl border border-[var(--color-wood-dark)]/35 px-4 py-9 shadow-[var(--shadow-raised)] sm:px-8 sm:py-12 lg:px-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--color-wood-dark),var(--color-wood-light),var(--color-wood-dark))]" />
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <MaterialTag tone="chalk">NuralPath</MaterialTag>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#5c4a34] dark:text-white/55">
                    a digital study environment
                  </span>
                </div>
                <h1 className="mt-4 max-w-xl text-balance font-display text-4xl leading-[1.06] text-[#2a2117] dark:text-[#f4ecdd] sm:text-5xl lg:text-[3.4rem]">
                  Learning that feels like
                  <span className="relative mx-2 inline-block">
                    <span className="relative z-10">sitting at a desk</span>
                    <span
                      className="absolute inset-x-0 bottom-1.5 z-0 h-3 -rotate-[0.6deg] bg-[color-mix(in_srgb,#f5e58a_80%,transparent)]"
                      aria-hidden="true"
                    />
                  </span>
                  .
                </h1>
                <p className="mt-5 max-w-lg text-pretty text-[15px] leading-7 text-[#4a3d2c] dark:text-white/70">
                  DSA on a bookshelf. VLSI on a workbench. Notes in a notebook, challenges on a
                  calendar. One organised place to learn, practise and prepare — without another flat
                  dashboard.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    to="/dsa"
                    className="btn-ink btn-tactile inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-medium"
                  >
                    Start learning <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/vlsi"
                    className="btn-paper btn-tactile inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-medium"
                  >
                    Explore the workstation
                  </Link>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#5c4a34] dark:text-white/55">
                  <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> No setup</span>
                  <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Free to browse</span>
                  <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Honest labels</span>
                </div>
              </div>

              {/* Physical desk arrangement */}
              <div className="relative">
                <div className="relative mx-auto max-w-md">
                  {/* Notebook */}
                  <div className="relative rotate-[0.8deg] rounded-[6px] bg-[#f7f2e6] p-4 pt-8 shadow-[0_18px_30px_-16px_rgba(40,28,14,0.65),0_2px_4px_rgba(40,28,14,0.25)] ring-1 ring-[#d8c9b1] dark:bg-[#25211b] dark:ring-[#453b2e]">
                    <div className="absolute inset-y-0 left-4 w-px bg-[#d9a89a]/60" />
                    <div className="absolute -top-2 left-6 h-5 w-16 -rotate-3 bg-[color-mix(in_srgb,#d9c9a8_75%,transparent)] shadow-sm" />
                    <div className="flex items-center justify-between">
                      <p className="font-hand text-lg text-[#6b5840] dark:text-[#c0b39d]">this week</p>
                      <Bookmark className="h-4 w-4 fill-[#8c3a29] text-[#8c3a29]" />
                    </div>
                    <p className="mt-1 font-display text-lg text-[#2a2117] dark:text-[#f0e8d8]">
                      Learning progress
                    </p>
                    <div className="mt-3 space-y-2.5">
                      <ProgressMeter value={64} label="Arrays & strings" tone="blue" />
                      <ProgressMeter value={38} label="Trees & graphs" tone="green" />
                      <ProgressMeter value={22} label="CMOS & timing" tone="wood" />
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-[#dccdb6] pt-2 text-[10px] text-[#7a6750] dark:border-[#453b2e] dark:text-[#b4a690]">
                      <span>3 topics in progress</span>
                      <span>9 practice prompts</span>
                    </div>
                  </div>

                  {/* Pencil */}
                  <div className="absolute -right-2 top-8 h-28 w-2.5 rotate-[18deg] rounded-[2px] bg-[linear-gradient(90deg,#e0b34a,#c8952f_45%,#8a6318)] shadow-[0_3px_6px_rgba(40,28,14,0.35)]">
                    <span className="absolute -top-2 left-0 h-3 w-2.5 bg-[#e8d3b0]" />
                    <span className="absolute -bottom-1.5 left-0 h-2.5 w-2.5 rotate-45 bg-[#3b342b]" />
                  </div>

                  {/* Sticky notes */}
                  <div className="absolute -bottom-5 -left-3 w-36 rotate-[-4deg]">
                    <StickyNote tone="yellow" className="p-2.5">
                      <p className="font-hand text-[15px] leading-5">Read → rebuild → practise.</p>
                    </StickyNote>
                  </div>
                  <div className="absolute -bottom-8 right-0 w-32 rotate-[3deg]">
                    <StickyNote tone="green" className="p-2.5">
                      <p className="font-hand text-[15px] leading-5">Daily page, 10 minutes.</p>
                    </StickyNote>
                  </div>

                  {/* Book stack */}
                  <div className="absolute -right-1 bottom-14 hidden w-24 sm:block">
                    <div className="h-3 rounded-[2px] bg-[#41617a] shadow-[0_2px_3px_rgba(40,28,14,0.35)]" />
                    <div className="mt-1 h-3 w-[92%] rounded-[2px] bg-[#7a5a3c] shadow-[0_2px_3px_rgba(40,28,14,0.35)]" />
                    <div className="mt-1 h-3 w-[84%] rounded-[2px] bg-[#4d6b4f] shadow-[0_2px_3px_rgba(40,28,14,0.35)]" />
                  </div>
                </div>

                <p className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-[#6b5840] dark:text-white/45">
                  progress shown is a preview, not your data
                </p>
              </div>
            </div>
          </div>

          {/* Wooden desk rail with quick facts */}
          <WoodPanel className="mt-4 flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-white/80">
              <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> 7 DSA topics</span>
              <span className="flex items-center gap-1.5"><CircuitBoard className="h-3.5 w-3.5" /> 9 VLSI topics</span>
              <span className="flex items-center gap-1.5"><ListChecks className="h-3.5 w-3.5" /> 3 exam papers</span>
              <span className="flex items-center gap-1.5"><Calculator className="h-3.5 w-3.5" /> Step-accurate visualizer</span>
            </div>
            <span className="rounded-[3px] border border-white/25 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/70">
              built in the open
            </span>
          </WoodPanel>
        </Container>
      </section>

      {/* Platform overview */}
      <section className="pt-16 sm:pt-20">
        <Container>
          <SectionHeading
            eyebrow="On the platform"
            title="Every tool has a physical place."
            description="Not a grid of identical rounded cards. A shelf for topics, a desk for progress, a calendar for habits, a board for questions."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => {
              const tone =
                p.tone === "blue"
                  ? "border-t-[#6f96b8]"
                  : p.tone === "green"
                    ? "border-t-[var(--color-circuit)]"
                    : p.tone === "pink"
                      ? "border-t-[#b57a8a]"
                      : "border-t-[var(--color-brass)]";
              return (
                <Link
                  key={p.title}
                  to={p.to}
                  className={`card-depth card-depth-hover group flex flex-col border-t-[3px] p-4 ${tone}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="metal grid h-8 w-8 place-items-center rounded-[5px]">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-3 font-display text-lg leading-tight text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{p.note}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Learning journey */}
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="paper rounded-xl p-5 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <Eyebrow>The learning journey</Eyebrow>
                <h2 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                  Learn → Practice → Test → Improve → Build
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Five stages, repeated for every pattern. The loop matters more than the volume.
                </p>
              </div>
              <Link to="/dsa/roadmap" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                See the roadmap <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {journey.map((step, i) => (
                <li key={step.title} className="relative rounded-lg border border-border/80 bg-[var(--color-card)] p-4 shadow-[var(--shadow-xs)]">
                  <span className="absolute -top-2 left-4 rounded-[2px] bg-[var(--color-wood)] px-1.5 py-0.5 font-mono text-[9px] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="mt-1 h-4 w-4 text-[var(--color-wood)]" />
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{step.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Shelf preview + notes rail */}
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <div>
              <SectionHeading
                eyebrow="From the shelves"
                title="Pick a book, not a menu item."
                description="DSA topics stand on a shelf. VLSI blocks sit on a circuit board. Different environments, one consistent way to learn."
              />
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {shelfPreview.map((book) => (
                  <Link
                    key={book.title}
                    to={book.to}
                    className="book-cover flex h-44 flex-col justify-between p-3 pl-4 sm:h-52"
                    style={{ "--book": book.tone }}
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">
                      {book.label}
                    </span>
                    <div>
                      <span className="font-display text-lg leading-tight text-white">{book.title}</span>
                      <span className="mt-2 block h-px w-8 bg-white/40" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="shelf-edge mt-2 h-3 rounded-[2px]" aria-hidden="true" />

              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/dsa" className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium">
                  All DSA books <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/vlsi" className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium">
                  All VLSI blocks <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {deskNotes.map((note) => (
                <StickyNote key={note.text} tone={note.tone} taped>
                  <p className="font-hand text-xl leading-6">{note.text}</p>
                </StickyNote>
              ))}

              <PaperCard lined className="p-4">
                <div className="flex items-center gap-2">
                  <Pin className="h-4 w-4 text-[var(--color-wood)]" />
                  <h3 className="text-sm font-semibold text-foreground">Saved topics</h3>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  Bookmark any topic from its page. Bookmarks are stored in this browser and shown as a
                  ribbon on the topic.
                </p>
                <Link to="/notes" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Open the notebook <ArrowRight className="h-3 w-3" />
                </Link>
              </PaperCard>
            </div>
          </div>
        </Container>
      </section>

      {/* Community + CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="chalkboard rounded-xl px-5 py-8 sm:px-9 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  The classroom board
                </p>
                <h2 className="mt-2 max-w-lg font-display text-2xl leading-tight text-[#f3eee0] sm:text-3xl">
                  Ask the question you have been avoiding.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
                  Every learner gets stuck. The doubts wall is built for precise questions: what you
                  tried, what you expected, what happened. The community board holds discussions and
                  study-group proposals.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    to="/doubts"
                    className="btn-paper btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium"
                  >
                    <MessageSquareText className="h-3.5 w-3.5" /> Ask a doubt
                  </Link>
                  <Link
                    to="/community"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3 text-xs font-medium text-white/90 transition-colors hover:bg-white/15"
                  >
                    Visit the community
                  </Link>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: BookOpen, text: "Curated topics with consistent structure." },
                  { icon: Pencil, text: "Practice prompts you work in your own editor." },
                  { icon: ListChecks, text: "Timed papers with honest marking." },
                  { icon: MessageSquareText, text: "A doubts wall with real, local replies." },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5 rounded-md border border-white/10 bg-black/20 px-3 py-2.5 text-[12.5px] text-white/75">
                    <item.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d9c08b]" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-4">
        <Container>
          <div className="paper relative overflow-hidden rounded-xl px-5 py-9 text-center shadow-[var(--shadow-card)] sm:px-8 sm:py-12">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--color-wood-dark),var(--color-brass),var(--color-wood-dark))]" />
            <h2 className="mx-auto max-w-xl text-balance font-display text-2xl text-foreground sm:text-3xl">
              Open a book. Stay for the habit.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Start with the DSA shelf or the VLSI workstation, then keep a notebook and a daily page.
              Learning is a place you return to.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <Link
                to="/dsa/roadmap"
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-medium"
              >
                Begin the DSA path <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="btn-paper btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-medium"
              >
                Create an account
              </Link>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              No payment details required. Dashboards are clearly labelled demos.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
