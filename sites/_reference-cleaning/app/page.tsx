// REFERENCE: CLEANING SERVICE — dark navy hero with large bg image, yellow accent, "Get a free quote" card, icon-based spaces section, numbered services with stats, 1-2-3-4 process, sliding reviews
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Store,
  Sparkles,
  Shield,
  Clock,
  Users,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
];

const spaces = [
  {
    icon: Home,
    name: "Home",
    description:
      "Apartments, condos, and houses — busy people who want their home to feel fresh again.",
  },
  {
    icon: Building2,
    name: "Workspace",
    description:
      "Maintain a clean, healthy workspace that supports productivity and professionalism.",
  },
  {
    icon: Store,
    name: "Store",
    description:
      "Retail shops, studios, and showrooms — spotless spaces that make a great impression.",
  },
];

const services = [
  {
    number: "01",
    name: "Home Cleaning",
    tagline: "for homes that deserve better",
    stat: "2 HRS",
    statLabel: "average time for standard clean",
  },
  {
    number: "02",
    name: "Deep Cleaning",
    tagline: "thorough and refreshing",
    stat: "4.9",
    statLabel: "average customer rating",
  },
  {
    number: "03",
    name: "Office Cleaning",
    tagline: "professional spaces, professionally cleaned",
    stat: "98%",
    statLabel: "client satisfaction rate",
  },
  {
    number: "04",
    name: "Move-in / Move-out",
    tagline: "fresh starts and clean finishes",
    stat: "200+",
    statLabel: "happy clients served",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Book online",
    description:
      "Choose a date and time that works for you. Booking takes less than 2 minutes.",
  },
  {
    number: "2",
    title: "We assess",
    description:
      "Our team reviews your space needs and prepares the right cleaning plan.",
  },
  {
    number: "3",
    title: "We clean",
    description:
      "Our trained professionals arrive on time and clean with care and precision.",
  },
  {
    number: "4",
    title: "You enjoy",
    description:
      "Walk into a fresh, spotless space. Guaranteed satisfaction every time.",
  },
];

const whyCards = [
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "Full coverage for your peace of mind.",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "We arrive when we say we will.",
  },
  {
    icon: Users,
    title: "Trained Staff",
    description: "Background-checked, professionally trained team.",
  },
  {
    icon: Sparkles,
    title: "Eco-Friendly",
    description: "Green cleaning products that are safe for your family.",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction Promise",
    description: "Not happy? We'll re-clean for free.",
  },
  {
    icon: Star,
    title: "Consistent Quality",
    description: "The same high standard, every single visit.",
  },
];

const reviews = [
  {
    text: "Neative transformed our office. The team is punctual, thorough, and incredibly professional.",
    author: "Sarah K.",
    role: "Office Manager",
  },
  {
    text: "Best cleaning service in the city. They pay attention to every detail and our home has never looked better.",
    author: "James M.",
    role: "Homeowner",
  },
  {
    text: "We switched to Neative six months ago and haven't looked back. Reliable, affordable, and always spotless.",
    author: "Lisa T.",
    role: "Property Manager",
  },
  {
    text: "The deep cleaning service exceeded all expectations. Every corner was immaculate.",
    author: "David R.",
    role: "Restaurant Owner",
  },
];

const businessContact = {
  name: "Neative",
  address: "789 Sparkle Drive",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 555-0147",
  email: "info@neative.com",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function NeativePage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--brand-accent)]">
            Neative
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Contact us
          </a>
        </div>
      </nav>

      {/* ── HERO: Dark bg with large bg image + yellow-bordered quote card ── */}
      <section className="relative min-h-screen overflow-hidden bg-[#17171A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#17171A] via-[#1A2030] to-[#0D0D10]" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-28 pb-16 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="text-white/60 text-sm">
                  Trusted by 200+ businesses
                </span>
                <ArrowRight className="w-3 h-3 text-white/40" />
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-[#17171A]"
                    />
                  ))}
                </div>
              </motion.div>

              <motion.h1
                className="text-[clamp(3.5rem,7vw,5.5rem)] font-semibold text-white leading-[1.05] tracking-[-0.04em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Clean space starts here
              </motion.h1>

              <motion.p
                className="mt-8 text-white/60 text-lg leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Professional cleaning services for offices, homes, and
                commercial spaces — done right, every time.
              </motion.p>
            </div>

            <motion.div
              className="relative rounded-3xl overflow-hidden border-2 border-[var(--brand-accent)]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#5C4B3A] to-[#2A1E14]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white/80 text-sm mb-1">
                  * 12% discount for first time user
                </p>
                <p className="text-white/80 text-sm mb-5">
                  * 24% discount for repeating clients
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
                >
                  Get a free quote
                  <span className="w-8 h-8 rounded-full bg-[var(--brand-text)] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[var(--brand-accent)]" />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SPACES WE SPECIALIZE IN ── */}
      <section id="about" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-4">
              Who we help
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] max-w-2xl">
              Spaces we
              <br />
              specialize in
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] max-w-lg leading-relaxed">
              We work with busy homeowners, growing businesses, and commercial
              properties who need a space that&apos;s consistently clean and
              well cared for.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 mt-6 text-[var(--brand-text)] text-sm font-medium hover:underline underline-offset-4"
            >
              Know more about us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {spaces.map((space, i) => (
              <motion.div
                key={space.name}
                className="group relative rounded-2xl overflow-hidden bg-[var(--brand-bg-alt)] border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center mb-4">
                    <space.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 uppercase tracking-wider">
                    {space.name}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {space.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES: Numbered horizontal cards ── */}
      <section id="services" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-4">
              Our services
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] max-w-3xl">
              Discover our services and how we do it better.
            </h2>
          </motion.div>

          <div className="space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                className="grid md:grid-cols-[6rem_1fr_12rem_10rem] gap-6 items-center p-6 lg:p-8 rounded-2xl bg-[var(--brand-bg-alt)] hover:shadow-lg transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-gray-200 text-5xl font-light">
                  {service.number}
                </span>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide">
                    {service.name}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm mt-1 italic">
                    {service.tagline}
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-3xl font-bold text-[var(--brand-text)]">
                    {service.stat}
                  </p>
                  <p className="text-[var(--brand-muted)] text-xs mt-1">
                    {service.statLabel}
                  </p>
                </div>
                <div className="hidden md:block w-full h-24 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS: 1-2-3-4 steps ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-4">
              How it works
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light">
              Simple as 1, 2, 3, 4
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 mb-6" />
                <span className="text-[var(--brand-accent)] text-4xl font-bold">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold mt-3 mb-2">{step.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS: 6 benefit cards ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-4">
              Why it works
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light max-w-2xl mx-auto">
              What makes our service different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-8 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS: Sliding marquee ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg-alt)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-12">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-4">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light">
              What our clients say
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-8 shadow-sm border border-gray-50"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500" />
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

      {/* ── CTA + CONTACT ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-primary)]"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-tight max-w-3xl mx-auto"
            {...fadeUp}
          >
            Ready for a cleaner space?
          </motion.h2>
          <motion.p className="mt-6 text-white/60 max-w-md mx-auto" {...fadeUp}>
            Get a free estimate in under 2 minutes. No commitment, no hassle.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp}
          >
            <a
              href="tel:+12155550147"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href="mailto:info@neative.com"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4" /> Get a Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-8 lg:px-16 bg-[var(--brand-primary)] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--brand-accent)]">
              Neative
            </span>
            <div className="mt-6 space-y-2 text-white/60 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {businessContact.address},{" "}
                {businessContact.city}, {businessContact.state}{" "}
                {businessContact.zip}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {businessContact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {businessContact.email}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Get Started</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Book your first cleaning and get 12% off.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-accent)] text-[var(--brand-text)] px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              Free Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            &copy; 2026 Neative. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(215) 555-0147" />
    </>
  );
}
