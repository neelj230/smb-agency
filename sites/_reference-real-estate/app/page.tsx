// REFERENCE: REAL ESTATE AGENCY — huge "buy. sell. rent." hero with blurred bg, featured listing cards, neighborhood grid, comparison checklist, connected process boxes, side-by-side reviews, property submission form
// SOURCE: https://realisting.framer.website/
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Bed,
  Bath,
  Maximize,
  Check,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Building2,
  Home,
  Key,
  FileCheck,
  Upload,
  DollarSign,
  Users,
  Clock,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPLORE", href: "#neighborhoods" },
  { label: "SELL", href: "#contact" },
  { label: "SUBMIT PROPERTY", href: "#contact" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "BLOGS", href: "#process" },
  { label: "CONTACT", href: "#footer" },
];

const listings = [
  {
    title: "Modern Loft in Fishtown",
    price: "$485,000",
    beds: "2",
    baths: "2",
    sqft: "1,240",
    badge: "New",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "Victorian in Rittenhouse",
    price: "$1,250,000",
    beds: "4",
    baths: "3",
    sqft: "3,100",
    badge: "Featured",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "Townhome in Grad Hospital",
    price: "$725,000",
    beds: "3",
    baths: "2.5",
    sqft: "2,050",
    badge: "Open House",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    title: "Condo in Northern Liberties",
    price: "$395,000",
    beds: "1",
    baths: "1",
    sqft: "880",
    badge: "Price Drop",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
];

const neighborhoods = [
  {
    name: "Rittenhouse Square",
    homes: "120+ listings",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
  },
  {
    name: "Fishtown",
    homes: "85+ listings",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    name: "Old City",
    homes: "60+ listings",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
  },
  {
    name: "Graduate Hospital",
    homes: "95+ listings",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
  },
  {
    name: "Northern Liberties",
    homes: "70+ listings",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
  },
  {
    name: "Society Hill",
    homes: "45+ listings",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  },
];

const comparison = {
  features: [
    "Dedicated agent from day one",
    "Off-market listings access",
    "Professional staging included",
    "Transparent pricing, no hidden fees",
    "Average 12 days to close",
    "Post-sale support for 6 months",
  ],
  ours: [true, true, true, true, true, true],
  others: [false, false, false, false, false, false],
};

const processSteps = [
  {
    icon: Search,
    title: "Browse",
    num: "01",
    description:
      "Explore curated listings tailored to your preferences and budget.",
  },
  {
    icon: Home,
    title: "Tour",
    num: "02",
    description:
      "Schedule private tours at your convenience, in-person or virtual.",
  },
  {
    icon: FileCheck,
    title: "Offer",
    num: "03",
    description:
      "Our team handles negotiations, inspections, and all the paperwork.",
  },
  {
    icon: Key,
    title: "Close",
    num: "04",
    description: "Get your keys and move in. We make closing seamless.",
  },
];

const reviews = [
  {
    text: "Realisting found us our dream home in Rittenhouse within two weeks. The entire process was seamless and stress-free.",
    author: "Michael & Sarah T.",
    role: "Buyers",
    rating: 5,
  },
  {
    text: "Sold our property 15% above asking price. Their market knowledge and staging advice made all the difference.",
    author: "Jennifer L.",
    role: "Seller",
    rating: 5,
  },
  {
    text: "As first-time buyers, we were nervous. Our agent walked us through every step with patience and genuine care.",
    author: "David K.",
    role: "First-time Buyer",
    rating: 5,
  },
  {
    text: "The rental team found us a stunning apartment in Northern Liberties. Fast, professional, and truly client-focused.",
    author: "Amanda R.",
    role: "Renter",
    rating: 5,
  },
  {
    text: "We have used Realisting for three transactions now. Consistently excellent service and results every single time.",
    author: "Robert & Maria G.",
    role: "Repeat Clients",
    rating: 5,
  },
  {
    text: "Their off-market access is unreal. We got a property no one else even knew was available.",
    author: "Chris W.",
    role: "Investor",
    rating: 5,
  },
];

const businessContact = {
  name: "Realisting",
  address: "1200 Market Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 555-0200",
  email: "hello@realisting.com",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── HERO WITH SCROLL-LINKED BLUR ────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const blur = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background image with scroll-linked blur */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          scale,
          opacity,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)",
          }}
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 text-center pt-32 pb-24">
        <motion.p
          className="text-white/60 text-sm uppercase tracking-[0.3em] mb-6 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Philadelphia&apos;s premier real estate
        </motion.p>

        {/* MASSIVE lowercase buy. sell. rent. */}
        <motion.h1
          className="hero-headline font-[family-name:var(--font-display)] font-black text-white leading-[0.85] tracking-[-0.04em] lowercase"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          buy. sell.
          <br />
          rent.
        </motion.h1>

        <motion.p
          className="mt-10 text-white/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Find your dream property with verified listings and trusted agents
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="#listings"
            className="inline-flex items-center gap-3 bg-white text-[#111827] px-10 py-4.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105"
          >
            View Properties
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-16 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            { value: "340+", label: "Properties Sold" },
            { value: "12", label: "Days Avg Close" },
            { value: "$2.1B", label: "Sales Volume" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white text-3xl md:text-4xl font-bold">
                {stat.value}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function RealistingPage() {
  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-gray-100 px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-[#111827] uppercase">
              Realist
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#6B7280] hover:text-[#111827] text-[11px] font-semibold uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#listings"
            className="bg-[#111827] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Buy Template
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── FEATURED LISTINGS ── */}
      <section id="listings" className="py-28 lg:py-36 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                Featured
              </p>
              <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-tight tracking-tight">
                Latest Listings
              </h2>
            </div>
            <a
              href="#listings"
              className="hidden md:flex items-center gap-2 text-[#3B82F6] text-sm font-medium hover:underline underline-offset-4"
            >
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing, i) => (
              <motion.div
                key={listing.title}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${listing.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-white text-[#111827] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {listing.badge}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xl font-bold mb-1">{listing.price}</p>
                  <p className="text-[#6B7280] text-sm mb-4">{listing.title}</p>
                  <div className="flex items-center gap-4 text-[#6B7280] text-xs border-t border-gray-50 pt-3">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" /> {listing.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" /> {listing.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" /> {listing.sqft}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOODS: Explore Area ── */}
      <section
        id="neighborhoods"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[#F8FAFC]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Explore
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-tight">
              Popular Neighborhoods
            </h2>
            <p className="text-[#6B7280] mt-4 max-w-lg mx-auto">
              Click through neighborhoods and discover your next home in
              Philadelphia&apos;s most sought-after areas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {neighborhoods.map((n, i) => (
              <motion.div
                key={n.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: i === 0 || i === 5 ? "3/2.5" : "3/2" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${n.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-colors" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg">{n.name}</h3>
                  <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                    {n.homes}{" "}
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VALUE STRIP ── */}
      <section id="about" className="py-28 lg:py-36 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                About Us
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight mb-6">
                Real estate,
                <br />
                reimagined.
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
                We combine local expertise with modern tools to help you buy,
                sell, or rent with total confidence. Every listing is verified,
                every agent is dedicated.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, label: "Verified Listings" },
                  { icon: Users, label: "Dedicated Agents" },
                  { icon: Clock, label: "Fast Closings" },
                  { icon: TrendingUp, label: "Market Insights" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80)",
                  }}
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl shadow-gray-200/60 p-6 border border-gray-100">
                <p className="text-3xl font-bold text-[#111827]">340+</p>
                <p className="text-[#6B7280] text-sm mt-1">
                  Families served
                  <br />
                  since 2018
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US: Comparison Table ── */}
      <section className="relative py-28 lg:py-36 px-8 lg:px-16 overflow-hidden">
        {/* Large dark bg with image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-[#111827]/92" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              The Difference
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-white tracking-tight">
              Why Realisting
            </h2>
            <p className="text-white/50 mt-4 max-w-md mx-auto">
              See how we compare to traditional agencies.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
            {...fadeUp}
          >
            {/* Header row */}
            <div className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_160px_160px] items-center px-8 py-5 border-b border-white/10">
              <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">
                Feature
              </span>
              <span className="text-center">
                <span className="bg-[#3B82F6] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  Realisting
                </span>
              </span>
              <span className="text-white/30 text-xs text-center uppercase tracking-wider font-semibold">
                Others
              </span>
            </div>
            {/* Rows */}
            {comparison.features.map((feature, i) => (
              <motion.div
                key={feature}
                className="grid grid-cols-[1fr_120px_120px] md:grid-cols-[1fr_160px_160px] items-center px-8 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span className="text-white/70 text-sm">{feature}</span>
                <span className="flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </span>
                <span className="flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-400/50" />
                  </div>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS: Connected boxes ── */}
      <section id="process" className="py-28 lg:py-36 px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              How It Works
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-tight">
              Four Simple Steps
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[3.5rem] left-[12%] right-[12%] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-[#3B82F6]/20 via-[#3B82F6]/40 to-[#3B82F6]/20" />
            </div>

            <div className="grid md:grid-cols-4 gap-8 md:gap-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Number + icon box */}
                  <div className="relative z-10 mb-8">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-[#F0F7FF] border-2 border-[#3B82F6]/10 flex items-center justify-center shadow-lg shadow-blue-100/50">
                      <step.icon className="w-7 h-7 text-[#3B82F6]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#3B82F6] text-white text-[10px] font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS: Modular grid ── */}
      <section
        id="reviews"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[#F8FAFC]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Testimonials
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold tracking-tight">
              Client Stories
            </h2>
          </motion.div>

          {/* Masonry-style modular grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                className="break-inside-avoid bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[#111827] text-[15px] leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center text-[#3B82F6] font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.author}</p>
                    <p className="text-xs text-[#6B7280]">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBMIT PROPERTY FORM ── */}
      <section
        id="contact"
        className="relative py-28 lg:py-36 px-8 lg:px-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0F172A]" />
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[#3B82F6] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Get Started
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-white tracking-tight">
              Submit Your Property
            </h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto text-lg">
              List your property with us. Our team will reach out within 24
              hours.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 md:p-14"
            {...fadeUp}
          >
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@email.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(215) 555-0000"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Property Type
                </label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white/50 text-sm focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                  <option>Single Family</option>
                  <option>Condo / Apartment</option>
                  <option>Townhome</option>
                  <option>Multi-Family</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Asking Price
                </label>
                <input
                  type="text"
                  placeholder="$500,000"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Bedrooms
                </label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white/50 text-sm focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Property Address
                </label>
                <input
                  type="text"
                  placeholder="1234 Market St, Philadelphia, PA 19107"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-white/50 text-[11px] uppercase tracking-[0.15em] font-semibold block">
                  Additional Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your property — recent renovations, unique features, timeline for selling..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6]/50 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>

              {/* Upload area */}
              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-white/[0.08] rounded-2xl p-8 text-center hover:border-[#3B82F6]/30 transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 text-white/20 mx-auto mb-3 group-hover:text-[#3B82F6]/50 transition-colors" />
                  <p className="text-white/40 text-sm">
                    Drag photos here or{" "}
                    <span className="text-[#3B82F6] underline underline-offset-2">
                      browse
                    </span>
                  </p>
                  <p className="text-white/20 text-xs mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-white/30 text-xs">
                By submitting, you agree to our terms and privacy policy.
              </p>
              <button className="bg-[#3B82F6] text-white px-12 py-4.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-blue-600 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-3 flex-shrink-0">
                Submit Property <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="py-20 px-8 lg:px-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white uppercase">
                  Realist
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Premium real estate services in Philadelphia. Buy, sell, or rent
                with confidence. Every listing verified, every agent dedicated.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  "About",
                  "Listings",
                  "Neighborhoods",
                  "Reviews",
                  "Contact",
                ].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-4 text-white/40 text-sm">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />{" "}
                  {businessContact.address}
                  <br />
                  {businessContact.city}, {businessContact.state}{" "}
                  {businessContact.zip}
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />{" "}
                  {businessContact.phone}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" />{" "}
                  {businessContact.email}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; 2026 Realisting. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/30 text-xs hover:text-white/60 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ClickToCall phone="(215) 555-0200" />
    </>
  );
}
