// REFERENCE: LUXURY CAR DEALERSHIP — full-bleed hero image, dark palette, car catalog cards with specs, elegant serif headings, gold accent, testimonial carousel, FAQ accordion, 4-step process
"use client";

import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Star,
  ChevronDown,
  Gauge,
  Zap,
  Car,
  Instagram,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Cars", href: "#cars" },
  { label: "Rental Terms", href: "#rental-terms" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const cars = [
  {
    name: "Porsche 911 GT3 RS",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    topSpeed: "320 km/h",
    acceleration: "3.2 sec",
    horsepower: "520 hp",
    price: "$1,100/day",
    transmission: "PDK",
    type: "Sports",
    brand: "Porsche",
  },
  {
    name: "Mercedes-AMG GT",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    topSpeed: "318 km/h",
    acceleration: "3.5 sec",
    horsepower: "577 hp",
    price: "$800/day",
    transmission: "Automatic",
    type: "Grand Tourer",
    brand: "Mercedes",
  },
  {
    name: "Audi R8 V10",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    topSpeed: "330 km/h",
    acceleration: "3.4 sec",
    horsepower: "562 hp",
    price: "$1,100/day",
    transmission: "S tronic",
    type: "Supercar",
    brand: "Audi",
  },
  {
    name: "Aston Martin Vantage",
    image:
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
    topSpeed: "314 km/h",
    acceleration: "3.6 sec",
    horsepower: "503 hp",
    price: "$800/day",
    transmission: "Automatic",
    type: "Sports",
    brand: "Aston Martin",
  },
];

const rentalRequirements = [
  { value: "21 years", label: "Minimum age" },
  { value: "2 documents", label: "Passport and Driver's License" },
  { value: "1 year", label: "Of driving experience" },
  { value: "From $1,000", label: "Security deposit" },
];

const reviews = [
  {
    text: "Picked up a Porsche 911 for the weekend. Flawless condition, delivered right to my hotel. Luxerra made the whole experience effortless.",
    author: "James K.",
    role: "Weekend Rental",
  },
  {
    text: "Rented the AMG GT for a business trip. Arrived in 90 minutes, spotless inside and out. Will be using Luxerra every time I visit LA.",
    author: "Sarah M.",
    role: "Business Trip",
  },
  {
    text: "Wedding day car was perfect. The Aston Martin looked incredible in photos. Staff was professional and on time. Highly recommend.",
    author: "David L.",
    role: "Wedding Rental",
  },
  {
    text: "Third time renting with Luxerra. Consistent quality, transparent pricing, and their support team is available around the clock. Best in LA.",
    author: "Nicole R.",
    role: "Returning Client",
  },
  {
    text: "First luxury rental experience and Luxerra set the bar high. The R8 was a dream to drive along the coast. Absolutely worth it.",
    author: "Marcus T.",
    role: "First-Time Renter",
  },
  {
    text: "Used Luxerra for a corporate event. Four cars, all delivered on time, all in perfect condition. Impressive logistics and service.",
    author: "Elena V.",
    role: "Corporate Event",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Choose your car",
    description: "Pick the premium model that suits your style and plans.",
  },
  {
    number: "02",
    title: "Contact Us",
    description: "Confirm availability and request a free quote.",
  },
  {
    number: "03",
    title: "Confirm & Secure",
    description: "Send documents, pay deposit and we'll handle the rest.",
  },
  {
    number: "04",
    title: "Drive in Style",
    description:
      "We deliver your car straight to your door in just 90 minutes.",
  },
];

const benefits = [
  {
    title: "Fully insured, no surprises",
    description:
      "Your rental includes full coverage, so you can drive with complete peace of mind.",
  },
  {
    title: "Clear pricing, no hidden fees",
    description:
      "What you see is what you pay. No unexpected charges after your trip.",
  },
  {
    title: "Car to your door in 90 minutes",
    description:
      "Skip the trip to the rental office — we bring the car straight to you.",
  },
  {
    title: "24/7 customer support",
    description:
      "Whatever happens on the road, we're here to help at any time, day or night.",
  },
];

const faqs = [
  {
    q: "What are the terms and conditions for using the car?",
    a: "Our vehicles must be used in accordance with all local traffic laws and may only be driven by registered, licensed drivers. A security deposit is required at the time of booking.",
  },
  {
    q: "Can I drive the car outside the city?",
    a: "Yes, you may drive the vehicle outside the city limits, provided that the route is within the permitted regions outlined in your rental agreement.",
  },
  {
    q: "What is your fuel policy?",
    a: "The vehicle is provided with a full tank and must be returned with a full tank. If the car is returned with less fuel, a refueling charge will apply.",
  },
  {
    q: "Can the car be decorated for a wedding?",
    a: "Absolutely. We allow wedding decorations as long as they do not damage the vehicle. Please coordinate with our team in advance.",
  },
  {
    q: "Do you offer a driver service?",
    a: "Yes, a professional chauffeur service is available upon request. Please let us know at the time of booking.",
  },
  {
    q: "What happens if I return the car late?",
    a: "In case of a late return, additional fees will apply according to our hourly or daily rate. If you anticipate a delay, contact us as soon as possible.",
  },
];

const businessContact = {
  name: "Luxerra",
  address: "8500 Sunset Blvd, Suite 210",
  city: "Los Angeles",
  state: "CA",
  zip: "90069",
  phone: "+1 (323) 555-7842",
  email: "info@luxerra.com",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium pr-8">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-muted)] transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function LuxerraPage() {
  return (
    <>
      {/* ── HERO (full-bleed image, dark overlay) ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80)",
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        {/* ── NAVBAR ── */}
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-wide text-white"
            >
              Luxerra
            </a>
            <div className="hidden md:flex items-center gap-10">
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
                href="https://instagram.com"
                className="text-white/60 hover:text-white transition-colors hidden sm:block"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://whatsapp.com"
                className="text-white/60 hover:text-white transition-colors hidden sm:block"
                aria-label="WhatsApp chat"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+13235557842"
                className="text-white/60 hover:text-white transition-colors hidden sm:block"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors ml-2"
              >
                Book Now
              </a>
            </div>
          </div>
        </nav>

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex-1 flex items-end pb-24 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-white/60 text-sm mb-6"
            >
              <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
              <span>Chosen by more than 250 clients</span>
            </motion.div>

            <motion.h1
              className="text-[clamp(3rem,8vw,6rem)] font-[family-name:var(--font-display)] font-semibold leading-[1.0] tracking-[-0.02em] text-white max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Premium Car Rental in Los Angeles
            </motion.h1>

            <motion.p
              className="mt-6 text-white/60 text-lg max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Experience unmatched comfort, style, and service — wherever the
              road takes you.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a
                href="#cars"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/90 transition group"
              >
                Choose Your Car{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAR CATALOG ── */}
      <section
        id="cars"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-[family-name:var(--font-display)] font-semibold leading-tight mb-16"
            {...fadeUp}
          >
            Choose Your Ride
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {cars.map((car, i) => (
              <motion.div
                key={car.name}
                className="group bg-[var(--brand-bg-alt)] rounded-2xl overflow-hidden border border-[var(--brand-border)] hover:border-white/20 transition-colors duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Car image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${car.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg-alt)] to-transparent" />
                  {/* Specs overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                      <Gauge className="w-4 h-4 text-[var(--brand-accent)] mx-auto mb-1" />
                      <p className="text-xs text-white/80">{car.topSpeed}</p>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                      <Zap className="w-4 h-4 text-[var(--brand-accent)] mx-auto mb-1" />
                      <p className="text-xs text-white/80">
                        {car.acceleration}
                      </p>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                      <Car className="w-4 h-4 text-[var(--brand-accent)] mx-auto mb-1" />
                      <p className="text-xs text-white/80">{car.horsepower}</p>
                    </div>
                  </div>
                </div>

                {/* Car info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-[family-name:var(--font-display)] font-semibold">
                      {car.name}
                    </h3>
                    <span className="text-[var(--brand-accent)] text-sm font-medium whitespace-nowrap ml-4">
                      from {car.price}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-[var(--brand-muted)] mb-5">
                    <span>{car.transmission}</span>
                    <span className="text-white/20">|</span>
                    <span>{car.type}</span>
                    <span className="text-white/20">|</span>
                    <span>{car.brand}</span>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-[var(--brand-accent)] transition-colors group/link"
                  >
                    Learn More{" "}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RENTAL TERMS ── */}
      <section
        id="rental-terms"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: heading + assistant */}
            <motion.div {...fadeUp}>
              <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-[family-name:var(--font-display)] font-semibold leading-tight mb-6">
                Rental Terms
              </h2>
              <p className="text-[var(--brand-muted)] leading-relaxed max-w-md mb-8">
                We&apos;re here for you — ready to help find the perfect car
                that matches your needs.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-amber-600" />
                <div>
                  <p className="font-semibold text-sm">Michael Carter</p>
                  <p className="text-[var(--brand-muted)] text-xs">
                    Your Personal Rental Assistant
                  </p>
                </div>
              </div>
              <a
                href="tel:+13235557842"
                className="inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition"
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </motion.div>

            {/* Right: requirement cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {rentalRequirements.map((req, i) => (
                <motion.div
                  key={req.label}
                  className="bg-[var(--brand-bg)] rounded-xl p-6 border border-[var(--brand-border)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-2xl font-[family-name:var(--font-display)] font-semibold mb-2">
                    {req.value}
                  </p>
                  <p className="text-[var(--brand-muted)] text-sm">
                    {req.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (marquee) ── */}
      <section
        id="reviews"
        className="py-24 lg:py-32 bg-[var(--brand-bg)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 text-[var(--brand-muted)] text-sm mb-4">
              <Star className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
              <span>Chosen by more than 250 clients</span>
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-[family-name:var(--font-display)] font-semibold leading-tight max-w-lg">
              Read Testimonials, Ride with Confidence
            </h2>
          </motion.div>
        </div>

        <div className="testimonial-marquee flex gap-5 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-[var(--brand-bg-alt)] rounded-2xl p-7 border border-[var(--brand-border)]"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--brand-accent)]/30 to-[var(--brand-accent)]/60" />
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

      {/* ── HOW TO RENT (4 steps) ── */}
      <section
        id="how-to-rent"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-[family-name:var(--font-display)] font-semibold leading-tight mb-16 text-center"
            {...fadeUp}
          >
            Get Rolling in 4 Steps
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative bg-[var(--brand-bg)] rounded-xl p-8 border border-[var(--brand-border)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-6xl font-[family-name:var(--font-display)] font-bold text-white/5 absolute top-4 right-4">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center mb-5">
                  <span className="text-[var(--brand-accent)] text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-[family-name:var(--font-display)] font-semibold leading-tight mb-16"
            {...fadeUp}
          >
            Premium service, zero hassle
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="flex gap-4 p-6 rounded-xl bg-[var(--brand-bg-alt)] border border-[var(--brand-border)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-[clamp(2rem,4.5vw,3rem)] font-[family-name:var(--font-display)] font-semibold leading-tight mb-12 text-center"
            {...fadeUp}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div {...fadeUp}>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] relative overflow-hidden"
      >
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-[family-name:var(--font-display)] font-semibold leading-[1.05] max-w-3xl mx-auto"
            {...fadeUp}
          >
            Book your premium car and have it delivered in 90 minutes
          </motion.h2>

          <motion.div
            className="mt-6 flex items-center justify-center gap-4 text-[var(--brand-muted)] text-sm"
            {...fadeUp}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-amber-600" />
            <div className="text-left">
              <p className="text-white text-sm font-medium">Michael Carter</p>
              <p className="text-xs">Your Personal Rental Assistant</p>
            </div>
          </motion.div>

          <motion.div className="mt-10" {...fadeUp}>
            <a
              href="tel:+13235557842"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold hover:bg-white/90 transition group"
            >
              Book Now{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto">
          {/* Top: Logo + Social */}
          <div className="flex items-center justify-between mb-16">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              Luxerra
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://whatsapp.com"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="WhatsApp chat"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+13235557842"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle: Address, Phone, Email in big type */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                Office Address (08 AM - 10 PM)
              </p>
              <a
                href="https://maps.google.com"
                className="text-lg font-[family-name:var(--font-display)] hover:text-[var(--brand-accent)] transition-colors"
              >
                {businessContact.address}, {businessContact.city},{" "}
                {businessContact.state} {businessContact.zip}
              </a>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                Phone
              </p>
              <a
                href="tel:+13235557842"
                className="text-lg font-[family-name:var(--font-display)] hover:text-[var(--brand-accent)] transition-colors"
              >
                {businessContact.phone}
              </a>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                Email
              </p>
              <a
                href="mailto:info@luxerra.com"
                className="text-lg font-[family-name:var(--font-display)] hover:text-[var(--brand-accent)] transition-colors"
              >
                {businessContact.email}
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                Company
              </p>
              <div className="space-y-3">
                <a
                  href="#cars"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Cars
                </a>
                <a
                  href="#rental-terms"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Rental Terms
                </a>
                <a
                  href="#how-to-rent"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  How To Rent
                </a>
                <a
                  href="#reviews"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                Help
              </p>
              <div className="space-y-3">
                <a
                  href="#contact"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Book a Car
                </a>
                <a
                  href="#faq"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                Newsletter
              </p>
              <p className="text-white/60 text-sm mb-4">
                Join our mailing list and never miss an update!
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 bg-[var(--brand-bg-alt)] border border-[var(--brand-border)] rounded-full px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-accent)] transition"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[var(--brand-border)]">
            <p className="text-white/30 text-sm text-center">
              &copy; 2026 Luxerra. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
