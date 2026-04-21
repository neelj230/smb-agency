"use client";

import { Navbar } from "@/components/Navbar";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ParallaxImage } from "@/components/ParallaxImage";
import type { NavLink, Review, FAQItem, Service } from "@/components/types";
import { motion } from "framer-motion";
import {
  Gauge,
  ShieldCheck,
  Fuel,
  Zap,
  Wrench,
  Car,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    name: "Diagnostics",
    description:
      "On-the-spot diagnosis — often without plugging in a single code reader.",
    icon: "gauge",
  },
  {
    name: "Brakes & Rotors",
    description:
      "Pads, rotors, calipers. Done in your driveway in a couple of hours.",
    icon: "shield-check",
  },
  {
    name: "Fuel Pumps",
    description:
      "Car won't start? Fuel pump replacements done on-site, same day.",
    icon: "fuel",
  },
  {
    name: "Ignition & Electrical",
    description:
      "Batteries, alternators, starters, ignition switches. I bring the tools.",
    icon: "zap",
  },
  {
    name: "Sensors & Emissions",
    description:
      "O2 sensors, catalytic converters, check engine light — fixed properly.",
    icon: "wrench",
  },
  {
    name: "Roadside Repair",
    description:
      "Broken down? Call and I'll come to you. Phoenix metro, day or night.",
    icon: "car",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gauge: Gauge,
  "shield-check": ShieldCheck,
  fuel: Fuel,
  zap: Zap,
  wrench: Wrench,
  car: Car,
};

const reviews: Review[] = [
  {
    text: "Steve is professional, friendly and communicative. His pricing is also very fair. He worked on my BMW X5, did the diagnostics, ordered the parts for me. He was able to fix my O2 sensors and brakes quickly, for about a 3rd of what another shop was going to charge me.",
    author: "N B",
    rating: 5,
    source: "google",
  },
  {
    text: "By far the best in Phoenix AZ!! Stevie came out quick to take care of my engine problem. He was very professional and did a great job! I will always call Stevie from now on.",
    author: "Paul Coya",
    rating: 5,
    source: "google",
  },
  {
    text: "Once again Stevie you came thru when I needed my car fixed. Fast and friendly and gets the job done. Thanks again for fixing my car. AZ you need this mechanic in your life.",
    author: "Brenda Guerrero",
    rating: 5,
    source: "google",
  },
  {
    text: "Absolutely amazing experience, called and had me sorted for a part and labor for less than half what I was being quoted for just the part everywhere else. Work was done even faster than expected and double checked everything before hitting the road.",
    author: "AbyssalPrimarch",
    rating: 5,
    source: "google",
  },
  {
    text: "I called Steve and he was able to find the problem right away. Without using a code finder he diagnosed it and told me it was the fuel pump that went bad. He fixed it pretty quick and explained and showed me what was wrong with the old one.",
    author: "Josue lozano",
    rating: 5,
    source: "google",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you actually come to me?",
    answer:
      "Yes. Driveway, parking lot, roadside — wherever the vehicle is. I work across the Phoenix metro.",
  },
  {
    question: "How does your pricing compare to a shop?",
    answer:
      "Customers regularly say jobs cost a third to half of what a shop quoted. No bays, no front desk, no markup on top of markup.",
  },
  {
    question: "What kind of jobs can you do on-site?",
    answer:
      "Brakes, fuel pumps, batteries, alternators, starters, ignition switches, O2 sensors, catalytic converters — most jobs that don't require a lift.",
  },
  {
    question: "Are you available after hours?",
    answer:
      "Text or call anytime. If I can get to you, I will. Emergency roadside is a regular part of what I do.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Call or text with the make, model, and what's wrong. I'll usually have a ballpark within a few minutes.",
  },
];

const business = {
  name: "Stevie's Mobile Mechanic",
  address: "18049 N 13th Ave",
  city: "Phoenix",
  state: "AZ",
  zip: "85023",
  phone: "(602) 654-6118",
  email: "",
  hours: {
    Monday: "Open 24 hours",
    Tuesday: "Open 24 hours",
    Wednesday: "Open 24 hours",
    Thursday: "Open 24 hours",
    Friday: "Open 24 hours",
    Saturday: "Open 24 hours",
    Sunday: "Open 24 hours",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Dark hero split → Orange marquee → Dark stats → Full-bleed parallax about →
//                 Dark services grid → Light reviews (contrast) → Light FAQ → Dark contact → Footer

export default function StevieMobileMechanicPage() {
  return (
    <>
      <Navbar
        businessName="Stevie's"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+16026546118"
        variant="dark"
      />

      {/* ── HERO: Dark split — text left, photo right ── */}
      <section className="relative bg-[var(--brand-bg-dark)] text-[var(--brand-text-invert)] min-h-screen grid md:grid-cols-[1.1fr_1fr] overflow-hidden grain">
        {/* Corner registration marks for industrial feel */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase z-10">
          N 33.65° / W 112.09°
        </div>

        {/* Left: Text */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-28 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="stat-badge">24/7</span>
              <span className="stat-badge">Phoenix, AZ</span>
              <span className="stat-badge stat-badge-solid">
                4.4 ★ · 27 reviews
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6.5rem)] font-bold tracking-tight leading-[0.92]">
              Your driveway.
              <br />
              <span className="text-[var(--brand-primary)]">My shop.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/60 max-w-md leading-relaxed">
              Mobile mechanic serving Phoenix. Brakes, fuel pumps, batteries,
              diagnostics — done where your car is parked.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+16026546118"
                className="px-7 py-4 bg-[var(--brand-primary)] text-black font-semibold hover:bg-[var(--brand-primary-soft)] transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (602) 654-6118
              </a>
              <a
                href="#services"
                className="px-7 py-4 border border-white/20 text-white font-semibold hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors"
              >
                What I Fix →
              </a>
            </div>
            <div className="mt-14 flex items-center gap-6 font-mono text-[11px] text-white/40 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Accepting calls
              </span>
              <span className="hidden sm:inline">Est. Response · 30 min</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Hero photo */}
        <div className="relative overflow-hidden min-h-[55vh] md:min-h-0 border-l border-white/5">
          <motion.img
            src="/photos/mobile-tire-change-suv.webp"
            alt="Stevie mid tire change on a Phoenix street"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-bg-dark)] via-transparent to-transparent md:w-24" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Caption */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
            Job #0427 · N Phoenix · Rear passenger
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER — orange bar of services ── */}
      <div className="bg-[var(--brand-primary)] text-black border-y border-black">
        <MarqueeTicker
          items={[
            "BRAKES",
            "FUEL PUMPS",
            "BATTERIES",
            "ALTERNATORS",
            "DIAGNOSTICS",
            "O2 SENSORS",
            "IGNITION",
            "ROADSIDE",
            "CATALYTIC",
            "24/7",
          ]}
          separator="◆"
          speed={45}
          variant="bold"
          className="py-4"
        />
      </div>

      {/* ── STATS: Dark, big animated numbers ── */}
      <section className="bg-[var(--brand-bg-dark)] text-white py-24 lg:py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <span className="eyebrow">01 — By the Numbers</span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
              Honest diagnostics. Fair prices.
              <br />
              <span className="text-white/40">Where the car is parked.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8 border-t border-white/10 pt-14">
            {[
              { target: 4.4, suffix: "★", label: "Google Rating" },
              { target: 27, suffix: "+", label: "Verified Reviews" },
              { target: 24, suffix: "/7", label: "Availability" },
              {
                target: 33,
                prefix: "~",
                suffix: "%",
                label: "Of Shop Pricing",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-l border-white/10 pl-6"
              >
                <p className="font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--brand-primary)]">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </p>
                <p className="mt-4 font-mono text-[11px] text-white/50 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT: Full-bleed parallax with overlay ── */}
      <section className="relative">
        <ParallaxImage
          src="/photos/oil-filter-service.webp"
          alt="Engine service mid-job"
          speed={0.2}
          overlay
          overlayOpacity={0.7}
          containerClassName="h-[85vh]"
        >
          <div className="flex items-center h-[85vh] px-8 md:px-16 lg:px-24">
            <motion.div {...fadeUp} className="max-w-3xl text-white">
              <span className="eyebrow">02 — About</span>
              <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                A mechanic who shows up, diagnoses by ear, and charges what the
                job costs.
              </h2>
              <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                Stevie runs a one-man mobile operation out of North Phoenix. No
                bays, no front desk, no markup on top of markup. Dead battery at
                6am, fuel pump on the freeway, brakes grinding in the Target
                parking lot — call and he&apos;ll come to you.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs text-white/50 uppercase tracking-[0.18em]">
                <span>
                  <span className="text-[var(--brand-primary)]">—</span>{" "}
                  Phoenix Metro
                </span>
                <span>
                  <span className="text-[var(--brand-primary)]">—</span> One-Man
                  Shop
                </span>
                <span>
                  <span className="text-[var(--brand-primary)]">—</span>{" "}
                  On-Site Work
                </span>
              </div>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── SERVICES: Dark grid with industrial cards ── */}
      <section
        id="services"
        className="bg-[var(--brand-bg-dark)] text-white py-24 lg:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <span className="eyebrow">03 — Services</span>
              <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl leading-[1.05]">
                What I fix on-site.
              </h2>
            </div>
            <p className="text-white/50 text-sm max-w-xs font-mono tracking-wide">
              Most jobs that don&apos;t require a lift. If it can be fixed in a
              driveway, I can fix it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon || "wrench"] || Wrench;
              return (
                <motion.div
                  key={i}
                  className="service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="service-card-icon">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-white/30 tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                    {service.name}
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-14 text-center">
            <p className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
              Something not on the list? Text and I&apos;ll let you know.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS: Light cream break for contrast ── */}
      <div id="reviews" className="bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto px-6 pt-24 lg:pt-32">
          <motion.div {...fadeUp}>
            <span className="eyebrow">04 — Reviews</span>
          </motion.div>
        </div>
        <TestimonialCarousel
          reviews={reviews}
          variant="scroll"
          heading="What customers actually say"
        />
      </div>

      {/* ── FAQ: Light cream break ── */}
      <div id="faq" className="bg-[var(--brand-bg-alt)]">
        <div className="max-w-3xl mx-auto px-6 pt-24 lg:pt-32">
          <motion.div {...fadeUp} className="text-center">
            <span className="eyebrow">05 — FAQ</span>
          </motion.div>
        </div>
        <FAQAccordion items={faqItems} heading="Common questions" />
      </div>

      {/* ── CONTACT: Dark with big orange CTA ── */}
      <section
        id="contact"
        className="bg-[var(--brand-bg-dark)] text-white py-24 lg:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <span className="eyebrow">06 — Contact</span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
              Car acting up?{" "}
              <span className="text-[var(--brand-primary)]">Call Stevie.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-14">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3 text-white/50 font-mono text-xs uppercase tracking-[0.2em]">
                  <Phone className="w-4 h-4" /> Phone
                </div>
                <a
                  href="tel:+16026546118"
                  className="block font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold hover:text-[var(--brand-primary)] transition-colors"
                >
                  (602) 654-6118
                </a>
                <p className="mt-3 text-white/50 text-sm">
                  Text is fine. Photos of the issue help.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3 text-white/50 font-mono text-xs uppercase tracking-[0.2em]">
                  <Clock className="w-4 h-4" /> Hours
                </div>
                <p className="text-2xl font-[family-name:var(--font-display)] font-semibold">
                  Open 24 / 7
                </p>
                <p className="mt-2 text-white/50 text-sm">
                  Overnight response is common. If I can get to you, I will.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3 text-white/50 font-mono text-xs uppercase tracking-[0.2em]">
                  <MapPin className="w-4 h-4" /> Service Area
                </div>
                <p className="text-xl font-semibold">Phoenix Metro</p>
                <p className="mt-2 text-white/50 text-sm font-mono">
                  Based: 18049 N 13th Ave · Phoenix, AZ 85023
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-black/50 border border-white/10 overflow-hidden relative grain">
                <img
                  src="/photos/engine-pulley-closeup.webp"
                  alt="Engine repair detail"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <a
                    href="tel:+16026546118"
                    className="block text-center px-8 py-5 bg-[var(--brand-primary)] text-black font-bold text-lg hover:bg-[var(--brand-primary-soft)] transition-colors"
                  >
                    Call Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer business={business} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(602) 654-6118" />
    </>
  );
}
