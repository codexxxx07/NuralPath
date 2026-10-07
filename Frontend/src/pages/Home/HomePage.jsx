import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

const liveTracks = [
  {
    title: "Linux & Systems",
    description:
      "Ground-up Linux fundamentals: filesystem, permissions, processes, and the tools every systems engineer depends on daily.",
    topics: ["Filesystem", "Processes", "Permissions", "Text Tools"],
    link: "/courses?domain=linux",
  },
  {
    title: "Shell Scripting",
    description:
      "Write real shell scripts — automation, parsing, and everyday productivity using Bash and POSIX tools.",
    topics: ["Bash", "Scripting", "Automation", "POSIX"],
    link: "/courses?domain=shell",
  },
  {
    title: "C Programming",
    description:
      "The language at the heart of systems software: pointers, memory, structs, and building programs that run close to the metal.",
    topics: ["Pointers", "Memory", "Structs", "File I/O"],
    link: "/courses?domain=c",
  },
  {
    title: "Data Structures in C",
    description:
      "An 8-week track implementing real data structures from scratch: linked lists, trees, heaps, graphs, and sorting.",
    topics: ["Linked Lists", "Trees", "Heaps", "Graphs"],
    link: "/courses/6",
  },
];

const upcomingDomains = [
  { title: "VLSI Design", description: "RTL, verification, physical design, timing analysis." },
  { title: "Embedded Systems", description: "ARM, RTOS, firmware, device drivers." },
  { title: "FPGA Development", description: "Verilog/VHDL, SoC design, DSP on FPGA." },
];

const features = [
  {
    title: "Structured Learning Tracks",
    description:
      "Curated paths in Linux, Shell, C, and Data Structures that take you from basics to building real programs.",
  },
  {
    title: "Built-in Practice Lab",
    description:
      "An interactive terminal right in the platform. Practice commands and compile C code without any setup.",
  },
  {
    title: "Progress Dashboards",
    description:
      "Course progress, streaks, skill reports, and certificates in one dashboard per role — student, mentor, or admin.",
  },
  {
    title: "Doubt Solving",
    description:
      "Ask questions when you're stuck. Other students and mentors help out — no question is too basic.",
  },
  {
    title: "Curated Resources",
    description:
      "Cheat sheets, references, and a roadmap collecting the best learning material in one place.",
  },
  {
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
  },
  {
    step: "02",
    title: "Follow the Curriculum",
    description: "Structured modules with hands-on exercises — each step builds on the last.",
  },
  {
    step: "03",
    title: "Practice Daily",
    description: "Use the practice lab to drill commands and compile code until concepts stick.",
  },
  {
    step: "04",
    title: "Build & Share",
    description: "Apply what you learn in projects and share them with the community for feedback.",
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

const dashboards = [
  {
    role: "Student",
    items: ["Courses & progress", "Practice lab", "Doubts & assignments", "Certificates"],
  },
  {
    role: "Mentor",
    items: ["Students & submissions", "Live classes", "Course management", "Analytics"],
  },
  {
    role: "Admin",
    items: ["Users & batches", "Courses & mentors", "Payments", "Platform analytics"],
  },
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Learn better.
                <br />
                Build consistently.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A focused learning platform for students, mentors and communities
                — hands-on paths in Linux, shell scripting, C, and data
                structures, with a built-in practice lab.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Free tier available &nbsp;·&nbsp; Practice lab included &nbsp;·&nbsp; No experience required
              </p>
            </div>

            {/* Code preview */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span className="font-mono text-xs text-muted-foreground">list.c</span>
                  <span className="font-mono text-xs text-muted-foreground">C</span>
                </div>
                <div className="p-6 font-mono text-sm leading-7 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">#include</span> &lt;stdlib.h&gt;
                  </p>
                  <p className="mt-2">
                    <span className="font-medium text-foreground">typedef</span> struct node {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="font-medium text-foreground">int</span> data;
                  </p>
                  <p className="pl-4">struct node *next;</p>
                  <p>{"} node_t;"}</p>
                  <p className="mt-2">
                    <span className="font-medium text-foreground">node_t</span> *push(
                    <span className="font-medium text-foreground">node_t</span> *head,{" "}
                    <span className="font-medium text-foreground">int</span> value) {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="font-medium text-foreground">node_t</span> *n = malloc(
                    <span className="font-medium text-foreground">sizeof</span>(*n));
                  </p>
                  <p className="pl-4">n-&gt;data = value;</p>
                  <p className="pl-4">n-&gt;next = head;</p>
                  <p className="pl-4">
                    <span className="font-medium text-foreground">return</span> n;
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning focus strip */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
            <span className="shrink-0 text-sm text-muted-foreground">
              What you&apos;ll actually learn here
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {liveTracks.map((t) => (
                <Link
                  key={t.title}
                  to={t.link}
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Learning Tracks */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Live Learning Tracks</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Start learning today
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four tracks are live right now, built for real skill development —
              not just video-watching.
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {liveTracks.map((track) => (
              <Link
                key={track.title}
                to={track.link}
                className="group flex items-start justify-between gap-6 border-t border-border py-6 transition-colors hover:bg-muted/40"
              >
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {track.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {track.topics.join(" · ")}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          {/* In development */}
          <div className="mt-12 border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-10">
                {upcomingDomains.map((d) => (
                  <div key={d.title}>
                    <p className="text-sm font-medium text-foreground">{d.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                  </div>
                ))}
              </div>
              <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                In development
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
              VLSI, Embedded, and FPGA tracks are being built in the open. Follow
              the{" "}
              <Link to="/libraries" className="font-medium text-primary hover:underline">
                roadmap in Libraries
              </Link>{" "}
              and we&apos;ll announce when they&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Platform Features</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Tools focused on helping you learn
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything here exists to move you from watching to doing — as
              quickly as possible.
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="border-t border-border py-6">
                <h3 className="text-base font-medium text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Dashboards</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Your learning, in one place
            </h2>
            <p className="mt-3 text-muted-foreground">
              Separate dashboards for students, mentors, and admins — with
              courses, practice, doubt solving, and progress tracking.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {dashboards.map((d) => (
              <div key={d.role} className="border-t border-border pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {d.role}
                </h3>
                <ul className="mt-3 space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Sign in to open your real, live dashboard with your own courses and
              progress.
            </p>
            <Button asChild className="mt-4">
              <Link to="/dashboard">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* DSA Track */}
      <section className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <Eyebrow>Featured Track</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Data Structures in C — 8 weeks to real skill
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
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/courses/6">
                    View the DSA Track
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                8-Week Curriculum
              </h3>
              <ul className="mt-4">
                {dsaWeeks.map((week, i) => (
                  <li
                    key={week}
                    className="flex items-center gap-4 border-t border-border py-3 text-sm"
                  >
                    <span className="w-6 shrink-0 font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground">{week}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From your first command to your first project
            </h2>
          </div>

          <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="border-t border-border py-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.step}
                </span>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community teaser */}
      <section className="border-y border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <Eyebrow>Student Community</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                You&apos;re not learning alone
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

            <div className="grid gap-x-10 sm:grid-cols-2">
              {[
                {
                  title: "Doubt solving",
                  description: "Get unstuck fast with help from peers and mentors.",
                },
                {
                  title: "Study groups",
                  description: "Learn in small groups moving through tracks together.",
                },
                {
                  title: "Project collabs",
                  description: "Team up on C and shell projects for real experience.",
                },
                {
                  title: "Safe space",
                  description: "Questions at every level are welcome, always.",
                },
              ].map((c) => (
                <div key={c.title} className="border-t border-border py-5">
                  <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10">
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to start learning?
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
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
