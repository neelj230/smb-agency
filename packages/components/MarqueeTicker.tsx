"use client";

import { motion } from "framer-motion";

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
  separator?: string;
  variant?: "default" | "outline" | "bold";
  reverse?: boolean;
  className?: string;
}

export function MarqueeTicker({
  items,
  speed = 30,
  separator = "·",
  variant = "default",
  reverse = false,
  className = "",
}: MarqueeTickerProps) {
  const duplicated = [...items, ...items, ...items];

  const variantStyles = {
    default: "text-lg md:text-xl tracking-wide",
    outline:
      "text-4xl md:text-6xl font-display font-bold tracking-tight [-webkit-text-stroke:1px_currentColor] text-transparent",
    bold: "text-3xl md:text-5xl font-display font-bold tracking-tight",
  };

  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "33.33%"] : ["0%", "-33.33%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 ${variantStyles[variant]}`}
          >
            <span>{item}</span>
            <span className="opacity-30">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
