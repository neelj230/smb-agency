"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const PHONE_DISPLAY = "(503) 801-9038";
const PHONE_TEL = "tel:5038019038";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    name: "Panel Changes & Service Upgrades",
    blurb:
      "New service panels, breaker swaps, and full system upgrades — done to code, done once.",
  },
  {
    name: "EV Chargers, Hot Tubs & RV Hookups",
    blurb:
      "Level 2 chargers, spa hookups, and 50-amp RV circuits — installed clean and dialed in to your load.",
  },
  {
    name: "Remodels & Design-Build",
    blurb:
      "Kitchens, baths, additions. Work from your plans or let us draw them up — rough-in to final fixtures.",
  },
  {
    name: "New Construction",
    blurb:
      "Full rough-in and finish work for homes and commercial builds — framing-stage to final walkthrough.",
  },
  {
    name: "Commercial TI & Industrial",
    blurb:
      "Tenant improvements, warehouse wiring, and multi-drop industrial feeds. Precision work at any scale.",
  },
  {
    name: "Service & Troubleshooting",
    blurb:
      "Loose outlets, flickering lights, dead circuits — fast availability, clean work, no guesswork.",
  },
];

const REVIEWS = [
  {
    text:
      "Joe is the nicest and most knowledgeable electrician I've ever met. I've worked with electricians for over thirty years — that's not a small claim.",
    author: "Nicky Bruce",
    meta: "Construction Industry, 30+ Yrs",
  },
  {
    text:
      "He installed an EV charger and 50-amp RV hookup at my house, then three 50-amp industrial connections at my warehouse. Precise, well-planned, done by a clearly highly trained electrician.",
    author: "Kevin Fish",
    meta: "Residential + Commercial",
  },
  {
    text:
      "Our kitchen renovation changed scope mid-project and they just… accommodated it. Then helped at my mom's house too. Safe, clean, and done right.",
    author: "Ruth Ann Albro",
    meta: "Kitchen Renovation",
  },
  {
    text:
      "Bid was thorough and on time. Outlets, fixtures, recessed lighting — the bathroom came out exactly how we wanted. Calling OC Electric next time, every time.",
    author: "James Wohlmacher",
    meta: "Bathroom Remodel",
  },
];

const GALLERY = [
  { src: "/photos/photo-1.webp", alt: "Service panel installation mid-construction", layout: "big", caption: "Panel Install" },
  { src: "/photos/photo-6.webp", alt: "Finished luxury kitchen with installed lighting", layout: "wide", caption: "Kitchen Finish" },
  { src: "/photos/photo-3.webp", alt: "Rough-in wiring with framing exposed", layout: "tall", caption: "Rough-In" },
  { src: "/photos/photo-7.webp", alt: "New construction framing with wiring", layout: "", caption: "New Build" },
  { src: "/photos/photo-5.webp", alt: "Commercial storefront finish with recessed lighting", layout: "wide", caption: "Storefront" },
  { src: "/photos/photo-10.webp", alt: "Industrial wiring detail", layout: "", caption: "Commercial" },
  { src: "/photos/photo-4.webp", alt: "Residential interior finished", layout: "", caption: "Residential" },
  { src: "/photos/photo-8.webp", alt: "Renovation in progress", layout: "", caption: "In Progress" },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <Link href="#top" className="nav-brand">
        <Image src="/logo.jpg" alt="OC Electric" width={72} height={72} className="nav-logo" />
        <span className="nav-brand-text">OC Electric</span>
      </Link>
      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="nav-link">
            {l.label}
          </Link>
        ))}
      </div>
      <a href={PHONE_TEL} className="nav-cta">
        <span>Call Joe</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </a>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-left">
        <motion.div
          className="hero-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-kicker-dot" />
          <span>Oregon City · Since 2023 · Licensed &amp; Insured</span>
        </motion.div>

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          Wired right.<br />
          <em>Ask Joe.</em>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          A five-star Oregon City electrician for homes, businesses, and the jobs in between.
          Clean work, safe results, and a bid you can actually read.
        </motion.p>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          <a href={PHONE_TEL} className="hero-cta">
            <span>Call {PHONE_DISPLAY}</span>
            <svg className="hero-cta-arrow" width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#services" className="hero-secondary">
            See what we do
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 1L9 9M9 9V3M9 9H3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="hero-photo-wrap">
          <motion.div style={{ y: photoY, scale: photoScale, position: "absolute", inset: 0 }}>
            <Image
              src="/photos/photo-1.webp"
              alt="Service panel installation in progress"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 50vw"
              className="hero-photo"
            />
          </motion.div>
          <span className="hero-caption">OC-ELEC · FIELD NO. 0142</span>
        </div>
        <div className="hero-badge">
          <div className="hero-badge-rating">
            <span className="hero-badge-stars">★★★★★</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink)", letterSpacing: "0.12em" }}>5.0</span>
          </div>
          <div className="hero-badge-text">21 Google Reviews · 0 Complaints</div>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "Residential", "Commercial", <em key="em1">Design-Build</em>, "EV Chargers",
    "Panel Changes", <em key="em2">Hot Tubs</em>, "Remodels", "Commercial TI",
    "Troubleshooting", <em key="em3">Great Availability</em>,
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="section services">
      <div className="container-narrow">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>— 01 / Services</div>
            <h2 className="section-heading">
              What we <em>do.</em>
            </h2>
          </div>
          <p className="section-lede">
            Clean, code-compliant work across residential, commercial, and industrial.
            Honest bids, great availability, and a standard that doesn't move from one job to the next.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s.name}
              href={PHONE_TEL}
              className="service-row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <span className="service-num">/ {String(i + 1).padStart(2, "0")}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.blurb}</p>
              <span className="service-arrow">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path d="M3 19L19 3M19 3H7M19 3V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section about">
      <div className="container-narrow">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>— 02 / Behind OC Electric</div>
            <h2 className="section-heading">
              Clean work.<br />
              <em>Done to code.</em>
            </h2>
          </div>
          <p className="section-lede">
            OC Electric is built on the boring fundamentals: code-compliant installs,
            fair prices, and the kind of availability you actually want in an electrician.
          </p>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-quote-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="about-quote-mark">&ldquo;</span>
            <p className="about-quote">
              Joe and his crew are <em>amazing.</em> I've worked with electricians for over thirty years — he's the nicest and most knowledgeable I've ever met.
            </p>
            <div className="about-attribution">
              <strong>Nicky Bruce</strong> · 30+ yrs in construction · Google review
            </div>
          </motion.div>

          <motion.div
            className="about-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p>
              Joe founded OC Electric in Oregon City to do electrical the way he'd want it done in his own
              house — clean, code-compliant, and priced fair. Three years in, every Google review is five stars.
            </p>
            <p>
              We work the full range — a panel change or hot tub hookup one morning, a commercial TI or
              design-build the next. Residential, commercial, remodels, new construction, service and
              troubleshooting. Same precision. Same standard. Every job.
            </p>
            <div className="about-stats">
              <div>
                <div className="about-stat-value">5.0</div>
                <div className="about-stat-label">Average Rating</div>
              </div>
              <div>
                <div className="about-stat-value">21+</div>
                <div className="about-stat-label">Verified Reviews</div>
              </div>
              <div>
                <div className="about-stat-value">7 <span style={{ fontSize: "0.5em", color: "var(--muted)" }}>/ days</span></div>
                <div className="about-stat-label">Open Every Week</div>
              </div>
              <div>
                <div className="about-stat-value">0</div>
                <div className="about-stat-label">Complaints Filed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="work" className="section gallery">
      <div className="container-narrow">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22, color: "var(--accent-soft)" }}>— 03 / The Work</div>
            <h2 className="section-heading">
              Recent jobs,<br /><em>on record.</em>
            </h2>
          </div>
          <p className="section-lede">
            Service panels mid-install, rough-ins on new construction, finished kitchens and storefronts.
            A small sample from recent months.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((photo, i) => (
            <motion.div
              key={photo.src}
              className={`gallery-item ${photo.layout === "big" ? "gallery-item--big" : photo.layout === "wide" ? "gallery-item--wide" : photo.layout === "tall" ? "gallery-item--tall" : ""}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
              <span className="gallery-item-caption">{photo.caption}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────────────────────
function Reviews() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const review = REVIEWS[idx];
  return (
    <section id="reviews" className="section reviews">
      <div className="container-narrow">
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>— 04 / Customer Voices</div>
            <h2 className="section-heading">
              Perfect rating,<br /><em>every review.</em>
            </h2>
          </div>
          <p className="section-lede">
            Pulled straight from Google. No curated snippets — these are the full reviews,
            exactly as written.
          </p>
        </div>

        <div className="review-featured">
          <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              <em>&ldquo;</em>{review.text}<em>&rdquo;</em>
            </p>
            <div className="review-attribution">
              <span className="review-attribution-name">{review.author}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--line-strong)" }} />
              <span className="review-attribution-meta">{review.meta}</span>
            </div>
          </motion.div>
          <div className="review-nav" role="tablist">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`review-dot ${i === idx ? "review-dot--active" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT (split: info + inquiry form)
// ─────────────────────────────────────────────────────────────────────────────
const OWNER_EMAIL = "joe@ocelectricco.com";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  function update<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Website inquiry from ${values.name || "a visitor"}`;
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : "",
      values.projectType ? `Project type: ${values.projectType}` : "",
      "",
      "Message:",
      values.message,
    ].filter(Boolean);
    const body = lines.join("\n");
    const href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSubmitted(true);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="contact-form-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="contact-form-heading">Send an inquiry</h3>
      <p className="contact-form-sub">
        Fill this out and we'll get back to you within a day.
      </p>

      <div className="contact-form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            className="form-input"
            type="text"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="cf-phone">Phone</label>
          <input
            id="cf-phone"
            className="form-input"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            className="form-input"
            type="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="cf-type">Project type</label>
          <select
            id="cf-type"
            className="form-select"
            value={values.projectType}
            onChange={(e) => update("projectType", e.target.value)}
          >
            <option value="">Select one —</option>
            <option value="Panel change / service upgrade">Panel change / service upgrade</option>
            <option value="EV charger / hot tub / RV hookup">EV charger / hot tub / RV hookup</option>
            <option value="Remodel / design-build">Remodel / design-build</option>
            <option value="New construction">New construction</option>
            <option value="Commercial TI / industrial">Commercial TI / industrial</option>
            <option value="Service / troubleshooting">Service / troubleshooting</option>
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="cf-message">Tell us about the job</label>
          <textarea
            id="cf-message"
            className="form-textarea"
            required
            rows={4}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="A few details — location, timeline, anything relevant."
          />
        </div>

        {submitted && (
          <div className="form-success">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 10.5L8.5 14L15 7" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Opening your email to send — just hit send when it pops up.</span>
          </div>
        )}

        <button type="submit" className="form-submit">
          Send Inquiry
          <svg className="form-submit-arrow" width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <p className="form-hint">Goes straight to {OWNER_EMAIL}</p>
      </div>
    </motion.form>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container-narrow">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="eyebrow">— 05 / Get in Touch</div>
            <h2 className="contact-headline">
              Got a job? <em>Let's talk.</em>
            </h2>
            <p className="contact-lede">
              Prefer the phone? Call Joe directly — he'll usually pick up.
              Or drop the details in the form and he'll get back to you within a day.
            </p>

            <div className="contact-direct">
              <div className="contact-direct-row">
                <span className="contact-direct-label">Call</span>
                <a href={PHONE_TEL} className="contact-direct-value">{PHONE_DISPLAY}</a>
              </div>
              <div className="contact-direct-row">
                <span className="contact-direct-label">Email</span>
                <a href={`mailto:${OWNER_EMAIL}`} className="contact-direct-value">{OWNER_EMAIL}</a>
              </div>
              <div className="contact-direct-row">
                <span className="contact-direct-label">Visit</span>
                <span className="contact-direct-value-plain">14960 S Victory Rd · Oregon City, OR 97045</span>
              </div>
              <div className="contact-direct-row">
                <span className="contact-direct-label">Hours</span>
                <span className="contact-direct-value-plain">Mon – Sun · 7 AM – 6 PM</span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container-narrow">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <div className="footer-brand-logo">
              <Image src="/logo.jpg" alt="OC Electric" width={88} height={88} />
              <span className="footer-brand-name">OC Electric</span>
            </div>
            <p className="footer-brand-tagline">
              Oregon City's five-star electrician. Residential, commercial, industrial. Clean work, done to code.
            </p>
          </div>
          <div>
            <div className="footer-col-heading">Visit</div>
            <div className="footer-list">
              <span>14960 S Victory Rd</span>
              <span>Oregon City, OR 97045</span>
              <a href="https://maps.google.com/?q=14960+S+Victory+Rd+Oregon+City+OR+97045" target="_blank" rel="noreferrer">Get directions ↗</a>
            </div>
          </div>
          <div>
            <div className="footer-col-heading">Call &amp; Email</div>
            <div className="footer-list">
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              <a href="mailto:joe@ocelectricco.com">joe@ocelectricco.com</a>
              <span>Mon–Sun · 7 AM – 6 PM</span>
              <a href="https://www.facebook.com/profile.php?id=61588364212026" target="_blank" rel="noreferrer">Facebook ↗</a>
            </div>
          </div>
          <div>
            <div className="footer-col-heading">Site</div>
            <div className="footer-list">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OC Electric · Licensed &amp; Insured</span>
          <span>Wired Right. Done to Code.</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <a href={PHONE_TEL} className="float-call" aria-label="Call OC Electric">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 2 3.18 2 2 0 0 1 4 1h3.09a2 2 0 0 1 2 1.72c.13.96.37 1.9.73 2.8a2 2 0 0 1-.45 2.11L8.09 9.09a16 16 0 0 0 6 6l1.46-1.28a2 2 0 0 1 2.11-.45c.9.36 1.84.6 2.8.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <span className="float-call-label">Call Joe</span>
      </a>
    </>
  );
}
