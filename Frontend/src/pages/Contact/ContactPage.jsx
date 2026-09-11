import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  GraduationCap,
  Compass,
  Send,
  CheckCircle2,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const contactChannels = [
  {
    icon: Users,
    title: "Join the Community",
    description:
      "The fastest way to reach the community and get answers to your questions.",
    action: "Visit Community",
    to: "/community",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: GraduationCap,
    title: "Becoming a Student",
    description:
      "Create a free account to explore courses, the practice lab, and your dashboard.",
    action: "Create Account",
    to: "/register",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Compass,
    title: "Explore Courses",
    description:
      "Browse available courses in Linux, Shell, C Programming, Open Source, and DSA.",
    action: "Browse Courses",
    to: "/courses",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: MessageSquare,
    title: "Ask the Community",
    description:
      "Have a doubt about a practice exercise or a concept? Ask the student community.",
    action: "Ask a Doubt",
    to: "/community",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl"
          >
            <Badge variant="secondary" className="mb-4">
              <LifeBuoy className="mr-1 h-3 w-3" />
              Contact Us
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Get in Touch with the <span className="gradient-text">Community</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Questions about courses, the practice lab, or joining the community?
              Here's every way to reach us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Channels */}
      <section className="border-y border-border bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((channel, i) => (
              <motion.div key={channel.title} variants={fadeIn} custom={i} initial="hidden" animate="visible">
                <Card className="h-full border-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${channel.bg} ${channel.color}`}>
                      <channel.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">
                      {channel.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {channel.description}
                    </p>
                    <Button variant="outline" size="sm" asChild className="mt-4">
                      <Link to={channel.to}>{channel.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            {/* Form */}
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="border-border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-foreground font-display">
                    Send a Message
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tell us what you need — help with a course, feedback, or collaborating on a project.
                  </p>

                  {submitted ? (
                    <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                      <h3 className="mt-4 text-lg font-semibold text-foreground">
                        Message noted
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Thanks{formState.name ? `, ${formState.name}` : ""}! This form is a UI
                        preview — no email backend is connected yet, so nothing was sent.
                        For the fastest response, reach us through the community page.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button asChild>
                          <Link to="/community">Open Community</Link>
                        </Button>
                        <Button variant="outline" onClick={() => setSubmitted(false)}>
                          Send another
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your name</Label>
                          <Input
                            id="name"
                            placeholder="e.g. Aarav"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Your email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic</Label>
                        <Input
                          id="topic"
                          placeholder="e.g. Question about the DSA course"
                          value={formState.topic}
                          onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="Write your message here..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full sm:w-auto">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                        This demo form doesn't send data anywhere yet — a backend hasn't been connected.
                        Your message stays in your browser.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info side */}
            <motion.div
              variants={fadeIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5"
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Community-first support
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Doubts are answered fastest by the student community. Post your question
                    on the community page and mentors or peers will usually respond quickly.
                  </p>
                  <Button variant="outline" size="sm" asChild className="mt-4">
                    <Link to="/community">Open Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Users className="h-5 w-5 text-emerald-500" />
                    Want to collaborate?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    If you're building a project, contributing to open source, or running a
                    study circle, introduce yourself in the community. Collaboration is how
                    this community grows.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Compass className="h-5 w-5 text-cyan-500" />
                    What happens next?
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      A team member reads every message.
                      {""} A dedicated contact inbox is on the roadmap.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      For time-sensitive questions, the community page is the fastest path.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}