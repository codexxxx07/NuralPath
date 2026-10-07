import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Zap,
  ArrowRight,
  FileCode2,
  Users,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

function AnimateOnScroll({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  {
    icon: Target,
    title: "Practical Over Theory",
    description: "We believe engineers are built by doing. Every concept is reinforced with real practice — commands typed, code compiled, projects built.",
  },
  {
    icon: Users,
    title: "Community-First",
    description: "Students learn faster together. Doubts get answered, code gets reviewed, and progress gets shared.",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "We build for students at every level. No gatekeeping, no 'too basic' questions, and no pressure to move faster than you're ready.",
  },
  {
    icon: Zap,
    title: "Honest by Default",
    description: "If a feature or course isn't ready, we say so and label it clearly as in development — no overpromising.",
  },
];

const currentState = [
  {
    icon: GraduationCap,
    title: "Live Tracks",
    description:
      "Linux & Systems, Shell Scripting, C Programming, and Data Structures in C are available now with structured curricula.",
  },
  {
    icon: Sparkles,
    title: "In Development",
    description:
      "VLSI Design, Embedded Systems, and FPGA tracks are being built in the open. When they're ready, you'll know exactly when we announce them.",
  },
  {
    icon: FileCode2,
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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              About NuralPath
            </p>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              A Community for People Serious About Systems Fundamentals
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              NuralPath is a student-focused learning community built around
              hands-on skills in Linux, shell scripting, C, and data structures.
              We're building the platform in the open — and everything we claim
              here reflects what actually exists today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          </motion.div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="border-y border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimateOnScroll>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Target className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Our Mission
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    To make solid, hands-on systems education genuinely accessible —
                    so any student who wants to really understand Linux, C, and
                    data structures can learn by doing, without expensive setups
                    or gatekeeping.
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Our Vision
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    A future where the systems and hardware talent pipeline
                    grows out of deliberate practice — where track after track
                    (including VLSI, Embedded, and FPGA) is opened to students
                    who built the fundamentals first, here.
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Where we are now ─── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Where We Are Now
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
              Honest About the Present
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              No inflated numbers, no fabricated placements — just what's built,
              what's being built, and how we work.
            </p>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentState.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="border-y border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Our Values
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
              What We Stand For
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How we work ─── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              How We Work
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
              A Few Things Worth Knowing
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 space-y-6">
            {principles.map((p, i) => (
              <AnimateOnScroll key={p.question} delay={i * 0.08}>
                <div className="rounded-lg border border-border bg-surface p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {p.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.answer}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Learn the Way We Build — by Doing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Create a free account, pick a track, and start practicing today.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
