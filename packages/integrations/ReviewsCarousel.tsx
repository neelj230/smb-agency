"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { ReviewsCarouselProps } from "./types";

/**
 * Horizontally auto-scrolling reviews carousel.
 * Pauses on hover. Shows star ratings and source badges.
 * Based on horizontal-auto-scroll pattern from design-elements-database.
 */
export function ReviewsCarousel({
  reviews,
  speed = 30,
  className = "",
}: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused) return;

    let animationId: number;
    let position = 0;
    const contentWidth = el.scrollWidth / 2; // We duplicate content

    function animate() {
      position += 0.5;
      if (position >= contentWidth) position = 0;
      if (el) el.scrollLeft = position;
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [paused, speed]);

  if (reviews.length === 0) return null;

  // Duplicate reviews for seamless loop
  const displayReviews = [...reviews, ...reviews];

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {displayReviews.map((review, i) => (
          <div
            key={`${review.author}-${i}`}
            className="flex-shrink-0 w-[350px] p-6 rounded-2xl border border-black/5 bg-[var(--brand-bg)]"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }, (_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-4 line-clamp-4">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[var(--brand-text)]">
                {review.author}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 text-[var(--brand-muted)] capitalize">
                {review.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
