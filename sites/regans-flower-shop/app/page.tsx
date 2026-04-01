import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { StatsCounter } from '@/components/StatsCounter'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ImageGallery } from '@/components/ImageGallery'
import { TeamGrid } from '@/components/TeamGrid'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Service, Stat, Review, TeamMember, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 5, suffix: '★', label: 'Perfect Rating Across All Reviews' },
  {     value: 7, suffix: '+', label: 'Five-Star Customer Reviews' },
  {     value: 5, suffix: '+ Years', label: 'Loyal Customers Returning Annually' },
  {     value: 6, suffix: ' Days', label: 'Open Every Week for Your Community' },
]

const services: Service[] = [
  {
    name: 'Custom Floral Arrangements',
    description: 'Bespoke arrangements designed from scratch based on your vision, occasion, and seasonal availability — no catalogue required.',
    icon: 'flower-2',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Holiday & Seasonal Arrangements',
    description: 'Festive centerpieces and bouquets crafted with seasonal foliage and blooms for holidays like Thanksgiving, Christmas, and more.',
    icon: 'leaf',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Memorial & Sympathy Bouquets',
    description: 'Thoughtfully prepared bouquets to honor and remember loved ones, delivered with sensitivity and consistent care.',
    icon: 'heart',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Walk-In Same-Day Arrangements',
    description: 'No appointment needed — walk in and leave with a stunning custom arrangement created on the spot by our skilled florists.',
    icon: 'clock',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Plant Sales & Gifting',
    description: 'A curated selection of healthy, affordable plants perfect for gifting or adding greenery to your home or office.',
    icon: 'sprout',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Gift Consultation',
    description: 'Not sure what to get? Our team helps you find the perfect floral gift for any recipient, relationship, or occasion.',
    icon: 'gift',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'A ton of great plants and at an affordable price! They helped me find the perfect plant for my wife. I’ll definitely be back for more.',
    author: 'Jair Guardia',
    rating: 5,
    source: 'google',
    date: '2025-08-07',
  },
  {
    text: 'The owner of Regan’s Flower Shop is an exceptionally gifted florist. While visiting her shop on the eve of Thanksgiving; I observed her create  three magnificent arrangements. Each order was  unique, beautiful, and prepared with the utmost care.                                                                   Unhappy with the floral designs in the store catalogue. I what  a  brief conversation Mrs. Regan ; and she quickly gathered some loose flowers, seasonal foliage to constructed a spectacular holiday arrangement for my Thanksgiving dinner table.\nI have the utmost respect for Mrs. Regan’s artistic floral  capabilities, and I encourage others to check her out.',
    author: 'Theresa Clark',
    rating: 5,
    source: 'google',
    date: '2020-08-05',
  },
  {
    text: 'Have been purchasing Regan\'s Flowers for for almost five years. She does my deceased loved one\'s bouquet beautifully every time!',
    author: 'Brenda Graham',
    rating: 5,
    source: 'google',
    date: '2023-09-16',
  },
  {
    text: 'A staple in the community. Courteous staff, and healthy plants for decades!',
    author: 'Afi',
    rating: 5,
    source: 'google',
    date: '2024-10-25',
  },
  {
    text: 'Amazingly cheerful service and talented specialist for flower arrangements. Ask for Sylvina. I was a walk-in. She not only accommodated me, but she selected the best flowers and created a beautiful arrangement on the spot, all the while chit-chatting with me as if we were long-time friends!',
    author: 'Dave McClintock',
    rating: 5,
    source: 'google',
    date: '2026-03-14',
  },
]

const team: TeamMember[] = [
  {
    name: 'Mrs. Regan',
    role: 'Owner & Master Florist',
    bio: 'An exceptionally gifted florist with decades of experience, Mrs. Regan creates unique, breathtaking arrangements with an artistic eye and a deep commitment to her craft. Customers describe her work as magnificent and her care as unmatched.',
    credentials: ['Master Florist', 'Community Staple for Decades', 'Custom Design Specialist'],
  },
  {
    name: 'Sylvina',
    role: 'Floral Design Specialist',
    bio: 'Praised by walk-in customer Dave McClintock for her talent, warmth, and ability to create beautiful arrangements on the spot while making every customer feel like a long-time friend. Sylvina is the embodiment of Regan\'s welcoming spirit.',
    credentials: ['On-the-Spot Arrangement Specialist', 'Customer Experience Favorite'],
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Can I get a custom arrangement that\'s not in your catalogue?',
    answer: 'Absolutely. Mrs. Regan and her team specialize in going beyond the catalogue. Just describe your occasion, preference, or feeling — they\'ll select the right flowers and foliage and design something unique just for you, often right on the spot.',
  },
  {
    question: 'Do you accept walk-ins, or do I need to call ahead?',
    answer: 'Walk-ins are warmly welcomed! Specialist Sylvina has been praised for accommodating walk-in customers and creating stunning arrangements immediately, without any prior notice needed.',
  },
  {
    question: 'Do you offer memorial or sympathy flowers?',
    answer: 'Yes. Regan\'s has a long tradition of preparing beautiful, respectful bouquets for memorial purposes. Several customers have relied on the shop for years to honor deceased loved ones with care and consistency.',
  },
  {
    question: 'Do you sell individual plants as well as cut flowers?',
    answer: 'Yes! The shop carries a variety of healthy plants at affordable prices, making them a great option for gifting or home décor. The team can help you find the right plant for any person or space.',
  },
  {
    question: 'What are your hours and is the shop open on weekends?',
    answer: 'Regan\'s Flower Shop is open Monday through Saturday from 11:00 AM to 6:00 PM. The shop is closed on Sundays. You can also reach them by phone at (215) 879-3810.',
  },
  {
    question: 'What makes Regan\'s different from other Philadelphia florists?',
    answer: 'The personal touch. Customers consistently describe Mrs. Regan and her team as attentive, warm, and genuinely talented — not just processing orders, but truly listening and creating. The shop has been a trusted community institution for decades, with a perfect 5-star rating to show for it.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Regan\'s Flower Shop photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Regan\'s Flower Shop photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Regan\'s Flower Shop photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Regan\'s Flower Shop photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Regan\'s Flower Shop photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Regan\'s Flower Shop photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Regan\'s Flower Shop photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Regan\'s Flower Shop photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Regan\'s Flower Shop photo 9', category: 'work' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'Regan\'s Flower Shop',
  address: '1219 N 52nd St #23',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 879-3810',
  email: '',
  hours: {
    Monday: '11:00 AM – 6:00 PM',
    Tuesday: '11:00 AM – 6:00 PM',
    Wednesday: '11:00 AM – 6:00 PM',
    Thursday: '11:00 AM – 6:00 PM',
    Friday: '11:00 AM – 6:00 PM',
    Saturday: '11:00 AM – 6:00 PM',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Regan's Flower Shop"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 879-3810"
      />

      <main>
        <HeroSection
            headline="Every Arrangement Built From Scratch, With Heart."
            subheadline="Mrs. Regan set the catalogue aside, picked up loose flowers, and made something spectacular — right there on the eve of Thanksgiving. That's what we do here. Every single time."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 879-3810"
            secondaryCtaHref="tel:(215) 879-3810"
            rating={5}
            reviewCount={7}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="services">
          <ServiceCards
            heading="What Blooms Here"
            subheading="From walk-in moments to memorial tributes — every occasion deserves something one of a kind."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="about" className="bg-[var(--brand-bg-alt)]">
          <AboutSection
            heading="A Staple on 52nd Street."
            story="Regan's Flower Shop isn't your average corner florist — it's a living institution on N 52nd Street in West Philadelphia where artistry, community, and genuine human connection bloom together. Mrs. Regan, the gifted owner at the center of it all, is the kind of florist who takes one look at a store catalogue you're unhappy with, sets it aside, and proceeds to hand-select loose flowers and seasonal foliage to build you something spectacular from scratch — as Theresa Clark witnessed firsthand on the eve of Thanksgiving. That's not customer service by script; that's craft driven by instinct and care.  The shop has earned its reputation as a community staple over decades of showing up for the people of West Philly — for joyful occasions and sorrowful ones alike. Brenda Graham has trusted Regan's for nearly five years to prepare bouquets for her deceased loved ones, and Mrs. Regan delivers beautifully every single time. Jair Guardia found the perfect plant for his wife with a little guidance from the team. Even walk-in customers like Dave McClintock leave feeling like old friends, thanks to the warmth of specialists like Sylvina, who crafts stunning arrangements on the spot while keeping the conversation flowing like it's the most natural thing in the world.  With a perfect 5-star rating across every review and a clientele that spans gift-givers, grievers, plant lovers, and holiday hosts, Regan's Flower Shop is proof that the best florists don't just sell flowers — they listen, they create, and they make every arrangement feel like it was made for you and no one else."
            image={aboutImage}
          />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Straight From the People We've Made Smile."
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="gallery" className="bg-[var(--brand-bg-alt)]">
          <ImageGallery
            heading="No Two Look Alike. That's the Point."
            photos={galleryPhotos}
            variant="grid"
          />
        </div>

        <div id="team">
          <TeamGrid
            heading="The Hands Behind Every Arrangement."
            subheading="Gifted florists who treat strangers like long-time friends."
            members={team}
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Mrs. Regan',
              role: 'Owner & Master Florist',
              quote: 'Mrs. Regan built her flower shop the way she builds an arrangement — with intention, instinct, and an eye for what\'s truly needed rather than what\'s merely expected. Her talent was captured vividly by customer Theresa Clark, who watched her craft three distinct, magnificent holiday arrangements in a single visit, each one unique, each one prepared with what Theresa described as \'the utmost care.\' When Theresa expressed dissatisfaction with the catalogue options, Mrs. Regan didn\'t hesitate — she set the book aside and created something custom, something real, right there on the spot. That responsiveness is at the core of who she is as a florist and as a business owner.\n\nFor decades, Mrs. Regan has anchored herself in the West Philadelphia community, not just as a vendor but as a neighbor. Her shop has become the place people return to year after year — for anniversaries, for holidays, for remembrance. Her staff, including the warmly praised Sylvina, carry her spirit of personal connection into every customer interaction. What Mrs. Regan has built on N 52nd Street isn\'t just a flower shop. It\'s a place where people feel seen, where their occasions — big or small, joyful or grieving — are handled with the kind of artistry and humanity that no catalogue can ever capture.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Good Questions. Honest Answers." items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Come In. We'll Take It From Here."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 879-3810" />
    </>
  )
}
