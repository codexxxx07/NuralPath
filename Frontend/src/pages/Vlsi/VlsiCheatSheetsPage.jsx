import { Printer } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { vlsiCheatSheets } from "../../data/vlsiTopics";

export default function VlsiCheatSheetsPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <div className="no-print">
          <PageHeader
            accent="circuit"
            eyebrow="Reference sheets"
            meta="Printable"
            title="Desk references for CMOS, timing and flow."
            description="Condensed formulas and checklists. Print or choose “Save as PDF” in your browser dialog."
            breadcrumbs={[{ label: "Home", to: "/" }, { label: "VLSI", to: "/vlsi" }, { label: "Cheat sheets" }]}
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
          {vlsiCheatSheets.map((sheet) => (
            <section key={sheet.title} className="print-sheet paper rounded-xl p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
                <h2 className="font-display text-xl text-foreground">{sheet.title}</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  NuralPath · VLSI
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
            <h2 className="font-display text-xl text-foreground">Pre-signoff checklist</h2>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-6 text-foreground/85">
              <li>☐ All clocks constrained, including generated clocks</li>
              <li>☐ I/O delays reflect the real external device</li>
              <li>☐ No unexplained false or multicycle paths</li>
              <li>☐ Setup and hold clean at every signoff corner</li>
              <li>☐ DRC and LVS clean on the final layout</li>
              <li>☐ IR drop and electromigration reviewed</li>
              <li>☐ Scan chains constrained and test coverage reported</li>
            </ul>
          </section>
        </div>

        <p className="no-print mt-4 text-xs text-muted-foreground">
          Printing hides navigation automatically. Formulas are for revision, not signoff.
        </p>
      </Container>
    </div>
  );
}
