"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ProcessStep } from "./types";

interface ProcessStepsProps {
  heading?: string;
  subheading?: string;
  steps: ProcessStep[];
  variant?: "grid" | "timeline";
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

export function ProcessSteps({
  heading = "How It Works",
  subheading,
  steps,
  variant = "grid",
}: ProcessStepsProps) {
  if (variant === "timeline") {
    return (
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-5 text-lg md:text-xl text-[var(--brand-muted)]">
                {subheading}
              </p>
            )}
          </motion.div>
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-[var(--brand-primary)]/15" />
            <div className="space-y-14">
              {steps.map((step, i) => (
                <motion.div key={i} {...fadeInUp} className="flex gap-8">
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-[var(--brand-primary)]/20">
                    {i + 1}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--brand-text)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base text-[var(--brand-muted)] leading-relaxed">
                      {step.description}
                    </p>
                    {step.image && (
                      <div className="mt-5 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: horizontal grid
  return (
    <section className="py-20 lg:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-5 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </motion.div>
        <motion.div
          {...staggerContainer}
          className={`grid gap-10 md:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : `lg:grid-cols-${steps.length}`}`}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className="relative">
              <span className="font-mono text-6xl font-bold text-[var(--brand-primary)]/15 tracking-tighter">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--brand-text)] mt-3">
                {step.title}
              </h3>
              <p className="mt-3 text-[var(--brand-muted)] text-base leading-relaxed">
                {step.description}
              </p>
              {step.image && (
                <div className="mt-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
