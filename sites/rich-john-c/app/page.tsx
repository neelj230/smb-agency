// REFERENCE: HEATFIX HVAC — big hero image overlay, orange-red accent, marquee ticker, service cards with discount badges, floating testimonial cards, accordion why-choose, benefits with icons, horizontal testimonial scroll
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
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const marqueeItems = [
  {
    text: "Honest Counsel, Real Results —",
    link: "#contact",
    cta: "Get Your Case Assessment!",
  },
  {
    text: "Facing Criminal Charges? Don't Wait —",
    link: "tel:+15417524322",
    cta: "Call John Now!",
  },
  {
    text: "Trusted by Clients & Prosecutors Alike —",
    link: "#contact",
    cta: "Schedule a Consultation!",
  },
  {
    text: "Defense Built Around Your Goals — Free Case Review",
    link: "#contact",
    cta: "Talk to John Today!",
  },
];

const services = [
  {
    name: "Criminal Defense Representation",
    discount: 0,
    description: "Comprehensive defense built around your specific goals and circumstances.",
    icon: ShieldCheck,
    hasImage: false,
  },
  {
    name: "Defense Strategy & Case Building",
    discount: 0,
    description: "John listens deeply, then constructs a strategy tailored to what you want to achieve.",
    icon: Wrench,
    hasImage: false,
  },
  {
    name: "Plea Negotiation & Agreements",
    discount: 0,
    description: "Leveraging deep prosecutor relationships to negotiate favorable outcomes.",
    icon: Award,
    hasImage: false,
  },
  {
    name: "Court Representation",
    discount: 0,
    description: "Experienced courtroom advocacy with composure and preparation under pressure.",
    icon: Gauge,
    hasImage: true,
  },
];

const processSteps = [
  {
    icon: CalendarCheck,
    title: "Schedule a Consultation",
    description:
      "Reach out by phone or contact form to set up a time that works for you. John is accessible and responsive.",
  },
  {
    icon: Clock,
    title: "John Listens First",
    description:
      "Before building any strategy, John takes the time to fully hear your account and understand your goals.",
  },
  {
    icon: Gauge,
    title: "Honest Case Assessment",
    description:
      "You'll receive a straight, realistic evaluation of your case — no speculation, no empty promises.",
  },
  {
    icon: CheckCircle,
    title: "Defense Built Around You",
    description: "John constructs and executes a defense strategy shaped entirely around your specific circumstances and objectives.",
  },
];

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Reachable Throughout Your Case",
    description:
      "John stays accessible between appointments and before court — unlike attorneys who go dark until the last moment.",
  },
  {
    icon: Award,
    title: "Respected on Both Sides of the Courtroom",
    description:
      "After 17 years of cross-examination by local prosecution professionals, John is called 'hands down the best defense attorney in the area.'",
  },
];

const whyChooseItems = [
  {
    title: "Integrity Over Empty Promises",
    description:
      "John won't tell you what you want to hear — he tells you what you need to know. That honesty leads to the most realistic and favorable outcomes possible.",
  },
  {
    title: "Truly Listens to You",
    description:
      "Clients consistently say John really heard what they were saying before building a defense — a rarity in legal representation.",
  },
  {
    title: "Trusted by Peers & Prosecutors",
    description:
      "The respect John has earned across the aisle translates directly into stronger negotiations and better results for his clients.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Realistic Expectations",
    description:
      "John gives you an honest assessment upfront so you're never blindsided by outcomes or surprised by the process.",
  },
  {
    icon: Wind,
    title: "Goals-Driven Defense",
    description:
      "Your defense strategy is shaped around what you actually want to achieve, not a generic one-size-fits-all playbook.",
  },
  {
    icon: Wrench,
    title: "Skilled Negotiator",
    description:
      "Deep relationships with local prosecutors allow John to reach favorable negotiated agreements when that's the right path.",
  },
  {
    icon: Thermometer,
    title: "Consistent Communication",
    description:
      "John stays reachable throughout your entire case — no going dark, no unanswered calls, no surprises on court day.",
  },
];

const reviews = [
  {
    text: "Great results and responsiveness in a less than favorable quandary. A real level headed, honest, and trustworthy defense attorney. He won't promise something based on speculation alone. He gets my respect for his integrity in a field where that is unfortunately not common enough.",
    author: "Jacob Parker",
    role: "Verified Client",
  },
  {
    text: "Having been cross examined by him for 17 years I can say he is hands down the best defense attorney in the area. Always said if I ever needed a defense attorney I would call John.",
    author: "K Mills",
    role: "Legal Professional, Corvallis",
  },
  {
    text: "Super fabulous caring lawyer. Went above and beyond.",
    author: "Roberta W.",
    role: "Verified Client",
  },
  {
    text: "So far he's been awesome. From what I can tell he really heard what I was saying, then built a defense based on what I wanted. He answers his phone and shows up prepared.",
    author: "#1Threat2HumanityAKA**USA",
    role: "Verified Client",
  },
  {
    text: "Best attorney you can get!",
    author: "Skyler Shire",
    role: "Verified Client",
  },
  {
    text: "John Rich isn't the attorney who tells you what you want to hear — he's the one who tells you what you need to know. That level of honesty and integrity is exactly what you want in your corner.",
    author: "Verified Client",
    role: "Criminal Defense Client, Corvallis",
  },
];

const heroTestimonials = [
  {
    text: "He won't promise something based on speculation alone. That kind of integrity is rare in this field — and it's exactly what leads to the best possible outcomes.",
    author: "Jacob Parker",
    role: "Happy Client",
  },
  {
    text: "Having been cross examined by him for 17 years, I can say he is hands down the best defense attorney in the area.",
    author: "K Mills",
    role: "Happy Client",
  },
  {
    text: "He really heard what I was saying, then built a defense based on what I wanted. John Rich is the real deal.",
    author: "Verified Client",
    role: "Happy Client",
  },
];

const businessContact = {
  name: "Rich John C",
  address: "455 SW Madison Ave",
  city: "Corvallis",
  state: "OR",
  zip: "97333",
  phone: "(541) 752-4322",
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
              className="flex items-center gap-2 text-white text-sm font-medium whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              <span>{item.text}</span>
              <span className="font-bold underline underline-offset-2">
                {item.cta}
              </span>
              <span className="mx-4 text-white/40">|</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--brand-accent)] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--brand-text)]">
              Rich <span className="text-[var(--brand-accent)]">John C</span>
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
            CONTACT US <ArrowUpRight className="w-4 h-4" />
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
                Honest Defense Counsel in Corvallis.
              </motion.h1>
              <motion.p
                className="mt-5 text-white/70 text-lg max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                John Rich won&apos;t promise something based on speculation alone.
                That level-headed honesty is what leads to the most favorable outcomes.
              </motion.p>
              <motion.a
                href="#contact"
                className="mt-8 inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Request a Consultation <ArrowUpRight className="w-4 h-4" />
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
              <ShieldCheck className="w-24 h-24 text-slate-400/50" />
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              — Who We Are
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
              Straightforward Criminal Defense
            </h2>
            <p className="mt-5 text-[var(--brand-muted)] leading-relaxed max-w-lg">
              John Rich isn't the attorney who tells you what you want to hear — he's the one who tells you what you need to know. In a field where overpromising is practically a business model, John has built his reputation differently. Clients who've faced him in court for 17 years call him hands down the best defense attorney around.
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
              Our Simple Intake Process
            </h2>
            <p className="mt-3 text-[var(--brand-muted)] max-w-lg mx-auto">
              Getting legal representation with John Rich is straightforward. Follow
              these easy steps.
            </p>
          </motion.div>

          {/* Feature highlight cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-[var(--brand-accent)] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <card.icon className="w-7 h-7 text-white/80" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-sm">
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
              Discover Honest Legal Defense
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
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-extrabold text-[var(--brand-accent)]">
                      {service.discount}
                    </span>
                    <span className="text-2xl font-extrabold text-[var(--brand-accent)]">
                      %
                    </span>
                    <span
                      className={`text-sm font-bold ml-1 ${service.hasImage ? "text-white/70" : "text-[var(--brand-muted)]"}`}
                    >
                      OFF
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
                    Consult now <ArrowRight className="w-3.5 h-3.5" />
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
              Why Choose Rich John C?
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
              Why Honest Legal Counsel?
            </motion.h2>
            <motion.p
              className="text-[var(--brand-muted)] mb-10 max-w-md"
              {...fadeUp}
            >
              Guiding principles that shape John&apos;s approach to defense,
              ensuring honest counsel and the best possible outcomes.
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
            Schedule Your Consultation Now
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
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                Rich <span className="text-[var(--brand-accent)]">John C</span>
              </span>
            </div>
            <h3 className="text-lg font-bold mb-3">Experienced Defense Attorney</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Honest counsel and real results in Corvallis, OR. John Rich
              brings integrity to every case he takes on.
            </p>
          </div>

          {/* Col 2: CTA */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              Let's Talk Your Defense
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Whether you're facing criminal charges or need an honest case assessment, John is ready to help.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition"
            >
              Request a Consultation <ArrowUpRight className="w-4 h-4" />
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
            &copy; 2026 Rich John C — Defense Attorney, Corvallis, OR. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(541) 752-4322" />
    </>
  );
}
