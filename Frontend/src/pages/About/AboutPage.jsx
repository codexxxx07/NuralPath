import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Zap,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

function AnimateOnScroll({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  {
    icon: Target,
    title: "Practical Over Theory",
    description: "We believe engineers are built in the lab, not the lecture hall. Every concept is reinforced with hands-on practice.",
  },
  {
    icon: Eye,
    title: "Industry Alignment",
    description: "Curricula designed with semiconductor companies — so what you learn is exactly what gets you hired.",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Small cohorts, real mentorship, and support at every step. We win when you get placed.",
  },
  {
    icon: Zap,
    title: "Excellence Always",
    description: "We obsess over the quality of every lecture, lab, and project — because your career depends on it.",
  },
];

const milestones = [
  { year: "2022", title: "Founded in Bangalore", description: "Started as a community of 5 engineers teaching Linux to CS students." },
  { year: "2023", title: "First VLSI Cohort", description: "Launched our flagship VLSI Design course with 40 students. 100% placement in the first cohort." },
  { year: "2024", title: "10,000 Students", description: "Expanded to Embedded Systems, FPGA, and Kernel Programming. Crossed 10K enrollments." },
  { year: "2025", title: "Industry Partnerships", description: "Partnered with 25+ semiconductor companies for hiring pipelines and curriculum development." },
  { year: "2026", title: "15,000+ Strong Community", description: "15,000+ students and 50+ mentors. One of India's largest hardware education communities." },
];

const mentors = [
  { name: "Dr. Raghav Malik", role: "Former Staff Engineer, Intel", domain: "CPU Architecture" },
  { name: "Ananya Iyer", role: "Verification Lead, Qualcomm", domain: "Functional Verification" },
  { name: "Suresh Kumar", role: "SDE, NVIDIA", domain: "GPU / RTL Design" },
  { name: "Divya Nair", role: "Principal Engineer, AMD", domain: "Physical Design" },
  { name: "Rohit Sharma", role: "Ex-ARM, Kernel Maintainer", domain: "Embedded Linux" },
  { name: "Fatima Zaidi", role: "FPGA Consultant, Xilinx/AMD", domain: "FPGA / HLS" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <Building2 className="mr-1 h-3 w-3" />
              About NuralPath
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Building India's{" "}
              <span className="gradient-text">Hardware Workforce</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We're a mission-driven EdTech platform on a mission to close the
              massive skill gap in VLSI, embedded systems, and hardware
              engineering — one student at a time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimateOnScroll>
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">Our Mission</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    To make world-class VLSI and hardware engineering education
                    accessible to every talented student in India. The world needs
                    a million new chip designers by 2030 — we're building the
                    talent pipeline that will deliver them.
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">Our Vision</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    A future where India designs the chips powering every device
                    on Earth. We envision a self-sufficient semiconductor
                    ecosystem, powered by engineers who got their start at
                    NuralPath.
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What We Stand For
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Journey Timeline ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Milestones Along the Way
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 space-y-8">
            {milestones.map((m, i) => (
              <AnimateOnScroll key={m.year} delay={i * 0.08}>
                <div className="relative flex gap-6 rounded-xl border border-border/50 bg-card p-6">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-sm font-bold text-primary font-mono">{m.year}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{m.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mentors ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Our Mentors</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Learn From Industry Veterans
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              50+ engineers from Intel, Qualcomm, NVIDIA, AMD, ARM, and more —
              teaching because they believe in giving back.
            </p>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m, i) => (
              <AnimateOnScroll key={m.name} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {m.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {m.domain}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border bg-primary/5 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Be Part of Our Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of engineers who started their semiconductor career
              with NuralPath.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/register">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}