// REFERENCE: TRADES CLEAN — orange accent on white, announcement bar, service cards with discount badges, process steps, stats bar, full-width photo hero
"use client";

import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { NavLink } from "@/components/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = [
  "Wired Right. Done Right. Ward's Here.",
  "Timely Estimates — Call (503) 439-9666 Today",
  "Gas-to-Electric Conversions Handled with Care",
  "5-Star Rated Electricians Serving Hillsboro, OR",
];

const services = [
  {
    name: "Electrical Troubleshooting & Diagnostics",
    discount: "Fast",
    description: "Systematic diagnosis of complex electrical issues, including hard-to-trace problems like attic fan wiring failures and circuit faults.",
    image: "/photos/service-1.webp",
  },
  {
    name: "Appliance Circuit Installation",
    discount: "Code",
    description: "Installation and wiring for new appliances including electric stovetop conversions from gas, requiring dedicated circuits and code-compliant connections.",
    image: "/photos/service-2.webp",
  },
  {
    name: "Residential Electrical Projects",
    discount: "Pro",
    description: "Full-service residential electrical work for homeowners, from panel upgrades to new outlets, handled with professionalism and clean workmanship.",
    image: "/photos/service-3.webp",
  },
  {
    name: "Electrical Estimates & Consultations",
    discount: "Free",
    description: "Timely, transparent estimates so homeowners know what to expect before any work begins — no surprises, no runaround.",
    image: "/photos/service-4.webp",
  },
];

const processSteps = [
  {
    icon: Calendar,
    label: "Book Your Service",
    description: "Call or reach out during office hours to schedule a convenient appointment or estimate.",
  },
  {
    icon: Clock,
    label: "We Arrive on Time",
    description: "Our licensed electrician will arrive promptly and ready to assess your project.",
  },
  {
    icon: Wrench,
    label: "Expert Problem-Solving",
    description: "We dig into the challenge, present options if complications arise, and get the job done right.",
  },
  {
    icon: ThumbsUp,
    label: "Satisfaction Guaranteed",
    description: "We don't leave until you're genuinely happy with the work and the results.",
  },
];

const reviews = [
  {
    text: "We've used Hillsboro Electric for two different projects recently and they were prompt, thorough, and seemed very reasonably priced. I wanted to especially thank Ward, our electrician, for helping us on our latest project. He helped troubleshoot our challenging attic fan situation and went above and beyond.",
    author: "Leslie Bajuscak",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Best company I've ever been involved with. Smartest and very fast in completing their work as promised 🙌",
    author: "Don Sefert",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "They replaced an electric stove top where we had a gas stove top. Ran into a couple of challenges and their electrician provided options. We are very happy with the final product. Very professional staff. Highly recommend!",
    author: "Tammy Anderson",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Great company 👌 they offer timely estimates and do good work.",
    author: "Luke Swayze",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "We've used Hillsboro Electric for two different projects recently and they were prompt, thorough, and seemed very reasonably priced. Ward is an exceptional electrician who truly goes above and beyond.",
    author: "Leslie Bajuscak",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Best company I've ever been involved with. Smartest and very fast in completing their work as promised. Would not hesitate to call them again.",
    author: "Don Sefert",
    location: "Hillsboro, OR",
    rating: 5,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fair, Transparent Pricing",
    description:
      "Multiple customers call Hillsboro Electric reasonably priced — no hidden fees, no runaround.",
  },
  {
    icon: Wind,
    title: "Complex Problems Solved",
    description:
      "From attic fan wiring to gas-to-electric conversions, they meet complexity with competence.",
  },
  {
    icon: Shield,
    title: "Code-Compliant Work",
    description:
      "Every installation and repair is done to code, keeping your home safe and up to standard.",
  },
  {
    icon: Thermometer,
    title: "Timely Estimates",
    description:
      "Hillsboro Electric respects your time — get a prompt, honest estimate before any work begins.",
  },
];

const businessContact = {
  name: "Hillsboro Electric LLC",
  address: "8285 NE Evergreen Pkwy Suite 110",
  city: "Hillsboro",
  state: "OR",
  zip: "97124",
  phone: "(503) 439-9666",
  email: "info@hillsboroelectric.com",
  hours: {
    Monday: "9:00 AM – 3:00 PM",
    Tuesday: "9:00 AM – 3:00 PM",
    Wednesday: "9:00 AM – 3:00 PM",
    Thursday: "9:00 AM – 3:00 PM",
    Friday: "9:00 AM – 3:00 PM",
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
          <div className="absolute inset-0 bg-slate-800" />
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
                  Hillsboro Electric
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
                className="flex items-center gap-2 bg-white text-[var(--brand-text)] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                CONTACT US
                <span className="w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </span>
              </a>
            </div>
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
                Expert Electrical Solutions in Hillsboro, Oregon.
              </h1>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-white text-[var(--brand-text)] px-7 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  Get Started Now
                  <span className="w-7 h-7 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                    <span className="text-white text-xs">&rarr;</span>
                  </span>
                </a>
              </div>
              <div className="mt-10 border-l-2 border-[var(--brand-primary)] pl-5">
                <p className="text-white/70 text-base max-w-md leading-relaxed">
                  Expert electrical solutions for Hillsboro homes — reliable
                  wiring, troubleshooting, and installations you can trust.
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
          />
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
              Professional Electrical Service You Can Trust
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Hillsboro Electric LLC solves the hard stuff. When Leslie&apos;s attic
              fan situation turned into a head-scratcher, electrician Ward dug in
              and went above and beyond. That&apos;s not a fluke &mdash; it&apos;s how
              every job gets done here.
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
                Our Simple Booking Process
              </h2>
              <p className="mt-4 text-[var(--brand-muted)] leading-relaxed max-w-md">
                Scheduling electrical service is simple and fast. Follow these
                easy steps to get the expert help you need in Hillsboro.
              </p>
              <div className="mt-8 aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden" />
            </motion.div>

            {/* Right: 2 feature cards */}
            <motion.div {...fadeUp} className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Problem-Solving Experts",
                  description:
                    "Complex electrical challenges don't scare us. We present options instead of excuses and solve the actual problem.",
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
              Expert Electrical
              <br />
              Services in Hillsboro
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
                  <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 lg:p-10">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold mb-4">
                    {service.name}
                  </h3>
                  <p className="text-[var(--brand-primary)] font-bold text-3xl lg:text-4xl mb-2">
                    {service.discount}{" "}
                    <span className="text-sm font-semibold text-[var(--brand-text)] uppercase tracking-wider">
                      OFF
                    </span>
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
              Why Choose Hillsboro Electric?
            </h2>
            <div className="mt-10 space-y-8">
              {[
                "Trusted Professionals",
                "On-Time & Reliable",
                "100% Satisfaction",
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-100 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">
                    {item}
                  </h3>
                  {i === 0 && (
                    <p className="mt-2 text-[var(--brand-muted)] text-sm leading-relaxed">
                      Our team is made up of skilled electricians like Ward
                      who bring years of hands-on experience and
                      professionalism to every project.
                    </p>
                  )}
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
          />
        </div>
      </section>

      {/* ── BENEFITS: Image left, 2x2 icon grid right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            {...fadeUp}
            className="aspect-[4/5] rounded-2xl bg-slate-200 overflow-hidden"
          />
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em] leading-tight mb-10">
              Why People Choose Hillsboro Electric?
            </h2>
            <p className="text-[var(--brand-muted)] mb-10 leading-relaxed">
              The values that shape every job we take on &mdash; prompt,
              professional, and reasonably priced electrical work for
              Hillsboro homeowners.
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
              Hillsboro Electric LLC started with a simple goal &mdash; deliver
              reliable, honest electrical work for every home in the area. What
              started as a small, focused team of skilled electricians has grown
              into the most trusted name in Hillsboro.
            </p>
            <p className="text-[var(--brand-muted)] leading-relaxed mb-10">
              From day one, we focused on doing things differently — showing up
              on time, offering fair prices, and treating every customer like
              family. Our founders believed in building long-term relationships,
              not just fixing systems.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--brand-primary)]">
                  4.9/5
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Customer Satisfaction Rate
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                  1000+
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Happy Clients
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="aspect-[4/5] rounded-2xl bg-slate-200 overflow-hidden"
          />
        </div>
      </section>

      {/* ── TRUST: Split — image left, text + checklist right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.035em]">
              Top-Tier Electrical Service
              <br />
              You Can Trust
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden" />
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
                At Hillsboro Electric, we do more than just fix wiring &mdash;
                we build lasting relationships with our customers
                through trust and quality workmanship.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                We believe great electrical service starts with great
                values. From the moment you call to the final inspection, our
                team is committed to integrity, quality, and customer care.
              </p>
              <div className="space-y-4">
                {[
                  "Proven Expertise You Can Trust",
                  "Efficiency That Saves You Money",
                  "Transparent Service, Every Step of the Way",
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
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            {
              target: 5000,
              suffix: "+",
              label: "Homes and businesses served across the region.",
            },
            {
              target: 95,
              suffix: "%",
              label:
                "Customer satisfaction rate with repeat clients and referrals.",
            },
            {
              target: 24,
              suffix: "/7",
              label: "Reliable electrical support when you need it most.",
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

      <ClickToCall phone="(503) 439-9666" />
    </>
  );
}
