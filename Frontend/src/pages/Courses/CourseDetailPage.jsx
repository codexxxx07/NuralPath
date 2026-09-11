import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const courseData = {
  1: {
    title: "Linux Fundamentals",
    description:
      "Master the Linux command line, file systems, permissions, and basic system administration. This course takes you from zero to confidently navigating and managing a Linux environment.",
    level: "Beginner",
    duration: "6 weeks",
    gradient: "from-emerald-500/20 to-teal-600/20",
    whatYouWillLearn: [
      "Navigate the Linux file system using the command line",
      "Manage files, directories, and permissions effectively",
      "Understand and configure user and group management",
      "Install, update, and remove software packages",
      "Monitor system processes and manage services",
      "Configure networking and troubleshoot connectivity",
    ],
    prerequisites: [
      "A computer with at least 4GB RAM",
      "Basic computer literacy — no prior Linux experience needed",
      "Willingness to practice in the terminal daily",
    ],
    syllabus: [
      {
        title: "Week 1 — Getting Started with Linux",
        content:
          "Introduction to Linux distributions, installing Linux in a VM, navigating the terminal, basic commands (ls, cd, pwd, mkdir, rm, cp, mv), understanding the file system hierarchy.",
      },
      {
        title: "Week 2 — File Permissions & Ownership",
        content:
          "Understanding rwx permissions, chmod, chown, chgrp, special permissions (SUID, SGID, Sticky Bit), umask, and access control lists.",
      },
      {
        title: "Week 3 — Users, Groups & Process Management",
        content:
          "Creating and managing users and groups, /etc/passwd and /etc/shadow, switching users, running processes, kill signals, background jobs, and process monitoring with ps, top, and htop.",
      },
      {
        title: "Week 4 — Package Management & Software",
        content:
          "Using apt and dpkg on Debian-based systems, managing repositories, installing software from source, updating and upgrading the system, and managing services with systemd.",
      },
      {
        title: "Week 5 — Networking Basics",
        content:
          "Configuring IP addresses, understanding netstat and ss, using curl and wget, DNS resolution, SSH basics, and basic firewall concepts with ufw.",
      },
      {
        title: "Week 6 — System Monitoring & Final Project",
        content:
          "Disk usage and management (df, du, fdisk), log files and journalctl, system backups, crontab for scheduling, and a final project: set up and configure a complete Linux environment.",
      },
    ],
  },
  6: {
    title: "Data Structures in C",
    isDsa: true,
    description:
      "Implement linked lists, stacks, queues, trees, and graphs in C. Build problem-solving skills with real coding challenges — the foundation of every serious software engineer.",
    level: "Intermediate",
    duration: "8 weeks",
    gradient: "from-rose-500/20 to-pink-600/20",
    whatYouWillLearn: [
      "Implement linked lists, stacks, and queues in C",
      "Understand complexity analysis and when to choose each structure",
      "Build binary trees, heaps, and balanced structures",
      "Traverse and search graphs using BFS and DFS",
      "Solve expression conversion, parsing, and evaluation problems",
      "Apply recursion and backtracking to real problems",
    ],
    prerequisites: [
      "Solid C programming basics — pointers, structs, memory management",
      "A Linux environment with gcc installed",
      "Comfort with a text editor and the command line",
    ],
    syllabus: [
      {
        title: "Week 1 — Complexity & Recursion",
        content:
          "Big-O analysis, growth rates, recurrence relations, and writing clean recursive functions in C.",
      },
      {
        title: "Week 2 — Linked Lists",
        content:
          "Singly and doubly linked lists, insertion, deletion, reversal, cycle detection, and real usage patterns.",
      },
      {
        title: "Week 3 — Stacks & Queues",
        content:
          "Array and linked implementations, applications of stacks — expression conversion (infix/postfix/prefix), evaluation, and balanced parentheses.",
      },
      {
        title: "Week 4 — Trees",
        content:
          "Binary trees, binary search trees, tree traversals (pre/in/post/level order), height and balancing fundamentals.",
      },
      {
        title: "Week 5 — Heaps & Priority Queues",
        content:
          "Binary heaps, heapify, heap sort, and priority queue applications.",
      },
      {
        title: "Week 6 — Graphs & Traversals",
        content:
          "Adjacency list and matrix representations, BFS and DFS, connected components, and shortest-path foundations.",
      },
      {
        title: "Week 7 — Searching & Sorting",
        content:
          "Binary search, merge sort, quicksort, and analyzing real-world sorting behavior in C.",
      },
      {
        title: "Week 8 — Capstone Project",
        content:
          "Build a small compiler/expression evaluator or a mini-search engine that ties together the data structures learned in the course.",
      },
    ],
  },
  default: {
    title: "Course",
    description: "Course details are being finalized.",
    level: "Intermediate",
    duration: "8 weeks",
    gradient: "from-primary/20 to-primary/10",
    whatYouWillLearn: [
      "Understand core concepts and fundamentals",
      "Apply practical skills through hands-on exercises",
      "Build real-world projects to demonstrate mastery",
    ],
    prerequisites: [
      "Basic computer literacy",
      "Access to a computer with internet connection",
    ],
    syllabus: [
      {
        title: "Week 1 — Introduction",
        content:
          "Overview of the course, setting up the development environment, and first hands-on exercise.",
      },
      {
        title: "Week 2 — Core Concepts",
        content:
          "Deep dive into fundamental concepts with guided examples and practice exercises.",
      },
    ],
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courseData[id] || courseData.default;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              All Courses
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={course.level === "Beginner" ? "success" : course.level === "Advanced" ? "outline" : "secondary"}>
                    {course.level}
                  </Badge>
                  {course.isDsa && (
                    <Badge variant="secondary" className="gap-1">
                      <BookOpen className="h-3 w-3" />
                      DSA Track
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Flexible Schedule
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4 w-4" />
                    Certificate Included
                  </span>
                </div>
              </div>

              {/* Enroll Card */}
              <Card className="border-border self-start">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br ${course.gradient}`}>
                    <span className="text-5xl font-bold text-foreground/10">
                      {course.title.charAt(0)}
                    </span>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/register">
                      Enroll Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Create a free account to get started
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Duration</span>
                      <span className="font-medium text-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Level</span>
                      <span className="font-medium text-foreground">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Learning Path</span>
                      <span className="font-medium text-foreground">
                        {course.isDsa ? "Data Structures" : "Systems Track"}
                      </span>
                    </div>
                    {course.isDsa && (
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Certificate</span>
                        <span className="font-medium text-foreground">Yes</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-12">
              {/* What You'll Learn */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-2xl font-bold text-foreground">What You&apos;ll Learn</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-2xl font-bold text-foreground">Prerequisites</h2>
                <ul className="mt-6 space-y-3">
                  {course.prerequisites.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Curriculum */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-2xl font-bold text-foreground">Curriculum</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {course.syllabus.length} modules · {course.duration}
                </p>
                <Accordion type="single" collapsible className="mt-6 w-full">
                  {course.syllabus.map((module, i) => (
                    <AccordionItem key={i} value={`module-${i}`}>
                      <AccordionTrigger className="text-left text-foreground">
                        {module.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {module.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            {/* Sidebar note */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="border-border sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground">About This Course</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    This course is part of the {course.isDsa ? "Data Structures & Algorithms" : "Linux & Systems"} learning track.
                    Content is created and reviewed by community mentors. Instructor details will be
                    announced on the community.
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/libraries">Browse related resources</Link>
                    </Button>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/community">Ask in the community</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}