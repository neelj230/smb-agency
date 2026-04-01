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
import type { NavLink, Photo, Service, Review, Stat, FAQItem, SocialLinks } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND = '#814AC8'
const ACCENT = '#c84abb'

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "Dave's Artistic Tattoo photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Dave's Artistic Tattoo photo 2",
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: "Dave's Artistic Tattoo photo 3", category: 'work' },
  { src: '/photos/photo-4.webp', alt: "Dave's Artistic Tattoo photo 4", category: 'work' },
  { src: '/photos/photo-5.webp', alt: "Dave's Artistic Tattoo photo 5", category: 'work' },
  { src: '/photos/photo-6.webp', alt: "Dave's Artistic Tattoo photo 6", category: 'work' },
  { src: '/photos/photo-7.webp', alt: "Dave's Artistic Tattoo photo 7", category: 'work' },
  { src: '/photos/photo-8.webp', alt: "Dave's Artistic Tattoo photo 8", category: 'work' },
  { src: '/photos/photo-9.webp', alt: "Dave's Artistic Tattoo photo 9", category: 'work' },
  { src: '/photos/photo-10.webp', alt: "Dave's Artistic Tattoo photo 10", category: 'work' },
]

const services: Service[] = [
  {
    name: 'Custom Tattoos',
    description:
      "Personalized tattoo designs crafted by Dave with the same care and artistry whether it's your first piece or your latest addition.",
    icon: 'pen-tool',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Body Piercing',
    description:
      'Professional piercing services for nipples, septum, industrials, ears, and more — performed with precision, patience, and detailed aftercare guidance.',
    icon: 'circle',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Ear Piercing',
    description:
      'Quick, clean, and affordable ear piercing including standard lobe and cartilage placements with a calming chairside manner.',
    icon: 'headphones',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Industrial Piercing',
    description:
      'Precise placement of industrial bar piercings with thorough aftercare instructions — customers report the process being faster and less painful than expected.',
    icon: 'minus',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Septum Piercing',
    description:
      'Septum piercings performed with a step-by-step walkthrough so even first-timers and nervous clients feel completely at ease.',
    icon: 'aperture',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Piercing Aftercare Consultation',
    description:
      'Every piercing comes with in-depth aftercare instruction covering cleaning routines and infection warning signs so your piercing heals beautifully.',
    icon: 'shield-check',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "This shop deserves 10 stars! Dave did my daughter Madison's septum piercing and was absolutely incredible. From the moment we walked in, he made us feel welcomed and comfortable. Madison was nervous, but he talked her through every part of the process in a calm and reassuring way...",
    author: 'aysha steatean',
    rating: 5,
    source: 'google',
  },
  {
    text: "Dave is great!! I just got my nipples pierced and I'm not scared of much but I was beyond nervous, he was funny, gentle, explained thoroughly how to care/clean it after. I will definitely be back for another piercing soon and I'm asking specifically for Dave!",
    author: 'Ivy Marie',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I go to Dave for all of my piercings and he always makes you feel comfortable! Dave did my nipple piercings today and he was definitely the right person to go to. He explained everything to me, eased my nerves, and gave me in depth aftercare instructions.',
    author: 'Khaleh Walker',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I had my industrial piercings yesterday and Dave was just so quick, kind, and patient the piercing itself was honestly so quick and painless!! Lol I Didnt even realize he was done! Thanks Dave! Blessing to you..praying for you always!!!! Great shop',
    author: 'Trayonna A Pendleton',
    rating: 5,
    source: 'google',
  },
  {
    text: "Dave's is great. I just got my 2nd ear piercing. Great service, friendly, quick and the price is right. He distracted me with conversation so didn't have a chance to think about the piercing. I love this spot especially because it is clean. Give Dave a try.",
    author: 'Margarette Golding',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.7, suffix: '★', label: 'Average Star Rating' },
  { value: 388, suffix: '+', label: 'Customer Reviews' },
  { value: 10, suffix: '+ yrs', label: 'Serving West Philadelphia' },
  { value: 1000, suffix: '+', label: 'Happy Clients Served' },
]

const faqItems: FAQItem[] = [
  {
    question: "Is Dave's Artistic Tattoo good for first-timers or nervous clients?",
    answer:
      "Absolutely. Dave is specifically praised by nervous customers — including people getting nipple piercings, septum piercings, and industrials for the first time. He walks you through each step and keeps the energy calm and reassuring.",
  },
  {
    question: 'What piercing services are available?',
    answer:
      "Dave offers a wide range of body piercings including septum, nipple, industrial, and ear piercings. If you're unsure whether he does a specific placement, just call ahead — he's happy to discuss.",
  },
  {
    question: 'How clean is the shop?',
    answer:
      'Cleanliness is one of the most commonly mentioned positives in customer reviews. Multiple clients specifically call out the shop as clean and professional. Hygiene is a top priority here.',
  },
  {
    question: 'Will I get aftercare instructions for my piercing or tattoo?',
    answer:
      'Yes — every service includes detailed aftercare guidance. Dave explains how to clean your new piercing or tattoo and what signs to watch for during healing.',
  },
]

const businessContact = {
  name: "Dave's Artistic Tattoo",
  address: '5 N 63rd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 471-3113',
  email: '',
  hours: {
    Monday: '1:00 – 7:00 PM',
    Tuesday: '12:00 – 8:00 PM',
    Wednesday: '12:00 – 8:00 PM',
    Thursday: '12:00 – 8:00 PM',
    Friday: '12:00 – 8:00 PM',
    Saturday: '12:00 – 8:00 PM',
    Sunday: 'Closed',
  },
}

const socialLinks: SocialLinks = {}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Animated divider ────────────────────────────────────────────────────────
function InkDivider() {
  return (
    <div className="ink-divider-wrap" aria-hidden="true">
      <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="ink-divider-svg">
        <path
          d="M0 16 Q150 0 300 16 Q450 32 600 16 Q750 0 900 16 Q1050 32 1200 16"
          fill="none"
          stroke="url(#inkGrad)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
        <defs>
          <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={BRAND} stopOpacity="0.3" />
            <stop offset="50%" stopColor={ACCENT} stopOpacity="0.7" />
            <stop offset="100%" stopColor={BRAND} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ─── Floating label badge ─────────────────────────────────────────────────────
function FloatingBadge({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={`floating-badge ${className}`}
      style={style}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
const marqueeItems = [
  'Custom Tattoos',
  'Septum Piercing',
  'Industrial Piercing',
  'Ear Piercing',
  'Body Piercing',
  'Aftercare Guidance',
  'West Philadelphia',
  '4.7 Stars',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" style={{ color: ACCENT }}>●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Tagline banner ───────────────────────────────────────────────────────────
function TaglineBanner() {
  return (
    <div className="tagline-banner">
      <div className="tagline-banner-inner">
        <span className="tagline-ornament" style={{ color: ACCENT }}>✦</span>
        <span className="tagline-text">Art on skin, calm in the chair.</span>
        <span className="tagline-ornament" style={{ color: ACCENT }}>✦</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  })
  const aboutY = useTransform(aboutScroll, [0, 1], [40, -40])

  return (
    <>
      {/* Film grain overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Navbar */}
      <Navbar
        businessName="Dave's Artistic Tattoo"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154713113"
      />

      {/* Hero */}
      <section id="home">
        <HeroSection
          headline="Dave's Artistic Tattoo"
          subheadline="West Philadelphia's go-to for tattoos and piercings since over a decade."
          ctaText="Call to Book"
          ctaHref="tel:2154713113"
          secondaryCtaText="See the Work"
          secondaryCtaHref="#gallery"
          rating={4.7}
          reviewCount={388}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* Tagline banner */}
      <TaglineBanner />

      {/* About — light, airy */}
      <section id="about" ref={aboutRef} className="about-wrapper">
        <div className="about-parallax-bg dot-pattern" aria-hidden="true" />
        <div className="about-content-constrained">
          <div className="about-floating-badges" aria-hidden="true">
            <FloatingBadge
              className="badge-calm"
              style={{ top: '12%', left: '-2%' }}
            >
              <span style={{ color: BRAND }}>✓</span> Calm &amp; Patient
            </FloatingBadge>
            <FloatingBadge
              className="badge-clean"
              style={{ top: '60%', right: '-2%' }}
            >
              <span style={{ color: ACCENT }}>✓</span> Spotlessly Clean
            </FloatingBadge>
            <FloatingBadge
              className="badge-detail"
              style={{ bottom: '8%', left: '2%' }}
            >
              <span style={{ color: BRAND }}>✓</span> Detailed Aftercare
            </FloatingBadge>
          </div>
          <motion.div style={{ y: aboutY }} className="about-image-motion">
            <AboutSection
              heading="About the Shop"
              story="Dave has been tattooing and piercing in West Philadelphia for over ten years. Reviewers consistently mention how calm and reassuring he is — especially for nervous first-timers. The shop is clean, the prices are fair, and you'll leave with exactly what you came in for."
              image={aboutPhoto}
            />
          </motion.div>
        </div>
      </section>

      <InkDivider />

      {/* Stats — dark */}
      <section id="stats" className="bg-[#0f0a1a] text-white py-4">
        <StatsCounter stats={stats} variant="dark" />
      </section>

      {/* Services */}
      <section id="services" className="services-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ServiceCards
            heading="What We Do"
            subheading="Tattoos, piercings, and thorough aftercare — all under one roof in West Philly."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      <InkDivider />

      {/* Gallery — dark */}
      <section id="gallery" className="bg-[#0f0a1a] text-white gallery-dark-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ImageGallery
            heading="The Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="reviews-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TestimonialCarousel
            heading="Client Words"
            reviews={reviews}
            variant="scroll"
          />
        </motion.div>
      </section>

      <InkDivider />

      {/* FAQ — dark */}
      <section id="faq" className="bg-[#0f0a1a] text-white faq-dark-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="faq-inner"
        >
          <FAQAccordion heading="Good to Know" items={faqItems} />
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-[#0f0a1a]">
        <Footer
          business={businessContact}
          links={footerLinks}
          socialLinks={socialLinks}
        />
      </div>

      {/* Sticky click-to-call */}
      <ClickToCall phone="(215) 471-3113" />
    </>
  )
}