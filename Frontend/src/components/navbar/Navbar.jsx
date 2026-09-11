import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Zap,
  BookOpen,
  Cpu,
  Layers,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  {
    label: "Domains",
    children: [
      { to: "/courses?domain=vlsi", label: "VLSI Design", icon: Cpu, desc: "RTL to GDSII" },
      { to: "/courses?domain=embedded", label: "Embedded Systems", icon: Zap, desc: "ARM, RISC-V" },
      { to: "/courses?domain=fpga", label: "FPGA Development", icon: Layers, desc: "Verilog, VHDL" },
      { to: "/courses?domain=linux", label: "Linux & Systems", icon: BookOpen, desc: "Kernel, Drivers" },
    ],
  },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="NuralPath home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            NuralPath
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setDomainsOpen(true)}
                onMouseLeave={() => setDomainsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    domainsOpen
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${domainsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {domainsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full z-50 mt-1 w-80 rounded-xl border border-border bg-card p-2 shadow-xl"
                    >
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setDomainsOpen(false)}
                          className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-accent"
                        >
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <child.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {child.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {child.desc}
                            </p>
                          </div>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.125rem] w-[1.125rem]" />
            ) : (
              <Moon className="h-[1.125rem] w-[1.125rem]" />
            )}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
            <Link to="/register">Start Free</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.125rem] w-[1.125rem]" />
            ) : (
              <Moon className="h-[1.125rem] w-[1.125rem]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={closeMobile}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <child.icon className="h-4 w-4 text-primary" />
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
                      `block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
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

              <div className="flex flex-col gap-2 pt-3">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
