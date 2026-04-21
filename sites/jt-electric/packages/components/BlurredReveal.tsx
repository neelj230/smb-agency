"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BlurredRevealProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  height?: string;
}

export function BlurredReveal({
  src,
  alt,
  children,
  className = "",
  height = "120vh",
}: BlurredRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.6], [6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.1, 1]);
  const filterValue = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      className={`relative ${className}`}
      style={{ minHeight: height }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: filterValue, opacity, scale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        {children && <div className="relative z-10">{children}</div>}
      </div>
    </section>
  );
}
