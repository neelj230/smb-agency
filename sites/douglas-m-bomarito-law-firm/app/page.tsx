// REFERENCE: EHUNTER — dark minimalist, big white text blocks animating in, fullscreen background video on scroll, overlapping project cards, live clock nav
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Mail, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    title: "Civil Litigation",
    category: "Courtroom Advocacy",
    year: "2024",
    description:
      "Steadfast courtroom and dispute advocacy representing clients through complex civil matters with decades of Oregon litigation experience.",
    color: "#1a1615",
    accent: "#c9502e",
  },
  {
    title: "Personal Injury",
    category: "Client Representation",
    year: "2024",
    description:
      "Diligent advocacy for clients injured by another's negligence, pursued with the honesty and tenacity Doug is known for.",
    color: "#141414",
    accent: "#84b9ef",
  },
  {
    title: "Business Law",
    category: "Advisory",
    year: "2024",
    description:
      "Practical legal guidance for small businesses and entrepreneurs navigating Oregon business law, disputes, and transactions.",
    color: "#1a1615",
    accent: "#0ea158",
  },
  {
    title: "Estate Planning",
    category: "Wills & Planning",
    year: "2024",
    description:
      "Thoughtful, personalized estate planning that ensures your wishes are honored and your family is protected with clarity.",
    color: "#141414",
    accent: "#f4e6da",
  },
];

const services = [
  {
    name: "Legal Consultation & Case Strategy",
    detail:
      "Direct, focused consultations where Doug assesses your situation and outlines a clear legal strategy without wasted time or vague advice.",
  },
  {
    name: "Civil Litigation",
    detail:
      "Steadfast courtroom and dispute advocacy representing clients through complex civil matters with decades of Oregon litigation experience.",
  },
  {
    name: "Contract Review & Drafting",
    detail:
      "Careful review, negotiation, and drafting of contracts to protect your interests and prevent costly disputes down the road.",
  },
  {
    name: "Personal Injury Representation",
    detail:
      "Diligent advocacy for clients injured by another's negligence, pursued with the honesty and tenacity Doug is known for.",
  },
  {
    name: "Business Law Advisory",
    detail:
      "Practical legal guidance for small businesses and entrepreneurs navigating Oregon business law, disputes, and transactions.",
  },
  {
    name: "Estate Planning & Wills",
    detail:
      "Thoughtful, personalized estate planning that ensures your wishes are honored and your family is protected with clarity.",
  },
];

const stats = [
  { value: "5★", label: "Perfect Client Rating" },
  { value: "39+", label: "Years of Legal Practice" },
  { value: "100%", label: "5-Star Reviews from Clients" },
  { value: "6", label: "Verified Client Reviews" },
];

// ─── LIVE CLOCK COMPONENT ────────────────────────────────────────────────────


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
          timeZone: "America/Los_Angeles",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[var(--brand-muted)] text-xs tracking-wider font-[family-name:var(--font-body)]">
      PDT {time}
    </span>
  );
}

export default function BusinessPage() {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(videoProgress, [0, 0.5], [1.15, 1]);
  const videoOpacity = useTransform(videoProgress, [0, 0.3], [0, 1]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white"
          >
            Bomarito Law
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
              Get legal help <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
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
            Law Firm in Tigard, OR
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
              We fight
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
              for clients who
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
              <span className="text-[var(--brand-accent)]">need results</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-[var(--brand-muted)] text-base md:text-lg max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Honest, kind, diligent. Nearly 40 years of steadfast legal advocacy in Tigard, Oregon.
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
          {/* Placeholder video — uses a gradient + animated overlay to simulate video feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1615] via-[#0a0a0a] to-[#1f1f1f]">
            {/* Simulated video frames with animated gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,80,46,0.15) 0%, transparent 40%, rgba(132,185,239,0.1) 70%, transparent 100%)",
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
              Serving Oregon Since 1985
            </motion.p>
          </div>

          {/* Right side caption */}
          <div className="absolute bottom-12 right-6 lg:right-12 z-20">
            <motion.p
              className="text-white/50 text-xs tracking-[0.2em] uppercase"
              {...fadeUp}
            >
              Douglas M Bomarito
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
              Practice Areas
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] text-white">
              Cases
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
                {/* Image placeholder */}
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden mb-5"
                  style={{ backgroundColor: project.color }}
                >
                  {/* Simulated project image with accent color gradient */}
                  <div
                    className="project-image absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 50%, ${project.accent}08 100%)`,
                    }}
                  />
                  {/* Corner accent */}
                  <div
                    className="absolute top-5 left-5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  {/* Bottom-right arrow on hover */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/70" />
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
                One attorney,
                <br />
                35 years of calm,
                <br />
                <span className="text-[var(--brand-accent)]">no shortcuts</span>
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
                Doug Bomarito has practiced law since 1985, earning a reputation for honesty, diligence, and steadfast advocacy. Clients describe him as &ldquo;hard to fluster&rdquo; and a &ldquo;real stand-up kind of guy.&rdquo;
              </p>
              <p className="text-[var(--brand-muted)] text-base leading-[1.8]">
                Direct and to the point, Doug&apos;s deep experience translates into successful cases. He doesn&apos;t waste your time with legalese.
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
              How we help
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
              Litigation &middot; Contracts &middot; Injury &middot; Estate Planning
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
            Have a case?
            <br />
            <span className="text-[var(--brand-accent)]">Get legal help.</span>
          </motion.h2>
          <motion.div className="mt-12" {...fadeUp}>
            <a
              href="tel:+15032238285"
              className="inline-flex items-center gap-3 bg-white text-[var(--brand-bg)] px-10 py-4 rounded-full text-sm font-semibold hover:bg-[var(--brand-accent)] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" /> Call (503) 223-8285
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
                Bomarito Law
              </span>
              <p className="mt-4 text-white/30 text-sm leading-relaxed max-w-xs">
                Hard to Fluster. Steadfast in Your Corner.
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
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> Tigard, OR
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                  7157 SW Beveland St, Tigard, OR 97223
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" /> Mon&ndash;Fri,
                  9am&ndash;6pm
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">
              &copy; 2026 Douglas M Bomarito. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-white/20 text-xs">(503) 223-8285</span>
              <span className="text-white/20 text-xs">Tigard, OR</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
