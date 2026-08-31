"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  Phone,
  Scissors,
  Star,
} from "lucide-react";
import { ClickToCall } from "@/components/ClickToCall";
import { GoogleMapsEmbed } from "@/integrations/GoogleMapsEmbed";
import receptionPhoto from "../public/photos/reception.webp";
import shopInActionPhoto from "../public/photos/shop-in-action.webp";
import shopInteriorPhoto from "../public/photos/shop-interior.webp";
import walkInSignPhoto from "../public/photos/walk-in-sign.webp";

const mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Hello+Handsome+Barber+Shop+1424+SE+282nd+Ave+Gresham+OR+97080";
const listingUrl = "https://maps.google.com/maps?cid=8780819151673087079";
const instagramUrl = "https://www.instagram.com/robynrpowell";

const services = [
  {
    number: "01",
    title: "Kids' cuts",
    body: "Patient haircuts with car-shaped chairs that help little clients settle in and enjoy the experience.",
    note: "Car-chair seating",
  },
  {
    number: "02",
    title: "Adult cuts",
    body: "Classic barber cuts, hair styling, and detail work for adults in a comfortable neighborhood shop.",
    note: "Walk-ins welcome",
  },
  {
    number: "03",
    title: "Clean finish",
    body: "Hot neck shaves and razor neckline services are listed, with hair products available in the shop.",
    note: "Call for pricing",
  },
];

const reviews = [
  {
    text: "Very nice customer service and outstanding work.",
    author: "Justin Alzaidi",
  },
  {
    text: "Good communication, quick cut and friendly as well.",
    author: "Mike M",
  },
  {
    text: "The atmosphere and staff are awesome.",
    author: "Nichole Wesolowski",
  },
];

const hours = [
  ["Monday", "9 AM–6 PM"],
  ["Tuesday", "9 AM–6 PM"],
  ["Wednesday", "9 AM–6 PM"],
  ["Thursday", "9 AM–6 PM"],
  ["Friday", "9 AM–6 PM"],
  ["Saturday", "9 AM–2 PM"],
  ["Sunday", "Closed"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionIntro({
  eyebrow,
  title,
  body,
  inverse = false,
  onOrange = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  inverse?: boolean;
  onOrange?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.55 }}
      className="max-w-2xl"
    >
      <p
        className={`font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[0.18em] ${
          inverse
            ? "text-white/65"
            : onOrange
              ? "text-black/65"
              : "text-[var(--brand-accent-ink)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.9] tracking-[-0.055em]">
        {title}
      </h2>
      {body && (
        <p
          className={`mt-6 max-w-xl text-base leading-7 md:text-lg ${
            inverse
              ? "text-white/68"
              : onOrange
                ? "text-black/70"
                : "text-[var(--brand-muted)]"
          }`}
        >
          {body}
        </p>
      )}
    </motion.div>
  );
}

function CarChairStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    [0.82, 1, 1, 0.9],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    ["2.5rem", "0.4rem", "0.4rem", "2.5rem"],
  );

  return (
    <section
      ref={sectionRef}
      id="car-chair"
      className="relative min-h-[145vh] border-b-2 border-black bg-black text-white"
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden py-16">
        <motion.div
          style={
            reduceMotion
              ? { scale: 1, borderRadius: "0.4rem" }
              : { scale, borderRadius: radius }
          }
          className="relative h-[78vh] w-[92vw] max-w-[1280px] overflow-hidden border-2 border-white/30"
        >
          <Image
            src={shopInteriorPhoto}
            alt="The Hello Handsome shop interior, including a child-sized car chair"
            fill
            placeholder="blur"
            sizes="92vw"
            className="object-cover"
            style={{ objectPosition: "82% center" }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/82 p-6 backdrop-blur-sm md:bottom-8 md:left-8 md:right-auto md:max-w-xl md:rounded-[2rem] md:border-2 md:border-white/35 md:p-9">
            <p className="font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              The car chair
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.04em] md:text-6xl">
              First-cut friendly.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/72 md:text-base">
              A car-shaped chair gives younger clients a familiar seat while the
              stylist works. One grandparent called the experience fantastic and
              the finished cut perfect.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white/95 px-5 backdrop-blur md:px-8">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-black tracking-tight"
            aria-label="Hello Handsome home"
          >
            <span className="grid size-10 place-items-center rounded-full border-2 border-black bg-[var(--brand-primary)]">
              <Scissors className="size-5" />
            </span>
            <span className="hidden sm:inline">Hello Handsome</span>
          </a>
          <div className="hidden items-center gap-8 font-[family-name:var(--font-label)] text-sm font-semibold md:flex">
            <a className="nav-link" href="#services">
              Cuts
            </a>
            <a className="nav-link" href="#car-chair">
              Kids
            </a>
            <a className="nav-link" href="#reviews">
              Reviews
            </a>
            <a className="nav-link" href="#visit">
              Visit
            </a>
          </div>
          <a
            href="tel:+15035128192"
            className="button-hard inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-2.5 font-[family-name:var(--font-label)] text-sm font-bold"
          >
            <Phone className="size-4" /> Call now
          </a>
        </div>
      </nav>

      <main id="main-content">
        <section
          id="top"
          className="overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <a
                href={listingUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[var(--brand-soft)] px-4 py-2 font-[family-name:var(--font-label)] text-sm font-semibold transition-colors hover:bg-[var(--brand-primary)]"
                aria-label="Read 182 Google reviews"
              >
                <Star className="size-4 fill-[var(--brand-primary)]" />
                4.5 on Google · 182 reviews
              </a>
              <h1 className="max-w-[760px] text-[clamp(3.8rem,8.8vw,7.7rem)] font-black leading-[0.84] tracking-[-0.075em]">
                Great cuts.
                <br />
                <span className="text-[var(--brand-accent-ink)]">
                  Happy kids.
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--brand-muted)]">
                A relaxed Gresham barbershop where kids and adults can settle in
                and leave looking sharp.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="tel:+15035128192"
                  className="button-hard inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 font-[family-name:var(--font-label)] font-bold text-white"
                >
                  <Phone className="size-5" /> (503) 512-8192
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-hard inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-[family-name:var(--font-label)] font-bold"
                >
                  <MapPin className="size-5" /> Directions
                </a>
              </div>
              <a
                href="#services"
                className="mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-label)] text-sm font-bold"
              >
                See the experience <ArrowDown className="size-4" />
              </a>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-[680px]"
              initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <div className="shadow-hard relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border-2 border-black bg-[var(--brand-primary)]">
                <Image
                  src={shopInteriorPhoto}
                  alt="The spacious Hello Handsome barbershop interior with adult stations and a children's car chair"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute -left-2 top-12 -rotate-6 rounded-full border-2 border-black bg-white px-4 py-2 font-[family-name:var(--font-label)] text-sm font-bold shadow-[3px_3px_0_#000]">
                Kids + adults
              </span>
              <span className="absolute -bottom-3 right-5 rotate-3 rounded-full border-2 border-black bg-[var(--brand-primary)] px-4 py-2 font-[family-name:var(--font-label)] text-sm font-bold shadow-[3px_3px_0_#000]">
                Walk-ins welcome
              </span>
            </motion.div>
          </div>
        </section>

        <section
          id="services"
          className="border-y-2 border-black bg-[var(--brand-primary)] px-5 py-20 md:px-8 md:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Cuts for Gresham"
              title="For everyone."
              body="The shop serves children and adults, with a few thoughtful details that make the visit easier for families."
              onOrange
            />
            <motion.div
              className="mt-12 grid gap-5 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {services.map((service) => (
                <motion.article
                  key={service.number}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="service-card flex min-h-[360px] flex-col rounded-[2rem] border-2 border-black bg-white p-7 md:p-8"
                >
                  <span className="text-7xl font-black leading-none tracking-[-0.08em] text-[var(--brand-accent-ink)]">
                    {service.number}
                  </span>
                  <h3 className="mt-8 text-3xl font-black tracking-[-0.035em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                    {service.body}
                  </p>
                  <p className="mt-auto pt-8 font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[0.15em]">
                    {service.note}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <CarChairStory />

        <section id="gallery" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Real shop photos"
              title="Inside the shop."
              body="A spacious, casual setup with adult stations, car chairs for kids, and room for the family to get comfortable."
            />
            <motion.div
              className="mt-12 grid auto-rows-[250px] gap-5 md:grid-cols-12 md:auto-rows-[280px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.13 } },
              }}
            >
              <motion.figure
                variants={fadeUp}
                className="gallery-card md:col-span-7 md:row-span-2"
              >
                <Image
                  src={shopInActionPhoto}
                  alt="Barbers at work inside Hello Handsome"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <figcaption>Room to relax</figcaption>
              </motion.figure>
              <motion.figure
                variants={fadeUp}
                className="gallery-card md:col-span-5"
              >
                <Image
                  src={walkInSignPhoto}
                  alt="Hello Handsome walk-in sign outside the Gresham shop"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
                <figcaption>Walk-ins welcome</figcaption>
              </motion.figure>
              <motion.figure
                variants={fadeUp}
                className="gallery-card md:col-span-5"
              >
                <Image
                  src={receptionPhoto}
                  alt="The reception counter and lounge area at Hello Handsome"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
                <figcaption>Neighborhood comfort</figcaption>
              </motion.figure>
            </motion.div>
            <p className="mt-4 text-xs text-[var(--brand-muted)]">
              Public listing photos shown for this website concept. Confirm
              usage rights before production launch.
            </p>
          </div>
        </section>

        <section
          id="reviews"
          className="border-y-2 border-black bg-black px-5 py-20 text-white md:px-8 md:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow="Google reviews"
                title="Customers said it."
                body="Real excerpts from local customers, backed by 182 Google reviews and a 4.5-star rating."
                inverse
              />
              <a
                href={listingUrl}
                target="_blank"
                rel="noreferrer"
                className="button-hard inline-flex w-fit items-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-3.5 font-[family-name:var(--font-label)] font-bold text-black"
              >
                Read Google reviews <ArrowUpRight className="size-5" />
              </a>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
              <motion.blockquote
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="rounded-[2rem] border-2 border-white bg-[var(--brand-primary)] p-8 text-black md:p-11"
              >
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      aria-hidden="true"
                      className="size-5 fill-black"
                    />
                  ))}
                </div>
                <p className="mt-10 text-3xl font-black leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  “What a fantastic experience for our grandson&apos;s first
                  stylist haircut … what he ended up with was perfect.”
                </p>
                <footer className="mt-10 font-[family-name:var(--font-label)] text-sm font-bold">
                  Missy Padilla Runyon · Google
                </footer>
              </motion.blockquote>

              <motion.div
                className="grid gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
              >
                {reviews.map((review) => (
                  <motion.blockquote
                    key={review.author}
                    variants={fadeUp}
                    className="rounded-[1.5rem] border-2 border-white/35 bg-white/[0.06] p-6"
                  >
                    <div
                      className="flex gap-1 text-[var(--brand-primary)]"
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          aria-hidden="true"
                          className="size-4 fill-current"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-xl font-semibold leading-snug">
                      “{review.text}”
                    </p>
                    <footer className="mt-5 font-[family-name:var(--font-label)] text-xs font-semibold text-white/55">
                      {review.author} · Google
                    </footer>
                  </motion.blockquote>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="visit" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Gresham, Oregon"
              title="Plan your visit."
              body="Walk-ins are welcome. Call ahead for current pricing or to check availability during busy family hours."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="overflow-hidden rounded-[2rem] border-2 border-black shadow-[6px_6px_0_#000]"
              >
                <GoogleMapsEmbed
                  businessName="Hello Handsome Barber Shop - Gresham"
                  address="1424 SE 282nd Ave, Gresham, OR 97080"
                  aspectRatio="aspect-[4/5] md:aspect-[16/10]"
                  className="!rounded-none !border-0"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="rounded-[2rem] border-2 border-black bg-[var(--brand-soft)] p-7 md:p-9"
              >
                <div className="flex items-start gap-4 border-b-2 border-black pb-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-black bg-[var(--brand-primary)]">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[0.15em]">
                      Find the shop
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      1424 SE 282nd Ave
                      <br />
                      Gresham, OR 97080
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-black bg-white">
                    <Clock3 className="size-5" />
                  </span>
                  <div className="w-full">
                    <p className="font-[family-name:var(--font-label)] text-xs font-bold uppercase tracking-[0.15em]">
                      Hours
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      {hours.map(([day, time]) => (
                        <div
                          key={day}
                          className="flex justify-between gap-6 border-b border-black/15 pb-2"
                        >
                          <dt>{day}</dt>
                          <dd className="font-semibold">{time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="tel:+15035128192"
                    className="button-hard inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3.5 font-[family-name:var(--font-label)] font-bold text-white"
                  >
                    <Phone className="size-4" /> Call the shop
                  </a>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-hard inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3.5 font-[family-name:var(--font-label)] font-bold"
                  >
                    <MapPin className="size-4" /> Directions
                  </a>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-label)] text-sm font-bold underline decoration-2 underline-offset-4"
                >
                  <Instagram className="size-4" /> Follow on Instagram
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t-2 border-black bg-[var(--brand-primary)] px-5 pb-8 pt-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-[family-name:var(--font-label)] text-sm font-bold uppercase tracking-[0.16em]">
                Look sharp. Feel welcome.
              </p>
              <a
                href="tel:+15035128192"
                className="mt-4 inline-block text-2xl font-black underline decoration-2 underline-offset-6"
              >
                (503) 512-8192
              </a>
            </div>
            <div className="flex flex-wrap gap-6 font-[family-name:var(--font-label)] text-sm font-bold">
              <a href="#services">Cuts</a>
              <a href="#reviews">Reviews</a>
              <a href="#visit">Visit</a>
              <a href={listingUrl} target="_blank" rel="noreferrer">
                Google
              </a>
            </div>
          </div>
          <p
            aria-hidden="true"
            className="mt-14 whitespace-nowrap text-[clamp(4.4rem,14vw,13rem)] font-black leading-[0.72] tracking-[-0.085em]"
          >
            HELLO HANDSOME
          </p>
          <div className="mt-12 flex flex-col gap-2 border-t-2 border-black pt-5 font-[family-name:var(--font-label)] text-xs font-semibold sm:flex-row sm:justify-between">
            <p>1424 SE 282nd Ave · Gresham, OR</p>
            <p>Hello Handsome 2026</p>
          </div>
        </div>
      </footer>

      <ClickToCall phone="+15035128192" />
    </>
  );
}
