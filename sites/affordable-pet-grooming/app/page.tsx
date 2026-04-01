'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { ImageGallery } from '@/components/ImageGallery'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion } from 'framer-motion'

// ─── NAV ───────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── PHOTOS ────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-6.webp',
  alt: 'Small brown and white dog on forest trail surrounded by green vegetation and fencing.',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Cream-colored curly-haired dog resting on gray bed indoors near electrical outlet',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-2.webp', alt: 'Cream-colored dog with white chest lying on gray quilted couch wearing blue collar', category: 'interior' },
  { src: '/photos/photo-3.webp', alt: 'Black and white dog standing on green carpet in living room with blue sofa', category: 'interior' },
  { src: '/photos/photo-4.webp', alt: 'Three small gray and white dogs wearing pink bows on a porch.', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Child in orange shirt playing with colorful toys and fabrics indoors', category: 'interior' },
  { src: '/photos/photo-7.webp', alt: 'Small dog wearing gray houndstooth harness sitting in car', category: 'product' },
  { src: '/photos/photo-8.webp', alt: 'Black dog resting on colorful blanket indoors near bed', category: 'interior' },
]

// ─── SERVICES ──────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Full Breed Groom',
    description: 'Complete breed-specific grooming including bath, dry, cut, and styling tailored to your dog\'s coat type — from golden retrievers to schnauzers.',
    icon: 'scissors',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Rescue & Anxiety-Sensitive Grooming',
    description: 'Slow, patient grooming sessions specially suited for fearful, traumatized, or rescue dogs who need extra time and a calm, gentle approach.',
    icon: 'heart',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Bath & Brush Out',
    description: 'Thorough shampoo, conditioning rinse, and full brush-out to remove loose fur, tangles, and odor — leaving coats clean and manageable.',
    icon: 'droplets',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Trim & Tidy',
    description: 'Targeted trimming of paws, face, ears, and sanitary areas to keep your dog neat between full grooming appointments.',
    icon: 'crop',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Bow & Finishing Touches',
    description: 'Cute finishing accessories including bows, bandanas, and ear adornments — as seen on the shop\'s adorable trio of bow-wearing pups.',
    icon: 'sparkles',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Health Observation Check',
    description: 'Staff flag visible health concerns — like flea infestations or skin irregularities — so owners leave informed and prepared to follow up with their vet.',
    icon: 'stethoscope',
    image: '/photos/photo-8.webp',
  },
]

// ─── REVIEWS ───────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "I have a dog who is a rescue and is afraid to go to the groomer. His past abuse issues make him fearful to the extent that grooming is nearly impossible. The two ladies in Affordable Grooming didn't give up. Their caring heart has made my dog do a 180° and he isn't afraid to go t...",
    author: 'Debbie Jean',
    rating: 5,
    source: 'google',
  },
  {
    text: 'They were able to fit me in a days notice, and did such a cute Job on the Schnauzers cut for my pups.',
    author: 'Stacia Nikole',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Brought our golden retriever here last minute today, and they did an amazing job! I was a little nervous because the pricing is AMAZING but they did a wonderful job, best groom she\'s ever had! They also let us know about fleas and we were able to go get her some medicine.',
    author: 'CarterAndBryn Brown',
    rating: 5,
    source: 'google',
  },
]

// ─── STATS ─────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.4, suffix: '★', label: 'Average Customer Rating' },
  { value: 53, suffix: '+', label: 'Customer Reviews' },
  { value: 5, suffix: ' days', label: 'Days Open Each Week' },
  { value: 100, suffix: '+', label: 'Salem Pets Groomed' },
]

// ─── FAQ ───────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'My dog is a rescue with serious anxiety around grooming. Can you help?',
    answer: 'Yes — this is genuinely one of the shop\'s specialties. One customer brought in a rescue with abuse-related fear so severe that grooming was nearly impossible anywhere else. The team worked patiently and transformed his experience completely.',
  },
  {
    question: 'The prices seem really low. Is the quality actually good?',
    answer: 'Multiple customers have had the same reaction — and the same pleasant surprise. A golden retriever owner admitted being nervous about the pricing, then called it the best groom her dog had ever had. Low prices don\'t mean low standards here.',
  },
  {
    question: 'Can I get a same-day or last-minute appointment?',
    answer: 'It\'s worth calling — at least two customers have successfully been fit in on short notice. The shop runs a streamlined model, so there\'s often flexibility. Call (503) 391-5643 and ask.',
  },
  {
    question: 'What are your hours and days of operation?',
    answer: 'Affordable Pet Grooming is open Tuesday through Saturday from 8:00 AM to 2:00 PM. They are closed Sunday and Monday. Give them a call to book your appointment.',
  },
]

// ─── CONTACT ───────────────────────────────────────────────────────────────
const businessContact = {
  name: 'Affordable Pet Grooming',
  address: '5058 Commercial St SE',
  city: 'Salem',
  state: 'OR',
  zip: '97306',
  phone: '(503) 391-5643',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '8:00 AM – 2:00 PM',
    Wednesday: '8:00 AM – 2:00 PM',
    Thursday: '8:00 AM – 2:00 PM',
    Friday: '8:00 AM – 2:00 PM',
    Saturday: '8:00 AM – 2:00 PM',
    Sunday: 'Closed',
  },
}

// ─── FADE-UP ANIMATION WRAPPER ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Global brand tokens */}
      

      <Navbar
        businessName="Affordable Pet Grooming"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="tel:+15033915643"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Salem's Gentle Dog Groomers"
        subheadline="Big Hearts. Tiny Prices. Happy Pups — in Salem, OR since day one."
        ctaText="Call to Book"
        ctaHref="tel:+15033915643"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.4}
        reviewCount={53}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── PILL STRIP — tagline band ── */}
      <div className="apg-tagline-strip">
        <div className="apg-tagline-inner">
          {['Rescue-Friendly', 'Affordable Prices', 'Last-Minute Welcome', 'Salem, OR', 'Breed-Specific Cuts', 'Flea Detection', 'Bow & Finish'].map((t, i) => (
            <span key={i} className="apg-tagline-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* ── STATS — dark band ── */}
      <div className="bg-[var(--brand-text)]">
        <FadeUp>
          <StatsCounter stats={stats} variant="dark" />
        </FadeUp>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="apg-section-pad dot-pattern-bg">
        <FadeUp>
          <ServiceCards
            heading="What We Do"
            subheading="From full breed grooms to gentle sessions for anxious rescues — every dog is welcome."
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── ABOUT — alternating light/green split ── */}
      <section id="about" className="apg-about-band">
        <div className="apg-about-accent-bar" />
        <FadeUp>
          <AboutSection
            heading="Two Groomers. One Big Heart."
            story="Affordable Pet Grooming is run by a small team in Salem who genuinely care — not just about how your dog looks, but how they feel. A customer once brought in a rescue so traumatized by past abuse that grooming seemed impossible. These two didn't give up, and now he walks in without fear. That's who they are."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="apg-section-pad bg-[#f7faf8]">
        <FadeUp>
          <ImageGallery
            heading="Happy Pups"
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* ── REVIEWS — dark background ── */}
      <section id="reviews" className="bg-[var(--brand-text)] apg-section-pad">
        <FadeUp>
          <TestimonialCarousel
            heading="What People Say"
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="apg-section-pad apg-faq-band">
        <FadeUp>
          <FAQAccordion
            heading="Common Questions"
            items={faqItems}
          />
        </FadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="apg-section-pad bg-[#f7faf8]">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find Us in Salem"
            showMap={true}
          />
        </FadeUp>
      </section>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(503) 391-5643" />
    </>
  )
}