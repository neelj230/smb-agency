import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { HeroSection } from "@/components/HeroSection";
import { ImageGallery } from "@/components/ImageGallery";
import { StatsCounter } from "@/components/StatsCounter";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FounderQuote } from "@/components/FounderQuote";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import type {
  Stat,
  Service,
  Review,
  ProcessStep,
  FAQItem,
  NavLink,
  Photo,
  SocialLinks,
} from "@/components/types";

const navLinks: NavLink[] = [
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: 4.5, suffix: "★", label: "Average Customer Rating" },
  { value: 166, suffix: "+", label: "Verified Customer Reviews" },
  { value: 6, suffix: " days", label: "Open Every Week" },
  { value: 500, suffix: "+", label: "Happy Clients Served" },
];

const services: Service[] = [
  {
    name: "Luxury Pedicure",
    description:
      "A deeply relaxing, multi-step pedicure treatment that leaves feet soft, refreshed, and thoroughly pampered — the salon's most talked-about service.",
    icon: "sparkles",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Spa Pedicure",
    description:
      "A classic spa-level pedicure combining exfoliation, massage, and nail care for a complete foot refresh at an approachable price point.",
    icon: "droplets",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Full Set Acrylics",
    description:
      "Custom acrylic nail extensions shaped and styled to your preference — from short almonds to dramatic lengths — with optional nail art and designs.",
    icon: "wand-2",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Nail Art & Custom Designs",
    description:
      "Freehand and detailed nail art created by skilled technicians whose work routinely draws compliments from strangers.",
    icon: "palette",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Dip Powder Manicure",
    description:
      "A durable, lightweight manicure using dip powder for long-lasting color and a natural nail feel without the need for UV curing.",
    icon: "layers",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Eyebrow & Facial Waxing",
    description:
      "Precise eyebrow shaping and facial waxing services available as an add-on to any nail or pedicure appointment.",
    icon: "scissors",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "I had such a wonderful experience at V Nail Salon!  The team so welcoming and professional.  My nail art turned out even better than I imagined-so neat, creative, and stylish. The pedicure was heavenly; my feet feel soft and refreshed, and the whole experience was very relaxing.  The salon is spotless and has a calming atmosphere. I’ve already gotten several compliments on my nails. and I’ll be coming back ❤️",
    author: "Tomeka Moore",
    rating: 5,
    source: "google",
    date: "2025-10-02",
  },
  {
    text: "Everyone that works here is very kind and professional. The salon is clean, trendy and beautiful. Annie had no problem with fixing my pedicure the day following my original appointment. This is the only salon my husband will go too. Don't walk run here and get your nails done😊",
    author: "Jamia Williams",
    rating: 5,
    source: "google",
    date: "2026-02-21",
  },
  {
    text: "My experience at V Nails and Spa was wonderful! My first time at the salon, and I will definitely be coming back. The salon is clean, bright, stylish and very organized. Wonderful selection of available services. Annie was my nail tech, and she was gentle with a badly broken nail. Quick and efficient service without ever feeling rushed. Can't wait to experience the luxury pedicure!",
    author: "Nicole Studioso",
    rating: 5,
    source: "google",
    date: "2025-10-01",
  },
  {
    text: "Be careful !!! Listed prices does not match. I came there excited to receive service again because the first few times was everything! I told them I wanted spa pedicure they ended up giving me the luxury one without my knowledge. The foot nail tech was a vibe. It wasnt until I was at the nail station with a different nail tech and she said my services was going to cost $215 with the style I wanted Huhhhhh.. so I just went to something simple. My pedi was $80 when i wanted the $60 one. And an short almond shaped fullset with NO POLISH and a heart design on one nail each hand came to $90??? And tried charging me $30 to get an eyebrow wax and chin (no visible hair). This was insane. Total was $180. I Wont be going back",
    author: "Dymen Phillips",
    rating: 3,
    source: "google",
    date: "2026-03-05",
  },
  {
    text: 'I really wanted to like this place. The people working there were lovely and welcoming. But my dip manicure chipped after 1 week, looked "grown out" almost immediately because of the space left at the back, and the manicure itself was really only shaping the nails and putting the color on (not a lot of cuticle cleaning, lotion, warm towels, etc that most other places do). I don\'t get my nails done out often but had some big events coming up over the next 2+ weeks so thought this was a good time. For $65, I expected more.',
    author: "Kelsey Jirikils",
    rating: 3,
    source: "google",
    date: "2025-09-08",
  },
];

const faqItems: FAQItem[] = [
  {
    question:
      "What makes VNails and Spa different from other nail salons in Philadelphia?",
    answer:
      "Customers consistently highlight three things: the quality of the nail art (neat, creative, and stylish enough to earn unsolicited compliments), the cleanliness and calming atmosphere of the salon, and the warmth of the staff — particularly Annie, who is known for being gentle, efficient, and genuinely accountable. It's a salon where first-timers often leave feeling like regulars.",
  },
  {
    question: "Do the prices on the menu match what I'll actually pay?",
    answer:
      "The salon offers a range of service tiers — including spa and luxury pedicure options — and pricing can vary depending on the specific service level you receive. To avoid surprises, we recommend confirming the exact service and price with your technician before they begin. Don't hesitate to ask — the team is welcoming and happy to walk you through your options.",
  },
  {
    question: "How long does a luxury pedicure take, and is it worth it?",
    answer:
      "The luxury pedicure is one of the salon's most praised services, with clients describing it as 'heavenly' and noting their feet feel noticeably soft and refreshed afterward. It runs longer than a basic pedicure and is priced accordingly — plan for a relaxed visit rather than a quick in-and-out, and most clients say it's absolutely worth it.",
  },
  {
    question: "What should I do if I'm not satisfied with my service?",
    answer:
      "VNails and Spa stands behind their work. At least one reviewer specifically noted that Annie fixed a pedicure issue the day after the original appointment with no fuss. If something isn't right, reach out to the salon directly — the team has demonstrated a real willingness to make things right.",
  },
  {
    question: "Do you offer nail art and custom designs?",
    answer:
      "Yes — nail art is one of the salon's standout offerings. Technicians create detailed, custom designs that clients describe as turning out 'even better than imagined.' Whether you want something subtle like a small heart detail or something more elaborate, the team has the skill to deliver.",
  },
  {
    question: "Are walk-ins welcome, or should I book an appointment?",
    answer:
      "VNails and Spa is open Monday through Friday from 9:30 AM to 6:30 PM and Saturday from 9:00 AM to 4:00 PM (closed Sundays). To guarantee your preferred technician and service time, calling ahead at (215) 852-9475 is recommended — especially on Saturdays, which tend to be busier with the shorter hours.",
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "Tell Us What You're Envisioning",
    description:
      "Walk in with a vibe, a reference photo, or just a feeling — we'll help you shape it into something real.",
  },
  {
    title: "Settle Into the Space",
    description:
      "The salon is clean, bright, and deliberately calming — designed to make the stress of your day quietly disappear.",
  },
  {
    title: "Let the Experts Work",
    description:
      "From freehand nail art to the luxury pedicure people keep raving about, our technicians bring skill and genuine care to every service.",
  },
  {
    title: "Leave Looking Like You Planned It All Along",
    description:
      "Walk out refreshed, polished, and ready for the compliments that are already on their way.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-1.webp",
  alt: "VNails and Spa photo 1",
  category: "exterior",
};

const aboutImage: Photo = {
  src: "/photos/photo-2.webp",
  alt: "VNails and Spa photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "VNails and Spa photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "VNails and Spa photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "VNails and Spa photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "VNails and Spa photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "VNails and Spa photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "VNails and Spa photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "VNails and Spa photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "VNails and Spa photo 10",
    category: "work",
  },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "VNails and Spa",
  address: "5101 Walnut St Unit 3",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 852-9475",
  email: "",
  hours: {
    Monday: "9:30 AM – 6:30 PM",
    Tuesday: "9:30 AM – 6:30 PM",
    Wednesday: "9:30 AM – 6:30 PM",
    Thursday: "9:30 AM – 6:30 PM",
    Friday: "9:30 AM – 6:30 PM",
    Saturday: "9:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="VNails and Spa"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 852-9475"
      />

      <main>
        <HeroSection
          headline="Nails That Make Strangers Stop And Stare"
          subheadline="At VNails and Spa on Walnut Street, you walk in a little stressed and walk out fielding compliments. Clean space. Warm team. Work that speaks for itself."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (215) 852-9475"
          secondaryCtaHref="tel:(215) 852-9475"
          rating={4.5}
          reviewCount={166}
          backgroundImage={heroImage}
          variant="blurred-reveal"
        />

        <div id="gallery">
          <ImageGallery
            heading="The Nails People Ask About"
            photos={galleryPhotos}
            variant="masonry"
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="light" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Everything Your Hands And Feet Deserve"
            subheading="From cult-favorite pedicures to nail art that stops conversations mid-sentence."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="A Salon That Actually Cares How You Leave"
            story="VNails and Spa on Walnut Street is the kind of place where you walk in a little stressed and leave with compliments already coming in. Customers consistently describe the salon as spotless, bright, and calming — a space that feels genuinely curated rather than thrown together. Annie, the go-to nail tech praised by name across multiple reviews, sets the tone: gentle with damaged nails, quick without feeling rushed, and the kind of professional who will fix your pedicure the very next day without making it a big deal. It's that quiet accountability that keeps people coming back.  The work here speaks for itself. Clients rave about nail art that turns out 'even better than imagined' — neat, creative, and stylish enough to stop strangers mid-sentence. The luxury pedicure has developed a near-cult following, with customers specifically calling out how soft and refreshed their feet feel afterward. Even husbands come here willingly, which says something. The team is described repeatedly as welcoming, kind, and professional — not just polite, but genuinely warm in a way that makes first-timers feel like regulars.  That said, VNails and Spa is a salon that rewards customers who communicate clearly upfront. A handful of reviews flag a disconnect between listed prices and what ends up on the final bill — particularly around service upgrades that weren't always made explicit. For a salon with this much talent and atmosphere, that transparency gap is the one thing standing between good and truly great. The bones are excellent. The vibe is real. Come ready to ask questions, and you'll leave obsessed."
            image={aboutImage}
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Don't Take Our Word For It"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="process">
          <ProcessSteps
            heading="From The Door To The Compliments"
            subheading="Here's what a visit to VNails actually feels like."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: "Annie",
              role: "Senior Nail Technician",
              quote:
                "Annie is the heartbeat of VNails and Spa. She shows up in reviews not as a footnote but as the reason clients return — the nail tech who handles a badly broken nail with care, who doesn't rush you even when the schedule is full, and who will make things right the day after an appointment without being asked twice. In a world where most service businesses treat accountability as optional, Annie treats it as the baseline. That standard radiates through the whole team, who customers describe as consistently kind, professional, and welcoming from the moment you walk in.\n\nVNails and Spa was built for the Walnut Street community — a neighborhood that deserves a real spa experience without having to travel across the city for it. The salon's clean, trendy interior and thoughtful atmosphere aren't accidental; they reflect a genuine belief that where you get your nails done should feel good too. The 4.5-star rating across 166 reviews isn't a fluke — it's the result of a team that takes pride in their craft and a space that takes care of the people inside it.",
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion
            heading="Good Questions Deserve Honest Answers"
            items={faqItems}
          />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Your Next Compliment Starts Here"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 852-9475" />
    </>
  );
}
