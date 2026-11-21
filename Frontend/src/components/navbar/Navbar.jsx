import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  {
    to: "/dsa",
    label: "DSA",
    blurb: "A programming library",
    match: ["/dsa"],
    items: [
      { to: "/dsa", label: "Library", desc: "Seven topic books" },
      { to: "/dsa/roadmap", label: "Roadmap", desc: "Stages and prerequisites" },
      { to: "/dsa/practice", label: "Practice", desc: "Filterable problem set" },
      { to: "/dsa/interview-questions", label: "Interview questions", desc: "Expandable answers" },
      { to: "/dsa/cheat-sheets", label: "Cheat sheets", desc: "Printable references" },
    ],
  },
  {
    to: "/vlsi",
    label: "VLSI",
    blurb: "An engineering workstation",
    match: ["/vlsi"],
    items: [
      { to: "/vlsi", label: "Workstation", desc: "All nine topic blocks" },
      { to: "/vlsi/roadmap", label: "Roadmap", desc: "Dependency-aware path" },
      { to: "/vlsi/sta", label: "Timing", desc: "Setup, hold, corners" },
      { to: "/vlsi/physical-design", label: "Physical design", desc: "Floorplan to signoff" },
      { to: "/vlsi/interview-questions", label: "Interview questions", desc: "Technical screens" },
      { to: "/vlsi/cheat-sheets", label: "Cheat sheets", desc: "Printable references" },
    ],
  },
  {
    to: "/quizzes",
    label: "Learn",
    blurb: "Practice instruments",
    match: ["/quizzes", "/daily-challenge", "/notes", "/blogs", "/libraries"],
    items: [
      { to: "/quizzes", label: "Quizzes", desc: "Timed exam papers" },
      { to: "/daily-challenge", label: "Daily challenge", desc: "One task a day" },
      { to: "/notes", label: "Notes", desc: "Your local notebook" },
      { to: "/blogs", label: "Blog", desc: "Essays from the desk" },
      { to: "/libraries", label: "Libraries", desc: "Resources and roadmap" },
    ],
  },
  {
    to: "/placement",
    label: "Career",
    blurb: "Preparation planner",
    match: ["/placement", "/mock-interviews", "/resume"],
    items: [
      { to: "/placement", label: "Placement", desc: "Semester-by-semester plan" },
      { to: "/mock-interviews", label: "Mock interviews", desc: "Self-reviewed practice" },
      { to: "/resume", label: "Resume builder", desc: "Draft and print" },
    ],
  },
  {
    to: "/community",
    label: "Community",
    blurb: "The classroom board",
    match: ["/community", "/doubts", "/about", "/faq"],
    items: [
      { to: "/community", label: "Community", desc: "Board, groups, events" },
      { to: "/doubts", label: "Doubts", desc: "Ask and reply" },
      { to: "/about", label: "About", desc: "Purpose and philosophy" },
      { to: "/faq", label: "FAQ", desc: "Honest answers" },
    ],
  },
];

const linkBase =
  "relative rounded-[3px] px-1 py-2 text-[13px] leading-5 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-[var(--color-wood)] after:transition-transform after:duration-200 after:ease-out after:content-['']";

const idleLink = `${linkBase} font-medium text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100`;
const activeLink = `${linkBase} font-semibold text-foreground after:scale-x-100`;

const MENU_WIDTH = 288; // w-72
const MENU_GUTTER = 16;

// Menus are centred under their trigger, but nudged horizontally so they
// never extend past the viewport edges (e.g. near the last nav item).
function getMenuShift(triggerEl) {
  if (!triggerEl || typeof window === "undefined") return 0;
  const rect = triggerEl.getBoundingClientRect();
  const width = Math.min(MENU_WIDTH, window.innerWidth - MENU_GUTTER * 2);
  if (width <= 0) return 0;

  const triggerCentre = rect.left + rect.width / 2;
  const minCentre = MENU_GUTTER + width / 2;
  const maxCentre = window.innerWidth - MENU_GUTTER - width / 2;
  if (minCentre > maxCentre) return 0;

  const centre = Math.min(Math.max(triggerCentre, minCentre), maxCentre);
  return Math.round(centre - triggerCentre);
}

function focusPanelLink(panelRefs, label, position = "first", attempts = 12) {
  const panel = panelRefs.current[label];
  if (!panel) return;
  const links = panel.querySelectorAll("a[href]");
  if (!links.length) return;
  const target = position === "last" ? links[links.length - 1] : links[0];
  target.focus();
  // A panel that is still mid-transition can refuse focus for a frame or
  // two; retry briefly until the browser accepts it.
  if (document.activeElement !== target && attempts > 0) {
    requestAnimationFrame(() => focusPanelLink(panelRefs, label, position, attempts - 1));
  }
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuShift, setMenuShift] = useState(0);
  const [openGroups, setOpenGroups] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const triggerRefs = useRef({});
  const panelRefs = useRef({});
  const containerRefs = useRef({});
  const pendingFocusRef = useRef(null);
  const location = useLocation();
  const locationKey = `${location.pathname}${location.search}`;
  const [lastLocationKey, setLastLocationKey] = useState(locationKey);

  // Close any open navigation surface when the route changes. Adjusting
  // state during render is the documented alternative to an effect here.
  if (lastLocationKey !== locationKey) {
    setLastLocationKey(locationKey);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  const openDropdown = (label) => {
    setMenuShift(getMenuShift(triggerRefs.current[label]));
    setOpenMenu(label);
  };

  const toggleDropdown = (label) => {
    if (openMenu === label) {
      setOpenMenu(null);
      return;
    }
    openDropdown(label);
  };

  const openDropdownWithFocus = (label, position) => {
    pendingFocusRef.current = { label, position };
    openDropdown(label);
  };

  // Run after the panel is committed (its `inert` attribute removed and its
  // opening transition started), so the browser accepts focus on the link.
  useEffect(() => {
    const request = pendingFocusRef.current;
    if (!request || openMenu !== request.label) return undefined;
    const frame = requestAnimationFrame(() => {
      pendingFocusRef.current = null;
      focusPanelLink(panelRefs, request.label, request.position);
    });
    return () => cancelAnimationFrame(frame);
  }, [openMenu]);

  const handleMenuKeyDown = (event) => {
    const links = Array.from(event.currentTarget.querySelectorAll("a[href]"));
    if (!links.length) return;
    const index = links.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      links[index < 0 ? 0 : (index + 1) % links.length].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      links[index < 0 ? links.length - 1 : (index - 1 + links.length) % links.length].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      links[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      links[links.length - 1].focus();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (openMenu) triggerRefs.current[openMenu]?.focus();
        else if (mobileOpen) mobileButtonRef.current?.focus();
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e) => {
      // Any press outside the open menu closes it, even inside the header.
      if (openMenu) {
        const container = containerRefs.current[openMenu];
        if (!container || !container.contains(e.target)) setOpenMenu(null);
      }
      if (mobileOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
      if (openMenu) setMenuShift(getMenuShift(triggerRefs.current[openMenu]));
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [openMenu, mobileOpen]);

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 px-3 pt-2.5 sm:px-5 sm:pt-3"
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "paper mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-xl px-3 transition-[box-shadow,border-color] duration-200 sm:px-4 lg:h-[58px]",
          scrolled ? "shadow-[var(--shadow-raised)]" : "shadow-[var(--shadow-float)]"
        )}
      >
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <Link
            to="/"
            aria-label="NuralPath home"
            className="flex shrink-0 items-center gap-2.5 py-2.5 transition-transform duration-200 active:scale-[0.98]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[5px] border border-[color-mix(in_srgb,var(--color-wood-dark)_70%,black)] bg-[linear-gradient(160deg,var(--color-wood-light),var(--color-wood)_55%,var(--color-wood-dark))] font-display text-sm font-bold text-[#fdf4e4] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_2px_3px_rgba(50,35,18,0.35)]">
              N
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                NuralPath
              </span>
              <span className="mt-0.5 hidden text-[8.5px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
                study environment
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {navItems.map((item) => {
              if (!item.items) {
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) => (isActive ? activeLink : idleLink)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              const isOpen = openMenu === item.label;
              const menuId = `nav-menu-${item.label.toLowerCase()}`;
              const isActive = (item.match || [item.to]).some(
                (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
              );

              return (
                <li
                  key={item.label}
                  ref={(node) => {
                    containerRefs.current[item.label] = node;
                  }}
                  className="relative"
                  onBlur={(e) => {
                    // Close once keyboard focus leaves the trigger and its panel.
                    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
                      setOpenMenu((current) => (current === item.label ? null : current));
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      triggerRefs.current[item.label] = node;
                    }}
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown(item.label)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                        e.preventDefault();
                        openDropdownWithFocus(item.label, e.key === "ArrowUp" ? "last" : "first");
                      }
                    }}
                    className={cn(
                      isActive ? activeLink : idleLink,
                      "flex cursor-pointer items-center gap-1"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    id={menuId}
                    ref={(node) => {
                      panelRefs.current[item.label] = node;
                    }}
                    role="group"
                    aria-label={item.label}
                    inert={!isOpen}
                    style={{ marginLeft: menuShift }}
                    onKeyDown={handleMenuKeyDown}
                    className={cn(
                      "surface-pop absolute left-1/2 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] origin-top -translate-x-1/2 rounded-xl p-1.5 will-change-transform transition-[opacity,translate,scale,visibility] duration-200 ease-out",
                      isOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible -translate-y-1 scale-[0.985] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="flex items-center justify-between px-2.5 pb-1.5 pt-1">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {item.blurb}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[var(--color-brass)]" />
                    </div>
                    {item.items.map((child) => (
                      <NavLink
                        key={child.to + child.label}
                        to={child.to}
                        onClick={() => setOpenMenu(null)}
                        className={({ isActive: linkActive }) =>
                          cn(
                            "group flex items-start justify-between gap-2 rounded-[5px] px-2.5 py-2 transition-colors",
                            linkActive
                              ? "bg-[var(--color-accent)]"
                              : "hover:bg-[var(--color-accent)]/70"
                          )
                        }
                      >
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium text-foreground">{child.label}</span>
                          <span className="block text-[11px] text-muted-foreground">{child.desc}</span>
                        </span>
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </NavLink>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="metal grid h-8 w-8 cursor-pointer place-items-center rounded-[5px] transition-transform active:translate-y-px"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 animate-theme-swap" />
            ) : (
              <Moon className="h-3.5 w-3.5 animate-theme-swap" />
            )}
          </button>
          <Link
            to="/login"
            className="btn-paper btn-tactile ml-1 inline-flex h-8 items-center rounded-[5px] px-3 text-xs font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn-ink btn-tactile inline-flex h-8 items-center rounded-[5px] px-3 text-xs font-medium"
          >
            Sign up
          </Link>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="metal grid h-9 w-9 cursor-pointer place-items-center rounded-[5px]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 animate-theme-swap" />
            ) : (
              <Moon className="h-4 w-4 animate-theme-swap" />
            )}
          </button>
          <button
            type="button"
            ref={mobileButtonRef}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="metal grid h-9 w-9 cursor-pointer place-items-center rounded-[5px]"
          >
            <span className="relative block h-4 w-4" aria-hidden="true">
              <Menu
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-[opacity,rotate] duration-200",
                  mobileOpen ? "rotate-90 opacity-0" : "opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-[opacity,rotate] duration-200",
                  mobileOpen ? "opacity-100" : "-rotate-90 opacity-0"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="animate-nav-in paper mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] w-full max-w-6xl overflow-y-auto rounded-xl p-2 shadow-[var(--shadow-pop)] lg:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => {
              if (!item.items) {
                return (
                  <li key={item.to} className="border-b border-border/60 last:border-b-0">
                    <NavLink
                      to={item.to}
                      end
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-11 items-center rounded-[4px] px-3 text-sm",
                          isActive
                            ? "bg-[var(--color-paper-deep)] font-semibold text-foreground shadow-[inset_2px_0_0_var(--color-wood)]"
                            : "font-medium text-muted-foreground"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }
              const expanded = openGroups.includes(item.label);
              const groupId = `mobile-group-${item.label.toLowerCase()}`;
              return (
                <li key={item.label} className="border-b border-border/60 last:border-b-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((g) =>
                        g.includes(item.label) ? g.filter((x) => x !== item.label) : [...g, item.label]
                      )
                    }
                    aria-expanded={expanded}
                    aria-controls={groupId}
                    className="flex min-h-11 w-full items-center justify-between gap-2 rounded-[4px] px-3 text-sm font-medium text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")}
                    />
                  </button>
                  {expanded ? (
                    <ul id={groupId} className="animate-fade-in pb-2">
                      {item.items.map((child) => (
                        <li key={child.to + child.label}>
                          <NavLink
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "flex min-h-10 items-center rounded-[4px] pl-7 pr-3 text-[13px]",
                                isActive
                                  ? "bg-[var(--color-paper-deep)] font-semibold text-foreground"
                                  : "text-muted-foreground"
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-2 flex flex-col gap-2 border-t border-border px-1 pb-1 pt-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-paper btn-tactile flex h-10 items-center justify-center rounded-[5px] text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="btn-ink btn-tactile flex h-10 items-center justify-center rounded-[5px] text-sm font-medium"
            >
              Create an account
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
