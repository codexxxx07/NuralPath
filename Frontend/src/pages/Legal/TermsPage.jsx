import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

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
      <section className="relative overflow-hidden hero-gradient">
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <Badge variant="secondary" className="mb-4">
              <Scale className="mr-1 h-3 w-3" />
              Legal
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: September 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/40 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-xl font-semibold text-foreground font-display">
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