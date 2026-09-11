import { Link } from "react-router-dom";
import { Cpu, Mail } from "lucide-react";
import { Button } from "../ui/button";

const courseLinks = [
  { label: "VLSI Design", to: "/courses?domain=vlsi" },
  { label: "Embedded Systems", to: "/courses?domain=embedded" },
  { label: "FPGA Development", to: "/courses?domain=fpga" },
  { label: "Linux & Systems", to: "/courses?domain=linux" },
  { label: "All Courses", to: "/courses" },
];

const resourceLinks = [
  { label: "Libraries & Resources", to: "/libraries" },
  { label: "Courses", to: "/courses" },
  { label: "Community", to: "/community" },
];

const communityLinks = [
  { label: "Community Forum", to: "/community" },
  { label: "Events & Workshops", to: "/community" },
  { label: "Open Source Projects", to: "/community" },
  { label: "Student Stories", to: "/community" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground font-display">
                Stay updated with the community
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Join the community to get updates on courses, practice sessions, and events.
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 shrink-0">
              <Link to="/community">Join the Community</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                NuralPath
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A student-focused platform for Data Structures, Linux systems, VLSI,
              Embedded Systems, and FPGA Development — with live mentorship and
              hands-on practice.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact the community
                </Link>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Courses
            </h3>
            <ul className="mt-4 space-y-2.5">
              {courseLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Community
            </h3>
            <ul className="mt-4 space-y-2.5">
              {communityLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; 2026 NuralPath. All rights reserved.</span>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
