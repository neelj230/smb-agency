// REFERENCE: DRAFTR — SOURCE: https://draftr-wbs.framer.website/
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cloud,
  Zap,
  Palette,
  Layers,
  Share2,
  Shield,
  MousePointerClick,
  MessageSquare,
  Users,
  Star,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Monitor,
  Smartphone,
  Globe,
  Figma,
  Slack,
  Github,
  Trello,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

/* ═══════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════ */

function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═══════════════════════════════════════════
   TYPEWRITER HEADING
   ═══════════════════════════════════════════ */

function TypewriterHeading() {
  const fullText = "Bring ideas to life in\njust a few clicks.";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <h1
      ref={ref}
      className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--brand-text)] leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6 min-h-[2.2em]"
    >
      {displayed.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
      <motion.span
        animate={{ opacity: done ? 0 : [1, 0] }}
        transition={
          done ? { duration: 0.3 } : { repeat: Infinity, duration: 0.6 }
        }
        className="inline-block w-[3px] h-[0.85em] bg-[var(--brand-primary)] ml-1 align-middle -mt-2"
      />
    </h1>
  );
}

/* ═══════════════════════════════════════════
   INTEGRATION HUB — RADIAL ANIMATED SVG
   ═══════════════════════════════════════════ */

const hubIcons = [
  { Icon: Figma, color: "#F24E1E", label: "Figma" },
  { Icon: Slack, color: "#4A154B", label: "Slack" },
  { Icon: Github, color: "#181717", label: "GitHub" },
  { Icon: Cloud, color: "#4285F4", label: "Cloud" },
  { Icon: Globe, color: "#0288D1", label: "Globe" },
  { Icon: Trello, color: "#0052CC", label: "Trello" },
  { Icon: Sparkles, color: "#FFB300", label: "AI" },
  { Icon: Shield, color: "#7B1FA2", label: "Security" },
];

function IntegrationHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cx = 200;
  const cy = 200;
  const radius = 150;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[400px] mx-auto aspect-square"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Connection lines with animated dashes */}
        {hubIcons.map((_, i) => {
          const angle = (i / hubIcons.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return (
            <motion.line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#8b7aff"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
            />
          );
        })}
      </svg>

      {/* Center icon */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[var(--brand-primary)] flex items-center justify-center shadow-lg shadow-purple-300/40 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
        }}
      >
        <Layers className="w-7 h-7 text-white" />
      </motion.div>

      {/* Orbiting icons */}
      {hubIcons.map((item, i) => {
        const angle = (i / hubIcons.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + ((Math.cos(angle) * radius) / 400) * 100;
        const y = 50 + ((Math.sin(angle) * radius) / 400) * 100;
        return (
          <motion.div
            key={item.label}
            className="absolute w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.5 + i * 0.08,
              type: "spring",
              stiffness: 200,
            }}
          >
            <item.Icon className="w-5 h-5" style={{ color: item.color }} />
          </motion.div>
        );
      })}

      {/* Animated pulse rings */}
      {isInView && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--brand-primary)]/10"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: 200, height: 200, opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--brand-primary)]/10"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: 300, height: 300, opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   LOGO BAR DATA
   ═══════════════════════════════════════════ */

const logos = [
  "Swiss",
  "KOBE",
  "On_Event",
  "Thune",
  "oslo",
  "Imprintify",
  "Berlin",
  "U-Turn",
];

/* ═══════════════════════════════════════════
   PRICING DATA
   ═══════════════════════════════════════════ */

const plans = [
  {
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "For individuals & new creators",
    features: [
      "1 active project",
      "Basic design tools",
      "1 GB cloud storage",
      "Email support",
      "Export to PNG & SVG",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "For freelancers & small teams",
    features: [
      "Unlimited projects",
      "Advanced design tools",
      "50 GB cloud storage",
      "Priority support",
      "Real-time collaboration",
      "Custom fonts & assets",
      "Version history",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For growing teams & agencies",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "SSO & team management",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced analytics",
      "API access",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

/* ═══════════════════════════════════════════
   INTEGRATIONS DATA
   ═══════════════════════════════════════════ */

const integrations = [
  { name: "Figma", icon: Figma, color: "#F24E1E" },
  { name: "Slack", icon: Slack, color: "#4A154B" },
  { name: "GitHub", icon: Github, color: "#181717" },
  { name: "Trello", icon: Trello, color: "#0052CC" },
  { name: "Cloud", icon: Cloud, color: "#4285F4" },
  { name: "Layers", icon: Layers, color: "#FF6B6B" },
  { name: "Share", icon: Share2, color: "#00C853" },
  { name: "Shield", icon: Shield, color: "#7B1FA2" },
  { name: "Globe", icon: Globe, color: "#0288D1" },
  { name: "Sparkles", icon: Sparkles, color: "#FFB300" },
  { name: "Palette", icon: Palette, color: "#E91E63" },
  { name: "Zap", icon: Zap, color: "#FF9800" },
];

/* ═══════════════════════════════════════════
   USE CASES DATA
   ═══════════════════════════════════════════ */

const useCases = [
  "UI/UX Designers",
  "App & Web Developers",
  "Product Teams",
  "Marketing Teams",
  "Enterprises",
  "Agencies",
];

/* ═══════════════════════════════════════════
   FEATURES GRID DATA
   ═══════════════════════════════════════════ */

const featuresGrid = [
  {
    icon: Cloud,
    title: "Cloud-based accessibility",
    description:
      "Access your designs from anywhere, on any device. Your work is always synced and ready.",
  },
  {
    icon: Zap,
    title: "Fast & secure performance",
    description:
      "Lightning-fast rendering with enterprise-grade security. Your data is always protected.",
  },
  {
    icon: Palette,
    title: "Effortless design experience",
    description:
      "Intuitive tools that feel natural. Focus on creating, not learning complicated interfaces.",
  },
  {
    icon: Layers,
    title: "Hassle-free prototyping",
    description:
      "Turn static designs into interactive prototypes in seconds. Test ideas before building.",
  },
  {
    icon: Share2,
    title: "One-click export & handoff",
    description:
      "Export production-ready assets and generate developer specs with a single click.",
  },
];

/* ═══════════════════════════════════════════
   TESTIMONIALS DATA
   ═══════════════════════════════════════════ */

const testimonials = [
  {
    quote:
      "Draftr has completely transformed how our team collaborates on design projects. The real-time editing and prototyping tools are incredibly intuitive. We shipped our last product 3x faster.",
    name: "Emily Ray",
    role: "UX Designer",
    rating: 5,
  },
  {
    quote:
      "The best design tool I have ever used. The drag-and-drop editor is smooth, the export options are comprehensive, and the collaboration features make remote work seamless.",
    name: "Marcus Chen",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote:
      "We switched from three different tools to just Draftr. It handles everything from wireframing to final handoff. Our design system has never been more consistent.",
    name: "Sarah Johnson",
    role: "Design Lead",
    rating: 5,
  },
];

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function DraftrPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--brand-text)]">
              Draftr
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Blog", "Changelog", "Contact", "Power tips"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-[var(--brand-text-light)] hover:text-[var(--brand-text)] transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full hover:bg-[#7A69EE] transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3"
          >
            {["About", "Blog", "Changelog", "Contact", "Power tips"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm py-2 text-[var(--brand-text-light)]"
                >
                  {item}
                </a>
              ),
            )}
            <button className="w-full text-sm bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full mt-2">
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-primary)] opacity-[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--brand-accent)] opacity-[0.06] rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[var(--brand-primary)]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="bg-[var(--brand-primary)] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                New
              </span>
              <span className="text-sm text-[var(--brand-text-light)]">
                Revolutionize your design workflow
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--brand-text-light)]" />
            </div>
          </FadeIn>

          {/* Typewriter Heading */}
          <TypewriterHeading />

          {/* Subtitle */}
          <FadeIn delay={1.8}>
            <p className="text-base sm:text-lg text-[var(--brand-text-light)] max-w-xl mx-auto mb-8 leading-relaxed">
              Design, prototype, and collaborate in real-time &mdash; all in one
              powerful platform. Elevate your{" "}
              <span className="text-[var(--brand-primary)] font-semibold underline decoration-[var(--brand-primary)]/30 underline-offset-2">
                creative process
              </span>{" "}
              with seamless teamwork and{" "}
              <span className="text-[var(--brand-primary)] font-semibold underline decoration-[var(--brand-primary)]/30 underline-offset-2">
                endless possibilities
              </span>
              .
            </p>
          </FadeIn>

          {/* Single CTA */}
          <FadeIn delay={2.0}>
            <button className="bg-[var(--brand-primary)] text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-[#7A69EE] transition-all hover:shadow-lg hover:shadow-purple-200 flex items-center gap-2 mx-auto">
              Get Started &mdash; it&apos;s free
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>

          {/* Product Mockups — staggered entrance */}
          <div className="mt-16 md:mt-20 relative max-w-5xl mx-auto">
            {/* Main browser mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 2.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative z-10"
            >
              <div className="bg-white rounded-2xl mockup-shadow p-3">
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/80 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-400 flex items-center gap-1.5 w-64 justify-center">
                        <span>Agency</span>
                        <span className="text-gray-300">/</span>
                        <span>Portfolio</span>
                      </div>
                    </div>
                  </div>

                  {/* Website preview — roofing site mockup */}
                  <div className="relative h-[300px] sm:h-[360px] md:h-[420px] bg-white overflow-hidden">
                    {/* Left sidebar nav */}
                    <div className="absolute left-0 top-0 bottom-0 w-14 bg-[#1a1a2e] flex flex-col items-center py-4 gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      {[MousePointerClick, Palette, Layers, MessageSquare].map(
                        (Icon, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
                          >
                            <Icon className="w-4 h-4 text-white/50" />
                          </div>
                        ),
                      )}
                    </div>

                    {/* Main content area */}
                    <div className="ml-14 p-6 md:p-8">
                      {/* Top bar of inner site */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-emerald-600" />
                          <span className="text-sm font-bold text-gray-800">
                            RoofPro
                          </span>
                        </div>
                        <div className="flex gap-4">
                          {["Services", "About", "Contact"].map((item) => (
                            <span key={item} className="text-xs text-gray-400">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hero of inner site */}
                      <div className="bg-[#1a2332] rounded-xl p-6 md:p-8 relative overflow-hidden">
                        <div className="relative z-10">
                          <p className="text-emerald-400 text-xs font-medium mb-2">
                            ROOFING EXPERTS
                          </p>
                          <h3 className="text-white font-bold text-lg md:text-2xl font-[family-name:var(--font-display)] leading-tight mb-1">
                            Durable, long-
                          </h3>
                          <h3 className="text-white font-bold text-lg md:text-2xl font-[family-name:var(--font-display)] leading-tight mb-3">
                            lasting roofing
                          </h3>
                          <div className="flex gap-2">
                            <div className="bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                              Get Quote
                            </div>
                            <div className="border border-white/30 text-white/80 text-xs px-3 py-1.5 rounded-md">
                              Learn More
                            </div>
                          </div>
                        </div>
                        {/* Decorative image placeholder */}
                        <div className="absolute right-4 top-4 w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 opacity-60" />
                      </div>

                      {/* Service cards */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {["Residential", "Commercial", "Repairs"].map(
                          (service) => (
                            <div
                              key={service}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <div className="w-6 h-6 rounded bg-emerald-100 mb-2" />
                              <p className="text-xs font-medium text-gray-700">
                                {service}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card — top right: Draftr branding */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: -20, rotate: 3 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
              transition={{
                duration: 0.7,
                delay: 2.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute -top-4 -right-4 md:right-4 lg:-right-8 w-44 md:w-56 z-20"
            >
              <div className="bg-white rounded-2xl p-5 mockup-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-sm font-[family-name:var(--font-display)] text-[var(--brand-text)]">
                    Draftr.
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full w-full mb-1.5" />
                <div className="h-2 bg-gray-100 rounded-full w-3/4 mb-3" />
                <div className="w-full h-16 rounded-lg bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-accent)]/20" />
              </div>
            </motion.div>

            {/* Floating card — bottom right: colorful 3D object */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40, rotate: -2 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -1 }}
              transition={{
                duration: 0.7,
                delay: 3.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute -bottom-8 -right-2 md:right-12 lg:-right-4 w-40 md:w-48 z-20"
            >
              <div className="bg-[#FFF8E8] rounded-2xl p-5 mockup-shadow">
                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-yellow-300 via-red-400 to-blue-500 opacity-80 blur-sm" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Logo Bar */}
          <FadeIn delay={3.3}>
            <div className="mt-24 md:mt-28">
              <div className="overflow-hidden">
                <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
                  {[...logos, ...logos].map((logo, i) => (
                    <span
                      key={i}
                      className="text-lg md:text-xl font-bold text-gray-300 font-[family-name:var(--font-display)] select-none"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section id="features" className="py-20 md:py-28 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
              Features
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight max-w-2xl mx-auto">
              The ultimate toolkit for designers & teams
            </h2>
          </FadeIn>

          <StaggerChildren
            className="grid md:grid-cols-3 gap-6"
            staggerDelay={0.15}
          >
            {/* Card 1 — Pink */}
            <motion.div
              variants={staggerItem}
              className="card-pink-gradient rounded-3xl p-8 transition-card cursor-default"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  {[MousePointerClick, Palette, Layers, Share2, Sparkles].map(
                    (Icon, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm"
                      >
                        <Icon className="w-5 h-5 text-pink-500" />
                      </div>
                    ),
                  )}
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-[var(--brand-text)] mb-2">
                Intuitive drag & drop editor
              </h3>
              <p className="text-sm text-[var(--brand-text-light)] leading-relaxed">
                Build stunning designs effortlessly with our intuitive
                drag-and-drop interface. No coding required.
              </p>
            </motion.div>

            {/* Card 2 — Yellow */}
            <motion.div
              variants={staggerItem}
              className="card-yellow-gradient rounded-3xl p-8 transition-card cursor-default"
            >
              <div className="mb-6 relative h-32">
                {/* Connection lines illustration */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 280 120"
                  fill="none"
                >
                  <circle
                    cx="60"
                    cy="30"
                    r="12"
                    fill="#FFD97A"
                    stroke="#F5C542"
                    strokeWidth="2"
                  />
                  <circle
                    cx="140"
                    cy="60"
                    r="12"
                    fill="#FFD97A"
                    stroke="#F5C542"
                    strokeWidth="2"
                  />
                  <circle
                    cx="220"
                    cy="30"
                    r="12"
                    fill="#FFD97A"
                    stroke="#F5C542"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="95"
                    r="12"
                    fill="#FFD97A"
                    stroke="#F5C542"
                    strokeWidth="2"
                  />
                  <circle
                    cx="180"
                    cy="95"
                    r="12"
                    fill="#FFD97A"
                    stroke="#F5C542"
                    strokeWidth="2"
                  />
                  <line
                    x1="72"
                    y1="35"
                    x2="128"
                    y2="55"
                    stroke="#F5C542"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    x1="152"
                    y1="55"
                    x2="208"
                    y2="35"
                    stroke="#F5C542"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    x1="128"
                    y1="65"
                    x2="112"
                    y2="85"
                    stroke="#F5C542"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line
                    x1="152"
                    y1="65"
                    x2="168"
                    y2="85"
                    stroke="#F5C542"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-[var(--brand-text)] mb-2">
                Advanced prototyping
              </h3>
              <p className="text-sm text-[var(--brand-text-light)] leading-relaxed">
                Create interactive prototypes with smart connections and
                transitions. Test user flows before development.
              </p>
            </motion.div>

            {/* Card 3 — Blue */}
            <motion.div
              variants={staggerItem}
              className="card-blue-gradient rounded-3xl p-8 transition-card cursor-default"
            >
              <div className="mb-6">
                {/* Avatar stack + chat bubble */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      "bg-blue-400",
                      "bg-purple-400",
                      "bg-pink-400",
                      "bg-green-400",
                    ].map((color, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full ${color} border-2 border-white flex items-center justify-center`}
                      >
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-500">
                      +5
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-white/80 rounded-xl p-3 max-w-[200px] shadow-sm">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600">
                      &ldquo;Love this layout! Let&apos;s iterate on the
                      spacing.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-[var(--brand-text)] mb-2">
                Real-time collaboration
              </h3>
              <p className="text-sm text-[var(--brand-text-light)] leading-relaxed">
                Work together seamlessly with live cursors, comments, and shared
                canvases. Your team, always in sync.
              </p>
            </motion.div>
          </StaggerChildren>
        </div>
      </section>

      {/* ═══ WORKFLOW SECTION ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — steps */}
            <div>
              <FadeIn>
                <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight mb-12">
                  Simplify your
                  <br />
                  workflow
                </h2>
              </FadeIn>

              <StaggerChildren className="space-y-10" staggerDelay={0.15}>
                {[
                  {
                    num: "01",
                    title: "Start your project",
                    desc: "Create a new design or import files with just a click. Set up your workspace effortlessly.",
                  },
                  {
                    num: "02",
                    title: "Design with ease",
                    desc: "Use our intuitive drag-and-drop editor, smart tools, auto-layout, and real-time preview to bring your vision to life.",
                  },
                  {
                    num: "03",
                    title: "Export & Share",
                    desc: "Easily integrate with your favorite tools to launch your project effortlessly.",
                  },
                ].map((step) => (
                  <motion.div
                    key={step.num}
                    variants={staggerItem}
                    className="flex gap-5"
                  >
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--brand-purple-light)] flex items-center justify-center">
                        <span className="text-sm font-extrabold font-[family-name:var(--font-display)] text-[var(--brand-primary)]">
                          {step.num}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--brand-text)] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--brand-text-light)] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </StaggerChildren>
            </div>

            {/* Right — product mockup */}
            <FadeIn delay={0.2} direction="right">
              <div className="bg-white rounded-2xl mockup-shadow p-3">
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100/80 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-400 w-48 text-center">
                        draftr.design/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard mockup */}
                  <div className="p-5 bg-white min-h-[320px]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Studio</p>
                        <p className="text-sm font-bold text-gray-800 font-[family-name:var(--font-display)]">
                          Welcome back, mike.
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Project cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 p-3">
                        <div className="w-full h-20 rounded-lg bg-gradient-to-br from-teal-300 to-emerald-400 mb-2" />
                        <div className="h-2 bg-teal-300/50 rounded w-3/4 mb-1" />
                        <div className="h-2 bg-teal-200/50 rounded w-1/2" />
                      </div>
                      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 p-3">
                        <div className="w-full h-20 rounded-lg bg-gradient-to-br from-purple-300 to-violet-400 mb-2 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/30" />
                        </div>
                        <div className="h-2 bg-purple-300/50 rounded w-3/4 mb-1" />
                        <div className="h-2 bg-purple-200/50 rounded w-1/2" />
                      </div>
                    </div>

                    {/* Recent files */}
                    <div className="mt-4 space-y-2">
                      {["Landing page v2", "Mobile app flow", "Brand kit"].map(
                        (file) => (
                          <div
                            key={file}
                            className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
                          >
                            <div className="w-6 h-6 rounded bg-[var(--brand-purple-light)] flex items-center justify-center">
                              <Layers className="w-3 h-3 text-[var(--brand-primary)]" />
                            </div>
                            <span className="text-xs text-gray-600">
                              {file}
                            </span>
                            <span className="text-[10px] text-gray-300 ml-auto">
                              2h ago
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="inline-flex items-center gap-2 bg-[var(--brand-purple-light)] rounded-full px-4 py-2">
                  <Monitor className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span className="text-xs text-[var(--brand-text)] font-medium">
                    Available on Windows & Mac
                  </span>
                  <Monitor className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <Smartphone className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ INTEGRATIONS SECTION ═══ */}
      <section
        id="integrations"
        className="py-20 md:py-28 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — radial hub */}
            <FadeIn>
              <IntegrationHub />
            </FadeIn>

            {/* Right — text + quote */}
            <div>
              <FadeIn>
                <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight mb-6">
                  One platform,
                  <br />
                  unlimited integrations
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <button className="bg-[var(--brand-text)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mb-8">
                  View all integrations
                </button>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="border-t border-gray-200 pt-6">
                  <blockquote className="text-[var(--brand-text-light)] text-sm leading-relaxed mb-4">
                    &ldquo;Our platform empowers teams to collaborate, innovate,
                    and bring ideas to life&mdash;seamlessly and
                    effortlessly.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center text-white font-bold text-sm">
                      D
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--brand-text)]">
                        Daniel Vaughn
                      </p>
                      <p className="text-xs text-[var(--brand-text-light)]">
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID — DARK ═══ */}
      <section className="py-20 md:py-28 bg-[#141420] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl mx-auto">
              Power up your workflow with
              <br />
              next-gen features
            </h2>
          </FadeIn>

          {/* Top 2 — rich visual cards */}
          <StaggerChildren
            className="grid md:grid-cols-2 gap-6 mb-6"
            staggerDelay={0.15}
          >
            {/* Card 1 — Cloud (earth globe illustration) */}
            <motion.div
              variants={staggerItem}
              className="bg-[#1e1e2e] rounded-3xl p-8 relative overflow-hidden min-h-[340px] flex flex-col justify-end"
            >
              {/* Globe illustration */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <div className="relative w-48 h-48">
                  {/* Globe body */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20" />
                  <div className="absolute inset-2 rounded-full border border-blue-500/10" />
                  <div className="absolute inset-4 rounded-full border border-blue-500/10" />
                  {/* Horizontal lines */}
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-blue-500/15" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/20" />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-blue-500/15" />
                  {/* Vertical arc */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/15" />
                  {/* Cloud icon on top */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-blue-400/30">
                    <Cloud className="w-8 h-8 text-blue-400" />
                  </div>
                  {/* User bubbles */}
                  <motion.div
                    className="absolute bottom-2 left-2 bg-[#2a2a3e] rounded-full px-2 py-1 flex items-center gap-1"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 rounded-full bg-pink-400" />
                    <span className="text-[9px] text-gray-400">
                      Emily brook
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-6 right-0 bg-[#2a2a3e] rounded-full px-2 py-1 flex items-center gap-1"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-400" />
                    <span className="text-[9px] text-gray-400">Mark wolf</span>
                  </motion.div>
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-2">
                  Cloud-based accessibility
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Access your projects anytime, anywhere&mdash;no downloads or
                  installations needed.
                </p>
              </div>
            </motion.div>

            {/* Card 2 — Fast & Secure (lightning + shield) */}
            <motion.div
              variants={staggerItem}
              className="bg-[#1e1e2e] rounded-3xl p-8 relative overflow-hidden min-h-[340px] flex flex-col justify-end"
            >
              {/* Lightning + chevrons + shield illustration */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-20 h-20 text-yellow-400 fill-yellow-400/20" />
                </motion.div>
                <div className="flex gap-1">
                  <motion.div
                    animate={{ x: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-8 h-8 text-gray-500" />
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <ChevronRight className="w-8 h-8 text-gray-500" />
                  </motion.div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Shield className="w-20 h-20 text-emerald-400 fill-emerald-400/20" />
                </motion.div>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-white mb-2">
                  Fast & secure performance
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Experience lightning-fast speed with enterprise-level security
                  and version control.
                </p>
              </div>
            </motion.div>
          </StaggerChildren>

          {/* Bottom 3 — icon + text, lighter */}
          <StaggerChildren
            className="grid sm:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {[
              {
                icon: Palette,
                title: "Effortless design experience",
                desc: "Intuitive interface and smart tools to speed up your creative process.",
              },
              {
                icon: Layers,
                title: "Hassle-free prototyping",
                desc: "Transform static designs into interactive prototypes in just a few clicks.",
              },
              {
                icon: Share2,
                title: "One-click export & handoff",
                desc: "Generate code, export assets, and collaborate with developers effortlessly.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="py-6"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-white mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
              Testimonials
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight">
              Loved by designers & teams
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <div className="bg-[var(--brand-bg)] rounded-3xl p-8 md:p-10 relative">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({
                    length: testimonials[activeTestimonial].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-[var(--brand-text)] leading-relaxed mb-6 font-medium">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center text-white font-bold">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--brand-text)]">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="text-sm text-[var(--brand-text-light)]">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          i === activeTestimonial
                            ? "bg-[var(--brand-primary)]"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-20 md:py-28 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
              Pricing
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight mb-6">
              Flexible pricing plans
            </h2>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5 card-shadow">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly
                    ? "bg-[var(--brand-primary)] text-white shadow-md"
                    : "text-[var(--brand-text-light)] hover:text-[var(--brand-text)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isYearly
                    ? "bg-[var(--brand-primary)] text-white shadow-md"
                    : "text-[var(--brand-text-light)] hover:text-[var(--brand-text)]"
                }`}
              >
                Yearly
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${isYearly ? "bg-white/20 text-white" : "bg-green-100 text-green-600"}`}
                >
                  -20%
                </span>
              </button>
            </div>
          </FadeIn>

          <StaggerChildren
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            staggerDelay={0.12}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                className={`rounded-3xl p-7 md:p-8 transition-card cursor-default ${
                  plan.highlighted
                    ? "bg-[var(--brand-primary)] text-white relative ring-4 ring-[var(--brand-primary)]/20 scale-[1.02]"
                    : "bg-white card-shadow"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-[var(--brand-text)] text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`font-[family-name:var(--font-display)] font-bold text-xl mb-1 ${plan.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-5 ${plan.highlighted ? "text-white/70" : "text-[var(--brand-text-light)]"}`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className={`text-4xl font-extrabold font-[family-name:var(--font-display)] ${plan.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                  >
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-white/60" : "text-[var(--brand-text-light)]"}`}
                  >
                    /mo
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlighted ? "bg-white/20" : "bg-[var(--brand-purple-light)]"}`}
                      >
                        <Check
                          className={`w-3 h-3 ${plan.highlighted ? "text-white" : "text-[var(--brand-primary)]"}`}
                        />
                      </div>
                      <span
                        className={
                          plan.highlighted
                            ? "text-white/90"
                            : "text-[var(--brand-text-light)]"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-white text-[var(--brand-primary)] hover:bg-gray-50"
                      : "bg-[var(--brand-primary)] text-white hover:bg-[#7A69EE]"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
              Use Cases
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight max-w-3xl mx-auto">
              The perfect design solution for every workflow
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-3xl mx-auto">
              {useCases.map((uc, i) => (
                <button
                  key={uc}
                  onClick={() => setActiveUseCase(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    i === activeUseCase
                      ? "bg-[var(--brand-primary)] text-white shadow-md shadow-purple-200"
                      : "bg-[var(--brand-bg)] text-[var(--brand-text-light)] hover:bg-[var(--brand-purple-light)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {uc}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 bg-[var(--brand-bg)] rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--brand-purple-light)] flex items-center justify-center mx-auto mb-5">
                {activeUseCase === 0 && (
                  <Palette className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
                {activeUseCase === 1 && (
                  <Monitor className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
                {activeUseCase === 2 && (
                  <Users className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
                {activeUseCase === 3 && (
                  <Sparkles className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
                {activeUseCase === 4 && (
                  <Shield className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
                {activeUseCase === 5 && (
                  <Globe className="w-8 h-8 text-[var(--brand-primary)]" />
                )}
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-[var(--brand-text)] mb-3">
                Built for {useCases[activeUseCase]}
              </h3>
              <p className="text-[var(--brand-text-light)] leading-relaxed max-w-lg mx-auto">
                {activeUseCase === 0 &&
                  "Create pixel-perfect interfaces with our precision tools, component libraries, and design systems. From wireframes to high-fidelity mockups in minutes."}
                {activeUseCase === 1 &&
                  "Bridge the gap between design and development. Export clean code, inspect spacing and styles, and integrate directly with your dev workflow."}
                {activeUseCase === 2 &&
                  "Align your team around a shared vision. Collaborate on design specs, track progress, and iterate faster with built-in feedback tools."}
                {activeUseCase === 3 &&
                  "Design stunning campaigns, social media assets, and landing pages. No design skills needed with our template library and brand kit tools."}
                {activeUseCase === 4 &&
                  "Scale your design operations with enterprise-grade security, SSO, advanced permissions, and dedicated support for large teams."}
                {activeUseCase === 5 &&
                  "Manage multiple client projects with workspaces, white-label exports, and streamlined approval workflows built for agency speed."}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-20 md:py-28 bg-[var(--brand-bg)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="hero-gradient rounded-3xl p-10 md:p-16 relative overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-primary)] opacity-[0.08] rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--brand-accent)] opacity-[0.08] rounded-full blur-3xl" />

              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--brand-text)] leading-tight mb-4 relative z-10">
                Take your creative workflow to the next level
              </h2>
              <p className="text-[var(--brand-text-light)] mb-8 max-w-xl mx-auto relative z-10">
                Join thousands of designers and teams already using Draftr to
                create stunning designs faster than ever.
              </p>
              <button className="bg-[var(--brand-primary)] text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-[#7A69EE] transition-all hover:shadow-lg hover:shadow-purple-200 flex items-center gap-2 mx-auto relative z-10">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1A1A2E] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                  Draftr
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
                Design, prototype, and collaborate in real-time. The all-in-one
                design platform for modern teams.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Follow us on:
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--brand-primary)] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-sm uppercase tracking-wide text-gray-300">
                Product
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Features",
                  "Pricing",
                  "Integrations",
                  "Changelog",
                  "Roadmap",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-sm uppercase tracking-wide text-gray-300">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Documentation",
                  "Tutorials",
                  "Blog",
                  "Community",
                  "Support",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-sm uppercase tracking-wide text-gray-300">
                Company
              </h4>
              <ul className="space-y-2.5">
                {["About", "Careers", "Press", "Contact", "Privacy Policy"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; 2024 Draftr. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Designed by Webestica, Powered by Framer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
