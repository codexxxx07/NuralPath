import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  Terminal,
  Bot,
  Users,
  Award,
  Server,
  Code,
  GitBranch,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function AnimateOnScroll({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const learningPath = [
  {
    icon: Server,
    title: "Linux Administration",
    description:
      "Install, configure, and manage Linux systems — permissions, services, networking, and storage.",
  },
  {
    icon: Terminal,
    title: "Shell Scripting",
    description:
      "Automate tasks with Bash — variables, loops, functions, grep, awk, and real-world scripts.",
  },
  {
    icon: Code,
    title: "C Programming",
    description:
      "Master pointers, memory management, data structures, and systems-level programming from scratch.",
  },
  {
    icon: GitBranch,
    title: "Open Source Contribution",
    description:
      "Contribute to real open-source projects on GitHub — the skill every employer looks for.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description:
      "Step-by-step curricula designed to take you from beginner to confident systems programmer.",
  },
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Interactive instructor-led sessions with real-time doubt solving and hands-on demos.",
  },
  {
    icon: Terminal,
    title: "Practice Lab",
    description:
      "Real terminal environment — no simulations. Write and run actual code in your browser.",
  },
  {
    icon: Bot,
    title: "AI Tutor",
    description:
      "Get instant explanations, debugging help, and concept breakdowns whenever you're stuck.",
  },
  {
    icon: Users,
    title: "Mentor Support",
    description:
      "1-on-1 guidance from experienced developers who've built production-grade systems.",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn recognized certificates that validate your skills for recruiters and hiring managers.",
  },
];

const differentiators = [
  {
    title: "Alternate-Day Learning",
    description:
      "C Programming on Mon/Wed/Fri, Shell Scripting on Tue/Thu — focused sessions that let you absorb and practice before the next class.",
  },
  {
    title: "Real Terminal Practice",
    description:
      "Not simulations or sandboxes. You work in a real Linux terminal environment with full command access — exactly what you'll use on the job.",
  },
  {
    title: "Industry-Relevant Skills",
    description:
      "The curriculum mirrors what companies actually ask for — Git, CLI fluency, scripting, C, and Linux system knowledge.",
  },
  {
    title: "Community & Mentorship",
    description:
      "Learn alongside peers in a focused cohort. Get unstuck quickly with mentors who review your code and guide your progress.",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "CS Student, VTU",
    quote:
      "The structured path made all the difference. I went from zero terminal knowledge to writing Bash scripts and contributing to an open-source project in three months.",
  },
  {
    name: "Rahul K.",
    role: "Fresh Graduate",
    quote:
      "The live classes and real practice labs are what set NuralPath apart. I actually understand how Linux works now, not just memorized commands for exams.",
  },
  {
    name: "Ananya M.",
    role: "Working Professional",
    quote:
      "The alternate-day schedule fit perfectly into my routine. The mentor support kept me accountable, and the certificate helped me switch to a DevOps role.",
  },
];

const faqs = [
  {
    question: "What prerequisites do I need?",
    answer:
      "No prior Linux or C experience is required. You need basic computer literacy and a willingness to learn. We start from fundamentals and build up systematically.",
  },
  {
    question: "How are live classes conducted?",
    answer:
      "Live classes are held via video conferencing with screen sharing. Instructors code in real-time, explain concepts interactively, and solve doubts during the session. Recordings are available for review.",
  },
  {
    question: "Can I practice in a real terminal?",
    answer:
      "Yes. NuralPath provides a real Linux terminal environment in your browser. You run actual commands, write scripts, and compile C programs — not simulations.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. Upon completing a learning path and passing the assessments, you receive a verified certificate that you can share on LinkedIn and add to your resume.",
  },
  {
    question: "Is there mentor support?",
    answer:
      "Every learner gets access to mentors — experienced developers who provide code reviews, answer questions, and guide you through challenges in dedicated sessions.",
  },
  {
    question: "What's the alternate-day schedule?",
    answer:
      "C Programming classes are on Monday, Wednesday, and Friday. Shell Scripting and Linux Administration are on Tuesday and Thursday. This gives you practice time between sessions.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <Badge variant="secondary" className="mb-4">
                EdTech for Systems Programming
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Master Linux, C & Shell — From Zero to Job-Ready
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Structured learning paths, hands-on practice, and expert
                mentorship to build real systems programming skills.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Start Learning
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">
                    Explore Courses
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Terminal Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs font-medium text-muted-foreground">
                    terminal
                  </span>
                </div>
                {/* Code lines */}
                <div className="p-5 font-mono text-sm leading-7 text-foreground/80">
                  <p>
                    <span className="text-primary">$</span> sudo apt update
                  </p>
                  <p>
                    <span className="text-primary">$</span> gcc -o hello
                    hello.c -Wall
                  </p>
                  <p>
                    <span className="text-primary">$</span> ./hello
                  </p>
                  <p className="text-green-500">Hello, World!</p>
                  <p>
                    <span className="text-primary">$</span> bash deploy.sh
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
                  </p>
                </div>
                {/* Glow */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Learning Path ─── */}
      <section className="border-t border-border bg-surface/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Learning Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A progressive skill stack that takes you from complete beginner to
              a confident systems programmer.
            </p>
          </AnimateOnScroll>

          <div className="relative mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-border lg:block" />

            {learningPath.map((step, i) => (
              <AnimateOnScroll key={step.title} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center px-4">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-2 text-xs font-semibold text-primary">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Master Systems Programming
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From structured courses to real practice — every tool you need is
              built into the platform.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 0.08}>
                <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why NuralPath ─── */}
      <section className="border-y border-border bg-surface/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Students Choose NuralPath
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built specifically for systems programming — not a generic coding
              platform.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <AnimateOnScroll key={d.title} delay={i * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold text-foreground">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Aspiring Engineers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Hear from students who've built real skills with NuralPath.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 0.1}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="border-y border-border bg-primary/5 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join hundreds of students mastering systems programming with
              structured learning paths.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-12" delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
