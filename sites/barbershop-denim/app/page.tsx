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
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Barbershop Denim photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Barbershop Denim photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Barbershop Denim photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Barbershop Denim photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Barbershop Denim photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Barbershop Denim photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Barbershop Denim photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Barbershop Denim photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Barbershop Denim photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Barbershop Denim photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Precision Haircut',
    description:
      'A tailored haircut dialed in to your exact preferences, delivered by barbers who listen closely and execute with detail-oriented skill.',
    icon: 'scissors',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Beard Trim & Shape',
    description:
      'Clean lines and sculpted edges to keep your beard looking intentional and sharp, complementing your cut perfectly.',
    icon: 'user',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Fade',
    description:
      'Seamless skin-to-length fades crafted with precision, from low fades to high bald fades tailored to your style.',
    icon: 'sliders-horizontal',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Line-Up & Edge-Up',
    description:
      'Crisp, defined hairline and edge cleanup to keep your look fresh and polished between full cuts.',
    icon: 'ruler',
    image: '/photos/photo-6.webp',
  },
  {
    name: "Kids' Haircut",
    description:
      'Patient, skilled cuts for younger clients in a welcoming and comfortable environment.',
    icon: 'smile',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Eyebrow Grooming',
    description:
      'Subtle eyebrow cleanup and shaping to tidy up your overall look — always discussed and agreed upon before any trimming begins.',
    icon: 'sparkles',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "My first time into the barbershop after seeing all the glowing reviews about Chris. The place is a great vibe, great location on South street and Chris is very personable, we had great conversations. I am particular about having my hair cut and Chris delivered. I look forward to ...",
    author: 'Michael Davis',
    rating: 5,
    source: 'google',
  },
  {
    text: "Solid barbershop, great environment and barbers. Chris not only did great cut, but good conversation and a few recommendations for a place get a bite for someone new to the location. Only needed to give him a few details of what I wanted and he got to work. Looking forward to mak...",
    author: 'Brice Vukmanic',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Great haircut, cool space, friendly staff. Cash only, but they do have an ATM in the store. They also offer beverages when you get there, which is another nice touch. Highly recommend',
    author: 'Jack Tubiello',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Needed a last minute cut and there was an eod opening. Was able to get in with Aryah. Gave a great cut! She and the rest of the staff was very accommodating and very friendly. Will for sure be back.',
    author: 'Nick',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.9, suffix: '★', label: 'Average Star Rating' },
  { value: 528, suffix: '+', label: 'Five-Star Reviews' },
  { value: 1, suffix: ' ATM on-site', label: 'Cash Only — Always Covered' },
  { value: 6, suffix: ' days', label: 'Open Days Per Week' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do I need an appointment, or do you take walk-ins?',
    answer:
      'Both! Barbershop Denim accommodates scheduled appointments and has been known to fit in last-minute and end-of-day openings.',
  },
  {
    question: 'Is it cash only, and what if I don\'t have cash?',
    answer:
      "Yes, the shop is cash only — but no need to make a detour. There's an ATM conveniently located inside the shop so you're always covered.",
  },
  {
    question: 'What makes Barbershop Denim different from other barbershops in Philly?',
    answer:
      'The combination of a genuinely cool space on South Street, barbers who actually listen to what you want, complimentary beverages, and a welcoming vibe that keeps people coming back.',
  },
  {
    question: 'Will my barber do anything to my hair or appearance without asking me first?',
    answer:
      'Your barber should always consult you before performing any service beyond what you\'ve requested. If you have specific preferences, speak up — the team is here to serve your vision.',
  },
]

const businessContact = {
  name: 'Barbershop Denim',
  address: '1517 South St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19146',
  phone: '(267) 930-3980',
  email: '',
  hours: {
    Monday: '10:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 6:30 PM',
    Wednesday: 'Closed',
    Thursday: '9:00 AM – 6:30 PM',
    Friday: '9:00 AM – 6:30 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit', href: '#contact' },
]

// ── Marquee strip component ───────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [
    'Precision Cuts',
    'South Street',
    'Fades',
    'Philly Since Day One',
    'Cash Only · ATM On-Site',
    'Walk-ins Welcome',
    'Beard Trims',
    '4.9 ★ Rating',
    'Edge-Ups',
    'Kids Welcome',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="bd-marquee-wrapper">
      <div className="bd-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="bd-marquee-item">
            {item}
            <span className="bd-marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Decorative section divider ────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="bd-section-label">
      <span className="bd-label-line" />
      <span className="bd-label-text">{text}</span>
      <span className="bd-label-line" />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <>
      {/* ── GLOBALS: CSS variables ── */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --brand-primary: #1C4A96;
              --brand-accent: #3400b2;
              --brand-text: #0d0d0d;
              --brand-surface: #f5f4f0;
            }
          `,
        }}
      />

      <Navbar
        businessName="Barbershop Denim"
        links={navLinks}
        ctaText="Book a Cut"
        ctaHref="tel:+12679303980"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="South Street's Barbershop"
        subheadline="Sharp cuts, real talk — 528 five-star reviews and counting."
        ctaText="Book a Cut"
        ctaHref="tel:+12679303980"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.9}
        reviewCount={528}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── MARQUEE ── */}
      <div className="bd-marquee-section">
        <MarqueeStrip />
      </div>

      {/* ── STATS ── */}
      <motion.div
        id="stats"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <StatsCounter stats={stats} variant="dark" />
      </motion.div>

      {/* ── ABOUT ── */}
      <motion.div
        ref={aboutRef}
        id="about"
        className="bd-about-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="bd-about-label-wrap">
          <SectionLabel text="About the Shop" />
        </div>
        <motion.div style={{ y: parallaxY }} className="bd-about-parallax">
          <AboutSection
            heading="On South Street"
            story="Barbershop Denim sits at 1517 South St in Philly — a space where real conversations happen and nobody leaves looking halfway decent. Chris and the crew listen first, then cut. They'll even tell you where to grab a bite after. Cash only, ATM on-site, beverages on arrival."
            image={aboutPhoto}
          />
        </motion.div>
      </motion.div>

      {/* ── SERVICES ── */}
      <div id="services" className="bd-services-wrapper">
        <div className="bd-services-label-wrap">
          <SectionLabel text="What We Do" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ServiceCards
            heading="Six Services"
            subheading="Every cut tailored to you. Every service agreed upon before scissors touch."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </div>

      {/* ── GALLERY ── */}
      <div id="gallery" className="bd-gallery-wrapper bg-[var(--brand-text)] text-white">
        <div className="bd-gallery-label-wrap">
          <SectionLabel text="The Work" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ImageGallery
            heading="Fresh Out the Chair"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </div>

      {/* ── REVIEWS ── */}
      <div id="reviews" className="bd-reviews-wrapper">
        <div className="bd-reviews-label-wrap">
          <SectionLabel text="Real Talk" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TestimonialCarousel
            heading="528 Reviews"
            reviews={reviews}
            variant="featured"
          />
        </motion.div>
      </div>

      {/* ── FAQ ── */}
      <div id="faq" className="bd-faq-wrapper bg-[var(--brand-surface)]">
        <div className="bd-faq-label-wrap">
          <SectionLabel text="Good to Know" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FAQAccordion heading="Before You Come In" items={faqItems} />
        </motion.div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" className="bd-contact-wrapper">
        <div className="bd-contact-label-wrap">
          <SectionLabel text="Find Us" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ContactSection
            business={businessContact}
            heading="1517 South St, Philly"
            showMap={true}
          />
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(267) 930-3980" />
    </>
  )
}