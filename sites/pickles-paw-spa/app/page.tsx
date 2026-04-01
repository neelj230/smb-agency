import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { StatsCounter } from '@/components/StatsCounter'
import { AboutSection } from '@/components/AboutSection'
import { ProcessSteps } from '@/components/ProcessSteps'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ImageGallery } from '@/components/ImageGallery'
import { TeamGrid } from '@/components/TeamGrid'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Service, Stat, ProcessStep, Review, TeamMember, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

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
  {     value: 4.8, suffix: '★', label: 'Average Star Rating' },
  {     value: 39, suffix: '+', label: 'Verified Customer Reviews' },
  {     value: 6, suffix: ' days', label: 'Open Every Week' },
  {     value: 100, suffix: '+', label: 'Happy Pups Groomed' },
]

const services: Service[] = [
  {
    name: 'Full Groom & Breed Cut',
    description: 'A complete grooming session including bath, blow-dry, and a breed-appropriate or custom cut tailored to your dog\'s style — mohawks welcome.',
    icon: 'scissors',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Puppy\'s First Groom',
    description: 'A gentle, stress-free introduction to grooming designed to help young pups build positive associations with the spa experience.',
    icon: 'heart',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Bath & Brush Out',
    description: 'A thorough shampoo, conditioner, blow-dry, and full brush-out to remove loose fur and leave coats clean and healthy.',
    icon: 'droplets',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Ear Cleaning & Inspection',
    description: 'Careful ear cleaning and visual inspection to keep ears healthy and catch early signs of irritation or infection.',
    icon: 'search',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Nail Trim & Paw Care',
    description: 'Nail clipping, filing, and paw pad check to keep your dog comfortable on their feet between full groom visits.',
    icon: 'footprints',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Finishing & Bandanna Styling',
    description: 'Every groom is finished with a complimentary colorful bandanna and optional styling touches that send your pup out looking their absolute best.',
    icon: 'sparkles',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'This really is a great spot, and I don’t take Teddy anywhere else. You can tell they all love dogs and I feel like Teddy is in great hands! They also do a great job on his cut too - they gave him a mohawk and he looks so cute in the complementary bandanna they gave him! Thank you!!',
    author: 'Madeleine Herzog',
    rating: 5,
    source: 'google',
    date: '2026-02-09',
  },
  {
    text: 'I have followed Sarah Donato wherever her clippers landed. I was so incredibly happy for her when she was able to purchase her own doggy spa!  She is an amazing groomer, a hard worker and a great gal. If you’re looking for a groomer I would highly suggest Pickles Paw Spa.',
    author: 'Linda Willett',
    rating: 5,
    source: 'google',
    date: '2025-11-10',
  },
  {
    text: 'Wonderful place. Very time efficient and quality service. Friendly staff & my puppy looked so adorable when I picked him up (: Definitely recommend (:',
    author: 'McKenna Sullivan',
    rating: 5,
    source: 'google',
    date: '2025-11-20',
  },
  {
    text: 'Sabrina had her own shop, but it burned down.  Sabrina has been taking care of my dogs for many years.\n\nSince the fire i have followed Sabrina to two other locations.  Sabrina has been so wonderful with my dogs.  We all love her and how she cares for us. We would follow Sabrina anywhere.',
    author: 'Lynette',
    rating: 5,
    source: 'google',
    date: '2022-07-03',
  },
  {
    text: 'Sabrina isn’t friendly or welcoming at all. She honestly gave me slight anxiety coming here after awhile. She was great at grooming at fist then her work got super sloppy.  I’ll be finding a new groomer who can offer great customer service.',
    author: 'J G',
    rating: 1,
    source: 'google',
    date: '2026-02-14',
  },
]

const team: TeamMember[] = [
  {
    name: 'Sarah Donato',
    role: 'Owner & Lead Groomer',
    bio: 'Sarah built a devoted following across multiple grooming locations before opening Pickles Paw Spa. Described by longtime clients as an amazing groomer, a hard worker, and a genuinely great person — her clientele followed her here and wouldn\'t think of going anywhere else.',
    credentials: ['Owner-operator', 'Longtime professional groomer', 'Known for creative styling and custom cuts'],
  },
  {
    name: 'Sabrina',
    role: 'Senior Groomer',
    bio: 'Sabrina has years of experience building deep, lasting relationships with pet families — so much so that clients have followed her through multiple job changes and even a shop fire. Her gentle, caring approach to dogs has earned her a loyal following that considers her part of the family.',
    credentials: ['Multi-year client relationships', 'Former shop owner', 'Trusted with long-term pet care'],
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do you offer custom styling like mohawks or special cuts?',
    answer: 'Absolutely. Our groomers love getting creative — one happy client\'s dog walked out with a mohawk and a complimentary bandanna to match. Just let us know what you have in mind at drop-off and we\'ll make it happen.',
  },
  {
    question: 'What\'s included in a standard grooming appointment?',
    answer: 'A full groom typically includes a bath, blow-dry, breed or custom cut, ear cleaning, nail trim, and our signature finishing touch: a complimentary colorful bandanna. We want your pup to leave looking and feeling their best.',
  },
  {
    question: 'Is this a good place for first-time or nervous dogs?',
    answer: 'Yes — our team genuinely loves dogs, and that comes through in how they handle animals. Clients regularly comment that they feel their pets are in great hands, and we take extra care with anxious or first-time visitors.',
  },
  {
    question: 'How far in advance do I need to book?',
    answer: 'We recommend calling ahead to secure your preferred time slot. You can reach us at (541) 500-1037. We\'re open Monday through Saturday, 9 AM to 4 PM, so there\'s flexibility throughout the week.',
  },
  {
    question: 'Who are the groomers at Pickles Paw Spa?',
    answer: 'The spa is owned and operated by Sarah Donato, a highly regarded groomer with a loyal following built over many years. Sabrina is also part of the team, bringing her own dedicated client base and years of experience caring for dogs of all breeds and temperaments.',
  },
  {
    question: 'What if I have a senior or special-needs dog?',
    answer: 'We have experience with dogs of all ages and needs. Our team is attentive and patient, and we adjust our approach to make every dog — including seniors and those with health considerations — as comfortable as possible throughout their visit.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'The Welcome Check-In',
    description: 'We greet your dog like we know them — because soon enough, we will.',
  },
  {
    title: 'The Full Spa Treatment',
    description: 'Shampoo, condition, blow-dry, and a thorough brush-out tailored to your dog\'s coat and comfort level.',
  },
  {
    title: 'The Cut That Fits Them',
    description: 'Whether it\'s a breed-standard trim or a custom style — yes, mohawks included — we shape every cut around your dog\'s personality.',
  },
  {
    title: 'The Bandanna Send-Off',
    description: 'Every dog leaves finished, polished, and wrapped in a complimentary colorful bandanna because the exit moment matters too.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-4.webp',
  alt: 'Black dog with pink collar looking up at camera on outdoor path',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Corgi dog sitting on tile floor, looking up at camera with tongue out',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-2.webp', alt: 'Senior black dog sitting in car back seat wearing colorful bandana', category: 'interior' },
  { src: '/photos/photo-3.webp', alt: 'Dark dog wearing pink collar lying on colorful blankets indoors', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Close-up of dog\'s ear wound being examined by veterinarian during medical inspection', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Brown long-haired dog with tongue out, held in someone\'s hands indoors', category: 'product' },
  { src: '/photos/photo-7.webp', alt: 'Black dog wearing colorful bandana sitting on gravel ground outdoors', category: 'product' },
  { src: '/photos/photo-8.webp', alt: 'Black service dog in pink training vest looking at camera indoors', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Black dog wearing red collar sitting in car interior with wet windows', category: 'interior' },
  { src: '/photos/photo-10.webp', alt: 'Black and white dog playing with brown toy on green carpet floor indoors', category: 'interior' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'Pickles Paw Spa',
  address: '828 S Central Ave suite #7',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 500-1037',
  email: '',
  hours: {
    Monday: '9:00 AM – 4:00 PM',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 4:00 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Pickles Paw Spa"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(541) 500-1037"
      />

      <main>
        <HeroSection
            headline="Your Dog Leaves Here Looking Like Themselves"
            subheadline="At Pickles Paw Spa, grooming isn't transactional — it's personal. Our clients don't just come back. They follow us."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (541) 500-1037"
            secondaryCtaHref="tel:(541) 500-1037"
            rating={4.8}
            reviewCount={39}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="services">
          <ServiceCards
            heading="From First Bath to Full Mohawk"
            subheading="Every service is designed to make your dog feel good and look unforgettable."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="about" className="bg-[var(--brand-bg-alt)]">
          <AboutSection
            heading="The Spa That People Follow Across Town"
            story="Pickles Paw Spa isn't just a grooming appointment — it's a place where dogs are genuinely loved. Customers like Madeleine Herzog don't take their dogs anywhere else, and it's easy to see why: the team here has a knack for making pets feel at ease while delivering cuts that turn heads. Teddy walked out with a mohawk and a complimentary bandanna, and that kind of thoughtful, personality-driven finishing touch is exactly what sets Pickles apart from a standard clip-and-go shop. With a 4.8-star rating built on loyal, repeat clients, this Medford spa has earned a reputation built on trust, not just technique.  The story of Pickles Paw Spa is really a story about people following their groomers. Customers have tracked Sarah Donato and Sabrina across multiple locations — one even through a devastating shop fire — because the bond between groomer and pet is real here. Linda Willett followed Sarah for years before cheering her on as she opened her own spa. Lynette has followed Sabrina through two locations since her shop burned down, describing the relationship as one built on years of genuine care. That level of loyalty doesn't come from a good shampoo — it comes from groomers who remember your dog, understand their quirks, and treat every visit like it matters.  Located in suite #7 at 828 S Central Ave in Medford, Oregon, Pickles Paw Spa operates six days a week, keeping focused hours that prioritize quality over volume. The spa's warm, colorful aesthetic — bandannas, bright blankets, playful setups — reflects a team that genuinely enjoys what they do. McKenna Sullivan noted the time efficiency and quality in the same breath, which is rare and tells you something: this team has their rhythm down."
            image={aboutImage}
          />
        </div>

        <div id="process">
          <ProcessSteps
            heading="What Happens Between Drop-Off and That Bandanna Moment"
            subheading="Every visit has a rhythm. Here's how we take care of yours."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Straight From the Dog Parents"
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Proof It's Not Just a Haircut"
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="team" className="bg-[var(--brand-bg-alt)]">
          <TeamGrid
            heading="The Humans Your Dog Will Actually Love"
            subheading="Skilled, warm, and genuinely obsessed with what they do."
            members={team}
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: 'Sarah Donato',
              role: 'Owner & Lead Groomer',
              quote: 'Sarah Donato built her reputation one dog at a time, clip by clip, across multiple grooming stops before finally planting her flag with Pickles Paw Spa. Her loyal client Linda Willett put it simply: \'She is an amazing groomer, a hard worker and a great gal.\' Sarah\'s clients didn\'t just follow her — they celebrated when she finally opened her own place, because they knew she\'d earned it. Owning a spa means she sets the standard now, and everything from the complimentary bandannas to the mohawks on request reflects a groomer who takes real pride in her craft.\n\nAlongside Sarah, Sabrina brings her own fierce following to the Pickles team. Her clients have followed her through job changes and even through the trauma of losing her own shop to a fire — a testament to the kind of trust that only grows when someone truly cares for your animals over many years. Together, Sarah and Sabrina represent the heart of what Pickles Paw Spa is: a place built by groomers who love dogs, for owners who love their dogs just as much.',
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion heading="Questions We Hear at Drop-Off" items={faqItems} />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Your Dog's Next Great Hair Day Starts Here"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(541) 500-1037" />
    </>
  )
}
