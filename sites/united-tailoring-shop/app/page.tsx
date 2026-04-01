import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { StatsCounter } from '@/components/StatsCounter'
import { ServiceCards } from '@/components/ServiceCards'
import { ImageGallery } from '@/components/ImageGallery'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { TeamGrid } from '@/components/TeamGrid'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Service, Review, TeamMember, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.9, suffix: ' stars', label: 'Average Customer Rating' },
  {     value: 237, suffix: '+', label: 'Verified Customer Reviews' },
  {     value: 1, suffix: ' week', label: 'Typical Complex Alteration Turnaround' },
  {     value: 100, suffix: '%', label: 'Reviewers Who Said They\'d Return' },
]

const services: Service[] = [
  {
    name: 'Suit Alterations',
    description: 'Precise tailoring of men\'s and women\'s suits for a sharp, custom fit — including sleeves, waist, chest, and trouser hemming.',
    icon: 'scissors',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Dress Alterations',
    description: 'Expert fitting and alteration of formal dresses, including complex embellished fabrics like sequins and feather-trimmed garments.',
    icon: 'sparkles',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Garment Lining',
    description: 'Professional lining installation or repair for dresses, jackets, and suits to extend the life and structure of your clothing.',
    icon: 'layers',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Corset & Specialty Alterations',
    description: 'Skilled adjustments to structured and specialty garments including corsets, with fast turnaround when time is critical.',
    icon: 'zap',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Size Conversion Tailoring',
    description: 'Comprehensive resizing for customers who fall between standard sizes, ensuring a perfect fit without compromise across the full garment.',
    icon: 'ruler',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Event & Occasion Tailoring',
    description: 'Rush and deadline-driven tailoring for awards ceremonies, weddings, galas, and other high-stakes events where looking perfect is non-negotiable.',
    icon: 'calendar-check',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Outstanding first-time experience!\nMy husband and I stopped in for the first time and we were so impressed by their friendly, empathetic, and professional service. Rodney was not only talented but also very efficient — the alterations were done quickly and perfectly! You can tell they take real pride in their work. We will definitely be back for any of his future suit needs! If you want to be sharp and have the right fit, then 2303 N Broad Street is it!!! 😉',
    author: 'Jenn Jones',
    rating: 5,
    source: 'google',
    date: '2025-11-13',
  },
  {
    text: 'Everyone there is SOO nice and they did an INCREDIBLE job tailoring my suit to fit me perfectly (the pink one)! I am very short and have always been between sizes so I needed a lot of alterations done but they were still very affordable. And it only took one week for them to complete it! Perfect on the first try. I will definitely be returning for any future tailoring needs.',
    author: 'Marisa Montefusco',
    rating: 5,
    source: 'google',
    date: '2025-10-20',
  },
  {
    text: 'Wonderful, wonderful work. Have brought several suits in. Generations of knowledge and craftsmanship paired with kind, friendly customer service: leave United with a timeless look at a reasonable price and a great customer experience. Highly recommend!',
    author: 'Dylan Forr',
    rating: 5,
    source: 'google',
    date: '2026-01-08',
  },
  {
    text: 'I cannot express my gratitude for this tailor shop!  They are talented, kind, fast and excellently priced. I had a dress that needed ALOT of work for a major major event where I was nominated for an award for costume design. I had to look PERFECT and Ms Chris and her team lined and altered a sequin dress with feather trim in record time. I felt amazing and it was all due to this shop. Thank you thank you thank you!',
    author: 'Sarah Bacot',
    rating: 5,
    source: 'google',
    date: '2025-11-04',
  },
  {
    text: 'I brought in a corset to get altered and the tailor did an amazing job, got it done in under 10 mins.The owner and her daughter are amazing! Such great customer service. Every time I visited United, I always leave satisfied.',
    author: 'Jazlyn Reynoso',
    rating: 5,
    source: 'google',
    date: '2026-02-25',
  },
]

const team: TeamMember[] = [
  {
    name: 'Ms. Chris',
    role: 'Master Tailor & Owner',
    bio: 'Ms. Chris leads United Tailoring Shop with generations of tailoring knowledge and a hands-on approach that customers describe as fast, talented, and deeply kind. She handled a complex sequin-and-feather gown alteration for a costume design award ceremony — and delivered perfection under pressure.',
    credentials: ['Expert in embellished formal wear', 'Lining and complex alteration specialist', 'Owner of United Tailoring Shop'],
  },
  {
    name: 'Rodney',
    role: 'Senior Tailor',
    bio: 'Rodney is described by customers as both talented and empathetic — a rare combination that makes him as good to work with as he is skilled. He handles suit alterations efficiently and perfectly, earning repeat business from customers who say he makes them look truly sharp.',
    credentials: ['Men\'s suit alteration specialist', 'Fast turnaround without sacrificing quality', 'Praised for friendly and professional service'],
  },
  {
    name: 'Ms. Chris\'s Daughter',
    role: 'Tailor & Customer Experience',
    bio: 'Working alongside her mother, Ms. Chris\'s daughter brings the family warmth and craftsmanship that defines United\'s shop culture. Customers notice her presence and call both her and her mother \'amazing\' — a testament to the family legacy at the heart of this shop.',
    credentials: ['Family-trained tailor', 'Praised for outstanding customer service', 'Part of the United family team'],
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'How long does a typical alteration take?',
    answer: 'Turnaround times are impressively fast at United. Simple alterations like corset adjustments can be completed in under 10 minutes while you wait. More complex projects — such as full suit resizing with multiple alterations — are typically completed within one week. Deadline-driven work for events is accommodated, so let the team know your event date when you come in.',
  },
  {
    question: 'Can you handle complex or embellished garments like sequin dresses?',
    answer: 'Absolutely. United Tailoring Shop has experience altering highly detailed garments including sequin dresses with feather trim. Ms. Chris and her team have successfully lined and altered elaborate formal wear for major award ceremonies, so your special-occasion garment is in expert hands.',
  },
  {
    question: 'What if I\'m between sizes and need a lot of alterations done?',
    answer: 'United specializes in exactly this situation. Customers who are petite, between standard sizes, or need extensive work done across an entire garment consistently report that United delivers a perfect fit — often on the first try — at prices that are still affordable. Don\'t let the scope of the alterations discourage you from coming in.',
  },
  {
    question: 'What are your hours and when should I come in?',
    answer: 'United Tailoring Shop is open Tuesday through Saturday from 2:00 PM to 7:00 PM. The shop is closed on Sundays and Mondays. These afternoon hours reflect the team\'s commitment to focused, quality work. No appointment information is listed, so calling ahead at (215) 229-7760 is recommended for larger projects.',
  },
  {
    question: 'What makes United Tailoring Shop different from other tailors in Philadelphia?',
    answer: 'Customers consistently point to three things: the quality of the craft (described as \'generations of knowledge\'), the warmth and empathy of the team (Rodney, Ms. Chris, and her daughter are all praised by name), and the combination of speed and accuracy — most customers report their garments fit perfectly on the first try without needing additional adjustments.',
  },
  {
    question: 'Do you alter both men\'s and women\'s clothing?',
    answer: 'Yes. United regularly alters men\'s suits and women\'s garments including suits, formal dresses, and specialty items like corsets. The shop has experience across a wide range of fabrics and garment types, from structured tailored suits to delicate embellished formal wear.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'United Tailoring Shop photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'United Tailoring Shop photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'United Tailoring Shop photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'United Tailoring Shop photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'United Tailoring Shop photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'United Tailoring Shop photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'United Tailoring Shop photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'United Tailoring Shop photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'United Tailoring Shop photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'United Tailoring Shop photo 10', category: 'work' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'United Tailoring Shop',
  address: '2303 N Broad St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19132',
  phone: '(215) 229-7760',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '2:00 – 7:00 PM',
    Wednesday: '2:00 – 7:00 PM',
    Thursday: '2:00 – 7:00 PM',
    Friday: '2:00 – 7:00 PM',
    Saturday: '2:00 – 7:00 PM',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="United Tailoring Shop"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 229-7760"
      />

      <main>
        <HeroSection
            headline="Fitted Once. Perfect Every Time."
            subheadline="At United Tailoring Shop on North Broad, Ms. Chris and her team have built something rare — a place where you walk in with a garment and walk out feeling like it was made for you. First try. Every time."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 229-7760"
            secondaryCtaHref="tel:(215) 229-7760"
            rating={4.9}
            reviewCount={237}
            backgroundImage={heroImage}
            variant="blurred-reveal"
          />

        <div id="about">
          <AboutSection
            heading="Generations of Craft. One Family. One Standard."
            story="United Tailoring Shop at 2303 N Broad Street in Philadelphia is the kind of place that earns a 4.9-star rating the old-fashioned way — one perfect hem, one flawless seam, one deeply satisfied customer at a time. Rodney and Ms. Chris lead a team that customers describe with words like 'empathetic,' 'talented,' and 'kind' — not just skilled, but genuinely invested in how you look and feel when you walk out the door. Whether it's a husband's suit that needs a sharper silhouette or a short-statured woman who has never quite found clothes that fit off the rack, United's tailors meet every challenge with precision and care. One customer needed so many alterations on a suit that she expected a long wait and a steep bill — instead she got perfection in one week at an affordable price, on the first try.  The shop's range is genuinely impressive. Ms. Chris and her team tackled a heavily embellished sequin dress with feather trim under serious time pressure — it was destined for a major costume design award ceremony — and delivered results that made the wearer feel 'amazing.' Rodney turns around suit alterations quickly and efficiently without sacrificing craftsmanship, and the team can alter a corset in under ten minutes when needed. Customers consistently describe United as 'generations of knowledge and craftsmanship,' a phrase that says everything about how deeply rooted this shop's skill set really is. This is not a dry-cleaner that does alterations on the side. This is a true tailor's atelier tucked into North Philly.  What makes United Tailoring Shop genuinely special is the emotional texture of the experience. Customers don't just leave satisfied — they leave grateful. They write things like 'thank you thank you thank you' and 'I will definitely be returning.' The shop's afternoon hours (Tuesday through Saturday, 2–7 PM) reflect a craftsman's schedule built around quality over volume. The owner's daughter works alongside Ms. Chris, giving the business a family warmth that turns first-time visitors into loyal regulars. At United, getting dressed for the most important moments of your life is a collaborative, human experience — and that's exactly why 237 people gave it nearly a perfect score."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="What We'll Make Fit"
            subheading="From a corset in ten minutes to a sequin gown for award night — we handle it all."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Sharp Looks. Real Work."
            photos={galleryPhotos}
            variant="grid"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="They Said It Better Than We Could"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="team">
          <TeamGrid
            heading="The Hands Behind Your Fit"
            subheading="Ms. Chris, Rodney, and family — named by customers, trusted by hundreds."
            members={team}
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Ms. Chris',
              role: 'Master Tailor & Owner',
              quote: 'Ms. Chris is the heart of United Tailoring Shop. Customers speak of her with an affection that goes beyond a simple business transaction — she\'s the kind of tailor who makes you feel like your event, your garment, and your confidence are her personal responsibility. Her daughter works alongside her, and together they\'ve built something rare: a family-run shop where generations of craft knowledge are passed down and put to work every single day. When a customer walked in with a sequined, feather-trimmed dress that needed lining and alterations ahead of a costume design award ceremony — a high-stakes, highly detailed project — Ms. Chris and her team didn\'t flinch. They delivered on time, perfectly, and the customer felt like a winner before she even walked through the venue doors.\n\nRodney rounds out the United team with his own brand of efficient, friendly excellence. Customers describe him as talented and empathetic — a combination that is harder to find than pure skill alone. Together, Ms. Chris, her daughter, and Rodney have created a shop culture where every customer, from the walk-in with a quick corset fix to the bride with a complex gown, is treated with the same focused professionalism. The shop\'s afternoon hours are a deliberate choice — this is a team that does the work right, not fast, and the schedule reflects that commitment. United Tailoring Shop isn\'t just a business at 2303 N Broad Street. It\'s a neighborhood institution built on family, craft, and the belief that everyone deserves clothes that fit exactly the way they should.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Before You Come In" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Come Find Us on North Broad"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 229-7760" />
    </>
  )
}
