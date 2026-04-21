import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { ServiceCards } from "@/components/ServiceCards";
import { StatsCounter } from "@/components/StatsCounter";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ImageGallery } from "@/components/ImageGallery";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import type {
  Service,
  Stat,
  ProcessStep,
  Review,
  FAQItem,
  NavLink,
  Photo,
  SocialLinks,
} from "@/components/types";

const PHONE = "(541) 500-1037";
const TEL = "tel:+15415001037";

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Story", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit", href: "#contact" },
];

const stats: Stat[] = [
  { value: 4.8, suffix: "★", label: "Google rating" },
  { value: 39, suffix: "+", label: "Five-star reviews" },
  { value: 6, suffix: "", label: "Days a week open" },
  { value: 100, suffix: "+", label: "Fresh pups groomed" },
];

const services: Service[] = [
  {
    name: "Full Groom & Breed Cut",
    description:
      "Bath, blow-dry, and a breed-appropriate or custom cut tailored to your dog — mohawks welcome.",
    icon: "scissors",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Puppy's First Groom",
    description:
      "A gentle, stress-free intro for young pups so grooming starts as something they actually enjoy.",
    icon: "heart",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Bath & Brush Out",
    description:
      "Shampoo, conditioner, full blow-dry and brush-out. Coats leave clean, soft, and tangle-free.",
    icon: "droplets",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Ear Cleaning",
    description:
      "Careful cleaning and inspection to keep ears healthy and catch irritation early.",
    icon: "search",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Nail Trim & Paw Care",
    description:
      "Clipping, filing, and pad check so your dog stays comfortable on their feet between visits.",
    icon: "footprints",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Bandanna Send-Off",
    description:
      "Every groom ends with a complimentary colorful bandanna and a personality-first finishing touch.",
    icon: "sparkles",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "This really is a great spot, and I don't take Teddy anywhere else. You can tell they all love dogs and I feel like Teddy is in great hands! They gave him a mohawk and he looks so cute in the complementary bandanna.",
    author: "Madeleine Herzog",
    rating: 5,
    source: "google",
    date: "2026-02-09",
  },
  {
    text: "I have followed Sarah Donato wherever her clippers landed. I was so happy for her when she was able to purchase her own doggy spa. She is an amazing groomer, a hard worker, and a great gal.",
    author: "Linda Willett",
    rating: 5,
    source: "google",
    date: "2025-11-10",
  },
  {
    text: "Wonderful place. Very time efficient and quality service. Friendly staff & my puppy looked so adorable when I picked him up. Definitely recommend.",
    author: "McKenna Sullivan",
    rating: 5,
    source: "google",
    date: "2025-11-20",
  },
  {
    text: "Sabrina has been taking care of my dogs for many years. Since her shop fire I've followed her to two other locations. She has been so wonderful with my dogs — we'd follow her anywhere.",
    author: "Lynette",
    rating: 5,
    source: "google",
    date: "2022-07-03",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you do custom cuts and mohawks?",
    answer:
      "Yes — our groomers love getting creative. Tell us what you have in mind at drop-off and we'll make it happen.",
  },
  {
    question: "What's included in a full groom?",
    answer:
      "Bath, blow-dry, breed or custom cut, ear cleaning, nail trim, and a complimentary colorful bandanna on the way out.",
  },
  {
    question: "Is this a good fit for a nervous or first-time dog?",
    answer:
      "Yes. We take extra time with anxious or first-time visitors, and clients regularly tell us their dogs feel at ease here.",
  },
  {
    question: "How do I book?",
    answer: `Call us at ${PHONE}. We're open Monday through Saturday, 9 AM to 4 PM, so there's usually flexibility during the week.`,
  },
  {
    question: "Who will be grooming my dog?",
    answer:
      "Sarah Donato, the owner, or Sabrina — both longtime groomers with loyal clienteles built up over years in Medford.",
  },
  {
    question: "Can you work with senior or special-needs dogs?",
    answer:
      "Absolutely. We adjust our pace and handling so every dog — including seniors and those with health considerations — stays comfortable.",
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "Drop off & say hi",
    description:
      "We greet your dog like we already know them. A quick check-in covers cut preferences, coat condition, and any quirks.",
  },
  {
    title: "Bath & blow-dry",
    description:
      "Shampoo, condition, and a full blow-dry tailored to your dog's coat and comfort level.",
  },
  {
    title: "The cut that fits them",
    description:
      "Breed-standard trim or something custom — mohawks included — shaped around your dog's personality.",
  },
  {
    title: "Bandanna & pickup",
    description:
      "Every dog leaves finished, polished, and wrapped in a complimentary colorful bandanna.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-3.webp",
  alt: "Dark dog wearing pink collar resting on colorful blankets at Pickles Paw Spa",
  category: "product",
};

const aboutImage: Photo = {
  src: "/photos/photo-7.webp",
  alt: "Black dog wearing colorful bandana after a groom at Pickles Paw Spa",
  category: "product",
};

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-1.webp", alt: "Corgi sitting on tile floor looking up with tongue out", category: "interior" },
  { src: "/photos/photo-2.webp", alt: "Senior black dog in car back seat wearing a colorful bandana", category: "interior" },
  { src: "/photos/photo-3.webp", alt: "Dark dog with pink collar lying on colorful blankets indoors", category: "product" },
  { src: "/photos/photo-4.webp", alt: "Black dog with pink collar looking up at camera outdoors", category: "exterior" },
  { src: "/photos/photo-5.webp", alt: "Close-up of dog's ear being carefully examined", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Brown long-haired dog with tongue out held in hands", category: "product" },
  { src: "/photos/photo-7.webp", alt: "Black dog in a colorful bandana after a groom", category: "product" },
  { src: "/photos/photo-8.webp", alt: "Black service dog in pink training vest indoors", category: "work" },
  { src: "/photos/photo-9.webp", alt: "Black dog in red collar sitting in a car interior", category: "interior" },
  { src: "/photos/photo-10.webp", alt: "Black and white dog playing with a toy on green carpet", category: "interior" },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "Pickles Paw Spa",
  address: "828 S Central Ave suite #7",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: PHONE,
  email: "",
  hours: {
    Monday: "9:00 AM – 4:00 PM",
    Tuesday: "9:00 AM – 4:00 PM",
    Wednesday: "9:00 AM – 4:00 PM",
    Thursday: "9:00 AM – 4:00 PM",
    Friday: "9:00 AM – 4:00 PM",
    Saturday: "9:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

function CustomHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--brand-bg)]">
      {/* Soft decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] soft-blob pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] soft-blob pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
        {/* Copy side */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[var(--brand-primary-soft)]/30 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
            <span className="text-xs font-medium tracking-wider uppercase text-[var(--brand-text)]">
              Medford, Oregon · Dog Grooming
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-[var(--brand-text)]">
            Fresh pups,
            <br />
            <em className="not-italic text-[var(--brand-primary)]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 500' }}>
              every time.
            </em>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-[var(--brand-muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            A neighborhood dog spa run by groomers whose clients follow them wherever they go. Bath, cut, bandanna — sent home happy.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href={TEL}
              className="inline-flex items-center px-7 py-4 rounded-full text-base font-semibold bg-[var(--brand-primary)] text-white shadow-lg shadow-[var(--brand-primary)]/25 hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Call {PHONE}
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-7 py-4 rounded-full text-base font-semibold border-2 border-[var(--brand-primary)]/25 text-[var(--brand-text)] hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-colors"
            >
              See services
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start text-sm text-[var(--brand-muted)]">
            <div className="flex gap-0.5 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="font-semibold text-[var(--brand-text)]">4.8</span>
            <span>· 39 Google reviews</span>
          </div>
        </div>

        {/* Image side */}
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-[var(--brand-primary)]/10">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
            priority
          />
          {/* Floating logo badge */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white shadow-xl ring-4 ring-[var(--brand-bg)] overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="Pickles Paw Spa logo"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Pickles Paw Spa"
        links={navLinks}
        ctaText="Call Now"
        ctaHref={TEL}
      />

      <main>
        <CustomHero />

        {/* Playful ticker */}
        <div className="bg-[var(--brand-primary)] text-white py-4">
          <MarqueeTicker
            items={[
              "Mohawks welcome",
              "Bandanna send-off",
              "Bath + blow-dry",
              "Puppy first grooms",
              "Breed cuts",
              "Nail trims",
              "Fresh every time",
            ]}
            variant="bold"
            separator="·"
            speed={40}
          />
        </div>

        <div id="services" className="pt-8">
          <ServiceCards
            heading="What we do"
            subheading="Six ways your dog leaves looking and feeling better than they arrived."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about" className="bg-[var(--brand-bg-alt)]">
          <AboutSection
            heading="Built by groomers people follow"
            story="Pickles Paw Spa is Sarah Donato's shop in Medford, Oregon — the one her longtime clients followed her to open. Sabrina grooms alongside her, with her own following built over years of quiet, steady care. Every pup leaves with a fresh cut and a complimentary bandanna."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="gallery" className="bg-[var(--brand-bg)]">
          <ImageGallery
            heading="Fresh pups"
            photos={galleryPhotos}
            variant="grid"
            columns={3}
          />
        </div>

        <div id="process" className="bg-[var(--brand-bg-alt)]">
          <ProcessSteps
            heading="Your visit"
            subheading="From drop-off to bandanna — here's the rhythm."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Paw parents"
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion heading="Questions" items={faqItems} />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Come say hi"
            showMap={true}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone={PHONE} />
    </>
  );
}
