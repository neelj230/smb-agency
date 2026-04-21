"use client";

import { motion } from "framer-motion";
import type { Review } from "./types";

interface TestimonialCarouselProps {
  heading?: string;
  reviews: Review[];
  variant?: "scroll" | "grid" | "featured";
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-black/[0.08] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-w-[320px]">
      <div>
        <StarRating rating={review.rating} />
        <p className="mt-5 text-[var(--brand-text)] text-base leading-relaxed line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center font-display font-bold text-[var(--brand-primary)]">
          {review.author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-[var(--brand-text)]">
            {review.author}
          </p>
          <p className="text-xs text-[var(--brand-muted)] capitalize">
            {review.source}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  heading = "What Our Customers Say",
  reviews: rawReviews,
  variant = "scroll",
}: TestimonialCarouselProps) {
  // Safety net: filter out reviews without meaningful text
  const reviews = rawReviews.filter(
    (r) => r.text && r.text.trim().length >= 20,
  );
  if (reviews.length === 0) return null;
  if (variant === "featured" && reviews.length > 0) {
    const [featured, ...rest] = reviews;
    return (
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
              {heading}
            </h2>
          </motion.div>
          <motion.div {...fadeInUp}>
            <div className="bg-[var(--brand-primary)] text-white rounded-3xl p-10 md:p-16 mb-10 relative overflow-hidden">
              <div className="absolute top-6 left-10 text-8xl leading-none opacity-20 font-serif">
                &ldquo;
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mt-4 relative z-10">
                {featured.text}
              </p>
              <div className="mt-10 flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-xl">
                  {featured.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-lg">{featured.author}</p>
                  <StarRating rating={featured.rating} />
                </div>
              </div>
            </div>
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === "grid") {
    return (
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
              {heading}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default: auto-scrolling horizontal carousel
  const duplicated = [...reviews, ...reviews];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
            {heading}
          </h2>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {duplicated.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
