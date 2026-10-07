import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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

const activeLink =
  "relative text-sm font-medium text-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-primary after:content-['']";
const idleLink =
  "relative text-sm text-muted-foreground transition-colors hover:text-foreground";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-border bg-card px-4 transition-all duration-200 ease-out lg:px-5 ${
          scrolled ? "h-12 shadow-float" : "h-14 shadow-card"
        }`}
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="NuralPath home">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-foreground text-[11px] font-bold text-background">
            N
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">
            NuralPath
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setDomainsOpen(true)}
                onMouseLeave={() => setDomainsOpen(false)}
              >
                <button
                  aria-expanded={domainsOpen}
                  className={`flex items-center gap-1 py-2 text-sm transition-colors ${
                    domainsOpen
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${domainsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {domainsOpen && (
                  <div className="surface-pop absolute left-0 top-full z-50 mt-2 w-72 animate-pop-in rounded-xl p-1.5">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setDomainsOpen(false)}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                      >
                        <p className="text-sm text-foreground">{child.label}</p>
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

        {/* Desktop right */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/login"
            className="ml-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Button size="sm" asChild>
            <Link to="/register">Start Free</Link>
          </Button>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-6xl animate-pop-in rounded-xl border border-border bg-card p-4 shadow-pop lg:hidden">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="px-1 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}

          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login" onClick={closeMobile}>
                Login
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/register" onClick={closeMobile}>
                Start Free
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
