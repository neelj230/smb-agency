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
import { ProcessSteps } from '@/components/ProcessSteps'
import type { NavLink, Photo, Service, Review, Stat, ProcessStep, FAQItem } from '@/components/types'
import { motion } from 'framer-motion'

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
  alt: "Apache's Auto Clinic photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Apache's Auto Clinic photo 2",
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Timing Belt & Engine Assembly',
    description:
      'Full timing belt replacement and engine assembly service with transparent diagnostics — technicians show you exactly what failed and why before any work begins.',
    icon: 'settings',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Battery Replacement',
    description:
      'Same-day battery testing, sourcing, and installation — the team has been known to go out and purchase a battery on the spot to get a stranded customer safely back on the road.',
    icon: 'zap',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Cooling System Repair',
    description:
      'Diagnosis and repair of overheating issues, cooling fan replacement, and radiator service to keep your engine running at safe operating temperatures.',
    icon: 'thermometer',
  },
  {
    name: 'General Diagnostics & Inspection',
    description:
      "Comprehensive vehicle inspection with a walkthrough explanation of findings — no guesswork, no upsells, just an honest breakdown of what your car actually needs.",
    icon: 'search',
  },
  {
    name: 'Brake Service',
    description:
      'Brake pad, rotor, and caliper inspection and replacement for reliable stopping power, performed with the same honest pricing the shop is known for.',
    icon: 'disc',
  },
  {
    name: 'Oil Change & Preventive Maintenance',
    description:
      'Quick, fairly priced oil changes and routine maintenance to keep your vehicle running reliably between major repairs.',
    icon: 'droplets',
  },
]

const reviews: Review[] = [
  {
    text: 'Excellent customer service very professional. First time taking my car, was highly recommended by a friend. I will definitely be using their services again.',
    author: 'Aesha Richardson',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Went for a simple issue at the end of the day on a Friday evening - super fair pricing, and quick service. When I was ready to leave, my car wouldn\'t start - this was my fault though, I knew my battery was trash. Even though it was end of day on a Friday, they took care of me.',
    author: 'karen gambrell',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Very fair pricing with high quality work. Always feel taken care of leaving Apaches.',
    author: 'ara ishkhanian',
    rating: 5,
    source: 'google',
  },
  {
    text: "Pretty fair auto repair shop. Had a timing belt assembly repaired in my 07 Chrysler 300 Touring. A guy by the name of Brandon was very informative with the details for my car. Walked me step by step and showed me exactly what was the issue and why it needed to be serviced.",
    author: 'Jamal Carter',
    rating: 3,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.5, suffix: '★', label: 'Average Customer Rating' },
  { value: 28, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 5, suffix: '-day', label: 'Week Availability (Mon–Fri)' },
  { value: 100, suffix: '%', label: 'Commitment to Honest Repairs' },
]

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Drop It Off',
    description: 'Bring your vehicle in — walk-ins welcome. Same-day service available for most jobs.',
  },
  {
    step: 2,
    title: 'We Diagnose',
    description: "A technician inspects and explains the issue in plain language. You'll see exactly what's wrong before anything is touched.",
  },
  {
    step: 3,
    title: 'Fair Quote',
    description: "You get an honest price upfront. No hidden fees, no upsells. Just what your car actually needs.",
  },
  {
    step: 4,
    title: 'Back on the Road',
    description: 'Work is completed with quality parts. We stand behind every repair we make.',
  },
]

const faqItems: FAQItem[] = [
  {
    question: "How do I know I can trust the pricing at Apache's?",
    answer: "Multiple customers describe Apache's pricing as 'super fair' and consistent with or better than competitors in the area.",
  },
  {
    question: 'What happens if something is missed during my repair?',
    answer: "Apache's stands behind their work. One customer noticed an issue after leaving and returned immediately — the team corrected it without question.",
  },
  {
    question: 'Will the technician explain what\'s wrong with my car in plain language?',
    answer: 'Yes — Brandon in particular has been praised for walking customers through exactly what the problem is, showing them the failed part and why it needed service.',
  },
  {
    question: 'Do you take walk-ins or do I need an appointment?',
    answer: "Apache's is known for accommodating customers with quick turnaround, including same-day service for straightforward jobs. Walk-ins are welcome.",
  },
]

const businessContact = {
  name: "Apache's Auto Clinic",
  address: '5727 Haverford Ave #35',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 476-6500',
  email: '',
  hours: {
    Monday: '9:00 AM – 5:00 AM',
    Tuesday: '9:01 AM – 5:01 AM',
    Wednesday: '9:01 AM – 5:01 AM',
    Thursday: '9:01 AM – 5:01 AM',
    Friday: '9:00 AM – 5:00 AM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Global CSS variables ── */}
      

      {/* ── Navbar ── */}
      <Navbar
        businessName="Apache's Auto Clinic"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154766500"
      />

      <main>
        {/* ── HERO ── */}
        <HeroSection
          headline="Haverford Ave Mechanics"
          subheadline="Real mechanics. Real integrity. No shortcuts — Philadelphia, PA."
          ctaText="Call (215) 476-6500"
          ctaHref="tel:2154766500"
          secondaryCtaText="See Our Services"
          secondaryCtaHref="#services"
          rating={4.5}
          reviewCount={28}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* ── TRUST BAR ── */}
        <div className="apache-trust-bar">
          <div className="apache-trust-bar__inner">
            {[
              { icon: '🔧', label: 'Transparent Diagnostics' },
              { icon: '💲', label: 'Fair, Upfront Pricing' },
              { icon: '⚡', label: 'Same-Day Service' },
              { icon: '🛡️', label: 'Work Guaranteed' },
              { icon: '📍', label: 'Philadelphia, PA' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="apache-trust-bar__item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <span className="apache-trust-bar__icon">{item.icon}</span>
                <span className="apache-trust-bar__label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── STATS (dark) ── */}
        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        {/* ── SERVICES ── */}
        <section id="services" className="apache-section apache-section--light">
          <div className="apache-section-label">What We Fix</div>
          <ServiceCards
            heading="Services"
            subheading="From a dead battery on a Friday night to a full timing belt rebuild — we handle it all with the same honest approach."
            services={services}
            columns={3}
            variant="grid"
          />
        </section>

        {/* ── HOW IT WORKS (dark band) ── */}
        <div className="apache-dark-band" id="process">
          <div className="apache-section-label apache-section-label--light">How It Works</div>
          <ProcessSteps
            heading="The Process"
            subheading="No mystery. No runaround. Here's exactly what happens when you bring your car in."
            steps={processSteps}
            variant="grid"
          />
        </div>

        {/* ── ABOUT ── */}
        <section id="about" className="apache-section apache-section--off-white">
          <div className="apache-section-label">The Shop</div>
          <AboutSection
            heading="Apache's Auto Clinic"
            story="Apache's has been serving West Philadelphia from 5727 Haverford Ave for years — a neighborhood shop where the mechanic actually shows you the broken part before quoting the job. Customers come back because the pricing is straight and the work holds up. Brandon and the team won't start a repair without walking you through what's wrong and why."
            image={aboutPhoto}
          />
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="apache-section apache-section--light">
          <div className="apache-section-label">From Customers</div>
          <TestimonialCarousel
            heading="Customer Reviews"
            reviews={reviews}
            variant="grid"
          />
        </section>

        {/* ── FAQ ── */}
        <div className="apache-dark-band apache-dark-band--accent" id="faq">
          <div className="apache-section-label apache-section-label--light">Common Questions</div>
          <FAQAccordion
            heading="FAQ"
            items={faqItems}
          />
        </div>

        {/* ── CONTACT ── */}
        <section id="contact" className="apache-section apache-section--light">
          <div className="apache-section-label">Find Us</div>
          <ContactSection
            business={businessContact}
            heading="Visit the Shop"
            showMap={true}
          />
        </section>
      </main>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(215) 476-6500" />
    </>
  )
}