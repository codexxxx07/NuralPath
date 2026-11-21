import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Container, PageHeader } from "../components/skeuo/Page";
import { Input } from "../components/ui/input";

const groups = [
  {
    category: "Getting started",
    items: [
      {
        q: "What is NuralPath?",
        a: "A learning environment for data structures, VLSI and interview preparation, built around physical study metaphors: notebooks, shelves, calendars and workbenches.",
      },
      {
        q: "Do I need an account?",
        a: "No. The learning pages are public. Signing in is a UI demonstration in this build; there is no account backend yet.",
      },
      {
        q: "Where should I start?",
        a: "Choose the DSA or VLSI library and read its roadmap. If you already have a target, open the topic that matches it and work the practice prompts.",
      },
    ],
  },
  {
    category: "Learning content",
    items: [
      {
        q: "Is the DSA content enough for interviews?",
        a: "It covers the seven core structures with concepts, code, complexity and practice prompts. Interview readiness also needs timed practice and explanation drills, which the mock interview page supports.",
      },
      {
        q: "Do the VLSI diagrams simulate hardware?",
        a: "No. They are educational schematics of structure and signal flow. Nothing on the site runs RTL, synthesis or timing analysis.",
      },
      {
        q: "Can I print the cheat sheets?",
        a: "Yes. Each cheat-sheet page has a print action that hides navigation and prints only the reference sheets. Use your browser's Save as PDF option.",
      },
    ],
  },
  {
    category: "Data and privacy",
    items: [
      {
        q: "Where are my notes and progress stored?",
        a: "In this browser's local storage. They are not sent to a server and do not follow you to another device. Clearing site data removes them.",
      },
      {
        q: "Are community posts shared with other students?",
        a: "No. The board and doubts wall are local prototypes. A shared backend, accounts and moderation are not connected in this build.",
      },
      {
        q: "Does the contact form send email?",
        a: "No. It is a UI preview and says so after submission. The community page is the honest path for now.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What stack does the site use?",
        a: "React, Vite, Tailwind CSS and React Router, with a small set of Radix-based UI primitives.",
      },
      {
        q: "Does dark mode persist?",
        a: "Yes. The theme choice is stored in local storage and restored on the next visit.",
      },
      {
        q: "Why do some dashboards say they are demos?",
        a: "Because they contain sample data and no backend. Labelling them is part of not fabricating activity.",
      },
    ],
  },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => !query || `${i.q} ${i.a}`.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((g) => g.items.length);

  return (
    <div className="min-h-screen">
      <Container className="max-w-3xl py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Help"
          meta="FAQ"
          title="Questions, answered without padding."
          description="What the platform does, what it deliberately does not do, and where your data lives."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        />

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the FAQ…"
            aria-label="Search FAQ"
            className="h-10 pl-9"
          />
        </div>

        <div className="mt-6 space-y-6">
          {filtered.map((group) => (
            <section key={group.category}>
              <h2 className="mb-2 font-display text-xl text-foreground">{group.category}</h2>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const id = `${group.category}-${item.q}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="paper rounded-lg shadow-[var(--shadow-sm)]">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      >
                        <span className="text-sm font-medium text-foreground">{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen ? (
                        <p className="animate-fade-in border-t border-border/70 px-4 py-3 text-[13.5px] leading-7 text-muted-foreground">
                          {item.a}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {!filtered.length ? (
          <p className="mt-8 rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            Nothing matches “{query}”.
          </p>
        ) : null}
      </Container>
    </div>
  );
}
