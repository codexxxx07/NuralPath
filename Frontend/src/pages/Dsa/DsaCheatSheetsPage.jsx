import { Printer } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { dsaCheatSheets } from "../../data/dsaTopics";

export default function DsaCheatSheetsPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <div className="no-print">
          <PageHeader
            accent="brass"
            eyebrow="Reference sheets"
            meta="Printable"
            title="Notebook references you can pin above the desk."
            description="Condensed tables for quick recall. Use the print button and choose “Save as PDF” in your browser's print dialog."
            breadcrumbs={[{ label: "Home", to: "/" }, { label: "DSA", to: "/dsa" }, { label: "Cheat sheets" }]}
            actions={
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                <Printer className="h-4 w-4" /> Print all sheets
              </button>
            }
          />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {dsaCheatSheets.map((sheet) => (
            <section key={sheet.title} className="print-sheet paper rounded-xl p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
                <h2 className="font-display text-xl text-foreground">{sheet.title}</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  NuralPath · DSA
                </span>
              </div>
              <dl className="mt-2 divide-y divide-border/60">
                {sheet.rows.map(([term, value]) => (
                  <div key={term} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                    <dt className="text-[13px] text-foreground">{term}</dt>
                    <dd className="font-mono text-xs text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section className="print-sheet ruled rounded-xl border border-border p-5 pl-9 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-xl text-foreground">Margin notes</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-foreground/85">
              <li>State the invariant before writing the loop.</li>
              <li>Bound every loop with a concrete example (n = 0, 1, 2).</li>
              <li>Prefer the simplest structure that meets the complexity target.</li>
              <li>If a window fails with negatives, use prefix sums plus a map.</li>
              <li>Always name the worst case, not only the average.</li>
            </ul>
          </section>
        </div>

        <p className="no-print mt-4 text-xs text-muted-foreground">
          Printing hides the site navigation automatically. Only the sheets are printed.
        </p>
      </Container>
    </div>
  );
}
