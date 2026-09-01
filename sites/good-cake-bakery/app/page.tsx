"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Instagram, MapPin, Phone } from "lucide-react";
import { ClickToCall } from "@/components/ClickToCall";
import { Footer } from "@/components/Footer";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { Navbar } from "@/components/Navbar";
import type { NavLink, Review } from "@/components/types";

const business = {
  name: "Good Cake Bakery",
  address: "12085 SW Hall Blvd #130",
  city: "Tigard",
  state: "OR",
  zip: "97223",
  phone: "(503) 810-9369",
  email: "",
  hours: {
    Monday: "11 AM – 3 PM",
    Tuesday: "9 AM – 8 PM",
    Wednesday: "9 AM – 8 PM",
    Thursday: "9 AM – 8 PM",
    Friday: "9 AM – 8 PM",
    Saturday: "10 AM – 5 PM",
    Sunday: "Closed",
  },
};

const navLinks: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "What’s baking", href: "#baking" },
  { label: "Visit", href: "#visit" },
];

const reviews: Review[] = [
  {
    text: "The lady behind the counter was very kind and helpful. We came home with a large German chocolate cupcake and a large Black Forest cupcake. Both were delicious!",
    author: "Camie Herkomer",
    rating: 5,
    source: "google",
  },
  {
    text: "The selection of cakes, pastries, cookies and other desserts was truly impressive. Ms. J. was friendly, welcoming and thoughtful during ordering and pickup.",
    author: "Raquel Muller",
    rating: 5,
    source: "google",
  },
  {
    text: "Great little bakery. Excellent service. Ordered a special birthday cake for one of my regular customers—he loved it.",
    author: "Beth",
    rating: 5,
    source: "google",
  },
];

const treats = [
  {
    title: "Custom occasions",
    text: "Birthday, wedding, and celebration cakes made for the moments you are marking.",
    src: "/photos/photo-3.webp",
    alt: "Decorated cake from Good Cake Bakery",
  },
  {
    title: "Pan dulce",
    text: "Traditional Mexican breads and pastries are part of the everyday case.",
    src: "/photos/photo-4.webp",
    alt: "Mexican bakery pastries from Good Cake Bakery",
  },
  {
    title: "One more treat",
    text: "Cakes, cookies, cheesecakes, and small surprises for a visit without a big occasion.",
    src: "/photos/photo-5.webp",
    alt: "Dessert from Good Cake Bakery",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Page() {
  return (
    <main>
      <Navbar businessName="Good Cake" links={navLinks} ctaText="Call to order" ctaHref="tel:+15038109369" variant="transparent" />

      <section className="cake-hero">
        <div className="cake-hero__dots" aria-hidden="true" />
        <div className="cake-hero__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="cake-hero__copy"
          >
            <p className="cake-kicker">Tigard, Oregon · Since 2018</p>
            <h1>Make today<br /><em>a good day.</em></h1>
            <p className="cake-hero__intro">Traditional Mexican baking, custom cakes, and a case full of reasons to stop in.</p>
            <div className="cake-hero__actions">
              <a className="cake-button" href="tel:+15038109369">Call to order <ArrowUpRight aria-hidden="true" size={17} /></a>
              <a className="cake-text-link" href="#baking">See what’s baking</a>
            </div>
            <div className="cake-rating" aria-label="Google rating 4.6 from 216 reviews">
              <span>★★★★★</span><b>4.6</b><small>Google · 216 reviews</small>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="cake-hero__photo"
          >
            <Image src="/photos/photo-1.webp" alt="Dessert display at Good Cake Bakery" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="cake-hero__label">Something sweet<br />for every table</div>
          </motion.div>
        </div>
      </section>

      <div className="cake-ticker">
        <MarqueeTicker items={["Custom cakes", "Pan dulce", "Tres leches", "Pastries", "Celebrations", "Tigard"]} separator="✦" speed={24} variant="outline" />
      </div>

      <section id="story" className="cake-story">
        <motion.div {...fadeUp} className="cake-story__heading">
          <p className="cake-kicker">The good stuff</p>
          <h2>Made with<br /><em>experience.</em></h2>
        </motion.div>
        <motion.div {...fadeUp} className="cake-story__body">
          <p>Good Cake Bakery grew from more than 30 years of combined baking experience. Co-owners Jay Burton and Edgar Contreras opened their Tigard bakery in 2018, bringing traditional Mexican breads and pastries alongside their own dessert creations.</p>
          <p className="cake-story__note">A family bakery with something in the case—and something worth ordering ahead—for every kind of gathering.</p>
        </motion.div>
      </section>

      <section id="baking" className="cake-treats">
        <motion.div {...fadeUp} className="cake-treats__intro">
          <p className="cake-kicker">Pick your favorite</p>
          <h2>Worth saving room for.</h2>
        </motion.div>
        <div className="cake-treats__grid">
          {treats.map((treat, index) => (
            <motion.article key={treat.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.1 }} className="cake-treat">
              <div className="cake-treat__image"><Image src={treat.src} alt={treat.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div>
              <p className="cake-treat__number">0{index + 1}</p>
              <h3>{treat.title}</h3>
              <p>{treat.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="cake-reviews">
        <div className="cake-reviews__inner">
          <motion.div {...fadeUp}>
            <p className="cake-kicker">From the counter</p>
            <h2>Save room<br />for kind words.</h2>
          </motion.div>
          <div className="cake-review-list">
            {reviews.map((review, index) => (
              <motion.figure key={review.author} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.1 }} className="cake-review">
                <div className="cake-review__stars">★★★★★</div>
                <blockquote>“{review.text}”</blockquote>
                <figcaption>{review.author} <span>· Google</span></figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="cake-visit">
        <motion.div {...fadeUp} className="cake-visit__image"><Image src="/photos/photo-2.webp" alt="Baked goods at Good Cake Bakery" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></motion.div>
        <motion.div {...fadeUp} className="cake-visit__content">
          <p className="cake-kicker">Come by</p>
          <h2>Your next<br /><em>good day.</em></h2>
          <div className="cake-visit__details">
            <a href="https://www.google.com/maps/search/?api=1&query=Good+Cake+Bakery%2C+12085+SW+Hall+Blvd+%23130%2C+Tigard%2C+OR+97223" target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" /><span>12085 SW Hall Blvd #130<br />Tigard, OR 97223</span></a>
            <a href="tel:+15038109369"><Phone aria-hidden="true" /><span>(503) 810-9369</span></a>
            <div><Clock3 aria-hidden="true" /><span>Mon 11–3 · Tue–Fri 9–8<br />Sat 10–5 · Sun closed</span></div>
          </div>
          <div className="cake-visit__actions">
            <a className="cake-button" href="tel:+15038109369">Call the bakery <Phone aria-hidden="true" size={16} /></a>
            <a className="cake-instagram" href="https://www.instagram.com/good.cake.bakery/" target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" size={18} /> @good.cake.bakery</a>
          </div>
        </motion.div>
      </section>

      <Footer business={business} links={navLinks} socialLinks={{ instagram: "https://www.instagram.com/good.cake.bakery/" }} />
      <ClickToCall phone="(503) 810-9369" />
    </main>
  );
}
