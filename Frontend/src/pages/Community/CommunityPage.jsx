import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessagesSquare,
  Users,
  Bot,
  Code2,
  ArrowRight,
  MessageCircle,
  Rocket,
  CalendarDays,
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

const channels = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "20,000+ members discussing RTL bugs, kernel patches, and FPGA projects — 24/7 real-time chat.",
    members: "20,000+",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
  },
  {
    icon: Code2,
    title: "Open Source Projects",
    description: "Contribute to real hardware projects — from RISC-V soft cores to Linux kernel drivers.",
    members: "45+ repos",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Join focused study groups for VLSI, Embedded, FPGA, and Systems — learn together, grow together.",
    members: "120+ groups",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
  {
    icon: Bot,
    title: "AI Study Assistant",
    description: "24/7 AI assistant that helps with Verilog, SystemVerilog, C, kernel code — whenever you're stuck.",
    members: "Always on",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
  },
];

const events = [
  {
    title: "Webinar: Getting Into Physical Design",
    excerpt: "Industry expert walks through the PD flow — from synthesis to GDSII — and what recruiters look for.",
    date: "Mar 15, 2026",
    tag: "Webinar",
  },
  {
    title: "RISC-V Hackathon",
    excerpt: "Build a custom instruction, add a peripheral, stretch your RISC-V soft core. Top 3 win prizes + mentorship.",
    date: "Apr 02, 2026",
    tag: "Hackathon",
  },
  {
    title: "Mock Technical Interviews",
    excerpt: "Practice VLSI and embedded interviews with engineers from Intel, Qualcomm, and NVIDIA. Limited seats.",
    date: "Apr 20, 2026",
    tag: "Interview",
  },
  {
    title: "Open Source Saturday",
    excerpt: "Monthly hands-on session. Contributors pair up on real kernel and FPGA repos with mentor review.",
    date: "May 08, 2026",
    tag: "Workshop",
  },
];

const popularThreads = [
  { title: "What's the difference between latch and flip-flop synthesis behavior?", replies: 34, views: 1200 },
  { title: "My FPGA design hits timing at 50MHz but fails at 100MHz — help!", replies: 21, views: 890 },
  { title: "Roadmap to Physical Design role in 6 months?", replies: 58, views: 2300 },
  { title: "Verilog 'if' vs 'case' — synthesis gotchas?", replies: 17, views: 674 },
];

export default function CommunityPage() {
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
              <Users className="mr-1 h-3 w-3" />
              15,000+ Engineers
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Community That Teaches You <span className="gradient-text">Beyond Courses</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Ask doubts, share projects, contribute to open-source hardware, join
              hackathons, and grow with peers who are as obsessed with silicon as you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <a href="#">
                  Join the Discord
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">
                  Open Forum
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Community Stats ─── */}
      <section className="border-y border-border bg-surface/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "15K+", label: "Members" },
              { value: "120+", label: "Study Groups" },
              { value: "45+", label: "Open Source Repos" },
              { value: "50+", label: "Mentors" },
            ].map((s, i) => (
              <AnimateOnScroll key={s.label} delay={i * 0.1}>
                <div>
                  <p className="text-3xl font-bold text-foreground font-display">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Channels ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">Ways to Connect</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find Your Community
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <AnimateOnScroll key={c.title} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${c.bgColor} ${c.textColor}`}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                    <p className="mt-3 text-xs font-medium text-primary">{c.members}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Threads ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              <MessagesSquare className="mr-1 h-3 w-3" />
              Trending Discussions
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What the Community Is Asking
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 space-y-3">
            {popularThreads.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.08}>
                <div className="flex flex-col gap-2 rounded-xl border border-border/50 bg-card p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-foreground">{t.title}</p>
                  <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground">
                    <span>{t.replies} replies</span>
                    <span>{t.views} views</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/dashboard">
                See All Discussions
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Events ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              <CalendarDays className="mr-1 h-3 w-3" />
              Upcoming Events
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Never Miss a Hackathon or Webinar
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {events.map((e, i) => (
              <AnimateOnScroll key={e.title} delay={i * 0.1}>
                <Card className="h-full border-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">{e.tag}</Badge>
                      <span className="text-xs text-muted-foreground">{e.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.excerpt}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/register">Register Now</Link>
                      </Button>
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
              Your Next Doubt Is the Start of Learning
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join a community where nobody gets stuck for more than a few minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <a href="#">
                  <Rocket className="h-4 w-4" />
                  Join Now
                </a>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}