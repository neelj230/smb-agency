// REFERENCE: HANDYMAN SERVICE — dark dramatic hero, quote form, dark stats bar, warm amber accent, sliding reviews, minimal text
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Package,
  Settings,
  ClipboardList,
  Search,
  CheckCircle,
  ThumbsUp,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Users,
  Award,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Wrench,
    name: "Plumbing",
    description: "Faucets, pipes, and fixture repairs",
  },
  {
    icon: Zap,
    name: "Electrical",
    description: "Outlets, switches, and lighting",
  },
  {
    icon: Hammer,
    name: "Carpentry",
    description: "Shelves, doors, and trim work",
  },
  {
    icon: Paintbrush,
    name: "Painting",
    description: "Interior and exterior touch-ups",
  },
  {
    icon: Package,
    name: "Assembly",
    description: "Furniture and equipment setup",
  },
  {
    icon: Settings,
    name: "Maintenance",
    description: "Seasonal upkeep and repairs",
  },
];

const processSteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Book",
    description: "Schedule online or call us. It takes under a minute.",
  },
  {
    number: "02",
    icon: Search,
    title: "Assess",
    description: "We inspect the job and give you a clear, honest estimate.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Fix",
    description: "Our pros handle it right the first time. No shortcuts.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Done",
    description: "Walk through with us. You only pay when you are satisfied.",
  },
];

const reviews = [
  {
    text: "Called on a Saturday morning and they were here by noon. Fixed our leaky kitchen faucet in under an hour. Fair price, great work.",
    author: "Mark D.",
    role: "Homeowner",
  },
  {
    text: "They assembled all our IKEA furniture for the new office. Fast, clean, and everything was perfectly level. Highly recommend.",
    author: "Jennifer L.",
    role: "Office Manager",
  },
  {
    text: "Repainted our entire first floor in two days. The crew was polite, covered everything, and left the place spotless.",
    author: "Carlos R.",
    role: "Homeowner",
  },
  {
    text: "Our go-to for anything that breaks. Electrical, plumbing, drywall — they handle it all and always do quality work.",
    author: "Priya S.",
    role: "Property Manager",
  },
  {
    text: "Installed new light fixtures and repaired a broken door frame. On time, on budget. Will use again.",
    author: "Tom H.",
    role: "Homeowner",
  },
];

const stats = [
  { icon: Clock, value: "24/7", label: "Availability" },
  { icon: Zap, value: "5 hrs", label: "Avg Response Time" },
  { icon: Users, value: "2,400+", label: "Jobs Completed" },
  { icon: Award, value: "4.9", label: "Star Rating" },
];

const businessContact = {
  name: "FixRight",
  address: "412 Walnut Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19106",
  phone: "(215) 555-0198",
  email: "hello@fixright.com",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HandymanPage() {
  return (
    <>
      {/* ── HERO (dark, full-height, with nav inside) ── */}
      <section className="relative min-h-[90vh] flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── NAVBAR (transparent, inside hero) ── */}
        <nav className="relative z-50 w-full">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-white">
              Fix<span className="text-[var(--brand-accent)]">Right</span>
            </span>
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
            <a
              href="#contact"
              className="bg-[var(--brand-accent)] text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--brand-accent)]/90 transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </nav>

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-white/80 mb-8"
            >
              <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
              <span>4.9 stars from 180+ reviews</span>
            </motion.div>

            <motion.h1
              className="text-[clamp(2.75rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Your trusted partner for{" "}
              <span className="text-[var(--brand-accent)]">home repairs</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-white/60 text-lg max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              From leaky faucets to full renovations. One call handles it all.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a
                href="#quote"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-gray-900 px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
              >
                Request Free Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+12155550198"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-white/10 transition"
              >
                <Phone className="w-4 h-4" /> (215) 555-0198
              </a>
            </motion.div>

            {/* Phone number prominent display */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-3 text-white/50 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Shield className="w-4 h-4" />
              <span>Licensed &amp; Insured</span>
              <span className="mx-2">|</span>
              <Clock className="w-4 h-4" />
              <span>Same-Day Service Available</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ── */}
      <section
        id="quote"
        className="py-20 lg:py-28 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
              Request your{" "}
              <span className="text-[var(--brand-accent)]">free quote</span>
            </h2>
            <p className="mt-3 text-[var(--brand-muted)] max-w-md mx-auto">
              Tell us what you need and we&apos;ll get back to you within hours.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              className="grid sm:grid-cols-2 gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[var(--brand-text)]"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[var(--brand-text)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[var(--brand-text)]"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(215) 555-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="text-sm font-semibold text-[var(--brand-text)]"
                >
                  Service Type
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition text-[var(--brand-muted)]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[var(--brand-text)]"
                >
                  Describe the Issue
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Tell us a bit about what needs fixing..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[var(--brand-bg-alt)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  Submit Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── DARK STATS BAR ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-12 bg-[var(--brand-primary)]">
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="text-center text-white text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto"
            {...fadeUp}
          >
            Our company is a{" "}
            <span className="text-[var(--brand-accent)]">top-rated</span>{" "}
            service provider
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold leading-tight">
              Get professional handyman services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                className="group bg-[var(--brand-bg-alt)] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--brand-accent)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-accent)]/20 transition-colors">
                  <service.icon className="w-6 h-6 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK PROCESS ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight">
              How does it work?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative bg-white rounded-2xl p-8 text-center shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="absolute top-4 right-5 text-5xl font-extrabold text-[var(--brand-accent)]/10">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-full bg-[var(--brand-accent)] flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS MARQUEE ── */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              Reviews
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold">
              What Clients Say
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-5 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[360px] bg-[var(--brand-bg-alt)] rounded-2xl p-7 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
                <div>
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-primary)]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-white leading-tight max-w-2xl mx-auto"
            {...fadeUp}
          >
            Ready to Get It Fixed?
          </motion.h2>
          <motion.p className="mt-5 text-white/60 max-w-md mx-auto" {...fadeUp}>
            Free estimates. Same-day availability. No job too small.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp}
          >
            <a
              href="tel:+12155550198"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-primary)] px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href="mailto:hello@fixright.com"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-primary)] border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              Fix<span className="text-[var(--brand-accent)]">Right</span>
            </span>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              Philadelphia&apos;s trusted handyman service since 2012.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5">Links</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />{" "}
                {businessContact.address}, {businessContact.city},{" "}
                {businessContact.state} {businessContact.zip}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />{" "}
                {businessContact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />{" "}
                {businessContact.email}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 FixRight Handyman. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(215) 555-0198" />
    </>
  );
}
