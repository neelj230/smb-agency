'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion } from 'framer-motion'

// ─── Brand tokens ────────────────────────────────────────────────
const BRAND = '#1B3A2D'
const ACCENT = '#004055'

// ─── Nav ─────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Photos ───────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Exterior electrical conduit installation with wiring, outlet box, and instruction manual on concrete wall',
  category: 'work',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Pentair water filtration system installed on exterior wall with pipes and components',
  category: 'product',
}

// ─── Services ─────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Electrical Panel Installation & Upgrades',
    description:
      'Full service panel installation and upgrades for residential and specialty applications including pools, spas, and high-load equipment.',
    icon: 'zap',
  },
  {
    name: 'EV Charger Installation',
    description:
      'Home electric vehicle charger installation with proper wiring, outlet placement, and code-compliant connections.',
    icon: 'car',
  },
  {
    name: 'Outlet & Circuit Installation',
    description:
      'Installation of new outlets, bathroom circuits, and dedicated circuits for appliances or specialty equipment.',
    icon: 'plug',
  },
  {
    name: 'Pool & Spa Electrical',
    description:
      'Code-compliant electrical connections for pools, spas, heat pumps, and related water feature equipment.',
    icon: 'waves',
  },
  {
    name: 'Exterior & Conduit Wiring',
    description:
      'Exterior electrical conduit runs, weatherproof outlet boxes, and outdoor wiring for structures, equipment pads, and utility connections.',
    icon: 'cable',
  },
  {
    name: 'Electrical Troubleshooting & Repair',
    description:
      'Fast diagnosis and repair of electrical faults, tripped circuits, and wiring problems with same-day response when available.',
    icon: 'search',
  },
]

// ─── Reviews ──────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "Cameron and Kyle from JT electric were awesome! They got to our house quick, immediately fixed the problem, and even helped out with getting a lineman to do their part too! I would recommend them to anyone needing help with their electric!",
    author: 'Elli Gerlitz',
    rating: 5,
    source: 'google',
  },
  {
    text: "Brendan, from JT Electric, came out and gave a clear explanation of what needed to be done; clear, yet to the point. Also, the office of JT Electric processed Brendan's quote, expeditiously and reasonably priced, with follow up. Looking for electrical help? I recommend checking t...",
    author: 'Watchyertopknot AhhhGrizz',
    rating: 5,
    source: 'google',
  },
  {
    text: "JT recently installed a service panel and connections for a new pool and spa. They were GREAT communicators (which is very important since we live 220 miles away from our \"project\" home!). The work looked very professional. Would definitely call on them again in the future.",
    author: 'STEVE DIX',
    rating: 5,
    source: 'google',
  },
  {
    text: "Just wanted to say I appreciate true professionals who can get you scheduled, show up on time, and do the job right! I had two bathroom outlets and a car charger installed a week ago Tuesday, and I'm sorry I didn't catch your partner's name but Austin you impressed me by saying i...",
    author: 'Richard Strahm',
    rating: 5,
    source: 'google',
  },
]

// ─── Stats ────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9, suffix: '★', label: 'Average Customer Rating' },
  { value: 29, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 5, label: 'Days a Week, Ready to Work' },
  { value: 100, suffix: '+', label: 'Rogue Valley Homes Served' },
]

// ─── FAQ ──────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'How quickly can JT Electric respond to electrical problems?',
    answer:
      "JT Electric is known for fast response — one customer noted Cameron and Kyle 'got to our house quick' and immediately resolved the issue. Same-day response is available when possible.",
  },
  {
    question: 'Do you handle both the electrical work and utility coordination?',
    answer:
      "Yes. JT Electric's team has experience coordinating with utility linemen when the job requires it, so you don't have to manage multiple contractors on your own.",
  },
  {
    question: 'Can JT Electric work on my project if I live out of the area?',
    answer:
      "Absolutely. One customer lived 220 miles away from their project home and called JT Electric's communication 'very important' — the team kept them informed every step of the way.",
  },
  {
    question: 'How does the quoting process work?',
    answer:
      "A technician like Brendan will assess the job and provide a clear, specific explanation of what's needed. The office then processes your quote quickly with follow-up — customers consistently note the pricing is reasonable.",
  },
]

// ─── Contact ──────────────────────────────────────────────────────
const businessContact = {
  name: 'JT Electric',
  address: '4849 Airway Dr STE 105',
  city: 'Central Point',
  state: 'OR',
  zip: '97502',
  phone: '(541) 734-5714',
  email: '',
  hours: {
    Monday: '8:00 AM – 4:00 PM',
    Tuesday: '8:00 AM – 4:00 PM',
    Wednesday: '8:00 AM – 4:00 PM',
    Thursday: '8:00 AM – 4:00 PM',
    Friday: '8:00 AM – 4:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

// ─── Footer links ─────────────────────────────────────────────────
const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Animation helper ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── Page ─────────────────────────────────────────────────────────
export default function JTElectricPage() {
  return (
    <>
      {/* CSS custom properties */}
      <div
        style={
          {
            '--brand-primary': BRAND,
            '--brand-accent': ACCENT,
          } as React.CSSProperties
        }
      />

      <Navbar
        businessName="JT Electric"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5417345714"
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="home">
        <HeroSection
          headline="Wired Right. Done Fast."
          subheadline="Central Point electricians with 4.9 stars and zero drama since day one."
          ctaText="Call (541) 734-5714"
          ctaHref="tel:5417345714"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4.9}
          reviewCount={29}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────── */}
      <div className="jte-trust-strip">
        <motion.div
          className="jte-trust-inner"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: '⚡', text: 'Same-Day Response Available' },
            { icon: '📋', text: 'Upfront, Written Quotes' },
            { icon: '📍', text: 'Central Point, OR — Rogue Valley' },
            { icon: '🏊', text: 'Pool & Spa Specialists' },
          ].map((item) => (
            <motion.div key={item.text} className="jte-trust-pill" variants={fadeUp}>
              <span className="jte-trust-icon">{item.icon}</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── STATS (dark) ──────────────────────────────────────── */}
      <div className="jte-dark-section">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="jte-services-wrapper">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ServiceCards
            heading="What We Do"
            subheading="Residential and specialty electrical work done right the first time."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="jte-about-wrapper">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AboutSection
            heading="Built on Straight Talk"
            story="JT Electric has been wiring Rogue Valley homes with the kind of professionalism that earns real 5-star reviews — not just polished marketing. When Steve Dix needed a pool panel installed from 220 miles away, our team communicated every step clearly and delivered professional work. Whether it's an EV charger or a full panel upgrade, you get honest scoping, fair pricing, and people who actually show up on time."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section id="reviews" className="jte-reviews-wrapper dot-pattern">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialCarousel
            heading="Real Reviews"
            reviews={reviews}
            variant="featured"
          />
        </motion.div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <div className="jte-dark-section jte-process-outer">
        <motion.div
          className="jte-process-inner"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="jte-process-eyebrow" variants={fadeUp}>
            How It Works
          </motion.p>
          <motion.h2 className="jte-process-heading" variants={fadeUp}>
            Simple. Fast. Done.
          </motion.h2>
          <div className="jte-process-steps">
            {[
              {
                n: '01',
                title: 'You Call',
                body: 'Reach us at (541) 734-5714 Monday–Friday. Describe the job — we listen, ask the right questions, and get you scheduled fast.',
              },
              {
                n: '02',
                title: 'We Scope',
                body: 'A technician arrives on time, walks the job, and gives you a clear written quote — no upsell pressure, no mystery pricing.',
              },
              {
                n: '03',
                title: 'Work Done',
                body: "We do the work clean, code-compliant, and right. Then we leave the space the way we found it. That's the whole promise.",
              },
            ].map((step) => (
              <motion.div key={step.n} className="jte-process-card" variants={fadeUp}>
                <span className="jte-process-num">{step.n}</span>
                <h3 className="jte-process-title">{step.title}</h3>
                <p className="jte-process-body">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="jte-faq-wrapper">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FAQAccordion heading="Common Questions" items={faqItems} />
        </motion.div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="jte-contact-wrapper">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactSection
            business={businessContact}
            heading="Get In Touch"
            showMap={true}
          />
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ─────────────────────────────────────── */}
      <ClickToCall phone="(541) 734-5714" />
    </>
  )
}