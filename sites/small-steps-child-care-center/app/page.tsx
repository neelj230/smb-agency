// Small Steps Child Care Center — Medford, OR — dark bg, typewriter text, scrolling elements, live counters, rotating testimonials, comparison checklist, team grid
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
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const logoCompanies = [
  "Medford",
  "Oregon",
  "Preschool",
  "Childcare",
  "Learning",
  "Family",
  "Toddler",
  "Infant",
  "Development",
  "Nurturing",
  "Community",
  "Education",
];

const services = [
  {
    icon: Bot,
    title: "Preschool Program (Ages 3–5)",
    description:
      "A structured yet nurturing preschool experience designed to build early learning foundations, social skills, and school readiness.",
    type: "typewriter" as const,
  },
  {
    icon: Mic,
    title: "Infant & Toddler Care",
    description:
      "Gentle, attentive care for the youngest children with age-appropriate activities, safe environments, and consistent caregiver relationships.",
    type: "buyers" as const,
  },
  {
    icon: Puzzle,
    title: "Developmental Learning Activities",
    description:
      "Daily play-based and structured activities that support cognitive, emotional, and physical milestones at every stage of early childhood.",
    type: "integrations" as const,
  },
  {
    icon: BrainCircuit,
    title: "Family Communication & Support",
    description:
      "Regular updates and open communication with parents to ensure families feel informed, involved, and genuinely cared for as partners.",
    type: "metrics" as const,
  },
];

const typewriterWords = [
  "Nurture",
  "Explore",
  "Discover",
  "Grow",
  "Learn",
  "Thrive",
];

const integrationTools = [
  "Reading",
  "Painting",
  "Storytime",
  "Music",
  "Outdoor Play",
  "Puzzles",
  "Building Blocks",
  "Science",
  "Art",
  "Math",
  "Social Skills",
  "Movement",
];

const metrics = [
  { label: "School Readiness", before: "+30%", after: "+75%" },
  { label: "Social Skills", before: "+20%", after: "+60%" },
  { label: "Parent Confidence", before: "+25%", after: "+95%" },
  { label: "Child Anxiety", before: "-10%", after: "-55%" },
];

const results = [
  {
    value: 5,
    suffix: "★",
    label: "Perfect Rating",
    desc: "Every family that has reviewed Small Steps has given a perfect 5-star rating.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Family Recommendation",
    desc: "All current families say they would recommend Small Steps to others.",
  },
  {
    value: 3,
    suffix: "+",
    label: "Years Serving Medford",
    desc: "Proudly supporting local families in Medford, Oregon every day.",
  },
];

const pricingSteps = [
  {
    icon: BarChart3,
    title: "Schedule a Tour",
    desc: "Visit us and see firsthand why families love Small Steps.",
  },
  {
    icon: Zap,
    title: "Enroll Your Child",
    desc: "We'll walk you through the enrollment process with ease.",
  },
  {
    icon: TrendingUp,
    title: "Watch Them Grow",
    desc: "Your child thrives with daily love, care, and intentional learning.",
  },
];

const membershipFeatures = [
  "Structured preschool curriculum",
  "Trained and caring teaching staff",
  "Safe, child-friendly environment",
  "Regular parent communication",
  "Morning drop-off through afternoon pickup",
];

const customFeatures = [
  "Infant & toddler specialized care",
  "Developmental milestone tracking",
  "Play-based and structured activities",
  "Sibling enrollment support",
  "First-time parent guidance & reassurance",
];

const testimonials = [
  {
    quote:
      "We have had our oldest child attending Small Steps since she turned 3 and have had nothing less than a positive experience here. It truly has been a blessing with finding this school.",
    name: "Jared and Victoria Krelic",
    role: "Small Steps Parents",
    initials: "JK",
  },
  {
    quote:
      "We cannot wait for our youngest to start here soon. Thank you for all that you are doing. Small Steps has made such a meaningful difference for our family.",
    name: "Victoria Krelic",
    role: "Parent of Two",
    initials: "VK",
  },
  {
    quote:
      "Finding Small Steps was truly a blessing. The staff treats every child with such genuine care and warmth — it makes all the difference as a parent.",
    name: "Medford Parent",
    role: "Current Preschool Family",
    initials: "MP",
  },
  {
    quote:
      "The communication from the staff keeps us informed and involved every step of the way. We feel like true partners in our daughter's growth and learning.",
    name: "Local Medford Family",
    role: "Enrolled Parent",
    initials: "LF",
  },
];

const otherAgencies = [
  "Impersonal, high-turnover childcare environments",
  "One-size-fits-all programs regardless of age",
  "Minimal communication with parents",
  "Environments that feel institutional rather than warm",
  "Staff who don't build lasting relationships with families",
];

const withUs = [
  "A warm, nurturing environment that feels like family",
  "Age-appropriate programs tailored to each child's stage",
  "Consistent and open communication with parents",
  "Dedicated staff who celebrate every small step forward",
  "A trusted community that grows with your whole family",
];

const team = [
  {
    name: "Lead Teacher",
    role: "Preschool Educator",
    initials: "LT",
    color: "from-green-400 to-emerald-600",
  },
  {
    name: "Infant Caregiver",
    role: "Infant & Toddler Specialist",
    initials: "IC",
    color: "from-blue-400 to-indigo-600",
  },
  {
    name: "Program Director",
    role: "Center Director",
    initials: "PD",
    color: "from-purple-400 to-violet-600",
  },
  {
    name: "Family Coordinator",
    role: "Parent Liaison",
    initials: "FC",
    color: "from-pink-400 to-rose-600",
  },
];

const faqs = [
  {
    q: "What age does my child need to be to enroll at Small Steps?",
    a: "Small Steps welcomes children starting at age 3 for their preschool program. Infant and toddler care options are also available — contact the center directly at (541) 774-9326 to discuss your child's specific age and needs.",
  },
  {
    q: "What makes Small Steps different from other daycares in Medford?",
    a: "Families consistently describe Small Steps as feeling like 'a blessing' — a place that goes beyond basic childcare to genuinely support the whole family. Parents who enrolled their first child have been so impressed they're eagerly waiting to enroll their younger children too.",
  },
  {
    q: "How does Small Steps communicate with parents?",
    a: "The center is known for making families feel appreciated and informed. Parents describe feeling genuinely supported and grateful for the ongoing relationship the staff builds with their family — not just their child.",
  },
  {
    q: "Can siblings enroll at Small Steps together?",
    a: "Absolutely. Families with multiple children are warmly welcomed, and several current families have enrolled or are planning to enroll more than one child at Small Steps, finding consistency and trust across the board.",
  },
  {
    q: "Is Small Steps a good fit for first-time daycare parents?",
    a: "Yes — the center is especially praised by parents navigating childcare for the first time. The warmth and reliability of the staff helps ease the transition for both children and parents who may feel anxious about leaving their child.",
  },
  {
    q: "How do I get started or schedule a visit?",
    a: "Call Small Steps directly at (541) 774-9326 to ask about current availability, schedule a tour, and learn more about enrollment. The team is located at 1900 Crater Lake Ave, Medford, OR 97504.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

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

export default function BusinessPage() {
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
            Small <span className="text-[var(--brand-accent)]">Steps</span>
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
            Schedule a Tour
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
            <span>Serving families since day one</span>
          </div>

          <h1 className="text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Fuel Your Growth with{" "}
            <span className="text-[var(--brand-accent)]">Small Steps Child Care</span>
          </h1>

          <p className="mt-6 text-[var(--brand-muted)] text-lg max-w-xl mx-auto leading-relaxed">
            Little feet, big futures, every day.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#plans"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-black px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              See programs <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-[var(--brand-border)] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-white/5 transition"
            >
              Schedule a Tour
            </a>
          </div>

          {/* Logo marquee */}
          <div className="mt-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-widest mb-6">
              Trusted by Medford families
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
            Meet our caregivers <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight">
              Our Programs
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              Structured programs for every stage of early childhood development.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Service 1: Preschool Program with Typewriter */}
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
                <h3 className="text-xl font-bold">Preschool Program</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                A structured early learning experience that builds school readiness, social skills, and confidence for children ages 3 and up.
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
                  Structured learning for ages 3-5.
                </p>
              </div>
            </motion.div>

            {/* Service 2: Infant & Toddler Care with scrolling buyers */}
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
                <h3 className="text-xl font-bold">Infant & Toddler Care</h3>
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
                          Prospective Parent
                        </p>
                        <p className="text-xs text-[var(--brand-muted)]">
                          Parent inquiry
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Service 3: Full-Day Childcare with flowing logos */}
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
                <h3 className="text-xl font-bold">Full-Day Childcare</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                Safe, nurturing full-day care for your growing child.
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

            {/* Service 4: Developmental Activities with metrics */}
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
                <h3 className="text-xl font-bold">Developmental Activities</h3>
              </div>
              <p className="text-[var(--brand-muted)] text-sm mb-8">
                Play-based learning that supports every stage of development.
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
              Our Families
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Families trust Small Steps for consistent, loving care that makes a real difference.
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
                  Family Communication
                </p>
                <p className="text-xs text-[var(--brand-muted)]">
                  We keep parents close with consistent updates and support.
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
              Simple, Clear Tuition
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              Transparent, straightforward pricing for quality childcare in Medford.
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
              <h3 className="text-xl font-bold mb-2">Enrollment</h3>
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
                Schedule a Tour <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[var(--brand-muted)] font-semibold uppercase tracking-wider mt-6 mb-4">
                What's Included:
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
                Schedule a Tour <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[var(--brand-muted)] font-semibold uppercase tracking-wider mt-6 mb-4">
                What's Included:
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
              Our Families
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Families trust Small Steps for consistent, loving care that makes a real difference.
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
              What sets Small Steps apart from other daycares in Medford.
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
                Other Daycares
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

            {/* Enrolling at Small Steps */}
            <motion.div
              className="bg-[var(--brand-bg-card)] border border-[var(--brand-accent)]/30 rounded-2xl p-8 glow-green"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-6 text-[var(--brand-accent)]">
                Enrolling at Small Steps
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
              Our Caregivers
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto">
              Dedicated professionals who treat every child like family.
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
              Have questions?
            </h2>
            <p className="mt-4 text-[var(--brand-muted)]">
              Common questions about enrollment, programs, and what to expect at Small Steps.
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
              Schedule a Tour.
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto">
              Reach out anytime — we respond within 24 hours.
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
                    Talk to our staff
                  </p>
                  <a
                    href="mailto:info@smallstepsmedford.com"
                    className="text-sm text-[var(--brand-accent)] hover:underline"
                  >
                    info@smallstepsmedford.com
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
                  Enroll now
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
                Schedule a Tour <ArrowRight className="w-4 h-4" />
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
              Stay connected
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
              Small <span className="text-[var(--brand-accent)]">Steps</span> AI
            </span>
            <p className="text-xs text-[var(--brand-muted)]">
              &copy; 2026 Small Steps Child Care Center. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
