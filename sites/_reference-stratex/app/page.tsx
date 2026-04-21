// REFERENCE: STRATEX — consulting agency, dark teal hero with fade-in, partner logo hover marquee,
// comparison cards, 3D service card carousel, proven process layout, rotating team image bar,
// stats section, pricing, FAQ accordion, contact form
// SOURCE: https://stratex.framer.website/
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Star,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  ChevronDown,
  MessageSquare,
  Target,
  BarChart3,
  Zap,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- DATA ---

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#how-it-works" },
];

const partnerLogos = [
  "Accenture",
  "McKinsey",
  "Deloitte",
  "KPMG",
  "PwC",
  "Bain",
];

const comparisonOther = [
  {
    title: "Generic Strategies",
    desc: "One-size-fits-all solutions that lack personalized insights and flexibility.",
  },
  {
    title: "Limited Guidance",
    desc: "Clients are left to navigate complex challenges with minimal expert support.",
  },
  {
    title: "Hidden Fees",
    desc: "Unexpected costs and additional charges that inflate your total investment.",
  },
];

const comparisonUs = [
  {
    title: "Tailored Consulting",
    desc: "Custom strategies designed to fit your unique business needs and goals.",
  },
  {
    title: "Dedicated Support",
    desc: "Expert guidance and hands-on assistance at every stage of your journey.",
  },
  {
    title: "Transparent Pricing",
    desc: "No surprises — clear pricing so you pay only for what you need.",
  },
];

const services = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    desc: "Gain a clear roadmap for growth with tailored strategies that align with your goals.",
  },
  {
    icon: TrendingUp,
    title: "Operational Efficiency",
    desc: "Streamline workflows and optimize processes to boost productivity and reduce costs.",
  },
  {
    icon: BarChart3,
    title: "Market Research & Analysis",
    desc: "Make informed decisions with in-depth market insights and competitor analysis.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    desc: "Leverage cutting-edge technology to modernize your business and stay ahead.",
  },
];

const features = [
  {
    icon: MessageSquare,
    title: "Unlimited Consultations",
    desc: "Schedule as many strategy sessions as needed for your business.",
  },
  {
    icon: Target,
    title: "Tailored Solutions",
    desc: "Get customized strategies designed to align with your unique goals.",
  },
  {
    icon: Lightbulb,
    title: "Expert Insights",
    desc: "Leverage industry-leading expertise to drive informed decisions.",
  },
  {
    icon: BarChart3,
    title: "Data Strategies",
    desc: "Make confident moves with insights backed by research and analytics.",
  },
  {
    icon: Shield,
    title: "Ongoing Support",
    desc: "Stay ahead with continuous guidance and recommendations.",
  },
  {
    icon: Zap,
    title: "Seamless Execution",
    desc: "From planning to implementation, we ensure a smooth process.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Simple Booking",
    desc: "Effortlessly schedule a consultation to discuss your business needs and challenges. We streamline the process to get started quickly.",
    icon: Clock,
  },
  {
    number: "02",
    title: "Tailored Strategy",
    desc: "We analyze your goals and create a customized strategy designed to drive measurable success for your business needs and exploring more ideas.",
    icon: Target,
  },
  {
    number: "03",
    title: "Continuous Support",
    desc: "From implementation to optimization, we provide ongoing guidance and adjustments to ensure long-term growth for you.",
    icon: Shield,
  },
];

const stats = [
  { value: "$7M+", label: "Revenue", position: "left-top" },
  { value: "72%", label: "Growth", position: "left-mid" },
  { value: "65%", label: "Skills", position: "left-bottom" },
  { value: "78%", label: "Impact", position: "right-top" },
  { value: "1k", label: "Designers", position: "right-mid" },
  { value: "30+", label: "Consultants", position: "right-bottom" },
];

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Lead Consultant",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=520&q=80&fit=crop",
  },
  {
    name: "James Carter",
    role: "Business Strategist",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=520&q=80&fit=crop",
  },
  {
    name: "Emily Ross",
    role: "Efficiency Specialist",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=520&q=80&fit=crop",
  },
  {
    name: "Daniel Lee",
    role: "Financial Advisor",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=520&q=80&fit=crop",
  },
];

const pricingPlans = [
  {
    name: "Standard",
    price: "$99",
    desc: "Perfect for small teams looking to streamline consulting processes.",
    features: [
      "Personalized strategy sessions",
      "Essential business analytics",
      "Core reporting tools",
      "Up to 5 team members",
      "Dedicated email support",
      "Customizable workflow insights",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "$299",
    desc: "Designed for growing firms needing deeper insights and support.",
    features: [
      "Unlimited strategy consultations",
      "Advanced business analytics",
      "Comprehensive reporting suite",
      "Up to 10 team members",
      "Priority email & chat support",
      "Custom integration options",
    ],
    popular: true,
  },
];

const faqItems = [
  {
    q: "How does your consulting process work?",
    a: "We begin with a discovery call to understand your goals, then develop a tailored strategy. Our team provides ongoing support through implementation and optimization phases.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work across technology, finance, healthcare, retail, and professional services. Our frameworks adapt to any industry context.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most clients see measurable improvements within 60-90 days. Complex transformations may take 6-12 months for full impact.",
  },
  {
    q: "Do you offer one-time consultations?",
    a: "Yes, we offer single strategy sessions for businesses that need targeted guidance on specific challenges.",
  },
  {
    q: "Can small businesses afford your services?",
    a: "Absolutely. Our Standard plan is designed specifically for small teams, with flexible pricing that scales with your needs.",
  },
  {
    q: "How do I get started?",
    a: "Simply fill out our contact form or schedule a free discovery call. We will match you with the right consultant within 24 hours.",
  },
];

const businessContact = {
  email: "hello@stratex.com",
  phone: "+1 (555) 234-5678",
  address: "Philadelphia, PA",
};

// --- ANIMATIONS ---

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

// --- COMPONENTS ---

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-medium text-[var(--brand-text)]">
          {item.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--brand-muted)] transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[var(--brand-muted)] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const allServices = [...services, ...services, ...services];

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative">
      <div className="overflow-hidden py-8" style={{ perspective: 1200 }}>
        <div className="relative flex items-center justify-center h-[400px] md:h-[460px]">
          {services.map((service, i) => {
            const offset =
              (i - activeIndex + services.length) % services.length;
            // Map offset to position: 0=center, 1=right, 2=far-right/back, 3=left
            const pos =
              offset === 0
                ? 0
                : offset === 1
                  ? 1
                  : offset === services.length - 1
                    ? -1
                    : offset === 2
                      ? 2
                      : -2;
            const isActive = pos === 0;

            const xOffset = pos * 240;
            const zOffset = isActive ? 0 : Math.abs(pos) === 1 ? -120 : -220;
            const rotateY = pos < 0 ? 25 : pos > 0 ? -25 : 0;
            const scale = isActive ? 1 : Math.abs(pos) === 1 ? 0.82 : 0.7;
            const opacity = isActive ? 1 : Math.abs(pos) === 1 ? 0.5 : 0.25;
            const zIndex = isActive ? 30 : Math.abs(pos) === 1 ? 20 : 10;

            return (
              <motion.div
                key={`${service.title}-${i}`}
                className="absolute w-[280px] md:w-[320px] cursor-pointer"
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setActiveIndex(i)}
                style={{ zIndex, transformStyle: "preserve-3d" }}
              >
                <div
                  className={`relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden ${isActive ? "shadow-2xl" : "shadow-lg"}`}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] to-[#1a2a26]" />
                  {/* Overlay pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Carousel controls */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function TeamCarousel() {
  const [teamIndex, setTeamIndex] = useState(0);
  const allMembers = [...teamMembers, ...teamMembers, ...teamMembers];
  const cardWidth = 280;
  const gap = 24;

  const teamNext = useCallback(() => {
    setTeamIndex((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const teamPrev = useCallback(() => {
    setTeamIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  }, []);

  // Auto-advance with pause
  useEffect(() => {
    const interval = setInterval(teamNext, 2000);
    return () => clearInterval(interval);
  }, [teamNext]);

  return (
    <div className="relative px-6 lg:px-12">
      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[var(--brand-bg-alt)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[var(--brand-bg-alt)] to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden max-w-6xl mx-auto">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x: -(teamIndex * (cardWidth + gap)) }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {allMembers.map((member, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: cardWidth }}>
              <div className="relative h-[340px] rounded-2xl overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <p className="text-sm font-semibold text-[var(--brand-text)]">
                {member.name}
              </p>
              <p className="text-xs text-[var(--brand-muted)]">{member.role}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrow controls */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={teamPrev}
          className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center hover:opacity-90 transition"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={teamNext}
          className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center hover:opacity-90 transition"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// --- PAGE ---

export default function StratexPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* -- NAVBAR -- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-xl font-normal tracking-tight text-[var(--brand-text)] flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-md bg-[var(--brand-primary)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            Stratex
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* -- HERO -- */}
      <section className="pt-24 pb-0 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-[var(--brand-primary)] min-h-[480px] md:min-h-[540px] flex items-center"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16 w-full">
              {/* Left content */}
              <div className="flex flex-col justify-center">
                <motion.div
                  className="inline-flex items-center gap-1.5 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm ml-1">
                    Rated 4.9/5
                  </span>
                </motion.div>

                <motion.h1
                  className="text-[clamp(2.25rem,5vw,3.5rem)] font-[family-name:var(--font-display)] leading-[1.1] text-white mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Expert consulting that drives real growth
                </motion.h1>

                <motion.p
                  className="text-white/60 text-base leading-relaxed mb-8 max-w-md"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Elevate your business with expert insights, tailored
                  strategies, and unwavering support designed for growth.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition"
                  >
                    What we do
                  </a>
                </motion.div>
              </div>

              {/* Right side placeholder image area */}
              <motion.div
                className="hidden md:flex items-center justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div className="w-full h-[380px] rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/15 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="w-8 h-8 text-white/60" />
                      </div>
                      <p className="text-white/40 text-sm">Strategy & Growth</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -- PARTNER LOGOS -- */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[var(--brand-muted)] text-sm mb-6">
            We&apos;ve partnered with:
          </p>
          <div className="overflow-hidden">
            <div className="logo-marquee flex gap-12 w-max items-center">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map(
                (logo, i) => (
                  <div key={i} className="flex-shrink-0 group cursor-pointer">
                    <span className="text-lg font-semibold text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                      {logo}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -- WHY CHOOSE US (Comparison) -- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Why choose us
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Expert consulting tailored to your business success
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Other Firms */}
            <motion.div
              className="bg-[var(--brand-bg-alt)] rounded-2xl p-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="text-sm font-semibold text-[var(--brand-muted)] uppercase tracking-wider mb-6">
                Other Firms
              </h3>
              <div className="space-y-5">
                {comparisonOther.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--brand-text)] mb-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--brand-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* With Stratex */}
            <motion.div
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
            >
              <h3 className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wider mb-6">
                With Stratex
              </h3>
              <div className="space-y-5">
                {comparisonUs.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--brand-primary)] flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--brand-text)] mb-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--brand-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- SERVICES CAROUSEL (3D Effect) -- */}
      <section
        id="services"
        className="py-20 lg:py-28 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Services
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Reliable expertise to drive your greatest success
            </h2>
          </motion.div>

          <ServiceCarousel />
        </div>
      </section>

      {/* -- TESTIMONIAL -- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex gap-0.5 justify-center mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-sm text-[var(--brand-muted)] ml-2">
                Rated 4.9/5
              </span>
            </div>
            <blockquote className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-[family-name:var(--font-display)] leading-snug mb-10">
              &ldquo;Stratex revolutionized our customer understanding, boosting
              retention like never before.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--brand-muted)]" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[var(--brand-text)]">
                  Muzamal Hussain
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                    High conversion
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--brand-primary)]" />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                    2x sales
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -- FEATURES GRID -- */}
      <section
        id="features"
        className="py-20 lg:py-28 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Features
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Key benefits that set us apart
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--brand-muted)] text-xs leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section id="pricing" className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Pricing
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Flexible pricing tailored to your business needs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${plan.popular ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--brand-bg-alt)]"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {plan.popular && (
                  <span className="absolute top-6 right-6 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-[family-name:var(--font-display)] mb-2">
                  {plan.name}
                </h3>
                <p
                  className={`text-xs mb-5 ${plan.popular ? "text-white/60" : "text-[var(--brand-muted)]"}`}
                >
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-[family-name:var(--font-display)]">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.popular ? "text-white/60" : "text-[var(--brand-muted)]"}`}
                  >
                    /Month
                  </span>
                </div>
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition mb-6 ${
                    plan.popular
                      ? "bg-white text-[var(--brand-primary)] hover:bg-white/90"
                      : "bg-[var(--brand-primary)] text-white hover:opacity-90"
                  }`}
                >
                  {plan.popular ? "Get Started" : "Request Consultation"}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <Check
                        className={`w-3.5 h-3.5 flex-shrink-0 ${plan.popular ? "text-white/60" : "text-[var(--brand-primary)]"}`}
                      />
                      <span
                        className={`text-sm ${plan.popular ? "text-white/80" : "text-[var(--brand-muted)]"}`}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS (Proven Process) -- */}
      <section
        id="how-it-works"
        className="py-20 lg:py-28 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              How it works
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight mb-6">
              A proven process to achieve your biggest goals
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className="relative md:grid md:grid-cols-2 md:gap-16 mb-20 last:mb-0"
                >
                  {/* Timeline number dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-8 z-10 hidden md:flex w-10 h-10 rounded-full bg-white border-2 border-gray-200 items-center justify-center">
                    <span className="text-sm font-semibold text-[var(--brand-text)]">
                      {i + 1}
                    </span>
                  </div>

                  {/* Image side */}
                  <motion.div
                    className={`${isEven ? "md:order-1" : "md:order-2"} mb-6 md:mb-0`}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Text side */}
                  <motion.div
                    className={`${isEven ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12 md:text-right"} flex flex-col justify-center`}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.1,
                    }}
                  >
                    <span className="text-sm font-semibold text-[var(--brand-primary)] mb-2 md:hidden">
                      Step {i + 1}
                    </span>
                    <h3 className="text-2xl font-[family-name:var(--font-display)] mb-3">
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm text-[var(--brand-muted)] leading-relaxed mb-4 max-w-md ${isEven ? "" : "md:ml-auto"}`}
                    >
                      {step.desc}
                    </p>
                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-1.5 text-[var(--brand-primary)] text-sm font-medium hover:underline ${isEven ? "" : "md:justify-end"}`}
                    >
                      Discover More <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- IMPACT / STATS -- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Impact
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight mb-4">
              Real results that drive lasting impact
            </h2>
            <p className="text-sm text-[var(--brand-muted)] max-w-lg mx-auto leading-relaxed">
              We deliver tailored strategies, innovative solutions, and
              dedicated support to drive lasting growth for every client.
            </p>
          </motion.div>

          {/* Central image with floating stat pills */}
          <div className="relative max-w-2xl mx-auto">
            {/* Central portrait image */}
            <motion.div
              className="relative mx-auto w-[280px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
              {...fadeUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80&fit=crop"
                alt="Business professional"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating stat pills - left side */}
            {stats.slice(0, 3).map((stat, i) => (
              <motion.div
                key={stat.label}
                className="absolute hidden md:flex items-center gap-2.5 bg-white rounded-full pl-3 pr-5 py-2 shadow-lg border border-gray-100"
                style={{
                  left: i === 1 ? "-10%" : "2%",
                  top: `${20 + i * 28}%`,
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <span className="flex items-center justify-center min-w-10 h-10 px-2 rounded-full bg-[var(--brand-primary)] text-white text-[11px] font-bold whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-[var(--brand-text)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* Floating stat pills - right side */}
            {stats.slice(3).map((stat, i) => (
              <motion.div
                key={stat.label}
                className="absolute hidden md:flex items-center gap-2.5 bg-white rounded-full pl-3 pr-5 py-2 shadow-lg border border-gray-100"
                style={{
                  right: i === 1 ? "-10%" : "2%",
                  top: `${20 + i * 28}%`,
                }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <span className="flex items-center justify-center min-w-10 h-10 px-2 rounded-full bg-[var(--brand-primary)] text-white text-[11px] font-bold whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-[var(--brand-text)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* Mobile fallback: stat grid */}
            <div className="grid grid-cols-3 gap-3 mt-8 md:hidden">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-sm border border-gray-100"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-[10px] font-bold">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- TEAM (Rotating Image Bar) -- */}
      <section
        id="team"
        className="py-20 lg:py-28 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Our team
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Meet the experts behind your success
            </h2>
          </motion.div>
        </div>

        <TeamCarousel />
      </section>

      {/* -- FAQ -- */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              FAQ
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Answers to your most common questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp}>
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* -- CONTACT FORM -- */}
      <section
        id="contact"
        className="py-20 lg:py-28 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
              Contact us
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-display)] leading-tight">
              Get in touch with our expert team
            </h2>
          </motion.div>

          <motion.form
            className="bg-white rounded-2xl shadow-sm p-8 md:p-10 grid sm:grid-cols-2 gap-5"
            onSubmit={(e) => e.preventDefault()}
            {...fadeUp}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition text-[var(--brand-muted)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                Service
              </label>
              <select
                id="service"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition text-[var(--brand-muted)]"
                defaultValue=""
              >
                <option value="" disabled>
                  Service...
                </option>
                <option>Strategy Consulting</option>
                <option>Market Research</option>
                <option>Digital Transformation</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="budget"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                Budget
              </label>
              <select
                id="budget"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition text-[var(--brand-muted)]"
                defaultValue=""
              >
                <option value="" disabled>
                  Budget...
                </option>
                <option>$1K-$5K</option>
                <option>$5K-$10K</option>
                <option>$10K+</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs font-semibold text-[var(--brand-text)]"
              >
                How Can We Help?
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="How Can We Help?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-[var(--brand-primary)] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                Submit your Form <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <footer className="py-16 px-6 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-xl text-[var(--brand-text)] flex items-center gap-2 mb-4"
            >
              <div className="w-7 h-7 rounded-md bg-[var(--brand-primary)] flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              Stratex
            </a>
            <p className="text-xs text-[var(--brand-muted)] leading-relaxed max-w-xs">
              Optimize your business strategy with expert consulting solutions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Menu</h4>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-xs text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#team"
                className="block text-xs text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
              >
                Team
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Follow us</h4>
            <div className="space-y-2.5">
              <p className="text-xs text-[var(--brand-muted)]">Instagram</p>
              <p className="text-xs text-[var(--brand-muted)]">LinkedIn</p>
              <p className="text-xs text-[var(--brand-muted)]">Twitter</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <div className="space-y-2.5 text-xs text-[var(--brand-muted)]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                {businessContact.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                {businessContact.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                {businessContact.address}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100">
          <p className="text-[var(--brand-muted)] text-xs text-center">
            &copy; 2026 Stratex. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
