// Bellish Nail Lounge — Premium dark editorial with warm gold accents
"use client";

import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { BlurredReveal } from "@/components/BlurredReveal";
import type { NavLink, Review } from "@/components/types";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Phone, MapPin, Clock, ArrowRight, Star, ChevronDown } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "Taviii did amazing! She executed my brand perfectly on my nails — clean, creative, and professional from start to finish. You can tell she takes pride in her work and really listens to what you want.",
    author: "Who Is She",
    rating: 5,
    source: "google",
  },
  {
    text: "Let me tell you about this AMAZING BLACK OWNED nail salon. I had the pleasure of having the owner do my nails and the other amazing nail tech Tavi. Those ladies give out good vibes and great customer service.",
    author: "Felicia C",
    rating: 5,
    source: "google",
  },
  {
    text: "Tavii was amazing. She pays attention to detail, takes her time, and really wants to give you exactly what you ask for. The owner is also very sweet and the vibes here are top notch. Wine included.",
    author: "Ebony Dozier",
    rating: 5,
    source: "google",
  },
];

const services = [
  { name: "Acrylic Full Set", price: "from $55", desc: "Custom shapes, lengths, and designs" },
  { name: "Gel Manicure", price: "from $40", desc: "Long-lasting color with mirror shine" },
  { name: "Custom Nail Art", price: "from $65", desc: "Hand-painted designs, 3D art, charms" },
  { name: "Acrylic Fill", price: "from $40", desc: "Maintenance and fresh design" },
  { name: "Same-Day Removal", price: "from $15", desc: "Safe soak-off, no damage" },
  { name: "Brand-Inspired Design", price: "from $75", desc: "Logo nails, branded sets, custom concepts" },
];

const portfolioImages = [
  { src: "/photos/photo-2.webp", alt: "3D crystal French tips", span: "col-span-2 row-span-2" },
  { src: "/photos/photo-3.webp", alt: "Holographic blue marble set", span: "col-span-1 row-span-1" },
  { src: "/photos/photo-7.webp", alt: "Pink ombre with crystal accent", span: "col-span-1 row-span-1" },
  { src: "/photos/photo-8.webp", alt: "Botanical floral nail art", span: "col-span-1 row-span-2" },
  { src: "/photos/photo-9.webp", alt: "Designer-inspired mixed art", span: "col-span-1 row-span-1" },
  { src: "/photos/photo-5.webp", alt: "BellishBabe branded set", span: "col-span-1 row-span-1" },
  { src: "/photos/photo-6.webp", alt: "Glam gemstone full set", span: "col-span-2 row-span-1" },
  { src: "/photos/photo-10.webp", alt: "Bold multicolor art set", span: "col-span-1 row-span-1" },
  { src: "/photos/photo-4.webp", alt: "Clean lavender gel manicure", span: "col-span-1 row-span-1" },
];

const businessContact = {
  name: "Bellish Nail Lounge",
  address: "841 S 52nd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19143",
  phone: "(484) 649-1931",
  email: "",
  hours: {
    Monday: "9 AM – 2 PM",
    Tuesday: "9 AM – 5 PM",
    Wednesday: "9 AM – 5 PM",
    Thursday: "9 AM – 5 PM",
    Friday: "9 AM – 5 PM",
    Saturday: "10 AM – 8 PM",
    Sunday: "10 AM – 7 PM",
  },
};

const faq = [
  { q: "Do I need an appointment?", a: "Appointments are preferred and can be booked through Booksy. Walk-ins are welcome based on availability." },
  { q: "What forms of payment do you accept?", a: "We accept cash, all major credit/debit cards, Zelle, and CashApp." },
  { q: "How long does a full set take?", a: "A standard full set takes about 1.5–2 hours. Custom nail art and 3D designs may take longer depending on complexity." },
  { q: "Is the salon kid-friendly?", a: "Yes! We welcome clients of all ages. We offer a relaxed lounge atmosphere with complimentary drinks for adults." },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerChild = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--brand-border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-muted)] transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax for about section image
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutImgRef,
    offset: ["start end", "end start"],
  });
  const aboutY = useTransform(aboutProgress, [0, 1], [40, -40]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--brand-bg)]/70 border-b border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--brand-text)]">
            Bellish
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="http://bellishnails.booksy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[var(--brand-primary)] text-[var(--brand-bg)] px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Book Now
            </a>
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="md:hidden p-2 text-[var(--brand-text)]"
              aria-label="Menu"
            >
              {mobileNav ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[var(--brand-bg)]/95 backdrop-blur-xl border-t border-[var(--brand-border)]"
            >
              <div className="flex flex-col py-6 px-6 gap-5">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMobileNav(false)} className="text-[var(--brand-text)] text-sm tracking-wide">{link.label}</a>
                ))}
                <a href="http://bellishnails.booksy.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileNav(false)} className="bg-[var(--brand-primary)] text-[var(--brand-bg)] px-6 py-3 rounded-full text-sm font-semibold text-center">
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO: Full-bleed with blurred reveal ── */}
      <BlurredReveal
        src="/photos/photo-3.webp"
        alt="Holographic nail art at Bellish"
        height="140vh"
      >
        <div className="text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-[11px] uppercase tracking-[0.35em] text-white/50 mb-8"
          >
            52nd Street &middot; West Philadelphia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,10rem)] font-normal text-white tracking-tight leading-[0.85]"
          >
            Bellish
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white/60 mt-6 italic"
          >
            Bold nails. Black-owned. Pure vibes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="http://bellishnails.booksy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[var(--brand-primary)] text-[var(--brand-bg)] text-sm font-semibold rounded-full hover:brightness-110 transition tracking-wide"
            >
              Book Your Set
            </a>
            <a
              href="tel:+14846491931"
              className="px-10 py-4 border border-white/20 text-white text-sm rounded-full hover:bg-white/10 transition tracking-wide flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </motion.div>
        </div>
      </BlurredReveal>

      {/* ── INTRO STRIP: Thin elegant line (replaces red marquee) ── */}
      <div className="py-6 border-y border-[var(--brand-border)]">
        <div className="flex items-center justify-center gap-8 md:gap-16 overflow-hidden">
          {["Acrylics", "Gel", "Nail Art", "3D Design", "Removal", "Custom Sets"].map((item, i) => (
            <span key={i} className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] whitespace-nowrap flex items-center gap-8 md:gap-16">
              {item}
              {i < 5 && <span className="text-[var(--brand-primary)] text-[8px]">◆</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES: Elegant list ── */}
      <section id="services" className="py-28 lg:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">Services</p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
              The Menu
            </h2>
          </motion.div>
          <div>
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="service-item py-6 flex items-center justify-between gap-4 group cursor-default"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-lg md:text-xl font-medium text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {service.name}
                    </h3>
                    <span className="hidden md:block flex-1 border-b border-dotted border-[var(--brand-border)]" />
                    <span className="text-[var(--brand-primary)] text-sm font-mono whitespace-nowrap">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--brand-muted)] mt-1">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-12">
            <a
              href="http://bellishnails.booksy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] text-sm font-medium hover:gap-3 transition-all"
            >
              View full menu on Booksy <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PORTFOLIO: Creative masonry grid ── */}
      <section id="portfolio" className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">Portfolio</p>
            <div className="editorial-rule mx-auto" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal">
              The Work
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {portfolioImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`gallery-card ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT: Two-column with parallax image ── */}
      <section id="about" className="py-28 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">The Lounge</p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8">
              Your nails,{" "}
              <span className="italic text-[var(--brand-primary)]">your vision</span>
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-lg mb-6">
              Brazil and Tavi run a lounge on 52nd Street where every set starts
              with listening. Complimentary wine, curated music, and zero rush.
            </p>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-lg mb-10">
              Black-owned, detail-obsessed, and built on making first-timers
              feel like regulars. Walk in a client, leave a #BellishBabe.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[var(--brand-primary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-[var(--brand-muted)] font-mono">5.0 on Google</span>
            </div>
          </motion.div>
          <div ref={aboutImgRef} className="relative">
            <motion.div style={{ y: aboutY }} className="gallery-card aspect-[3/4]">
              <img
                src="/photos/photo-1.webp"
                alt="Bellish nail art"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            {/* Floating accent card */}
            <motion.div
              {...fadeUp}
              className="absolute -bottom-6 -left-6 md:-left-8 bg-[var(--brand-card)] border border-[var(--brand-border)] rounded-xl p-5 backdrop-blur-sm"
            >
              <p className="text-2xl font-[family-name:var(--font-display)]">100+</p>
              <p className="text-xs text-white/80 mt-1">Happy clients & counting</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS: Animated carousel with large quotes ── */}
      <section id="reviews" className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">Reviews</p>
            <div className="editorial-rule mx-auto" />
          </motion.div>

          {/* Large animated quote */}
          <div className="relative min-h-[300px] md:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeReview}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl font-normal leading-snug text-[var(--brand-text)]">
                  &ldquo;{reviews[activeReview].text}&rdquo;
                </p>
                <footer className="mt-8 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1 text-[var(--brand-primary)]">
                    {[...Array(reviews[activeReview].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-[var(--brand-muted)] uppercase tracking-widest">
                    — {reviews[activeReview].author}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeReview
                    ? "w-8 h-2 bg-[var(--brand-primary)]"
                    : "w-2 h-2 bg-[var(--brand-muted)]/40 hover:bg-[var(--brand-muted)]"
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">FAQ</p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal">
              Common Questions
            </h2>
          </motion.div>
          <div>
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FAQItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT: Dark elegant CTA ── */}
      <section id="contact" className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--brand-muted)] mb-3">Visit Us</p>
            <div className="editorial-rule mx-auto" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal mt-6 mb-12">
              Book Your Set
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="grid sm:grid-cols-3 gap-8 mb-14">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-border)] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
              </div>
              <div>
                <p className="font-mono text-sm">{businessContact.address}</p>
                <p className="font-mono text-sm text-[var(--brand-muted)]">{businessContact.city}, {businessContact.state} {businessContact.zip}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-border)] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
              </div>
              <a href={`tel:${businessContact.phone}`} className="font-mono text-sm hover:text-[var(--brand-primary)] transition-colors">
                {businessContact.phone}
              </a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-border)] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[var(--brand-primary)]" />
              </div>
              <div>
                <p className="font-mono text-sm">Mon–Fri 9AM–5PM</p>
                <p className="font-mono text-sm text-[var(--brand-muted)]">Sat–Sun 10AM–8PM</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <a
              href="http://bellishnails.booksy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--brand-primary)] text-[var(--brand-bg)] px-10 py-4 rounded-full text-sm font-semibold hover:brightness-110 transition tracking-wide"
            >
              Book on Booksy <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--brand-border)] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl mb-4">Bellish</h3>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed max-w-xs">
              Black-owned nail lounge on 52nd Street. Bold designs, warm vibes, complimentary wine.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-[var(--brand-text)]/60 hover:text-[var(--brand-text)] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-4">Hours</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(businessContact.hours).map(([day, time]) => (
                <div key={day} className="text-sm">
                  <span className="text-[var(--brand-muted)] font-mono">{day.slice(0, 3)}</span>{" "}
                  <span className="text-[var(--brand-text)]/60">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[var(--brand-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--brand-muted)]">
            &copy; {new Date().getFullYear()} Bellish Nail Lounge. All rights reserved.
          </p>
          <a href="tel:+14846491931" className="text-xs text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors font-mono">
            {businessContact.phone}
          </a>
        </div>
      </footer>

      <ClickToCall phone="(484) 649-1931" />
    </>
  );
}
