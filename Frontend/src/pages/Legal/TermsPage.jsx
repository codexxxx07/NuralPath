import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: (
      <>
        By using this website you agree to these terms of service. The platform is a
        student-focused community and learning tool currently in development.
      </>
    ),
  },
  {
    title: "2. Content accuracy",
    body: (
      <>
        We aim to keep all published content accurate. Course material, resources, and
        features shown on this site reflect the current state of the platform. Anything not
        yet available is clearly labeled as in development.
      </>
    ),
  },
  {
    title: "3. Demo features",
    body: (
      <>
        Authentication, dashboards, and the practice lab are prototype features. Data shown
        inside dashboards is sample data for demonstration purposes and does not represent
        real users, results, or statistics.
      </>
    ),
  },
  {
    title: "4. Acceptable use",
    body: (
      <>
        Users are expected to learn, practice, and collaborate constructively. Do not use the
        site to misrepresent yourself, distribute harmful content, or disrupt the community.
      </>
    ),
  },
  {
    title: "5. Intellectual property",
    body: (
      <>
        Course content, curriculum, and site design belong to their respective creators.
        You may use materials for learning purposes. Redistribution requires permission.
      </>
    ),
  },
  {
    title: "6. No warranty",
    body: (
      <>
        The platform is provided as-is. Since it is in active development, features may change
        or be removed. We make no guarantee about third-party tool availability.
      </>
    ),
  },
  {
    title: "7. Changes",
    body: (
      <>
        These terms may be updated as the platform evolves. Continued use of the site after
        changes means you accept the updated terms.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: September 2026
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild>
              <Link to="/contact">Questions? Contact the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
