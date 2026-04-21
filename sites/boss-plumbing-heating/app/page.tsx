"use client";

import { Navbar } from "@/components/Navbar";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionDivider } from "@/components/SectionDivider";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ParallaxImage } from "@/components/ParallaxImage";
import type { NavLink, Review, FAQItem, Service } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    name: "Emergency Plumbing (24/7)",
    description:
      "Round-the-clock emergency response for burst pipes, flooding, and after-hours plumbing crises — with a real person answering the phone, not a service.",
    icon: "phone-call",
  },
  {
    name: "Sewer Line Repair & Backup Clearing",
    description:
      "Full sewer line diagnosis, high-pressure clearing, and repair for residential backups, including work with HomeServ and insurance contracts.",
    icon: "waves",
  },
  {
    name: "Drain Cleaning & Unclogging",
    description:
      "Professional drain clearing for stubborn or recurring clogs, with follow-up service if the problem persists — no questions asked.",
    icon: "arrow-down-circle",
  },
  {
    name: "Water Heater Installation & Replacement",
    description:
      "Same-day or next-day water heater replacement with full installation, haul-away of the old unit, and transparent upfront pricing.",
    icon: "flame",
  },
  {
    name: "Plumbing Inspection & Diagnostics",
    description:
      "Thorough plumbing assessments for new homeowners or older properties, including phone-based pre-diagnosis and full written estimates.",
    icon: "search",
  },
  {
    name: "Insurance & Home Warranty Coordination",
    description:
      "Experienced working alongside homeowner insurance claims and home warranty providers like HomeServ to simplify the repair process.",
    icon: "file-text",
  },
];

const reviews: Review[] = [
  {
    text: "Warren was so knowledgeable of our problem and our neighborhood that he was able to diagnose it over the phone! He was also super responsive to our questions. His team was polite about walking through our house and they got all the work done in one day.",
    author: "Erin and Craig",
    rating: 5,
    source: "google",
  },
  {
    text: "We had a sewer backup on the weekend during a snow storm. Everyone refused to come out until they called Warren at Boss Plumbing. He showed up, diagnosed it quickly, and had it fixed by that evening. Can't recommend enough.",
    author: "Darren Kline",
    rating: 5,
    source: "google",
  },
  {
    text: "It's 6pm on a Thursday. Your water heater decides it's done and starts flooding your utility room. I called two other plumbers. One didn't service our area. The other was booked. Boss picked up on the first ring.",
    author: "Andrea McAfee",
    rating: 5,
    source: "google",
  },
  {
    text: "The people at Boss were lifesavers. Recently bought a house and didn't realize how bad the plumbing was. They came out promptly, the price was exactly what they said, and they were always there when they said they would be.",
    author: "Tim Harding",
    rating: 5,
    source: "google",
  },
  {
    text: "They unclogged my drain and I still had an issue. They came back out with no problem and unclogged it again. Black owned business. I will highly recommend them.",
    author: "Tawaya Lewis",
    rating: 5,
    source: "google",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Can I actually reach someone after hours or on weekends?",
    answer:
      "Yes — and it's likely Warren himself who picks up. Multiple customers have called on Sunday evenings, during snowstorms, and at 6pm on weeknights and reached a real person immediately. Boss Plumbing & Heating is open 24 hours a day, 7 days a week with no answering service buffer.",
  },
  {
    question: "Will the final price match what I was quoted?",
    answer:
      "Consistently, yes. Customers repeatedly highlight that the price they were quoted was the price they paid — no surprise fees added after the work was done. Invoicing is handled digitally for easy payment and record-keeping.",
  },
  {
    question: "Do you work with home warranty providers like HomeServ?",
    answer:
      "Yes. Boss Plumbing & Heating is a licensed plumber that works directly with HomeServ and other home warranty contracts, handling the coordination so you don't have to manage the paperwork yourself.",
  },
  {
    question: "What if my problem isn't fully fixed the first time?",
    answer:
      "Boss stands behind their work. When one customer's drain clog returned after the initial visit, the team came back out without hesitation and resolved it at no additional hassle. They don't consider the job done until you do.",
  },
  {
    question: "How quickly can someone get to my home for an emergency?",
    answer:
      "Response times are fast — one customer had a technician on-site in under an hour for a water heater emergency. For most urgent calls in the Philadelphia area, same-day service is the standard, not the exception.",
  },
  {
    question: "Do you serve all Philadelphia neighborhoods?",
    answer:
      "Boss serves a wide range of Philadelphia neighborhoods including Germantown, Manayunk, Roxborough, and surrounding areas. Warren's familiarity with neighborhood-specific plumbing infrastructure often helps him diagnose issues faster than a standard service call.",
  },
];

const businessContact = {
  name: "Boss Plumbing & Heating",
  address: "259 W Johnson St",
  city: "Philadelphia",
  state: "PA",
  zip: "19144",
  phone: "(267) 748-4314",
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
// NARRATIVE FLOW: Hero (split) → Stats hook → Reviews (social proof) → Services → About parallax → FAQ → Contact
// This is STATS-FORWARD: prove credibility before explaining what you do.

export default function BusinessPage() {
  return (
    <>
      <Navbar
        businessName="Boss Plumbing & Heating"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12677484314"
      />

      {/* ── HERO: Split layout — text left, photo right ── */}
      <section className="min-h-screen grid md:grid-cols-2">
        {/* Left: Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-2 mb-8">
              <span className="stat-badge">24/7</span>
              <span className="stat-badge">227+ reviews</span>
              <span className="stat-badge">4.8 ★</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              We Pick Up.
              <br />
              We Show Up.
              <br />
              <span className="text-[var(--brand-primary)]">Done.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--brand-muted)] max-w-md">
              Philadelphia&apos;s 24/7 plumber. The price you&apos;re quoted is
              the price you pay. Warren answers the phone himself.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+12677484314"
                className="px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-full hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                Call (267) 748-4314
              </a>
              <a
                href="#services"
                className="px-8 py-4 border-2 border-[var(--brand-text)] rounded-full font-semibold hover:bg-[var(--brand-text)] hover:text-white transition-colors"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
        {/* Right: Photo */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
          <motion.img
            src="/photos/photo-1.webp"
            alt="Boss Plumbing & Heating van"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--brand-bg)] md:w-24" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="bg-[var(--brand-accent)] text-white">
        <MarqueeTicker
          items={[
            "Boss Plumbing & Heating",
            "Sewer Line Repair",
            "Drain Cleaning",
            "Water Heater Install",
            "Open 24/7",
            "HomeServ Approved",
            "The Quote is the Price",
          ]}
          separator="✦"
          speed={30}
        />
      </div>

      {/* ── STATS: Big animated numbers — the hook ── */}
      <section
        id="stats"
        className="py-24 lg:py-32 px-6 bg-[var(--brand-accent)] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {[
              { target: 227, suffix: "+", label: "Verified Reviews" },
              { target: 4.8, suffix: " Stars", label: "Average Rating" },
              { target: 1, suffix: " Hour", label: "Typical Response" },
              { target: 24, suffix: "/7", label: "Availability" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--brand-primary)]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>
                <p className="mt-3 text-sm text-white/50 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--brand-bg)" />

      {/* ── REVIEWS: Social proof before services ── */}
      <section id="reviews" className="py-20 lg:py-28">
        <TestimonialCarousel
          heading="Real Stories"
          reviews={reviews}
          variant="featured"
        />
      </section>

      <SectionDivider variant="diagonal" color="var(--brand-bg-alt)" />

      {/* ── SERVICES: Card grid with icons ── */}
      <section
        id="services"
        className="py-24 lg:py-32 px-6 bg-[var(--brand-bg-alt)] dot-bg"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--brand-text)] font-semibold mb-2">
              Services
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight">
              What We Fix
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="service-card-icon">
                  {["📞", "🌊", "🔽", "🔥", "🔍", "📋"][i]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  {service.name}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="var(--brand-bg)" />

      {/* ── ABOUT: Full-width parallax photo with overlaid text ── */}
      <section className="relative">
        <ParallaxImage
          src="/photos/photo-9.webp"
          alt="Boss Plumbing & Heating on the job"
          speed={0.2}
          overlay
          overlayOpacity={0.6}
          containerClassName="h-[70vh] md:h-[80vh]"
        >
          <div className="flex items-center justify-center h-[70vh] md:h-[80vh] px-6">
            <motion.div
              {...fadeUp}
              className="max-w-2xl text-center text-white bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-10"
            >
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                When two plumbers said no, Warren said yes.
              </h2>
              <p className="mt-6 text-lg text-white/90 max-w-lg mx-auto">
                6pm Thursday. Water heater dead, utility room flooding. Two plumbers passed — Warren picked up on the first ring. Fixed by midnight. That&apos;s what 24/7 actually means.
              </p>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 lg:py-28 px-6">
        <FAQAccordion heading="Questions" items={faqItems} />
      </section>

      <SectionDivider variant="wave" color="var(--brand-accent)" />

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="bg-[var(--brand-accent)]"
        style={{
          // Override brand text/muted/primary for dark-section contrast
          ["--brand-text" as never]: "#ffffff",
          ["--brand-muted" as never]: "rgba(255,255,255,0.85)",
          ["--brand-primary" as never]: "#ffffff",
        }}
      >
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(267) 748-4314" />
    </>
  );
}
