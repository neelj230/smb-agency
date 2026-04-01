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
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_BLUE = '#1C4A96'
const BRAND_ACCENT = '#3400b2'

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "BUTCH'S AUTO REPAIR SHOP photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "BUTCH'S AUTO REPAIR SHOP photo 2",
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'State Vehicle Inspection',
    description:
      'Pennsylvania state-certified vehicle inspections performed thoroughly and often same-day when scheduling allows.',
    icon: 'clipboard-check',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'General Engine Diagnostics',
    description:
      'Comprehensive under-the-hood diagnostics to identify mechanical issues before they become major problems.',
    icon: 'search',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Brake Service & Repair',
    description:
      'Inspection, adjustment, and full replacement of brake pads, rotors, and calipers to keep you stopping safely.',
    icon: 'shield',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Oil Change & Fluid Service',
    description:
      'Fast, clean oil changes with full fluid checks — in and out without unnecessary upselling.',
    icon: 'droplets',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Suspension & Steering Repair',
    description:
      'Diagnosis and repair of shocks, struts, tie rods, and alignment issues common on Philadelphia streets.',
    icon: 'car',
  },
  {
    name: 'Routine Maintenance & Tune-Ups',
    description:
      'Scheduled maintenance including filters, belts, spark plugs, and full vehicle check-ups to keep your car running longer.',
    icon: 'wrench',
  },
]

const reviews: Review[] = [
  {
    text: 'These folks take incredible care of the machines and people who come through the shop. I\'ve been coming back for 3 years and am always treated with respect, friendliness, and care. These people care about what they do, and it shows in how Mr. Frankie runs the front.',
    author: 'Karli Oxford-Jordan',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I had the pleasure meeting "Frank". I explained my husband usually brings my car. Inspection was due July 1st. I had the day off for dentist appt. Instead of making an appt for my husband to bring it. Frank said, "Let\'s do it now". OMG!!! I felt like I hit the lottery.',
    author: 'Acqua Davis',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Very friendly, and professional. In and out, clean establishment, not alot of junk cars parked everywhere. Reasonable prices. I\'m definitely coming back.',
    author: 'Cee W.',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I have been using the garage for years and have always had the best experiences whether it\'s is Butch himself or Frank, Anthony, or Saturday Frank, the service and work is top notch. Everyone who I have referred here has thanked me.',
    author: 'Garrett Gallagher',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.7, suffix: '★', label: 'Average Customer Rating' },
  { value: 49, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 3, suffix: '+ Years', label: 'Average Loyal Customer Tenure' },
  { value: 100, suffix: '%', label: 'Of Referrals That Come Back Satisfied' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do I need an appointment for a state inspection?',
    answer:
      'Not always. Frank has been known to accommodate walk-in inspections on the spot when the schedule allows — just call ahead and ask. Same-day service is part of how they take care of customers.',
  },
  {
    question: 'How long has this shop been in the neighborhood?',
    answer:
      "Butch's has been serving West Philadelphia for many years. Multiple customers, like Karli Oxford-Jordan and Garrett Gallagher, have been loyal regulars for years and continue to refer friends and family.",
  },
  {
    question: 'Are the prices reasonable compared to other Philadelphia shops?',
    answer:
      "Yes — customers consistently mention reasonable, fair pricing without feeling upsold or taken advantage of. The shop's reputation is built on honesty as much as quality work.",
  },
  {
    question: 'What are your hours and do you work weekends?',
    answer:
      "Butch's is open Monday through Friday from 8:00 AM to 4:00 PM. The shop is closed on weekends. Plan accordingly — the earlier you call, the better chance of same-day service.",
  },
]

const businessContact = {
  name: "BUTCH'S AUTO REPAIR SHOP",
  address: '217 N Daggett St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 471-5694',
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

// ─── Fade-up animation wrapper ─────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Marquee Strip ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [
    'Real Mechanics',
    'Real People',
    'Real Philly',
    'West Philadelphia',
    'Fair Prices',
    'Same-Day Inspection',
    '4.7 Stars',
    'Since Day One',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="butch-marquee-wrap">
      <div className="butch-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="butch-marquee-item">
            {item}
            <span className="butch-marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Diagonal Rule ─────────────────────────────────────────────────────────────
function DiagonalRule() {
  return (
    <div className="butch-diagonal-rule" aria-hidden="true">
      <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 32 L1440 0 L1440 32 Z" fill="#0d1a33" />
      </svg>
    </div>
  )
}

// ─── Trust Badge Row ───────────────────────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { icon: '🔧', label: 'PA State Certified' },
    { icon: '⭐', label: '4.7 Google Rating' },
    { icon: '📍', label: 'West Philadelphia' },
    { icon: '🤝', label: 'No Upselling' },
  ]
  return (
    <div className="butch-trust-row">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className="butch-trust-badge"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <span className="butch-trust-icon">{b.icon}</span>
          <span className="butch-trust-label">{b.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="butch-grain" aria-hidden="true" />

      <Navbar
        businessName="BUTCH'S AUTO REPAIR"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154715694"
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="home">
        <HeroSection
          headline="West Philly's Auto Shop"
          subheadline="217 N Daggett St — real mechanics who've earned your trust since day one."
          ctaText="Call (215) 471-5694"
          ctaHref="tel:2154715694"
          secondaryCtaText="Our Services"
          secondaryCtaHref="#services"
          rating={4.7}
          reviewCount={49}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── TRUST BADGES ──────────────────────────────────────────────────── */}
      <div className="butch-badges-section">
        <TrustBadges />
      </div>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <div className="butch-stats-wrap">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" className="butch-about-section">
        <FadeUp>
          <AboutSection
            heading="The Shop on Daggett"
            story="Butch's Auto Repair has been a fixture in West Philadelphia for years — the kind of shop where Mr. Frankie knows your name and Frank will squeeze in your inspection the same day you call. Customers like Karli Oxford-Jordan have been coming back for three years because the work is honest, the prices are fair, and nobody tries to sell you something you don't need. This is neighborhood mechanics done right."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* ── DIAGONAL + DARK SERVICES ──────────────────────────────────────── */}
      <div className="butch-dark-block">
        <DiagonalRule />
        <div className="butch-dark-inner" id="services">
          <FadeUp>
            <div className="butch-section-label">What We Do</div>
            <h2 className="butch-dark-heading">Six Core Services</h2>
            <p className="butch-dark-sub">
              Everything your car needs — handled in-house, done right.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ServiceCards
              heading=""
              services={services}
              columns={3}
              variant="grid"
            />
          </FadeUp>
        </div>
      </div>

      {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
      <section id="reviews" className="butch-reviews-section">
        <FadeUp>
          <div className="butch-section-label butch-label-dark">Customers Say</div>
          <TestimonialCarousel
            heading="Straight From the Community"
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── PULL QUOTE ─────────────────────────────────────────────────────── */}
      <div className="butch-pullquote-wrap">
        <div className="butch-pullquote-inner">
          <motion.div
            className="butch-pullquote-mark"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            "
          </motion.div>
          <motion.p
            className="butch-pullquote-text"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Everyone who I have referred here has thanked me.
          </motion.p>
          <motion.span
            className="butch-pullquote-attr"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            — Garrett Gallagher, long-time customer
          </motion.span>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="butch-faq-section">
        <FadeUp>
          <div className="butch-section-label">Got Questions</div>
          <FAQAccordion heading="Common Questions" items={faqItems} />
        </FadeUp>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <div className="butch-contact-wrap" id="contact">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find the Shop"
            showMap={true}
          />
        </FadeUp>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(215) 471-5694" />
    </>
  )
}