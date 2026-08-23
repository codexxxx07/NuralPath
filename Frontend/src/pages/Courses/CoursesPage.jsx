import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Users, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const categories = ["All", "Linux", "Shell", "C Programming", "Open Source"];

const courses = [
  {
    id: 1,
    title: "Linux Fundamentals",
    description:
      "Master the Linux command line, file systems, permissions, and basic system administration from scratch.",
    level: "Beginner",
    category: "Linux",
    instructor: "Ravi Kumar",
    duration: "6 weeks",
    rating: 4.8,
    students: 1240,
    gradient: "from-emerald-500/20 to-teal-600/20",
  },
  {
    id: 2,
    title: "Shell Scripting Mastery",
    description:
      "Write powerful Bash scripts to automate tasks — variables, loops, functions, grep, awk, and real-world projects.",
    level: "Intermediate",
    category: "Shell",
    instructor: "Ananya Sharma",
    duration: "8 weeks",
    rating: 4.7,
    students: 980,
    gradient: "from-blue-500/20 to-indigo-600/20",
  },
  {
    id: 3,
    title: "C Programming: From Basics to Advanced",
    description:
      "Build a strong foundation in C — data types, control flow, functions, pointers, memory management, and file I/O.",
    level: "Beginner",
    category: "C Programming",
    instructor: "Vikram Patel",
    duration: "10 weeks",
    rating: 4.9,
    students: 1560,
    gradient: "from-violet-500/20 to-purple-600/20",
  },
  {
    id: 4,
    title: "Linux System Administration",
    description:
      "Manage users, services, networking, storage, and security on production Linux servers with hands-on labs.",
    level: "Advanced",
    category: "Linux",
    instructor: "Ravi Kumar",
    duration: "12 weeks",
    rating: 4.6,
    students: 720,
    gradient: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: 5,
    title: "Advanced Shell Scripting",
    description:
      "Go beyond basics — text processing, regex, process management, trap signals, and building production-grade automation tools.",
    level: "Advanced",
    category: "Shell",
    instructor: "Ananya Sharma",
    duration: "6 weeks",
    rating: 4.5,
    students: 540,
    gradient: "from-cyan-500/20 to-sky-600/20",
  },
  {
    id: 6,
    title: "Data Structures in C",
    description:
      "Implement linked lists, stacks, queues, trees, and graphs in C. Build problem-solving skills with real coding challenges.",
    level: "Intermediate",
    category: "C Programming",
    instructor: "Vikram Patel",
    duration: "8 weeks",
    rating: 4.8,
    students: 890,
    gradient: "from-rose-500/20 to-pink-600/20",
  },
  {
    id: 7,
    title: "Open Source Contribution",
    description:
      "Navigate GitHub, understand pull requests, write documentation, and contribute to real open-source repositories.",
    level: "Intermediate",
    category: "Open Source",
    instructor: "Priya Menon",
    duration: "4 weeks",
    rating: 4.7,
    students: 650,
    gradient: "from-lime-500/20 to-green-600/20",
  },
  {
    id: 8,
    title: "Linux Kernel Internals",
    description:
      "Explore process scheduling, memory management, system calls, and kernel modules in the Linux kernel source.",
    level: "Advanced",
    category: "Linux",
    instructor: "Ravi Kumar",
    duration: "10 weeks",
    rating: 4.6,
    students: 410,
    gradient: "from-slate-500/20 to-zinc-600/20",
  },
];

const levelVariant = {
  Beginner: "success",
  Intermediate: "secondary",
  Advanced: "outline",
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
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Explore Our Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Structured, hands-on courses designed to take you from beginner to
              confident systems programmer. Learn Linux, Shell, C, and open source
              with expert mentors.
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
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
            >
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0 sm:flex-nowrap">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full border border-border px-4 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Course Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                      {/* Thumbnail area */}
                      <div
                        className={`flex h-40 items-center justify-center rounded-t-lg bg-gradient-to-br ${course.gradient}`}
                      >
                        <span className="text-4xl font-bold text-foreground/10">
                          {course.title.charAt(0)}
                        </span>
                      </div>

                      <CardContent className="flex flex-col gap-3 p-5">
                        <div className="flex items-center justify-between">
                          <Badge variant={levelVariant[course.level]}>
                            {course.level}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground leading-snug">
                          {course.title}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {course.students.toLocaleString()} students
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {course.duration}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          by <span className="font-medium text-foreground">{course.instructor}</span>
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

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No courses found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
