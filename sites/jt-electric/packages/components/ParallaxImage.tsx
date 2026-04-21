"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
  containerClassName = "",
  overlay = false,
  overlayOpacity = 0.4,
  children,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={`absolute inset-0 w-full h-[120%] object-cover ${className}`}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
