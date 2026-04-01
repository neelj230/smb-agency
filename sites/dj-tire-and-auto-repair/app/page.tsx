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
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'DJ Tire and Auto Repair photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'DJ Tire and Auto Repair photo 2',
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Tire Repair & Replacement',
    description:
      'Patch, plug, or replace tires with honest diagnosis — no upselling you into a new tire when a repair will do.',
    icon: 'circle',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Rim & Wheel Repair',
    description:
      'Fix bent or damaged rims to restore a proper seal and save you the cost of unnecessary tire replacement.',
    icon: 'settings',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Strut & Suspension Repair',
    description:
      'Replace worn front or rear struts to eliminate road noise and restore smooth, stable handling.',
    icon: 'car',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Roadside Assistance',
    description:
      "When you're stuck, DJ has been known to come out personally to get you back on the road.",
    icon: 'map-pin',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Brake Service',
    description:
      'Inspection, pad replacement, and rotor work to keep your stopping power reliable and safe.',
    icon: 'shield',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'General Auto Repair',
    description:
      'Diagnostics and mechanical repairs handled professionally with upfront pricing and no surprise charges.',
    icon: 'wrench',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "Polite, Fast, Great Prices. I saved over $100. I had a bent rim and supposedly I needed a new tire (as per Mavis Tires). I did not need a new tire. I have been driving the car and monitoring the air pressure in the tire and all is well.",
    author: 'Debra "JOYFULDEB" Moore',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I had an outstanding experience at DJ Tire and Auto Repair. They took me in immediately with no wait and replaced my two front struts perfectly. Their expertise was evident in the quality of their work, and my car now makes no strange sounds on the road. I highly recommend them.',
    author: 'Fatima A',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Impressed with how smoothly it went. Everything was handled professionally.',
    author: 'Rex Zaid',
    rating: 5,
    source: 'google',
  },
  {
    text: "I love going to DJ he always up front with everything!!! I remember when I broke down and he came out his way to come fix my tire. Till this day I still go to him when something is wrong with my car. DJ is the only place I go to and never had a problem with nothing!",
    author: 'Aquarius Yancy',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4, suffix: '★', label: 'Average Customer Rating' },
  { value: 74, suffix: '+', label: 'Customer Reviews' },
  { value: 7, suffix: ' days', label: 'Open Every Day of the Week' },
  { value: 100, suffix: '+', label: 'Saved for One Customer vs. Chain Shop' },
]

const faqItems: FAQItem[] = [
  {
    question: "Will you try to sell me repairs I don't actually need?",
    answer:
      "No — and that's one of the most common things customers say about DJ. One customer was told by a national chain she needed a new tire. DJ fixed her bent rim instead and saved her over $100. You get an honest diagnosis every time.",
  },
  {
    question: 'Is this a good shop for women who are worried about being taken advantage of?',
    answer:
      "Absolutely. Multiple female customers have specifically called this out — Fatima wrote 'Ladies, they will not rip you off.' Straight talk and fair prices apply to everyone who walks through the door.",
  },
  {
    question: 'Are you open on weekends?',
    answer:
      "Yes — DJ Tire and Auto Repair is open seven days a week, Monday through Sunday, 9:00 AM to 6:00 PM. Car problems don't wait for Monday, and neither do we.",
  },
  {
    question: 'How long will I have to wait when I come in?',
    answer:
      'Most customers report fast turnaround with little to no wait. Fatima noted she was taken in immediately with no wait for a full strut replacement. Come in and see for yourself.',
  },
]

const businessContact = {
  name: 'DJ Tire and Auto Repair',
  address: '6008 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 760-8576',
  email: '',
  hours: {
    Monday: '9:00 AM – 6:00 PM',
    Tuesday: '9:00 AM – 6:00 PM',
    Wednesday: '9:00 AM – 6:00 PM',
    Thursday: '9:00 AM – 6:00 PM',
    Friday: '9:00 AM – 6:00 PM',
    Saturday: '9:00 AM – 6:00 PM',
    Sunday: '9:00 AM – 6:00 PM',
  },
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const items = [
    { icon: '🔧', label: 'No Upselling' },
    { icon: '💬', label: 'Straight Talk' },
    { icon: '📅', label: 'Open 7 Days' },
    { icon: '🚗', label: 'Roadside Help' },
    { icon: '💰', label: 'Fair Prices' },
  ]

  return (
    <div className="dj-trust-bar" ref={ref}>
      <div className="dj-trust-inner">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="dj-trust-item"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span className="dj-trust-icon">{item.icon}</span>
            <span className="dj-trust-label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Tagline Banner ───────────────────────────────────────────────────────────
function TaglineBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div className="dj-tagline-banner" ref={ref}>
      <div className="dot-pattern dj-tagline-dots" />
      <motion.div
        className="dj-tagline-content"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="dj-tagline-eyebrow">The Philadelphia Standard</p>
        <h2 className="dj-tagline-text">
          "Straight talk,<br />fair prices,<br />
          <em>fixed right.</em>"
        </h2>
        <p className="dj-tagline-sub">
          6008 Lancaster Ave · Philadelphia, PA · Open Every Day 9AM–6PM
        </p>
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Navbar
        businessName="DJ Tire & Auto"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2157608576"
      />

      <main>
        {/* HERO */}
        <HeroSection
          headline="Philly's Honest Auto Shop"
          subheadline="On Lancaster Ave since day one — fair prices, real answers, no runaround."
          ctaText="Call (215) 760-8576"
          ctaHref="tel:2157608576"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4}
          reviewCount={74}
          variant="split"
          backgroundImage={heroPhoto}
          foregroundImage={heroPhoto}
        />

        {/* TRUST BAR */}
        <TrustBar />

        {/* STATS — dark */}
        <div id="about" className="dj-dark-section">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        {/* ABOUT */}
        <section className="dj-about-wrapper">
          <AboutSection
            heading="Meet Your Mechanic"
            story="DJ Tire and Auto Repair sits at 6008 Lancaster Ave in West Philly, and it runs the way a neighborhood shop should. DJ has driven out personally to fix a customer's flat on the side of the road — that's not a marketing line, it's something a regular customer still talks about years later. You get a straight answer, a fair price, and work done right."
            image={aboutPhoto}
          />
        </section>

        {/* TAGLINE BANNER */}
        <TaglineBanner />

        {/* SERVICES */}
        <section id="services" className="dj-services-section">
          <ServiceCards
            heading="What We Fix"
            subheading="Tires, rims, brakes, struts — done right at a price that makes sense."
            services={services}
            columns={3}
            variant="grid"
          />
        </section>

        {/* REVIEWS */}
        <div id="reviews" className="dj-dark-section">
          <TestimonialCarousel
            heading="Real Customers"
            reviews={reviews}
            variant="featured"
          />
        </div>

        {/* FAQ */}
        <section id="faq" className="dj-faq-section">
          <FAQAccordion heading="Good Questions" items={faqItems} />
        </section>

        {/* CONTACT */}
        <div id="contact" className="dj-dark-section">
          <ContactSection
            business={businessContact}
            heading="Come See Us"
            showMap={true}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(215) 760-8576" />
    </>
  )
}