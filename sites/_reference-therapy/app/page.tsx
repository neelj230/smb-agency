// REFERENCE: THERAPY/COUNSELING — Mindify reproduction. Calm serif typography, sage/brown palette, rectangular overlapping sections, therapist tags, mission statement focus.
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Star,
  Brain,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = ["About Me", "Services", "How It Works", "Testimonials"];

const heroTags = [
  { label: "Convenient", top: "12%", right: "-6%" },
  { label: "Caring", bottom: "22%", left: "-5%" },
  { label: "Confidential", bottom: "8%", right: "8%" },
];

const specialties = [
  "Anxiety & Stress",
  "Depression",
  "Trauma & PTSD",
  "Relationship Issues",
  "Self-Esteem",
  "Life Transitions",
  "Grief & Loss",
  "Burnout",
];

const services = [
  {
    title: "Individual Therapy",
    description:
      "One-on-one sessions tailored to your unique needs, helping you navigate life's challenges with personalized strategies and compassionate support.",
    image: null,
  },
  {
    title: "Couples Therapy",
    description:
      "Strengthen your relationship through improved communication, deeper understanding, and renewed connection with your partner.",
    image: null,
  },
  {
    title: "Family Therapy",
    description:
      "Address family dynamics and build healthier patterns of connection, communication, and mutual understanding together.",
    image: null,
  },
];

const steps = [
  {
    number: "01",
    title: "Book a Session",
    description:
      "Choose a time that works for you. Our scheduling is flexible to fit your life.",
  },
  {
    number: "02",
    title: "Initial Consultation",
    description:
      "We get to know you, your goals, and what you're hoping to achieve in therapy.",
  },
  {
    number: "03",
    title: "Begin Your Journey",
    description:
      "Start regular sessions from the comfort of your home. Progress at your own pace.",
  },
];

const reviews = [
  {
    text: "I finally feel like myself again. The space they created made it easy to be honest and vulnerable. Truly life-changing.",
    author: "Amanda M.",
  },
  {
    text: "The online format was so much more comfortable than I expected. I felt heard and supported from the very first session.",
    author: "Robert K.",
  },
  {
    text: "As a couple, we were stuck. After three months, we communicate in ways we never thought possible.",
    author: "J. & T.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function MindifyPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)]/90 backdrop-blur-md border-b border-[var(--brand-primary)]/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--brand-primary)]">
            <Brain className="w-6 h-6" />
            Mindify
          </span>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-[var(--brand-primary)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
          >
            Book A Session
          </a>
        </div>
      </nav>

      {/* ── HERO — split layout ── */}
      <section className="min-h-[90vh] flex items-center pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-block bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-8">
              Online Therapy
            </span>
            <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--brand-text)]">
              Find peace.
              <br />
              Find yourself.
            </h1>
            <p className="mt-8 text-[var(--brand-muted)] text-lg leading-relaxed max-w-md">
              Professional online therapy designed to help you rediscover
              balance and happiness — on your terms.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                Book A Session <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right — image with floating tags */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Therapist photo placeholder */}
            <div className="aspect-[3/4] max-h-[560px] rounded-3xl bg-[var(--brand-bg-alt)] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-accent)]/10 via-transparent to-[var(--brand-primary)]/10" />
              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[var(--brand-primary)]/10" />
            </div>

            {/* Floating tag pills */}
            {heroTags.map((tag, i) => (
              <motion.span
                key={tag.label}
                className="absolute bg-white shadow-lg shadow-black/5 text-[var(--brand-text)] text-xs font-medium px-4 py-2.5 rounded-full whitespace-nowrap"
                style={{
                  top: tag.top,
                  bottom: tag.bottom,
                  left: tag.left,
                  right: tag.right,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)] -mt-1 rounded-t-[2rem]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <h2 className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-[family-name:var(--font-display)] font-medium leading-[1.3] text-[var(--brand-text)]">
              Embrace psychological support to guide your life in the right
              direction, bringing peace of mind and emotional stability.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── MEET YOUR THERAPIST ── */}
      <section
        id="about-me"
        className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] -mt-1 rounded-t-[2rem] z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-[var(--brand-accent)] text-xs font-medium tracking-wider uppercase mb-4">
              About Me
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.15]">
              Meet Your Therapist
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Therapist photo placeholder */}
            <motion.div
              {...fadeUp}
              className="aspect-[4/5] rounded-2xl bg-[var(--brand-bg-alt)] overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--brand-primary)]/5" />
            </motion.div>

            {/* Therapist info */}
            <motion.div {...fadeUp}>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-medium text-[var(--brand-text)] mb-2">
                Dr. Sarah Chen
              </h3>
              <p className="text-[var(--brand-accent)] text-sm font-medium mb-6">
                Licensed Clinical Psychologist, PhD
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
                With over 12 years of experience, I specialize in helping
                individuals navigate anxiety, depression, and life transitions.
                My approach combines evidence-based techniques with genuine
                compassion.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                I believe therapy should feel safe, accessible, and empowering.
                Every session is a step toward the life you deserve.
              </p>

              {/* Specialty tags */}
              <p className="text-xs font-medium tracking-wider uppercase text-[var(--brand-text)] mb-4">
                Specialties
              </p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-4 py-2 rounded-full bg-[var(--brand-primary)]/8 text-[var(--brand-primary)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — overlapping cards ── */}
      <section
        id="services"
        className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)] -mt-6 rounded-t-[2rem] z-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-medium tracking-wider uppercase mb-4">
              What I Offer
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.15]">
              Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group bg-[var(--brand-bg)] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500"
                style={{ marginTop: i * 24 }}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-[var(--brand-cream)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-accent)]/5 to-[var(--brand-primary)]/10 group-hover:opacity-70 transition-opacity duration-500" />
                </div>
                <div className="p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium mb-3 text-[var(--brand-text)]">
                    {service.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[var(--brand-primary)] text-sm font-medium mt-5 group-hover:gap-2.5 transition-all duration-300"
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-primary)] text-white -mt-6 rounded-t-[2rem] z-30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-white/50 text-xs font-medium tracking-wider uppercase mb-4">
              The Process
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.15]">
              How It Works
            </h2>
            <p className="mt-6 text-white/60 max-w-md mx-auto leading-relaxed">
              Getting started is simple. Three steps to feeling better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="border border-white/15 rounded-2xl p-8 relative"
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="text-5xl font-[family-name:var(--font-display)] font-bold text-white/10 absolute top-6 right-8">
                  {step.number}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-medium mb-3 mt-8">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="testimonials"
        className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] -mt-1 rounded-t-[2rem] z-40"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-medium tracking-wider uppercase mb-4">
              Kind Words
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.15]">
              What Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-8"
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-[var(--brand-muted)] text-xs font-medium tracking-wide uppercase">
                  {review.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section
        id="contact"
        className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)] -mt-1 rounded-t-[2rem] z-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-medium leading-[1.15] text-[var(--brand-text)]">
              Begin Your Journey
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed max-w-md mx-auto">
              The first step is often the hardest. Book a free 15-minute
              consultation — no pressure, just a conversation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12155550193"
                className="inline-flex items-center justify-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                <Phone className="w-4 h-4" /> (215) 555-0193
              </a>
              <a
                href="mailto:hello@mindifytherapy.com"
                className="inline-flex items-center justify-center gap-2 border border-[var(--brand-primary)]/20 text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-bg)] transition-colors"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            {...fadeUp}
            className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <p className="text-sm text-[var(--brand-text)] font-medium">
                220 Walnut St, Suite 300
              </p>
              <p className="text-xs text-[var(--brand-muted)]">
                Philadelphia, PA 19106
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <p className="text-sm text-[var(--brand-text)] font-medium">
                Mon — Fri, 8am — 7pm
              </p>
              <p className="text-xs text-[var(--brand-muted)]">
                Saturday by appointment
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <p className="text-sm text-[var(--brand-text)] font-medium">
                Most insurance accepted
              </p>
              <p className="text-xs text-[var(--brand-muted)]">
                Sliding scale available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 lg:px-12 bg-[var(--brand-text)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-medium text-white">
            <Brain className="w-5 h-5" />
            Mindify
          </span>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-white/30 text-xs">
            &copy; 2026 Mindify Therapy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
