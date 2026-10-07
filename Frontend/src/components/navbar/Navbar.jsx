import { useState } from "react";
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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background">
      <nav
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center" aria-label="NuralPath home">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">
            NuralPath
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setDomainsOpen(true)}
                onMouseLeave={() => setDomainsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 py-2 text-sm transition-colors ${
                    domainsOpen
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${domainsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {domainsOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-md border border-border bg-card p-1 shadow-md">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setDomainsOpen(false)}
                        className="block rounded px-3 py-2 transition-colors hover:bg-accent"
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
                  className={({ isActive }) =>
                    `text-sm transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border bg-background lg:hidden">
          <div className="px-4 pb-4 pt-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-1 py-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={closeMobile}
                      className="block px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
                    `block px-1 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}

            <div className="flex flex-col gap-2 border-t border-border pt-4">
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
        </div>
      )}
    </header>
  );
}
