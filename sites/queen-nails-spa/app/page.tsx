// REFERENCE: WELLNESS GLASS — warm dark/cream palette, glass-morphism cards, rotating atom icons, staggered photo grid, large typography
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  { label: "Services", href: "#classes" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#benefits" },
];

const testimonials = [
  {
    text: "I've been coming to Queen Nails for a few months now after a recommendation and have never been disappointed! Emily did my last three sets and did a great job each time. They have a huge selection of colors unlike any other salon in the area.",
    author: "Dharma",
  },
  {
    text: "My nails are literally perfect. The shape is ideal, and the color is gorgeous. The salon is clean and the online booking system is so convenient. I've tried three different stylists and enjoyed every one.",
    author: "Ashley",
  },
  {
    text: "I've been here 6 times now and it has easily become my favorite place in Philly. Zet does a great job every time — super meticulous and efficient. I know my nails will look great every visit.",
    author: "Emma Burke",
  },
];

const classes = [
  {
    number: "01",
    name: "Acrylic Full Set",
    description: "Custom acrylic nail sets built to your exact shape and design, with collaborative stylist support for complex looks.",
    tags: ["Custom", "Design", "Acrylic"],
    level: "All Styles",
    duration: "60–90 min",
  },
  {
    number: "02",
    name: "Gel Manicure",
    description: "Long-lasting gel polish manicures applied over natural nails with a wide selection of colors and finishes.",
    tags: ["Gel", "Polish", "Natural"],
    level: "All Clients",
    duration: "45–60 min",
  },
  {
    number: "03",
    name: "Pedicure",
    description: "Relaxing pedicure treatments with gel or classic polish, designed to leave feet refreshed and nails flawlessly finished.",
    tags: ["Relaxing", "Polish", "Refresh"],
    level: "All Clients",
    duration: "45–60 min",
  },
  {
    number: "04",
    name: "Nail Art & Custom Design",
    description: "Intricate nail art and custom designs executed by skilled technicians who collaborate to bring your vision to life.",
    tags: ["Art", "Custom", "Detail"],
    level: "By Request",
    duration: "90+ min",
  },
  {
    number: "05",
    name: "Eyebrow Services",
    description: "Precise eyebrow shaping and grooming performed by experienced technicians for clean, defined results.",
    tags: ["Shaping", "Grooming", "Precision"],
    level: "All Clients",
    duration: "15–30 min",
  },
];

const benefits = [
  { title: "Precision", description: "Meticulous work on every set." },
  { title: "Variety", description: "100+ colors and finishes to choose from." },
  { title: "Teamwork", description: "Stylists collaborate to perfect your look." },
];

const pricingTiers = [
  {
    name: "Essential",
    period: "Single Visit",
    price: 45,
    oldPrice: 55,
    subtitle: "Classic manicure or pedicure service.",
    features: [
      { text: "Gel or classic polish finish", included: true },
      { text: "Wide color selection", included: true },
      { text: "Walk-in or online booking", included: true },
      { text: "Priority technician request", included: false },
      { text: "Nail art add-on", included: false },
    ],
  },
  {
    name: "Signature",
    period: "Single Visit",
    price: 85,
    oldPrice: 100,
    subtitle: "Acrylic full set or gel mani + pedi combo.",
    features: [
      { text: "Gel or classic polish finish", included: true },
      { text: "Wide color selection", included: true },
      { text: "Walk-in or online booking", included: true },
      { text: "Priority technician request", included: true },
      { text: "Nail art add-on", included: false },
    ],
  },
  {
    name: "Queen Experience",
    period: "Single Visit",
    price: 130,
    oldPrice: 155,
    subtitle: "Full set with custom nail art and brow service.",
    features: [
      { text: "Gel or classic polish finish", included: true },
      { text: "Wide color selection", included: true },
      { text: "Walk-in or online booking", included: true },
      { text: "Priority technician request", included: true },
      { text: "Nail art add-on", included: true },
    ],
  },
];

const businessContact = {
  name: "Queen Nails & Spa",
  address: "16 N 3rd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19106",
  phone: "(215) 592-1629",
  email: "",
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

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

export default function BusinessPage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-white text-xs">
                Q
              </span>
            </div>
            <span className="font-[family-name:var(--font-display)] text-white text-lg">
              Queen Nails
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
              href="tel:+12155921629"
              className="hidden md:flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="hidden md:inline-block bg-[var(--brand-text)] text-[var(--brand-bg)] px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Book Now
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-white" aria-label="Menu">
              {mobileNav ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden backdrop-blur-xl bg-black/60 rounded-xl mt-2">
              <div className="flex flex-col py-4 px-6 gap-4">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMobileNav(false)} className="text-white/80 hover:text-white text-sm transition-colors">{link.label}</a>
                ))}
                <a href="#pricing" onClick={() => setMobileNav(false)} className="bg-[var(--brand-text)] text-[var(--brand-bg)] px-5 py-2.5 rounded-full text-sm font-semibold text-center">Book Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO: Full-viewport video background with large headline + glass overlay cards ── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Hero background photo */}
        <img src="/photos/photo-1.webp" alt="Queen Nails & Spa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-32 pb-12 min-h-screen flex flex-col">
          {/* Main headline */}
          <h1 className="animate-hero-headline font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,6.5rem)] text-[var(--brand-text)] leading-[1.05] font-light tracking-[-0.04em] max-w-4xl">
            Your nails, your way.
            <br />
            Polish that lasts.
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
                  src="/photos/photo-2.webp"
                  alt="Queen Nails & Spa"
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
                About Queen Nails
              </p>
              <div className="bg-[rgba(255,241,222,0.06)] backdrop-blur-[8px] rounded-2xl p-7 border border-white/10 flex-1 flex flex-col">
                <p className="text-white/80 text-base leading-relaxed flex-1">
                  Queen Nails &amp; Spa is a full-service nail salon in Old
                  City where precision, variety, and a clean atmosphere come
                  standard.
                </p>
                <div className="flex items-center justify-between mt-6">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 text-white text-sm hover:underline"
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
              Right in Old City Philadelphia{" "}
              <span className="text-[var(--brand-muted)] italic">
                to relax, refresh, and
              </span>{" "}
              <span className="text-[var(--brand-primary)] italic">
                treat yourself right
              </span>
            </h2>
          </motion.div>

          {/* Staggered 3 cards with different heights */}
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* Card 1 — shorter, with 300+ Members badge */}
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[380px] md:h-[420px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img src="/photos/photo-3.webp" alt="Nail art" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                  <p className="text-white text-2xl font-semibold">300+</p>
                  <p className="text-white/60 text-xs">Members</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — tallest (center), with rotating atom overlay */}
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[420px] md:h-[520px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img src="/photos/photo-4.webp" alt="Nail salon interior" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
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
              className="relative rounded-2xl overflow-hidden h-[380px] md:h-[420px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <img src="/photos/photo-5.webp" alt="Nail services" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
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
                Find your style
                <br />
                with our <span className="font-semibold">Services</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="flex flex-col justify-end">
              <p className="text-[var(--brand-bg)]/60 text-lg leading-relaxed max-w-md">
                A full menu of nail and spa services tailored to exactly what you want.
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

      {/* ── BENEFITS / WHY VISIT QUEEN NAILS: Large cards with rotating atoms ── */}
      <section
        id="benefits"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.5vw,4rem)] font-light text-[var(--brand-bg)]">
              Why visit Queen Nails
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
            From acrylics and gel to custom nail art and eyebrow shaping
            &mdash; everything you need to feel polished.
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
            Sit back.
            <br />
            Start <span className="text-[var(--brand-primary)]">visit.</span>
          </motion.h2>

          <motion.div
            className="mt-12 bg-[rgba(255,241,222,0.12)] backdrop-blur-[10px] rounded-2xl p-8 max-w-md ml-auto border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-white/80 text-sm leading-relaxed">
              Find your style{" "}
              <span className="text-white/50">in the heart of Old City</span>{" "}
              <span className="text-white font-medium">
                where every visit leaves you polished.
              </span>
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 mt-6 text-white text-sm font-medium hover:underline"
            >
              View Services <ArrowRight className="w-3 h-3" />
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
              service <span className="font-semibold">Path</span>
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
                  Book Now
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
              Queen Nails
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
              Book your appointment at 16 N 3rd St, Philadelphia — walk-ins welcome.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-[var(--brand-bg)] px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-[var(--brand-text)]/40 text-sm text-center">
            &copy; 2026 Queen Nails &amp; Spa. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(215) 592-1629" />
    </>
  );
}
