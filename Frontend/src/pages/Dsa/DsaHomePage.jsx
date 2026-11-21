import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Layers, ListChecks, MessageSquareText, ScrollText } from "lucide-react";
import { Book, Bookshelf } from "../../components/skeuo/Book";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { PaperCard, SectionHeading, StickyNote, WoodPanel } from "../../components/skeuo/Surfaces";
import DsaVisualizer from "../../components/skeuo/DsaVisualizer";
import { dsaTopics } from "../../data/dsaTopics";

const guides = [
  { to: "/dsa/roadmap", title: "Roadmap", note: "Stages, prerequisites and a recommended next topic.", icon: Layers },
  { to: "/dsa/practice", title: "Practice", note: "Filterable problem set with your own progress log.", icon: ListChecks },
  { to: "/dsa/interview-questions", title: "Interview questions", note: "Topic-wise questions with expandable answers.", icon: MessageSquareText },
  { to: "/dsa/cheat-sheets", title: "Cheat sheets", note: "Printable notebook references.", icon: ScrollText },
];

export default function DsaHomePage() {
  const foundations = dsaTopics.slice(0, 4);
  const advanced = dsaTopics.slice(4);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="blue"
          eyebrow="DSA learning environment"
          meta="Bookshelf"
          title="A programming library, organised like a shelf of books."
          description="Seven core topics, a staged roadmap and a step-accurate visualizer. Pick a book, read the chapter, then practise the pattern until recognition is immediate."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "DSA" }]}
          actions={
            <>
              <Link
                to="/dsa/roadmap"
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                Open the roadmap <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dsa/practice"
                className="btn-paper btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                Practice problems
              </Link>
            </>
          }
        />

        <div className="mt-8">
          <SectionHeading
            eyebrow="Shelf 01"
            title="Foundations"
            description="The structures you meet first and use forever. Read in order if you are new."
          />
          <Bookshelf className="mt-5">
            {foundations.map((topic) => (
              <Book
                key={topic.slug}
                to={`/dsa/${topic.slug}`}
                title={topic.title}
                label={topic.label}
                subtitle={topic.subtitle}
                tone={topic.tone}
              />
            ))}
          </Bookshelf>
        </div>

        <div className="mt-10">
          <SectionHeading
            eyebrow="Shelf 02"
            title="Advanced structures"
            description="Hierarchies, networks and optimisation. Bring the foundation habits with you."
          />
          <Bookshelf className="mt-5">
            {advanced.map((topic) => (
              <Book
                key={topic.slug}
                to={`/dsa/${topic.slug}`}
                title={topic.title}
                label={topic.label}
                subtitle={topic.subtitle}
                tone={topic.tone}
                height="h-56 sm:h-64"
              />
            ))}
          </Bookshelf>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className="card-depth card-depth-hover group flex flex-col p-4"
            >
              <g.icon className="h-5 w-5 text-[var(--color-wood)]" />
              <h3 className="mt-3 font-display text-lg text-foreground">{g.title}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-relaxed text-muted-foreground">{g.note}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <SectionHeading
              eyebrow="Try the instrument"
              title="Binary search, one real frame at a time"
              description="Playback moves through states the algorithm actually produced. Step backwards to inspect the discarded half."
            />
            <div className="mt-4">
              <DsaVisualizer
                kind="array"
                algorithm="binarySearch"
                caption="Values and target are editable. The bar tint shows the current comparison; the note explains each decision."
              />
            </div>
          </div>

          <div className="space-y-4">
            <PaperCard lined className="p-5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--color-wood)]" />
                <h3 className="text-sm font-semibold text-foreground">How to use this library</h3>
              </div>
              <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
                <li><span className="font-mono text-xs text-foreground">01</span> Read a topic end to end once.</li>
                <li><span className="font-mono text-xs text-foreground">02</span> Rebuild the code from the invariant, without looking.</li>
                <li><span className="font-mono text-xs text-foreground">03</span> Work two practice prompts in your own editor.</li>
                <li><span className="font-mono text-xs text-foreground">04</span> Mark the roadmap stage when you can explain it aloud.</li>
              </ol>
            </PaperCard>

            <StickyNote tone="green" taped>
              <p className="font-hand text-xl leading-6">
                Reading is preparation. The learning happens when you type it.
              </p>
            </StickyNote>

            <WoodPanel className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Library status
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                All seven topic pages are written and available. Practice prompts are written
                exercises — there is no online judge.
              </p>
            </WoodPanel>
          </div>
        </div>
      </Container>
    </div>
  );
}
