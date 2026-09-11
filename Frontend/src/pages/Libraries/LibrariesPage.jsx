import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Terminal,
  Users,
  ArrowRight,
  Library,
  Code2,
  FileText,
  GitBranch,
  Cpu,
  Rocket,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const tabs = ["All", "Courses", "Practice", "Community", "Roadmap"];

const resources = [
  {
    id: "course-dsa",
    category: "Courses",
    title: "Data Structures in C",
    description:
      "Course with an 8-week syllabus covering linked lists, stacks, queues, trees, graphs, expression conversion, and a capstone project.",
    icon: Code2,
    to: "/courses/6",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    status: "Available",
  },
  {
    id: "course-linux",
    category: "Courses",
    title: "Linux Fundamentals",
    description:
      "Command line, file systems, permissions, and system administration from scratch — 6 weeks.",
    icon: Terminal,
    to: "/courses/1",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    status: "Available",
  },
  {
    id: "course-shell",
    category: "Courses",
    title: "Shell Scripting Mastery",
    description:
      "Automation with Bash — variables, loops, functions, grep, awk, and real-world projects.",
    icon: BookOpen,
    to: "/courses/2",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    status: "Available",
  },
  {
    id: "course-c",
    category: "Courses",
    title: "C Programming",
    description:
      "Data types, control flow, pointers, memory management, and file I/O — the foundation for systems work.",
    icon: FileText,
    to: "/courses/3",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    status: "Available",
  },
  {
    id: "course-os",
    category: "Courses",
    title: "Open Source Contribution",
    description:
      "GitHub workflow, pull requests, documentation, and contributing to real repositories.",
    icon: GitBranch,
    to: "/courses/7",
    color: "text-lime-500",
    bg: "bg-lime-500/10",
    status: "Available",
  },
  {
    id: "practice-terminal",
    category: "Practice",
    title: "Interactive Practice Lab",
    description:
      "A built-in terminal simulator for hands-on practice with Linux and shell commands. No setup needed.",
    icon: Terminal,
    to: "/dashboard/practice-lab",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    status: "In Dashboard",
  },
  {
    id: "community-support",
    category: "Community",
    title: "Community Support",
    description:
      "Ask doubts, find study circles, and discuss projects with peers and mentors.",
    icon: Users,
    to: "/community",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    status: "Available",
  },
  {
    id: "roadmap-vlsi",
    category: "Roadmap",
    title: "VLSI Design Resources",
    description:
      "RTL design, verification, and physical design material. Content is being prepared — nothing published yet.",
    icon: Cpu,
    to: "/courses",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    status: "In Development",
  },
  {
    id: "roadmap-embedded",
    category: "Roadmap",
    title: "Embedded Systems Resources",
    description:
      "ARM, RISC-V, RTOS, and firmware material. Content is being prepared — nothing published yet.",
    icon: Cpu,
    to: "/courses",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    status: "In Development",
  },
  {
    id: "roadmap-fpga",
    category: "Roadmap",
    title: "FPGA Development Resources",
    description:
      "Verilog, VHDL, and SoC design material. Content is being prepared — nothing published yet.",
    icon: Cpu,
    to: "/courses",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    status: "In Development",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LibrariesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? resources
      : resources.filter((r) => r.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge variant="secondary" className="mb-4">
              <Library className="mr-1 h-3 w-3" />
              Libraries & Resources
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Learning <span className="gradient-text">Resources</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Everything currently available to learners — courses, practice tools,
              and community support. Content that isn't published yet is clearly
              marked as in development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource grid */}
      <section className="border-t border-border bg-surface/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-full border border-border px-4 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="wait">
              {filtered.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  custom={i}
                >
                  {resource.status === "In Development" ? (
                    <Card className="h-full border-border/50 opacity-75">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${resource.bg} ${resource.color}`}>
                            <resource.icon className="h-5 w-5" />
                          </div>
                          <Badge variant="outline" className="text-xs">In Development</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground font-display">
                          {resource.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {resource.description}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <Link to={resource.to} className="block h-full">
                      <Card className="h-full border-border/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
                        <CardContent className="flex h-full flex-col p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${resource.bg} ${resource.color}`}>
                              <resource.icon className="h-5 w-5" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {resource.status}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground font-display">
                            {resource.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                            Open resource
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No resources in this category yet.
            </div>
          )}

          {/* Note */}
          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
            <Rocket className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-foreground">
                More resources are coming
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This library only lists what actually exists today — no placeholders.
                As new course material, practice tools, and curated references are
                published, they'll appear here.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="sm" asChild>
                  <Link to="/community">
                    <Users className="mr-2 h-4 w-4" />
                    Suggest a resource
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/courses">Browse courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}