// REFERENCE: AGEVIA — elegant consulting, Playfair serif + Inter, dark/light alternating,
// sliding text bar, rotating question rows, sticky service cards, globe process, comparison table,
// artistic testimonials, redesigned FAQ, big logo footer
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Briefcase,
  Building2,
  Globe,
  Rocket,
  CheckCircle,
  X,
  ChevronDown,
  Star,
  Play,
  Minus,
  Plus,
  FileText,
  Layers,
  Calendar,
  UserCheck,
  Icon,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = [
  "Licensed CPA Firm",
  "Individual & Business Tax",
  "Complex Year Specialists",
  "Commission Income Experts",
  "Monday–Friday Availability",
  "Person-First Approach",
];

const roadblockQuestionsRow1 = [
  "How do I handle a complicated tax year?",
  "What can I deduct as a commission salesperson?",
  "Do I need a CPA or can I file myself?",
  "How do I report multiple income streams?",
];

const roadblockQuestionsRow2 = [
  "What happens if I made a mistake on a past return?",
  "How do I reduce what I owe at tax time?",
  "When should I start thinking about tax planning?",
  "What records do I need to bring to my appointment?",
];

const roadblockQuestionsRow3 = [
  "How are self-employed taxes different?",
  "Do I owe quarterly estimated taxes?",
  "What changed in the tax code this year?",
  "How do I know if my business needs an accountant?",
];

const whyUsPoints = [
  {
    title: "We make the complex simple",
    description:
      "No intimidating jargon — just clear explanations from a licensed CPA who takes the time to make sure you actually understand your tax situation.",
  },
  {
    title: "We never rush your appointment",
    description:
      "When your questions run long, so does the meeting. Mark and Richard are known for staying as late as needed to get things right.",
  },
  {
    title: "We bring real expertise",
    description:
      "From commission-based income to first-time complex filings, our CPAs have deep, practical knowledge across a wide range of tax situations.",
  },
  {
    title: "We treat every client as an individual",
    description:
      "You're not a number here. Every appointment is a real conversation with an experienced CPA who learns your situation before offering guidance.",
  },
];

const services = [
  {
    title: "Individual Tax Preparation",
    description:
      "Personalized federal and state tax filing for individuals, including complex income situations like commission-based earnings, investments, and life changes.",
    tags: [
      "Federal filing",
      "State filing",
      'Commission income',
      "Investment income",
      "Life change tax impact",
    ],
    icon: FileText,
  },
  {
    title: "Complex Year Tax Consulting",
    description:
      "In-depth consultations for clients facing unusually complicated tax years — major life events, new income streams, or first-time filing needs.",
    tags: [
      "Major life events",
      "New income streams",
      'First-time filers',
      "Multi-source income",
      "Year-end review",
    ],
    icon: Layers,
  },
  {
    title: "Small Business & Self-Employed Tax",
    description:
      "Tax strategy and preparation for self-employed individuals, freelancers, and commission-based professionals navigating variable income structures.",
    tags: [
      "Self-employment tax",
      "Freelancer returns",
      'Variable income',
      "Deduction planning",
      "Estimated taxes",
    ],
    icon: Briefcase,
  },
  {
    title: "Tax Planning & Advisory",
    description:
      "Proactive planning sessions to help clients understand their tax position throughout the year, not just at filing time.",
    tags: [
      "Year-round planning",
      "Tax positioning",
      'Quarterly estimates',
      "Strategy sessions",
      "Liability reduction",
    ],
    icon: Calendar,
  },
  {
    title: "CPA Consultations",
    description:
      "One-on-one appointments with a licensed CPA to answer questions, review financials, and provide expert guidance in plain language.",
    tags: [
      "Licensed CPA",
      "One-on-one sessions",
      "Plain-language advice",
      'Financial review',
      "Q&A appointments",
    ],
    icon: UserCheck,
  },
  {
    title: "Business Accounting Services",
    description:
      "Ongoing bookkeeping, financial review, and accounting support for small and mid-size businesses in the Portland area.",
    tags: [
      "Bookkeeping",
      "Financial review",
      "Small business support",
      'Monthly accounting',
      "Portland businesses",
    ],
    icon: BarChart3,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Give us a call",
    description:
      "Reach out at (503) 287-4992 during business hours to check availability and schedule your appointment — especially important during peak tax season.",
  },
  {
    number: "02",
    title: "Tell us your situation",
    description:
      "Come in and talk through your tax picture. Whether it's simple or complex, Mark or Richard will listen carefully before offering any guidance.",
  },
  {
    number: "03",
    title: "We work through it together",
    description:
      "Your CPA will walk you through every detail at your pace — no rushing, no jargon, just clear explanations until everything makes sense.",
  },
  {
    number: "04",
    title: "Leave with clarity",
    description:
      "Walk out understanding exactly where you stand, what was filed, and what to keep in mind for next year. We're here when you need us again.",
  },
];

const stats = [
  {
    category: "Client Rating",
    value: 4.4,
    prefix: "",
    suffix: "★",
    unit: "Average customer rating",
    details: ["10+ verified reviews", "Word-of-mouth driven reputation"],
  },
  {
    category: "Staff Expertise",
    value: 2,
    prefix: "",
    suffix: "",
    unit: "Named CPAs on staff",
    details: ["Mark & Richard on every case", "Deep individual attention"],
  },
  {
    category: "Availability",
    value: 5,
    prefix: "",
    suffix: "-Day",
    unit: "Weekly office hours",
    details: ["Mon–Fri, 8:30 AM–5:00 PM", "Appointments run as long as needed"],
  },
];

const comparisonRows = [
  {
    category: "Who you meet with",
    without: "Seasonal employee with basic training",
    withUs: "Licensed CPA with deep expertise",
  },
  {
    category: "Time given to your appointment",
    without: "Rushed and on the clock",
    withUs: "As long as your questions take",
  },
  {
    category: "Complex tax situations",
    without: "Referred elsewhere or handled poorly",
    withUs: "Handled confidently with real expertise",
  },
  {
    category: "Explanation of your taxes",
    without: "Confusing jargon and vague answers",
    withUs: "Plain language until you truly understand",
  },
  {
    category: "Commission or variable income",
    without: "Generic approach that misses deductions",
    withUs: "Tailored strategy for your income type",
  },
  {
    category: "Relationship with your CPA",
    without: "Different person every year",
    withUs: "Consistent, trusted advisors who know you",
  },
  {
    category: "After your appointment",
    without: "On your own with lingering questions",
    withUs: "Clear next steps and an open door",
  },
];

const testimonials = [
  {
    name: "Hunter Jones",
    company: "",
    quote:
      "I was 45 minutes late to the appointment and took Mark's time until about 5:30–5:45pm — he was prepared to take as much time as necessary to answer my questions and help me prepare my taxes. I'm a commission salesman so my situation is complex. Great experience.",
    highlight:
      "...he was prepared to take as much time as necessary to answer my questions...",
  },
  {
    name: "Amy Bangsund",
    role: "",
    company: "",
    quote:
      "Richard is so knowledgeable and helpful. We have never needed tax help before, but we had a complex year. We are so glad we were able to sit with Richard and benefit from his expertise.",
    highlight:
      "...we were so glad we were able to sit with Richard and benefit from his expertise...",
  },
  {
    name: "Keegan Elliott",
    company: "",
    quote:
      "They do not appear to have a website, which is curious. But the people inside more than make up for it.",
    highlight: "...the people inside more than make up for it...",
  },
  {
    name: "Portland Client",
    company: "",
    quote:
      "When you walk in with a complicated situation and walk out actually understanding it, that's the mark of a genuinely skilled CPA. That's exactly what you get at Liebert & Liebert.",
    highlight:
      "...walk in with a complicated situation and walk out actually understanding it...",
  },
];

const faqs = [
  {
    question: "Do you work with clients who have complicated or unusual tax situations?",
    answer:
      "Absolutely. Liebert & Liebert regularly works with commission-based salespeople, clients experiencing major financial life changes, and first-time filers navigating complex years. Both Mark and Richard are experienced in making complicated situations understandable.",
  },
  {
    question: "What can I expect from my first appointment?",
    answer:
      "A real conversation with a knowledgeable CPA who will take the time to understand your situation. Clients consistently note that Mark and Richard never make them feel rushed — appointments run as long as they need to, even past business hours when necessary.",
  },
  {
    question: "Are you currently accepting new clients?",
    answer:
      "Availability for new clients can be limited during peak tax season. One caller in January 2026 was told new clients weren't being taken at that time. It's best to call ahead at (503) 287-4992 to check current availability and schedule early.",
  },
  {
    question: "Do you have a website where I can learn more or book an appointment?",
    answer:
      "At this time, Liebert & Liebert does not have a website. The best way to connect is to call the office directly at (503) 287-4992 during business hours, Monday through Friday, 8:30 AM to 5:00 PM.",
  },
  {
    question: "What makes Liebert & Liebert different from a large tax chain like H&R Block?",
    answer:
      "The difference is time and expertise. You're meeting with a licensed CPA — not a seasonal employee — who will sit with you, learn your situation, and explain things in plain language. Clients who've had complex situations specifically sought out Liebert & Liebert for the depth of knowledge and personal attention.",
  },
  {
    question: "What are your office hours and where are you located?",
    answer:
      "The office is open Monday through Friday, 8:30 AM to 5:00 PM, and is located at 4300 NE Broadway, Suite 3, Portland, Oregon. Parking is available on-site. The office is closed on weekends.",
  },
];

const brandStats = [
  { value: "4.4★", label: "Average client rating on Google" },
  { value: "10+", label: "Verified client reviews" },
  { value: "2", label: "Licensed CPAs on staff" },
  { value: "5-Day", label: "Weekly availability, Mon–Fri" },
  { value: "8:30AM", label: "Doors open every weekday" },
  { value: "100%", label: "Personal CPA attention every visit" },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────




// ─── PAGE ────────────────────────────────────────────────────────────────────

function TickerBar() {
  return (
    <div className="bg-[var(--brand-accent)] py-3 overflow-hidden">
      <div className="ticker-left flex gap-8 w-max">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
          (item, i) => (
            <span
              key={i}
              className="text-white text-sm font-medium whitespace-nowrap flex items-center gap-3"
            >
              <Star className="w-3 h-3 fill-white" />
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(services.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="pt-20 pb-8 px-6 lg:px-12 bg-[var(--brand-bg-dark)]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight max-w-3xl">
              No running around for different experts.{" "}
              <span className="text-[var(--brand-accent)]">
                We handle it all
              </span>
              , so you can focus on what you do best.
            </h2>
          </div>
        </div>

        {/* Cards area */}
        <div className="flex-1 bg-[var(--brand-bg-dark)] px-6 lg:px-12 pb-12 overflow-hidden">
          <div className="max-w-6xl mx-auto h-full relative">
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                total={services.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function ServiceCard({
  service,
  index,
  total,
  scrollProgress,
}: {
  service: (typeof services)[0];
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segmentSize = 1 / (total + 1);
  const startShow = index * segmentSize;
  const endShow = (index + 1) * segmentSize;
  const startHide = endShow;
  const endHide = (index + 2) * segmentSize;

  const y = useTransform(scrollProgress, [startShow, endShow], [300, 0]);
  const opacity = useTransform(
    scrollProgress,
    [startShow, startShow + segmentSize * 0.3, startHide, Math.min(endHide, 1)],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const scale = useTransform(
    scrollProgress,
    [startHide, endHide],
    [1, index === total - 1 ? 1 : 0.92],
  );

  const Icon = service.icon;

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ y, opacity, scale, zIndex: index }}
    >
      <div className="w-full bg-[#1E2B3A] rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-[var(--brand-accent)]/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-[var(--brand-accent)]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold text-white mb-4">
            {service.title}
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            {service.description}
          </p>
          <button className="inline-flex items-center gap-2 text-[var(--brand-accent)] text-sm font-semibold hover:gap-3 transition-all">
            Learn more <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
function GlobeProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(
      Math.floor(latest * processSteps.length),
      processSteps.length - 1,
    );
    setActiveStep(Math.max(0, step));
  });

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center bg-[var(--brand-bg-dark)] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: steps */}
          <div>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Our Process
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight mb-12">
              Making{" "}
              <span className="italic text-[var(--brand-accent-green)]">
                business magic
              </span>{" "}
              in four moves
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className={`p-6 rounded-2xl transition-all duration-500 ${
                    activeStep === i
                      ? "bg-white/5 border border-white/10"
                      : "opacity-40"
                  }`}
                  animate={{ opacity: activeStep === i ? 1 : 0.4 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[var(--brand-accent)] font-mono text-sm font-bold mt-1">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {activeStep === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-white/50 text-sm leading-relaxed"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: globe */}
          <div className="hidden lg:flex items-center justify-center relative">
            <motion.div
              className="w-80 h-80 rounded-full globe-glow relative"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #2A4A2A, #111112 70%)",
                border: "1px solid rgba(130, 255, 40, 0.2)",
              }}
              animate={{ rotate: activeStep * 90 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Grid lines */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full border-t border-[var(--brand-accent-green)]"
                    style={{ top: `${(i + 1) * 16.6}%` }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full border-l border-[var(--brand-accent-green)]"
                    style={{ left: `${(i + 1) * 16.6}%` }}
                  />
                ))}
              </div>

              {/* Step indicators on globe */}
              {processSteps.map((step, i) => {
                const angle = (i * 90 - 45) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={step.number}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      activeStep === i
                        ? "bg-[var(--brand-accent-green)] text-black scale-125"
                        : "bg-white/10 text-white/50"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - 20px)`,
                      top: `calc(50% + ${y}px - 20px)`,
                    }}
                  >
                    {step.number}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="grid grid-cols-[1fr_auto] gap-8 py-8 border-b border-white/10 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="text-[var(--brand-accent)] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
            Question
          </p>
          <h3 className="text-white text-lg md:text-xl font-medium">
            {faq.question}
          </h3>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--brand-accent)] text-[10px] uppercase tracking-[0.3em] font-bold mb-2 mt-6">
                  Answer
                </p>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center self-start mt-6 hover:bg-white/5 transition-colors">
          {open ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (v: number) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`,
  );
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: string) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export default function BusinessPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg-dark)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-2xl font-bold text-white tracking-tight"
          >
            Liebert &amp; Liebert
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="tel:+15032874992"
            className="bg-[var(--brand-accent)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            Call Now
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col bg-[var(--brand-bg-dark)] pt-20 overflow-hidden">
        {/* Background photo + overlay */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Ticker bar */}
        <div className="relative z-10 mt-8">
          <TickerBar />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              className="text-[clamp(3rem,8vw,6.5rem)] font-[family-name:var(--font-display)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Your taxes, explained —{" "}
              <span className="italic text-[var(--brand-accent)]">
                no rush, no jargon
              </span>
            </motion.h1>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
              >
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--brand-bg-dark)] to-transparent z-[5]" />
      </section>

      {/* ── ROADBLOCKS — Rotating Question Rows ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-[family-name:var(--font-display)] font-bold leading-tight">
              Removing the{" "}
              <span className="italic text-[var(--brand-accent)]">
                confusion
              </span>{" "}
              from your taxes
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto leading-relaxed">
              Tax season brings uncertainty and confusing forms. Mark and
              Richard sit with you until it all makes sense.
            </p>
          </motion.div>
        </div>

        {/* Scrolling question rows */}
        <div className="space-y-4 mb-20">
          {/* Row 1 - left */}
          <div className="overflow-hidden">
            <div className="ticker-left flex gap-4 w-max">
              {[
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 - right */}
          <div className="overflow-hidden">
            <div className="ticker-right flex gap-4 w-max">
              {[
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
          {/* Row 3 - left */}
          <div className="overflow-hidden">
            <div
              className="ticker-left flex gap-4 w-max"
              style={{ animationDuration: "30s" }}
            >
              {[
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why us cards */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
          {whyUsPoints.map((point, i) => (
            <motion.div
              key={point.title}
              className="bg-[var(--brand-bg-alt)] rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{point.title}</h3>
              <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 lg:py-32 bg-[var(--brand-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              About Our Company
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight max-w-3xl">
              We&apos;re <span className="italic">Liebert &amp; Liebert CPA</span> —
              your patient, personal tax advisors in Portland.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] max-w-2xl leading-relaxed text-lg">
              With{" "}
              <strong className="text-[var(--brand-text)]">
                2 licensed CPAs
              </strong>
              , a{" "}
              <strong className="text-[var(--brand-text)]">
                4.4-star rating
              </strong>{" "}
              on Google, and a reputation built on{" "}
              <strong className="text-[var(--brand-text)]">word of mouth</strong>
              , we take the time other firms won&apos;t.
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "We adapt to you",
                desc: "No cookie-cutter tax prep — we learn your situation before offering guidance.",
              },
              {
                title: "We take the time",
                desc: "Mark stayed until 5:45 PM for a late client. Your questions always get answered.",
              },
              {
                title: "We keep it human",
                desc: "Taxes can be intimidating, but we explain everything in plain language.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.p
            {...fadeUp}
            className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center"
          >
            Liebert &amp; Liebert By The Numbers
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {brandStats.map((stat, i) => (
              <motion.div
                key={stat.value}
                className="text-center py-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[var(--brand-text)]">
                  {stat.value}
                </p>
                <p className="text-[var(--brand-muted)] text-sm mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — Sticky Card Scroll ── */}
      <section id="services">
        <StickyServices />
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-[var(--brand-bg-dark)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Industries
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              Serving clients across all walks of life and business
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "Commission Salespeople",
              "Small Business Owners",
              "Self-Employed & Freelancers",
              "First-Time Filers",
              "Investors & Portfolios",
              "Real Estate Professionals",
              "Multi-Income Households",
              "Retirees & Estate Planning",
              "Nonprofit Organizations",
              "Restaurant & Hospitality",
              "Healthcare Providers",
              "Construction & Trades",
            ].map((industry) => (
              <span
                key={industry}
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/10 transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS — Globe ── */}
      <section id="process">
        <GlobeProcess />
      </section>

      {/* ── NUMBERS ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              By the Numbers
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight">
              Numbers don&apos;t lie — and ours say{" "}
              <span className="italic text-[var(--brand-accent)]">
                you&apos;re in good hands.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.category}
                className="bg-[var(--brand-bg-alt)] rounded-3xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  {stat.category}
                </p>
                <p className="text-6xl md:text-7xl font-bold text-[var(--brand-text)] mb-3">
                  <Counter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="tabular-nums"
                  />
                </p>
                <p className="text-lg font-medium text-[var(--brand-text)] mb-6">
                  {stat.unit}
                </p>
                <div className="space-y-2">
                  {stat.details.map((detail) => (
                    <p
                      key={detail}
                      className="text-[var(--brand-muted)] text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE — With Us vs Without Us ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg-dark)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              The Difference We Make
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              <span className="italic">Side-by-side,</span>{" "}
              <span className="text-[var(--brand-accent)]">
                the choice is easy
              </span>
            </h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto">
              Two ways to start your business. One gets you launched faster,
              smarter, and stress-free.
            </p>
          </motion.div>

          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT US column */}
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-8">
                ✕ Without us
              </h3>
              <div className="space-y-6">
                {comparisonRows.map((row) => (
                  <div key={row.category}>
                    <p className="text-white font-semibold text-sm mb-1">
                      {row.category}
                    </p>
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/40 text-sm">{row.without}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* WITH US column */}
            <motion.div
              className="rounded-3xl border border-[var(--brand-accent-green)]/20 bg-[var(--brand-accent-green)]/[0.04] p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="text-[var(--brand-accent-green)] text-sm font-semibold uppercase tracking-wider mb-8">
                ✓ With us
              </h3>
              <div className="space-y-6">
                {comparisonRows.map((row) => (
                  <div key={row.category}>
                    <p className="text-white font-semibold text-sm mb-1">
                      {row.category}
                    </p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--brand-accent-green)] flex-shrink-0 mt-0.5" />
                      <p className="text-white/80 text-sm">{row.withUs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — Accordion Rows ── */}
      <section
        id="testimonials"
        className="py-24 lg:py-32 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight max-w-3xl">
              From &ldquo;can I really do this?&rdquo; to{" "}
              <span className="italic text-[var(--brand-accent)]">
                &ldquo;I can&apos;t believe it&apos;s real!&rdquo;
              </span>
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-[var(--brand-border,rgba(0,0,0,0.08))]">
            {testimonials.map((t, i) => {
              const isOpen = activeTestimonial === i;
              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {/* Collapsed row — always visible */}
                  <button
                    onClick={() => setActiveTestimonial(isOpen ? -1 : i)}
                    className="w-full text-left py-6 group"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-300 ${
                            isOpen
                              ? "bg-[var(--brand-accent)] text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[var(--brand-text)]">
                            {t.name}
                          </p>
                          <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wider">
                            {t.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="hidden md:block text-sm text-[var(--brand-muted)] italic truncate max-w-xs">
                          &ldquo;{t.highlight}&rdquo;
                        </p>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center flex-shrink-0"
                        >
                          <Plus className="w-4 h-4 text-[var(--brand-text)]" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 grid md:grid-cols-[1fr_1fr] gap-8">
                          {/* Left: full quote */}
                          <div className="bg-[var(--brand-bg-dark)] rounded-2xl p-8 md:p-10 flex flex-col justify-between">
                            <div>
                              <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, s) => (
                                  <Star
                                    key={s}
                                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                                  />
                                ))}
                              </div>
                              <h3 className="text-xl md:text-2xl font-[family-name:var(--font-display)] font-bold text-white/80 italic leading-relaxed mb-6">
                                &ldquo;{t.highlight}&rdquo;
                              </h3>
                              <p className="text-white/50 leading-relaxed">
                                &ldquo;{t.quote}&rdquo;
                              </p>
                            </div>
                            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                              <div className="w-12 h-12 rounded-full bg-[var(--brand-accent)] flex items-center justify-center text-white font-bold text-sm">
                                {initials}
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm">
                                  {t.name}
                                </p>
                                <p className="text-white/40 text-xs uppercase tracking-wider">
                                  {t.company}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Right: decorative panel */}
                          <div className="bg-[var(--brand-bg-dark)] rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px]">
                            <div
                              className="absolute inset-0 opacity-[0.03]"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                backgroundSize: "24px 24px",
                              }}
                            />
                            <div className="relative z-10 text-center">
                              <div className="w-20 h-20 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center mx-auto mb-6">
                                <div className="w-14 h-14 rounded-full bg-[var(--brand-accent)] flex items-center justify-center text-white font-bold text-xl">
                                  {initials}
                                </div>
                              </div>
                              <p className="text-white font-semibold">
                                {t.name}
                              </p>
                              <p className="text-white/40 text-sm">
                                {t.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ — Redesigned ── */}
      <section id="faq" className="py-24 lg:py-32 bg-[var(--brand-bg-dark)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Frequently Asked Questions
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              We get asked this all the time
            </h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + CONTACT ── */}
      <section id="contact" className="py-24 lg:py-32 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] max-w-lg mx-auto text-lg leading-relaxed">
              Sometimes the hardest part is reaching out — but once you do,
              we&apos;ll make the rest easy.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition mt-8"
            >
              Let&apos;s talk today <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                label: "Phone",
                values: ["(217) 555-0134", "(217) 555-0142"],
              },
              {
                icon: Mail,
                label: "Email",
                values: ["info@liebertcpa.com", "tax@liebertcpa.com"],
              },
              {
                icon: MapPin,
                label: "Address",
                values: ["123 Main Street, Suite 200", "Austin, TX 78701"],
              },
              {
                icon: Clock,
                label: "Hours",
                values: ["Mon to Sat: 9am - 8:30pm", "Sun: Closed"],
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-6"
                {...fadeUp}
              >
                <item.icon className="w-5 h-5 text-[var(--brand-accent)] mb-4" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-3">
                  {item.label}
                </p>
                {item.values.map((v) => (
                  <p key={v} className="text-sm text-[var(--brand-text)]">
                    {v}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER — Big Logo ── */}
      <footer className="relative bg-[var(--brand-bg-dark)] pt-20 pb-12 overflow-hidden">
        {/* Giant background logo text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-[family-name:var(--font-display)] font-black text-white/[0.03] tracking-tighter whitespace-nowrap">
            Liebert &amp; Liebert
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white tracking-tight">
                Liebert &amp; Liebert CPA
              </span>
              <p className="mt-4 text-white/40 text-sm leading-relaxed">
                Trusted tax and accounting services in Portland, OR.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Pages
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Services
              </h4>
              <div className="space-y-3">
                {services.slice(0, 5).map((s) => (
                  <p key={s.title} className="text-white/40 text-sm">
                    {s.title}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Socials
              </h4>
              <div className="space-y-3">
                {["Facebook", "LinkedIn", "YouTube", "X / Twitter"].map(
                  (social) => (
                    <p
                      key={social}
                      className="text-white/40 text-sm hover:text-white transition-colors cursor-pointer"
                    >
                      {social}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; 2026 Liebert & Liebert CPA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-white/30 text-sm hover:text-white/50 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-white/30 text-sm hover:text-white/50 transition-colors cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </div>

        {/* Large watermark text at bottom */}
        <div className="relative z-10 mt-12 flex justify-center">
          <span className="text-[clamp(5rem,15vw,12rem)] font-[family-name:var(--font-display)] font-black text-white/[0.04] tracking-tight leading-none">
            L&amp;L CPA
          </span>
        </div>
      </footer>
    </>
  );
}
