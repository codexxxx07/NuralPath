import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Code2,
  BookOpen,
  Network,
  FolderGit2,
  Trophy,
  Briefcase,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Target,
  Lightbulb,
  Handshake,
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

const pillars = [
  {
    icon: BookOpen,
    title: "Learning & Skill Building",
    description:
      "Follow structured tracks in Linux, Shell, C, and Data Structures. Study together in small groups, work through the curriculum, and practice in the built-in terminal lab.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Code2,
    title: "Hands-on Practice",
    description:
      "The practice lab gives every student an interactive terminal for day-to-day practice — no setup required. Get stuck less and build muscle memory faster.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Network,
    title: "Networking",
    description:
      "Meet fellow students working toward the same goals, share progress, and build the kind of connections that help you grow as an engineer.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: FolderGit2,
    title: "Projects & Collaboration",
    description:
      "Team up on projects — from data structure libraries to shell tooling. Collaborating on real code is the fastest way to learn.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Trophy,
    title: "Hackathons & Competitions",
    description:
      "Community-run coding challenges and mini-hackathons are organized around the learning tracks. Participation is the goal — not just winning.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Briefcase,
    title: "Internship & Job Opportunities",
    description:
      "As the community grows, opportunities get shared with students first — internships, referrals, and openings posted by members and mentors.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const howToJoin = [
  {
    step: "01",
    title: "Create a free account",
    description: "Sign up to get your student dashboard, course progress, and practice lab access.",
    to: "/register",
  },
  {
    step: "02",
    title: "Pick a learning track",
    description: "Start with Linux Fundamentals or jump into Data Structures in C.",
    to: "/courses",
  },
  {
    step: "03",
    title: "Practice every day",
    description: "Use the practice lab to drill commands and concepts until they stick.",
    to: "/dashboard/practice-lab",
  },
  {
    step: "04",
    title: "Contribute back",
    description: "Help others with doubts, review peers' code, and share what you build.",
    to: "/community",
  },
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
              Student Community
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Learn, Build, and Grow <span className="gradient-text">Together</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              NuralPath is a student-driven community for anyone serious about Linux,
              C, and Data Structures. Whether you're just starting or already building
              systems-level projects, there's a place for you here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/register">
                  Join the Community
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">Explore Learning Tracks</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── About the community ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateOnScroll>
              <div>
                <Badge variant="secondary" className="mb-4">About This Community</Badge>
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Built by students, for students
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  The community exists so that no student has to figure out systems
                  programming, C, or data structures alone. It's a place where you can
                  ask questions without hesitation, practice without embarrassment, and
                  find people at the same stage as you.
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  We keep things focused: real learning, real practice, and real
                  collaboration — not hype. If you're willing to put in consistent
                  effort, you'll find everyone here willing to help you along.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <Target className="mb-3 h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-foreground">Focused</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We concentrate on the fundamentals that matter: Linux, C, algorithms, and systems thinking.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <Handshake className="mb-3 h-6 w-6 text-emerald-500" />
                    <h3 className="font-semibold text-foreground">Supportive</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No question is too basic. Beginners and advanced learners help each other daily.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <Lightbulb className="mb-3 h-6 w-6 text-amber-500" />
                    <h3 className="font-semibold text-foreground">Hands-on</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Everything is tied to practice — you learn by typing, running, and debugging.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <Sparkles className="mb-3 h-6 w-6 text-cyan-500" />
                    <h3 className="font-semibold text-foreground">Growing</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      New tracks and resources are added as students actually build them.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── What the community offers ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">What the Community Offers</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              More Than a Course Catalog
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything below is something students can actually participate in right now.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.08}>
                <Card className="h-full border-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${p.bg} ${p.color}`}>
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How to get involved ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="mr-1 h-3 w-3" />
              Get Started
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How Students Can Get Involved
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Joining is simple, and you can start learning in the next five minutes.
            </p>
          </AnimateOnScroll>

          <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howToJoin.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="text-xl font-bold font-mono">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-display">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  <Button variant="ghost" size="sm" asChild className="mt-3">
                    <Link to={step.to}>
                      Go <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your First Doubt Is the Best Place to Start
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join the community, ask your first question, and start your learning journey
              with people who'll help you through it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/register">
                  Join for Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}