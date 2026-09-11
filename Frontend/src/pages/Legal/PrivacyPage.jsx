import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
              <Shield className="mr-1 h-3 w-3" />
              Legal
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
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
              <Link to="/community">Questions? Visit the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}