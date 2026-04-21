// REFERENCE: YACHT CHARTER — cinematic video hero, boat catalog cards, video overlays, founder story, reviews carousel, premium navy/gold palette
"use client";

import type { NavLink } from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Anchor,
  Ship,
  Shield,
  Clock,
  Star,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Compass,
  Users,
  Gauge,
  Ruler,
  Waves,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
];

const yachts = [
  {
    name: "Azure Spirit",
    type: "Cruiser",
    length: "62 ft",
    speed: "25 knots",
    guests: "Up to 12",
    description:
      "Sleek, modern, and built for comfort — Azure Spirit offers the perfect harmony of elegance and speed, ideal for sunset escapes.",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80&auto=format",
  },
  {
    name: "Seaborn Echo",
    type: "Family",
    length: "48 ft",
    speed: "22 knots",
    guests: "Up to 10",
    description:
      "Spacious accommodations and a sleek hull design make Seaborn Echo the perfect vessel for family adventures on the water.",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80&auto=format",
  },
  {
    name: "Horizon Drift",
    type: "Sport",
    length: "54 ft",
    speed: "30 knots",
    guests: "Up to 8",
    description:
      "Designed for thrill-seekers. Fast, sleek, and bold — your ticket to adrenaline-fueled exploration and hidden coves.",
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80&auto=format",
  },
];

const featuredYacht = {
  name: "Azura 72",
  type: "Flagship",
  length: "72 ft",
  speed: "28 knots",
  guests: "Up to 14",
  description:
    "Refined and elegant, Azura 72 is built for those who seek a balance between luxury and performance. Ideal for longer escapes on the water.",
  image:
    "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80&auto=format",
};

const founderValues = [
  {
    title: "Premium Fleet",
    description:
      "Modern, well-maintained boats tailored for comfort, performance, and style.",
  },
  {
    title: "Effortless Booking",
    description:
      "Reserve your boat in minutes with our simple, user-friendly platform.",
  },
  {
    title: "Safety First",
    description:
      "All boats are safety-checked, insured, and supported by expert staff on call.",
  },
];

const reviews = [
  {
    title: "Totally inspiring!",
    text: "We rented a boat for my birthday and the experience was flawless. From booking to boarding, everything was seamless and the boat was stunning.",
    author: "Emily R.",
    location: "Miami",
    rating: 5,
  },
  {
    title: "Luxury is simple",
    text: "None compare to the comfort and professionalism here. We truly felt like special VIPs from start to finish.",
    author: "Sophie M.",
    location: "Fort Lauderdale",
    rating: 5,
  },
  {
    title: "Perfect day out",
    text: "So easy to plan a perfect family day on the water. The staff was helpful, the boat was spotless, and the kids loved every second.",
    author: "Daniel K.",
    location: "San Diego",
    rating: 5,
  },
  {
    title: "Effortless elegance",
    text: "Every detail felt smooth and perfectly refined. None match the comfort and class of this experience.",
    author: "Daniel R.",
    location: "Miami",
    rating: 5,
  },
  {
    title: "Seamless luxury",
    text: "From booking to boarding, everything was effortless. The crew's professionalism and warmth turned our trip into pure bliss.",
    author: "Olivia T.",
    location: "Palm Beach",
    rating: 5,
  },
  {
    title: "Memories that last",
    text: "Our weekend was transformed into something truly special. Every moment onboard felt exclusive and beautifully crafted.",
    author: "Marcus L.",
    location: "Key West",
    rating: 5,
  },
  {
    title: "Pure sophistication",
    text: "A flawless experience. The yacht, the crew, the atmosphere — everything spoke of elegance and care.",
    author: "Julia S.",
    location: "Naples",
    rating: 5,
  },
  {
    title: "The ultimate escape",
    text: "The perfect blend of comfort and excitement. Luxury made easy, with every need anticipated before we asked.",
    author: "Isabella C.",
    location: "California",
    rating: 5,
  },
];

const businessContact = {
  name: "Yachtera",
  address: "800 Marina Boulevard",
  city: "Fort Lauderdale",
  state: "FL",
  zip: "33316",
  phone: "(954) 555-0280",
  email: "hello@yachtera.com",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

// ─── FEATURED BOAT SLIDER ────────────────────────────────────────────────────

function FeaturedBoatSection() {
  const allBoats = [featuredYacht, ...yachts];
  const [current, setCurrent] = useState(0);
  const boat = allBoats[current];

  const next = () => setCurrent((c) => (c + 1) % allBoats.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + allBoats.length) % allBoats.length);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-dark)]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Boats overview
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            key={boat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white leading-tight tracking-[-0.03em]">
              {boat.name}
            </h2>
            <p className="mt-5 text-white/60 text-base leading-relaxed max-w-md">
              {boat.description}
            </p>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 mt-8 text-[var(--brand-accent)] text-sm font-semibold hover:gap-3 transition-all"
            >
              View More <ChevronRight className="w-4 h-4" />
            </a>

            {/* Specs */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Length
                </p>
                <p className="text-white text-2xl font-semibold">
                  {boat.length}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Top Speed
                </p>
                <p className="text-white text-2xl font-semibold">
                  {boat.speed}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Guests
                </p>
                <p className="text-white text-2xl font-semibold">
                  {boat.guests}
                </p>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="ml-3 text-white/40 text-sm">
                {current + 1} / {allBoats.length}
              </span>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            key={boat.image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img
                src={boat.image}
                alt={boat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--brand-dark)] to-transparent" />
            </div>
            {/* Shadow underneath */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[var(--brand-primary)]/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function YachteraPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO (full-screen video background) ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Video Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
            className="w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)]/80 via-[var(--brand-dark)]/40 to-transparent" />
        </motion.div>

        {/* ── NAVBAR ── */}
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-white">
              YACHTERA
            </span>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="bg-white text-[var(--brand-dark)] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Book A Boat
            </a>
          </div>
        </nav>

        {/* ── HERO CONTENT ── */}
        <motion.div
          className="relative z-10 flex-1 flex items-end pb-24 lg:pb-32 px-6 lg:px-12"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.p
              className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.25em] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium Boat Rentals
            </motion.p>
            <motion.h1
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Unlock the pure joy of boating adventures.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-10"
            >
              <a
                href="#fleet"
                className="inline-flex items-center gap-3 bg-white text-[var(--brand-dark)] px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/90 transition group"
              >
                Explore boats{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT / INTRO ── */}
      <section
        id="about"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Effortless &bull; Adventurous &bull; Premium
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--brand-dark)]">
              We offer a seamless boat rental experience designed for freedom,
              comfort, and discovery.
            </h2>
            <a
              href="#services"
              className="inline-flex items-center gap-2 mt-8 text-[var(--brand-primary)] text-sm font-semibold hover:gap-3 transition-all"
            >
              About Us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          {/* Right */}
          <motion.div {...fadeUp} className="space-y-5">
            <p className="text-[var(--brand-muted)] text-base leading-relaxed">
              Yachtera is more than just a boat rental service — it&apos;s your
              gateway to unforgettable experiences on the water. We started with
              a simple mission: to make boating accessible, stylish, and
              stress-free.
            </p>
            <p className="text-[var(--brand-muted)] text-base leading-relaxed">
              Our passionate boating team is dedicated to safety, comfort, and
              service. Wherever the water calls, Yachtera is here to help you
              answer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED BOAT SLIDER ── */}
      <FeaturedBoatSection />

      {/* ── YACHT CATALOG CARDS ── */}
      <section
        id="fleet"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Discover Our Boats
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--brand-dark)]">
                Find the perfect boat for your next escape.
              </h2>
            </div>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] text-sm font-semibold whitespace-nowrap hover:gap-3 transition-all"
            >
              View all boats <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yachts.map((yacht, i) => (
              <motion.div
                key={yacht.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={yacht.image}
                    alt={yacht.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="spec-pill bg-white/90 text-[var(--brand-dark)] px-3 py-1 rounded-full text-xs font-semibold">
                      {yacht.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--brand-dark)] mb-3">
                    {yacht.name}
                  </h3>

                  {/* Specs row */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-[var(--brand-muted)]">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5" />
                      {yacht.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5" />
                      {yacht.speed}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {yacht.guests}
                    </span>
                  </div>

                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-5 line-clamp-2">
                    {yacht.description}
                  </p>

                  <button className="flex items-center gap-2 text-[var(--brand-primary)] text-sm font-semibold group-hover:gap-3 transition-all">
                    View more <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERIOR / VIDEO OVERLAY SECTION ── */}
      <section
        id="services"
        className="relative min-h-[70vh] flex items-center overflow-hidden video-overlay"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/90 via-[var(--brand-dark)]/60 to-transparent z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
          <div className="max-w-xl">
            <motion.p
              className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              {...fadeUp}
            >
              Interior
            </motion.p>
            <motion.h2
              className="text-[clamp(2rem,4vw,3.25rem)] font-semibold text-white leading-tight tracking-[-0.02em]"
              {...fadeUp}
            >
              Experience a world of refined luxury.
            </motion.h2>
            <motion.p
              className="mt-5 text-white/70 text-base leading-relaxed"
              {...fadeUp}
            >
              The spacious interior is designed for both relaxation and
              entertainment, blending modern elegance with timeless comfort.
            </motion.p>
            <motion.div {...fadeUp} className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-[var(--brand-dark)] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition group"
              >
                Explore our services{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Founder
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--brand-dark)] max-w-2xl">
              We deliver exceptional experiences on the water.
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] text-base max-w-xl">
              Our values shape every journey, every interaction, and every
              detail we design.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Values */}
            <div className="space-y-8">
              {founderValues.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="flex gap-5"
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    {i === 0 && (
                      <Ship className="w-5 h-5 text-[var(--brand-primary)]" />
                    )}
                    {i === 1 && (
                      <Compass className="w-5 h-5 text-[var(--brand-primary)]" />
                    )}
                    {i === 2 && (
                      <Shield className="w-5 h-5 text-[var(--brand-primary)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--brand-dark)] mb-1">
                      {value.title}
                    </h3>
                    <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Founder Card */}
            <motion.div
              {...fadeUp}
              className="bg-[var(--brand-bg)] rounded-2xl p-8 lg:p-10"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">MS</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--brand-dark)]">
                    Marcel Stoyk
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm">
                    Founder of Yachtera
                  </p>
                </div>
              </div>
              {/* Signature line */}
              <div className="w-24 h-px bg-[var(--brand-accent)] mb-6" />
              <blockquote className="text-[var(--brand-dark)]/80 text-base leading-relaxed italic">
                &ldquo;Yachtera was born from a simple idea — that the freedom
                of the sea should be accessible, effortless, and unforgettable.
                We&apos;re here to make every journey on the water feel like it
                was meant to be.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS SECTION ── */}
      <section
        id="reviews"
        className="py-24 lg:py-32 bg-[var(--brand-bg)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div>
              <p className="text-[var(--brand-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                What Our Guests Say
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--brand-dark)]">
                Real stories from real guests.
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Marquee row */}
        <div className="review-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-7 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <h4 className="text-lg font-semibold text-[var(--brand-dark)] mb-3">
                &ldquo;{review.title}&rdquo;
              </h4>
              <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-5">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-dark)]">
                    {review.author}
                  </p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA — VIDEO BACKGROUND ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden video-overlay">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[var(--brand-dark)]/70 z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center w-full">
          <motion.p
            className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.25em] mb-4"
            {...fadeUp}
          >
            Ready to Make Waves?
          </motion.p>
          <motion.h2
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold text-white leading-tight tracking-[-0.02em] max-w-2xl mx-auto"
            {...fadeUp}
          >
            Your perfect day on the water is just a few clicks away.
          </motion.h2>
          <motion.p
            className="mt-5 text-white/60 text-base max-w-lg mx-auto leading-relaxed"
            {...fadeUp}
          >
            The spacious interior is designed for both relaxation and
            entertainment, blending modern elegance with timeless comfort.
          </motion.p>
          <motion.div {...fadeUp} className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-[var(--brand-dark)] px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/90 transition group"
            >
              Book your boat now{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        id="contact"
        className="py-20 px-6 lg:px-12 bg-[var(--brand-dark)]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top: Logo + Newsletter */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-white">
                YACHTERA
              </span>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Stay in the Flow
              </h3>
              <p className="text-white/50 text-sm mb-5">
                Join our newsletter for tips, offers, and new destinations.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition"
                />
                <button
                  type="submit"
                  className="bg-white text-[var(--brand-dark)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Company</h4>
              <div className="space-y-3">
                <a
                  href="#about"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Our Team
                </a>
                <a
                  href="#services"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Our Services
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Explore</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Events
                </a>
                <a
                  href="#"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Contacts
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Yachts</h4>
              <div className="space-y-3">
                <a
                  href="#fleet"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Azure Spirit
                </a>
                <a
                  href="#fleet"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Seaborn Echo
                </a>
                <a
                  href="#fleet"
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  Horizon Drift
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm">Contact</h4>
              <div className="space-y-3 text-white/50 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />{" "}
                  {businessContact.address}
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

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/30 text-sm text-center">
              &copy; 2026 Yachtera. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
