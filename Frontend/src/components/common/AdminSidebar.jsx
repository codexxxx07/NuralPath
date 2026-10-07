import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/batches", label: "Batches" },
  { to: "/admin/mentors", label: "Mentors" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/analytics", label: "Analytics" },
];

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 animate-fade-in bg-black/45 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-60 bg-background border-r border-border
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-14 px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-foreground text-[11px] font-bold text-background">
              N
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
              NuralPath
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="icon-btn lg:hidden grid h-8 w-8 place-items-center rounded-lg text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100%-3.5rem)]" data-lenis-prevent>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-accent font-medium text-foreground shadow-[inset_2px_0_0_var(--color-primary)]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
