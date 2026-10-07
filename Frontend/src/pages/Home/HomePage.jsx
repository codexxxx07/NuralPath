import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
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
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

const liveTracks = [
  {
    icon: Terminal,
    title: "Linux & Systems",
    description:
      "Ground-up Linux fundamentals: filesystem, permissions, processes, and the tools every systems engineer depends on daily.",
    topics: ["Filesystem", "Processes", "Permissions", "Text Tools"],
    link: "/courses?domain=linux",
  },
  {
    icon: FileTerminal,
    title: "Shell Scripting",
    description:
      "Write real shell scripts — automation, parsing, and everyday productivity using Bash and POSIX tools.",
    topics: ["Bash", "Scripting", "Automation", "POSIX"],
    link: "/courses?domain=shell",
  },
  {
    icon: Braces,
    title: "C Programming",
    description:
      "The language at the heart of systems software: pointers, memory, structs, and building programs that run close to the metal.",
    topics: ["Pointers", "Memory", "Structs", "File I/O"],
    link: "/courses?domain=c",
  },
  {
    icon: Network,
    title: "Data Structures in C",
    description:
      "An 8-week track implementing real data structures from scratch: linked lists, trees, heaps, graphs, and sorting.",
    topics: ["Linked Lists", "Trees", "Heaps", "Graphs"],
    link: "/courses/6",
  },
];

const upcomingDomains = [
  {
    icon: Cpu,
    title: "VLSI Design",
    description: "RTL, verification, physical design, timing analysis.",
  },
  {
    icon: Zap,
    title: "Embedded Systems",
    description: "ARM, RTOS, firmware, device drivers.",
  },
  {
    icon: Layers,
    title: "FPGA Development",
    description: "Verilog/VHDL, SoC design, DSP on FPGA.",
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

function DashboardPreview({ role, title, stats, menu }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="ml-1 font-mono text-xs text-muted-foreground">{title}</span>
        <Badge variant="secondary" className="ml-auto gap-1 text-[10px]">
          <Lock className="h-2.5 w-2.5" />
          Preview
        </Badge>
      </div>
      <div className="flex flex-1">
        <div className="hidden w-28 shrink-0 flex-col gap-1 border-r border-border bg-surface/60 p-3 sm:flex">
          {menu.map((item, i) => (
            <span
              key={item}
              className={`truncate rounded px-2 py-1 text-[10px] font-medium ${
                i === 0 ? "bg-accent text-foreground" : "text-muted-foreground"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex-1 p-4">
          <p className="text-xs font-semibold text-foreground">{role}</p>
          <p className="mb-3 text-[10px] text-muted-foreground">Multiline placeholder</p>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-md border border-border/60 p-2">
                <p className="text-sm font-semibold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-muted" />
            <div className="h-1.5 w-4/5 rounded bg-muted" />
            <div className="h-1.5 w-3/5 rounded bg-muted" />
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
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-xl"
            >
              <Eyebrow>NuralPath</Eyebrow>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Build the{" "}
                <span className="text-primary">C &amp; Linux</span>{" "}
                foundations engineers actually use
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Hands-on learning paths in Linux, shell scripting, C, and data
                structures — with a built-in practice lab, progress dashboards,
                and a community of students learning right alongside you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Start Learning Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

            {/* C / Data Structures terminal preview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                  <span className="font-mono text-xs text-muted-foreground">list.c</span>
                </div>
                <div className="p-6 font-mono text-sm leading-6 text-foreground/80">
                  <p>
                    <span className="text-primary">#include</span>{" "}
                    <span className="text-emerald-500">&lt;stdlib.h&gt;</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-primary">typedef</span>{" "}
                    <span className="text-primary">struct</span> node {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="text-primary">int</span> data;
                  </p>
                  <p className="pl-4 text-muted-foreground">struct node *next;</p>
                  <p>{"} node_t;"}</p>
                  <p className="mt-2">
                    <span className="text-primary">node_t</span> *push(
                    <span className="text-primary">node_t</span> *head,{" "}
                    <span className="text-primary">int</span> value){" "}
                    {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="text-primary">node_t</span> *n ={" "}
                    <span className="text-cyan-500">malloc</span>(
                    <span className="text-primary">sizeof</span>(
                    <span className="text-primary">*</span>n));
                  </p>
                  <p className="pl-4">n-&gt;data = value;</p>
                  <p className="pl-4">n-&gt;next = head;</p>
                  <p className="pl-4">
                    <span className="text-primary">return</span> n;
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Focus Strip */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              What you&apos;ll actually learn here
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {liveTracks.map((t) => (
                <Link
                  key={t.title}
                  to={t.link}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-muted-foreground/40"
                >
                  <t.icon className="h-4 w-4 text-muted-foreground" />
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Learning Tracks */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <Eyebrow>Live Learning Tracks</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Start Learning Today
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four tracks are live right now, built for real skill development —
              not just video-watching.
            </p>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liveTracks.map((domain, i) => (
              <AnimateOnScroll key={domain.title} delay={i * 0.06}>
                <Link to={domain.link}>
                  <Card className="group h-full transition-colors hover:border-muted-foreground/40">
                    <CardContent className="p-5">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <domain.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {domain.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {domain.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
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
          <AnimateOnScroll className="mt-12">
            <div className="grid gap-6 rounded-lg border border-border bg-surface p-6 sm:grid-cols-3">
              {upcomingDomains.map((d) => (
                <div key={d.title}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <d.icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{d.title}</h3>
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
              and we&apos;ll announce when they&apos;re ready.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Platform Features */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <Eyebrow>Platform Features</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Tools Focused on Helping You Learn
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything here exists to move you from watching to doing — as
              quickly as possible.
            </p>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
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

      {/* Dashboard Preview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <Eyebrow>Dashboards</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Your Learning, in One Place
            </h2>
            <p className="mt-3 text-muted-foreground">
              Separate dashboards for students, mentors, and admins — with
              courses, practice, doubt solving, and progress tracking.
            </p>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {dashboards.map((d, i) => (
              <AnimateOnScroll key={d.role} delay={i * 0.06}>
                <DashboardPreview {...d} />
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="mt-10 text-center">
            <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 shrink-0" />
              This shows sample layout only. Sign in to open your real, live dashboard.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link to="/dashboard">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* DSA Track */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll>
              <div className="max-w-xl">
                <Eyebrow>Featured Track</Eyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link to="/courses/6">
                      View the DSA Track
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.08}>
              <Card>
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      8-Week Curriculum
                    </h3>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {dsaWeeks.map((week, i) => (
                      <div
                        key={week}
                        className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted font-mono text-xs text-muted-foreground">
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

      {/* How It Works */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From Your First Command to Your First Project
            </h2>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.06}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
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

      {/* Community teaser */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateOnScroll>
              <div className="max-w-xl">
                <Eyebrow>Student Community</Eyebrow>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  You&apos;re Not Learning Alone
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Ask doubts, review each other&apos;s code, and collaborate on
                  projects. The community is where the real learning sticks.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/community">
                      Join the Community
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/about">Learn About Us</Link>
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: MessageSquare,
                    title: "Doubt solving",
                    description: "Get unstuck fast with help from peers and mentors.",
                  },
                  {
                    icon: Network,
                    title: "Study groups",
                    description: "Learn in small groups moving through tracks together.",
                  },
                  {
                    icon: GitBranch,
                    title: "Project collabs",
                    description: "Team up on C and shell projects for real experience.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Safe space",
                    description: "Questions at every level are welcome, always.",
                  },
                ].map((c) => (
                  <Card key={c.title}>
                    <CardContent className="p-5">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-10" delay={0.05}>
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

      {/* CTA */}
      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create a free account, pick a track, and write your first command
              today. The community will be right there with you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
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