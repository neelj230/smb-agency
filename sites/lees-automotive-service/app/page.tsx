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
  alt: "Lee's Automotive Service photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Lee's Automotive Service photo 2",
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'PA State Vehicle Inspection',
    description:
      'Fast, no-nonsense Pennsylvania state inspections with same-day turnaround and transparent reporting of any required fixes.',
    icon: 'clipboard-check',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Oil Change & Engine Diagnostics',
    description:
      'Accurate oil changes and post-service engine diagnostics to catch and correct mistakes made elsewhere before they cause serious damage.',
    icon: 'droplets',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Brake Service & Repair',
    description:
      "Inspection, pad replacement, and brake system repair to keep your vehicle stopping safely on Philadelphia's demanding streets.",
    icon: 'circle-stop',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Electrical & Lighting Repair',
    description:
      "Bulb replacement, wiring checks, and electrical diagnostics handled quickly so small issues don't become inspection failures.",
    icon: 'zap',
  },
  {
    name: 'AC & Compressor Service',
    description:
      'Air conditioning system inspection and compressor installation to keep your cabin comfortable year-round.',
    icon: 'wind',
  },
  {
    name: 'General Mechanical Repair',
    description:
      "Honest, skilled repairs across a wide range of mechanical issues — and straight talk about what's beyond the shop's scope.",
    icon: 'wrench',
  },
]

const reviews: Review[] = [
  {
    text: 'Awesome 👌 fast fair price great customer service',
    author: 'Jewel Felder-James',
    rating: 5,
    source: 'google',
  },
  {
    text: "I love going to Mr. Lee auto body hes my new go to mechanic. He helped me when Mavis messed up my oil changed and almost damaged my engine. I thought he was going to charge me an arm and a leg but he was honest and showed how it was a minor problem ( just a screw) and fixed it.",
    author: 'Sadeka Wood',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I have been going to them for the past 20 years, the service has ALWAYS been good, reasonable price and on time. Never had a problem!!!',
    author: 'Cheryl Walker',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Excellent service: Awesome time management & pricing! ✨️✨️✨️✨️ 2012 Nissan Rogue stays on the road because of Lee\'s auto 🛺 Thank you 😊',
    author: 'Vernice W',
    rating: 4,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.5, suffix: '★', label: 'Average Customer Rating' },
  { value: 115, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 20, suffix: '+ Years', label: 'Serving West Philadelphia' },
  { value: 6, suffix: ' Days', label: 'Open Every Week, Mon–Sat' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do you take appointments?',
    answer:
      "No — Lee's operates on a first-come, first-served basis only. If you want your car seen, plan to arrive right at 8 AM when the shop opens.",
  },
  {
    question: "What if my car has a problem Lee's can't fix?",
    answer:
      "Mr. Lee will tell you directly and honestly. If a repair is outside what the shop handles, he'll recommend you go to the right place — no runaround.",
  },
  {
    question: 'Are the prices fair for the quality of work?',
    answer:
      "Consistently, yes. Customers repeatedly highlight fair, reasonable pricing — including a case where Mr. Lee diagnosed what another shop called a major problem as a simple loose screw.",
  },
  {
    question: "Is Lee's a good choice for women who've had bad experiences at other shops?",
    answer:
      "Many of Lee's most loyal customers are women who specifically cite his honesty and willingness to explain issues clearly without talking down to them.",
  },
]

const businessContact = {
  name: "Lee's Automotive Service",
  address: '5947 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 879-2883',
  email: '',
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: '8:00 AM – 3:00 PM',
    Sunday: 'Closed',
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Global CSS vars ── */}
      

      <Navbar
        businessName="Lee's Automotive"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2158792883"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="West Philly's Honest Shop"
        subheadline="20 years on Lancaster Ave. Fair prices, real talk, same-day service."
        ctaText="Call (215) 879-2883"
        ctaHref="tel:2158792883"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.5}
        reviewCount={115}
        variant="split"
        backgroundImage={heroPhoto}
      />

      {/* ── ACCENT MARQUEE STRIP ── */}
      <div className="lees-marquee-strip" aria-hidden="true">
        <div className="lees-marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="lees-marquee-item">
              Honest Hands&nbsp;&nbsp;·&nbsp;&nbsp;Fast Fixes&nbsp;&nbsp;·&nbsp;&nbsp;No Games&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS — dark band ── */}
      <section id="stats">
        <StatsCounter stats={stats} variant="dark" />
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="lees-section-services">
        <div className="lees-section-label">What We Do</div>
        <ServiceCards
          heading="Services"
          subheading="Six days a week. First-come, first-served. No nonsense."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="lees-about-wrapper">
        <AboutSection
          heading="The Lee Difference"
          story="Mr. Lee has been working on West Philadelphia cars for over 20 years at the same address on Lancaster Ave. When another shop messed up a customer's oil change and nearly destroyed her engine, Mr. Lee found the real problem — a loose screw — fixed it fast, and charged her fairly. That's the standard here."
          image={aboutPhoto}
        />
        {/* Floating accent badge */}
        <div className="lees-honest-badge" aria-hidden="true">
          <span className="lees-honest-badge-inner">
            <span className="lees-honest-badge-star">★</span>
            <span>Honest since day one</span>
          </span>
        </div>
      </section>

      {/* ── TRUST TICKER — yellow band ── */}
      <div className="lees-yellow-band">
        <div className="lees-yellow-band-inner">
          <span className="lees-yellow-band-text">★ 4.5 on Google</span>
          <span className="lees-yellow-band-dot" />
          <span className="lees-yellow-band-text">115+ Reviews</span>
          <span className="lees-yellow-band-dot" />
          <span className="lees-yellow-band-text">Open Mon – Sat</span>
          <span className="lees-yellow-band-dot" />
          <span className="lees-yellow-band-text">Same-Day Inspections</span>
          <span className="lees-yellow-band-dot" />
          <span className="lees-yellow-band-text">Fair Prices. Real Talk.</span>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="lees-section-reviews">
        <TestimonialCarousel
          heading="Real Customers"
          reviews={reviews}
          variant="featured"
        />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="lees-section-faq">
        <FAQAccordion heading="Good Questions" items={faqItems} />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Find the Shop"
          showMap={true}
        />
      </section>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(215) 879-2883" />
    </>
  )
}