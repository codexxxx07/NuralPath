import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  {
    label: "Domains",
    children: [
      { to: "/courses?domain=vlsi", label: "VLSI Design", desc: "RTL to GDSII" },
      { to: "/courses?domain=embedded", label: "Embedded Systems", desc: "ARM, RISC-V" },
      { to: "/courses?domain=fpga", label: "FPGA Development", desc: "Verilog, VHDL" },
      { to: "/courses?domain=linux", label: "Linux & Systems", desc: "Kernel, Drivers" },
    ],
  },
  { to: "/community", label: "Community" },
  { to: "/libraries", label: "Resources" },
  { to: "/about", label: "About" },
];

const linkBase =
  "relative rounded-sm py-2 text-sm leading-5 transition-[color,translate] duration-200 ease-out after:absolute after:inset-x-0 after:bottom-[3px] after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:content-[''] after:transition-[scale] after:duration-200 after:ease-out";

const idleLink = `${linkBase} inline-block font-medium text-muted-foreground after:bg-foreground/40 hover:-translate-y-px hover:text-foreground hover:after:scale-x-100`;
const activeLink = `${linkBase} inline-block font-semibold text-foreground after:scale-x-100 after:bg-primary`;
const triggerClosed = `${linkBase} flex cursor-pointer items-center gap-1 font-medium text-muted-foreground after:bg-foreground/40 hover:-translate-y-px hover:text-foreground hover:after:scale-x-100`;
const triggerOpen = `${linkBase} flex cursor-pointer items-center gap-1 font-medium text-foreground after:scale-x-100 after:bg-foreground/40`;

const mobileRow = (depth) => ({ isActive }) =>
  `flex min-h-11 w-full items-center rounded-lg text-sm transition-colors duration-200 ${
    depth ? "pl-7 pr-3" : "px-3"
  } ${
    isActive
      ? "bg-accent font-semibold text-foreground shadow-[inset_2px_0_0_0_var(--color-primary)]"
      : "font-medium text-muted-foreground hover:bg-accent/70 hover:text-foreground"
  }`;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const locationKey = `${location.pathname}${location.search}`;
  const [lastLocationKey, setLastLocationKey] = useState(locationKey);

  const closeMobile = () => setMobileOpen(false);

  if (lastLocationKey !== locationKey) {
    setLastLocationKey(locationKey);
    setDomainsOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDomainsOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setDomainsOpen(false);
        setMobileOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header ref={headerRef} className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border px-4 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ease-out sm:px-5 lg:h-16 lg:px-6 ${
          scrolled ? "bg-card/95 shadow-raised" : "bg-card/85 shadow-card"
        }`}
      >
        {/* Brand + desktop links */}
        <div className="flex min-w-0 items-center gap-4 lg:gap-5 xl:gap-6">
          <Link
            to="/"
            onClick={closeMobile}
            aria-label="NuralPath home"
            className="flex shrink-0 items-center gap-2.5 rounded-lg transition-[scale] duration-200 ease-out active:scale-[0.97]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-xs font-bold text-background">
              N
            </span>
            <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-foreground">
              NuralPath
            </span>
          </Link>

          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDomainsOpen(true)}
                  onMouseLeave={() => setDomainsOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={domainsOpen}
                    aria-haspopup="true"
                    onClick={() => setDomainsOpen((open) => !open)}
                    className={domainsOpen ? triggerOpen : triggerClosed}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-[rotate] duration-200 ${domainsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {domainsOpen && (
                    <div className="surface-pop absolute left-0 top-full z-50 mt-2.5 w-72 animate-pop-in rounded-2xl p-1.5">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setDomainsOpen(false)}
                          className="block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-accent"
                        >
                          <p className="text-sm font-medium text-foreground">{child.label}</p>
                          <p className="text-xs text-muted-foreground">{child.desc}</p>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) => (isActive ? activeLink : idleLink)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="icon-btn grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-border text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 animate-theme-swap" />
            ) : (
              <Moon className="h-4 w-4 animate-theme-swap" />
            )}
          </button>
          <Button variant="outline" size="sm" className="nav-cta ml-1.5 cursor-pointer" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" className="nav-cta cursor-pointer" asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="icon-btn grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-border text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4.5 w-4.5 animate-theme-swap" />
            ) : (
              <Moon className="h-4.5 w-4.5 animate-theme-swap" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="icon-btn grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-border text-muted-foreground"
          >
            <span className="relative block h-5 w-5" aria-hidden="true">
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-[opacity,rotate] duration-200 ease-out ${
                  mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 transition-[opacity,rotate] duration-200 ease-out ${
                  mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="animate-nav-in mx-auto mt-2 max-h-[calc(100dvh-6rem)] w-full max-w-6xl overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-pop lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="border-b border-border/60 py-1.5 last:border-b-0">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={closeMobile}
                      className={mobileRow(1)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </li>
              ) : (
                <li key={link.to} className="border-b border-border/60 last:border-b-0">
                  <NavLink to={link.to} end={link.to === "/"} onClick={closeMobile} className={mobileRow(0)}>
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="mt-2 flex flex-col gap-2 border-t border-border px-1 pb-1 pt-3">
            <Button variant="outline" size="sm" className="nav-cta h-11 w-full cursor-pointer" asChild>
              <Link to="/login" onClick={closeMobile}>
                Login
              </Link>
            </Button>
            <Button size="sm" className="nav-cta h-11 w-full cursor-pointer" asChild>
              <Link to="/register" onClick={closeMobile}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
