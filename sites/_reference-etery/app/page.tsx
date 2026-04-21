// REFERENCE: ETERY — AI Dev Studio — dark bg, typewriter text, scrolling buyers, flowing integrations, live counters, rotating testimonials, comparison checklist, team grid
"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Mic,
  Puzzle,
  BrainCircuit,
  ArrowRight,
  Phone,
  Mail,
  Check,
  X,
  ChevronDown,
  Linkedin,
  Twitter,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Layers,
  Sparkles,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#plans" },
  { label: "Reviews", href: "#reviews" },
  { label: "Why Us", href: "#why-us" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faqs" },
];

const logoCompanies = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Slack",
  "Discord",
  "Shopify",
  "Webflow",
  "Supabase",
  "Loom",
  "Zapier",
];

const services = [
  {
    icon: Bot,
    title: "Custom Chatbots",
    description:
      "We create custom AI chat solutions for fast support and a smooth user experience.",
    type: "typewriter" as const,
  },
  {
    icon: Mic,
    title: "Voice Assistants",
    description:
      "We build smart voice solutions for easy control and engaging experiences.",
    type: "buyers" as const,
  },
  {
    icon: Puzzle,
    title: "Tool Integrations",
    description:
      "We integrate AI into your software, CRM, and marketing channels.",
    type: "integrations" as const,
  },
  {
    icon: BrainCircuit,
    title: "AI Consulting",
    description:
      "We plan, automate, and deploy AI to drive efficiency and growth.",
    type: "metrics" as const,
  },
];

const typewriterWords = [
  "Plan",
  "Analyze",
  "Forecast",
  "Build",
  "Optimize",
  "Deploy",
];

const integrationTools = [
  "Salesforce",
  "HubSpot",
  "Zapier",
  "Slack",
  "Notion",
  "Airtable",
  "Mailchimp",
  "Stripe",
  "Shopify",
  "Intercom",
  "Zendesk",
  "Twilio",
];

const metrics = [
  { label: "Revenue", before: "+12%", after: "+23%" },
  { label: "Productivity", before: "+4%", after: "+19%" },
  { label: "Sales", before: "+7%", after: "+23%" },
  { label: "Costs", before: "-5%", after: "-17%" },
];

const results = [
  {
    value: 150,
    suffix: "+",
    label: "Project success",
    desc: "Delivered in 20+ countries, from startups to enterprises.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client efficiency",
    desc: "Clients report higher efficiency with our solutions.",
  },
  {
    value: 300,
    suffix: "K+",
    label: "AI innovation",
    desc: "Hours spent building AI tools to streamline workflows.",
  },
];

const pricingSteps = [
  {
    icon: BarChart3,
    title: "Evaluate",
    desc: "We pinpoint your best AI opportunities.",
  },
  {
    icon: Zap,
    title: "Develop",
    desc: "We build custom AI for your workflow.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "We optimize your AI for lasting impact.",
  },
];

const membershipFeatures = [
  "Full AI Strategy & Roadmap",
  "Light workflow review",
  "Up to 2 integrations",
  "Core guardrails & prompts",
  "Email support (48h) + 1 training",
];

const customFeatures = [
  "Custom AI workflows",
  "System & process strategy",
  "Advanced tool integrations",
  "Custom logic & edge cases",
  "Setup, testing & handover",
];

const testimonials = [
  {
    quote:
      "The best investment for our business. AI technologies not only save time but also increase our revenue.",
    name: "Jesse Leigh",
    role: "CEO & Founder",
    initials: "JL",
  },
  {
    quote:
      "Thanks to their team, our internal processes were optimized, resulting in significant efficiency gains.",
    name: "Amy Louise",
    role: "Customer Success Manager",
    initials: "AL",
  },
  {
    quote:
      "Their AI solutions transformed our content workflow completely. We produce twice the output in half the time.",
    name: "Michael Joseph",
    role: "Head of Content",
    initials: "MJ",
  },
  {
    quote:
      "Thanks to their team, our internal processes were optimized, resulting in savings and better performance.",
    name: "Benjamin Daul",
    role: "Head of Engineering",
    initials: "BD",
  },
];

const otherAgencies = [
  "Manual or partially automated processes",
  "One-size-fits-all approach",
  "Long setup times and complex onboarding",
  "Limited visibility into automation performance",
  "Static systems that can't evolve with your needs",
];

const withUs = [
  "Seamless AI-driven automation workflows",
  "Custom-tailored solutions for any business size",
  "Fast deployment with minimal overhead",
  "Transparent performance tracking with real-time insights",
  "Scalable infrastructure built for future growth",
];

const team = [
  {
    name: "Lucas Harris",
    role: "AI Expert",
    initials: "LH",
    color: "from-green-400 to-emerald-600",
  },
  {
    name: "Peter Johnson",
    role: "Founder",
    initials: "PJ",
    color: "from-blue-400 to-indigo-600",
  },
  {
    name: "Daniel Lee",
    role: "Co-Founder, CEO",
    initials: "DL",
    color: "from-purple-400 to-violet-600",
  },
  {
    name: "Sofia Martin",
    role: "Co-Founder, CTO",
    initials: "SM",
    color: "from-pink-400 to-rose-600",
  },
];

const faqs = [
  {
    q: "What does the membership include?",
    a: "The membership gives you unlimited access to our AI tools, regular updates, priority support, and exclusive resources to help you grow.",
  },
  {
    q: "How do I get started with your services?",
    a: "Simply reach out through our contact form or schedule a call. We'll discuss your needs and create a tailored plan.",
  },
  {
    q: "Can I cancel my membership anytime?",
    a: "Yes, you can cancel your membership at any time with no hidden fees or long-term commitments.",
  },
  {
    q: "Do I need technical expertise to use your tools?",
    a: "Not at all. Our tools are designed to be user-friendly, and we provide full onboarding and support.",
  },
  {
    q: "Are there additional costs?",
    a: "Our pricing is transparent. Any additional costs for custom work will be discussed and agreed upon before starting.",
  },
  {
    q: "How often do you release updates?",
    a: "We release updates regularly to ensure our tools stay cutting-edge and aligned with the latest AI developments.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── ANIMATED COUNTER COMPONENT ──────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ─── TYPEWRITER COMPONENT ────────────────────────────────────────────────────

function TypewriterText({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.slice(0, currentText.length + 1));
          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCurrentText(word.slice(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 60 : 120,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words]);

  return (
    <span className="text-[var(--brand-accent)] font-bold">
      {currentText}
      <span className="typewriter-cursor" />
    </span>
  );
}

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────

function FAQItem({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-[var(--brand-border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-[var(--brand-accent)] transition-colors">
          {String(index + 1).padStart(2, "0")}. {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--brand-muted)]" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function EteryPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white"
          >
            Nova<span className="text-[var(--brand-accent)]">Mind</span>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-muted)] hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-[var(--brand-accent)] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="header"
        className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--brand-accent)] opacity-[0.03] rounded-full blur-[120px]" />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-full px-4 py-2 text-sm text-[var(--brand-muted)] mb-8">
            <Sparkles className="w-4 h-4 text-[var(--brand-accent)]" />
            <span>Helped over 150+ businesses</span>
          </div>

          <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Fuel Your Growth with{" "}
            <span className="text-[var(--brand-accent)]">Next-Gen AI</span>
          </h1>

          <p className="mt-6 text-[var(--brand-muted)] text-lg max-w-xl mx-auto leading-relaxed">
            Unlock new levels of productivity with intelligent automation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#plans"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-black px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              See pricing <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-[var(--brand-border)] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-white/5 transition"
            >
              Get in touch
            </a>
          </div>

          {/* Logo marquee */}
          <div className="mt-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-widest mb-6">
              Trusted by 100+ companies worldwide
            </p>
            <div className="overflow-hidden">
              <div className="logo-marquee flex gap-12 w-max">
                {[...logoCompanies, ...logoCompanies].map((company, i) => (
                  <span
                    key={i}
                    className="text-[var(--brand-muted)]/50 text-sm font-medium whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT (Team preview) ── */}
      <section id="about" className="py-20 px-6 lg:px-12">
        <motion.div
          {...fadeUp}
          className="max-w-7xl mx-auto flex flex-col items-center gap-8"
        >
          <div className="flex -space-x-4">
            {team.map((member) => (
              <div
                key={member.name}
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-sm font-bold border-2 border-black`}
              >
                {member.initials}
              </div>
            ))}
          </div>
          <a
            href="#team"
            className="inline-flex items-center gap-2 text-[var(--brand-accent)] text-sm font-medium hover:underline"
          >
            Meet our team <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Our AI Solutions
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              From automation to analytics, we turn your vision into AI
              solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Service 1: Custom Chatbots with Typewriter */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-bold">Custom Chatbots</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                We create custom AI chat solutions for fast support and a smooth
                user experience.
              </p>

              {/* Typewriter words */}
              <div className="bg-black/50 rounded-xl p-6 border border-[var(--brand-border)]">
                <div className="flex flex-wrap gap-3 mb-6">
                  {["Plan", "Analyze", "Forecast"].map((word) => (
                    <span
                      key={word}
                      className="px-3 py-1.5 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-full text-xs text-[var(--brand-muted)]"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <div className="text-lg">
                  <TypewriterText words={typewriterWords} />
                </div>
                <p className="text-[var(--brand-muted)] text-sm mt-3">
                  Build your AI assistant with confidence.
                </p>
              </div>
            </motion.div>

            {/* Service 2: Voice Assistants with scrolling buyers */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-bold">Voice Assistants</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                We build smart voice solutions for easy control and engaging
                experiences.
              </p>

              {/* Scrolling buyer cards */}
              <div className="h-[200px] overflow-hidden rounded-xl border border-[var(--brand-border)] bg-black/50 relative">
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/80 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="buyers-scroll flex flex-col gap-3 p-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[var(--brand-bg-card)] rounded-lg px-4 py-3 border border-[var(--brand-border)] flex-shrink-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          Potential Buyer
                        </p>
                        <p className="text-xs text-[var(--brand-muted)]">
                          Incoming call
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Service 3: Tool Integrations with flowing logos */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center">
                  <Puzzle className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-bold">Tool Integrations</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                We integrate AI into your software, CRM, and marketing channels.
              </p>

              {/* Flowing integration logos */}
              <div className="overflow-hidden rounded-xl border border-[var(--brand-border)] bg-black/50 py-6">
                <div className="integrations-flow flex gap-4 w-max">
                  {[...integrationTools, ...integrationTools].map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-lg px-4 py-2.5 flex-shrink-0"
                    >
                      <Layers className="w-4 h-4 text-[var(--brand-accent)]" />
                      <span className="text-sm text-[var(--brand-muted)] whitespace-nowrap">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Service 4: AI Consulting with metrics */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-bold">AI Consulting</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                We plan, automate, and deploy AI to drive efficiency and growth.
              </p>

              {/* Metrics comparison */}
              <div className="bg-black/50 rounded-xl border border-[var(--brand-border)] overflow-hidden">
                <div className="grid grid-cols-3 gap-0 text-xs font-medium text-[var(--brand-muted)] border-b border-[var(--brand-border)]">
                  <div className="px-4 py-3" />
                  <div className="px-4 py-3 text-center border-l border-[var(--brand-border)]">
                    Before
                  </div>
                  <div className="px-4 py-3 text-center border-l border-[var(--brand-border)] text-[var(--brand-accent)]">
                    After
                  </div>
                </div>
                {metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`grid grid-cols-3 gap-0 ${i < metrics.length - 1 ? "border-b border-[var(--brand-border)]" : ""}`}
                  >
                    <div className="px-4 py-3 text-sm font-medium text-white">
                      {m.label}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-[var(--brand-muted)] border-l border-[var(--brand-border)]">
                      {m.before}
                    </div>
                    <div className="px-4 py-3 text-center text-sm text-[var(--brand-accent)] font-semibold border-l border-[var(--brand-border)]">
                      {m.after}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESULTS (Live counters) ── */}
      <section id="results" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Our Results
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Tangible results, not empty claims. We build efficient AI tools
              that scale and save valuable time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {results.map((result, i) => (
              <motion.div
                key={result.label}
                className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8 text-center glow-green"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-5xl md:text-6xl font-bold text-[var(--brand-accent)] mb-4">
                  <AnimatedNumber value={result.value} suffix={result.suffix} />
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {result.label}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm">
                  {result.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Industry recognition text */}
          <motion.div {...fadeUp} className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl px-8 py-5">
              <Shield className="w-6 h-6 text-[var(--brand-accent)]" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Industry Recognition
                </p>
                <p className="text-xs text-[var(--brand-muted)]">
                  Recognized for design, tech, sustainability over 5 years.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="plans" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Flexible Pricing
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              Two engagement models for scalable automation and custom AI
              systems.
            </p>
          </motion.div>

          {/* Process steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {pricingSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--brand-muted)] mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-full p-1 flex gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[var(--brand-accent)] text-black"
                    : "text-[var(--brand-muted)] hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-[var(--brand-accent)] text-black"
                    : "text-[var(--brand-muted)] hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8"
              {...fadeUp}
            >
              <h3 className="text-xl font-bold mb-2">Membership</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === "monthly" ? "$999" : "$9,999"}
                </span>
                <span className="text-[var(--brand-muted)] text-sm">
                  {billingCycle === "monthly" ? "per month" : "annually"}
                </span>
              </div>
              <a
                href="#contact"
                className="mt-6 mb-8 w-full inline-flex items-center justify-center gap-2 bg-[var(--brand-accent)] text-black px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[var(--brand-muted)] font-semibold uppercase tracking-wider mt-6 mb-4">
                What&apos;s Included:
              </p>
              <div className="space-y-3">
                {membershipFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                    <span className="text-sm text-[var(--brand-muted)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-accent)]/30 rounded-2xl p-8 relative glow-green"
              {...fadeUp}
            >
              <h3 className="text-xl font-bold mb-2">Custom</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === "monthly" ? "$1,999" : "$19,999"}
                </span>
                <span className="text-[var(--brand-muted)] text-sm">
                  {billingCycle === "monthly" ? "starts from" : "annually"}
                </span>
              </div>
              <a
                href="#contact"
                className="mt-6 mb-8 w-full inline-flex items-center justify-center gap-2 bg-[var(--brand-accent)] text-black px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[var(--brand-muted)] font-semibold uppercase tracking-wider mt-6 mb-4">
                What&apos;s Included:
              </p>
              <div className="space-y-3">
                {customFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                    <span className="text-sm text-[var(--brand-muted)]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS (rotating cards) ── */}
      <section id="reviews" className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold">
              Our Clients
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Tangible results, not empty claims. We build efficient AI tools
              that scale and save valuable time.
            </p>
          </motion.div>
        </div>

        {/* Rotating testimonial cards */}
        <div className="testimonial-rotate flex gap-6 w-max px-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[400px] bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8"
            >
              <p className="text-white text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[var(--brand-muted)]">{t.role}</p>
                </div>
                <a
                  href="#"
                  className="ml-auto text-[var(--brand-muted)] hover:text-white transition"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US (comparison checklist) ── */}
      <section id="why-us" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Why Choose Us
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              Skip overhead and slow hiring. Get top AI talent when you need it
              most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Other agencies */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-6 text-[var(--brand-muted)]">
                Other Agencies
              </h3>
              <div className="space-y-4">
                {otherAgencies.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-sm text-[var(--brand-muted)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Working with NovaMind */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-accent)]/30 rounded-2xl p-8 glow-green"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-6 text-[var(--brand-accent)]">
                Working with NovaMind
              </h3>
              <div className="space-y-4">
                {withUs.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[var(--brand-accent)]" />
                    </div>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Our Team
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Skilled experts, not generic teams. We craft tailored AI systems
              that drive success.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-2xl p-6 text-center group hover:border-[var(--brand-accent)]/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold`}
                >
                  {member.initials}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] mt-1">
                  {member.role}
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href="#"
                    className="text-[var(--brand-muted)] hover:text-[var(--brand-accent)] transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="text-[var(--brand-muted)] hover:text-[var(--brand-accent)] transition"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faqs" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Need answers?
            </h2>
            <p className="mt-4 text-[var(--brand-muted)]">
              Find answers to questions about AI services and how we help you
              grow.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} index={i} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
              Get in touch.
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              No delays, no vague replies. We respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div {...fadeUp} className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Chat to sales
                  </p>
                  <a
                    href="mailto:hello@novamind.ai"
                    className="text-sm text-[var(--brand-accent)] hover:underline"
                  >
                    hello@novamind.ai
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Call us</p>
                  <a
                    href="tel:+15551234567"
                    className="text-sm text-[var(--brand-accent)] hover:underline"
                  >
                    (555) 123-4567
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
              {...fadeUp}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Name*
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-xl text-sm text-white placeholder:text-[var(--brand-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-xl text-sm text-white placeholder:text-[var(--brand-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">
                  Select plan
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value="core"
                      defaultChecked
                      className="accent-[var(--brand-accent)]"
                    />
                    <span className="text-sm text-[var(--brand-muted)]">
                      Core
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value="custom"
                      className="accent-[var(--brand-accent)]"
                    />
                    <span className="text-sm text-[var(--brand-muted)]">
                      Custom
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message"
                  className="w-full px-4 py-3 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-xl text-sm text-white placeholder:text-[var(--brand-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--brand-accent)] text-black px-6 py-3.5 rounded-full text-sm font-bold hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 border-t border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-white mb-4">
              Get the newsletter
            </p>
            <form
              className="flex gap-2 max-w-sm mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-[var(--brand-bg-card)] border border-[var(--brand-border)] rounded-full text-sm text-white placeholder:text-[var(--brand-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition"
              />
              <button
                type="submit"
                className="bg-[var(--brand-accent)] text-black px-5 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Footer links */}
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--brand-muted)] font-semibold mb-4">
                Navigation
              </p>
              <div className="space-y-2">
                {navLinks.slice(0, 5).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--brand-muted)] font-semibold mb-4">
                Resource
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--brand-muted)] font-semibold mb-4">
                Social
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
                <a
                  href="#"
                  className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block text-sm text-[var(--brand-muted)] hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[var(--brand-border)] gap-4">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
              Nova<span className="text-[var(--brand-accent)]">Mind</span> AI
            </span>
            <p className="text-xs text-[var(--brand-muted)]">
              &copy; 2026 NovaMind AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
