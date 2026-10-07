import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
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

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courseData[id] || courseData.default;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All Courses
          </Link>

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{course.level}</Badge>
                {course.isDsa && <Badge variant="outline">DSA Track</Badge>}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span>{course.duration}</span>
                <span>Flexible Schedule</span>
                <span>Certificate Included</span>
              </div>
            </div>

            {/* Enroll + facts */}
            <aside className="self-start">
              <Button className="w-full" size="lg" asChild>
                <Link to="/register">
                  Enroll Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Create a free account to get started
              </p>

              <dl className="mt-6 border-t border-border">
                <div className="flex items-center justify-between border-b border-border py-3 text-sm">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-medium text-foreground">{course.duration}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border py-3 text-sm">
                  <dt className="text-muted-foreground">Level</dt>
                  <dd className="font-medium text-foreground">{course.level}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-border py-3 text-sm">
                  <dt className="text-muted-foreground">Learning Path</dt>
                  <dd className="font-medium text-foreground">
                    {course.isDsa ? "Data Structures" : "Systems Track"}
                  </dd>
                </div>
                {course.isDsa && (
                  <div className="flex items-center justify-between border-b border-border py-3 text-sm">
                    <dt className="text-muted-foreground">Certificate</dt>
                    <dd className="font-medium text-foreground">Yes</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-12">
              {/* What You'll Learn */}
              <div>
                <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
                  What You&apos;ll Learn
                </h2>
                <div className="grid gap-x-12 sm:grid-cols-2">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="border-b border-border py-3">
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
                  Prerequisites
                </h2>
                <ul>
                  {course.prerequisites.map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-border py-3 text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    Curriculum
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {course.syllabus.length} modules · {course.duration}
                  </span>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {course.syllabus.map((module, i) => (
                    <AccordionItem key={i} value={`module-${i}`}>
                      <AccordionTrigger className="py-4 text-left text-sm font-medium text-foreground">
                        <span className="flex items-baseline gap-4">
                          <span className="w-6 shrink-0 font-mono text-xs font-normal text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{module.title}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pl-10 text-sm leading-relaxed text-muted-foreground">
                        {module.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar note */}
            <aside className="self-start lg:sticky lg:top-24">
              <div className="border-t border-border pt-5">
                <h3 className="text-sm font-medium text-foreground">
                  About This Course
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This course is part of the {course.isDsa ? "Data Structures & Algorithms" : "Linux & Systems"} learning track.
                  Content is created and reviewed by community mentors. Instructor details will be
                  announced on the community.
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/libraries">Browse related resources</Link>
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/community">Ask in the community</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
