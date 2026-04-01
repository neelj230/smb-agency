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

// ─── NAV ───────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── PHOTOS ───────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-3.webp',
  alt: 'Small white and tan Shih Tzu dog standing on wooden floor indoors',
  category: 'interior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Small white dog wearing blue outfit and paw print medal in car seat',
  category: 'product',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-2.webp', alt: 'Black and white French Bulldog sitting on blue blanket in car interior', category: 'product' },
  { src: '/photos/photo-4.webp', alt: 'White and tan dog standing on garden path looking at camera', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'White fluffy dog with black collar and heart tag sitting indoors', category: 'product' },
  { src: '/photos/photo-6.webp', alt: 'White fluffy dog wearing colorful collar sitting in car backseat', category: 'product' },
]

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Nail Trim & File',
    description: 'Quick, precise nail trimming and filing — gentle enough for anxious or trauma-sensitive dogs, with same-day walk-in availability.',
    icon: 'scissors',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Full Grooming Session',
    description: "Complete bath, brush-out, haircut, and styling tailored to your dog's breed and coat condition, even if the fur has gotten extra long.",
    icon: 'sparkles',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Anal Gland Expression',
    description: 'Professional anal gland relief performed with care and efficiency, especially helpful for dogs who are skittish or uncomfortable with the process.',
    icon: 'heart',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Bath & Brush-Out',
    description: "A thorough shampoo and brush session to freshen up your pup's coat between full grooming appointments.",
    icon: 'droplets',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Walk-In Nail Trim',
    description: 'No appointment needed — call ahead, come in within a few hours, and get nails trimmed and filed in under 15 minutes.',
    icon: 'zap',
  },
  {
    name: 'Anxious & Rescue Dog Grooming',
    description: 'Patient, low-stress grooming handling for dogs with trauma histories or high anxiety — every dog is treated with calm and compassion.',
    icon: 'shield',
  },
]

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "Just found them on Google while looking for a place that could trim my dog's nails for me, I am always too nervous to do it. I called and she said I could walk in within the next few hours and she could do it. I drove over and was in and out within 5 minutes, she trimmed and filed...",
    author: 'Sara PDX',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Great customer service! My pup had a nail trim and Anal glands expression. She was kind to my skittish pup and quick. I\'m definitely going to go back again.',
    author: 'nikkonia',
    rating: 5,
    source: 'google',
  },
  {
    text: "Really great people who work here and always do an amazing job on our dog even if we let his fur get a little too long!",
    author: 'Matt Baillargeon',
    rating: 5,
    source: 'google',
  },
  {
    text: "I have a rescue dog that has trauma when it comes to getting his nails trimmed. They did an absolute wonderful job with him. We were in and out in 15mins and pricing was great!",
    author: 'Destiny Biggs',
    rating: 5,
    source: 'google',
  },
  {
    text: "This place is great! My golden loves it and has never looked better! I got there early and could see him through the window, the associate did not know I was there or could see them. My dog got a little excited to see me and the associate was the sweetest to him, calmed him down...",
    author: 'Peter Schneebeli',
    rating: 5,
    source: 'google',
  },
]

// ─── STATS ────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.8, suffix: ' stars', label: 'Average Google Rating' },
  { value: 75, suffix: '+', label: 'Happy Customer Reviews' },
  { value: 5, suffix: ' days', label: 'Days Open Per Week' },
  { value: 15, suffix: ' min', label: 'Average Nail Trim Visit' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'Do you accept walk-ins, or do I need an appointment?',
    answer: 'Walk-ins are welcome for quick services like nail trims. Customers have called ahead and been seen within a few hours on the same day.',
  },
  {
    question: 'How do you handle dogs that are anxious or scared of grooming?',
    answer: 'Patience and calm handling are at the heart of every appointment here. Marlyna\'s has successfully groomed rescue dogs with trauma histories and high-anxiety pups — every dog is treated at their own pace.',
  },
  {
    question: 'How long does a nail trim actually take?',
    answer: 'Most nail trim visits are in and out in 5 to 15 minutes. Nails are trimmed and filed for a clean, smooth finish — no long wait, no fuss.',
  },
  {
    question: 'What are your hours and which days are you open?',
    answer: 'Marlyna\'s is open Tuesday through Saturday from 8:00 AM to 4:30 PM. The shop is closed on Sundays and Mondays.',
  },
]

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const businessContact = {
  name: "Marlyna's Pet Grooming",
  address: '15710 NE Glisan St',
  city: 'Portland',
  state: 'OR',
  zip: '97230',
  phone: '(503) 256-3402',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '8:00 AM – 4:30 PM',
    Wednesday: '8:00 AM – 4:30 PM',
    Thursday: '8:00 AM – 4:30 PM',
    Friday: '8:00 AM – 4:30 PM',
    Saturday: '8:00 AM – 4:30 PM',
    Sunday: 'Closed',
  },
}

// ─── MARQUEE STRIP COMPONENT ──────────────────────────────────────────────────
const marqueeItems = [
  'Calm Paws',
  '★ 4.8 Stars',
  'Walk-Ins Welcome',
  'Rescue Dog Friendly',
  'NE Portland',
  'Anxious Dogs OK',
  'In & Out Fast',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-strip overflow-hidden bg-[#1B3A2D] py-4 border-y border-[#2a5040]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[#a8d5b5] font-['Inter'] text-sm font-medium tracking-[0.18em] uppercase flex items-center gap-10"
          >
            {item}
            <span className="text-[#2a5040] text-xs">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── TRUST BADGE ROW ──────────────────────────────────────────────────────────
function TrustBadges() {
  return (
    <div className="bg-[#f5f0e8] py-10 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { icon: '🐾', label: 'Gentle Every Time' },
          { icon: '⚡', label: 'In & Out Fast' },
          { icon: '🚶', label: 'Walk-Ins Welcome' },
          { icon: '💚', label: 'Rescue Friendly' },
        ].map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-3xl">{badge.icon}</span>
            <span className="text-[#1B3A2D] font-['Inter'] text-xs font-semibold tracking-widest uppercase">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── DECORATIVE DIVIDER ───────────────────────────────────────────────────────
function LeafDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`flex justify-center py-8 ${flip ? 'rotate-180' : ''}`}>
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <path d="M0 12 Q30 0 60 12 Q90 24 120 12" stroke="#1B3A2D" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        <circle cx="60" cy="12" r="3" fill="#1B3A2D" fillOpacity="0.3" />
        <circle cx="20" cy="12" r="1.5" fill="#1B3A2D" fillOpacity="0.2" />
        <circle cx="100" cy="12" r="1.5" fill="#1B3A2D" fillOpacity="0.2" />
      </svg>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* CSS Variables */}
      

      {/* Navbar */}
      <Navbar
        businessName="Marlyna's Pet Grooming"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5032563402"
      />

      {/* Hero */}
      <section id="hero">
        <HeroSection
          headline="Portland's Calm Grooming Shop"
          subheadline="Gentle hands, fast service, and zero stress — for every dog."
          ctaText="Call to Book"
          ctaHref="tel:5032563402"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4.8}
          reviewCount={75}
          variant="split"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats — Dark */}
      <div ref={statsRef} className="bg-[#1B3A2D]">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* Services */}
      <section id="services" className="bg-[#f9f6f0] pt-4">
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-center"
          >
            <span className="inline-block text-[#1B3A2D] text-xs font-semibold tracking-[0.22em] uppercase font-['Inter'] mb-3 opacity-60">
              What We Do
            </span>
          </motion.div>
        </div>
        <ServiceCards
          heading="Services"
          subheading="From a quick nail trim to a full groom — calm, careful, done right."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      <LeafDivider />

      {/* About */}
      <section id="about" className="bg-[#f9f6f0]">
        <AboutSection
          heading="About Marlyna's"
          story="Marlyna's Pet Grooming has been a quiet fixture on NE Glisan Street for years — the kind of shop where the staff genuinely loves dogs and it shows. Customers come back because their anxious or rescue dogs feel safe here, and because getting in and out fast is actually possible. No drama. Just good grooming."
          image={aboutPhoto}
        />
      </section>

      {/* Testimonials — Dark */}
      <section id="reviews" className="bg-[#1B3A2D] text-white">
        <div className="py-2">
          <TestimonialCarousel
            heading="What Clients Say"
            reviews={reviews}
            variant="featured"
          />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-[#f9f6f0] pt-4">
        <ImageGallery
          heading="Fresh Cuts"
          photos={galleryPhotos}
          variant="masonry"
        />
      </section>

      <LeafDivider flip />

      {/* FAQ — Dark accent */}
      <section id="faq" className="bg-[#004055] text-white">
        <FAQAccordion
          heading="Common Questions"
          items={faqItems}
        />
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#f9f6f0]">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </section>

      {/* Footer */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* Floating CTA */}
      <ClickToCall phone="(503) 256-3402" />
    </>
  )
}