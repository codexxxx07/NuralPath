import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag } from "../../components/skeuo/Surfaces";
import { vlsiInterviewQuestions } from "../../data/vlsiTopics";

export default function VlsiInterviewPage() {
  const [topic, setTopic] = useState("All");
  const topics = ["All", ...vlsiInterviewQuestions.map((g) => g.topic)];
  const groups = topic === "All" ? vlsiInterviewQuestions : vlsiInterviewQuestions.filter((g) => g.topic === topic);
  const total = vlsiInterviewQuestions.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="circuit"
          eyebrow="Interview preparation"
          meta={`${total} questions`}
          title="Answer with the equation, the mechanism, and the trade-off."
          description="Grouped by the areas that appear in entry-level VLSI screens. Expand after attempting your own answer."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "VLSI", to: "/vlsi" }, { label: "Interview questions" }]}
        />

        <div className="mt-5 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-[4px] border px-2.5 py-1 text-xs transition-colors ${
                topic === t
                  ? "border-[var(--color-circuit)] bg-[color-mix(in_srgb,var(--color-circuit)_16%,transparent)] font-semibold text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-6">
          {groups.map((group) => (
            <section key={group.topic}>
              <h2 className="mb-2 font-display text-xl text-foreground">{group.topic}</h2>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <details key={item.q} className="group paper rounded-lg shadow-[var(--shadow-sm)]">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-foreground marker:content-none">
                      {item.q}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="border-t border-border/70 px-4 py-3 text-[13.5px] leading-7 text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-[var(--color-paper-warm)] p-4">
          <MaterialTag tone="brass">A note on scope</MaterialTag>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            These answers are concise interview-level explanations. They are not a substitute for
            technology-specific library data, foundry rules or a vendor tool's signoff report.
          </p>
        </div>
      </Container>
    </div>
  );
}
