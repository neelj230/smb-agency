// REFERENCE: EHUNTER — dark minimalist, big white text blocks animating in, fullscreen background video on scroll, overlapping project cards, live clock nav
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Mail, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    title: "Custom Tattoos",
    category: "Original Artwork",
    year: "South Philly",
    description:
      "Original work, from small semicolon butterflies to larger custom pieces — drawn on you, not off a flash wall.",
    color: "#1a1615",
    accent: "#D4A017",
    image: "/photos/photo-3.webp",
  },
  {
    title: "Needle Piercings",
    category: "Sterile Technique",
    year: "Tim & Judith",
    description:
      "Nose, cartilage, conch, and beyond — sterile technique a working nurse called the cleanest she's ever had.",
    color: "#141414",
    accent: "#D4A017",
    image: "/photos/photo-5.webp",
  },
  {
    title: "Lobes Done Right",
    category: "Re-Piercing",
    year: "No Guns",
    description:
      "Clients who've had both consistently say needle lobes here are less painful and far more precise than any mall gun.",
    color: "#1a1615",
    accent: "#D4A017",
    image: "/photos/photo-7.webp",
  },
  {
    title: "Walk-Ins Welcome",
    category: "No Appointment",
    year: "~25 min wait",
    description:
      "Stop by during shop hours. Busy Sundays run about a 25-minute wait. Groups welcome.",
    color: "#141414",
    accent: "#D4A017",
    image: "/photos/photo-9.webp",
  },
];

const services = [
  {
    name: "Custom Tattoos",
    detail:
      "Original tattoo artwork designed and executed by experienced artists, from small delicate pieces to larger custom work.",
  },
  {
    name: "Body Piercing",
    detail:
      "Professional needle piercings performed with sterile technique and anatomy-based placement recommendations.",
  },
  {
    name: "Ear Piercing & Lobe Re-Piercing",
    detail:
      "Safe, precise lobe and cartilage piercings — a far gentler and more accurate alternative to mall gun piercings.",
  },
  {
    name: "Jewelry Downsizing & Changes",
    detail:
      "Follow-up appointments to swap healing jewelry for shorter posts or new pieces once swelling subsides.",
  },
];

const stats = [
  { value: "458+", label: "Customer Reviews" },
  { value: "4.5★", label: "Average Rating" },
  { value: "10+", label: "Years in South Philly" },
  { value: "5000+", label: "Tattoos & Piercings" },
];

// ─── LIVE CLOCK COMPONENT ────────────────────────────────────────────────────

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[var(--brand-muted)] text-xs tracking-wider font-[family-name:var(--font-body)]">
      PHL {time}
    </span>
  );
}

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(videoProgress, [0, 0.5], [1.15, 1]);
  const videoOpacity = useTransform(videoProgress, [0, 0.3], [0, 1]);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white"
          >
            NO KA OI
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <LiveClock />
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              Let&apos;s talk <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-white" aria-label="Menu">
              {mobileNav ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden backdrop-blur-xl bg-black/80 rounded-xl mx-6 mt-2" style={{ mixBlendMode: "normal" }}>
              <div className="flex flex-col py-4 px-6 gap-4">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setMobileNav(false)} className="text-white/80 hover:text-white text-sm transition-colors">{link.label}</a>
                ))}
                <a href="#contact" onClick={() => setMobileNav(false)} className="text-white text-sm font-medium">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO — Big white text blocks that animate in ── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[var(--brand-bg)] overflow-hidden px-6 lg:px-12">
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-32">
          {/* Overline */}
          <motion.p
            className="text-[var(--brand-muted)] text-xs tracking-[0.25em] uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tattoo & Piercing Studio
          </motion.p>

          {/* Big text blocks — each line animates independently */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
            >
              We ink
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.45,
              }}
            >
              visuals that
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-[-0.04em]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6,
              }}
            >
              <span className="text-[var(--brand-accent)]">move</span>{" "}
              <span className="text-white">culture</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-[var(--brand-muted)] text-base md:text-lg max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Tattoo and piercing studio in South Philly — walk-ins welcome,
            custom work by appointment.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-white"
                animate={{
                  height: ["0%", "100%", "0%"],
                  top: ["0%", "0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <span className="text-[var(--brand-muted)] text-xs tracking-wider">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION — Full-screen background video on scroll ── */}
      <section
        ref={videoSectionRef}
        className="relative h-[120vh] overflow-hidden"
      >
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ scale: videoScale, opacity: videoOpacity }}
        >
          {/* Hero photo with animated color wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1615] via-[#0a0a0a] to-[#1f1f1f]">
            <img
              src="/photos/photo-1.webp"
              alt="No Ka Oi Tiki Tattoo"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,160,23,0.15) 0%, transparent 40%, rgba(26,58,42,0.2) 70%, transparent 100%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Film grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />
          </div>

          {/* Video overlay gradient */}
          <div className="video-overlay absolute inset-0 z-10" />

          {/* Center play button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:scale-110 transition-all duration-500"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </motion.div>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-12 left-6 lg:left-12 z-20">
            <motion.p
              className="text-white/50 text-xs tracking-[0.2em] uppercase"
              {...fadeUp}
            >
              Fresh Ink &mdash; 2025
            </motion.p>
          </div>

          {/* Right side caption */}
          <div className="absolute bottom-12 right-6 lg:right-12 z-20">
            <motion.p
              className="text-white/50 text-xs tracking-[0.2em] uppercase"
              {...fadeUp}
            >
              No Ka Oi Tiki Tattoo
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS — Overlapping editorial cards ── */}
      <section
        id="work"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-20">
            <p className="text-[var(--brand-muted)] text-xs tracking-[0.25em] uppercase mb-4">
              Selected Ink
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
              Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                className="project-card group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden mb-5"
                  style={{ backgroundColor: project.color }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}20 0%, transparent 40%, rgba(0,0,0,0.4) 100%)`,
                    }}
                  />
                  {/* Corner accent */}
                  <div
                    className="absolute top-5 left-5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Project info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[var(--brand-muted)] text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-[var(--brand-muted)] text-xs tracking-wider">
                      {project.category}
                    </span>
                    <p className="text-white/30 text-xs mt-1">{project.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT — Minimal text, big statement ── */}
      <section
        id="about"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg-alt)] border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-muted)] text-xs tracking-[0.25em] uppercase mb-6">
                About
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                Two artists,
                <br />
                one studio, no
                <br />
                <span className="text-[var(--brand-accent)]">compromises</span>
              </h2>
            </motion.div>

            <motion.div
              className="lg:pt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-[var(--brand-muted)] text-base leading-[1.8] mb-8">
                No Ka Oi Tiki Tattoo is a South Philly studio where every
                piece starts with a conversation. The artists here work with
                you to create something that means something.
              </p>
              <p className="text-[var(--brand-muted)] text-base leading-[1.8]">
                Walk-ins are welcome for many services, and the shop keeps wait
                times short even on busy weekends. No filler. No fluff.
              </p>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-left"
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[var(--brand-muted)] text-sm mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — Clean list layout ── */}
      <section
        id="services"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-muted)] text-xs tracking-[0.25em] uppercase mb-4">
              Services
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              What we do
            </h2>
          </motion.div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 cursor-pointer hover:border-white/20 transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-baseline gap-4 mb-2 md:mb-0">
                  <span className="text-white/20 text-xs font-[family-name:var(--font-body)] tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight group-hover:text-[var(--brand-accent)] transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6 md:ml-4">
                  <p className="text-[var(--brand-muted)] text-sm max-w-sm">
                    {service.detail}
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors duration-300 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG TEXT MARQUEE ── */}
      <section className="py-20 overflow-hidden border-t border-b border-white/5 bg-[var(--brand-bg)]">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-[-0.03em] text-white/[0.04] mx-8"
            >
              Tattoo &middot; Piercing &middot; Custom &middot; Walk-Ins
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section
        id="contact"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.p
            className="text-[var(--brand-muted)] text-xs tracking-[0.25em] uppercase mb-6"
            {...fadeUp}
          >
            Get in touch
          </motion.p>
          <motion.h2
            className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white max-w-4xl mx-auto"
            {...fadeUp}
          >
            Have an idea?
            <br />
            <span className="text-[var(--brand-accent)]">Let&apos;s talk.</span>
          </motion.h2>
          <motion.div className="mt-12" {...fadeUp}>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-[var(--brand-bg)] px-10 py-4 rounded-full text-sm font-semibold hover:bg-[var(--brand-accent)] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" /> Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white">
                NO KA OI
              </span>
              <p className="mt-4 text-white/30 text-sm leading-relaxed max-w-xs">
                Tattoo & Piercing · South Philadelphia
              </p>
            </div>
            <div>
              <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-5">
                Navigate
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/40 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-5">
                Contact
              </h4>
              <div className="space-y-3 text-white/40 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> 610 S 4th St, Philadelphia, PA 19147
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" /> (215) 925-1766
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" /> Daily, 11am&ndash;9pm
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">
              &copy; 2026 No Ka Oi Tiki Tattoo. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/20 text-xs hover:text-white/50 transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-white/20 text-xs hover:text-white/50 transition-colors"
              >
                Yelp
              </a>
              <a
                href="#"
                className="text-white/20 text-xs hover:text-white/50 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
