import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Legal
            </p>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: September 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </motion.div>
          ))}
          <div className="pt-4">
            <Button asChild>
              <Link to="/contact">Questions? Contact the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
