"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ZoomOutReveal } from "@/components/ZoomOutReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { NavLink, Review } from "@/components/types";
import { motion } from "framer-motion";
import { Star, Phone, MapPin } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Cakes", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const reviews: Review[] = [
  {
    text: "When my Son unveiled this cake jaws dropped. Everyone was saying how beautiful it was and asking where we got it from. All the phones came out for cake pics. The cake was worth every single penny.",
    author: "Stephanie Thurman",
    rating: 5,
    source: "google",
  },
  {
    text: "Very nice staff and my purchase was made quickly. I will definitely be returning and we thank you so much for the cake! It was magnificent!",
    author: "Ivan",
    rating: 5,
    source: "google",
  },
  {
    text: "The cake was so good 10/10 I will totally order from them again.",
    author: "Charlie Cochran",
    rating: 5,
    source: "google",
  },
];

const services = [
  "Custom Cakes",
  "Birthday Cakes",
  "Italian Pastries",
  "Layered Cakes",
  "Strawberry Shortcake",
  "Walk-In Orders",
];

const galleryPhotos = [
  { src: "/photos/photo-3.webp", alt: "Custom celebration cake from Oteri's" },
  { src: "/photos/photo-4.webp", alt: "Decorated specialty cake on display" },
  { src: "/photos/photo-5.webp", alt: "Tiered birthday cake with icing detail" },
  { src: "/photos/photo-6.webp", alt: "Italian pastry assortment in bakery case" },
  { src: "/photos/photo-7.webp", alt: "Custom cake design, Woodland Ave" },
  { src: "/photos/photo-8.webp", alt: "Fresh-from-the-oven bakery creation" },
];

const businessContact = {
  name: "Oteri's Italian Bakery",
  address: "6323 Woodland Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19142",
  phone: "(215) 724-0793",
  email: "",
  hours: {
    Monday: "7 AM – 6 PM",
    Tuesday: "7 AM – 6 PM",
    Wednesday: "7 AM – 6 PM",
    Thursday: "7 AM – 6 PM",
    Friday: "7 AM – 6 PM",
    Saturday: "7 AM – 6 PM",
    Sunday: "8 AM – 3 PM",
  },
};

const faq = [
  {
    question: "Can I order a custom cake for a special event?",
    answer:
      "Yes — custom specialty cakes are one of Oteri's signature offerings. Call ahead and discuss your vision so the team can deliver exactly what you're imagining.",
  },
  {
    question: "How far in advance should I order?",
    answer:
      "For custom or specialty cakes, the earlier the better. Calling a week or more before your event gives the bakery the best chance to meet your expectations.",
  },
  {
    question: "What are your hours?",
    answer:
      "Monday through Saturday from 7 AM to 6 PM, and Sunday from 8 AM to 3 PM. Early mornings are great for fresh pastries.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
};

const staggerChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Visual portfolio — cinematic hero → marquee → about → stats → gallery → reviews → services → FAQ → visit
// ADVANCED COMPONENTS: ParallaxImage (hero), ZoomOutReveal (about photo), AnimatedCounter (stats), MarqueeTicker (services)

export default function OterisPage() {
  return (
    <>
      <Navbar
        businessName="Oteri's"
        links={navLinks}
        ctaText="Call to Order"
        ctaHref="tel:+12157240793"
        variant="transparent"
      />

      {/* ── HERO: Full-bleed parallax with cinematic typography ── */}
      <section className="relative h-screen overflow-hidden bg-neutral-900">
        <ParallaxImage
          src="/photos/photo-1.webp"
          alt="Oteri's Italian Bakery storefront on Woodland Avenue"
          speed={0.15}
          overlay
          overlayOpacity={0.55}
          containerClassName="h-full"
        >
          <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-[var(--brand-accent)] mb-8 font-mono"
            >
              Woodland Ave &middot; Philadelphia
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.88]"
            >
              Oteri&rsquo;s
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white/70 mt-6 italic font-light"
            >
              Italian Bakery
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-12 flex gap-4 justify-center flex-wrap"
            >
              <a
                href="tel:+12157240793"
                className="px-8 py-3 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                Call to Order
              </a>
              <a
                href="#gallery"
                className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                See Our Cakes
              </a>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── MARQUEE: Services ticker ── */}
      <div className="bg-[var(--brand-primary)] text-white py-1">
        <MarqueeTicker
          items={services}
          separator="+"
          speed={25}
          variant="default"
        />
      </div>

      {/* ── ABOUT: Editorial two-column ── */}
      <section id="about" className="py-28 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4 font-mono">
              Since the beginning
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
              The 21st-birthday cake.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-md">
              6323 Woodland Ave, Southwest Philly. Italian baking, old-school —
              the place you call when the cake has to be the moment, not just
              the dessert. When Stephanie&rsquo;s daughter unveiled hers, phones
              came out and jaws dropped. That&rsquo;s the goal, every time.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <ZoomOutReveal startScale={1.15} endScale={1}>
              <div className="gallery-card aspect-[3/4]">
                <img
                  src="/photos/photo-2.webp"
                  alt="Inside Oteri's Italian Bakery"
                  className="w-full h-full object-cover image-warm"
                  loading="lazy"
                />
              </div>
            </ZoomOutReveal>
          </motion.div>
        </div>
      </section>

      {/* ── STATS: Dark section with animated counters ── */}
      <section className="section-dark py-24 lg:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <AnimatedCounter
                target={359}
                suffix="+"
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-light text-[var(--brand-accent)]"
              />
              <p className="text-sm mt-3 text-muted-override tracking-wider uppercase font-mono">
                Reviews
              </p>
            </div>
            <div>
              <AnimatedCounter
                target={4}
                suffix=".1★"
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-light text-[var(--brand-accent)]"
              />
              <p className="text-sm mt-3 text-muted-override tracking-wider uppercase font-mono">
                Rating
              </p>
            </div>
            <div>
              <AnimatedCounter
                target={7}
                suffix=" AM"
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-light text-[var(--brand-accent)]"
              />
              <p className="text-sm mt-3 text-muted-override tracking-wider uppercase font-mono">
                Doors Open
              </p>
            </div>
            <div>
              <AnimatedCounter
                target={6}
                suffix=" Days"
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-light text-[var(--brand-accent)]"
              />
              <p className="text-sm mt-3 text-muted-override tracking-wider uppercase font-mono">
                A Week
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY: Asymmetric photo grid with zoom reveals ── */}
      <section id="gallery" className="py-28 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4 font-mono">
              Portfolio
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light">
              The Work
            </h2>
          </motion.div>
          <motion.div
            {...stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                {...staggerChild}
                className={`gallery-card ${i === 0 || i === 5 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover image-warm"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS: Large editorial quotes on dark background ── */}
      <section id="reviews" className="section-dark py-28 lg:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-override mb-4 font-mono">
              What customers say
            </p>
            <div className="editorial-rule mx-auto" />
          </motion.div>
          <div className="space-y-24">
            {reviews.map((review, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                    />
                  ))}
                </div>
                <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-8">
                  <span className="text-sm text-muted-override uppercase tracking-[0.2em] font-mono">
                    {review.author}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES: Clean grid ── */}
      <section className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4 font-mono">
              What we bake
            </p>
            <div className="editorial-rule mx-auto" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light mt-4">
              From Our Ovens
            </h2>
          </motion.div>
          <motion.div
            {...stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Custom Specialty Cakes",
                desc: "Fully custom-designed celebration cakes built around your event, style, and vision.",
              },
              {
                name: "Birthday Cakes",
                desc: "Personalized birthday cakes for milestone moments, crafted to be the centerpiece.",
              },
              {
                name: "Italian Pastries",
                desc: "Daily-baked pastries and traditional Italian baked goods, fresh from opening.",
              },
              {
                name: "Layered & Tiered Cakes",
                desc: "Multi-layer builds with custom flavor combinations and decorative icing work.",
              },
              {
                name: "Strawberry Shortcake",
                desc: "Signature dessert available for same-day pickup when in stock.",
              },
              {
                name: "Phone & Walk-In Orders",
                desc: "Orders by phone or in person with name reservations held for pickup.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                {...staggerChild}
                className="p-8 bg-[var(--brand-bg)] border border-[var(--brand-text)]/5 hover:border-[var(--brand-primary)]/20 transition-colors"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium mb-3">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4 font-mono">
              Common questions
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light">
              Good to Know
            </h2>
          </motion.div>
          <div className="space-y-8">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-b border-[var(--brand-text)]/10 pb-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-medium mb-3">
                  {item.question}
                </h3>
                <p className="text-[var(--brand-muted)] leading-relaxed text-sm">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT: Contact + Hours ── */}
      <section
        id="visit"
        className="section-dark py-28 lg:py-40 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="editorial-rule mx-auto" />
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-light italic mt-6 mb-12">
              Come visit.
            </h2>

            <div className="space-y-3 mb-12">
              <p className="font-mono text-sm text-muted-override flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                {businessContact.address}
              </p>
              <p className="font-mono text-sm text-muted-override">
                {businessContact.city}, {businessContact.state}{" "}
                {businessContact.zip}
              </p>
              <p className="font-mono text-sm text-muted-override">
                <a
                  href="tel:+12157240793"
                  className="hover:text-[var(--brand-accent)] transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {businessContact.phone}
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              {Object.entries(businessContact.hours)
                .slice(0, 4)
                .map(([day, time]) => (
                  <div key={day}>
                    <p className="text-xs text-muted-override uppercase tracking-wider font-mono">
                      {day.slice(0, 3)}
                    </p>
                    <p className="text-sm mt-1 font-mono">{time}</p>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
              {Object.entries(businessContact.hours)
                .slice(4)
                .map(([day, time]) => (
                  <div key={day}>
                    <p className="text-xs text-muted-override uppercase tracking-wider font-mono">
                      {day.slice(0, 3)}
                    </p>
                    <p className="text-sm mt-1 font-mono">{time}</p>
                  </div>
                ))}
            </div>

            <a
              href="tel:+12157240793"
              className="inline-block mt-14 px-10 py-4 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Call to Order
            </a>
          </motion.div>
        </div>
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(215) 724-0793" />
    </>
  );
}
