import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const categories = ["All", "Linux", "Shell", "C Programming", "Open Source"];

const domainToCategory = {
  linux: "Linux",
  shell: "Shell",
  c: "C Programming",
  "open-source": "Open Source",
};

const courses = [
  {
    id: 1,
    title: "Linux Fundamentals",
    description:
      "Master the Linux command line, file systems, permissions, and basic system administration from scratch.",
    level: "Beginner",
    category: "Linux",
    duration: "6 weeks",
  },
  {
    id: 2,
    title: "Shell Scripting Mastery",
    description:
      "Write powerful Bash scripts to automate tasks — variables, loops, functions, grep, awk, and real-world projects.",
    level: "Intermediate",
    category: "Shell",
    duration: "8 weeks",
  },
  {
    id: 3,
    title: "C Programming: From Basics to Advanced",
    description:
      "Build a strong foundation in C — data types, control flow, functions, pointers, memory management, and file I/O.",
    level: "Beginner",
    category: "C Programming",
    duration: "10 weeks",
  },
  {
    id: 4,
    title: "Linux System Administration",
    description:
      "Manage users, services, networking, storage, and security on production Linux servers with hands-on labs.",
    level: "Advanced",
    category: "Linux",
    duration: "12 weeks",
  },
  {
    id: 5,
    title: "Advanced Shell Scripting",
    description:
      "Go beyond basics — text processing, regex, process management, trap signals, and building production-grade automation tools.",
    level: "Advanced",
    category: "Shell",
    duration: "6 weeks",
  },
  {
    id: 6,
    title: "Data Structures in C",
    description:
      "Implement linked lists, stacks, queues, trees, and graphs in C. Build problem-solving skills with real coding challenges.",
    level: "Intermediate",
    category: "C Programming",
    duration: "8 weeks",
  },
  {
    id: 7,
    title: "Open Source Contribution",
    description:
      "Navigate GitHub, understand pull requests, write documentation, and contribute to real open-source repositories.",
    level: "Intermediate",
    category: "Open Source",
    duration: "4 weeks",
  },
  {
    id: 8,
    title: "Linux Kernel Internals",
    description:
      "Explore process scheduling, memory management, system calls, and kernel modules in the Linux kernel source.",
    level: "Advanced",
    category: "Linux",
    duration: "10 weeks",
  },
];

const staticDomains = {
  vlsi: "VLSI Design",
  embedded: "Embedded Systems",
  fpga: "FPGA Development",
};

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(() => {
    const domain = searchParams.get("domain");
    return domain && domainToCategory[domain] ? domainToCategory[domain] : "All";
  });

  const domain = searchParams.get("domain");

  const isStaticDomain = domain && staticDomains[domain];

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Courses
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Structured, hands-on courses designed to take you from beginner to
              confident systems programmer. Learn Linux, Shell, C, and open source
              with a project-driven approach.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & list */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Filter Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex-wrap gap-x-6 gap-y-2">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Static-domain empty state */}
          {isStaticDomain && (
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {staticDomains[domain]} — in development
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                This learning domain doesn't have published course content yet.
                The platform currently focuses on Linux & Systems programming,
                Shell scripting, C, and Data Structures. When {staticDomains[domain]} content is ready,
                it will appear here.
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link to="/courses">Browse available courses</Link>
              </Button>
            </div>
          )}

          {/* Course list */}
          {!isStaticDomain && (
            <div className="mt-10 grid gap-x-12 sm:grid-cols-2">
              {filtered.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group block border-t border-border py-6 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-foreground">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {course.level} · {course.duration} · {course.category}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:underline">
                      View course
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isStaticDomain && filtered.length === 0 && (
            <div className="border-t border-border py-16 text-center text-sm text-muted-foreground">
              No courses found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
