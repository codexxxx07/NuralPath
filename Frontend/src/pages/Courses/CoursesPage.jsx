import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
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
      {/* Hero */}
      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Structured, hands-on courses designed to take you from beginner to
              confident systems programmer. Learn Linux, Shell, C, and open source
              with a project-driven approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0 sm:flex-nowrap">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Static-domain empty state */}
          {isStaticDomain && (
            <div className="mt-10 rounded-lg border border-border bg-card p-12 text-center">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {staticDomains[domain]} — in development
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
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

          {/* Course Grid */}
          {!isStaticDomain && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {filtered.map((course, i) => (
                  <motion.div
                    key={course.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                    variants={cardVariants}
                  >
                    <Link to={`/courses/${course.id}`} className="block h-full">
                      <Card className="h-full transition-colors hover:border-muted-foreground/40">
                        {/* Preview block */}
                        <div className="flex h-36 items-center justify-center border-b border-border bg-muted">
                          <span className="text-4xl font-semibold tracking-tight text-muted-foreground">
                            {course.title.charAt(0)}
                          </span>
                        </div>

                        <CardContent className="flex flex-col gap-3 p-5">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{course.level}</Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {course.duration}
                            </span>
                          </div>

                          <h3 className="text-base font-semibold tracking-tight text-foreground">
                            {course.title}
                          </h3>

                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {course.description}
                          </p>

                          <Button variant="outline" className="mt-2 w-full" size="sm">
                            Learn More
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isStaticDomain && filtered.length === 0 && (
            <div className="py-20 text-center text-sm text-muted-foreground">
              No courses found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
