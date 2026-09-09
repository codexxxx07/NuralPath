import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu,
  Layers,
  Zap,
  BookOpen,
  Video,
  Terminal,
  Bot,
  Users,
  Award,
  ChevronRight,
  ArrowRight,
  Play,
  CheckCircle2,
  Monitor,
  ArrowUpRight,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  MessageSquare,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

function AnimateOnScroll({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 15000, suffix: "+", label: "Students Enrolled" },
  { value: 50, suffix: "+", label: "Industry Mentors" },
  { value: 95, suffix: "%", label: "Placement Rate" },
  { value: 200, suffix: "+", label: "Hours of Content" },
];

const domains = [
  {
    icon: Cpu,
    title: "VLSI Design",
    description: "From RTL design to GDSII. Master Verilog, SystemVerilog, CMOS VLSI, Physical Design, and ASIC flow.",
    topics: ["RTL Design", "Verification", "Physical Design", "Timing Analysis"],
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    link: "/courses?domain=vlsi",
  },
  {
    icon: Zap,
    title: "Embedded Systems",
    description: "ARM, RISC-V, RTOS, device drivers, and firmware development for real-world IoT & automotive applications.",
    topics: ["ARM Cortex", "RISC-V", "RTOS", "Device Drivers"],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    link: "/courses?domain=embedded",
  },
  {
    icon: Layers,
    title: "FPGA Development",
    description: "Program FPGAs using Verilog, VHDL. Design digital systems, implement SoCs, and deploy hardware accelerators.",
    topics: ["Verilog/VHDL", "SoC Design", "DSP on FPGA", "HLS"],
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    link: "/courses?domain=fpga",
  },
  {
    icon: Terminal,
    title: "Linux & Systems",
    description: "Linux kernel internals, device drivers, system programming in C, shell scripting, and open-source contribution.",
    topics: ["Kernel Dev", "System Programming", "Shell Scripting", "Git & OSS"],
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    link: "/courses?domain=linux",
  },
];

const features = [
  {
    icon: Video,
    title: "Live Instructor-Led Classes",
    description:
      "Interactive sessions with screen sharing, real-time coding, and instant doubt resolution. No pre-recorded nonsense.",
  },
  {
    icon: Terminal,
    title: "Real Hardware Practice Labs",
    description:
      "Write RTL, simulate with industry tools, and run code on actual hardware — not browser sandboxes.",
  },
  {
    icon: Bot,
    title: "AI-Powered Tutor",
    description:
      "Stuck on Verilog syntax or kernel APIs? Get instant explanations, code reviews, and concept breakdowns.",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Learn from engineers at Intel, Qualcomm, NVIDIA, and AMD. Code reviews, career guidance, and project feedback.",
  },
  {
    icon: BookOpen,
    title: "Structured Learning Paths",
    description:
      "Curated curricula from beginner to advanced — VLSI RTL to Physical Design, or C basics to Kernel drivers.",
  },
  {
    icon: Award,
    title: "Industry-Recognized Certificates",
    description:
      "Verified certificates that carry weight. Share on LinkedIn, add to resume — validated by partner companies.",
  },
  {
    icon: Target,
    title: "Interview Preparation",
    description:
      "VLSI/Embedded interview questions, mock interviews, resume reviews, and company-specific preparation modules.",
  },
  {
    icon: MessageSquare,
    title: "Community & Discussion Forums",
    description:
      "Connect with 15K+ peers. Discuss RTL bugs, share kernel patches, and collaborate on open-source hardware projects.",
  },
  {
    icon: Shield,
    title: "Lifetime Access",
    description:
      "Enroll once, learn forever. Access all course materials, future updates, and recorded sessions for life.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Domain",
    description: "Pick from VLSI Design, Embedded Systems, FPGA, or Linux & Systems based on your career goals.",
    icon: Target,
  },
  {
    step: "02",
    title: "Follow the Learning Path",
    description: "Structured curriculum with progressive difficulty — each module builds on the previous one.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Practice on Real Hardware",
    description: "Use industry-grade tools and real hardware setups in our cloud-based practice labs.",
    icon: Monitor,
  },
  {
    step: "04",
    title: "Get Placed & Certified",
    description: "Ace interviews with our prep modules and earn certificates recognized by top semiconductor companies.",
    icon: Award,
  },
];

const companies = [
  "Intel",
  "Qualcomm",
  "NVIDIA",
  "AMD",
  "Texas Instruments",
  "Broadcom",
  "Samsung Semi",
  "MediaTek",
  "Synopsys",
  "Cadence",
  "Siemens EDA",
  "Arm",
];

const testimonials = [
  {
    name: "Arjun Patel",
    role: "VLSI Design Engineer @ Intel",
    quote:
      "NuralPath's VLSI course took me from zero RTL knowledge to cracking Intel's interview. The hands-on Verilog labs and mentor feedback were game-changers.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Embedded Software Engineer @ Qualcomm",
    quote:
      "The embedded systems path is incredibly well-structured. From ARM Cortex basics to RTOS — everything connects. Got placed within 2 months of completing the course.",
    rating: 5,
  },
  {
    name: "Karthik Menon",
    role: "FPGA Engineer @ NVIDIA",
    quote:
      "Real FPGA labs, not simulations. I built an actual hardware accelerator as my capstone project, and it became my portfolio piece that impressed NVIDIA recruiters.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Linux Kernel Developer @ Red Hat",
    quote:
      "The Linux & Systems path is exactly what the industry needs. From kernel modules to open-source contributions — NuralPath teaches what universities don't.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Physical Design Engineer @ TSMC",
    quote:
      "The Physical Design module with real P&R tools and timing analysis labs prepared me for actual industry work. Mentors from Cadence were incredibly helpful.",
    rating: 5,
  },
  {
    name: "Meera Krishnan",
    role: "Verification Engineer @ AMD",
    quote:
      "SystemVerilog verification methodology taught at NuralPath is on par with what big companies use internally. The mock interviews sealed the deal for me.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What prerequisites do I need for VLSI courses?",
    answer:
      "Basic digital electronics knowledge helps, but we start from fundamentals. You need a computer with internet access — all tools are cloud-based. No expensive software or hardware required.",
  },
  {
    question: "Do you provide actual hardware for FPGA labs?",
    answer:
      "Yes! Our cloud labs connect to real FPGA boards (Xilinx, Intel/Altera) so you can synthesize and test your designs on actual hardware — not just simulations.",
  },
  {
    question: "How are the live classes conducted?",
    answer:
      "Live classes happen via video conferencing with screen sharing. Instructors code in real-time, explain RTL/kernel concepts interactively, and solve doubts live. All sessions are recorded.",
  },
  {
    question: "Can I switch between learning paths?",
    answer:
      "Absolutely. You can enroll in multiple domains. For example, start with VLSI Design and add FPGA Development — the fundamentals overlap and it makes you more versatile.",
  },
  {
    question: "Do you offer placement assistance?",
    answer:
      "Yes. We have tie-ups with 50+ semiconductor and tech companies. Our placement module includes resume building, mock interviews, and direct referrals to partner companies.",
  },
  {
    question: "What's the batch size for mentorship?",
    answer:
      "We keep cohorts small — 20-30 students per batch — so every student gets personalized attention. 1-on-1 mentor sessions are scheduled weekly.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. We offer a 7-day money-back guarantee. If you're not satisfied with the course within the first week, we'll refund your fee — no questions asked.",
  },
  {
    question: "Do I get a certificate after course completion?",
    answer:
      "Yes. Upon completing all modules and the final project, you receive an industry-recognized certificate. You can verify it on our platform and share it on LinkedIn.",
  },
];

const pricingPlans = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    description: "Get started with basics",
    features: [
      "Access to beginner content",
      "Community forum access",
      "2 practice lab sessions",
      "Email support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₹4,999",
    period: "/month",
    description: "Complete learning experience",
    features: [
      "All course content access",
      "Live instructor-led classes",
      "Unlimited practice labs",
      "1-on-1 mentor sessions",
      "Interview preparation",
      "Industry certificate",
    ],
    cta: "Enroll Now",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams & colleges",
    features: [
      "Everything in Professional",
      "Bulk enrollment discounts",
      "Custom curriculum",
      "Dedicated account manager",
      "API access for LMS integration",
      "On-campus workshops",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative overflow-hidden hero-gradient">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl"
              >
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  India's #1 VLSI & Semiconductor EdTech Platform
                </Badge>
                <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Build the{" "}
                  <span className="gradient-text">Hardware & Systems</span>{" "}
                  of Tomorrow
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Master VLSI Design, Embedded Systems, FPGA Development, and
                  Linux Kernel Programming — with live classes, real hardware
                  labs, and industry mentors from Intel, Qualcomm & NVIDIA.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                    <Link to="/register">
                      Start Learning Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2">
                    <Link to="/courses">
                      <Play className="h-4 w-4" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Free tier available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>

              {/* Code/Terminal Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden glow-indigo">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs font-medium text-muted-foreground font-mono">
                      module.v
                    </span>
                  </div>
                  {/* Verilog code */}
                  <div className="p-5 font-mono text-sm leading-7 text-foreground/80">
                    <p>
                      <span className="text-purple-500">module</span>{" "}
                      <span className="text-cyan-500">alu</span>(
                    </p>
                    <p className="pl-4">
                      <span className="text-muted-foreground">input</span> [31:0]
                      a, b,
                    </p>
                    <p className="pl-4">
                      <span className="text-muted-foreground">input</span> [3:0]
                      op,
                    </p>
                    <p className="pl-4">
                      <span className="text-muted-foreground">output</span>{" "}
                      reg [31:0] result
                    </p>
                    <p>);</p>
                    <p className="pl-4">
                      <span className="text-purple-500">always</span> @(*){" "}
                      <span className="text-purple-500">case</span>(op)
                    </p>
                    <p className="pl-8">
                      <span className="text-indigo-400">4'b0000</span>: result
                      = a + b;
                    </p>
                    <p className="pl-8">
                      <span className="text-indigo-400">4'b0001</span>: result
                      = a &amp; b;
                    </p>
                    <p className="pl-4 text-primary">
                      endcase
                      <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
                    </p>
                    <p>
                      <span className="text-purple-500">endmodule</span>
                    </p>
                  </div>
                  {/* Glow */}
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground sm:text-4xl font-display">
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Our students work at
            </p>
          </AnimateOnScroll>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {companies.map((company, i) => (
              <AnimateOnScroll key={company} delay={i * 0.05}>
                <span className="text-lg font-semibold text-muted-foreground/50 transition-colors hover:text-muted-foreground font-display">
                  {company}
                </span>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tech Domains ─── */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Learning Domains
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose Your Specialization
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Deep, industry-focused learning paths designed to make you job-ready
              in semiconductor and systems engineering.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((domain, i) => (
              <AnimateOnScroll key={domain.title} delay={i * 0.1}>
                <Link to={domain.link}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer border-border/50">
                    <CardContent className="p-6">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${domain.bgColor} ${domain.textColor} transition-transform group-hover:scale-110`}
                      >
                        <domain.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground font-display">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {domain.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {domain.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Explore Courses
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Platform Features
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Master Hardware & Systems
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From structured courses to real hardware practice — every tool
              you need is built into the platform.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 0.08}>
                <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-border/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-y border-border bg-surface/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              How It Works
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Path to a Semiconductor Career
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Follow our proven learning framework to go from beginner to
              industry-ready in months, not years.
            </p>
          </AnimateOnScroll>

          <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.12}>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-bold text-primary/50 font-mono">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground font-display">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start free. Upgrade when you're ready. No hidden fees.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <AnimateOnScroll key={plan.name} delay={i * 0.1}>
                <Card
                  className={`h-full relative ${
                    plan.highlighted
                      ? "border-primary shadow-lg glow-indigo"
                      : "border-border/50"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold text-foreground font-display">
                      {plan.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground font-display">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-8 w-full ${
                        plan.highlighted
                          ? "bg-primary hover:bg-primary/90"
                          : ""
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/register">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="border-y border-border bg-surface/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Students Who Built Their Careers With NuralPath
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Real stories from engineers who went from learners to working at
              top semiconductor companies.
            </p>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 0.1}>
                <Card className="h-full border-border/50">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <span key={j} className="text-amber-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Cpu className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Enter the Semiconductor Industry?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join 15,000+ students building careers in VLSI, Embedded Systems,
              and Hardware Engineering. Start your journey today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 gap-2">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link to="/courses">
                  Browse Courses
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-border bg-surface/30 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center">
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="mt-12" delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-foreground font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
