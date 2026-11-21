import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { PaperCard, StickyNote } from "../../components/skeuo/Surfaces";

const channels = [
  {
    title: "Community board",
    desc: "Post a discussion or a study-group proposal. Saved in this browser.",
    action: "Open the board",
    to: "/community",
  },
  {
    title: "Doubts wall",
    desc: "Ask a precise technical question with code and context.",
    action: "Ask a doubt",
    to: "/doubts",
  },
  {
    title: "FAQ",
    desc: "What the platform does, what it does not, and where data lives.",
    action: "Read the FAQ",
    to: "/faq",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Write a message.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Contact"
          meta="Community-first"
          title="Reach the community, honestly."
          description="The fastest path is the doubts wall or the community board. The message form below is a UI preview: no email backend is connected, and it will say so after submission."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <PaperCard className="p-5 sm:p-7">
            <h2 className="font-display text-xl text-foreground">Send a message</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              Course questions, feedback, or a correction in the technical content.
            </p>

            {submitted ? (
              <div className="mt-5 animate-fade-in rounded-md border border-border bg-[var(--color-paper-warm)] p-4">
                <h3 className="text-sm font-semibold text-foreground">Message noted</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  Thanks{form.name ? `, ${form.name}` : ""}. This form is a UI preview — no email
                  backend is connected, so nothing was sent. For an actual conversation, use the
                  community board or the doubts wall.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link to="/doubts">Ask a doubt</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Edit message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Your name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aarav"
                      error={Boolean(errors.name)}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.name}</p> : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      error={Boolean(errors.email)}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.email}</p> : null}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    placeholder="e.g. Correction in the STA page"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here…"
                    error={Boolean(errors.message)}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message ? <p className="text-[11px] text-[var(--color-destructive)]">{errors.message}</p> : null}
                </div>

                <Button type="submit" size="lg" className="h-11 w-full sm:w-auto">
                  Send message <ArrowRight className="ml-1 h-4 w-4" />
                </Button>

                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  This demo form does not send data anywhere. Your message stays in this page.
                </p>
              </form>
            )}
          </PaperCard>

          <aside className="space-y-3">
            {channels.map((c) => (
              <Link key={c.to} to={c.to} className="card-depth card-depth-hover group block p-4">
                <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                  {c.action} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
            <StickyNote tone="pink">
              <p className="font-hand text-xl leading-6">
                Include what you tried. It saves a round trip.
              </p>
            </StickyNote>
          </aside>
        </div>
      </Container>
    </div>
  );
}
