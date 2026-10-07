import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

const pillars = [
  {
    title: "Learning & Skill Building",
    description:
      "Follow structured tracks in Linux, Shell, C, and Data Structures. Study together in small groups, work through the curriculum, and practice in the built-in terminal lab.",
  },
  {
    title: "Hands-on Practice",
    description:
      "The practice lab gives every student an interactive terminal for day-to-day practice — no setup required. Get stuck less and build muscle memory faster.",
  },
  {
    title: "Networking",
    description:
      "Meet fellow students working toward the same goals, share progress, and build the kind of connections that help you grow as an engineer.",
  },
  {
    title: "Projects & Collaboration",
    description:
      "Team up on projects — from data structure libraries to shell tooling. Collaborating on real code is the fastest way to learn.",
  },
  {
    title: "Hackathons & Competitions",
    description:
      "Community-run coding challenges and mini-hackathons are organized around the learning tracks. Participation is the goal — not just winning.",
  },
  {
    title: "Internship & Job Opportunities",
    description:
      "As the community grows, opportunities get shared with students first — internships, referrals, and openings posted by members and mentors.",
  },
];

const howToJoin = [
  {
    step: "01",
    title: "Create a free account",
    description: "Sign up to get your student dashboard, course progress, and practice lab access.",
    to: "/register",
  },
  {
    step: "02",
    title: "Pick a learning track",
    description: "Start with Linux Fundamentals or jump into Data Structures in C.",
    to: "/courses",
  },
  {
    step: "03",
    title: "Practice every day",
    description: "Use the practice lab to drill commands and concepts until they stick.",
    to: "/dashboard/practice-lab",
  },
  {
    step: "04",
    title: "Contribute back",
    description: "Help others with doubts, review peers' code, and share what you build.",
    to: "/community",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Student Community
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Learn, Build, and Grow Together
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              NuralPath is a student-driven community for anyone serious about Linux,
              C, and Data Structures. Whether you're just starting or already building
              systems-level projects, there's a place for you here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/register">
                  Join the Community
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">Explore Learning Tracks</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About the community ─── */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                About This Community
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Built by students, for students
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The community exists so that no student has to figure out systems
                programming, C, or data structures alone. It's a place where you can
                ask questions without hesitation, practice without embarrassment, and
                find people at the same stage as you.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We keep things focused: real learning, real practice, and real
                collaboration — not hype. If you're willing to put in consistent
                effort, you'll find everyone here willing to help you along.
              </p>
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">Focused</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  We concentrate on the fundamentals that matter: Linux, C, algorithms, and systems thinking.
                </p>
              </div>
              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">Supportive</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  No question is too basic. Beginners and advanced learners help each other daily.
                </p>
              </div>
              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">Hands-on</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Everything is tied to practice — you learn by typing, running, and debugging.
                </p>
              </div>
              <div className="border-t border-border py-5">
                <h3 className="text-sm font-medium text-foreground">Growing</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  New tracks and resources are added as students actually build them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What the community offers ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              What the Community Offers
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              More Than a Course Catalog
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everything below is something students can actually participate in right now.
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border-t border-border py-6">
                <h3 className="text-base font-medium text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How to get involved ─── */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Get Started
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              How Students Can Get Involved
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Joining is simple, and you can start learning in the next five minutes.
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {howToJoin.map((step) => (
              <div key={step.step} className="border-t border-border py-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.step}
                </span>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <Link
                  to={step.to}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Go
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Your First Doubt Is the Best Place to Start
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Join the community, ask your first question, and start your learning journey
            with people who'll help you through it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/register">
                Join for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
