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

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Boss Plumbing & Heating photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Boss Plumbing & Heating photo 2',
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Emergency Plumbing (24/7)',
    description:
      'Round-the-clock emergency response for burst pipes, flooding, and after-hours plumbing crises — with a real person answering the phone, not a service.',
    icon: 'phone-call',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Sewer Line Repair & Backup Clearing',
    description:
      'Full sewer line diagnosis, high-pressure clearing, and repair for residential backups, including work with HomeServ and insurance contracts.',
    icon: 'waves',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Drain Cleaning & Unclogging',
    description:
      'Professional drain clearing for stubborn or recurring clogs, with follow-up service if the problem persists — no questions asked.',
    icon: 'arrow-down-circle',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Water Heater Installation & Replacement',
    description:
      'Same-day or next-day water heater replacement with full installation, haul-away of the old unit, and transparent upfront pricing.',
    icon: 'flame',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Plumbing Inspection & Diagnostics',
    description:
      'Thorough plumbing assessments for new homeowners or older properties, including phone-based pre-diagnosis and full written estimates.',
    icon: 'search',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Insurance & Home Warranty Coordination',
    description:
      'Experienced working alongside homeowner insurance claims and home warranty providers like HomeServ to simplify the repair process.',
    icon: 'file-text',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Warren was so knowledgeable of our problem and our neighborhood that he was able to diagnose it over the phone! He was also super responsive to our questions. His team was polite about walking through our house (no basement door) and they got all the work done in one day.',
    author: 'Erin and Craig',
    rating: 5,
    source: 'google',
  },
  {
    text: 'We had a sewer backup on the weekend during a snow storm. We have a HomeServ contract for our sewer line so you call them and they get you a licensed plumber to fix the issue. Because of the weekend and snow storm, everyone refused to come out until they called Warren at Boss P...',
    author: 'Darren Kline',
    rating: 5,
    source: 'google',
  },
  {
    text: "You know what's a pretty solid way to ruin your night? It's 6pm on a Thursday. Your water heater decides it's done and starts flooding your utility room. Thank the good Lord for Boss Plumbing and Heating! I called two other plumbers. One didn't service our area of Manayunk/Ro...",
    author: 'Andrea McAfee',
    rating: 5,
    source: 'google',
  },
  {
    text: 'The people at Boss were lifesavers. Recently bought a house and didn\'t realize how bad the plumbing/sewage was and they came out promptly and got right on fixing my issue. The price was exactly what they said it would be and were always there when they said they would be.',
    author: 'Tim Harding',
    rating: 5,
    source: 'google',
  },
  {
    text: 'This company was very helpful and nice also understanding. They unclog my drain and I still had an issue. They came back out with no problem and unclog my drain again. I appreciate the professionalism that they displayed. Black owned businesses And I will highly recommend them.',
    author: 'Tawaya Lewis',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: ' stars', label: 'Average Customer Rating' },
  { value: 227, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 24, suffix: '/7', label: 'Hours Available, Every Day of the Year' },
  { value: 1, suffix: ' hour', label: 'Typical Emergency Response Time' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Can I actually reach someone after hours or on weekends?',
    answer:
      "Yes — and it's likely Warren himself who picks up. Multiple customers have called on Sunday evenings, during snowstorms, and on weekends and reached a real person immediately. No answering service, no voicemail maze.",
  },
  {
    question: 'Will the final price match what I was quoted?',
    answer:
      'Consistently, yes. Customers repeatedly highlight that the price they were quoted was the price they paid — no surprise charges, no upsells at the door. Transparent estimates are a core part of how Boss operates.',
  },
  {
    question: 'Do you work with home warranty providers like HomeServ?',
    answer:
      'Yes. Boss Plumbing & Heating is a licensed plumber that works directly with HomeServ and other home warranty contracts, handling all coordination so you don\'t have to navigate it alone.',
  },
  {
    question: "What if my problem isn't fully fixed the first time?",
    answer:
      "Boss stands behind their work. When one customer's drain clog returned after the initial visit, the team came back out without hesitation, no additional charge, and no questions asked.",
  },
]

const businessContact = {
  name: 'Boss Plumbing & Heating',
  address: '259 W Johnson St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19144',
  phone: '(267) 748-4314',
  email: '',
  hours: {
    Monday: 'Open 24 hours',
    Tuesday: 'Open 24 hours',
    Wednesday: 'Open 24 hours',
    Thursday: 'Open 24 hours',
    Friday: 'Open 24 hours',
    Saturday: 'Open 24 hours',
    Sunday: 'Open 24 hours',
  },
}

// ─── ACCENT TICKER COMPONENT ─────────────────────────────────────────────────

function AccentTicker() {
  const items = [
    'We Pick Up',
    'We Show Up',
    'Done.',
    'Philadelphia\'s 24/7 Plumber',
    'We Pick Up',
    'We Show Up',
    'Done.',
    'Philadelphia\'s 24/7 Plumber',
  ]

  return (
    <div className="boss-ticker-wrap">
      <div className="boss-ticker-inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="boss-ticker-item">
            {item}
            <span className="boss-ticker-dot" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── TRUST BADGE BAR ─────────────────────────────────────────────────────────

function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const badges = [
    { icon: '🔧', label: 'Licensed & Insured' },
    { icon: '⭐', label: '4.8 Star Rated' },
    { icon: '📞', label: 'Answers Every Call' },
    { icon: '🏠', label: 'HomeServ Approved' },
    { icon: '✅', label: 'Price Match Guarantee' },
    { icon: '🌙', label: 'Available Nights & Weekends' },
  ]

  return (
    <div className="boss-trust-bar" ref={ref}>
      <div className="boss-trust-inner">
        {badges.map((b, i) => (
          <motion.div
            key={i}
            className="boss-trust-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span className="boss-trust-icon">{b.icon}</span>
            <span className="boss-trust-label">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── MARQUEE PHOTOS ───────────────────────────────────────────────────────────

function PhotoMarquee() {
  const photos = [
    '/photos/photo-3.webp',
    '/photos/photo-4.webp',
    '/photos/photo-5.webp',
    '/photos/photo-6.webp',
    '/photos/photo-7.webp',
    '/photos/photo-8.webp',
    '/photos/photo-9.webp',
    '/photos/photo-10.webp',
  ]

  return (
    <div className="boss-marquee-wrap">
      <div className="boss-marquee-track">
        {[...photos, ...photos].map((src, i) => (
          <div key={i} className="boss-marquee-item">
            <img src={src} alt={`Work photo ${(i % photos.length) + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BossPlumbingPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar
        businessName="Boss Plumbing & Heating"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12677484314"
      />

      {/* ── HERO ── */}
      <section id="home">
        <HeroSection
          headline="Philadelphia's 24/7 Plumbers"
          subheadline="We pick up the phone. We show up on time. The price you're quoted is the price you pay."
          ctaText="Call (267) 748-4314"
          ctaHref="tel:+12677484314"
          secondaryCtaText="View Services"
          secondaryCtaHref="#services"
          rating={4.8}
          reviewCount={227}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── ACCENT TICKER ── */}
      <AccentTicker />

      {/* ── TRUST BADGES ── */}
      <TrustBar />

      {/* ── STATS (dark) ── */}
      <div className="bg-[#0f1923]">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="boss-section-services">
        <ServiceCards
          heading="What We Fix"
          subheading="From burst pipes at midnight to new water heater installs — Boss handles it all, same day."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── PHOTO MARQUEE ── */}
      <PhotoMarquee />

      {/* ── ABOUT ── */}
      <section id="about" className="boss-section-about">
        <AboutSection
          heading="Built on Showing Up"
          story="Boss Plumbing & Heating has earned its reputation one emergency call at a time in Philadelphia. When a customer's water heater flooded their utility room at 6pm on a Thursday, they called two other plumbers — both passed. Boss picked up. Warren has been doing this long enough to diagnose problems over the phone just from knowing the neighborhood, and his crew works until the job is done right."
          image={aboutPhoto}
        />
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="bg-[#0f1923]">
        <TestimonialCarousel
          heading="Real Customers. Real Stories."
          reviews={reviews}
          variant="featured"
        />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="boss-section-faq">
        <FAQAccordion heading="Common Questions" items={faqItems} />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#0f1923]">
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </section>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL (floating) ── */}
      <ClickToCall phone="(267) 748-4314" />
    </>
  )
}