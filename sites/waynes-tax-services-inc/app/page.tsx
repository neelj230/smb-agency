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
  "Twenty Years. Your Return. Done Right.",
  "We Fix Returns H&R Block Messed Up — Bring Us Your Paperwork",
  "Small Business Tax Prep — Competitive Pricing & Personal Attention",
  "Open Mon–Thu 10AM–6PM — Call to Book Your Appointment",
];

const services = [
  {
    name: "Individual Tax Return Preparation",
    discount: "Fast",
    description: "Accurate, thorough personal tax return filing that maximizes your refund.",
    image: "/photos/placeholder-1.webp",
  },
  {
    name: "Prior Year & Amended Return Correction",
    discount: "Fixed",
    description: "We correct mistakes made by previous preparers, including national chains.",
    image: "/photos/placeholder-2.webp",
  },
  {
    name: "Small Business Tax Preparation",
    discount: "Fair",
    description: "Tax filing for small businesses and sole proprietors at competitive prices.",
    image: "/photos/placeholder-3.webp",
  },
  {
    name: "Year-Round Tax Advice",
    discount: "20+",
    description: "Ongoing tax guidance so you make smart decisions before season arrives.",
    image: "/photos/placeholder-4.webp",
  },
];

const processSteps = [
  {
    icon: Calendar,
    label: "Book Your Appointment",
    description: "Call ahead to reserve your slot — especially during peak tax season.",
  },
  {
    icon: Clock,
    label: "We Review Your Documents",
    description: "Bring your W-2s, 1099s, and prior returns. We handle the rest.",
  },
  {
    icon: Wrench,
    label: "We Prepare Your Return",
    description: "Wayne's team files accurately and identifies every deduction you're owed.",
  },
  {
    icon: ThumbsUp,
    label: "Satisfaction Guaranteed",
    description: "Fast electronic filing and a team you can trust year after year.",
  },
];

const reviews = [
  {
    text: "Wonderful people, goes above and beyond. Fixed a return H&R Block messed up and couldn't fix from prior years.",
    author: "Derek Quick",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Wayne and his team have always taken great care of myself and my friends! Thank you for 20yrs of reliable advice, great service and fast returns!",
    author: "Stephanie Every",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Wayne & his Team have Great Service & Prices, Thank You so much for soo many years.",
    author: "DC Smith Enterprises",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Wayne's tax service has helped me for years. They are knowledgeable, respectful and have fair prices.",
    author: "Frofro Z",
    location: "Hillsboro, OR",
    rating: 5,
  },
  {
    text: "Twenty years of clients coming back says everything. Wayne knows his clients by name and treats every return like it matters.",
    author: "Long-Term Client",
    location: "Washington County, OR",
    rating: 5,
  },
  {
    text: "Finally found a tax preparer I can trust. Honest pricing, knowledgeable staff, and they actually pick up the phone.",
    author: "Local Business Owner",
    location: "Hillsboro, OR",
    rating: 5,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fast Refund Processing",
    description:
      "Electronic filing and efficient preparation designed to get your refund back quickly.",
  },
  {
    icon: Wind,
    title: "Error Correction Experts",
    description:
      "We identify and fix mistakes from prior preparers, including national chain errors.",
  },
  {
    icon: Shield,
    title: "20+ Years of Trust",
    description:
      "Clients return year after year because Wayne's team delivers consistent, reliable results.",
  },
  {
    icon: Thermometer,
    title: "Fair, Transparent Pricing",
    description:
      "Local, relationship-based rates — no franchise markup, no surprises on your bill.",
  },
];

const businessContact = {
  name: "Wayne's Tax Services Inc",
  address: "970 SW Baseline St",
  city: "Hillsboro",
  state: "OR",
  zip: "97123",
  phone: "(503) 681-0801",
  email: "",
  hours: {
    Monday: "10:00 AM – 6:00 PM",
    Tuesday: "10:00 AM – 6:00 PM",
    Wednesday: "10:00 AM – 6:00 PM",
    Thursday: "10:00 AM – 6:00 PM",
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
                  Wayne&apos;s Tax
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
                Twenty Years. Your Return. Done Right.
              </h1>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-white text-[var(--brand-text)] px-7 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                  File My Taxes Now
                  <span className="w-7 h-7 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                    <span className="text-white text-xs">&rarr;</span>
                  </span>
                </a>
              </div>
              <div className="mt-10 border-l-2 border-[var(--brand-primary)] pl-5">
                <p className="text-white/70 text-base max-w-md leading-relaxed">
                  Wayne's Tax Services has handled returns for Hillsboro families for over 20 years — even fixing ones other preparers got wrong.
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
              Tax Prep Done Right in Hillsboro
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Wayne's Tax Services Inc has been a fixture in Hillsboro, Oregon for over two decades, built on a simple promise: treat every client like family and get their taxes done right. From individual returns to small business filings, Wayne and his team even fix returns other preparers got wrong. Stop by at 970 SW Baseline St or reach out year-round for advice.
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
                Our Simple Tax Process
              </h2>
              <p className="mt-4 text-[var(--brand-muted)] leading-relaxed max-w-md">
                Getting your taxes done with Wayne&apos;s is simple and fast. Follow
                these easy steps to get the expert help you need.
              </p>
              <div className="mt-8 aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden" />
            </motion.div>

            {/* Right: 2 feature cards */}
            <motion.div {...fadeUp} className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "20+ Years of Trust",
                  description:
                    "Wayne has been serving Hillsboro families for over two decades. Clients return year after year for his reliable, personal service.",
                },
                {
                  icon: UserCheck,
                  title: "Error Correction Experts",
                  description:
                    "We fix returns other preparers got wrong — including mistakes from national chains like H&R Block.",
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
              Wayne&apos;s Tax Services
              <br />
              What We Offer
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
                  <p className="text-[var(--brand-primary)] font-bold text-xl lg:text-2xl mb-2 uppercase tracking-wider">
                    {service.discount}
                  </p>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 border border-gray-200 text-[var(--brand-text)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    Get Started
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
              Why Choose Wayne's Tax Services?
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
                      Wayne and his team bring over two decades of tax preparation
                      experience and personal attention to every client relationship.
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
              Why People Choose Wayne's Tax Services?
            </h2>
            <p className="text-[var(--brand-muted)] mb-10 leading-relaxed">
              Guiding principles that shape our approach to tax preparation,
              ensuring accurate returns and personal attention for every client.
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
              Wayne built his tax practice the old-fashioned way — one client at
              a time, one honest return at a time. When Derek Quick came in with a
              botched return that H&amp;R Block had fumbled, Wayne&apos;s team stepped in
              and made it right.
            </p>
            <p className="text-[var(--brand-muted)] leading-relaxed mb-10">
              For more than 20 years, Wayne has offered Hillsboro families and
              small businesses something the national chains can&apos;t manufacture:
              genuine familiarity, fair prices, and someone who actually knows
              your name when you walk through the door.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--brand-primary)]">
                  3.9★
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Google Rating
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                  500+
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  Clients Served
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
              Top-Tier Tax Service
              <br />
              You Can Count On
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden" />
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
                At Wayne&apos;s Tax Services, we do more than just prepare returns —
                we build lasting relationships with our clients through honest
                work and fair prices.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                From the moment you call to the final filing, our team is
                committed to accuracy, transparency, and getting your refund
                back as fast as possible.
              </p>
              <div className="space-y-4">
                {[
                  "Proven Expertise You Can Count On",
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
              target: 20,
              suffix: "+",
              label: "Years serving Hillsboro families and small businesses.",
            },
            {
              target: 500,
              suffix: "+",
              label:
                "Clients served over two decades of tax preparation.",
            },
            {
              target: 11,
              suffix: "",
              label: "Verified customer reviews on Google.",
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

      <ClickToCall phone="(503) 681-0801" />
    </>
  );
}
