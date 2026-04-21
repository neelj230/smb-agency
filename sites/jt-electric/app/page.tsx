"use client";

import { Navbar } from "@/components/Navbar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import type { NavLink, FAQItem } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ───────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Work", href: "#services" },
  { label: "Story", href: "#story" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { name: "Panel upgrades", blurb: "Service panels, sub-panels, high-load circuits." },
  { name: "EV charger install", blurb: "Clean home runs, code-compliant, outlet placement your way." },
  { name: "Pool & spa wiring", blurb: "Pumps, heaters, disconnects — built to inspect, not to fail." },
  { name: "Outlets & circuits", blurb: "Bathrooms, kitchens, dedicated runs for the thing that keeps tripping." },
  { name: "Exterior conduit", blurb: "Weatherproof boxes, equipment pads, clean line-of-sight routing." },
  { name: "Troubleshooting", blurb: "Find it, name it, fix it. Same-day when the schedule allows." },
];

const team = [
  { name: "Jeremy", role: "Owner", note: "Sets the bar. Sends a new crew when the bar slips." },
  { name: "Brendan", role: "Estimator", note: "The one who explains what the job actually needs." },
  { name: "Cameron", role: "Electrician", note: "Fast diagnosis. Coordinates the lineman side too." },
  { name: "Kyle", role: "Electrician", note: "Residential specialist. No overcomplicating." },
  { name: "Austin", role: "Electrician", note: "Outlets to EV chargers. Makes hard jobs look routine." },
];

const faqItems: FAQItem[] = [
  {
    question: "How fast can you come out?",
    answer:
      "Same-day when the calendar allows. One customer described Cameron and Kyle as getting to the house quick and solving it on the first visit. Call (541) 734-5714 during business hours to get on the schedule.",
  },
  {
    question: "Do you handle utility coordination?",
    answer:
      "Yes — we coordinate with linemen when the job crosses that line. You don't have to chase two contractors.",
  },
  {
    question: "Can you work on homes outside Central Point?",
    answer:
      "We serve the Rogue Valley and take on out-of-area projects when communication can carry the job. One customer lived 220 miles away during a full pool and spa panel install and said our communication was what made it work.",
  },
  {
    question: "How does quoting work?",
    answer:
      "A technician assesses the job in person and explains what it needs — clearly, specifically. The office writes it up fast and follows up. Customers consistently describe the quotes as expeditious and reasonably priced.",
  },
  {
    question: "What if the work isn't right?",
    answer:
      "Jeremy sends another crew, redoes the work, and adjusts the bill. That's not a policy, it's how the shop was built.",
  },
];

const businessContact = {
  name: "JT Electric",
  address: "4849 Airway Dr STE 105",
  city: "Central Point",
  state: "OR",
  zip: "97502",
  phone: "(541) 734-5714",
  email: "",
  hours: {
    Monday: "8:00 AM – 4:00 PM",
    Tuesday: "8:00 AM – 4:00 PM",
    Wednesday: "8:00 AM – 4:00 PM",
    Thursday: "8:00 AM – 4:00 PM",
    Friday: "8:00 AM – 4:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ─────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, ease: "easeOut" },
};

// ─── PAGE ───────────────────────────────────────────────────────────────────
// NARRATIVE: Editorial typographic hero → ticker → services list → proof stats
//            → accountability feature (dark, grain) → gallery → team → FAQ → contact
// The photos are utilitarian — so we foreground type, craft, and voice.

export default function JTElectricPage() {
  return (
    <>
      <Navbar
        businessName="JT Electric"
        links={navLinks}
        ctaText="(541) 734-5714"
        ctaHref="tel:+15417345714"
      />

      {/* ── HERO: Editorial typographic full-bleed ── */}
      <section className="relative min-h-screen px-6 md:px-10 lg:px-16 pt-28 md:pt-32 pb-20 overflow-hidden">
        {/* Corner registration marks */}
        <div className="absolute top-28 left-6 md:left-10 lg:left-16 meta hidden md:block">
          Central Point, OR · Est. Rogue Valley
        </div>
        <div className="absolute top-28 right-6 md:right-10 lg:right-16 meta text-right hidden md:block">
          4.9 ★ · 29 Verified Reviews
        </div>

        <div className="max-w-[1400px] mx-auto">
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-end gap-4 mb-10 md:mb-14"
          >
            <span className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,6rem)] leading-none tracking-tight">
              JT
            </span>
            <span className="meta pb-3">Electric · Licensed OR</span>
          </motion.div>

          {/* Main tagline — editorial serif */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-[-0.03em] font-[450]"
          >
            Show up.
            <br />
            <span className="italic font-[400]" style={{ fontVariationSettings: '"SOFT" 50' }}>
              Fix it.
            </span>{" "}
            <span className="relative inline-block">
              <span className="text-[var(--brand-primary)]">Own it.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[4px] bg-[var(--brand-primary)] origin-left"
              />
            </span>
          </motion.h1>

          {/* Kicker paragraph, two-column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-12"
          >
            <div className="md:col-span-5 md:col-start-1">
              <p className="meta mb-4">Folio 01 — What We Are</p>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--brand-ink)]/85 max-w-md">
                A small crew of electricians in the Rogue Valley. Panels, EV
                chargers, pool and spa wiring — the work other shops pad into
                mystery. We name the job, write it up fast, and show up when we
                said we would.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end gap-6">
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+15417345714"
                  className="px-7 py-4 bg-[var(--brand-ink)] text-[var(--brand-bg)] text-sm font-medium tracking-wide rounded-full hover:bg-[var(--brand-primary)] hover:text-[var(--brand-ink)] transition-colors duration-300"
                >
                  Call (541) 734-5714
                </a>
                <a href="#services" className="link-amber">
                  See the work ↓
                </a>
              </div>
              <div className="meta">
                Mon–Fri · 8–4 · Serving Medford, Ashland, Grants Pass
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom ruler */}
        <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 flex items-center gap-4">
          <span className="meta">01 / 08</span>
          <div className="rule flex-1" />
          <span className="meta">Folio</span>
        </div>
      </section>

      {/* ── MARQUEE TICKER (outline variant, amber) ── */}
      <div
        className="bg-[var(--brand-ink)] text-[var(--brand-primary)] border-y border-[var(--brand-ink)]"
        aria-hidden
      >
        <MarqueeTicker
          items={[
            "Panel Upgrades",
            "EV Chargers",
            "Pool & Spa Wiring",
            "Troubleshooting",
            "Exterior Conduit",
            "Rogue Valley",
          ]}
          separator="⚡"
          speed={35}
          variant="bold"
        />
      </div>

      {/* ── SERVICES: Editorial numbered list ── */}
      <section
        id="services"
        className="py-28 lg:py-36 px-6 md:px-10 lg:px-16"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-16 md:mb-20 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <p className="meta mb-3">Folio 02</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-[450]">
                The work.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-base md:text-lg text-[var(--brand-muted)] leading-relaxed">
                Residential and specialty electrical across the Rogue Valley.
                Six categories that cover the calls we get most — plus the ones
                that need a grown-up.
              </p>
            </div>
          </motion.div>

          <div>
            {services.map((service, i) => (
              <a
                key={service.name}
                href="#contact"
                className="service-row group"
              >
                <span className="service-num">0{i + 1}</span>
                <div>
                  <div className="service-name">{service.name}</div>
                  <p className="mt-3 text-[var(--brand-muted)] max-w-lg">
                    {service.blurb}
                  </p>
                </div>
                <span className="service-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP (dark, quiet) ── */}
      <section className="bg-[var(--brand-ink)] text-[var(--brand-bg)] py-24 lg:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.p {...fadeUp} className="meta text-[var(--brand-primary)] mb-10">
            Folio 03 — By The Numbers
          </motion.p>
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16"
          >
            {[
              { target: 4.9, suffix: "", label: "Google Rating" },
              { target: 29, suffix: "+", label: "Verified Reviews" },
              { target: 100, suffix: "+", label: "Rogue Valley Homes" },
              { target: 220, suffix: "mi", label: "Furthest Job" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl font-[400] tracking-tight leading-none">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-[var(--brand-primary)]" />
                  <span className="meta text-[var(--brand-bg)]/70">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ACCOUNTABILITY FEATURE: Jeremy story (dark + grain) ── */}
      <section
        id="story"
        className="relative bg-[var(--brand-ink)] text-[var(--brand-bg)] py-28 lg:py-40 px-6 md:px-10 lg:px-16 film-grain overflow-hidden"
      >
        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.p {...fadeUp} className="meta text-[var(--brand-primary)] mb-10">
            Folio 04 — Accountability
          </motion.p>

          <motion.blockquote
            {...fadeIn}
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4.25rem)] leading-[1.12] tracking-[-0.02em] font-[400]"
          >
            <span className="text-[var(--brand-primary)] italic">“</span>
            I will recommend JT Electric — the owner{" "}
            <span className="italic">Jeremy</span> sent out another crew to
            redo the work and adjusted the bill.
            <span className="text-[var(--brand-primary)] italic">”</span>
          </motion.blockquote>

          <motion.div
            {...fadeUp}
            className="mt-10 flex items-center gap-4 meta text-[var(--brand-bg)]/60"
          >
            <span>Ray &amp; Stacey Egbert</span>
            <span className="w-8 h-px bg-[var(--brand-bg)]/30" />
            <span>Google Review</span>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-16 grid md:grid-cols-2 gap-12 md:gap-20"
          >
            <div>
              <p className="meta text-[var(--brand-primary)] mb-4">
                How Jeremy runs it
              </p>
              <p className="text-lg leading-relaxed text-[var(--brand-bg)]/85">
                A pool heat pump install didn&apos;t meet the bar. Bad routing,
                sloppy connections. Jeremy didn&apos;t argue the point. He
                dispatched a new crew, redid the work correctly, and adjusted
                the invoice.
              </p>
            </div>
            <div>
              <p className="meta text-[var(--brand-primary)] mb-4">
                Why customers call twice
              </p>
              <p className="text-lg leading-relaxed text-[var(--brand-bg)]/85">
                Because accountability from the owner is rarer than competence
                on the truck. The crew — Brendan, Cameron, Kyle, Austin —
                carries that standard into every house they walk into.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WORK GALLERY ── */}
      <section className="py-28 lg:py-36 px-6 md:px-10 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-16 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-6">
              <p className="meta mb-3">Folio 05 — Field Work</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[0.95] tracking-tight font-[450]">
                Real installs.
                <br />
                <span className="italic">No stock photos.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex items-end">
              <p className="text-base md:text-lg text-[var(--brand-muted)] leading-relaxed">
                Clean routing, labeled disconnects, boxes set plumb. The things
                inspectors notice and homeowners don&apos;t — until they do.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.figure
              {...fadeUp}
              className="picture-frame"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--brand-ink)]">
                <img
                  src="/photos/photo-1.webp"
                  alt="Pentair panel with clean conduit routing to exterior wall"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between">
                <span className="meta">01 / Pool &amp; Spa Panel</span>
                <span className="meta text-[var(--brand-primary)]">
                  Code-compliant
                </span>
              </figcaption>
            </motion.figure>

            <motion.figure
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="picture-frame"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--brand-ink)]">
                <img
                  src="/photos/photo-2.webp"
                  alt="Exterior conduit run with weatherproof outlet box and labeled disconnects"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between">
                <span className="meta">02 / Exterior Conduit</span>
                <span className="meta text-[var(--brand-primary)]">
                  Labeled + plumb
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ── TEAM (minimal, typographic) ── */}
      <section id="team" className="py-28 lg:py-36 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-14 md:mb-20 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <p className="meta mb-3">Folio 06</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[0.95] tracking-tight font-[450]">
                The crew.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-base md:text-lg text-[var(--brand-muted)] leading-relaxed">
                Named, not a department. Customers write reviews by first name
                here — because whoever shows up is the person who finishes it.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-0">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="grid grid-cols-[auto_1fr] gap-6 py-8 border-t border-[var(--brand-rule)] md:px-8 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-[var(--brand-rule)]"
              >
                <span className="service-num pt-2">0{i + 1}</span>
                <div>
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight font-[450]">
                      {member.name}
                    </span>
                    <span className="meta">{member.role}</span>
                  </div>
                  <p className="mt-3 text-[var(--brand-muted)] leading-relaxed max-w-md">
                    {member.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOLT DIVIDER ── */}
      <div className="py-10 bolt-divider">
        <span />
        <span />
        <span />
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 lg:py-32 px-6 md:px-10 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-14">
            <p className="meta mb-3">Folio 07</p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[0.95] tracking-tight font-[450]">
              Questions first.
            </h2>
          </motion.div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[var(--brand-ink)] text-[var(--brand-bg)]">
        <ContactSection
          business={businessContact}
          heading="Get on the schedule."
          showMap={true}
        />
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(541) 734-5714" />
    </>
  );
}
