// Willpower Electric, LLC — Medford, OR — Solar & Electrical Services
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Thermometer,
  Wind,
  Snowflake,
  Flame,
  Wrench,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Star,
  ChevronDown,
  Zap,
  CheckCircle,
  Users,
  Award,
  Droplets,
  Gauge,
  CalendarCheck,
  HeartHandshake,
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

const marqueeItems = [
  {
    text: "Go Solar & Cut Your Electric Bill to Almost Nothing —",
    link: "#contact",
    cta: "Get a Free Quote!",
  },
  {
    text: "Battery Backup Systems — Stay Powered When the Grid Goes Down",
    link: "#contact",
    cta: "Learn More!",
  },
  {
    text: "EV Charging Station Installation —",
    link: "#contact",
    cta: "Book Today!",
  },
  {
    text: "End-to-End Solar: Design, Permits, Utility Coordination & Tax Credits —",
    link: "#contact",
    cta: "We Handle It All!",
  },
];

const services = [
  {
    name: "Residential Solar",
    metric: "10.35 kW",
    metricLabel: "largest home system",
    description: "Grid-tied rooftop and ground-mounted solar design and installation, sized to your roof, shading, and goals.",
    icon: Wrench,
    hasImage: false,
  },
  {
    name: "Battery Backup",
    metric: "24/7",
    metricLabel: "outage coverage",
    description: "Solar-integrated storage that keeps your home running and recharges from panels even when the grid is down.",
    icon: Snowflake,
    hasImage: false,
  },
  {
    name: "Commercial Solar",
    metric: "7.92 kW",
    metricLabel: "reference system",
    description: "Rooftop arrays for commercial buildings — engineered framing, weatherproofed mounting, real generation output.",
    icon: Wind,
    hasImage: false,
  },
  {
    name: "EV Charging",
    metric: "ChargePoint",
    metricLabel: "certified installer",
    description: "Level 2 charging stations for home garages and business parking — full electrical panel work included.",
    icon: Flame,
    hasImage: true,
  },
];

const processSteps = [
  {
    icon: CalendarCheck,
    title: "Book Your Consultation",
    description:
      "Contact us and Bruce will come out within 48 hours for a thorough on-site quote and honest assessment of your energy needs.",
  },
  {
    icon: Clock,
    title: "We Design Your System",
    description:
      "Our team designs a solar or electrical solution tailored to your home's orientation, shading, and energy goals.",
  },
  {
    icon: Gauge,
    title: "Professional Installation",
    description:
      "We handle every detail of the installation — from panel mounting to wiring — with precision and care.",
  },
  {
    icon: CheckCircle,
    title: "Permits, Utility & Tax Credits",
    description:
      "We coordinate with Pacific Power, handle state permitting, and file your Oregon solar tax credits so you don't have to.",
  },
];

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Honest, Transparent Pricing",
    description:
      "Willpower Electric tells you the truth even when it costs them a sale. No unnecessary upsells — just fair, straightforward pricing.",
  },
  {
    icon: Award,
    title: "End-to-End Expertise",
    description:
      "From initial consultation and system design to utility coordination and tax credit filing, we manage every step of your project.",
  },
];

const whyChooseItems = [
  {
    title: "One-call honesty",
    description:
      "Bruce once told a homeowner her wiring was fine after a competitor quoted a full replacement. That's the default here — truth first, sale second.",
  },
  {
    title: "On-site in 48 hours",
    description:
      "Quotes are done in person, within two days of your call. No gatekeeping dispatchers, no weeks of waiting for a callback.",
  },
  {
    title: "$300 to $38",
    description:
      "One customer's bill dropped from over $300 a month to $38 after a 7.92 kW install with an AllEarth tracker — even through smoke and clouds.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Dramatically Lower Bills",
    description:
      "Solar customers have seen electric bills drop from over $300 a month to as low as $38 — even through clouds and smoke.",
  },
  {
    icon: Wind,
    title: "Energy Independence",
    description:
      "Battery backup systems keep your home running independently during outages, continuously recharged by your solar array.",
  },
  {
    icon: Wrench,
    title: "Honest Diagnostics",
    description:
      "Where others quote costly wire replacements, Bruce has solved the same problems in 10 minutes at a reasonable price.",
  },
  {
    icon: Thermometer,
    title: "Full Carbon Neutrality",
    description:
      "Willpower Electric has helped homeowners go fully carbon neutral within 12 months of installation in Southern Oregon.",
  },
];

const reviews = [
  {
    text: "Bruce came out within 48 hours of my call and provided a thorough quote and explanation of our home's electric needs. He was kind and professional and we will highly recommend his business to our friends and family.",
    author: "Kayla Rapet",
    role: "Homeowner, Rogue Valley",
  },
  {
    text: "This month marks 1 year since the installation of the 10.35 kW grid tied solar electric system at my residence in Talent, OR. I couldn't be happier! Despite the smoke, it generated as much as we consumed.",
    author: "Joseph Wismann",
    role: "Homeowner, Talent, OR",
  },
  {
    text: "We love our Allearth tracker and our first bill went from 300 plus dollars to 38 dollars a month even dealing with clouds and smoke! Willpower's expertise and technology made our solar experience stellar in every way.",
    author: "Gary Riley",
    role: "Homeowner, Southern Oregon",
  },
  {
    text: "I inherited a solar system and had very little knowledge. Bruce returned my call promptly and spent 30 minutes on the phone explaining the basics of solar power just because it was the right thing to do.",
    author: "Bridgette Extraordiaire",
    role: "Tiny Home Owner",
  },
  {
    text: "It took him 10 minutes to solve my electrical problem. He was professional, efficient and explained everything. The price was reasonable — another estimate told me I had to have wires replaced entirely.",
    author: "Pamela Arrington",
    role: "Homeowner, Medford Area",
  },
];

const heroTestimonials = [
  {
    text: "Bruce came out within 48 hours and provided a thorough quote and explanation of our home's electric needs. Kind, professional, and genuinely helpful.",
    author: "Kayla Rapet",
    role: "Medford Homeowner",
  },
  {
    text: "Our first bill went from $300+ to just $38 a month. Willpower's expertise made our solar experience stellar in every way.",
    author: "Gary Riley",
    role: "Medford Homeowner",
  },
  {
    text: "Willpower Electric has been our go-to for solar. Honest, reliable, and they handle every detail from design through tax credit filing.",
    author: "Joseph Wismann",
    role: "Medford Homeowner",
  },
];

const businessContact = {
  name: "Willpower Electric, LLC",
  address: "24 Ehrman Way",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 535-3965",
  email: "",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const [openAccordion, setOpenAccordion] = useState(0);

  return (
    <>
      {/* ── MARQUEE TICKER BANNER ── */}
      <div className="bg-[var(--brand-accent)] py-2.5 overflow-hidden">
        <div className="marquee-ticker flex gap-12 w-max">
          {[
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="flex items-center gap-2 text-[var(--brand-text)] text-sm font-medium whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              <span>{item.text}</span>
              <span className="font-bold underline underline-offset-2">
                {item.cta}
              </span>
              <span className="mx-4 text-[var(--brand-text)]/40">|</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--brand-accent)] rounded-lg flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--brand-text)]">
              Willpower<span className="text-[var(--brand-accent)]"> Electric</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-[var(--brand-accent)] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition flex items-center gap-2"
          >
            GET A QUOTE <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* ── HERO — Big image overlay with floating testimonials ── */}
      <section className="relative mx-4 lg:mx-6 rounded-3xl overflow-hidden min-h-[85vh] flex flex-col justify-end">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJWMGgydjM0em0tNCAwSDE4VjBoMTR2MzR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero content */}
        <div className="relative z-10 px-8 lg:px-16 pb-16 lg:pb-20 pt-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">
            <div className="max-w-2xl">
              <motion.h1
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Real Power. Real Savings. Medford.
              </motion.h1>
              <motion.p
                className="mt-5 text-white/70 text-lg max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Solar installation, battery backup, and honest electrical service for homes and businesses across the Rogue Valley.
              </motion.p>
              <motion.a
                href="#contact"
                className="mt-8 inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Get Started Now <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Floating testimonial cards */}
            <motion.div
              className="hidden lg:flex flex-col gap-4 max-w-sm"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {heroTestimonials.slice(0, 2).map((t, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500" />
                    <div>
                      <p className="text-white text-sm font-semibold">
                        — {t.author}, {t.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative"
            {...fadeUp}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ij48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] flex items-center justify-center">
              <Thermometer className="w-24 h-24 text-slate-400/50" />
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              — Who We Are
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
              Solar & Electrical Solutions
            </h2>
            <p className="mt-5 text-[var(--brand-muted)] leading-relaxed max-w-lg">
              Willpower Electric is led by Bruce, who personally handles every consultation, design, and installation. One customer&apos;s 4,000 sq ft home dropped from a $300+ electric bill to $38 a month. That&apos;s what honest, expert solar work looks like.
            </p>
            <a
              href="#services"
              className="mt-8 inline-flex items-center gap-2 text-[var(--brand-accent)] font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING PROCESS ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
              Our Simple Process
            </h2>
            <p className="mt-3 text-[var(--brand-muted)] max-w-lg mx-auto">
              Getting started with Willpower Electric is simple and fast. Follow
              these easy steps.
            </p>
          </motion.div>

          {/* Feature highlight cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-[var(--brand-accent)] rounded-3xl p-8 lg:p-10 text-[var(--brand-text)] relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-black/10 flex items-center justify-center">
                  <card.icon className="w-7 h-7 text-[var(--brand-text)]/80" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-[var(--brand-text)]/80 text-sm leading-relaxed max-w-sm">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Process steps grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="bg-white rounded-2xl p-7 relative group hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-accent)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-accent)]/20 transition-colors">
                  <step.icon className="w-6 h-6 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES WITH DISCOUNT BADGES ── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
              Discover Expert Electrical Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                className={`group rounded-3xl overflow-hidden relative ${
                  service.hasImage
                    ? "bg-gradient-to-br from-slate-600 to-slate-800 text-white row-span-1"
                    : "bg-[var(--brand-bg-alt)] hover:shadow-lg"
                } transition-all`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-4">{service.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-[var(--brand-accent)] block leading-none">
                      {service.metric}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider mt-1 inline-block ${service.hasImage ? "text-white/70" : "text-[var(--brand-muted)]"}`}
                    >
                      {service.metricLabel}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${service.hasImage ? "text-white/70" : "text-[var(--brand-muted)]"}`}
                  >
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition ${
                      service.hasImage
                        ? "bg-white text-[var(--brand-text)] hover:bg-white/90"
                        : "bg-[var(--brand-primary)] text-white hover:opacity-90"
                    }`}
                  >
                    Book now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — Accordion + Image ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight mb-10"
              {...fadeUp}
            >
              Why Choose Willpower Electric?
            </motion.h2>
            <div className="space-y-4">
              {whyChooseItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <h3 className="text-base font-bold">{item.title}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--brand-muted)] transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {openAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[var(--brand-muted)] text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative hidden lg:block"
            {...fadeUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-24 h-24 text-slate-400/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden relative"
            {...fadeUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Wind className="w-24 h-24 text-[var(--brand-accent)]/30" />
            </div>
          </motion.div>
          <div>
            <motion.h2
              className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight mb-4"
              {...fadeUp}
            >
              Why Go Solar With Us?
            </motion.h2>
            <motion.p
              className="text-[var(--brand-muted)] mb-10 max-w-md"
              {...fadeUp}
            >
              Guiding principles that shape our approach to comfort, ensuring
              unparalleled service and results.
            </motion.p>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">{benefit.title}</h3>
                    <p className="text-[var(--brand-muted)] text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS HORIZONTAL SCROLL ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg-alt)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold">
              What Our Clients Say
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-5 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-200 to-orange-400" />
                <div>
                  <p className="text-sm font-bold">{review.author}</p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {review.role}
                  </p>
                </div>
              </div>
              <p className="text-[var(--brand-text)] text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / CTA SECTION ── */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight text-center mb-16"
            {...fadeUp}
          >
            Book Your Electrical Service Now
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div {...fadeUp} className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] mb-2">
                  Office Address:
                </p>
                <p className="text-[var(--brand-text)] font-medium">
                  {businessContact.address}, {businessContact.city},{" "}
                  {businessContact.state} {businessContact.zip}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] mb-2">
                  Email Address:
                </p>
                <a
                  href={`mailto:${businessContact.email}`}
                  className="text-[var(--brand-accent)] font-medium hover:underline"
                >
                  {businessContact.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] mb-2">
                  Phone Number:
                </p>
                <a
                  href={`tel:${businessContact.phone}`}
                  className="text-[var(--brand-accent)] font-medium hover:underline"
                >
                  {businessContact.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] mb-2">
                  Follow Us:
                </p>
                <div className="flex gap-3 mt-2">
                  {["Facebook", "Twitter", "LinkedIn"].map((social) => (
                    <div
                      key={social}
                      className="w-10 h-10 rounded-full bg-[var(--brand-bg-alt)] flex items-center justify-center text-[var(--brand-muted)] text-xs font-bold"
                    >
                      {social[0]}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              className="bg-[var(--brand-bg-alt)] rounded-3xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Type your email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  GET A CALL BACK <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-primary)] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Col 1: Brand + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--brand-accent)] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                Willpower<span className="text-[var(--brand-accent)]"> Electric</span>
              </span>
            </div>
            <h3 className="text-lg font-bold mb-3">Solar & Electrical Experts</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Serving the Rogue Valley with honest solar installation, battery backup, EV charging, and electrical panel service.
            </p>
          </div>

          {/* Col 2: CTA */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              Let's Talk Electrical Solutions
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Whether you need a solar quote or same-week electrical service, our team is ready to help.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              Get Started Now <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Col 3: Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Pages</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-white/50 text-sm hover:text-white transition-colors"
              >
                Home
              </a>
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
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 Willpower Electric, LLC. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(541) 535-3965" />
    </>
  );
}
