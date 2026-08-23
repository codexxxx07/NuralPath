import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Award,
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
    instructor: "Ravi Kumar",
    instructorBio: "Senior Linux Administrator with 10+ years of experience managing production systems at scale.",
    duration: "6 weeks",
    rating: 4.8,
    students: 1240,
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
  default: {
    title: "Course",
    description: "Course details coming soon.",
    level: "Intermediate",
    instructor: "TBA",
    instructorBio: "Instructor details will be available soon.",
    duration: "8 weeks",
    rating: 4.5,
    students: 0,
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
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {course.students.toLocaleString()} students
                  </span>
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
                  <Button className="w-full" size="lg">
                    Enroll Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Free preview available · No credit card required
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
                      <span>Instructor</span>
                      <span className="font-medium text-foreground">{course.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Certificate</span>
                      <span className="font-medium text-foreground">Yes</span>
                    </div>
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
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
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

            {/* Instructor Sidebar */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="border-border sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground">Instructor</h3>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {course.instructor.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {course.instructorBio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
