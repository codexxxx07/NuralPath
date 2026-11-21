import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Eyebrow, MaterialTag } from "./Surfaces";

export function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Breadcrumbs({ items = [], className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 text-xs", className)}>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight className="h-3 w-3 text-muted-foreground/70" aria-hidden="true" /> : null}
          {item.to ? (
            <Link to={item.to} className="link-underline text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Page header on a paper sheet. `accent` changes the small material strip so
 * DSA (notebook blue), VLSI (circuit green) and learning (highlighter) feel
 * related but distinct.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  accent = "wood",
  meta,
  className,
  children,
}) {
  const accents = {
    wood: "from-[var(--color-wood-light)] via-[var(--color-wood)] to-[var(--color-wood-dark)]",
    blue: "from-[#c3d7e8] via-[var(--color-notebook-blue)] to-[#7093b3]",
    circuit: "from-[#9dc7b6] via-[var(--color-circuit)] to-[#1d4a3a]",
    brass: "from-[#e2c79b] via-[var(--color-brass)] to-[#8b6329]",
    leather: "from-[#a1715a] via-[var(--color-leather)] to-[var(--color-leather-dark)]",
  };

  return (
    <header className={cn("paper relative overflow-hidden rounded-xl shadow-[var(--shadow-card)]", className)}>
      <div className={cn("h-1.5 w-full bg-gradient-to-r", accents[accent] || accents.wood)} />
      <div className="px-5 py-7 sm:px-8 sm:py-9">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-4" /> : null}
        {eyebrow ? (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Eyebrow>{eyebrow}</Eyebrow>
            {meta ? <MaterialTag>{meta}</MaterialTag> : null}
          </div>
        ) : null}
        <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.12] text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-6 flex flex-wrap items-center gap-2.5">{actions}</div> : null}
        {children}
      </div>
    </header>
  );
}
