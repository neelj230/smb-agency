import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { StatsCounter } from '@/components/StatsCounter'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { ProcessSteps } from '@/components/ProcessSteps'
import { ImageGallery } from '@/components/ImageGallery'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Review, Service, ProcessStep, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.5, suffix: '★', label: 'Average Customer Rating' },
  {     value: 38, suffix: '+', label: 'Customer Reviews' },
  {     value: 2, suffix: ' specialties', label: 'Show & Everyday Grooming' },
  {     value: 4, suffix: ' days/week', label: 'Focused Appointment Schedule' },
]

const services: Service[] = [
  {
    name: 'Full-Service Bath & Groom',
    description: 'Complete grooming session including breed-appropriate cut, bath, blow-dry, ear cleaning, and a festive or seasonal bandana finish.',
    icon: 'scissors',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'Show Dog Grooming',
    description: 'Ring-ready styling for competitive show dogs, with breed-standard cuts and presentation-quality finishing — as trusted by Black Russian Terrier and Shih Tzu show owners.',
    icon: 'award',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Nail Trim',
    description: 'Standalone nail trimming service for dogs of all sizes, handled with care and patience.',
    icon: 'wrench',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Anxiety-Sensitive Grooming',
    description: 'Low-stress appointments scheduled during quieter hours for fearful, rescue, or reactive dogs who need a calmer environment.',
    icon: 'heart',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Puppy\'s First Groom',
    description: 'Gentle introductory grooming session designed to help young or first-time dogs build positive associations with the grooming process.',
    icon: 'star',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Large Breed Grooming',
    description: 'Full grooming services for large and giant breeds — including dogs over 100 pounds — by staff experienced with big dogs\' unique handling needs.',
    icon: 'shield',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I bring my 125# Black Russian Terrier here for regular and show grooming. They do an amazing job with him and the staff is very knowledgeable. My boy loves coming here and has never been so excited to visit the groomer. He litterly tries to drag me to the door when we arrive because he\'s so happy to meet Linda and her staff!\n\nHighly recommend these folks for any of your grooming needs!!',
    author: 'Kathy',
    rating: 5,
    source: 'google',
    date: '2026-01-08',
  },
  {
    text: 'Everyone is always very friendly and clearly care about the dogs.\n\nMy dog is a former street dog-very scared in settings like these. They recommended her appointments be on calmer afternoons and they’re always quick to get her in and out.',
    author: 'Leah Thorp',
    rating: 5,
    source: 'google',
    date: '2026-02-17',
  },
  {
    text: 'They were great. I was worried because my little dog Josie had never had a professional groom before and I didn\'t know how she would act. She hates getting wet, and getting a trim. She\'s docile and takes it for me, I wasn\'t sure what she\'d do with someone else. She was pretty good. They took good care of her and were kind to her.',
    author: 'Angela Mencl',
    rating: 5,
    source: 'google',
    date: '2025-03-14',
  },
  {
    text: 'Not friendly and don\'t like to work on big dogs nails and rough with your dog and pull hair . And excuse me but they are both female. Plus the shepsky is a full service dog and will not bite.  You only tried to lift her and did it incorrectly.  The other didn\'t snap just showed some teeth.  So as far as  my review goes I stand by it. I will not be recommending your  dog grooming establishment.  I have never had any problem with their vets office or canyon paws in Stayton.  Ps I took the shepsky to pet etc and they had no problem with her.  I\'m going to clear up a few things and set the record straight: 1# The only one Jacquie  put on the table  is the malinois. 2# the shepsky jump on the table and sat. The groomer did pull hair to get her to stand up instead of ask her to stand up.  Groomer also said that shepsky lunged at her. What else would any dog do when hair is being pulled.  These are just the facts of this incident.  I will stand by my review of their services.  Which is don\'t take your dogs there.  Maybe they should do some retraining of their staff.  Most people I notice just drop off their dogs and leave.  While others don\'t inspect their dogs when they pick them up.  If I where them I would definitely start doing that just to make  sure that there isn\'t any razor burns, nicks or scratches.  Just to be safe.  I also would make sure that the groomers aren\'t the ones who are having the bad day. Just as an FYI I have done some dog grooming in my day.',
    author: 'Jacqueline McKinley',
    rating: 1,
    source: 'google',
    date: '2025-12-28',
  },
  {
    text: 'I did a nail trim and as far as my experience go\'s it was the worst one ever.  I will not be recommending your services to anyone.  You said my female Belgian malinois snapped at your groomer which is not true.  She showed some teeth.  But did not attempt to bite.  Secondly the shepsky is a fully trained service dog of 4 years and will not bite.  In trying to lift said dog you said she was to heavy and you pulled hair on her back end. You definitely handled her to roughly.  I hate to think what you\'re groomers do to other dogs.  So I  stand by my review of your establishment and groomers.  I have never had any problems at their vets or at canyon paws in stayton.  Both dogs have always been well behaved . Plus you\'re groomers are not the most friendly people I\'ve ever done business with.',
    author: 'Rebakaaa Mckinley',
    rating: 1,
    source: 'google',
    date: '2025-12-05',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'My dog is nervous or anxious around strangers — can you still help?',
    answer: 'Absolutely. The team has experience with fearful and rescue dogs. They can schedule your dog during quieter afternoon hours to minimize stress and work at a pace that keeps your pet comfortable. One of their regulars is a former street dog who was terrified of grooming environments — she now gets in and out quickly and calmly thanks to their thoughtful approach.',
  },
  {
    question: 'Do you groom large and giant breed dogs?',
    answer: 'Yes — and they do it well. One of their regulars is a 125-pound Black Russian Terrier who comes in for both routine grooming and show preparation. If you have a big dog, don\'t hesitate to call and discuss your specific needs.',
  },
  {
    question: 'Can you groom show dogs to breed standard?',
    answer: 'Yes. West Salem Dog Grooming has experience with competitive show grooming, including breed-specific styling for dogs like Black Russian Terriers and Shih Tzus. If you\'re preparing for the ring, the team understands what\'s required.',
  },
  {
    question: 'My dog has never been professionally groomed before. Is that okay?',
    answer: 'It\'s more common than you\'d think, and the team is used to it. They\'ll take their time, be gentle, and make the first experience as positive as possible. Angela brought her dog Josie in for her very first groom worried about how she\'d react — and left saying they took great care of her.',
  },
  {
    question: 'What are your hours and how far in advance do I need to book?',
    answer: 'The salon is open Monday, Tuesday, Thursday, and Friday from 8:30 AM to 4:30 PM. They are closed Wednesday, Saturday, and Sunday. Because the team keeps appointments personal and manageable, it\'s best to call ahead — especially if your dog has special needs or you want a specific time slot.',
  },
  {
    question: 'What happened to Canine Concepts — is this the same place?',
    answer: 'Yes. West Salem Dog Grooming was formerly known as Canine Concepts. The location, team, and commitment to quality care remain the same — just under a new name that better reflects where they\'re rooted.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Read the Dog First',
    description: 'Before the bath runs or a brush touches fur, we take a moment to read your dog\'s energy — anxious, excited, first-timer, or show veteran — so every session starts on the right foot.',
  },
  {
    title: 'The Right Appointment, Not Just the Next One',
    description: 'Nervous dogs get quieter afternoon slots; show dogs get the focused time their breed standard demands — because a one-size-fits-all schedule doesn\'t serve any dog well.',
  },
  {
    title: 'Expert Hands, Breed-Specific Work',
    description: 'From a gentle puppy introduction to a ring-ready Black Russian Terrier finish, every cut is executed with the care and technique each individual dog deserves.',
  },
  {
    title: 'Out the Door Looking — and Feeling — Great',
    description: 'A seasonal bandana, clean ears, trimmed nails, and a dog that\'s genuinely happy to have been here — that\'s the finish line every single visit.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-4.webp',
  alt: 'Standard poodle standing on pink grooming table in professional salon.',
  category: 'work',
}

const aboutImage: Photo = {
  src: '/photos/photo-6.webp',
  alt: 'Three dogs sitting on wooden floor in home interior space',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: 'White dog wearing festive bandana posed with Santa figurine and wrapped gifts', category: 'product' },
  { src: '/photos/photo-2.webp', alt: 'White dog wearing festive bandana posed with Santa figurine and wrapped gifts', category: 'product' },
  { src: '/photos/photo-3.webp', alt: 'Groomed Shih Tzu dog wearing purple bow tie at show or grooming salon', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Wheaten Terrier standing on pink grooming table during professional dog grooming session', category: 'product' },
  { src: '/photos/photo-7.webp', alt: 'Two black and white dogs sitting on wooden floor in kitchen setting', category: 'interior' },
  { src: '/photos/photo-8.webp', alt: 'Small black and white dog standing on pink yoga mat in indoor fitness studio.', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Brown dog sitting on purple mat against white wall indoors', category: 'product' },
  { src: '/photos/photo-10.webp', alt: 'White fluffy dog wearing black floral bandana, smiling at camera indoors.', category: 'product' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'West Salem Dog Grooming, formerly Canine Concepts',
  address: '1452 Brush College Rd NW',
  city: 'Salem',
  state: 'OR',
  zip: '97304',
  phone: '(503) 581-1529',
  email: '',
  hours: {
    Monday: '8:30 AM – 4:30 PM',
    Tuesday: '8:30 AM – 4:30 PM',
    Wednesday: 'Closed',
    Thursday: '8:30 AM – 4:30 PM',
    Friday: '8:30 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="West Salem Dog Grooming, formerly Canine Concepts"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(503) 581-1529"
      />

      <main>
        <HeroSection
            headline="The Groomer Your Dog Actually Wants to Visit"
            subheadline="At West Salem Dog Grooming, dogs don't get dragged through the door — they do the dragging. Linda and her team build the kind of trust that makes a 125-pound Black Russian Terrier sprint toward the grooming table."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (503) 581-1529"
            secondaryCtaHref="tel:(503) 581-1529"
            rating={4.5}
            reviewCount={38}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="stats">
          <StatsCounter stats={stats} variant="light" />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Straight From the Dogs' Humans"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Every Dog Gets What They Actually Need"
            subheading="From show-ring finishes to a nervous rescue's first calm afternoon — we meet them where they are."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="Formerly Canine Concepts. Still the Same Hands."
            story="West Salem Dog Grooming — formerly known as Canine Concepts — has built a reputation that's hard to fake: dogs who actually want to be there. Kathy's 125-pound Black Russian Terrier literally tries to drag her through the front door just to see Linda and the team. That kind of enthusiasm doesn't come from a quick wash-and-go — it comes from a salon where the staff knows your dog's name, reads their energy, and meets them exactly where they are. Whether it's a show-ready Shih Tzu in a purple bow tie, a freshly styled Standard Poodle on the pink grooming table, or a nervous former street dog who needs a calmer afternoon slot, the team at West Salem Dog Grooming adapts their approach to the individual animal.  The salon's pink grooming tables, festive seasonal bandanas, and professional setup reflect a team that genuinely takes pride in their craft. They handle breed-specific styling for show dogs and everyday grooming for family pets with equal attention. Linda, the standout name in customer reviews, has cultivated a loyal clientele who travel specifically to see her — a testament to the personal relationships built chair by chair, visit by visit. The shop operates on a focused Tuesday–Friday schedule, keeping appointments manageable and the atmosphere calm rather than chaotic.  For anxious dogs especially, this place seems to get it right. Leah's rescue dog — a fearful former street dog — is accommodated with quieter afternoon appointments and quick, low-stress sessions. Angela brought her dog Josie in for her very first professional groom, dreading the reaction, and left relieved. That pattern of thoughtful, animal-first care is what defines West Salem Dog Grooming's real identity: a small, skilled team doing right by the animals in their care, one groom at a time."
            image={aboutImage}
          />
        </div>

        <div id="process" className="bg-[var(--brand-bg-alt)]">
          <ProcessSteps
            heading="How a Great Groom Actually Happens"
            subheading="It starts before the scissors come out."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Fresh Cuts, Happy Faces"
            photos={galleryPhotos}
            variant="grid"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Linda',
              role: 'Lead Groomer & Owner',
              quote: 'Linda has been the heartbeat of this salon through its evolution from Canine Concepts to West Salem Dog Grooming. Customers don\'t just request the business — they request her by name. When Kathy\'s massive Black Russian Terrier strains at the leash to get through the front door, it\'s Linda he\'s racing to see. That kind of bond with animals doesn\'t happen by accident. It\'s built through consistency, genuine affection, and the kind of hands-on expertise that comes from years of working with everything from anxious rescue dogs to high-maintenance show animals requiring breed-specific styling and ring-ready presentation.\n\nThe salon Linda runs reflects her values: small enough to know every dog personally, skilled enough to handle any breed, and thoughtful enough to schedule a nervous dog on a quiet afternoon so the experience doesn\'t feel overwhelming. The pink grooming tables, the seasonal bandanas, the show-quality finishes — these are the details of someone who cares about the work. West Salem Dog Grooming isn\'t trying to be the biggest shop in Salem. It\'s trying to be the one your dog actually likes.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Things You Were Going to Ask Anyway" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Your Dog's Next Great Day Starts Here"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(503) 581-1529" />
    </>
  )
}
