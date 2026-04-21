import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { HeroSection } from "@/components/HeroSection";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ImageGallery } from "@/components/ImageGallery";
import { FounderQuote } from "@/components/FounderQuote";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import type {
  Stat,
  Review,
  Service,
  ProcessStep,
  FAQItem,
  NavLink,
  Photo,
  SocialLinks,
} from "@/components/types";

const navLinks: NavLink[] = [
  { label: "Reviews", href: "#reviews" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: 4.2, suffix: "★", label: "Average Customer Rating" },
  { value: 133, suffix: "+", label: "Customer Reviews" },
  { value: 9, suffix: "+ yrs", label: "Longest Client Loyalties" },
  { value: 1000, suffix: "+", label: "Clients Served in West Philly" },
];

const services: Service[] = [
  {
    name: "Acrylic Full Set & Refills",
    description:
      "Custom acrylic nail sets and monthly refills crafted with precision — Mai's specialty, trusted by long-term clients who return month after month.",
    icon: "sparkles",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Pedicure",
    description:
      "Thorough pedicure services including specialized ingrown toenail care, performed with attention to comfort and detail.",
    icon: "footprints",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Gel Manicure",
    description:
      "Long-lasting gel polish applied over shaped nails for a glossy, chip-resistant finish that keeps hands looking polished for weeks.",
    icon: "wand",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Nail Art & Custom Designs",
    description:
      "Intricate nail art and custom designs that clients describe as 'masterpieces' — the kind of work that draws compliments long after you leave the salon.",
    icon: "palette",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Eyebrow Services",
    description:
      "Clean, defined eyebrow shaping and waxing to complete your look from head to toe.",
    icon: "eye",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Classic Manicure",
    description:
      "A foundational manicure — nail shaping, cuticle care, and polish — executed with the detail-oriented approach T&C is known for.",
    icon: "scissors",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "I’ve been coming to T&C Nail Salon since I was in high school, over 9 years ago! I’ve always loved their welcoming environment. EVERYONE is very professional and kind.Their work ethic and attention to detail creates thee most beautiful masterpieces I’ve ever seen. I say that to say, the energy you enter the salon with is the energy that will be reciprocated to you. They respect their clients and their business, promoting a space I feel more than comfortable getting serviced at. So comfortable, I can honestly say this is THE BEST NAIL SALON IN WEST PHILLY! I’m flooded with compliments every time I leave the chair!",
    author: "D'Aaron Washington",
    rating: 5,
    source: "google",
    date: "2023-11-10",
  },
  {
    text: "T&C gets me right everything I come. I see Mai every month for a refill and she never disappoints. And the mother does my pedicure to perfection! Give them a try if you’re in the area!",
    author: "Cheryl Ford",
    rating: 5,
    source: "google",
    date: "2023-11-11",
  },
  {
    text: "I highly recommend T&C Nail Salon for anyone looking to be serviced in the Philadelphia Area. I’ve been coming to get serviced here for 9+ years & every single time I’ve have been completely satisfied. All of the employees are friendly & very professional. If want fabulous looking hands and feet or eyebrows please don’t walk…RUN!",
    author: "Dalisha Washington",
    rating: 5,
    source: "google",
    date: "2023-11-10",
  },
  {
    text: "Super aggressive I took my young daughter and the nail was uneven I said something and the lady and her daughter started to be super aggressive over my concern I hate the nailery that wants money but don’t want to be told about what there doing wrong never will come back and do NOT recommend!!! Then they talked in there language afterwards the daughter rolling her eyes smfh super waist of time and money",
    author: "Sharnika",
    rating: 1,
    source: "google",
    date: "2026-01-02",
  },
  {
    text: "I’ve been going here for over 8+ years and everything was okay up until recently. I regularly get my nails + feet done with Anna who sits in the second chair and one day “Mom” asked me if I wanted to come in early as I was standing outside to be the first one in around 8:45 and they open at 9am. I told her I can wait for Anna because she does my ingrown toenails. She said if you want to wait you can and I said you can start that’s fine as the only thing Anna does on my feet is my ingrown I never cared who did my pedicure. She attempted to cut my ingrown (not deep ones) her self and she cut it in a weird way where I still felt it. I told her I would wait for Anna as it was now after 9 am she got mad as if I said she did something wrong and told me she will never do services with me again, I was fine with that and said nothing I patiently waited as she got on the phone and started saying things in her language which I caught on my translator. I kindly got up and asked how much was my pedicure without getting any other services as I did not like how I was treated paid my money and left. No issues. I come back like 4-6 weeks later only for Anna again land I come in and the mom looks at me weird and I guess in her language stating she’s not doing my feet which again I didn’t come for her. So she’s picking people over me, keep in mind I never caused no issues, nothing I sat on my lunch break for an hour and 20 mins no acknowledgments of if I’m next, or when I’ll be next nothing and again I kindly got up and left only this time I will NEVER return. I’m not paying no one who cannot give me respect or kind service even when I was nothing but kind I just want my money worth. Never again!!!",
    author: "Devera Rhoades",
    rating: 1,
    source: "google",
    date: "2025-08-01",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do I need an appointment or can I walk in?",
    answer:
      "T&C Nail Salon accepts walk-ins. The salon opens at 9:00 AM Tuesday through Saturday (closed Wednesday and Sunday). Many loyal clients arrive early — sometimes before opening — to secure their preferred technician, especially for specialists like Mai or Anna.",
  },
  {
    question: "Can I request a specific nail technician?",
    answer:
      "Yes, and many regulars do exactly that. Clients frequently request Mai for acrylic refills and Anna for pedicures and ingrown toenail care. If you have a preference, it's worth arriving early or calling ahead to (215) 472-4377.",
  },
  {
    question: "What makes T&C different from other nail salons in West Philly?",
    answer:
      "Long-term clients consistently point to three things: the quality of the work (described as 'masterpieces'), the professional and welcoming atmosphere, and the consistency that keeps people returning for 9+ years. Multiple reviewers independently called it the best nail salon in West Philadelphia.",
  },
  {
    question: "Do you offer eyebrow services in addition to nails?",
    answer:
      "Yes. T&C offers eyebrow services alongside their full nail menu. Clients recommend it as a one-stop visit for hands, feet, and brows.",
  },
  {
    question: "How should I handle a concern about my nails during my visit?",
    answer:
      "T&C's best experiences happen when communication is open and respectful on both sides — the team takes pride in their work and values client feedback. If something doesn't look right, raise it calmly and directly with your technician.",
  },
  {
    question: "What are the salon's hours and is there a day they're closed?",
    answer:
      "T&C is open Tuesday, Thursday, Friday, and Saturday from 9:00 AM to 5:30 PM, and Monday from 9:00 AM to 5:30 PM. The salon is closed on Wednesdays and Sundays. Plan your visit accordingly — Saturday tends to be busy.",
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "Pick Your Person",
    description:
      "Tell us who you want — Mai for acrylics, Anna for pedicures and ingrown care, or Mom for a classic set — and we'll make sure you're in the right hands.",
  },
  {
    title: "Settle Into the Chair",
    description:
      "From the moment you sit down, the energy is warm, professional, and focused entirely on you.",
  },
  {
    title: "Watch the Detail Work Happen",
    description:
      "Every shape, every layer, every finish is applied with the precision that's kept clients loyal for nearly a decade.",
  },
  {
    title: "Leave Ready for Compliments",
    description:
      "Walk out the door with nails that do the talking — and a standing appointment already in your head.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-1.webp",
  alt: "T&C Nail salon photo 1",
  category: "exterior",
};

const aboutImage: Photo = {
  src: "/photos/photo-2.webp",
  alt: "T&C Nail salon photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "T&C Nail salon photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "T&C Nail salon photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "T&C Nail salon photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "T&C Nail salon photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "T&C Nail salon photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "T&C Nail salon photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "T&C Nail salon photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "T&C Nail salon photo 10",
    category: "work",
  },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "T&C Nail salon",
  address: "5227 Chestnut St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 472-4377",
  email: "",
  hours: {
    Monday: "9:00 AM – 5:30 PM",
    Tuesday: "9:00 AM – 5:30 PM",
    Wednesday: "Closed",
    Thursday: "9:00 AM – 5:30 PM",
    Friday: "9:00 AM – 5:30 PM",
    Saturday: "9:00 AM – 5:30 PM",
    Sunday: "Closed",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="T&C Nail salon"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 472-4377"
      />

      <main>
        <HeroSection
          headline="Nine Years Running. Still Your Best Chair."
          subheadline="T&C is where West Philly keeps coming back — year after year, refill after refill. D'Aaron Washington said it best: 'I'm flooded with compliments every time I leave the chair.' That doesn't happen by accident."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (215) 472-4377"
          secondaryCtaHref="tel:(215) 472-4377"
          rating={4.2}
          reviewCount={133}
          foregroundImage={heroImage}
          variant="split"
        />

        <div id="stats">
          <StatsCounter stats={stats} variant="light" />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Straight From the Chair"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="What We Do Best (And We Mean Best)"
            subheading="From Mai's acrylics to Anna's ingrown care — every service has a specialist behind it."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="A Family Shop With a Loyal Following"
            story="T&C Nail Salon has been a fixture on Chestnut Street for over a decade, earning the kind of loyalty that only comes from consistently doing the work right. Customers like D'Aaron and Dalisha Washington have been walking through these doors for 9+ years — not because it's convenient, but because the results speak for themselves. D'Aaron puts it plainly: 'I'm flooded with compliments every time I leave the chair.' That's not an accident. It's the product of technicians like Mai, who handles monthly acrylic refills with the kind of precision that keeps clients booking the same chair month after month."
            image={aboutImage}
          />
        </div>

        <div id="process" className="bg-[var(--brand-bg-alt)]">
          <ProcessSteps
            heading="How Every Visit Goes Down"
            subheading="Consistent, personal, detail-obsessed — every single time."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="The Masterpieces Speak for Themselves"
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: "Mai",
              role: "Nail Technician – Acrylic Specialist",
              quote:
                "T&C Nail Salon is a family business in the truest sense. Known warmly in the community as a mother-daughter operation, the family behind T&C has built something rare on Chestnut Street: a loyal clientele that spans nearly a decade for many customers. Mai has become a go-to technician for acrylic refills, trusted month after month by clients who won't sit in anyone else's chair. The 'Mom' of the operation handles pedicures with a practiced, careful hand — and on most days, the whole team moves in sync, creating an atmosphere where regulars feel at home and newcomers quickly become familiar faces. The business reflects a clear philosophy: respect the client, respect the craft, and the results will speak for themselves.",
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Before You Book the Chair" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Come Find Us on Chestnut"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 472-4377" />
    </>
  );
}
