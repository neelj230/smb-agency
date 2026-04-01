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

// ── Brand Tokens ──────────────────────────────────────────────
// Primary: #218544  Accent: #ace38f

// ── Data ─────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-4.webp',
  alt: 'Young man smiling on couch with black and white husky dog indoors',
  category: 'team',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-7.webp',
  alt: 'Two people and a dog posing at Multnomah Falls with bridge and waterfall behind them',
  category: 'team',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: 'Vibrant pop art style illustration of happy dog wearing blue collar and yellow bell', category: 'product' },
  { src: '/photos/photo-2.webp', alt: 'Person walking four dogs on a wooden boardwalk trail through natural wetland vegetation.', category: 'work' },
  { src: '/photos/photo-3.webp', alt: 'Black dog with white chest holding yellow tennis ball on patterned blanket indoors', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Person holding dog treats while three black and tan dogs eagerly reach upward outdoors', category: 'product' },
  { src: '/photos/photo-6.webp', alt: 'Person caring for multiple dogs in a sunny backyard setting', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Dog Daycare',
    description: 'Full-day in-home daycare at Nick\'s house with backyard playtime, walks, and social time with other dogs in a comfortable home setting.',
    icon: 'sun',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'Overnight Boarding',
    description: 'Multi-night boarding in a real home environment where dogs sleep, play, and are supervised around the clock by Nick personally.',
    icon: 'moon',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Backyard Play Sessions',
    description: 'Supervised group play in a securely fenced backyard with toys, other dogs, and plenty of room to run and socialize.',
    icon: 'trees',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Trail Walks & Outdoor Adventures',
    description: 'On-leash group walks along Corvallis trails, forest paths, and wetland boardwalks to keep dogs active and mentally stimulated.',
    icon: 'footprints',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Photo & Video Updates',
    description: 'Real-time photos and videos sent directly to pet parents during every stay so you always know your dog is safe and having fun.',
    icon: 'camera',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Cat-Friendly Socialization',
    description: 'For dogs who need it, gentle introduction to Nick\'s resident kitten helps build calm, confident behavior around cats.',
    icon: 'cat',
  },
]

const reviews: Review[] = [
  {
    text: 'Nick loves every dog who comes through his doors. His doggie daycare is ran out of his home which helps the dogs themselves feel more comfortable. He takes them on walks and drives and lots of play time in the backyard too. When Mollie comes home she is worn out and happy.',
    author: 'Tracy S',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I just started taking my young, heeler mix brothers to Nick and they\'ve settled right in! I just picked them up after boarding them for 2 nights, and they were happy, healthy and ready to go home to bed! He\'s even introducing them to his kitten which is fine with me.',
    author: 'Jennifer Scotti',
    rating: 5,
    source: 'google',
  },
  {
    text: 'My mid size (40lbs) retriever mix loves staying here anytime I am out of town. Nick is super friendly and responsive to messages and I am grateful that he is so flexible with my schedule!! He clearly loves dogs and treats them so well. Backyard is securely fenced and a good size.',
    author: 'Emily Werner',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Luna our dwarf German shepherd stayed here for the weekend while we visited friends here on vacation and she had a great time! He sent a video of her running and playing with the other dogs and text us updates. Thank you Nick for taking such good care of our baby.',
    author: 'Sarah Scar',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Nick is a great dog sitter...was very attentive to our boy Maxx and we appreciate how caring he is with him...highly recommend for doggie daycare / boarding',
    author: 'Judy Jensen',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 5, suffix: '★', label: 'Perfect Rating Across All Reviews' },
  { value: 18, suffix: '+', label: 'Verified Five-Star Reviews' },
  { value: 7, suffix: ' days', label: 'Open Every Day of the Week' },
  { value: 100, suffix: '%', label: 'Reviewers Recommend Claws and Paws' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Is this a commercial kennel or a home-based daycare?',
    answer: 'Claws and Paws is run out of Nick\'s home in Corvallis, which is intentional. Dogs are far more comfortable in a real home environment than a commercial kennel. They sleep on real furniture, play in a real backyard, and get one-on-one attention — not a kennel run.',
  },
  {
    question: 'Will I get updates while my dog is staying with Nick?',
    answer: 'Absolutely. Nick is known for sending photos, videos, and text updates throughout every stay. Multiple customers have specifically called out how responsive and communicative he is — you\'ll never be left wondering how your dog is doing.',
  },
  {
    question: 'Do you accept dogs of all sizes?',
    answer: 'Yes! Past guests have included a 40-pound retriever mix, heeler-mix brothers, a dwarf German shepherd, and a large husky. Nick works with dogs of all sizes and energy levels.',
  },
  {
    question: 'Can my dog board for multiple nights?',
    answer: 'Yes, overnight and multi-night boarding is available. Jennifer Scotti\'s dogs boarded for two full nights and came home happy, healthy, and ready for bed — exactly how it should be.',
  },
]

const businessContact = {
  name: 'Claws and Paws Pet Resort',
  address: '862 NW Oak Ave',
  city: 'Corvallis',
  state: 'OR',
  zip: '97330',
  phone: '(541) 223-3608',
  email: '',
  hours: {
    Monday: '6:30 AM – 7:00 PM',
    Tuesday: '6:30 AM – 7:00 PM',
    Wednesday: '6:30 AM – 7:00 PM',
    Thursday: '6:30 AM – 7:00 PM',
    Friday: '6:30 AM – 7:00 PM',
    Saturday: '8:00 AM – 5:00 PM',
    Sunday: '8:00 AM – 5:00 PM',
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

// ── Decorative Paw SVG ────────────────────────────────────────
function PawPrint({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="12" rx="6" ry="8" />
      <ellipse cx="44" cy="12" rx="6" ry="8" />
      <ellipse cx="10" cy="28" rx="5" ry="7" />
      <ellipse cx="54" cy="28" rx="5" ry="7" />
      <path d="M32 22c-10 0-18 7-18 18 0 8 6 14 18 14s18-6 18-14c0-11-8-18-18-18z" />
    </svg>
  )
}

// ── Marquee Banner ────────────────────────────────────────────
function TaglineBanner() {
  const items = Array(8).fill('Where every dog comes home worn out happy.')
  return (
    <div className="paws-marquee-wrapper overflow-hidden bg-[#ace38f] py-3 border-y-2 border-[#218544]">
      <div className="paws-marquee-track flex gap-0 whitespace-nowrap" aria-hidden="true">
        {[...items, ...items].map((text, i) => (
          <span
            key={i}
            className="paws-marquee-item inline-flex items-center gap-3 text-[#218544] font-semibold text-sm tracking-wide px-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <PawPrint className="w-4 h-4 opacity-60 shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Floating Badge ────────────────────────────────────────────
function FloatingBadge() {
  return (
    <motion.div
      className="hidden lg:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#ace38f] border-4 border-[#218544] shadow-xl absolute right-8 bottom-[-3rem] z-20 text-center"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
      whileHover={{ rotate: 6, scale: 1.08 }}
    >
      <span className="text-2xl font-black text-[#218544]" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>5★</span>
      <span className="text-[10px] font-semibold text-[#218544] leading-tight px-1">18 Reviews</span>
    </motion.div>
  )
}

// ── Geometric Accents ─────────────────────────────────────────
function GeometricAccents() {
  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="paws-geo paws-geo--circle absolute top-16 left-[8%] w-6 h-6 rounded-full bg-[#ace38f] opacity-40" />
      <div className="paws-geo paws-geo--triangle absolute top-40 left-[15%] w-0 h-0 opacity-30"
        style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '17px solid #218544' }} />
      <div className="paws-geo paws-geo--circle absolute bottom-24 right-[12%] w-10 h-10 rounded-full bg-[#ace38f] opacity-25" />
      <div className="paws-geo paws-geo--square absolute bottom-40 left-[5%] w-5 h-5 bg-[#218544] opacity-20 rotate-12" />
      <div className="paws-geo paws-geo--circle absolute top-[35%] right-[6%] w-4 h-4 rounded-full bg-[#218544] opacity-30" />
    </div>
  )
}

// ── Section Wrappers ──────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function ClawsAndPawsPage() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <>
      {/* CSS variables */}
      

      <Navbar
        businessName="Claws & Paws"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5412233608"
      />

      {/* ── HERO ── */}
      <div className="relative">
        <HeroSection
          headline="Nick's Home for Dogs"
          subheadline="Home-based daycare and boarding in Corvallis — dogs leave worn out and happy."
          ctaText="Call (541) 223-3608"
          ctaHref="tel:5412233608"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={5}
          reviewCount={18}
          variant="split"
          backgroundImage={heroPhoto}
          foregroundImage={heroPhoto}
        />
        <FloatingBadge />
      </div>

      {/* ── MARQUEE TAGLINE ── */}
      <TaglineBanner />

      {/* ── STATS — dark ── */}
      <FadeUp>
        <div id="stats" className="relative">
          <StatsCounter stats={stats} variant="dark" />
        </div>
      </FadeUp>

      {/* ── SERVICES ── */}
      <section id="services" className="relative dot-pattern-bg py-4">
        <GeometricAccents />
        <FadeUp delay={0.05}>
          <ServiceCards
            heading="What Nick Offers"
            subheading="Everything your dog needs — in a real home, with real care."
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── ABOUT — light green tint ── */}
      <section className="relative overflow-hidden bg-[#f0faf3] py-2" ref={parallaxRef}>
        <motion.div
          style={{ y: parallaxY }}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <PawPrint className="absolute top-10 right-10 w-48 h-48 text-[#ace38f] opacity-20" />
          <PawPrint className="absolute bottom-6 left-6 w-32 h-32 text-[#218544] opacity-10" />
        </motion.div>
        <FadeUp className="relative z-10">
          <AboutSection
            heading="Real Home, Real Care"
            story="Nick runs Claws and Paws out of his own house on NW Oak Ave — and that's the whole point. Dogs are more comfortable in a real home than a kennel, and it shows. Reviewers consistently say their dogs come home worn out and happy. He sends photos and videos throughout every stay, responds fast to messages, and has a securely fenced backyard where dogs run free every single day."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="bg-white py-4">
        <FadeUp>
          <ImageGallery
            heading="Life at the Resort"
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* ── REVIEWS — dark bg ── */}
      <section id="reviews" className="bg-[#1a2e1f] text-white py-4">
        <FadeUp>
          <TestimonialCarousel
            heading="Dog Parents Love It"
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#f0faf3] py-4">
        <FadeUp>
          <FAQAccordion
            heading="Common Questions"
            items={faqItems}
          />
        </FadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-white py-2">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Book a Stay"
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={socialLinks}
      />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(541) 223-3608" />
    </>
  )
}