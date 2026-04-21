// REFERENCE: TRADES CLEAN — orange accent on white, announcement bar, service cards with discount badges, process steps, stats bar, full-width photo hero
"use client";

import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { NavLink } from "@/components/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Phone,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Play,
  Zap,
  Thermometer,
  Wind,
  Wrench,
  Calendar,
  UserCheck,
  ThumbsUp,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = [
  "Real Talk, Real Repairs, Real Philly.",
  "PA State Inspections — Fast Scheduling, Same-Week Stickers",
  "Upfront Pricing Before Any Work Begins — No Surprises",
  "Oil Changes, Tires, Brakes & More — Mon–Fri 8AM to 6PM",
];

const services = [
  {
    name: "PA State Inspection",
    tag: "Same-week",
    description: "Safety and emissions inspection with fast scheduling — stickers typically back on your windshield within a few days.",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Oil Change",
    tag: "Walk-in",
    description: "Full oil and filter service plus a visual walk-around to catch things before they turn into bigger repair bills.",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Tires & Rotation",
    tag: "Upfront",
    description: "Mounting, balancing, nail repair, and full replacement — scope and price confirmed with you before we touch the car.",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Brake Service",
    tag: "Honest",
    description: "Pads, rotors, and calipers checked and replaced only when they actually need it. If they're fine, we tell you.",
    image: "/photos/photo-6.webp",
  },
];

const processSteps = [
  {
    icon: Calendar,
    label: "Book Your Service",
    description: "Call ahead or schedule online — most customers are seen within a day or two, with same-day options available.",
  },
  {
    icon: Clock,
    label: "We're Ready on Time",
    description: "Drop off your vehicle and our experienced team gets to work promptly, respecting your schedule.",
  },
  {
    icon: Wrench,
    label: "Honest Diagnosis",
    description: "We inspect your vehicle, explain what we find, and walk you through all repair options and costs before any work begins.",
  },
  {
    icon: ThumbsUp,
    label: "Drive Away Confident",
    description: "Quality work completed on time at a reasonable cost — with staff who treat you like a neighbor, not a ticket number.",
  },
];

const reviews = [
  {
    text: "The guys at Ken's ROCK! First, it's fun to walk into the place. The guys at the front desk are friendly, knowledgeable, and efficient. You'll get an appointment quickly and their excellent work is done on time, at a reasonable cost. No job too small, no problem too big.",
    author: "Ginny Christensen",
    location: "Philadelphia, PA",
    rating: 5,
  },
  {
    text: "The man who helped me was extremely nice and took the time to explain costs upfront as well as different options that would be more cost effective. He went above and beyond checking on different parts of my car to help diagnose the problem. Really solid and honest shop!",
    author: "Kaitlin Petersen",
    location: "Philadelphia, PA",
    rating: 5,
  },
  {
    text: "We love Ken's Automotive!! I recently took my Lexus to Ken's for annual inspection and a maintenance check. They were able to schedule me right away and I had new inspection stickers within a matter of a few days. Way better than dealing with the dealership.",
    author: "William Perry",
    location: "Philadelphia, PA",
    rating: 5,
  },
  {
    text: "They've earned a lifelong customer from me. The staff explained everything before touching my car, offered cost-effective alternatives, and genuinely went out of their way to diagnose the issue properly. That kind of honesty is hard to find.",
    author: "Kaitlin Petersen",
    location: "Philadelphia, PA",
    rating: 5,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most services are completed on time with same-day or next-day scheduling available for common repairs.",
  },
  {
    icon: Wind,
    title: "Upfront Pricing",
    description: "Costs and options are explained before any work begins — no surprise bills, no pressure.",
  },
  {
    icon: Shield,
    title: "Honest Diagnostics",
    description: "The team flags issues they find during routine service and walks you through solutions before acting.",
  },
  {
    icon: Thermometer,
    title: "Neighborhood Feel",
    description: "A 4.8-star shop with 726+ reviews that treats every customer like a regular, not just a work order.",
  },
];

const businessContact = {
  name: "Kens Automotive",
  address: "341 N 10th St",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 829-9898",
  email: "",
  hours: {
    Monday: "8:00 AM – 6:00 PM",
    Tuesday: "8:00 AM – 6:00 PM",
    Wednesday: "8:00 AM – 6:00 PM",
    Thursday: "8:00 AM – 6:00 PM",
    Friday: "8:00 AM – 6:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

function HeroTestimonialCycle({
  reviews,
}: {
  reviews: { text: string; author: string; location: string; rating: number }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div
      className="absolute bottom-8 right-8 lg:bottom-12 lg:right-16 z-20 hidden md:block"
      style={{ perspective: "800px" }}
    >
      <div className="relative w-[380px]">
        {/* Stacked cards behind for depth effect */}
        <div className="absolute inset-0 translate-y-3 translate-x-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 scale-[0.97]" />
        <div className="absolute inset-0 translate-y-6 translate-x-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 scale-[0.94]" />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -30,
              rotateX: -15,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-start gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15"
          >
            <div className="w-14 h-14 rounded-full bg-slate-400 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-xs mb-2">
                — {reviews[activeIndex].author}, {reviews[activeIndex].location}
              </p>
              <p className="text-white text-sm leading-relaxed line-clamp-3">
                &ldquo;{reviews[activeIndex].text}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function BusinessPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* ── ANNOUNCEMENT TICKER ── */}
      <div className="bg-[#1A1A1A] text-white py-2.5 overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-xs tracking-wide flex items-center gap-3"
            >
              {item}
              <span className="text-[var(--brand-primary)]">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO: Full inset with nav INSIDE the rounded rectangle (matching Framer original) ── */}
      <section className="relative pt-4 px-4">
        <div className="relative min-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
          {/* Photo bg placeholder */}
          <img src="/photos/photo-1.webp" alt="Ken's Automotive shop" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* ── NAVBAR (inside hero) ── */}
          <nav className="relative z-20 px-8 lg:px-16 py-5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 text-[var(--brand-primary)]">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59 7.71 6.29a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 001.42 1.42L12 13.41l4.29 4.3a1 1 0 001.42-1.42z" />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  Ken's Auto
                </span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="hidden md:flex items-center gap-2 bg-white text-[var(--brand-text)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                CONTACT US
                <span className="w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </span>
              </a>
              <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-white" aria-label="Menu">
                {mobileNav ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
            <AnimatePresence>
              {mobileNav && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden backdrop-blur-xl bg-black/60 rounded-xl mt-2 mx-4">
                  <div className="flex flex-col py-4 px-6 gap-4">
                    {navLinks.map((link) => (
                      <a key={link.label} href={link.href} onClick={() => setMobileNav(false)} className="text-white/80 hover:text-white text-sm transition-colors">{link.label}</a>
                    ))}
                    <a href="#contact" onClick={() => setMobileNav(false)} className="bg-white text-[var(--brand-text)] px-5 py-2.5 rounded-full text-sm font-semibold text-center">CONTACT US</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* ── HERO CONTENT ── */}
          <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-8 lg:px-16 py-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-[clamp(3.5rem,7vw,6rem)] font-semibold text-white leading-[1.05] tracking-[-0.04em]">
                Real Talk, Real Repairs, Real Philly.
              </h1>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-white text-[var(--brand-text)] px-7 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  Schedule Your Visit
                  <span className="w-7 h-7 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                    <span className="text-white text-xs">&rarr;</span>
                  </span>
                </a>
              </div>
              <div className="mt-10 border-l-2 border-[var(--brand-primary)] pl-5">
                <p className="text-white/70 text-base max-w-md leading-relaxed">
                  Serving Philadelphia drivers at 341 N 10th St — inspections, oil changes, brakes, and more from a shop with 4.8 stars across 726 reviews.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Floating testimonial cards — 3D pop-in cycle (matching Framer) */}
          <HeroTestimonialCycle reviews={reviews} />
        </div>
      </section>

      {/* ── ABOUT: Split — image left, text right ── */}
      <section
        id="about"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="aspect-[4/5] rounded-2xl bg-slate-200 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/photos/photo-2.webp" alt="Inside Ken's Automotive" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--brand-primary)]" />
              WHY WE ARE
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight">
              Auto Repair Done Right in Philly
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Ken's Automotive on North 10th Street has built something rare in Philadelphia: a neighborhood shop with a 4.8-star reputation. Customers keep coming back because the team explains costs upfront and treats every car like their own.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-3 mt-8 bg-[var(--brand-primary)] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition uppercase tracking-wider"
            >
              Learn More
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xs">&rarr;</span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS: Heading + feature cards + 4 step icons ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Heading + image */}
            <motion.div {...fadeUp}>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight">
                Our Simple Drop-Off Process
              </h2>
              <p className="mt-4 text-[var(--brand-muted)] leading-relaxed max-w-md">
                Getting your car serviced at Ken's is straightforward. Follow these steps for hassle-free auto repair.
              </p>
              <div className="mt-8 aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden">
                <img src="/photos/photo-3.webp" alt="Ken's Automotive service process" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </motion.div>

            {/* Right: 2 feature cards */}
            <motion.div {...fadeUp} className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Same-Day Service",
                  description:
                    "Most common repairs and inspections can be scheduled within a day or two, with same-day options often available.",
                },
                {
                  icon: UserCheck,
                  title: "Expert Technicians",
                  description:
                    "Your satisfaction is our priority. From your first call to the final result, we ensure every detail is handled with care.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom: 4 process steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm mb-1">
                  {step.label}
                </h4>
                <p className="text-[var(--brand-muted)] text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES: Large horizontal cards stacked vertically (matching Framer original) ── */}
      <section id="services" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em]">
              Discover Ken's
              <br />
              Automotive Services
            </h2>
          </motion.div>
          <div className="space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 grid md:grid-cols-[1.2fr_1fr] items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="aspect-[4/3] md:aspect-auto md:h-full bg-slate-200 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full min-h-[280px] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-8 lg:p-10">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold mb-4">
                    {service.name}
                  </h3>
                  <p className="text-[var(--brand-primary)] font-bold text-sm mb-4 uppercase tracking-[0.2em]">
                    {service.tag}
                  </p>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 border border-gray-200 text-[var(--brand-text)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    Book Now
                    <span className="w-7 h-7 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                      <span className="text-white text-xs">&rarr;</span>
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE: Split — text slides from left, image from right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight">
              Why Choose Ken's Automotive?
            </h2>
            <div className="mt-10 space-y-8">
              {[
                { title: "Fast scheduling", body: "Most customers are in the bay within a day or two of calling — same-day slots for oil changes are common." },
                { title: "Upfront pricing", body: "You hear the number before we pick up a wrench. Alternatives are offered when they save you money." },
                { title: "Four-year regulars", body: "Customers who come back for inspections, tires, and brakes year after year — because the work holds up." },
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-100 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[var(--brand-muted)] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/photos/photo-7.webp" alt="Why choose Ken's Automotive" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS: Image left, 2x2 icon grid right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            {...fadeUp}
            className="aspect-[4/5] rounded-2xl bg-slate-200 overflow-hidden"
          >
            <img src="/photos/photo-8.webp" alt="Ken's Automotive team at work" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight mb-10">
              Why Philly Chooses Ken's
            </h2>
            <p className="text-[var(--brand-muted)] mb-10 leading-relaxed">
              The values that have earned Ken's Automotive a 4.8-star reputation across 726 reviews — honest diagnostics, fair pricing, and a team that treats every customer like a neighbor.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i}>
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center mb-3">
                    <benefit.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS: Card grid ── */}
      <section id="reviews" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em]">
              What Our Clients Say
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-sm font-semibold">
                      {review.author}
                    </p>
                    <p className="text-xs text-[var(--brand-muted)]">
                      {review.location}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY: Split — text left, image right, stats bottom ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight mb-8">
              Our Story
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
              Ken's is a neighborhood shop on North 10th Street that runs on referrals — William Perry found it through family, Kaitlin Petersen called the experience "a breath of fresh air," and four-year regulars still bring their cars in for every inspection.
            </p>
            <p className="text-[var(--brand-muted)] leading-relaxed mb-10">
              The shop at its best: costs explained before work starts, cost-effective alternatives offered when they fit, and a front desk that walks you through what actually needs fixing instead of what's easiest to upsell.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--brand-primary)]">
                  4.8★
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Google Rating
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                  726+
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Customer Reviews
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="aspect-[4/5] rounded-2xl bg-slate-200 overflow-hidden"
          >
            <img src="/photos/photo-9.webp" alt="Ken's Automotive story" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ── TRUST: Split — image left, text + checklist right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em]">
              4.8 stars. 726 reviews.
              <br />
              One neighborhood shop.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden">
              <img src="/photos/photo-10.webp" alt="Ken's Automotive service bay" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
                The best version of Ken's is the one customers write reviews about — the front desk that takes time to explain, the technician who catches an extra issue during a routine oil change, the honest answer about whether a repair can wait.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                That's the shop that earned 726 reviews and keeps four-year regulars coming back. It's built on conversations before invoices, not the other way around.
              </p>
              <div className="space-y-4">
                {[
                  "Options explained before work starts",
                  "Cost-effective alternatives when they fit",
                  "Straight answers on what actually needs fixing",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              target: 726,
              suffix: "+",
              label: "Customer reviews across Google and beyond.",
            },
            {
              target: 4,
              suffix: "+ yrs",
              label:
                "Loyalty span of repeat customers who keep coming back.",
            },
            {
              target: 5,
              suffix: " days",
              label: "Open Monday through Friday, 8 AM to 6 PM.",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </p>
              <p className="mt-3 text-[var(--brand-muted)] text-sm max-w-[200px] mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VIDEO SECTION: Large image with play button ── */}
      <section className="px-8 lg:px-16 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl bg-slate-300 overflow-hidden group cursor-pointer">
            <img src="/photos/photo-4.webp" alt="Ken's Automotive video backdrop" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </section>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(215) 829-9898" />
    </>
  );
}
