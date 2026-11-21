import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, FileText, Target } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag, PaperCard, SectionHeading, StickyNote, WoodPanel } from "../../components/skeuo/Surfaces";
import { placementResources, placementRoadmap, placementSkills } from "../../data/learningData";

export default function PlacementPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="leather"
          eyebrow="Career preparation"
          meta="Planner"
          title="A placement plan you can actually follow."
          description="Fundamentals, domain depth and interview execution, semester by semester. No placement statistics, company partnerships or salary claims are shown — none are verified."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Career" }, { label: "Placement" }]}
          actions={
            <>
              <Link
                to="/resume"
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                <FileText className="h-4 w-4" /> Build your resume
              </Link>
              <Link
                to="/mock-interviews"
                className="btn-paper btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                Practise an interview
              </Link>
            </>
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <SectionHeading
              eyebrow="Preparation roadmap"
              title="Four phases, four kinds of evidence"
              description="Each phase ends with something you can demonstrate, not just a topic you have read."
            />

            <div className="mt-5 space-y-3">
              {placementRoadmap.map((phase, i) => (
                <div key={phase.phase} className="paper rounded-lg p-4 shadow-[var(--shadow-sm)] sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {phase.phase}
                      </p>
                      <h3 className="mt-1 font-display text-xl text-foreground">{phase.title}</h3>
                    </div>
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-border font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-circuit)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-[3px] bg-[var(--color-paper-warm)] px-2.5 py-2 text-[12px] leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Evidence:</span> {phase.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <PaperCard lined className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[var(--color-wood)]" />
                <h2 className="text-sm font-semibold text-foreground">Skills to build</h2>
              </div>
              <div className="mt-3 space-y-3">
                {placementSkills.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.group}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-[12px] text-foreground/85">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PaperCard>

            <StickyNote tone="yellow" taped>
              <p className="font-hand text-xl leading-6">
                A project you can explain beats five you can only list.
              </p>
            </StickyNote>

            <WoodPanel className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Honest scope
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/85">
                NuralPath does not claim placement records, recruiter partnerships or guaranteed
                outcomes. This is a preparation planner.
              </p>
            </WoodPanel>
          </aside>
        </div>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Resources"
            title="Where to go next"
            description="Every link leads to a page that is actually implemented on this platform."
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {placementResources.map((r) => (
              <Link key={r.to} to={r.to} className="card-depth card-depth-hover group p-4">
                <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{r.note}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading
            eyebrow="Interview preparation"
            title="What a good answer sounds like"
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Structure", body: "Restate the problem, state your plan, then code. Announce the complexity before you are asked." },
              { title: "Boundaries", body: "Empty input, one element, duplicates, overflow. Check them before declaring the solution finished." },
              { title: "Trade-offs", body: "Say what you would change for a different constraint. That is what separates a solution from an engineer." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-[var(--color-card)] p-4 shadow-[var(--shadow-xs)]">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--color-wood)]" />
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-[11px] text-muted-foreground">
          <MaterialTag tone="paper">Note</MaterialTag>{" "}
          Placement outcomes depend on far more than a preparation plan. This page does not predict them.
        </p>
      </Container>
    </div>
  );
}
