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
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    name: "Electrical Troubleshooting & Diagnostics",
    description:
      "Fast, accurate identification of power loss, tripped breakers, and dead outlets — often resolved in under 15 minutes on-site.",
    icon: "search",
  },
  {
    name: "GFCI Outlet Repair & Reset",
    description:
      "Diagnosis and repair of non-functioning outlets, including locating and resetting tripped GFCI protection points throughout the home.",
    icon: "plug",
  },
  {
    name: "New Construction Electrical Installation",
    description:
      "Complete electrical rough-in and finish work for new residential builds, including panel installation and circuit wiring.",
    icon: "hammer",
  },
  {
    name: "Breaker Panel Service & Upgrades",
    description:
      "Inspection, repair, and upgrading of electrical panels to ensure safe, code-compliant operation for your home.",
    icon: "zap",
  },
  {
    name: "Commercial & Multi-Unit Electrical Work",
    description:
      "Electrical installation and service for commercial properties, apartment complexes, and mixed-use buildings.",
    icon: "building",
  },
  {
    name: "Phone Consultation & Remote Diagnostics",
    description:
      "Free over-the-phone guidance to help homeowners self-diagnose simple electrical issues before committing to a service call.",
    icon: "phone",
  },
];

const reviews: Review[] = [
  {
    text: "I called Dylan regarding couple of outlets that were not working at my house. Dylan suggested few things for me to try. He said it may just be to reset the outlets. He said he hates to charge over $100 if it's just to reset. He suggested try to locate where the reset outlets are first.",
    author: "Edna Hallrud",
    rating: 5,
    source: "google",
  },
  {
    text: "these guys are amazing! just wanted to say if your looking for a great electrician these guys are it I had lost power to over a third of my home I had tried all the GFI's and tried to reset the breaker with no luck they came out and tracked the problem down in as little as 15 minutes.",
    author: "Denene Jones",
    rating: 5,
    source: "google",
  },
  {
    text: "They installed the electric for my new house. However, they violated electrical code installing duplex breakers into a panel that doesn't accept them. They refused to remedy the situation because I discovered the code violation too long after the install despite my having photos.",
    author: "Reed Nelson",
    rating: 2,
    source: "google",
  },
  {
    text: "Was awakened this morning by a workman for this company driving van #11 working on the garage below my apartment bedroom. I asked what was being installed. He told me it was none of my business. Claimed I was \"a problem\". Not civil at all & smokes on our non-smoking property.",
    author: "Lindsey Burdett",
    rating: 1,
    source: "google",
  },
  {
    text: "driver of van #11 drives very aggressive and likes to use his middle finger for a blinker and will cut you off.",
    author: "Cole Roth",
    rating: 1,
    source: "google",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Will you charge me just to come look at a simple problem?",
    answer:
      "Our team tries to avoid unnecessary charges. Dylan is known for walking customers through phone troubleshooting first — if it's something you can reset yourself, we'll tell you that before booking a visit. We hate charging over $100 for something you can handle in minutes.",
  },
  {
    question: "How quickly can you diagnose and fix a power outage in my home?",
    answer:
      "For many common issues like partial power loss or tripped circuits, our electricians have tracked down and resolved problems in as little as 15 minutes on-site. We come prepared to diagnose fast.",
  },
  {
    question: "Do you handle new construction electrical work?",
    answer:
      "Yes, we have installed electrical systems for new residential builds. We recommend confirming all work with a final inspection to ensure code compliance and documentation of the completed installation.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We are based in Hillsboro, OR on NE Elam Young Pkwy and primarily serve the Washington County area including surrounding communities in the Portland metro west side.",
  },
  {
    question: "What are your business hours?",
    answer:
      "We're open Monday through Friday, 8:00 AM to 4:00 PM. We are closed on weekends, so for after-hours emergencies we recommend calling first thing in the morning when we open.",
  },
  {
    question: "What should I do if I have a concern about work that was performed?",
    answer:
      "We encourage customers to document any concerns with photos or video and contact us directly as soon as possible. Timely communication gives us the best chance to review and address any installation questions before they become bigger issues.",
  },
];

const businessContact = {
  name: "Ertell Electric LLC",
  address: "5293 NE Elam Young Pkwy Ste 110",
  city: "Hillsboro",
  state: "OR",
  zip: "97124",
  phone: "(503) 596-2199",
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
        businessName="Ertell Electric LLC"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+15035962199"
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
              <span className="stat-badge">Mon–Fri</span>
              <span className="stat-badge">12 reviews</span>
              <span className="stat-badge">Hillsboro, OR</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              Honest fixes.
              <br />
              No unnecessary
              <br />
              <span className="text-[var(--brand-primary)]">charges.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--brand-muted)] max-w-md">
              Hillsboro&apos;s straightforward electrician. Dylan will walk you
              through a free phone diagnosis before booking a visit.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+15035962199"
                className="px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-full hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                Call (503) 596-2199
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
            alt="Ertell Electric LLC van"
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
            "Ertell Electric LLC",
            "Electrical Troubleshooting",
            "GFCI Outlet Repair",
            "Breaker Panel Service",
            "New Construction Wiring",
            "Free Phone Diagnostics",
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
              { target: 12, suffix: "", label: "Customer Reviews" },
              { target: 15, suffix: " Min", label: "Avg. Diagnostic Time" },
              { target: 5, suffix: "-Day", label: "Weekday Availability" },
              { target: 3.4, suffix: "★", label: "Google Rating" },
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
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--brand-primary)] font-semibold mb-2">
              Services
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight">
              What We Handle
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
          alt="Ertell Electric LLC on the job"
          speed={0.2}
          overlay
          overlayOpacity={0.6}
          containerClassName="h-[70vh] md:h-[80vh]"
        >
          <div className="flex items-center justify-center h-[70vh] md:h-[80vh] px-6">
            <motion.div
              {...fadeUp}
              className="max-w-2xl text-center text-white"
            >
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                When outlets fail, Dylan finds the fix.
              </h2>
              <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto">
                Edna called about outlets that had stopped working. Dylan diagnosed the problem and got them back on. That's the no-nonsense approach Ertell Electric brings to every job.
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
      <section id="contact" className="bg-[var(--brand-accent)]">
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(503) 596-2199" />
    </>
  );
}
