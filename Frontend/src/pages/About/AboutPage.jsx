import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

const values = [
  {
    title: "Practical Over Theory",
    description:
      "We believe engineers are built by doing. Every concept is reinforced with real practice — commands typed, code compiled, projects built.",
  },
  {
    title: "Community-First",
    description:
      "Students learn faster together. Doubts get answered, code gets reviewed, and progress gets shared.",
  },
  {
    title: "Student-First",
    description:
      "We build for students at every level. No gatekeeping, no 'too basic' questions, and no pressure to move faster than you're ready.",
  },
  {
    title: "Honest by Default",
    description:
      "If a feature or course isn't ready, we say so and label it clearly as in development — no overpromising.",
  },
];

const currentState = [
  {
    title: "Live Tracks",
    description:
      "Linux & Systems, Shell Scripting, C Programming, and Data Structures in C are available now with structured curricula.",
  },
  {
    title: "In Development",
    description:
      "VLSI Design, Embedded Systems, and FPGA tracks are being built in the open. When they're ready, you'll know exactly when we announce them.",
  },
  {
    title: "Built in the Open",
    description:
      "The platform itself is a work in progress we share openly. Roadmaps, libraries, and resources reflect the real state of things.",
  },
];

const principles = [
  {
    question: "Why focus on Linux, Shell, C, and Data Structures?",
    answer:
      "These are the fundamentals almost every systems engineer relies on daily. Mastering them early pays off across every specialization — including the hardware domains on our roadmap.",
  },
  {
    question: "What does 'in development' mean here?",
    answer:
      "It means the content genuinely isn't available yet — and we won't pretend it is. Full courses for tracks like VLSI or Embedded will be announced when we've built them properly.",
  },
  {
    question: "Is anyone making a living from this?",
    answer:
      "Right now the platform is a community effort. There are no instructors with fake titles or fabricated track records — just people who care about good systems education, learning in public.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>About NuralPath</Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A Community for People Serious About Systems Fundamentals
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              NuralPath is a student-focused learning community built around
              hands-on skills in Linux, shell scripting, C, and data structures.
              We're building the platform in the open — and everything we claim
              here reflects what actually exists today.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/community">Join the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-depth p-6">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Our Mission
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To make solid, hands-on systems education genuinely accessible —
                so any student who wants to really understand Linux, C, and
                data structures can learn by doing, without expensive setups
                or gatekeeping.
              </p>
            </div>
            <div className="card-depth p-6">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Our Vision
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A future where the systems and hardware talent pipeline
                grows out of deliberate practice — where track after track
                (including VLSI, Embedded, and FPGA) is opened to students
                who built the fundamentals first, here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Where we are now ─── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Where We Are Now</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Honest About the Present
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No inflated numbers, no fabricated placements — just what's built,
              what's being built, and how we work.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentState.map((s) => (
              <div key={s.title} className="card-depth p-6">
                <h3 className="text-base font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Our Values</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What We Stand For
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card-depth p-6">
                <h3 className="text-base font-medium text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How we work ─── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A Few Things Worth Knowing
            </h2>
          </div>

          <div className="mt-10 border-t border-border">
            {principles.map((p) => (
              <div key={p.question} className="border-b border-border py-6">
                <h3 className="text-sm font-medium text-foreground">
                  {p.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Learn the Way We Build — by Doing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Create a free account, pick a track, and start practicing today.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link to="/register">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
