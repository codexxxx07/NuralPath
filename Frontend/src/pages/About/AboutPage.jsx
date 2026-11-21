import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, PaperCard, SectionHeading, StickyNote } from "../../components/skeuo/Surfaces";

const values = [
  {
    title: "Practical over theoretical",
    body: "Every topic ends with code and written practice. If a page cannot be applied, it is not finished.",
  },
  {
    title: "Honest by default",
    body: "Sample dashboards are labelled. Forms that do not send email say so. Community activity is never invented.",
  },
  {
    title: "One consistent learning shape",
    body: "Introduction, concepts, visual, code, complexity, practice, mistakes, related topics. Consistency reduces friction.",
  },
  {
    title: "Materials with meaning",
    body: "Paper for content, wood for the desk, metal for controls, leather for roadmaps. Decoration must communicate structure.",
  },
];

const state = [
  {
    title: "Available now",
    body: "Seven DSA topics, nine VLSI topics, two roadmaps with local progress, a step-accurate DSA visualizer, quizzes, daily challenges, notes, cheat sheets, career pages and a local community prototype.",
  },
  {
    title: "Deliberately not claimed",
    body: "No AI interviewer, no online judge, no RTL simulator, no placement statistics, no company partnerships and no shared community backend.",
  },
  {
    title: "Built in the open",
    body: "This is a frontend build with sample data where a backend would normally be. Missing integrations are named instead of simulated.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="About NuralPath"
          meta="Purpose"
          title="A digital study environment that feels like a place."
          description="NuralPath exists to make consistent, practical learning feel organised and physical — a desk you want to return to, not a dashboard you tolerate."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
          actions={
            <>
              <Link to="/dsa" className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium">
                Open the DSA library <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/faq" className="btn-paper btn-tactile inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium">
                Read the FAQ
              </Link>
            </>
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <SectionHeading
              eyebrow="Philosophy"
              title="Learning is a loop, not a library card."
              description="Reading creates familiarity. Rebuilding creates understanding. Testing exposes the gap. Explaining closes it."
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <PaperCard key={v.title} lined className="p-4">
                  <h3 className="font-display text-lg text-foreground">{v.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{v.body}</p>
                </PaperCard>
              ))}
            </div>

            <div className="mt-8">
              <SectionHeading eyebrow="Current state" title="What exists, and what does not." />
              <div className="mt-4 space-y-3">
                {state.map((s, i) => (
                  <div key={s.title} className="rounded-lg border border-border bg-[var(--color-card)] p-4 shadow-[var(--shadow-xs)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="wood rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">The desk</p>
              <p className="mt-2 font-display text-xl text-[#fbf3e4]">One place for the work.</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/75">
                Shelves for topics, a notebook for notes, a calendar for daily practice, and a board
                for questions. The metaphors are functional, not decorative.
              </p>
            </div>

            <StickyNote tone="yellow" taped>
              <p className="font-hand text-xl leading-6">
                A calm interface is part of the pedagogy.
              </p>
            </StickyNote>

            <div className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <h2 className="text-sm font-semibold text-foreground">Team</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                NuralPath is built by a small student-focused team. Individual profiles, titles and
                biographies are not published here — inventing them would contradict the platform's own
                standard.
              </p>
              <MaterialTag className="mt-2">No fabricated credentials</MaterialTag>
            </div>
          </aside>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-[var(--color-paper-warm)] p-5">
          <h2 className="font-display text-xl text-foreground">What we will not do</h2>
          <div className="mt-2 grid gap-2 text-[13px] leading-relaxed text-muted-foreground sm:grid-cols-3">
            <p>· Invent community activity or solved counts.</p>
            <p>· Claim placement outcomes or partnerships.</p>
            <p>· Present a diagram as a verified simulation.</p>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">
            If a feature needs a backend, the page says so and works only where it genuinely can.
          </p>
        </div>
      </Container>
    </div>
  );
}
