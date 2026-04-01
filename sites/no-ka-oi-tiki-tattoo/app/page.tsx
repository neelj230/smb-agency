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
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Brand tokens ─────────────────────────────────────────────
const BRAND = {
  green: '#218544',
  accent: '#ace38f',
}

// ── Data ─────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'No Ka Oi Tiki Tattoo photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'No Ka Oi Tiki Tattoo photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'No Ka Oi Tiki Tattoo photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'No Ka Oi Tiki Tattoo photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'No Ka Oi Tiki Tattoo photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'No Ka Oi Tiki Tattoo photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'No Ka Oi Tiki Tattoo photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'No Ka Oi Tiki Tattoo photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'No Ka Oi Tiki Tattoo photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'No Ka Oi Tiki Tattoo photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Custom Tattoos',
    description: 'Original tattoo artwork designed and executed by experienced artists, from small delicate pieces like semicolon butterflies to larger custom work.',
    icon: 'pencil',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Body Piercing',
    description: 'Professional needle piercings for ears, nose, cartilage, and beyond — performed with sterile technique and anatomy-based placement recommendations.',
    icon: 'circle',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Ear Piercing & Lobe Re-Piercing',
    description: 'Safe, precise lobe and cartilage piercings including conch, flat, and helix — a far gentler and more accurate alternative to mall gun piercings.',
    icon: 'ear',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Jewelry Downsizing & Changes',
    description: 'Follow-up appointments to swap healing jewelry for shorter posts or new pieces once swelling subsides — available by walk-in or scheduled appointment.',
    icon: 'repeat',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Special Event & Holiday Specials',
    description: 'Seasonal promotions like the Independence Day BOGO piercing special, making it a fun destination for groups looking to celebrate with new ink or jewelry.',
    icon: 'calendar',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Walk-In Tattooing & Piercing',
    description: 'No appointment necessary for many services — walk-ins are welcome during shop hours with typical weekend waits around 25 minutes.',
    icon: 'door-open',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I got my earlobes re-pierced and I got my first tattoo. The piercing was the best piercing experience I\'ve ever had. I highly recommend them over the mall experience with the gun. It was sooo much less painful. The tattoo was wonderful also. I got a small blue semicolon butt...',
    author: 'Amy Singh',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Seamless piercing experience with Timothy. I got my conch done and it was quick, painless, and sterile. Very professional staff.',
    author: 'Emilie Mooney',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Came here on a whim with my friends for some fun piercings. I called multiple places on a busy Sunday and the receptionist was super friendly and welcoming. When we got there we signed in immediately and there was about a 25 min wait for walk ins. Tim was our piercer and I have s...',
    author: 'Ashley T (NoirFemme)',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 458, suffix: '+', label: 'Customer Reviews' },
  { value: 4.5, suffix: '★', label: 'Average Star Rating' },
  { value: 10, suffix: '+', label: 'Years Serving South Philly' },
  { value: 5000, suffix: '+', label: 'Tattoos & Piercings Completed' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do you accept walk-ins or do I need an appointment?',
    answer: 'Both! Walk-ins are welcome during regular hours. On busy Sundays expect around a 25-minute wait — call ahead if you want to plan around it.',
  },
  {
    question: 'How does your piercing process compare to mall piercing guns?',
    answer: 'Significantly better. Clients who\'ve had both experiences consistently say needle piercings here are far less painful, more precise, and heal faster. Gun piercings can cause tissue damage; needles don\'t.',
  },
  {
    question: 'What makes your shop different from other Philly tattoo shops?',
    answer: 'A combination of clean environment, artists and piercers with real personality (ask about Lazy\'s dry humor), and a welcoming vibe that doesn\'t feel intimidating for first-timers.',
  },
  {
    question: 'How do I get a jewelry downsize after my piercing heals?',
    answer: 'Downsizes are typically done about two weeks after piercing. You can come in as a walk-in before 8 PM or call ahead to confirm availability.',
  },
]

const businessContact = {
  name: 'No Ka Oi Tiki Tattoo',
  address: '610 S 4th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19147',
  phone: '(215) 925-1766',
  email: '',
  hours: {
    Monday: '12:00 – 9:00 PM',
    Tuesday: '12:00 – 9:00 PM',
    Wednesday: '12:00 – 9:00 PM',
    Thursday: '12:00 – 9:00 PM',
    Friday: '12:00 – 9:00 PM',
    Saturday: '11:00 AM – 9:00 PM',
    Sunday: '11:00 AM – 9:00 PM',
  },
}

const socialLinks: SocialLinks = {}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit Us', href: '#contact' },
]

// ── Fade-up animation wrapper ─────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Marquee strip ─────────────────────────────────────────────
const marqueeItems = [
  'Custom Tattoos',
  'Ear Piercings',
  'Body Piercing',
  'Walk-Ins Welcome',
  'South Philly',
  'Since 2009',
  'No Ka Oi',
  '610 S 4th St',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-strip overflow-hidden bg-[#218544] py-3 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-white font-semibold tracking-widest uppercase text-xs">
            <span>{item}</span>
            <span className="text-[#ace38f] text-base leading-none">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Tagline banner ────────────────────────────────────────────
function TaglineBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="tagline-banner relative overflow-hidden bg-[#0d1a0f] py-20 px-6 text-center">
      <div className="dot-pattern absolute inset-0 opacity-20" />
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto"
      >
        Art That Lives{' '}
        <span style={{ color: BRAND.accent }}>Under Your Skin.</span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        className="relative z-10 mt-4 text-white/60 text-lg max-w-xl mx-auto"
      >
        South Philadelphia's home for custom tattoos & professional piercings.
      </motion.p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* CSS variables */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --brand-primary: #218544;
              --brand-accent: #ace38f;
              --brand-text: #0d1a0f;
              --font-display: 'DM Sans', sans-serif;
            }
          `,
        }}
      />

      <Navbar
        businessName="No Ka Oi Tiki Tattoo"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12159251766"
      />

      {/* HERO */}
      <section id="home">
        <HeroSection
          headline="No Ka Oi Tiki Tattoo"
          subheadline="Custom ink & professional piercings at 610 S 4th St, South Philly."
          ctaText="Call to Book"
          ctaHref="tel:+12159251766"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.5}
          reviewCount={458}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* MARQUEE */}
      <MarqueeStrip />

      {/* TAGLINE BANNER */}
      <TaglineBanner />

      {/* STATS — dark */}
      <div id="stats">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <FadeUp className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span
                className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: BRAND.accent, color: BRAND.green }}
              >
                What We Do
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold text-[#0d1a0f] leading-tight"
              >
                Ink & Piercings
              </h2>
            </div>
            <p className="text-[#0d1a0f]/60 max-w-sm text-base leading-relaxed">
              Walk in for a quick piercing or sit down with an artist for a one-of-a-kind tattoo. Either way, we've got you.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* GALLERY — dark frame */}
      <section
        id="gallery"
        className="py-20"
        style={{ background: '#0d1a0f' }}
      >
        <FadeUp className="max-w-7xl mx-auto px-6 mb-10">
          <span
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: BRAND.green, color: '#fff' }}
          >
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Recent Work
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ImageGallery
            heading=""
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-[#f5faf3]">
        <FadeUp>
          <AboutSection
            heading="South Philly's Studio"
            story="No Ka Oi Tiki Tattoo has been on S 4th Street for over a decade — a neighborhood shop where the artists actually talk to you. Clients regularly describe first-timers leaving thrilled: one came in for a lobe re-pierce and walked out with her first tattoo. Walk-ins are always welcome."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <FadeUp className="max-w-7xl mx-auto px-6 mb-10">
          <span
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: BRAND.accent, color: BRAND.green }}
          >
            Real People
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1a0f] leading-tight">
            458 Reviews
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="scroll"
          />
        </FadeUp>
      </section>

      {/* FAQ — dark */}
      <section
        id="faq"
        className="py-20"
        style={{ background: '#0d1a0f' }}
      >
        <FadeUp className="max-w-3xl mx-auto px-6">
          <span
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: BRAND.green, color: '#fff' }}
          >
            Quick Answers
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-10">
            Common Questions
          </h2>
          <FAQAccordion heading="" items={faqItems} />
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-[#f5faf3]">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* FOOTER */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={socialLinks}
      />

      {/* CLICK TO CALL */}
      <ClickToCall phone="(215) 925-1766" />
    </>
  )
}