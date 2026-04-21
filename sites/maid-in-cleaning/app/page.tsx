'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { ProcessSteps } from '@/components/ProcessSteps'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Service, Review, Stat, ProcessStep, FAQItem } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ──────────────────────────────────────────────
const BRAND_GREEN = '#218544'
const BRAND_ACCENT = '#ace38f'

// ─── Data ──────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const services: Service[] = [
  {
    name: 'Deep Home Cleaning',
    description:
      'A thorough top-to-bottom clean that leaves your entire home looking and feeling completely transformed, as multiple customers have described.',
    icon: 'sparkles',
  },
  {
    name: 'Pre-Event & Pre-Surgery Cleaning',
    description:
      'Scheduled cleaning timed around major life events — surgeries, gatherings, or moves — when having a spotless home genuinely matters.',
    icon: 'calendar-check',
  },
  {
    name: 'Apartment Cleaning',
    description:
      'Detailed apartment cleaning that restores your space to an immaculate, like-new condition from floor to ceiling.',
    icon: 'building-2',
  },
  {
    name: 'Team-Based House Cleaning',
    description:
      'Coordinated multi-person cleaning teams that work seamlessly together to tackle larger homes efficiently and thoroughly.',
    icon: 'users',
  },
  {
    name: 'Move-In / Move-Out Cleaning',
    description:
      'A comprehensive clean designed to prepare a property for new occupants or leave your old space in pristine condition.',
    icon: 'door-open',
  },
  {
    name: 'Recurring Maintenance Cleaning',
    description:
      'Scheduled regular cleaning visits to keep your home consistently clean without the stress of booking from scratch each time.',
    icon: 'refresh-cw',
  },
]

const reviews: Review[] = [
  {
    text: "I couldn't be happier with the service! Sophia truly went above and beyond—her attention to detail and dedication were exceptional. Rosario was fantastic—she handled everything with efficiency and care, and her professionalism and friendly attitude made the experience so enjoyable.",
    author: 'Kendis Martinez',
    rating: 5,
    source: 'google',
  },
  {
    text: "Jose and his team were fantastic and so friendly! We were extremely happy with their service, and they were a pleasure to work with. Highly recommend them to anyone. I was so impressed with the way Fatima cleaned; the house looks completely transformed. She did an incredible job.",
    author: 'Celeni Eastman',
    rating: 5,
    source: 'google',
  },
  {
    text: "I can't say I've used many cleaning services, but this company was top notch. The team was incredibly organized, and they really made the whole process easy. Raya was fantastic, Tiff did an amazing job, and Tracy was just as impressive. They all worked seamlessly together.",
    author: 'Charlotte Lee',
    rating: 5,
    source: 'google',
  },
  {
    text: "I had an amazing experience! The team was both professional and personable, ensuring every detail was covered. Fatima was a doll and did a wonderful job. I can say my apartment looked immaculate, like new! Adorno was also exceptional, so warm and wonderful to work with.",
    author: 'Ashley Velasco',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.9, suffix: '/5', label: 'Average Customer Rating' },
  { value: 39, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 9, label: 'Named Staff Members Praised by Customers' },
  { value: 14, suffix: ' hrs', label: 'Daily Availability, Mon–Sat' },
]

const steps: ProcessStep[] = [
  {
    title: 'Call or Book',
    description:
      'Reach us at (800) 782-5802 Monday through Saturday, 7 AM–9 PM. Tell us your space, your schedule, and any special circumstances.',
  },
  {
    title: 'We Show Up',
    description:
      "A single cleaner or coordinated team arrives on time, ready to work. You'll meet the people behind the names customers keep praising.",
  },
  {
    title: 'Home Transformed',
    description:
      'We leave when the job is done right — not when the clock says so. Every corner addressed, every surface spotless.',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'What makes Maid in Cleaning different from other Philadelphia cleaning services?',
    answer:
      'Customers consistently highlight the people. Reviewers name individual cleaners — Fatima, Sophia, Rosario, and others — by name. That kind of personal investment is rare and it shows in every job.',
  },
  {
    question: 'What are your hours and how do I book a cleaning?',
    answer:
      "We're available Monday through Saturday from 7:00 AM to 9:00 PM. The best way to book is by calling us directly at (800) 782-5802. We'll find a time that works for you.",
  },
  {
    question: 'Do you send a single cleaner or a team?',
    answer:
      'Both options are available depending on the size of your home and the scope of the job. For larger homes or deeper cleans, we send coordinated teams that work seamlessly together.',
  },
  {
    question: 'I have a specific event or medical situation — can you accommodate urgent or time-sensitive bookings?',
    answer:
      "Yes, and we take those seriously. Customers have booked us for pre-surgery home cleanings and other time-sensitive situations. Call us directly so we can make sure you're taken care of.",
  },
]

const businessContact = {
  name: 'Maid in Cleaning',
  address: '2449 Golf Rd #22',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(800) 782-5802',
  email: '',
  hours: {
    Monday: '7:00 AM – 9:00 PM',
    Tuesday: '7:00 AM – 9:00 PM',
    Wednesday: '7:00 AM – 9:00 PM',
    Thursday: '7:00 AM – 9:00 PM',
    Friday: '7:00 AM – 9:00 PM',
    Saturday: '7:00 AM – 9:00 PM',
    Sunday: 'Closed',
  },
}

// ─── Animated divider ──────────────────────────────────────────
function LeafDivider({ flipped = false }: { flipped?: boolean }) {
  return (
    <div
      className={`mic-leaf-divider ${flipped ? 'mic-leaf-divider--flipped' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 48 Q360 0 720 24 Q1080 48 1440 0 L1440 48 Z" fill="currentColor" />
      </svg>
    </div>
  )
}

// ─── Dot-pattern hero supplement ──────────────────────────────
function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
      className="mic-badge"
    >
      <span className="mic-badge__star">★</span>
      <span className="mic-badge__text">4.9 · 39 Google Reviews</span>
    </motion.div>
  )
}

// ─── Scrolling name strip ──────────────────────────────────────
const NAMES = ['Sophia', 'Rosario', 'Fatima', 'Jose', 'Raya', 'Tiff', 'Tracy', 'Adorno', 'Aziza']

function NameStrip() {
  const doubled = [...NAMES, ...NAMES, ...NAMES]
  return (
    <div className="mic-name-strip" aria-hidden="true">
      <div className="mic-name-strip__track">
        {doubled.map((name, i) => (
          <span key={i} className="mic-name-strip__item">
            {name}
            <span className="mic-name-strip__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Custom hero block ─────────────────────────────────────────
function CustomHero() {
  return (
    <section className="mic-hero" id="home">
      {/* dot pattern bg */}
      <div className="dot-pattern mic-hero__dots" aria-hidden="true" />
      {/* grain overlay */}
      <div className="mic-hero__grain" aria-hidden="true" />

      <div className="mic-hero__inner">
        <HeroBadge />

        <motion.h1
          className="mic-hero__headline"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Philadelphia's{' '}
          <span className="mic-hero__headline-accent">Home Cleaning</span>{' '}
          Team
        </motion.h1>

        <motion.p
          className="mic-hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Your home, transformed. Every detail counts.
        </motion.p>

        <motion.div
          className="mic-hero__ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="tel:8007825802" className="mic-btn mic-btn--primary">
            Call (800) 782-5802
          </a>
          <a href="#services" className="mic-btn mic-btn--ghost">
            See Services ↓
          </a>
        </motion.div>

        {/* floating word cloud */}
        <div className="mic-hero__tags" aria-hidden="true">
          {['Detail-Obsessed', 'On Time', 'Immaculate Results', 'Named by Customers', 'Like New'].map(
            (tag, i) => (
              <motion.span
                key={tag}
                className="mic-hero__tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </div>
      </div>

      {/* large decorative number */}
      <div className="mic-hero__deco" aria-hidden="true">4.9</div>
    </section>
  )
}

// ─── Highlighted quote strip ───────────────────────────────────
function QuoteStrip() {
  return (
    <div className="mic-quote-strip">
      <div className="mic-quote-strip__mark">"</div>
      <blockquote className="mic-quote-strip__text">
        The house looks completely transformed.
      </blockquote>
      <cite className="mic-quote-strip__cite">— Celeni Eastman, Philadelphia</cite>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────
export default function MaidInCleaningPage() {
  return (
    <>
      {/* CSS variables */}
      

      <Navbar
        businessName="Maid in Cleaning"
        links={navLinks}
        ctaText="Book a Clean"
        ctaHref="tel:8007825802"
      />

      <main>
        {/* 1. HERO */}
        <CustomHero />

        {/* Name strip — auto-scrolling */}
        <NameStrip />

        {/* 2. STATS — dark */}
        <div className="mic-dark-section" id="about">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <StatsCounter stats={stats} variant="dark" />
          </motion.div>
        </div>

        {/* 3. ABOUT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AboutSection
            heading="Who We Are"
            story="Maid in Cleaning serves Philadelphia from 2449 Golf Rd — a team where the cleaners get named by reviewers. Fatima, Sophia, Rosario, Jose, Raya, Tracy, and others show up prepared, work with care, and leave your space feeling genuinely different. No shortcuts. No ghost appointments. Just consistent, personal work."
          />
        </motion.div>

        {/* Quote strip */}
        <QuoteStrip />

        {/* 4. SERVICES */}
        <section id="services" className="mic-services-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServiceCards
              heading="What We Clean"
              subheading="Six ways we show up for Philadelphia homes — from one-time deep cleans to recurring visits."
              services={services}
              columns={3}
              variant="grid"
            />
          </motion.div>
        </section>

        {/* 5. HOW IT WORKS — dark */}
        <div className="mic-dark-section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ProcessSteps
              heading="How It Works"
              subheading="Simple from first call to final walk-through."
              steps={steps}
              variant="grid"
            />
          </motion.div>
        </div>

        {/* 6. REVIEWS */}
        <section id="reviews" className="mic-reviews-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialCarousel
              heading="What Customers Say"
              reviews={reviews}
              variant="featured"
            />
          </motion.div>
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="mic-faq-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FAQAccordion heading="Questions" items={faqItems} />
          </motion.div>
        </section>

        {/* 8. CONTACT — dark cap */}
        <div className="mic-dark-section" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactSection
              business={businessContact}
              heading="Book a Clean"
              showMap={true}
            />
          </motion.div>
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(800) 782-5802" />
    </>
  )
}