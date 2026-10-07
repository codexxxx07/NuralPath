import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

const contactChannels = [
  {
    title: "Join the Community",
    description:
      "The fastest way to reach the community and get answers to your questions.",
    action: "Visit Community",
    to: "/community",
  },
  {
    title: "Becoming a Student",
    description:
      "Create a free account to explore courses, the practice lab, and your dashboard.",
    action: "Create Account",
    to: "/register",
  },
  {
    title: "Explore Courses",
    description:
      "Browse available courses in Linux, Shell, C Programming, Open Source, and DSA.",
    action: "Browse Courses",
    to: "/courses",
  },
  {
    title: "Ask the Community",
    description:
      "Have a doubt about a practice exercise or a concept? Ask the student community.",
    action: "Ask a Doubt",
    to: "/community",
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
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Contact Us
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Get in Touch with the Community
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Questions about courses, the practice lab, or joining the community?
              Here's every way to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-x-12 sm:grid-cols-2">
            {contactChannels.map((channel) => (
              <div key={channel.title} className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">
                  {channel.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {channel.description}
                </p>
                <Link
                  to={channel.to}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {channel.action}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
            {/* Form */}
            <div>
              <div className="border-b border-border pb-3">
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  Send a Message
                </h2>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Tell us what you need — help with a course, feedback, or collaborating on a project.
              </p>

              {submitted ? (
                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    Message noted
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Thanks{formState.name ? `, ${formState.name}` : ""}! This form is a UI
                    preview — no email backend is connected yet, so nothing was sent.
                    For the fastest response, reach us through the community page.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/community">Open Community</Link>
                    </Button>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send another
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5 border-t border-border pt-8">
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
                    Send Message
                  </Button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    This demo form doesn't send data anywhere yet — a backend hasn't been connected.
                    Your message stays in your browser.
                  </p>
                </form>
              )}
            </div>

            {/* Info side */}
            <div className="space-y-5">
              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">
                  Community-first support
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Doubts are answered fastest by the student community. Post your question
                  on the community page and mentors or peers will usually respond quickly.
                </p>
                <Button variant="outline" size="sm" asChild className="mt-4">
                  <Link to="/community">Open Community</Link>
                </Button>
              </div>

              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">
                  Want to collaborate?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  If you're building a project, contributing to open source, or running a
                  study circle, introduce yourself in the community. Collaboration is how
                  this community grows.
                </p>
              </div>

              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">
                  What happens next?
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    A team member reads every message.
                    {""} A dedicated contact inbox is on the roadmap.
                  </li>
                  <li>
                    For time-sensitive questions, the community page is the fastest path.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
