import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { ImageGallery } from '@/components/ImageGallery'
import { StatsCounter } from '@/components/StatsCounter'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ProcessSteps } from '@/components/ProcessSteps'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Service, Review, ProcessStep, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.5, suffix: '★', label: 'Average Star Rating' },
  {     value: 215, suffix: '+', label: 'Customer Reviews' },
  {     value: 3, label: 'Named Groomers Loved by Clients' },
  {     value: 5, suffix: '$', label: 'Nail Trim — Portland\'s Best Deal' },
]

const services: Service[] = [
  {
    name: 'Full Groom & Styling',
    description: 'Complete bath, dry, breed-appropriate haircut, and finish styling tailored to your instructions — done with the kind of careful attention that leaves dogs soft, handsome, and visibly happier.',
    icon: 'scissors',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'Nail Trim',
    description: 'A quick, gentle nail trim for just $5 cash — staff will even let you hold your pet during the process for anxious or small dogs.',
    icon: 'star',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Bath & Brush Out',
    description: 'Deep cleansing bath with blow-dry and full brush-out to remove mats, loose fur, and dander — ideal for fluffy breeds like Pomeranians and golden retrievers.',
    icon: 'droplets',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Anxiety-Sensitive Grooming',
    description: 'A calm, patient approach specifically suited for rescue dogs, reactive pets, or animals with past grooming trauma — Maddox and the team are known for turning shaking, alarmed dogs into relaxed ones.',
    icon: 'heart',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Small Dog & Chihuahua Grooming',
    description: 'Specialized handling for small and toy breeds who need extra gentleness — accommodations like owner-assisted nail trims are available on request.',
    icon: 'dog',
    image: '/photos/photo-8.webp',
  },
  {
    name: 'Large Breed Grooming',
    description: 'Full grooming services for larger dogs like golden retrievers, priced fairly for the size and skill involved — Ezra is especially praised for his work with big dogs.',
    icon: 'shield-check',
    image: '/photos/photo-9.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I love this place!\nMy dog always looks absolutely perfect, super soft and cute. They listen perfectly to my instructions, and do a great job with him. He doesn\'t like getting groomed of course, but when I pick him up I can totally tell he\'s super happy to be so clean and handsome. They are really flexible with appointments and can get you in quickly, when most places get booked out for months. They also have very reasonable prices for the level of skill they take with the dog. It\'s literally such a good deal. Tip them well! They deserve it. This photo is of him on a road trip right after we got him groomed!',
    author: 'Sky Trantham',
    rating: 5,
    source: 'google',
    date: '2025-10-28',
  },
  {
    text: 'Omg MADDOX is amazing 💜 They have the calmest, gentlest energy and thoughtful styling for even a basic cut. When we arrived both dogs were shaking and alarmed the way they always are at groomers. But When I came back to get them…My dogs literally couldn’t care less when I walked in, they loved Maddox and it was now the Maddox show. Calm, happy, adorable. I can’t tell you how happy we are to have found Maddox and recommend you check them out. Our two small dogs are rescues with some issues. It has taken years to find the right fit. So glad we finally did. Thank you, Maddox! 💖',
    author: 'Creative Alchemy',
    rating: 5,
    source: 'google',
    date: '2025-11-22',
  },
  {
    text: 'We’ve been going here for over a year now for our golden retriever. Ezra always does a phenomenal job and makes our pup feel as comfortable as possible. For the quality of work and for the size of our dog, their prices are really great too.',
    author: 'Erica Stenson',
    rating: 5,
    source: 'google',
    date: '2025-08-30',
  },
  {
    text: 'We love Portland Pampered Pets. The whole team (but especially Amber) is great with my gal Winona. Easy to schedule with quick availability and the price is right!',
    author: 'Sara Shimanek',
    rating: 5,
    source: 'google',
    date: '2025-09-26',
  },
  {
    text: 'They let me hold my Chihuahua while they did his nails which was wonderful and less stressful for him. Also they only charge $5 for a nail trim!! $5! It has to be cash so don\'t forget to get cash before you go in. I highly recommend them!!! I need to add that everyone who\'s done his nails so far has been absolutely amazing! They are so kind and gentle and very gentle with him, I\'ll never go anywhere else from now on!!!',
    author: 'Sherri Kleen',
    rating: 5,
    source: 'google',
    date: '2025-10-09',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'How far out are you booked? Can I get an appointment soon?',
    answer: 'Unlike most Portland groomers who are booked out for months, we\'re known for quick availability and flexible scheduling. Multiple clients have specifically praised how fast they were able to get in. Call us at (503) 233-2799 to check current openings.',
  },
  {
    question: 'My dog has anxiety and has had bad experiences at other groomers. Can you help?',
    answer: 'Absolutely — this is one of our specialties. Our groomer Maddox in particular is known for working with rescue dogs and anxious animals, and clients consistently describe their pets arriving shaking and leaving completely calm and happy. We go at your dog\'s pace and can accommodate special needs like letting you hold your pet during nail trims.',
  },
  {
    question: 'How much does a nail trim cost?',
    answer: 'Just $5 — and yes, that\'s real. We do ask that you bring cash for nail trims, so make sure to stop at an ATM beforehand. It\'s one of the most affordable services in Portland and our staff treats every animal with the same kindness regardless of the service.',
  },
  {
    question: 'What should I expect from a full groom?',
    answer: 'We listen carefully to your styling instructions and deliver a thorough bath, blow-dry, haircut, and finish. Clients describe their dogs coming home \'super soft and cute\' and visibly happier after their groom. Results are consistently praised across breed sizes from Chihuahuas to golden retrievers.',
  },
  {
    question: 'Are your prices reasonable for Portland?',
    answer: 'Multiple reviewers have called our pricing \'really reasonable,\' \'a great deal,\' and \'totally worth it\' — especially for the level of skill and care involved. For a full groom on a large breed like a golden retriever, clients consistently say the price-to-quality ratio is excellent. We believe great grooming shouldn\'t be a luxury.',
  },
  {
    question: 'Can I request a specific groomer?',
    answer: 'Yes, and we encourage it! Clients regularly request Maddox, Ezra, and Amber by name. If you\'ve found a groomer your pet clicks with, just mention their name when you book and we\'ll do our best to schedule you with them. Building that trust between your pet and their groomer matters to us.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Tell Us Everything',
    description: 'Share your dog\'s quirks, fears, past grooming trauma, and exactly how you want them to look — we actually listen and adjust accordingly.',
  },
  {
    title: 'The Calm Begins',
    description: 'Maddox, Ezra, or Amber takes over with the kind of patient, unhurried energy that even the most reactive pets learn to trust.',
  },
  {
    title: 'The Real Work Happens',
    description: 'A thorough bath, careful dry, breed-appropriate cut, and finish styling — done with attention that shows up in every soft, even stroke.',
  },
  {
    title: 'Pick Up a Happy Dog',
    description: 'You\'ll walk in expecting your pet to run to you — and find them so relaxed they can barely be bothered, which is exactly the point.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-3.webp',
  alt: 'Portland\'s Pampered Pets storefront with green door and professional pet grooming signage',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-4.webp',
  alt: 'Storefront entrance of Pampered Pooch pet grooming salon with glass doors and windows',
  category: 'exterior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: 'White fluffy dog resting in wire pen with gray mat and collar', category: 'product' },
  { src: '/photos/photo-2.webp', alt: 'Fluffy Pomeranian dog on pink bedding, adorable pet portrait indoors', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Happy fluffy dog sitting in car back seat with purple harness and toys', category: 'interior' },
  { src: '/photos/photo-6.webp', alt: 'Golden Retriever sitting on wooden floor in home kitchen', category: 'interior' },
  { src: '/photos/photo-8.webp', alt: 'Brown dog wearing red collar with tags lying on dark couch', category: 'product' },
  { src: '/photos/photo-9.webp', alt: 'Fluffy cream-colored dog standing in cozy living room with brown leather sofa', category: 'interior' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'Portland\'s Pampered Pets',
  address: '4236 SE Hawthorne Blvd',
  city: 'Portland',
  state: 'OR',
  zip: '97215',
  phone: '(503) 233-2799',
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
        businessName="Portland's Pampered Pets"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(503) 233-2799"
      />

      <main>
        <HeroSection
            headline="Where Shaking Dogs Leave Actually Happy."
            subheadline="Your nervous rescue, your anxious Chihuahua, your golden who hates the dryer — they've met their match on SE Hawthorne. Maddox, Ezra, and Amber have a gift for turning the most stressed pets into ones who can't be bothered to greet you when you walk back in."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (503) 233-2799"
            secondaryCtaHref="tel:(503) 233-2799"
            rating={4.5}
            reviewCount={215}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="gallery">
          <ImageGallery
            heading="Soft, Clean, and Visibly Happier."
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Everything Your Pet Needs. Nothing They Dread."
            subheading="From a gentle nail trim you can stay for, to a full breed-specific groom that leaves them looking like a show dog."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="The Green Door on Hawthorne."
            story="Portland's Pampered Pets on SE Hawthorne isn't your average grooming salon — it's the place rescue dogs finally stop shaking. Customers like Creative Alchemy describe arriving with two small dogs who were 'shaking and alarmed the way they always are at groomers,' only to return and find their pets so at ease they could barely be bothered to acknowledge their owner. That kind of calm doesn't happen by accident. It comes from groomers like Maddox, Ezra, and Amber who bring what one reviewer called 'the calmest, gentlest energy' to every appointment, whether it's a full groom on a golden retriever or a $5 nail trim on a nervous Chihuahua. The team listens — really listens — to your instructions, accommodates anxious or rescue animals with patience, and will even let you hold your dog during nail trims if that's what your pup needs.  What keeps Portland pet owners coming back isn't just the skill — it's the value and the access. In a city where most groomers are booked out for months, Portland's Pampered Pets consistently gets clients in quickly. Prices are described across multiple reviews as 'really reasonable,' 'a great deal,' and flat-out shocking — Sherri Kleen couldn't stop repeating that a nail trim is just $5. For a golden retriever full groom, for a Pomeranian's precision cut, for two small rescues with behavioral quirks — the work is thorough, the results are stunning, and the dogs come home soft, clean, and genuinely content.  This is the kind of neighborhood grooming spot that earns year-long loyalties. Erica Stenson has been bringing her golden retriever for over a year. Sara Shimanek loves the whole team but specifically calls out Amber for her care with her dog Winona. Sky Trantham tips well and tells everyone else to do the same. The green-doored storefront on Hawthorne might not have a flashy website, but it doesn't need one — word of mouth from customers who've finally found 'the right fit' after years of searching does that work just fine."
            image={aboutImage}
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Straight From the Humans Who Kept Coming Back."
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="process">
          <ProcessSteps
            heading="What Happens Between Drop-Off and That Happy Trot Out."
            subheading="Calm, intentional, and built around your pet — not a conveyor belt."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Maddox',
              role: 'Groomer & Animal Behaviorist at Heart',
              quote: 'Portland\'s Pampered Pets is defined not by a single face, but by the quiet culture its team has built together on SE Hawthorne. Maddox has become something of a local legend among Portland pet owners — described by clients as having \'thoughtful styling\' and an energy so calm it transforms visibly anxious rescue dogs into unbothered, happy animals within a single session. Ezra brings that same steady commitment to larger breeds, making golden retrievers feel comfortable through what can be an overwhelming process. And Amber has earned her own devoted following, with clients specifically requesting her by name and citing her gentleness and consistency as the reason they keep coming back. Together, these groomers have created something rare: a place where the humans trust completely and the animals genuinely relax.\n\nThe shop itself reflects that philosophy — no frills, no corporate polish, just a green door on Hawthorne, a team that answers the phone, and appointments available when you actually need them. The $5 nail trim isn\'t a loss leader; it\'s a statement about what this place values. Portland\'s Pampered Pets was built for the pet owner who has been let down before — by long waits, by rough handling, by groomers who don\'t listen — and needed somewhere that would finally get it right.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Things People Always Ask Us." items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Book Before Someone Else Grabs the Spot."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(503) 233-2799" />
    </>
  )
}
