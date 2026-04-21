"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { BlurredReveal } from "@/components/BlurredReveal";
import { ZoomOutReveal } from "@/components/ZoomOutReveal";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import type { NavLink } from "@/components/types";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "The House", href: "#about" },
  { label: "Care", href: "#services" },
  { label: "Photos", href: "#gallery" },
  { label: "Words", href: "#reviews" },
  { label: "Visit", href: "#contact" },
];

const business = {
  name: "Claws and Paws Pet Resort",
  address: "862 NW Oak Ave",
  city: "Corvallis",
  state: "OR",
  zip: "97330",
  phone: "(541) 223-3608",
  phoneHref: "+15412233608",
  email: "",
  hours: {
    Monday: "6:30 AM – 7:00 PM",
    Tuesday: "6:30 AM – 7:00 PM",
    Wednesday: "6:30 AM – 7:00 PM",
    Thursday: "6:30 AM – 7:00 PM",
    Friday: "6:30 AM – 7:00 PM",
    Saturday: "8:00 AM – 5:00 PM",
    Sunday: "8:00 AM – 5:00 PM",
  },
};

const services = [
  {
    title: "Daycare",
    description:
      "Days at Nick's house. Backyard play, couch naps, group walks — not a concrete kennel.",
    image: "/photos/photo-6.webp",
  },
  {
    title: "Overnight Boarding",
    description:
      "Multi-night stays in a real home. Dogs sleep where people sleep. Updates come all weekend.",
    image: "/photos/photo-4.webp",
  },
  {
    title: "Trail Walks",
    description:
      "Boardwalks through wetlands, forest paths, the drive across town. Corvallis through a dog's eyes.",
    image: "/photos/photo-2.webp",
  },
  {
    title: "Backyard Socialization",
    description:
      "Fenced yard, other dogs, toys, shade, sun. Careful intros for the ones who need a minute.",
    image: "/photos/photo-9.webp",
  },
  {
    title: "Photo & Video Updates",
    description:
      "Texts from Nick throughout every stay. Video of your dog running. Proof that everyone is fine.",
    image: "/photos/photo-10.webp",
  },
  {
    title: "Cat-Friendly Intro",
    description:
      "Nick's resident kitten helps dogs who need it learn calm, confident cat manners.",
    image: "/photos/photo-3.webp",
  },
];

const galleryPhotos = [
  { src: "/photos/photo-8.webp", alt: "Forest trail walk with dogs near Corvallis", span: "tall" },
  { src: "/photos/photo-9.webp", alt: "Dogs playing in fenced backyard with toys", span: "wide" },
  { src: "/photos/photo-2.webp", alt: "Nick walking four dogs on a wetland boardwalk", span: "normal" },
  { src: "/photos/photo-10.webp", alt: "Four dogs looking up at the camera", span: "normal" },
  { src: "/photos/photo-6.webp", alt: "Backyard play session with multiple dogs", span: "wide" },
  { src: "/photos/photo-5.webp", alt: "Dogs reaching up for treats outdoors", span: "normal" },
  { src: "/photos/photo-1.webp", alt: "Pop-art style portrait of a happy dog", span: "tall" },
  { src: "/photos/photo-3.webp", alt: "Black and white dog with a tennis ball", span: "normal" },
];

const reviews = [
  {
    pull: "comes home worn out and happy. Making our evenings together peaceful.",
    rest:
      "Nick loves every dog who comes through his doors. His doggie daycare is run out of his home which helps the dogs themselves feel more comfortable. He takes them on walks and drives and lots of play time in the backyard too.",
    author: "Tracy S.",
    detail: "Mollie's mom — Corvallis",
  },
  {
    pull: "happy, healthy and ready to go home to bed.",
    rest:
      "I just started taking my young heeler-mix brothers to Nick and they've settled right in. I picked them up after boarding them two nights. He's even introducing them to his kitten. Claws and Paws is my new go-to.",
    author: "Jennifer Scotti",
    detail: "Two heeler-mix brothers",
  },
  {
    pull: "he clearly loves dogs and treats them so well.",
    rest:
      "My 40lb retriever mix loves staying here anytime I'm out of town. Nick is super friendly and responsive and flexible with my schedule. Backyard is securely fenced and a good size. He sends videos and pictures.",
    author: "Emily Werner",
    detail: "Retriever mix's person",
  },
  {
    pull: "sent a video of her running and playing with the other dogs.",
    rest:
      "Luna our dwarf German shepherd stayed here for the weekend while we visited friends on vacation and she had a great time. Thank you Nick for taking such good care of our baby.",
    author: "Sarah Scar",
    detail: "Luna's family, visiting from out of town",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerParent = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: "-60px" },
};

const staggerChild = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ClawsAndPawsPage() {
  return (
    <>
      <Navbar
        businessName="Claws & Paws"
        links={navLinks}
        ctaText="Book a Stay"
        ctaHref="#contact"
        variant="transparent"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <BlurredReveal
        src="/photos/photo-8.webp"
        alt="Forest trail through Corvallis woods with dogs walking"
        height="140vh"
      >
        <div className="text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase text-white/70 mb-8"
          >
            Corvallis, Oregon &nbsp;·&nbsp; Est. in Nick&apos;s home
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="display-xl text-white text-[18vw] md:text-[13vw] lg:text-[11rem]"
          >
            Claws <em className="italic-serif text-[var(--brand-accent)]">&amp;</em> Paws
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-8 text-white/85 text-xl md:text-2xl max-w-2xl mx-auto font-[family-name:var(--font-display)] italic leading-snug"
          >
            A home, not a kennel. Your dog comes home worn out &amp; happy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <a href="#contact" className="btn-primary">
              <span>Book a stay</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${business.phoneHref}`}
              className="btn-ghost text-white"
            >
              <Phone className="w-4 h-4" />
              <span>{business.phone}</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-6 md:left-10 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-white/60 hidden sm:block"
        >
          <span className="block opacity-60">N 44°34&apos;</span>
          <span className="block opacity-60">W 123°16&apos;</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 right-6 md:right-10 text-right font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.24em] text-white/70 hidden sm:block"
        >
          <span className="block text-[var(--brand-accent)] text-base tracking-normal">★★★★★</span>
          <span className="block mt-1">5.0 · 18 reviews</span>
        </motion.div>
      </BlurredReveal>

      {/* ── MARQUEE TICKER ──────────────────────────────────────────────── */}
      <section className="dark-section border-y border-white/10 overflow-hidden">
        <MarqueeTicker
          items={[
            "In-home dog daycare",
            "Overnight boarding",
            "Trail walks",
            "Backyard play",
            "Photo & video updates",
            "Flexible scheduling",
            "Family-run by Nick",
          ]}
          separator="✺"
          speed={45}
          variant="outline"
          className="py-8 text-[var(--brand-dark-text)]"
        />
      </section>

      {/* ── STORY / MEET NICK ───────────────────────────────────────────── */}
      <section id="about" className="py-28 lg:py-44 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div {...fadeUp} className="md:col-span-7 md:pt-12">
              <p className="eyebrow">(01) The House</p>
              <div className="editorial-rule mt-5" />
              <h2 className="display-lg text-4xl md:text-5xl lg:text-6xl mt-2">
                Nick opened his home <br />
                to other people&apos;s dogs.
              </h2>
              <div className="mt-10 space-y-6 text-[var(--brand-muted)] text-[17px] leading-[1.75] max-w-xl">
                <p>
                  Claws and Paws isn&apos;t a commercial facility — it&apos;s Nick&apos;s
                  house on NW Oak Ave. Dogs lounge on the couch, romp in a
                  securely fenced backyard, and head out for walks along
                  wetland boardwalks and forest trails.
                </p>
                <p>
                  Every review mentions Nick by name. Every review says the
                  same thing: he clearly loves dogs. That&apos;s the whole business
                  plan.
                </p>
              </div>

              <blockquote className="mt-14 pl-6 border-l-2 border-[var(--brand-accent)]">
                <p className="italic-serif text-2xl md:text-3xl leading-[1.25] text-[var(--brand-text)]">
                  &ldquo;When Mollie comes home she is worn out and happy.
                  Making our evenings together peaceful.&rdquo;
                </p>
                <footer className="mt-5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--brand-muted)]">
                  — Tracy S., Google review
                </footer>
              </blockquote>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:col-span-5"
            >
              <ZoomOutReveal startScale={1.12} endScale={1}>
                <div className="picture-frame aspect-[4/5]">
                  <img
                    src="/photos/photo-4.webp"
                    alt="Nick at home on the couch with a husky"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </ZoomOutReveal>
              <div className="mt-5 flex items-start justify-between font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--brand-muted)]">
                <span>Nick &nbsp;/&nbsp; Owner</span>
                <span>Fig. 01</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-20 md:mb-28 max-w-3xl">
            <p className="eyebrow">(02) What a stay looks like</p>
            <div className="editorial-rule mt-5" />
            <h2 className="display-lg text-4xl md:text-5xl lg:text-6xl mt-2">
              Six things <em className="italic-serif text-[var(--brand-primary)]">every</em> stay includes.
            </h2>
          </motion.div>

          <motion.div {...staggerParent}>
            {services.map((svc, i) => (
              <motion.a
                key={svc.title}
                {...staggerChild}
                href="#contact"
                className="service-row grid md:grid-cols-12 gap-6 items-center group"
              >
                <div className="md:col-span-1 index-number pt-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4">
                  <h3 className="service-title text-[var(--brand-text)]">
                    {svc.title}
                  </h3>
                </div>
                <div className="md:col-span-5 text-[var(--brand-muted)] text-[15px] leading-[1.7] max-w-md">
                  {svc.description}
                </div>
                <div className="md:col-span-2 hidden md:block">
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--brand-bg)]">
                    <img
                      src={svc.image}
                      alt=""
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-28 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="mb-16 md:mb-24 flex items-end justify-between flex-wrap gap-6"
          >
            <div className="max-w-xl">
              <p className="eyebrow">(03) A week in photos</p>
              <div className="editorial-rule mt-5" />
              <h2 className="display-lg text-4xl md:text-5xl lg:text-6xl mt-2">
                Your dog&apos;s weekend, documented.
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] max-w-sm text-[15px] leading-[1.7]">
              Photos Nick actually sent to families. The trails, the backyard,
              the goofy looking-up-at-the-camera moments.
            </p>
          </motion.div>

          <motion.div
            {...staggerParent}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
          >
            {galleryPhotos.map((photo, i) => {
              const cls =
                photo.span === "tall"
                  ? "row-span-2 aspect-[3/5]"
                  : photo.span === "wide"
                  ? "col-span-2 aspect-[16/10]"
                  : "aspect-square";
              return (
                <motion.div
                  key={i}
                  {...staggerChild}
                  className={`gallery-card ${cls}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────────── */}
      <section
        id="reviews"
        className="dark-section py-28 lg:py-44 px-6 relative overflow-hidden"
      >
        <div className="absolute -top-16 left-0 right-0 pointer-events-none opacity-[0.08] overflow-hidden">
          <div className="display-xl text-[20vw] whitespace-nowrap text-[var(--brand-accent)] leading-none">
            · loved · loved · loved ·
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fadeUp} className="mb-20 md:mb-28 max-w-2xl">
            <p className="eyebrow">(04) Words from families</p>
            <div className="editorial-rule mt-5" />
            <h2 className="display-lg text-4xl md:text-5xl lg:text-6xl mt-2">
              Every reviewer <em className="italic-serif text-[var(--brand-accent)]">mentions Nick</em> by name.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-24">
            {reviews.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={i % 2 === 1 ? "md:mt-20" : ""}
              >
                <p className="italic-serif text-2xl md:text-[28px] leading-[1.3] text-[var(--brand-dark-text)]">
                  <span className="text-[var(--brand-accent)] text-3xl leading-none mr-1">&ldquo;</span>
                  {r.pull}
                </p>
                <p className="mt-6 text-[var(--brand-dark-muted)] text-[15px] leading-[1.75]">
                  {r.rest}
                </p>
                <footer className="mt-6 flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase">
                  <span className="text-[var(--brand-accent)] tracking-normal text-sm">
                    ★★★★★
                  </span>
                  <span className="text-[var(--brand-dark-text)]">{r.author}</span>
                  <span className="text-[var(--brand-dark-muted)]">/ {r.detail}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 lg:py-44 px-6 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl">
            <p className="eyebrow">(05) Come over</p>
            <div className="editorial-rule mt-5" />
            <h2 className="display-lg text-4xl md:text-6xl lg:text-7xl mt-2">
              Bring your dog <br />
              to <em className="italic-serif text-[var(--brand-primary)]">NW Oak Ave.</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div {...fadeUp} className="md:col-span-5 space-y-12">
              <div>
                <p className="eyebrow mb-5">Address</p>
                <a
                  href="https://maps.google.com/?q=862+NW+Oak+Ave+Corvallis+OR+97330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <p className="display-lg text-2xl md:text-3xl text-[var(--brand-text)] flex items-start gap-3 group-hover:text-[var(--brand-primary)] transition-colors">
                    862 NW Oak Ave
                    <ArrowUpRight className="w-5 h-5 mt-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-[var(--brand-muted)]">
                    Corvallis, OR 97330
                  </p>
                </a>
              </div>

              <div>
                <p className="eyebrow mb-5">Phone</p>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="display-lg text-2xl md:text-3xl text-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-colors inline-flex items-center gap-3"
                >
                  <Phone className="w-5 h-5 opacity-50" />
                  {business.phone}
                </a>
                <p className="mt-2 text-[var(--brand-muted)] text-sm">
                  Text preferred — Nick replies fast, even on weekends.
                </p>
              </div>

              <div>
                <p className="eyebrow mb-5">Hours</p>
                <dl className="space-y-2 font-[family-name:var(--font-mono)] text-sm">
                  {Object.entries(business.hours).map(([day, time]) => (
                    <div
                      key={day}
                      className="flex justify-between items-baseline border-b border-[var(--brand-text)]/10 pb-2"
                    >
                      <dt className="uppercase tracking-[0.18em] text-xs text-[var(--brand-muted)]">
                        {day}
                      </dt>
                      <dd className="text-[var(--brand-text)]">{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <a href={`tel:${business.phoneHref}`} className="btn-primary mt-6">
                <span>Text Nick to book</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:col-span-7"
            >
              <a
                href="https://maps.google.com/?q=862+NW+Oak+Ave+Corvallis+OR+97330"
                target="_blank"
                rel="noopener noreferrer"
                className="block picture-frame aspect-[4/3] group relative"
              >
                <iframe
                  title="Map to Claws and Paws"
                  src="https://www.google.com/maps?q=862+NW+Oak+Ave+Corvallis+OR+97330&output=embed"
                  className="w-full h-full grayscale-[0.3] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-10">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--brand-text)] bg-[var(--brand-bg)]/90 backdrop-blur px-3 py-2">
                    N 44.5709° &nbsp;·&nbsp; W 123.2731°
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--brand-bg)] bg-[var(--brand-primary)] px-3 py-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Open in Maps
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer business={business} links={navLinks} />

      <ClickToCall phone={business.phone} />
    </>
  );
}
