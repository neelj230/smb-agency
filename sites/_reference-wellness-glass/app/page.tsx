// REFERENCE: WELLNESS GLASS — warm dark/cream palette, glass-morphism cards, rotating atom icons, staggered photo grid, large typography
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Check,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Classes", href: "#classes" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#benefits" },
];

const testimonials = [
  {
    text: "More than yoga — it's a second home with incredible people and caring teachers who make everyone feel welcome.",
    author: "Karina L.",
  },
  {
    text: "The classes transformed how I move and breathe. I feel stronger and more centered after every session.",
    author: "Marcus T.",
  },
  {
    text: "A truly welcoming space. The instructors are world-class and genuinely care about each student's journey.",
    author: "Thornton.",
  },
];

const classes = [
  {
    number: "01",
    name: "Vinyasa Flow",
    description: "Dynamic movement for strength and flexibility.",
    tags: ["Energy", "Flexibility", "Strength"],
    level: "All Levels",
    duration: "3 Months",
  },
  {
    number: "02",
    name: "Hatha Yoga",
    description: "Slow, mindful practice with deep stretches.",
    tags: ["Balance", "Calm", "Release"],
    level: "Beginner",
    duration: "1 Month",
  },
  {
    number: "03",
    name: "Yin Yoga",
    description: "Long, gentle holds for deep release and calm.",
    tags: ["Flexibility", "Relaxation", "Release"],
    level: "Intermediate",
    duration: "2 Months",
  },
  {
    number: "04",
    name: "Restorative Yoga",
    description: "Deep relaxation using props to support rest.",
    tags: ["Calm", "Healing", "Rest"],
    level: "Advanced",
    duration: "2 Months",
  },
  {
    number: "05",
    name: "Power Yoga",
    description: "Energetic, strength-focused flow.",
    tags: ["Energy", "Strength", "Focus"],
    level: "Intermediate",
    duration: "3 Months",
  },
];

const benefits = [
  { title: "Strength", description: "Build stability and power." },
  { title: "Flexibility", description: "Increase range and ease." },
  { title: "Balance", description: "Find harmony in movement." },
];

const pricingTiers = [
  {
    name: "Sakura",
    period: "1 month",
    price: 249,
    oldPrice: 299,
    subtitle: "Monthly pass for all classes.",
    features: [
      { text: "10% off events and retail", included: true },
      { text: "3 free monthly workshops", included: true },
      { text: "Unlimited access to all Classes", included: true },
      { text: "Priority reserved mat space", included: false },
      { text: "Exclusive member events", included: false },
    ],
  },
  {
    name: "Crane",
    period: "3 months",
    price: 399,
    oldPrice: 450,
    subtitle: "Seasonal pass with full access.",
    features: [
      { text: "15% off events and retail", included: true },
      { text: "5 free monthly workshops", included: true },
      { text: "Unlimited access to all Classes", included: true },
      { text: "Priority reserved mat space", included: true },
      { text: "Exclusive member events", included: false },
    ],
  },
  {
    name: "Hanami",
    period: "6 months",
    price: 699,
    oldPrice: 749,
    subtitle: "Six months of unlimited classes.",
    features: [
      { text: "20% off events and retail", included: true },
      { text: "8 free monthly workshops", included: true },
      { text: "Unlimited access to all Classes", included: true },
      { text: "Priority reserved mat space", included: true },
      { text: "Exclusive member events", included: true },
    ],
  },
];

const businessContact = {
  name: "Yogus",
  address: "456 Serenity Lane",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 555-0198",
  email: "hello@yogus.com",
};

// ─── DECORATIVE ATOM SVG ─────────────────────────────────────────────────────

function AtomIcon({
  className = "",
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.6" />
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        transform="rotate(60 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        transform="rotate(120 24 24)"
      />
    </svg>
  );
}

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function YogusPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] text-white text-xs">
              Y
            </span>
          </div>
          <span className="font-[family-name:var(--font-display)] text-white text-lg">
            Yogus
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+12155550198"
            className="hidden md:flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="#pricing"
            className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            Join Now
          </a>
        </div>
      </nav>

      {/* ── HERO: Full-viewport video background with large headline + glass overlay cards ── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Fallback gradient behind video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D2B1A] via-[#5C3D28] to-[#2A1E14]" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-12 min-h-screen flex flex-col">
          {/* Main headline */}
          <h1 className="animate-hero-headline font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,6.5rem)] text-[var(--brand-text)] leading-[1.05] font-light tracking-[-0.04em] max-w-4xl">
            Flow like water.
            <br />
            Stand like a tree.
          </h1>

          {/* Glass cards row — spanning full width at bottom */}
          <div className="mt-auto grid md:grid-cols-2 gap-4">
            {/* Testimonial card — glass card over photo */}
            <div className="flex flex-col animate-hero-card-1">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                What others say
              </p>
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[280px]">
                {/* Photo behind the glass */}
                <img
                  src="/yoga-group.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Glass card overlay */}
                <div className="absolute inset-4 bg-white/10 backdrop-blur-[16px] rounded-xl p-6 border border-white/20 flex flex-col">
                  <p className="text-white/90 text-sm leading-relaxed flex-1">
                    &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                  </p>
                  <p className="mt-4 text-white/60 text-sm font-medium">
                    {testimonials[testimonialIdx].author}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        setTestimonialIdx(
                          (prev) =>
                            (prev - 1 + testimonials.length) %
                            testimonials.length,
                        )
                      }
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors backdrop-blur-sm bg-white/5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setTestimonialIdx(
                          (prev) => (prev + 1) % testimonials.length,
                        )
                      }
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors backdrop-blur-sm bg-white/5"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About card with label above */}
            <div className="flex flex-col animate-hero-card-2">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                About Yogus
              </p>
              <div className="bg-[rgba(255,241,222,0.06)] backdrop-blur-[8px] rounded-2xl p-7 border border-white/10 flex-1 flex flex-col">
                <p className="text-white/80 text-base leading-relaxed flex-1">
                  We&apos;re a supportive community where you can grow and
                  deepen your yoga practice.
                </p>
                <div className="flex items-center justify-between mt-6">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 text-[var(--brand-text)] text-sm hover:underline"
                  >
                    Learn More <ArrowRight className="w-3 h-3" />
                  </a>
                  <AtomIcon
                    className="text-[var(--brand-primary)] opacity-60"
                    size={36}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT: Staggered image cards with overlaid stat badges + rotating atom ── */}
      <section
        id="about"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[var(--brand-text)] leading-[1.1] max-w-4xl mx-auto">
              A warm, inclusive space{" "}
              <span className="text-[var(--brand-muted)] italic">
                to move, breathe, and
              </span>{" "}
              <span className="text-[var(--brand-primary)] italic">
                grow your practice
              </span>
            </h2>
          </motion.div>

          {/* Staggered 3 cards with different heights */}
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* Card 1 — shorter, with 300+ Members badge */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#5C4B3A] to-[#2A1E14] h-[380px] md:h-[420px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                  <p className="text-white text-2xl font-semibold">300+</p>
                  <p className="text-white/60 text-xs">Members</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — tallest (center), with rotating atom overlay */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#4A3928] to-[#1F1610] h-[420px] md:h-[520px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Rotating atom decorative element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <AtomIcon
                    className="text-[var(--brand-primary)]"
                    size={120}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 3 — shorter, with 24/7 Support + 97% badge */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#7A5C3F] to-[#3D2B1A] h-[380px] md:h-[420px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="absolute top-6 right-6">
                <div className="bg-[var(--brand-bg-alt)] rounded-2xl px-5 py-3 text-center">
                  <p className="text-[var(--brand-bg)] text-lg font-bold">
                    24/7
                  </p>
                  <p className="text-[var(--brand-bg)]/60 text-xs">Support</p>
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                  <p className="text-white text-2xl font-semibold">97%</p>
                  <p className="text-white/60 text-xs">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CLASSES: Large horizontal rows with big typography ── */}
      <section
        id="classes"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 mb-20">
            <motion.div {...fadeUp}>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,5.5vw,5rem)] font-light text-[var(--brand-bg)] leading-[1.1]">
                Find your flow
                <br />
                with our <span className="font-semibold">Classes</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="flex flex-col justify-end">
              <p className="text-[var(--brand-bg)]/60 text-lg leading-relaxed max-w-md">
                A variety of classes designed to meet you exactly where you are.
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 mt-5 text-[var(--brand-bg)] text-sm font-medium hover:underline underline-offset-4"
              >
                Explore All <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Class rows — large horizontal layout */}
          <div className="divide-y divide-[#2C1D08]/10">
            {classes.map((cls, i) => (
              <motion.div
                key={cls.name}
                className="grid md:grid-cols-[4rem_1fr_auto_12rem] gap-8 py-10 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="text-[var(--brand-bg)]/30 text-sm font-[family-name:var(--font-mono)]">
                  {cls.number}
                </span>

                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--brand-bg)] mb-2">
                    {cls.name}
                  </h3>
                  <p className="text-[var(--brand-bg)]/50 text-sm mb-3">
                    {cls.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cls.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#2C1D08]/15 text-[var(--brand-bg)]/60 text-sm"
                      >
                        <AtomIcon
                          className="text-[var(--brand-bg)]"
                          size={14}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-[var(--brand-bg)]/40 text-xs uppercase tracking-wider">
                    Level:
                  </p>
                  <p className="text-[var(--brand-bg)] font-semibold text-lg">
                    {cls.level}
                  </p>
                  <p className="text-[var(--brand-bg)]/40 text-xs uppercase tracking-wider mt-3">
                    Duration:
                  </p>
                  <p className="text-[var(--brand-bg)] font-semibold text-lg">
                    {cls.duration}
                  </p>
                </div>

                <div className="hidden md:block w-48 h-40 rounded-xl bg-gradient-to-br from-[#8A7560] to-[#5C4B3A] overflow-hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS / WHY PRACTICE YOGA: Large cards with rotating atoms ── */}
      <section
        id="benefits"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.5vw,4rem)] font-light text-[var(--brand-bg)]">
              Why practice yoga
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 text-center border border-[#2C1D08]/8 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <AtomIcon className="text-[var(--brand-bg)]" size={64} />
                  </motion.div>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--brand-bg)] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[var(--brand-bg)]/50 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUp}
            className="text-center text-[var(--brand-bg)]/40 text-sm mt-14 max-w-lg mx-auto leading-relaxed"
          >
            From strength and flexibility to calm and connection, see what
            regular practice can bring to your life.
          </motion.p>
        </div>
      </section>

      {/* ── CTA: Full-width bg image with glass overlay ── */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1E14] via-[#4A3928] to-[#1A1510]" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24 w-full">
          <motion.h2
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.05]"
            {...fadeUp}
          >
            Breathe deep.
            <br />
            Start <span className="text-[var(--brand-primary)]">practice.</span>
          </motion.h2>

          <motion.div
            className="mt-12 bg-[rgba(255,241,222,0.12)] backdrop-blur-[10px] rounded-2xl p-8 max-w-md ml-auto border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-white/80 text-sm leading-relaxed">
              Find your flow{" "}
              <span className="text-white/50">in a warm, inclusive space</span>{" "}
              <span className="text-white font-medium">
                where every class helps you reconnect.
              </span>
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 mt-6 text-[var(--brand-primary)] text-sm font-medium hover:underline"
            >
              Explore Pricing <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING: Dark bg, 3 tiers ── */}
      <section
        id="pricing"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-[var(--brand-text)]">
              Choose your
              <br />
              practise <span className="font-semibold">Path</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--brand-text)]">
                      {tier.name}
                    </h3>
                    <p className="text-[var(--brand-muted)] text-sm mt-1">
                      {tier.subtitle}
                    </p>
                  </div>
                  <span className="bg-white/10 rounded-full px-3 py-1 text-white/50 text-xs">
                    {tier.period}
                  </span>
                </div>

                <div className="mb-8">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand-text)]">
                    ${tier.price}
                  </span>
                  <span className="text-[var(--brand-muted)] text-sm line-through ml-2">
                    ${tier.oldPrice}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-white/20 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-[var(--brand-text)] text-sm"
                            : "text-white/30 text-sm"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="mt-8 block text-center py-3.5 rounded-full border border-white/20 text-[var(--brand-text)] text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Join Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER: Dark bg with proper contrast ── */}
      <footer className="py-16 px-8 lg:px-16 bg-[var(--brand-bg)] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-text)] mb-6">
              Yogus
            </h3>
            <div className="space-y-2 text-[var(--brand-text)]/60 text-sm">
              <p>{businessContact.address}</p>
              <p>
                {businessContact.city}, {businessContact.state}{" "}
                {businessContact.zip}
              </p>
              <p>{businessContact.phone}</p>
              <p>{businessContact.email}</p>
            </div>
          </div>
          <div>
            <h4 className="text-[var(--brand-text)] font-semibold mb-6">
              Quick Links
            </h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[var(--brand-text)]/60 text-sm hover:text-[var(--brand-text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[var(--brand-text)] font-semibold mb-6">
              Join Us
            </h4>
            <p className="text-[var(--brand-text)]/60 text-sm leading-relaxed mb-6">
              Start your yoga journey today in a warm, supportive community.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-[var(--brand-bg)] px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-[var(--brand-text)]/40 text-sm text-center">
            &copy; 2026 Yogus. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(215) 555-0198" />
    </>
  );
}
