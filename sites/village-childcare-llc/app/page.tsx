// Village Childcare LLC — dark elegant layout, huge flowing marquee text, imagery, two-segment menu with giant typography, caregiver portrait with quote, decorative leaves
"use client";

import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, Mail, ChevronDown, Leaf } from "lucide-react";
import { useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const menuCategories = [
  { name: "Full-Day Toddler Care", tag: "CORE PROGRAM" },
  { name: "Imaginative Play Program", tag: "LEARNING THROUGH PLAY" },
  { name: "Socialization & Peer Play", tag: "SOCIAL DEVELOPMENT" },
];

const toddlerPrograms = [
  {
    name: "Full-Day Toddler Care",
    description: "Nurturing home-based care Monday through Thursday, 7:30 AM to 5:00 PM",
    price: "Mon–Thu",
  },
  {
    name: "Infant Transition Care",
    description: "Gentle, responsive care for infants as young as 14 months",
    price: "Ages 14m+",
  },
  {
    name: "Socialization & Peer Play",
    description: "Guided group play to build interpersonal skills and cooperative play",
    price: "Daily",
  },
  {
    name: "Imaginative Play Program",
    description: "Play kitchen, grocery store, train set, and shape sorters to spark creativity",
    price: "Included",
  },
];

const seaMenu = [
  {
    name: "New Family Enrollment & Tours",
    description: "Welcoming tours, easy sign-up, and transparent communication from day one",
    price: "Free Tour",
  },
  {
    name: "Sensory & Manipulative Learning",
    description: "Wooden toys, building blocks, and sorting activities for fine motor skills",
    price: "Included",
  },
  {
    name: "Infant Transition Care",
    description: "Supportive first-daycare experience for your youngest ones",
    price: "Ages 14m+",
  },
  {
    name: "Full-Day Toddler Care",
    description: "Structured yet warm environment where children belong, not just stay",
    price: "7:30–5:00",
  },
];

const blogPosts = [
  {
    date: "Parent Review",
    title: "\"I can tell she genuinely loves each child just by the way she looks at them.\" — Leslie Annie",
  },
  {
    date: "Parent Review",
    title: "\"The toy selection and warmth of the atmosphere gave me great confidence.\" — Heather Larson",
  },
  {
    date: "About Village Childcare",
    title: "A home-based daycare in Redmond, OR where children don't just go — they belong.",
  },
];

const businessContact = {
  name: "Village Childcare LLC",
  address: "2480 SW 37th St",
  city: "Redmond",
  state: "OR",
  zip: "97756",
  phone: "(503) 347-5743",
  email: "",
  hours: {
    Monday: "7:30 AM – 5:00 PM",
    Tuesday: "7:30 AM – 5:00 PM",
    Wednesday: "7:30 AM – 5:00 PM",
    Thursday: "7:30 AM – 5:00 PM",
    Friday: "Closed",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideFromLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideFromRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

function LeafIcon({ className }: { className?: string }) {
  return (
    <Leaf
      className={`w-4 h-4 text-[var(--brand-primary)] ${className || ""}`}
    />
  );
}

export default function BusinessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── NAVBAR: Fixed transparent with logo + links + menu CTA ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 bg-gradient-to-b from-[var(--brand-dark-green)]/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[var(--brand-primary)]" />
          <span className="font-[family-name:var(--font-display)] text-white text-xl font-semibold italic">
            Village Childcare
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-white text-[13px] tracking-[0.15em] uppercase transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#menu"
          className="flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition"
        >
          <Leaf className="w-3.5 h-3.5" />
          Menu
        </a>
      </nav>

      {/* ── HERO: Dark bg, decorative leaf silhouettes, word-by-word animated headline, prominent food image ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-[var(--brand-dark-green)] overflow-hidden flex flex-col items-center text-center px-8 pt-36 pb-0"
      >
        {/* Decorative leaf silhouettes — left */}
        <div className="absolute left-[-40px] top-[12%] w-[240px] h-[400px] opacity-10 pointer-events-none leaf-float">
          <svg
            viewBox="0 0 200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <ellipse
              cx="100"
              cy="200"
              rx="80"
              ry="180"
              fill="var(--brand-primary)"
              opacity="0.3"
            />
            <ellipse
              cx="70"
              cy="180"
              rx="50"
              ry="140"
              fill="var(--brand-primary)"
              opacity="0.2"
            />
          </svg>
        </div>
        {/* Decorative leaf silhouettes — right */}
        <div
          className="absolute right-[-40px] top-[12%] w-[240px] h-[400px] opacity-10 pointer-events-none leaf-float"
          style={{ animationDelay: "-3s" }}
        >
          <svg
            viewBox="0 0 200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full scale-x-[-1]"
          >
            <ellipse
              cx="100"
              cy="200"
              rx="80"
              ry="180"
              fill="var(--brand-primary)"
              opacity="0.3"
            />
            <ellipse
              cx="70"
              cy="180"
              rx="50"
              ry="140"
              fill="var(--brand-primary)"
              opacity="0.2"
            />
          </svg>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl"
          style={{ opacity: heroOpacity }}
        >
          {/* Word-by-word fade-in title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] text-white leading-[1.15] font-light italic">
            {[
              "Warm",
              "care",
              "&",
              "a",
              "wonderful",
              "childhood",
            ].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.13,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-8 text-white/30 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Where kids stay past pickup time.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block mt-10 bg-[var(--brand-primary)] text-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] hover:brightness-110 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            Schedule a Tour
          </motion.a>
        </motion.div>

        {/* Hero food image — large circular presentation */}
        <motion.div
          className="relative z-10 mt-20 w-full max-w-[680px]"
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ y: heroImageY }}
        >
          <div className="aspect-[4/3] rounded-[50%] mx-auto overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="w-full h-full bg-gradient-to-br from-[#2A3424] via-[#1D2B1D] to-[#14231A] flex items-center justify-center relative">
              {/* Decorative rings suggesting a plate */}
              <div className="absolute w-[90%] h-[90%] rounded-full border border-white/[0.04]" />
              <div className="absolute w-[75%] h-[75%] rounded-full border border-white/[0.06]" />
              <div className="absolute w-[60%] h-[60%] rounded-full bg-[#1A2A1A] border border-white/[0.04] flex items-center justify-center">
                <p className="text-white/[0.08] text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-body)]">
                  Daycare Photography
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Curved white transition */}
        <div className="relative w-full mt-[-50px]">
          <svg
            viewBox="0 0 1440 120"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"
              fill="var(--brand-cream)"
            />
          </svg>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-[140px] z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--brand-primary)]" />
        </motion.div>
      </section>

      {/* ── LOGO BAR: Five partner logos ── */}
      <section className="py-10 px-8 lg:px-16 bg-[var(--brand-cream)] border-b border-[var(--brand-text)]/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-12 flex-wrap">
          {[
            "5-Star Rated",
            "Home-Based",
            "Ages 14m+",
            "Mon\u2013Thu",
            "REDMOND, OR",
          ].map((name, i) => (
            <motion.span
              key={i}
              className="text-[var(--brand-text)]/20 text-sm font-medium tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── ABOUT: Split — circular food image left (slides from left), text + CTA right (slides from right) ── */}
      <section
        id="about"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-cream)]"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div className="flex justify-center" {...slideFromLeft}>
            <div className="w-[340px] h-[340px] rounded-full overflow-hidden shadow-xl relative">
              <div className="w-full h-full bg-gradient-to-br from-[#D4C5A9] via-[#C4B699] to-[#B8A88C]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70%] h-[70%] rounded-full border-2 border-white/20 flex items-center justify-center">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
                    Childcare Image
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div {...slideFromRight}>
            <div className="flex items-center gap-2 mb-5">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                Care, play, and belonging
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] italic leading-[1.15] font-light">
              A home where your child truly belongs.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed text-[15px]">
              Village Childcare is a home-based daycare in Redmond, Oregon
              where children don&apos;t just go — they belong.
            </p>
            <p className="mt-4 text-[var(--brand-muted)] leading-relaxed text-[15px]">
              LeAnne and her team have created a space where toddlers learn
              to socialize, discover the world through play, and feel safe enough to thrive.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#menu"
                className="bg-[var(--brand-primary)] text-white px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition"
              >
                Our Services
              </a>
              <a
                href="tel:+5033475743"
                className="flex items-center gap-2 text-sm text-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                (503) 347-5743
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POPULAR CATEGORIES: 3 round cards + giant flowing marquee text behind ── */}
      <section
        id="menu"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-5">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                Popular Services
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] italic leading-[1.15] font-light">
              A place where children
              <br />
              grow and belong.
            </h2>
          </motion.div>

          {/* Category cards — large circular food images */}
          <div className="grid md:grid-cols-3 gap-10">
            {menuCategories.map((cat, i) => (
              <motion.div
                key={i}
                className="group text-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="w-56 h-56 rounded-full mx-auto mb-8 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500 relative">
                  <div className="w-full h-full bg-gradient-to-br from-[#E8DCC8] via-[#D4C5A9] to-[#C0B193] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[60%] h-[60%] rounded-full border border-white/30" />
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold mb-2">
                  {cat.tag}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium italic">
                  {cat.name}
                </h3>
                <a
                  href="#"
                  className="inline-block mt-4 text-[11px] uppercase tracking-[0.15em] text-[var(--brand-muted)] underline underline-offset-4 decoration-[var(--brand-muted)]/30 hover:text-[var(--brand-text)] hover:decoration-[var(--brand-text)] transition-colors"
                >
                  Our Services
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Giant flowing marquee text — the "Big Tex flows across the screen" element */}
        <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="marquee-flow flex whitespace-nowrap">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="font-[family-name:var(--font-display)] text-[clamp(5rem,10vw,9rem)] italic text-[var(--brand-text)]/[0.04] mr-16 font-light"
              >
                Warm care and a wonderful childhood experience
              </span>
            ))}
          </div>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none">
          <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="200"
              stroke="var(--brand-text)"
              strokeWidth="0.5"
            />
            <circle
              cx="250"
              cy="250"
              r="160"
              stroke="var(--brand-text)"
              strokeWidth="0.5"
            />
            <circle
              cx="250"
              cy="250"
              r="120"
              stroke="var(--brand-text)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </section>

      {/* ── SERVICES SEGMENT 1: Toddler care — huge title left with details, image right ── */}
      <section className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-cream)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div {...slideFromLeft}>
            <div className="flex items-center gap-2 mb-5">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                All Services
              </p>
            </div>
            {/* HUGE menu title — the "menu is in huge, appealing text that pops" */}
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,4.5rem)] italic leading-[1.1] font-light mb-12">
              Toddler Care
            </h2>
            <div className="space-y-0">
              {toddlerPrograms.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start justify-between border-b border-[var(--brand-text)]/10 py-6 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-medium italic group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[var(--brand-muted)] mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-xl font-semibold ml-6 whitespace-nowrap italic">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl"
            {...slideFromRight}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#D4C5A9] via-[#C4B699] to-[#A89878] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
                  Toddler Image
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES SEGMENT 2: Infant care — image left, huge title + details right ── */}
      <section className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-cream)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl"
            {...slideFromLeft}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#C4B699] via-[#B8A88C] to-[#A89878] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
                  Infant Image
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div {...slideFromRight}>
            <div className="flex items-center gap-2 mb-5">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                Infant Care
              </p>
            </div>
            {/* HUGE menu title */}
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,4.5rem)] italic leading-[1.1] font-light mb-12">
              Infant &amp; toddler programs
            </h2>
            <div className="space-y-0">
              {seaMenu.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start justify-between border-b border-[var(--brand-text)]/10 py-6 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-medium italic group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[var(--brand-muted)] mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-xl font-semibold ml-6 whitespace-nowrap italic">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHEF QUOTE: Dark bg, blockquote left, chef portrait right ── */}
      <section className="relative bg-[var(--brand-dark-green)] overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[560px]">
          {/* Left: Mission quote */}
          <motion.div
            {...fadeUp}
            className="flex flex-col justify-center px-8 lg:px-16 py-24 relative z-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                Our Mission
              </p>
            </div>
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] text-white/90 italic leading-[1.3] font-light">
              &ldquo;I am so thankful we found Village Childcare. My son is so
              happy there — he doesn&apos;t want to go home at pickup.&rdquo;
            </blockquote>
            <div className="mt-12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                Daycare Parent
              </p>
              <p className="text-white font-medium text-[15px]">
                Leslie Annie, Parent
              </p>
            </div>
          </motion.div>
          {/* Right: Chef portrait placeholder */}
          <div className="relative min-h-[450px] bg-gradient-to-bl from-[#2A3B2A] via-[#1F2F1F] to-[var(--brand-dark-green)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/[0.06] flex items-center justify-center">
                <p className="text-white/[0.08] text-[10px] uppercase tracking-[0.2em]">
                  Caregiver Image
                </p>
              </div>
            </div>
            {/* Gradient overlay for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark-green)] via-transparent to-transparent w-1/3" />
          </div>
        </div>
      </section>

      {/* ── TRANSITIONAL RAMEN BOWL: Large food image spanning white/dark split ── */}
      <section className="relative">
        <div className="bg-[var(--brand-cream)] h-[180px]" />
        <div className="bg-[var(--brand-dark-green)] h-[180px]" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-[460px] h-[360px] rounded-full bg-gradient-to-br from-[#D4C5A9] via-[#C4B699] to-[#A89878] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.3)] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[55%] h-[55%] rounded-full border border-white/20 flex items-center justify-center">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
                  Sensory Play
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── NEWS & INSIGHTS: Blog cards ── */}
      <section
        id="news"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-dark-green)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center gap-2 mb-5">
              <LeafIcon />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-primary)] font-semibold">
                News &amp; Updates
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] text-white italic leading-[1.15] font-light">
              Daycare news &amp; updates
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Blog image placeholder */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-[#2A3B2A] to-[#1F2F1F] border border-white/[0.06] group-hover:border-[var(--brand-primary)]/30 transition-colors">
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white/[0.08] text-[10px] uppercase tracking-[0.2em]">
                      Update Image
                    </p>
                  </div>
                </div>
                <p className="text-white/30 text-[12px] tracking-wider mb-2">
                  {post.date}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-white/80 text-lg italic leading-snug group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <span className="inline-block mt-3 text-[11px] uppercase tracking-[0.15em] text-[var(--brand-primary)] font-semibold">
                  Read More
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FOOTER: Dark bg, food image, address + links ── */}
      <section
        id="contact"
        className="bg-[var(--brand-dark-green)] border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Food image placeholder */}
            <motion.div {...fadeUp}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2A3B2A] to-[#1F2F1F] border border-white/[0.06] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/[0.08] text-[10px] uppercase tracking-[0.3em]">
                    Play Image
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Right: Headline + contact details */}
            <motion.div {...fadeUp}>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] text-white italic leading-[1.15] font-light mb-10">
                Rated 5 stars by Redmond families
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    2480 SW 37th St
                    <br />
                    Redmond, OR 97756
                  </span>
                </div>
                <a
                  href="mailto:info@villagechildcarellc.com"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                  <span className="text-sm">info@villagechildcarellc.com</span>
                </a>
                <a
                  href="tel:+5033475743"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                  <span className="text-sm">(503) 347-5743</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(503) 347-5743" />
    </>
  );
}
