"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { FounderInfo } from "./types";

interface FounderQuoteProps {
  founder: FounderInfo;
}

export function FounderQuote({ founder }: FounderQuoteProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid md:grid-cols-[1fr_2fr] gap-10 items-center"
        >
          {founder.image && (
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-[var(--brand-text)] italic">
              &ldquo;{founder.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-display text-lg font-bold text-[var(--brand-text)]">
                {founder.name}
              </p>
              {founder.role && (
                <p className="text-[var(--brand-muted)] text-sm mt-1">
                  {founder.role}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
