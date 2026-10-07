import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const tabs = ["All", "Courses", "Practice", "Community", "Roadmap"];

const resources = [
  {
    id: "course-dsa",
    category: "Courses",
    title: "Data Structures in C",
    description:
      "Course with an 8-week syllabus covering linked lists, stacks, queues, trees, graphs, expression conversion, and a capstone project.",
    to: "/courses/6",
    status: "Available",
  },
  {
    id: "course-linux",
    category: "Courses",
    title: "Linux Fundamentals",
    description:
      "Command line, file systems, permissions, and system administration from scratch — 6 weeks.",
    to: "/courses/1",
    status: "Available",
  },
  {
    id: "course-shell",
    category: "Courses",
    title: "Shell Scripting Mastery",
    description:
      "Automation with Bash — variables, loops, functions, grep, awk, and real-world projects.",
    to: "/courses/2",
    status: "Available",
  },
  {
    id: "course-c",
    category: "Courses",
    title: "C Programming",
    description:
      "Data types, control flow, pointers, memory management, and file I/O — the foundation for systems work.",
    to: "/courses/3",
    status: "Available",
  },
  {
    id: "course-os",
    category: "Courses",
    title: "Open Source Contribution",
    description:
      "GitHub workflow, pull requests, documentation, and contributing to real repositories.",
    to: "/courses/7",
    status: "Available",
  },
  {
    id: "practice-terminal",
    category: "Practice",
    title: "Interactive Practice Lab",
    description:
      "A built-in terminal simulator for hands-on practice with Linux and shell commands. No setup needed.",
    to: "/dashboard/practice-lab",
    status: "In Dashboard",
  },
  {
    id: "community-support",
    category: "Community",
    title: "Community Support",
    description:
      "Ask doubts, find study circles, and discuss projects with peers and mentors.",
    to: "/community",
    status: "Available",
  },
  {
    id: "roadmap-vlsi",
    category: "Roadmap",
    title: "VLSI Design Resources",
    description:
      "RTL design, verification, and physical design material. Content is being prepared — nothing published yet.",
    to: "/courses",
    status: "In Development",
  },
  {
    id: "roadmap-embedded",
    category: "Roadmap",
    title: "Embedded Systems Resources",
    description:
      "ARM, RISC-V, RTOS, and firmware material. Content is being prepared — nothing published yet.",
    to: "/courses",
    status: "In Development",
  },
  {
    id: "roadmap-fpga",
    category: "Roadmap",
    title: "FPGA Development Resources",
    description:
      "Verilog, VHDL, and SoC design material. Content is being prepared — nothing published yet.",
    to: "/courses",
    status: "In Development",
  },
];

export default function LibrariesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? resources
      : resources.filter((r) => r.category === activeTab);

  const sections =
    activeTab === "All"
      ? tabs
          .filter((tab) => tab !== "All")
          .map((category) => ({
            category,
            items: resources.filter((r) => r.category === category),
          }))
      : [{ category: activeTab, items: filtered }];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Libraries & Resources
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Learning Resources
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Everything currently available to learners — courses, practice tools,
              and community support. Content that isn't published yet is clearly
              marked as in development.
            </p>
          </div>
        </div>
      </section>

      {/* Resource list */}
      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex-wrap gap-x-6 gap-y-2">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-xs text-muted-foreground">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          {filtered.length > 0 && (
            <div className="mt-10 space-y-12">
              {sections.map(({ category, items }) => (
                <section key={category}>
                  <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
                    {category}
                  </h2>
                  <div>
                    {items.map((resource) =>
                      resource.status === "In Development" ? (
                        <div
                          key={resource.id}
                          className="flex items-start justify-between gap-6 border-b border-border py-5 opacity-75"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {resource.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {resource.status}
                          </span>
                        </div>
                      ) : (
                        <Link
                          key={resource.id}
                          to={resource.to}
                          className="group flex items-start justify-between gap-6 border-b border-border py-5 transition-colors hover:bg-muted/40"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {resource.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {resource.description}
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {resource.status}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </Link>
                      )
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="mt-10 border-t border-border py-12 text-center">
              <p className="text-sm font-medium text-foreground">
                No resources in this category yet.
              </p>
            </div>
          )}

          {/* Note */}
          <div className="mt-14 border-t border-border pt-6">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              More resources are coming
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              This library only lists what actually exists today — no placeholders.
              As new course material, practice tools, and curated references are
              published, they'll appear here.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <Link to="/community">Suggest a resource</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/courses">Browse courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
