// REFERENCE: RESTAURANT DARK — serif typography, dark green/cream duotone, food imagery, menu pricing, timeline, chef section
"use client";

import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, MapPin, Mail, Star, ChevronDown } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const menuCategories = [
  { name: "Artisan Pastries", tag: "DAILY BAKED FRESH", image: "/photos/photo-3.webp" },
  { name: "Breakfast Sandwiches", tag: "MORNING STAPLE", image: "/photos/photo-4.webp" },
  { name: "Babka & Specialty Breads", tag: "SIGNATURE ITEM", image: "/photos/photo-8.webp" },
];

const pastryMenu = [
  {
    name: "Babka Bun",
    description: "Housemade babka available in multiple rotating flavors, a perennial customer favorite.",
    price: "Ask daily",
  },
  {
    name: "Sticky Bun",
    description: "A classic done right — caramelized, tender, and impossible to share.",
    price: "Ask daily",
  },
  {
    name: "Housemade Pop Tart",
    description: "Handcrafted pop tarts that look almost too good to eat — almost.",
    price: "Ask daily",
  },
  {
    name: "Cookies & Bars",
    description: "Sweet but not too sweet — a balanced bite that keeps you coming back.",
    price: "Ask daily",
  },
];

const breakfastMenu = [
  {
    name: "Turkey Bacon, Egg & Cheese",
    description: "On a fresh croissant, with add-ons like avocado, sriracha, or strawberry jelly.",
    price: "Ask daily",
  },
  {
    name: "Bacon, Egg & Cheese",
    description: "The classic morning sandwich, elevated on housemade bread or buttery croissant.",
    price: "Ask daily",
  },
  {
    name: "Vanilla Latte",
    description: "Cafe-quality espresso drink — the perfect companion to any pastry order.",
    price: "Ask daily",
  },
  {
    name: "Scones",
    description: "Housemade scones baked fresh daily, tender and satisfying without being crumbly.",
    price: "Ask daily",
  },
];

const timeline = [
  {
    year: "Day 1",
    title: "A tiny shop opens on Twentieth",
    description:
      "Tucked into a compact corner of Rittenhouse Square, The Bakeshop on Twentieth opened its doors with big ambitions in a small space.",
  },
  {
    year: "Early",
    title: "The neighborhood takes notice",
    description:
      "Word spread quickly about the babka buns, sticky buns, and breakfast sandwiches that made mornings in the city feel a little more human.",
  },
  {
    year: "Growing",
    title: "A ritual is born",
    description:
      "Regulars established the perfect Philadelphia morning: grab something extraordinary at the bakeshop, then head a few blocks to Rittenhouse Square.",
  },
  {
    year: "Today",
    title: "433 reviews and counting",
    description:
      "With a 4.6 rating across hundreds of reviews, the community has clearly voted — The Bakeshop on Twentieth is a Philadelphia original.",
  },
];

const businessContact = {
  name: "The Bakeshop on Twentieth",
  address: "269 S 20th St",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 644-9714",
  email: "",
  hours: {
    Monday: "8:00 AM – 3:00 PM",
    Tuesday: "8:00 AM – 3:00 PM",
    Wednesday: "8:00 AM – 3:00 PM",
    Thursday: "8:00 AM – 4:00 PM",
    Friday: "8:00 AM – 4:00 PM",
    Saturday: "8:00 AM – 4:00 PM",
    Sunday: "8:00 AM – 3:00 PM",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function BusinessPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[var(--brand-primary)] text-lg">&#x1F342;</span>
            <span className="font-[family-name:var(--font-display)] text-white text-lg italic">
              Bakeshop
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
            className="hidden md:inline-block bg-[var(--brand-primary)] text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition"
          >
            Menu
          </a>
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-white" aria-label="Menu">
            {mobileNav ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden backdrop-blur-xl bg-black/60 rounded-xl mt-2">
              <div className="flex flex-col py-4 px-6 gap-4">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMobileNav(false)} className="text-white/80 hover:text-white text-sm uppercase tracking-wider transition-colors">{link.label}</a>
                ))}
                <a href="#menu" onClick={() => setMobileNav(false)} className="bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider text-center">Menu</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              "Babka,",
              "buns,",
              "and",
              "mornings",
              "worth",
              "crossing",
              "town",
              "for.",
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
            className="mt-8 text-white/80 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            A tiny corner shop on South 20th. Open daily.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block mt-10 bg-[var(--brand-primary)] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            Order Online
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
            <img src="/photos/photo-1.webp" alt="Bakeshop pastries" className="w-full h-full object-cover" />
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
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-12">
          {[
            "Fresh Babka",
            "Sticky Buns",
            "Pop Tarts",
            "Scones",
            "Croissants",
          ].map((name, i) => (
            <span
              key={i}
              className="text-gray-500 text-sm font-medium tracking-wider"
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
            <div className="w-80 h-80 rounded-full overflow-hidden">
              <img src="/photos/photo-2.webp" alt="The Bakeshop on Twentieth" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Baked Fresh Daily
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight">
              Tucked into Rittenhouse Square, baked fresh daily.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Everything baked fresh daily — babka buns, sticky buns,
              housemade pop tarts, and pastries worth crossing town for.
            </p>
            <p className="mt-4 text-[var(--brand-muted)] leading-relaxed">
              The Bakeshop on Twentieth is a compact corner of Rittenhouse
              Square where mornings feel a little more human. Small batch,
              big flavor, no shortcuts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="bg-[var(--brand-primary)] text-white px-7 py-3 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition"
              >
                Pastry Menu
              </a>
              <a
                href="tel:+2156449714"
                className="flex items-center gap-2 text-sm text-[var(--brand-text)]"
              >
                <Phone className="w-4 h-4" />
                269 S 20th St, Philadelphia, PA
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
              What's in
              <br />
              the case today.
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
                <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
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

      {/* ── MENU DETAIL 1: Artisan pastries — text slides from left, image from right ── */}
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
              Artisan pastries
            </h2>
            <div className="space-y-6">
              {pastryMenu.map((item, i) => (
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
            className="aspect-[3/4] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/photos/photo-5.webp" alt="Artisan pastries" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── MENU DETAIL 2: Breakfast & breads — image slides from left, text from right ── */}
      <section className="py-24 lg:py-32 px-8 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            className="aspect-[3/4] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/photos/photo-6.webp" alt="Babka and breads" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold mb-4">
              &#x1F342; Morning Staples
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic leading-tight mb-10">
              Babka &amp; breads
            </h2>
            <div className="space-y-6">
              {breakfastMenu.map((item, i) => (
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
              &ldquo;Perfect Philly morning: grab a babka bun at the
              bakeshop, then walk three blocks to Rittenhouse
              Square.&rdquo;
            </blockquote>
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.15em] text-white/80 mb-1">
                Our Bakeshop
              </p>
              <p className="text-white font-semibold">The Bakeshop on Twentieth</p>
            </div>
          </motion.div>
          {/* Right: Chef portrait placeholder */}
          <div className="relative min-h-[400px]">
            <img src="/photos/photo-7.webp" alt="Our bakeshop" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--brand-dark-green)]/50" />
          </div>
        </div>
      </section>

      {/* ── RAMEN BOWL: Large transitional image ── */}
      <section className="relative">
        <div className="bg-white h-[200px]" />
        <div className="bg-[var(--brand-dark-green)] h-[200px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[400px] rounded-full overflow-hidden shadow-2xl">
            <img src="/photos/photo-9.webp" alt="Bakeshop specialty" className="w-full h-full object-cover" />
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
                Fresh-baked goods to savor &amp; enjoy
              </h2>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">
                    269 S 20th St, Philadelphia, PA 19103
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">Open daily · 8am until 3–4pm</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-sm">(215) 644-9714</span>
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
              A cozy corner of Rittenhouse Square
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              What started as a tiny corner shop has become a Rittenhouse
              Square morning ritual. Babka, sticky buns, and breakfast
              sandwiches that keep the neighborhood coming back.
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
                4.6 stars · 433 reviews
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
              Send us a message
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

      <ClickToCall phone="(215) 644-9714" />
    </>
  );
}
