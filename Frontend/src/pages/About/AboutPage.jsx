import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Zap,
  ArrowRight,
  Building2,
  FileCode2,
  Users,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

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
      <section className="relative overflow-hidden hero-gradient">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <Building2 className="mr-1 h-3 w-3" />
              About NuralPath
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              A Community for People Serious About{" "}
              <span className="gradient-text">Systems Fundamentals</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              NuralPath is a student-focused learning community built around
              hands-on skills in Linux, shell scripting, C, and data structures.
              We're building the platform in the open — and everything we claim
              here reflects what actually exists today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
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
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimateOnScroll>
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">Our Mission</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    To make solid, hands-on systems education genuinely accessible —
                    so any student who wants to really understand Linux, C, and
                    data structures can learn by doing, without expensive setups
                    or gatekeeping.
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">Our Vision</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
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
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Where We Are Now</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Honest About the Present
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              No inflated numbers, no fabricated placements — just what's built,
              what's being built, and how we work.
            </p>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentState.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What We Stand For
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How we work ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">How We Work</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A Few Things Worth Knowing
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 space-y-6">
            {principles.map((p, i) => (
              <AnimateOnScroll key={p.question} delay={i * 0.08}>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground font-display">{p.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.answer}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border bg-primary/5 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Learn the Way We Build — by Doing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create a free account, pick a track, and start practicing today.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
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