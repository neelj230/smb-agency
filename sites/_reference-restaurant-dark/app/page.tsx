// REFERENCE: RESTAURANT DARK — serif typography, dark green/cream duotone, food imagery, menu pricing, timeline, chef section
"use client";

import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Star, ChevronDown } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
];

const menuCategories = [
  { name: "Soup & Ramen", tag: "QUALITY STARTER", image: "/photos/cat-1.webp" },
  { name: "Sushi & Sashimi", tag: "MID-QUARTER", image: "/photos/cat-2.webp" },
  { name: "Meat & Dishes", tag: "HEAVY DISH", image: "/photos/cat-3.webp" },
];

const sushiMenu = [
  {
    name: "Philadelphia roll",
    description: "Ricotta, goat cheese, beetroot and datterini",
    price: "$51.75",
  },
  {
    name: "California roll",
    description: "Spalla Cotta, Mortadella, Culaccioma",
    price: "$71.25",
  },
  {
    name: "Shrimp tempura",
    description: "Our selection of fresh oysters, limes.",
    price: "$69.50",
  },
  {
    name: "Tekka maki",
    description: "Truffle mash, pepper sauce.",
    price: "$90.00",
  },
];

const seaMenu = [
  {
    name: "Crispy skin chicken",
    description: "Prickly Pear, Chancoca, Key Lime",
    price: "$66.20",
  },
  {
    name: "Ebony fillet steak",
    description: "Purple Corn, Pineapple, Apple",
    price: "$99.00",
  },
  {
    name: "Tommy's margarita",
    description: "Tomato, Salt, Black Pepper",
    price: "$52.40",
  },
  {
    name: "Wild mushroom arancini",
    description: "Truffle mash, pepper sauce",
    price: "$36.80",
  },
];

const timeline = [
  {
    year: "1998",
    title: "Journey was started",
    description:
      "The extraordinary dining experience where flavors meet ambiance.",
  },
  {
    year: "2000",
    title: "Best restaurant rewards",
    description:
      "The extraordinary dining experience where flavors meet ambiance.",
  },
  {
    year: "2015",
    title: "Famous menu awards",
    description:
      "The extraordinary dining experience where flavors meet ambiance.",
  },
  {
    year: "2025",
    title: "Yeah, we captured 20+ branch",
    description:
      "The extraordinary dining experience where flavors meet ambiance.",
  },
];

const businessContact = {
  name: "Bamzi",
  address: "256 North Newcroft Avenue",
  city: "Newcroft",
  state: "PA",
  zip: "19302",
  phone: "+123 (456) 789 00",
  email: "info@bamzi.com",
  hours: {
    Monday: "11:00 AM - 10:00 PM",
    Tuesday: "11:00 AM - 10:00 PM",
    Wednesday: "11:00 AM - 10:00 PM",
    Thursday: "11:00 AM - 10:00 PM",
    Friday: "11:00 AM - 11:00 PM",
    Saturday: "11:00 AM - 11:00 PM",
    Sunday: "12:00 PM - 9:00 PM",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Hero (dark green + food photo) → Logo bar → About (split + round image) → Menu categories (3 cards + marquee text) → Menu detail ×2 (split with pricing) → Chef quote (dark) → Ramen bowl (transition image) → Our Story timeline → Contact form → Footer
// This is RESTAURANT DARK: elegant serif, dark/cream duotone, food-focused, itemized pricing. Very different from trades/services sites.

export default function BamziPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
        <div className="flex items-center gap-2">
          <span className="text-[var(--brand-primary)] text-lg">&#x1F342;</span>
          <span className="font-[family-name:var(--font-display)] text-white text-lg italic">
            Bamzi
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white text-sm tracking-wider uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#menu"
          className="bg-[var(--brand-primary)] text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition"
        >
          Menu
        </a>
      </nav>

      {/* ── HERO: Dark green bg with letter-by-letter text animation & food imagery ── */}
      <section className="relative min-h-screen bg-[var(--brand-dark-green)] overflow-hidden flex flex-col items-center text-center px-8 pt-32 pb-0">
        {/* Decorative leaves — left */}
        <div className="absolute left-0 top-[15%] w-[200px] h-[350px] opacity-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-[var(--brand-primary)]/20 to-transparent rounded-r-full" />
        </div>
        {/* Decorative leaves — right */}
        <div className="absolute right-0 top-[15%] w-[200px] h-[350px] opacity-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-bl from-[var(--brand-primary)]/20 to-transparent rounded-l-full" />
        </div>

        <div className="relative z-10 max-w-3xl">
          {/* Animated title — each word fades in sequentially */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5rem)] text-white leading-[1.2]">
            {[
              "Delicious",
              "food",
              "&",
              "wonderful",
              "eating",
              "experience",
            ].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-8 text-white/40 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            We serve food, harmony, &amp; laughter since 1998
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block mt-10 bg-[var(--brand-primary)] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            Book a Table
          </motion.a>
        </div>

        {/* Food plate image — large and prominent */}
        <motion.div
          className="relative z-10 mt-16 w-full max-w-[720px]"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="aspect-[4/3] rounded-full mx-auto overflow-hidden shadow-2xl shadow-black/40">
            <div className="w-full h-full bg-gradient-to-br from-[#2A3B2A] to-[#1A2A1A] flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-[#1F2F1F] border border-white/5 flex items-center justify-center">
                <p className="text-white/10 text-xs uppercase tracking-widest">
                  Food Photography
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* White curve transition at bottom */}
        <div className="relative w-full mt-[-60px]">
          <svg
            viewBox="0 0 1440 120"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z" fill="white" />
          </svg>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-[140px] z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--brand-primary)]" />
        </motion.div>
      </section>

      {/* ── LOGO BAR ── */}
      <section className="py-10 px-8 lg:px-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-12">
          {[
            "Logoipsum",
            "logo—ipsum",
            "Logoipsum",
            "logoipsum",
            "LOGO IPSUM",
          ].map((name, i) => (
            <span
              key={i}
              className="text-gray-300 text-sm font-medium tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── ABOUT: Split — round food image left (slides from left), text right (slides from right) ── */}
      <section id="about" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-80 h-80 rounded-full bg-slate-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Serve Quality Food &amp; Thing
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight">
              Immerse yourself in an asian experience.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Savor sushi perfection — crafted with tradition, fresh
              ingredients, and a passion for detail.
            </p>
            <p className="mt-4 text-[var(--brand-muted)] leading-relaxed">
              The artistry of sushi and rolls, meticulously crafted with
              traditional Japanese recipes and an eye for detail. Savor the
              perfect harmony...
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="bg-[var(--brand-primary)] text-white px-7 py-3 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition"
              >
                Food Menu
              </a>
              <a
                href="tel:+12345678900"
                className="flex items-center gap-2 text-sm text-[var(--brand-text)]"
              >
                <Phone className="w-4 h-4" />
                +1(22) 456 789 00
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MENU CATEGORIES: 3 cards + giant marquee text ── */}
      <section
        id="menu"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-cream)] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Popular Category
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight">
              Immerse yourself in an
              <br />
              asian experience.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {menuCategories.map((cat, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-48 h-48 rounded-full bg-slate-200 mx-auto mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-2">
                  {cat.tag}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {cat.name}
                </h3>
                <a
                  href="#"
                  className="inline-block mt-4 text-xs uppercase tracking-wider text-[var(--brand-muted)] underline underline-offset-4 hover:text-[var(--brand-text)] transition-colors"
                >
                  Our Menu
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Giant marquee background text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-[0.06] pointer-events-none">
          <div className="marquee-bg flex whitespace-nowrap">
            <span className="font-[family-name:var(--font-display)] text-[8rem] italic mr-8">
              delicious food and wonderful eating experience
            </span>
            <span className="font-[family-name:var(--font-display)] text-[8rem] italic mr-8">
              delicious food and wonderful eating experience
            </span>
          </div>
        </div>
      </section>

      {/* ── MENU DETAIL 1: Famous sushi's — text slides from left, image from right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Assorted Menu
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight mb-10">
              Famous sushi&apos;s
            </h2>
            <div className="space-y-6">
              {sushiMenu.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-gray-100 pb-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-medium italic">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[var(--brand-muted)] mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-lg font-semibold ml-4 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
          </motion.div>
        </div>
      </section>

      {/* ── MENU DETAIL 2: Sea fish — image slides from left, text from right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Sea Thing
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight mb-10">
              Sea fish &amp; dishes
            </h2>
            <div className="space-y-6">
              {seaMenu.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-gray-100 pb-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-medium italic">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[var(--brand-muted)] mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-display)] text-lg font-semibold ml-4 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHEF QUOTE: Dark bg, portrait right ── */}
      <section className="relative bg-[var(--brand-dark-green)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[500px]">
          {/* Left: Quote */}
          <motion.div
            {...fadeUp}
            className="flex flex-col justify-center px-8 lg:px-16 py-20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-6">
              &#x1F342; Our Mission
            </p>
            <blockquote className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white/90 italic leading-snug">
              &ldquo;Authentic sushi and rolls, expertly crafted with care,
              tradition, and exceptional flavors&rdquo;
            </blockquote>
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
                Head of Kitchen
              </p>
              <p className="text-white font-semibold">Natalia T. Morgan</p>
            </div>
          </motion.div>
          {/* Right: Chef portrait placeholder */}
          <div className="relative min-h-[400px] bg-[#2A3B2A]">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--brand-dark-green)]/50" />
          </div>
        </div>
      </section>

      {/* ── RAMEN BOWL: Large transitional image ── */}
      <section className="relative">
        <div className="bg-white h-[200px]" />
        <div className="bg-[var(--brand-dark-green)] h-[200px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[400px] rounded-full bg-slate-300 overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400" />
          </div>
        </div>
      </section>

      {/* ── CONTACT FOOTER: Dark green with address + form ── */}
      <section
        id="contact"
        className="bg-[var(--brand-dark-green)] py-20 px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div {...fadeUp}>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-white italic leading-tight">
                Timeless recipes to savor &amp; enjoy
              </h2>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">
                    256 North Newcroft Avenue, Newcroft, PA 19302
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">info@bamzi.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">+123 (456) 789 00</span>
                </div>
              </div>
            </motion.div>
            {/* Right: placeholder for map */}
            <div className="aspect-[4/3] rounded-xl bg-[#2A3B2A] border border-white/10" />
          </div>
        </div>
      </section>

      {/* ── OUR STORY: Timeline ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-cream)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left: Heading + stats */}
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Our Story
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight">
              Meet with our decent &amp; honest journey
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              The artistry of sushi and rolls, meticulously crafted with
              traditional Japanese recipes and an eye for detail. Savor the
              perfect harmony...
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-300 border-2 border-[var(--brand-cream)]"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">
                1200+ Happy Ratings
              </span>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div {...fadeUp} className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-primary)] italic">
                    {item.year}
                  </span>
                </div>
                <div className="border-l border-gray-200 pl-6">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg italic">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--brand-muted)] mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Let&apos;s Talk With Us
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight">
              Tell us anything you want
            </h2>
          </motion.div>
          <motion.form
            {...fadeUp}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border-b border-gray-200 py-3 text-sm bg-transparent focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="info@example.com"
                  className="w-full border-b border-gray-200 py-3 text-sm bg-transparent focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full border-b border-gray-200 py-3 text-sm bg-transparent focus:border-[var(--brand-primary)] focus:outline-none transition-colors resize-none"
              />
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[var(--brand-primary)] text-white px-10 py-3.5 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition"
              >
                Submit Now
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="+123 (456) 789 00" />
    </>
  );
}
