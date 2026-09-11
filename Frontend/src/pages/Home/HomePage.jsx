import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu,
  Zap,
  Layers,
  Terminal,
  FileTerminal,
  Braces,
  Network,
  BookOpen,
  LayoutDashboard,
  SquareTerminal,
  MessageSquare,
  Library,
  Users,
  GitBranch,
  Lock,
  Target,
  Monitor,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ListChecks,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
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

const liveTracks = [
  {
    icon: Terminal,
    title: "Linux & Systems",
    description:
      "Ground-up Linux fundamentals: filesystem, permissions, processes, and the tools every systems engineer depends on daily.",
    topics: ["Filesystem", "Processes", "Permissions", "Text Tools"],
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    link: "/courses?domain=linux",
  },
  {
    icon: FileTerminal,
    title: "Shell Scripting",
    description:
      "Write real shell scripts — automation, parsing, and everyday productivity using Bash and POSIX tools.",
    topics: ["Bash", "Scripting", "Automation", "POSIX"],
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    link: "/courses?domain=shell",
  },
  {
    icon: Braces,
    title: "C Programming",
    description:
      "The language at the heart of systems software: pointers, memory, structs, and building programs that run close to the metal.",
    topics: ["Pointers", "Memory", "Structs", "File I/O"],
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    link: "/courses?domain=c",
  },
  {
    icon: Network,
    title: "Data Structures in C",
    description:
      "An 8-week track implementing real data structures from scratch: linked lists, trees, heaps, graphs, and sorting.",
    topics: ["Linked Lists", "Trees", "Heaps", "Graphs"],
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    link: "/courses/6",
  },
];

const upcomingDomains = [
  {
    icon: Cpu,
    title: "VLSI Design",
    description: "RTL, verification, physical design, timing analysis.",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
  },
  {
    icon: Zap,
    title: "Embedded Systems",
    description: "ARM, RTOS, firmware, device drivers.",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
  },
  {
    icon: Layers,
    title: "FPGA Development",
    description: "Verilog/VHDL, SoC design, DSP on FPGA.",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "Structured Learning Tracks",
    description:
      "Curated paths in Linux, Shell, C, and Data Structures that take you from basics to building real programs.",
  },
  {
    icon: SquareTerminal,
    title: "Built-in Practice Lab",
    description:
      "An interactive terminal right in the platform. Practice commands and compile C code without any setup.",
  },
  {
    icon: LayoutDashboard,
    title: "Progress Dashboards",
    description:
      "Course progress, streaks, skill reports, and certificates all in one clean dashboard per role — student, mentor, or admin.",
  },
  {
    icon: MessageSquare,
    title: "Doubt Solving",
    description:
      "Ask questions when you're stuck. Other students and mentors help out — no question is too basic.",
  },
  {
    icon: Library,
    title: "Curated Resources",
    description:
      "Cheat sheets, references, and a roadmap section collecting the best learning material in one place.",
  },
  {
    icon: GitBranch,
    title: "Git & Open Source",
    description:
      "Learn version control and practice contribution workflows that prepare you for real open-source projects.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Pick a Track",
    description: "Start with Linux Fundamentals, Shell, C, or the Data Structures track based on your goals.",
    icon: Target,
  },
  {
    step: "02",
    title: "Follow the Curriculum",
    description: "Structured modules with hands-on exercises — each step builds on the last.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Practice Daily",
    description: "Use the practice lab to drill commands and compile code until concepts stick.",
    icon: Monitor,
  },
  {
    step: "04",
    title: "Build & Share",
    description: "Apply what you learn in projects and share them with the community for feedback.",
    icon: Users,
  },
];

const dsaWeeks = [
  "Complexity & Recursion",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Heaps",
  "Graphs",
  "Sorting & Searching",
  "Capstone Project",
];

const faqs = [
  {
    question: "Do I need any prior experience to get started?",
    answer:
      "No. The Linux, Shell, and C tracks start from the fundamentals. If you're comfortable using a computer and browser, you can start today.",
  },
  {
    question: "What do I need on my own machine?",
    answer:
      "Just a computer with an internet connection. The practice lab runs in your browser, so there's no software to install before you begin.",
  },
  {
    question: "Is the content free?",
    answer:
      "A free tier is available so you can start learning right away. Paid plans and their exact pricing are still being finalized and will be announced when ready.",
  },
  {
    question: "Are VLSI, Embedded, and FPGA courses available?",
    answer:
      "Not yet. Those tracks are in development — we're building them in the open. Anything not yet available is clearly labeled as in development rather than advertised as live.",
  },
  {
    question: "How do certificates work?",
    answer:
      "Certificates are currently a dashboard feature of the prototype. The official certification process will be defined and announced once the platform is fully live.",
  },
  {
    question: "How is this different from a content library?",
    answer:
      "This is a learning community: structured tracks, a practice lab, progress tracking, and other students to ask for help — not just a collection of videos.",
  },
];

function DashboardPreview({ role, title, accent, stats, menu }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs font-medium text-muted-foreground">{title}</span>
        <Badge variant="secondary" className="ml-auto gap-1 text-[10px]">
          <Lock className="h-2.5 w-2.5" />
          Preview
        </Badge>
      </div>
      <div className="flex flex-1">
        {/* mini sidebar */}
        <div className="hidden w-28 shrink-0 flex-col gap-1 border-r border-border bg-surface/60 p-3 sm:flex">
          {menu.map((item, i) => (
            <span
              key={item}
              className={`truncate rounded-md px-2 py-1 text-[10px] font-medium ${
                i === 0 ? `${accent} bg-secondary` : "text-muted-foreground"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        {/* content */}
        <div className="flex-1 p-4">
          <p className="text-xs font-semibold text-foreground">{role}</p>
          <p className="mb-3 text-[10px] text-muted-foreground">Multiline placeholder</p>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border/60 p-2">
                <p className="text-sm font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-secondary" />
            <div className="h-1.5 w-4/5 rounded bg-secondary" />
            <div className="h-1.5 w-3/5 rounded bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}

const dashboards = [
  {
    role: "Student",
    title: "student-dashboard",
    accent: "text-foreground",
    stats: [
      { label: "Courses", value: "4" },
      { label: "Streak", value: "12 days" },
      { label: "Skill score", value: "68%" },
      { label: "Certificates", value: "2" },
    ],
    menu: ["Overview", "My Courses", "Practice Lab", "Doubts"],
  },
  {
    role: "Mentor",
    title: "mentor-dashboard",
    accent: "text-foreground",
    stats: [
      { label: "Students", value: "18" },
      { label: "Open doubts", value: "5" },
      { label: "Assignments", value: "3" },
      { label: "Sessions", value: "2" },
    ],
    menu: ["Overview", "Courses", "Doubts", "Assignments"],
  },
  {
    role: "Admin",
    title: "admin-dashboard",
    accent: "text-foreground",
    stats: [
      { label: "Courses", value: "8" },
      { label: "Users", value: "320" },
      { label: "Events", value: "6" },
      { label: "Reviews", value: "9" },
    ],
    menu: ["Overview", "Courses", "Users", "Events"],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative overflow-hidden hero-gradient">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl"
              >
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Student-focused · Hands-on · Beginner friendly
                </Badge>
                <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Build the{" "}
                  <span className="gradient-text">C &amp; Linux</span>{" "}
                  Foundations Engineers Actually Use
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Hands-on learning paths in Linux, shell scripting, C, and
                  data structures — with a built-in practice lab, progress
                  dashboards, and a community of students learning right
                  alongside you.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                    <Link to="/register">
                      Start Learning Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Free tier available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Practice lab included</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>No experience required</span>
                  </div>
                </div>
              </motion.div>

              {/* C / Data Structures terminal illustration */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="relative hidden lg:block"
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl glow-indigo">
                  <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs font-medium text-muted-foreground font-mono">
                      list.c
                    </span>
                  </div>
                  <div className="p-5 font-mono text-sm leading-6 text-foreground/80">
                    <p>
                      <span className="text-purple-500">#include</span>{" "}
                      <span className="text-emerald-500">&lt;stdlib.h&gt;</span>
                    </p>
                    <p className="mt-2">
                      <span className="text-purple-500">typedef</span>{" "}
                      <span className="text-purple-500">struct</span> node {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-500">int</span> data;
                    </p>
                    <p className="pl-4 text-muted-foreground">struct node *next;</p>
                    <p>{"} node_t;"}</p>
                    <p className="mt-2">
                      <span className="text-purple-500">node_t</span> *push(
                      <span className="text-purple-500">node_t</span> *head,{" "}
                      <span className="text-purple-500">int</span> value){" "}
                      {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-500">node_t</span> *n ={" "}
                      <span className="text-cyan-500">malloc</span>(
                      <span className="text-purple-500">sizeof</span>(
                      <span className="text-purple-500">*</span>n));
                    </p>
                    <p className="pl-4">n-&gt;data = value;</p>
                    <p className="pl-4">n-&gt;next = head;</p>
                    <p className="pl-4">
                      <span className="text-purple-500">return</span> n;
                    </p>
                    <p>{"}"}</p>
                  </div>
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Learning Focus Strip ─── */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              What you'll actually learn here
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {liveTracks.map((t) => (
                <Link
                  key={t.title}
                  to={t.link}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <t.icon className={`h-4 w-4 ${t.textColor}`} />
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Live Learning Tracks ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Live Learning Tracks
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start Learning Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Four tracks are live right now, built for real skill development —
              not just video-watching.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {liveTracks.map((domain, i) => (
              <AnimateOnScroll key={domain.title} delay={i * 0.1}>
                <Link to={domain.link}>
                  <Card className="group h-full cursor-pointer border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${domain.bgColor} ${domain.textColor} transition-transform group-hover:scale-110`}
                      >
                        <domain.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground font-display">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {domain.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {domain.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Explore
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          {/* In development banner */}
          <AnimateOnScroll className="mt-10">
            <div className="grid gap-4 rounded-xl border border-border/50 bg-surface/40 p-6 sm:grid-cols-3">
              {upcomingDomains.map((d) => (
                <div key={d.title}>
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${d.bgColor} ${d.textColor}`}>
                      <d.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-foreground">{d.title}</h3>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      In Development
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              VLSI, Embedded, and FPGA tracks are being built in the open.
              Follow the{" "}
              <Link to="/libraries" className="font-medium text-primary hover:underline">
                roadmap in Libraries
              </Link>{" "}
              and we'll announce when they're ready.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Platform Features ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Platform Features
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tools Focused on Helping You Learn
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything here exists to move you from watching to doing — as
              quickly as possible.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 0.08}>
                <Card className="h-full border-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">
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

      {/* ─── Dashboard Preview ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Dashboards
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Learning, in One Place
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Separate dashboards for students, mentors, and admins — with
              courses, practice, doubt solving, and progress tracking.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {dashboards.map((d, i) => (
              <AnimateOnScroll key={d.role} delay={i * 0.1}>
                <DashboardPreview {...d} />
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="mt-10 text-center">
            <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 shrink-0" />
              This shows sample layout only. Sign in to open your real, live dashboard.
            </p>
            <Button size="lg" asChild className="mt-6 bg-primary hover:bg-primary/90 gap-2">
              <Link to="/dashboard">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── DSA Track ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll>
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Code2 className="mr-1 h-3 w-3" />
                  Featured Track
                </Badge>
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Data Structures in C — 8 Weeks to Real Skill
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  This track takes you from recursion and complexity analysis to
                  building full data structure implementations in C. Every
                  structure is written by you, from scratch — not just watched.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Implement linked lists, stacks, and queues by hand",
                    "Understand trees, heaps, and graphs through code",
                    "Finish with a capstone project you can show off",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                    <Link to="/courses/6">
                      View the DSA Track
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground font-display">
                      8-Week Curriculum
                    </h3>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {dsaWeeks.map((week, i) => (
                      <div
                        key={week}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface/40 px-3 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{week}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              How It Works
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              From Your First Command to Your First Project
            </h2>
          </AnimateOnScroll>

          <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.12}>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-primary/50 font-mono">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground font-display">
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

      {/* ─── Community teaser ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateOnScroll>
              <Badge variant="secondary" className="mb-4">
                <Users className="mr-1 h-3 w-3" />
                Student Community
              </Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                You're Not Learning Alone
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Ask doubts, review each other's code, and collaborate on
                projects. The community is where the real learning sticks.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
                  <Link to="/community">
                    Join the Community
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about">Learn About Us</Link>
                </Button>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: MessageSquare,
                    title: "Doubt solving",
                    description: "Get unstuck fast with help from peers and mentors.",
                    color: "text-emerald-500",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    icon: Network,
                    title: "Study groups",
                    description: "Learn in small groups moving through tracks together.",
                    color: "text-cyan-500",
                    bg: "bg-cyan-500/10",
                  },
                  {
                    icon: GitBranch,
                    title: "Project collabs",
                    description: "Team up on C and shell projects for real experience.",
                    color: "text-indigo-500",
                    bg: "bg-indigo-500/10",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Safe space",
                    description: "Questions at every level are welcome, always.",
                    color: "text-purple-500",
                    bg: "bg-purple-500/10",
                  },
                ].map((c) => (
                  <Card key={c.title} className="border-border/50">
                    <CardContent className="p-5">
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} ${c.color}`}>
                        <c.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-12" delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">
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

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden border-t border-border py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create a free account, pick a track, and write your first command
              today. The community will be right there with you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link to="/courses">
                  Browse Courses
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}