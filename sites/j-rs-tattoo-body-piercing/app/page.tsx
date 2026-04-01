'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { ImageGallery } from '@/components/ImageGallery'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion } from 'framer-motion'

// ─── NAV ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit Us', href: '#contact' },
]

// ─── HERO ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "J R's Tattoo & Body Piercing photo 1",
  category: 'exterior',
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "J R's Tattoo & Body Piercing photo 2",
  category: 'interior',
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Custom Tattoos',
    description:
      "Original tattoo designs created and applied by skilled artists like Spider, tailored to each client's vision with a focus on clean linework and lasting quality.",
    icon: 'pen-tool',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Body Piercing',
    description:
      'Professional body piercing using fresh, sterile needles opened in front of the client, performed by an experienced piercer who prioritizes comfort and minimal pain.',
    icon: 'circle',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Piercing Correction & Repair',
    description:
      "Expert assessment and correction of piercings done incorrectly elsewhere, restoring both safety and aesthetics for clients who've had bad experiences at other shops.",
    icon: 'shield-check',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Walk-In Appointments',
    description:
      'No-appointment-needed sessions available during open hours, making professional tattooing and piercing accessible without weeks of waiting.',
    icon: 'door-open',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Aftercare Consultation',
    description:
      'Hands-on aftercare guidance provided at the time of every piercing or tattoo to ensure proper healing and long-term results.',
    icon: 'heart-pulse',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Monroe & Facial Piercings',
    description:
      'Specialized facial piercings including Monroe placements, performed with precision and a gentle touch by a piercer experienced in high-visibility facial work.',
    icon: 'sparkles',
    image: '/photos/photo-8.webp',
  },
]

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "I went to this tattoo shop as a last stop! And honestly it's the best decision I've ever made regarding my piercing. I will NEVER GO ANYWHERE ELSE EVER!!!!! He saved my life and my face! I went to another place first to get my piercing and I came to him to fix what was done to my...",
    author: 'Jae "Kake_Kween" Waiters',
    rating: 5,
    source: 'google',
  },
  {
    text: "Highly recommend this establishment JR's tattoo shop is the best very clean, clean stations ever needle are fresh out of the packaging, atmosphere is off the chain, killer vibe. Yes highly recommend this place. Spider fabulous job again brother I'll be back, I'm felling ...",
    author: 'Brian W.',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Just got pierced here, was able to do a walk in which was great! The piercings literally didn\'t hurt and still don\'t hurt only 3 hours later, he gave great after care advice. he did a great job overall and is obviously very educated and experienced. Would 100% recommend and I\'...',
    author: 'Brandi',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Off the chain beautiful staff beautiful atmosphere job on my tattoo beautiful I cannot wait to visit again very soon',
    author: 'Gwendolyn Dixon',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I got a monroe piercing and was but he was very friendly. Will definitely be going for some ink.',
    author: 'Briana Wilk',
    rating: 5,
    source: 'google',
  },
]

// ─── STATS ───────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.3, suffix: ' Stars', label: 'Average Google Rating' },
  { value: 161, suffix: '+', label: 'Customer Reviews' },
  { value: 6, suffix: ' Days', label: 'Open Evenings & Weekends' },
  { value: 100, suffix: '%', label: 'Fresh Sterile Needles Every Time' },
]

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: "J R's Tattoo & Body Piercing photo 3", category: 'work' },
  { src: '/photos/photo-4.webp', alt: "J R's Tattoo & Body Piercing photo 4", category: 'work' },
  { src: '/photos/photo-5.webp', alt: "J R's Tattoo & Body Piercing photo 5", category: 'work' },
  { src: '/photos/photo-6.webp', alt: "J R's Tattoo & Body Piercing photo 6", category: 'work' },
  { src: '/photos/photo-7.webp', alt: "J R's Tattoo & Body Piercing photo 7", category: 'work' },
  { src: '/photos/photo-8.webp', alt: "J R's Tattoo & Body Piercing photo 8", category: 'work' },
  { src: '/photos/photo-9.webp', alt: "J R's Tattoo & Body Piercing photo 9", category: 'work' },
  { src: '/photos/photo-10.webp', alt: "J R's Tattoo & Body Piercing photo 10", category: 'work' },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'Do I need to make an appointment or can I walk in?',
    answer:
      "Walk-ins are welcome at JR's! Multiple customers have come in without appointments and received full service the same day.",
  },
  {
    question: 'How clean is the shop? Do they use fresh needles?',
    answer:
      "Cleanliness is a top priority at JR's. Customers consistently note the spotless stations and confirm that needles are opened fresh from the packaging in front of them.",
  },
  {
    question: "Can JR's fix a bad piercing I got somewhere else?",
    answer:
      "Yes — and it's one of the things the shop is known for. Customers have come in specifically to have botched piercings from other shops corrected, with excellent results.",
  },
  {
    question: 'Will getting pierced here hurt a lot?',
    answer:
      "Most customers report surprisingly minimal pain. Brandi noted her piercings didn't hurt during the session and were still painless 3 hours later.",
  },
]

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const businessContact = {
  name: "J R's Tattoo & Body Piercing",
  address: '6110 Market St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 474-5020',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '4:00 – 10:00 PM',
    Wednesday: 'Closed',
    Thursday: '4:00 – 10:00 PM',
    Friday: '4:00 – 10:00 PM',
    Saturday: '12:00 – 10:00 PM',
    Sunday: '12:00 – 8:00 PM',
  },
}

// ─── DECORATIVE COMPONENTS ───────────────────────────────────────────────────
const FloatingShapes = () => (
  <div className="jrs-shapes-container" aria-hidden="true">
    <div className="jrs-shape jrs-shape-circle-lg" />
    <div className="jrs-shape jrs-shape-circle-sm" />
    <div className="jrs-shape jrs-shape-diamond" />
    <div className="jrs-shape jrs-shape-ring" />
    <div className="jrs-shape jrs-shape-dot-cluster" />
  </div>
)

const SectionDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`jrs-divider ${flip ? 'jrs-divider-flip' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 48L480 8L960 40L1440 0V48H0Z" fill="currentColor" />
    </svg>
  </div>
)

// ─── MARQUEE STRIP ─────────────────────────────────────────────────────────
const words = ['Custom Ink', 'Walk-Ins Welcome', 'Philadelphia', 'Body Piercing', 'Sterile & Clean', 'Spider Artist', 'Killer Vibe', 'Market Street']

const MarqueeStrip = () => (
  <div className="jrs-marquee-wrapper" aria-hidden="true">
    <div className="jrs-marquee-track">
      {[...words, ...words].map((word, i) => (
        <span key={i} className="jrs-marquee-item">
          {word}
          <span className="jrs-marquee-dot">✦</span>
        </span>
      ))}
    </div>
  </div>
)

export default function Page() {
  return (
    <>
      {/* CSS Variables */}
      <div
        style={{
          '--brand-primary': '#814AC8',
          '--brand-accent': '#c84abb',
          '--brand-text': '#0f0a1a',
          '--brand-surface': '#f5f0ff',
        } as React.CSSProperties}
      />

      {/* Navbar */}
      <Navbar
        businessName="JR's Tattoo"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154745020"
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div className="jrs-hero-wrapper">
        <FloatingShapes />
        <HeroSection
          headline="Ink & Piercing On Market"
          subheadline="Walk right in — Spider and the crew have been doing killer work since day one."
          ctaText="Walk In Today"
          ctaHref="tel:2154745020"
          secondaryCtaText="See The Work"
          secondaryCtaHref="#gallery"
          rating={4.3}
          reviewCount={161}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
        <div className="jrs-hero-grain" aria-hidden="true" />
      </div>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────── */}
      <div className="jrs-marquee-section">
        <MarqueeStrip />
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <div id="about" className="jrs-stats-dark-wrap">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section id="services" className="jrs-services-section">
        <div className="jrs-section-label">
          <span>What We Do</span>
        </div>
        <ServiceCards
          heading="Services"
          subheading="Tattooing, piercing, and corrections — all under one roof on Market Street."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <div className="jrs-about-dark-wrap">
        <SectionDivider />
        <div className="jrs-about-inner">
          <AboutSection
            heading="The Shop"
            story="JR's has been a fixture on Market Street in West Philly — walk in, no waiting weeks for an appointment. Artist Spider brings the kind of clean linework and attention that keeps people coming back. The stations are spotless, the needles come out of the package in front of you, and the vibe is exactly what a tattoo shop should feel like."
            image={aboutPhoto}
          />
        </div>
        <SectionDivider flip />
      </div>

      {/* ── GALLERY ───────────────────────────────────────────────── */}
      <section id="gallery" className="jrs-gallery-section">
        <div className="jrs-section-label jrs-section-label-accent">
          <span>The Portfolio</span>
        </div>
        <ImageGallery
          heading="Fresh Work"
          photos={galleryPhotos}
          variant="masonry"
        />
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <div id="reviews" className="jrs-reviews-dark-wrap">
        <div className="jrs-reviews-bg-texture" aria-hidden="true" />
        <TestimonialCarousel
          heading="Real Words"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="jrs-faq-section">
        <div className="jrs-section-label">
          <span>Questions</span>
        </div>
        <FAQAccordion
          heading="Good To Know"
          items={faqItems}
        />
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <div id="contact" className="jrs-contact-dark-wrap">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ─────────────────────────────────────────── */}
      <ClickToCall phone="(215) 474-5020" />
    </>
  )
}