import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

const initial = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  link: "",
  summary: "",
  skills: "",
  education: [{ school: "", degree: "", year: "", detail: "" }],
  projects: [{ title: "", stack: "", description: "" }],
  experience: [{ role: "", company: "", period: "", description: "" }],
  certifications: "",
};

const TEMPLATES = [
  { id: "classic", label: "Classic" },
  { id: "compact", label: "Compact" },
];

function Field({ label, value, onChange, placeholder, className, textarea = false, rows = 3 }) {
  return (
    <label className={cn("flex flex-col gap-1 text-[11px] font-medium text-muted-foreground", className)}>
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="field rounded-[4px] px-2.5 py-2 text-[13px] font-normal text-foreground"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 text-[13px]"
        />
      )}
    </label>
  );
}

export default function ResumePage() {
  const [data, setData] = useState(initial);
  const [template, setTemplate] = useState("classic");

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));
  const updateList = (key, i, field, value) =>
    setData((d) => {
      const list = d[key].map((item, idx) => (idx === i ? { ...item, [field]: value } : item));
      return { ...d, [key]: list };
    });
  const addItem = (key, blank) => setData((d) => ({ ...d, [key]: [...d[key], blank] }));
  const removeItem = (key, i) =>
    setData((d) => ({ ...d, [key]: d[key].filter((_, idx) => idx !== i) }));

  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const certs = data.certifications.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <div className="no-print">
          <PageHeader
            accent="leather"
            eyebrow="Resume builder"
            meta="Print to PDF"
            title="Draft a clean, honest one-page resume."
            description="Fill the fields and print. Export uses your browser's print dialog — choose “Save as PDF”. Nothing is uploaded or stored outside this page session."
            breadcrumbs={[{ label: "Home", to: "/" }, { label: "Career" }, { label: "Resume" }]}
            actions={
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-ink btn-tactile inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium"
              >
                <Printer className="h-4 w-4" /> Export / print
              </button>
            }
          />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* Form */}
          <div className="no-print space-y-4">
            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <h2 className="font-display text-lg text-foreground">Personal</h2>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                <Field label="Full name" value={data.name} onChange={(v) => update("name", v)} placeholder="Aarav Sharma" />
                <Field label="Target role" value={data.role} onChange={(v) => update("role", v)} placeholder="VLSI Design Engineer" />
                <Field label="Email" value={data.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+91 …" />
                <Field label="Location" value={data.location} onChange={(v) => update("location", v)} placeholder="Bengaluru, India" />
                <Field label="Link" value={data.link} onChange={(v) => update("link", v)} placeholder="github.com/you" />
              </div>
              <Field
                label="Summary"
                className="mt-2.5"
                value={data.summary}
                onChange={(v) => update("summary", v)}
                placeholder="Final-year ECE student focused on digital design and timing closure."
                textarea
                rows={3}
              />
            </section>

            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <h2 className="font-display text-lg text-foreground">Skills</h2>
              <Field
                label="Comma separated"
                className="mt-2"
                value={data.skills}
                onChange={(v) => update("skills", v)}
                placeholder="Verilog, SystemVerilog, C++, Python, Git, Tcl"
              />
            </section>

            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-foreground">Education</h2>
                <button
                  type="button"
                  onClick={() => addItem("education", { school: "", degree: "", year: "", detail: "" })}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  + Add
                </button>
              </div>
              {data.education.map((edu, i) => (
                <div key={i} className="mt-2 grid gap-2 rounded-md border border-border/70 p-2.5 sm:grid-cols-2">
                  <Field label="Institution" value={edu.school} onChange={(v) => updateList("education", i, "school", v)} placeholder="University" />
                  <Field label="Degree" value={edu.degree} onChange={(v) => updateList("education", i, "degree", v)} placeholder="B.Tech ECE" />
                  <Field label="Year" value={edu.year} onChange={(v) => updateList("education", i, "year", v)} placeholder="2022 – 2026" />
                  <Field label="Detail" value={edu.detail} onChange={(v) => updateList("education", i, "detail", v)} placeholder="CGPA 8.4" />
                  {data.education.length > 1 ? (
                    <button type="button" onClick={() => removeItem("education", i)} className="text-left text-[10px] text-muted-foreground hover:text-[var(--color-destructive)]">
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </section>

            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-foreground">Projects</h2>
                <button
                  type="button"
                  onClick={() => addItem("projects", { title: "", stack: "", description: "" })}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  + Add
                </button>
              </div>
              {data.projects.map((p, i) => (
                <div key={i} className="mt-2 grid gap-2 rounded-md border border-border/70 p-2.5">
                  <Field label="Title" value={p.title} onChange={(v) => updateList("projects", i, "title", v)} placeholder="RISC-V ALU in Verilog" />
                  <Field label="Stack" value={p.stack} onChange={(v) => updateList("projects", i, "stack", v)} placeholder="Verilog, Icarus Verilog" />
                  <Field label="What you built and measured" value={p.description} onChange={(v) => updateList("projects", i, "description", v)} placeholder="Implemented and verified 8 operations; testbench covered 96% of opcodes." textarea rows={2} />
                  {data.projects.length > 1 ? (
                    <button type="button" onClick={() => removeItem("projects", i)} className="text-left text-[10px] text-muted-foreground hover:text-[var(--color-destructive)]">
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </section>

            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-foreground">Experience</h2>
                <button
                  type="button"
                  onClick={() => addItem("experience", { role: "", company: "", period: "", description: "" })}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  + Add
                </button>
              </div>
              {data.experience.map((x, i) => (
                <div key={i} className="mt-2 grid gap-2 rounded-md border border-border/70 p-2.5 sm:grid-cols-2">
                  <Field label="Role" value={x.role} onChange={(v) => updateList("experience", i, "role", v)} placeholder="Intern" />
                  <Field label="Company" value={x.company} onChange={(v) => updateList("experience", i, "company", v)} placeholder="Company" />
                  <Field label="Period" value={x.period} onChange={(v) => updateList("experience", i, "period", v)} placeholder="May – Jul 2026" />
                  <Field label="Description" value={x.description} onChange={(v) => updateList("experience", i, "description", v)} placeholder="What you owned" />
                  {data.experience.length > 1 ? (
                    <button type="button" onClick={() => removeItem("experience", i)} className="text-left text-[10px] text-muted-foreground hover:text-[var(--color-destructive)]">
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </section>

            <section className="paper rounded-lg p-4 shadow-[var(--shadow-sm)]">
              <h2 className="font-display text-lg text-foreground">Certifications</h2>
              <Field
                label="Comma separated (only real ones)"
                className="mt-2"
                value={data.certifications}
                onChange={(v) => update("certifications", v)}
                placeholder="NPTEL Digital Circuits, …"
              />
            </section>

            <div className="flex flex-wrap items-center gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    "rounded-[4px] border px-2.5 py-1 text-xs",
                    template === t.id
                      ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setData(initial)}
                className="ml-auto text-[11px] text-muted-foreground hover:text-foreground"
              >
                Clear all fields
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="btn-ink btn-tactile flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium"
            >
              <Download className="h-4 w-4" /> Print / Save as PDF
            </button>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Printing hides this form and shows only the sheet. In the print dialog choose
              “Save as PDF” as the destination. The PDF is generated locally by your browser.
            </p>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="no-print mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Preview
            </p>
            <div
              className={cn(
                "print-sheet rounded-sm bg-white p-[7%] text-[#1a1a1a] shadow-[var(--shadow-raised)]",
                template === "compact" ? "text-[11px]" : "text-[12px]"
              )}
              style={{ fontFamily: "Inter, sans-serif", minHeight: 640 }}
            >
              <header className="border-b-2 border-[#333] pb-2">
                <h1 className="text-[24px] font-bold leading-tight tracking-tight" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                  {data.name || "Your Name"}
                </h1>
                <p className="text-[12px] font-medium text-[#444]">{data.role || "Target role"}</p>
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-[#555]">
                  {[data.email, data.phone, data.location, data.link].filter(Boolean).map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </p>
              </header>

              {data.summary ? (
                <section className="mt-3">
                  <p className="leading-relaxed text-[#333]">{data.summary}</p>
                </section>
              ) : null}

              {skills.length ? (
                <section className="mt-3">
                  <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222]">Skills</h2>
                  <p className="text-[#333]">{skills.join(" · ")}</p>
                </section>
              ) : null}

              {data.education.some((e) => e.school || e.degree) ? (
                <section className="mt-3">
                  <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222]">Education</h2>
                  {data.education.map((e, i) =>
                    e.school || e.degree ? (
                      <div key={i} className="mb-1.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-semibold">{e.school}</p>
                          <p className="text-[10px] text-[#555]">{e.year}</p>
                        </div>
                        <p className="text-[#444]">
                          {e.degree}
                          {e.detail ? ` · ${e.detail}` : ""}
                        </p>
                      </div>
                    ) : null
                  )}
                </section>
              ) : null}

              {data.projects.some((p) => p.title) ? (
                <section className="mt-3">
                  <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222]">Projects</h2>
                  {data.projects.map((p, i) =>
                    p.title ? (
                      <div key={i} className="mb-1.5">
                        <p className="font-semibold">
                          {p.title}
                          {p.stack ? <span className="font-normal text-[#666]"> — {p.stack}</span> : null}
                        </p>
                        {p.description ? <p className="leading-relaxed text-[#333]">{p.description}</p> : null}
                      </div>
                    ) : null
                  )}
                </section>
              ) : null}

              {data.experience.some((x) => x.role || x.company) ? (
                <section className="mt-3">
                  <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222]">Experience</h2>
                  {data.experience.map((x, i) =>
                    x.role || x.company ? (
                      <div key={i} className="mb-1.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-semibold">
                            {x.role}
                            {x.company ? `, ${x.company}` : ""}
                          </p>
                          <p className="text-[10px] text-[#555]">{x.period}</p>
                        </div>
                        {x.description ? <p className="leading-relaxed text-[#333]">{x.description}</p> : null}
                      </div>
                    ) : null
                  )}
                </section>
              ) : null}

              {certs.length ? (
                <section className="mt-3">
                  <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222]">Certifications</h2>
                  <p className="text-[#333]">{certs.join(" · ")}</p>
                </section>
              ) : null}

              {!data.name && !data.summary && !skills.length ? (
                <p className="mt-10 text-center text-[11px] text-[#888]">
                  Fill the form to build your sheet. Empty sections are omitted from the preview.
                </p>
              ) : null}
            </div>
            <p className="no-print mt-2 text-[10px] leading-relaxed text-muted-foreground">
              Nothing is saved after you leave this page. Copy your text somewhere safe before closing.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
