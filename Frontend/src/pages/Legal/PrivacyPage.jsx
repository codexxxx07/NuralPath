import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const sections = [
  {
    title: "1. What this policy covers",
    body: (
      <>
        This policy describes how NuralPath handles information when you use this website.
        At this time the platform is in development and does not operate accounts, store
        user data, or connect to any backend service.
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        Because the website is a frontend prototype, the only data we store is what your
        browser stores locally — for example your theme preference (light/dark mode),
        saved under the key <code className="rounded bg-muted px-1 font-mono text-xs">nuralpath-theme</code>.
        We do not collect, transmit, or store any personal information.
      </>
    ),
  },
  {
    title: "3. Data you enter in forms",
    body: (
      <>
        Login, registration, and contact forms on this site are UI demos. Any text you type
        into them stays in your own browser session and is not sent anywhere. Once a real
        authentication and backend system is deployed, this policy will be updated to reflect
        how that data is handled.
      </>
    ),
  },
  {
    title: "4. Third-party services",
    body: (
      <>
        Google Fonts are loaded from Google's servers, which means your browser contacts Google
        when downloading font files. No other third-party tracking or analytics is used.
      </>
    ),
  },
  {
    title: "5. Changes to this policy",
    body: (
      <>
        This policy will be updated as the platform evolves. When a backend, accounts, or
        analytics are introduced, we'll revise this page before those features go live.
      </>
    ),
  },
  {
    title: "6. Contact",
    body: (
      <>
        If you have questions about this policy, reach out through the community page.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>

          <header className="mt-8 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: September 2026
            </p>
          </header>

          <div className="mt-10 max-w-2xl border-t border-border">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-border py-6"
              >
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild>
              <Link to="/community">Questions? Visit the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
