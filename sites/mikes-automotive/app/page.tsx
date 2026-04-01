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

// ── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "Mike's Automotive photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Mike's Automotive photo 2",
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'General Mechanical Repair',
    description:
      "Full-range mechanical repairs on cars and trucks, handled correctly the first time so you're not back in the shop a week later.",
    icon: 'wrench',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Vehicle Inspections',
    description:
      'Pennsylvania state inspections performed quickly and honestly, with upfront communication about anything that needs attention.',
    icon: 'clipboard-check',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Diagnostic Services',
    description:
      "Expert diagnosis of what's actually wrong with your vehicle before any work begins, so you know the problem and the cost upfront.",
    icon: 'search',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Brake Service & Repair',
    description:
      "Brake inspections, pad replacements, and full brake system repairs to keep you safe on Philadelphia's demanding streets.",
    icon: 'disc',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Engine & Drivetrain Work',
    description:
      'Major engine and drivetrain repairs handled by a mechanic with decades of hands-on knowledge across makes and models.',
    icon: 'settings',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Routine Maintenance',
    description:
      'Oil changes, fluid services, filter replacements, and scheduled maintenance to keep your car running long-term.',
    icon: 'droplets',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "Been going to Mike's for over 10 years. Always fixed my car. I've never had a problem with my car after he fixed it. He's worked on 3 cars. Very professional, nice. They let you know the problem and what the cost is going to be before they work on it. Very respectful.",
    author: 'Tracey Cain',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Mike is the man!! been around for a very long time well respected and work is outstanding, very knowledgeable and professional. Highly recommend this place of business!',
    author: 'Lamont Davis',
    rating: 5,
    source: 'google',
  },
  {
    text: "Mike is an excellent mechanic and has been here for years.. He's very good to work with gives fast service and is very fair with prices ... Definitely worth going to see for most all needs with cars and trucks!",
    author: 'Dave D.',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Excellent and expert repair! Honest and quick too. Always a pleasure to have my cars serviced here from an inspection to major repairs. Mike does it all and keeps my cars running and on the road, not in the shop!!!',
    author: 'Joseph Oliva',
    rating: 5,
    source: 'google',
  },
  {
    text: "He's a man of few words but that dude has allot of knowledge about automobiles in his head. If you need help or info on your car he'll help you out. He's been around forever, well respected in the community.",
    author: 'Amir',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.7, suffix: '★', label: 'Average Customer Rating' },
  { value: 41, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 10, suffix: '+ yrs', label: 'Longest Customer Relationships' },
  { value: 100, suffix: '%', label: 'Upfront Pricing Before Every Repair' },
]

const faqItems: FAQItem[] = [
  {
    question: "How long has Mike's Automotive been in business?",
    answer:
      "Mike has been working on cars in this community for a very long time — multiple customers describe him as having 'been around forever' and being 'well respected' in the neighborhood. You're not dealing with a new shop.",
  },
  {
    question: 'Will I know the cost before any work is done?',
    answer:
      "Yes — transparency about pricing is one of the things customers consistently highlight. Mike will diagnose the problem and tell you exactly what it will cost before any wrenches turn. No surprises on your bill.",
  },
  {
    question: 'What kinds of vehicles does Mike work on?',
    answer:
      'Mike works on both cars and trucks across a wide range of makes and models. Customers describe him as highly knowledgeable — a mechanic who has seen almost everything.',
  },
  {
    question: "What if I've had bad experiences with mechanics in the past?",
    answer:
      "Mike's reputation is built specifically on being the opposite of that experience. Customers consistently praise his honesty, fair pricing, and the fact that your car stays fixed after you leave.",
  },
]

const businessContact = {
  name: "Mike's Automotive",
  address: '427 N Gross St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 471-5111',
  email: '',
}

// ── Trust Bar Component ──────────────────────────────────────────────────────

const trustItems = [
  'Upfront Pricing',
  'No Surprise Bills',
  'Cars & Trucks',
  'PA State Inspections',
  'Decades of Experience',
  'Philly Trusted',
  'Fixed Right First Time',
  'Fair Rates',
]

function TrustBar() {
  return (
    <div className="trust-bar-wrapper bg-[#156cc2] overflow-hidden py-3">
      <div className="trust-bar-track">
        {[...trustItems, ...trustItems].map((item, i) => (
          <span key={i} className="trust-bar-item">
            <span className="trust-bar-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Process / Promise Strip ──────────────────────────────────────────────────

const promises = [
  {
    num: '01',
    title: 'Diagnose First',
    desc: 'We tell you exactly what's wrong before any work begins.',
  },
  {
    num: '02',
    title: 'Upfront Cost',
    desc: 'Price is agreed on before the first bolt turns. No guesses.',
  },
  {
    num: '03',
    title: 'Fix It Right',
    desc: 'Done correctly the first time. Customers don't come back for the same problem.',
  },
  {
    num: '04',
    title: 'Back on the Road',
    desc: 'Fast turnaround. Your car should be running, not sitting in a shop.',
  },
]

function PromiseStrip() {
  return (
    <section className="promise-strip bg-[#0f1117] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="promise-strip-eyebrow">How It Works</p>
          <h2 className="promise-strip-heading">The Process</h2>
        </motion.div>
        <div className="promise-grid">
          {promises.map((p, i) => (
            <motion.div
              key={p.num}
              className="promise-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <span className="promise-num">{p.num}</span>
              <h3 className="promise-title">{p.title}</h3>
              <p className="promise-desc">{p.desc}</p>
              <div className="promise-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Marquee Quote Strip ──────────────────────────────────────────────────────

function QuoteMarquee() {
  const quotes = [
    '"Fixed right. Every time."',
    '"Been coming for 10 years."',
    '"Fair prices. No surprises."',
    '"Well respected in the community."',
    '"Mike does it all."',
    '"Honest and quick."',
  ]
  return (
    <div className="quote-marquee-wrapper overflow-hidden py-5 bg-[#f5f5f0] border-y border-[#e0ddd5]">
      <div className="quote-marquee-track">
        {[...quotes, ...quotes].map((q, i) => (
          <span key={i} className="quote-marquee-item">
            {q}
            <span className="quote-marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar
        businessName="Mike's Automotive"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154715111"
      />

      {/* HERO */}
      <HeroSection
        headline="427 N Gross St"
        subheadline="Philadelphia's mechanic for 10+ years. Fixed right, priced fair, every time."
        ctaText="Call (215) 471-5111"
        ctaHref="tel:2154715111"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.7}
        reviewCount={41}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* Trust scrolling bar */}
      <TrustBar />

      {/* STATS — dark */}
      <div className="bg-[var(--brand-text)] text-white">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* PROCESS / PROMISE */}
      <PromiseStrip />

      {/* SERVICES */}
      <div id="services" className="bg-[#f5f5f0] py-4">
        <ServiceCards
          heading="What We Fix"
          subheading="Cars, trucks, most makes and models. If it rolls, Mike's worked on it."
          services={services}
          columns={3}
          variant="grid"
        />
      </div>

      {/* Quote Marquee */}
      <QuoteMarquee />

      {/* ABOUT */}
      <div id="about" className="bg-white">
        <AboutSection
          heading="Mike's Shop"
          story="Mike has been wrenching on Philly's cars for decades — customers describe him as 'been around forever' and 'well respected in the community.' Three things never change: he tells you what's wrong, tells you what it costs, then fixes it so it stays fixed. No upsells. No mystery invoices."
          image={aboutPhoto}
        />
      </div>

      {/* REVIEWS */}
      <div id="reviews" className="bg-[#0f1117] text-white">
        <TestimonialCarousel
          heading="Real Reviews"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* FAQ */}
      <div id="faq" className="bg-[#f5f5f0]">
        <FAQAccordion heading="Questions" items={faqItems} />
      </div>

      {/* CONTACT */}
      <div id="contact" className="bg-white">
        <ContactSection
          business={businessContact}
          heading="Find the Shop"
          showMap={true}
        />
      </div>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(215) 471-5111" />
    </>
  )
}