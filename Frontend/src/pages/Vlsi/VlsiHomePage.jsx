import { Link } from "react-router-dom";
import { ArrowRight, CircuitBoard, Cpu, Gauge, Layers, ScrollText, Signal, Workflow } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, PaperCard, SectionHeading, StickyNote } from "../../components/skeuo/Surfaces";
import CircuitDiagram from "../../components/skeuo/CircuitDiagram";
import { vlsiTopics } from "../../data/vlsiTopics";

const guides = [
  { to: "/vlsi/roadmap", title: "Roadmap", note: "Stage dependencies from devices to verification.", icon: Layers },
  { to: "/vlsi/sta", title: "Timing", note: "Setup, hold and the corners that decide signoff.", icon: Gauge },
  { to: "/vlsi/verification-uvm", title: "Verification", note: "UVM structure and coverage discipline.", icon: Workflow },
  { to: "/vlsi/cheat-sheets", title: "Cheat sheets", note: "Printable CMOS, timing and flow references.", icon: ScrollText },
];

const chipTones = ["#2f6b57", "#41617a", "#6b7f4a", "#7a5a3c", "#6a5478", "#8a5a52", "#41617a", "#7a5a3c", "#6a5478"];

export default function VlsiHomePage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="circuit"
          eyebrow="VLSI learning environment"
          meta="Engineering workstation"
          title="From a MOS switch to a manufacturable chip."
          description="Nine technical topics, a dependency-aware roadmap, and schematics that explain structure. No invented simulators — diagrams are clearly educational."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "VLSI" }]}
          actions={
            <>
              <Link
                to="/vlsi/roadmap"
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                Open the roadmap <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/vlsi/interview-questions"
                className="btn-paper btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                Interview questions
              </Link>
            </>
          }
        />

        {/* Chip-inspired topic grid */}
        <section className="mt-8">
          <SectionHeading
            eyebrow="Topic blocks"
            title="The workstation"
            description="Each block is a topic page with theory, a circuit diagram, RTL or flow examples, and practice questions."
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vlsiTopics.map((topic, i) => (
              <Link
                key={topic.slug}
                to={`/vlsi/${topic.slug}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]"
                style={{ borderTopColor: chipTones[i], borderTopWidth: 3 }}
              >
                <div className="circuit-board p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="grid h-8 w-8 place-items-center rounded-[3px] border border-black/20 font-mono text-[10px] font-bold text-white shadow-[0_2px_4px_rgba(30,40,35,0.3)]"
                      style={{ backgroundColor: chipTones[i] }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Cpu className="h-4 w-4 text-[var(--color-circuit)] opacity-50" />
                  </div>
                  <h3 className="mt-3 font-display text-lg leading-tight text-foreground">{topic.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
                    {topic.subtitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {topic.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-[2px] border border-border/70 bg-[var(--color-paper-warm)] px-1.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {topic.level} · {topic.readTime}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <SectionHeading
              eyebrow="Reference schematic"
              title="The inverter is the reference circuit"
              description="Noise margins, drive strength and library characterisation are all measured against this structure."
            />
            <div className="mt-4">
              <CircuitDiagram type="inverter" caption="CMOS inverter: one device conducts in steady state, so static current is leakage only." />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {guides.map((g) => (
                <Link key={g.to} to={g.to} className="card-depth card-depth-hover flex items-start gap-3 p-3.5">
                  <g.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-circuit)]" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{g.title}</span>
                    <span className="mt-0.5 block text-[12px] leading-relaxed text-muted-foreground">{g.note}</span>
                  </span>
                </Link>
              ))}
            </div>

            <StickyNote tone="green" taped>
              <p className="font-hand text-xl leading-6">
                Timing closure is not a stage. It is the argument you keep making until every corner agrees.
              </p>
            </StickyNote>

            <PaperCard className="p-4">
              <div className="flex items-center gap-2">
                <Signal className="h-4 w-4 text-[var(--color-circuit)]" />
                <MaterialTag tone="green">Honest scope</MaterialTag>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                These pages teach structure and reasoning. There is no RTL simulator, waveform viewer or
                synthesis engine here, and the diagrams are not silicon-verified.
              </p>
            </PaperCard>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="circuit-board rounded-xl border border-border p-5 shadow-[var(--shadow-sm)]">
            <CircuitBoard className="h-5 w-5 text-[var(--color-circuit)]" />
            <h2 className="mt-3 font-display text-xl text-foreground">Learn in dependency order</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Physical design makes no sense before timing, and timing makes no sense before CMOS. The
              roadmap encodes those dependencies instead of listing topics alphabetically.
            </p>
            <Link to="/vlsi/roadmap" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              See the stages <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="circuit-board rounded-xl border border-border p-5 shadow-[var(--shadow-sm)]">
            <Gauge className="h-5 w-5 text-[var(--color-circuit)]" />
            <h2 className="mt-3 font-display text-xl text-foreground">Prepare for the screen</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Timing arithmetic, assignment semantics and scan basics appear in almost every entry-level
              VLSI interview. Start with the questions you cannot answer yet.
            </p>
            <Link
              to="/vlsi/interview-questions"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Open questions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
