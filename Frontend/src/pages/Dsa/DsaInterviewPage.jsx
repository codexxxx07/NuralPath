import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { MaterialTag } from "../../components/skeuo/Surfaces";
import { dsaInterviewQuestions } from "../../data/dsaTopics";

export default function DsaInterviewPage() {
  const [topic, setTopic] = useState("All");
  const [openId, setOpenId] = useState(null);
  const topics = ["All", ...dsaInterviewQuestions.map((g) => g.topic)];
  const groups = topic === "All" ? dsaInterviewQuestions : dsaInterviewQuestions.filter((g) => g.topic === topic);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="blue"
          eyebrow="Interview preparation"
          meta={`${dsaInterviewQuestions.reduce((n, g) => n + g.items.length, 0)} questions`}
          title="Answers you can defend, not recite."
          description="Organised by topic. Attempt an answer aloud before expanding — the explanation is a check, not a script."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "DSA", to: "/dsa" }, { label: "Interview questions" }]}
        />

        <div className="mt-5 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-[4px] border px-2.5 py-1 text-xs transition-colors ${
                topic === t
                  ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
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
                {group.items.map((item) => {
                  const id = `${group.topic}-${item.q}`;
                  const isOpen = openId === id;
                  return (
                    <div key={id} className="paper rounded-lg shadow-[var(--shadow-sm)]">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : id)}
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
                        <div className="animate-fade-in border-t border-border/70 px-4 py-3">
                          <p className="text-[13.5px] leading-7 text-muted-foreground">{item.a}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-[var(--color-paper-warm)] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <MaterialTag tone="brass">Practice tip</MaterialTag>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            For each question, write the answer in three sentences: the definition, the mechanism, and
            one trade-off. That is usually the length an interviewer wants.
          </p>
        </div>
      </Container>
    </div>
  );
}
