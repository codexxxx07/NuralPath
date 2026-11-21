import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/**
 * A standing book on a shelf. The cover faces the reader so titles stay
 * readable; hovering lifts the book slightly like pulling it out.
 */
export function Book({
  to,
  title,
  label,
  subtitle,
  tone = "#3f6285",
  height = "h-56 sm:h-64",
  className,
}) {
  return (
    <Link
      to={to}
      className={cn(
        "book-cover group flex w-full flex-col justify-between p-4 pl-5 focus-visible:outline-none",
        height,
        className
      )}
      style={{ "--book": tone }}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {label}
        </p>
        <h3 className="mt-2 font-display text-lg leading-tight text-white sm:text-xl">{title}</h3>
      </div>
      <div>
        <div className="mb-3 h-px w-10 bg-white/40" />
        <p className="text-[11px] leading-snug text-white/70 line-clamp-2">{subtitle}</p>
      </div>
      <span className="pointer-events-none absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white/50">
        Open
      </span>
    </Link>
  );
}

/** Shelf rail that books sit on. */
export function ShelfRail({ className }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="shelf-edge h-3.5 rounded-[2px]" />
      <div className="mx-3 h-2 rounded-b-[3px] bg-black/20 blur-[1px]" />
    </div>
  );
}

/** A full shelf row: grid of books with a wooden rail underneath. */
export function Bookshelf({ children, className }) {
  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{children}</div>
      <ShelfRail className="mt-3" />
    </div>
  );
}
