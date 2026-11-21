import { cn } from "../../lib/utils";

/** Cream paper sheet. `lined` adds ruled notebook lines. */
export function PaperCard({ className, lined = false, children, ...props }) {
  return (
    <div
      className={cn(
        lined ? "ruled" : "paper",
        "rounded-xl border shadow-[var(--shadow-card)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Warm wooden panel / desk surface. */
export function WoodPanel({ className, children, ...props }) {
  return (
    <div className={cn("wood rounded-xl shadow-[var(--shadow-raised)]", className)} {...props}>
      {children}
    </div>
  );
}

/** Brushed metal utility panel. */
export function MetalPanel({ className, children, ...props }) {
  return (
    <div className={cn("metal rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}

/** Leather-bound cover for roadmaps and journals. */
export function LeatherPanel({ className, children, ...props }) {
  return (
    <div
      className={cn("leather relative rounded-xl shadow-[var(--shadow-raised)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Low-blur glass surface for floating controls only. */
export function GlassPanel({ className, children, ...props }) {
  return (
    <div className={cn("glass rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}

/** Physical sticky note. `tone` = yellow | pink | green. */
export function StickyNote({ tone = "yellow", className, children, taped = false, ...props }) {
  return (
    <div
      className={cn(
        "sticky-note relative p-4 text-sm leading-relaxed",
        tone === "pink" && "sticky-note-pink",
        tone === "green" && "sticky-note-green",
        taped && "tape mt-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Small ruled-paper block used inside content. */
export function NotebookPage({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "ruled rounded-lg border border-border/80 px-5 py-4 pl-9 shadow-[var(--shadow-xs)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Tape({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-5 w-16 rotate-[-2deg] bg-[color-mix(in_srgb,#efe4c8_75%,transparent)] shadow-[0_1px_2px_rgba(60,45,25,0.16)]",
        className
      )}
    />
  );
}

export function Eyebrow({ className, children }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, description, actions, className }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow className="mb-2">{eyebrow}</Eyebrow> : null}
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

/** Progress meter styled like an analog gauge-ish bar. */
export function ProgressMeter({ value = 0, label, className, tone = "wood" }) {
  const pct = Math.max(0, Math.min(100, value));
  const fill =
    tone === "blue"
      ? "linear-gradient(180deg,#a9c6df,#6f96b8)"
      : tone === "green"
        ? "linear-gradient(180deg,#c5dda9,#8aa86a)"
        : "linear-gradient(180deg,#b08a63,#7c5638)";
  return (
    <div className={className}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
          <span className="text-foreground">{label}</span>
          <span className="font-mono text-muted-foreground">{pct}%</span>
        </div>
      ) : null}
      <div
        className="relative h-2.5 overflow-hidden rounded-full border border-border/80 bg-[color-mix(in_srgb,var(--color-paper-deep)_80%,black_4%)] shadow-[inset_0_1px_2px_rgba(60,45,25,0.28)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label || "Progress"}
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundImage: fill }}
        />
        <span className="absolute inset-x-0 top-0 h-px bg-white/40" />
      </div>
    </div>
  );
}

/** Bookmark ribbon used for saved topics / progress markers. */
export function BookmarkRibbon({ children, className }) {
  return (
    <span
      className={cn(
        "bookmark-ribbon inline-flex h-9 min-w-9 items-center justify-center px-2 text-[11px] font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Divider({ className }) {
  return (
    <div
      className={cn(
        "h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-border),transparent)]",
        className
      )}
    />
  );
}

/** Small material label chip. */
export function MaterialTag({ children, tone = "paper", className }) {
  const tones = {
    paper: "bg-[var(--color-paper-warm)] text-foreground border-border",
    metal: "metal",
    brass: "border-[color-mix(in_srgb,var(--color-brass)_60%,transparent)] bg-[color-mix(in_srgb,var(--color-brass)_18%,transparent)] text-foreground",
    chalk: "bg-[var(--color-chalkboard)] text-[#eae6d9] border-[var(--color-wood-dark)]",
    green: "bg-[color-mix(in_srgb,var(--color-highlight-green)_70%,transparent)] text-foreground border-transparent",
    yellow: "bg-[color-mix(in_srgb,var(--color-highlight-yellow)_75%,transparent)] text-foreground border-transparent",
    pink: "bg-[color-mix(in_srgb,var(--color-highlight-pink)_75%,transparent)] text-foreground border-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[3px] border px-2 py-0.5 text-[11px] font-medium",
        tones[tone] || tones.paper,
        className
      )}
    >
      {children}
    </span>
  );
}
