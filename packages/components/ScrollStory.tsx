'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ScrollStoryItem {
  text: string
  image?: string
  imageAlt?: string
  /** 'left' or 'right' — which side the image enters from */
  imagePosition?: 'left' | 'right'
}

interface ScrollStoryProps {
  heading?: string
  items: ScrollStoryItem[]
}

function StorySegment({ item, index }: { item: ScrollStoryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60])

  const isLeft = (item.imagePosition ?? (index % 2 === 0 ? 'right' : 'left')) === 'left'
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLeft ? [-200, 0, 0, -200] : [200, 0, 0, 200]
  )
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLeft ? [-5, 0, 0, -5] : [5, 0, 0, 5]
  )

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center py-16">
      <div
        className={`max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center ${
          isLeft ? '' : 'md:[direction:rtl]'
        }`}
      >
        {item.image && (
          <motion.div
            style={{ x: imageX, opacity, rotate: imageRotate }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden md:[direction:ltr]"
          >
            <Image src={item.image} alt={item.imageAlt ?? ''} fill className="object-cover" />
          </motion.div>
        )}
        <motion.div style={{ y: textY, opacity }} className="md:[direction:ltr]">
          <p className="font-display text-2xl md:text-3xl leading-relaxed text-[var(--brand-text)]">
            {item.text}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export function ScrollStory({ heading, items }: ScrollStoryProps) {
  return (
    <section className="py-10">
      {heading && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)] text-center mb-8 px-6"
        >
          {heading}
        </motion.h2>
      )}
      {items.map((item, i) => (
        <StorySegment key={i} item={item} index={i} />
      ))}
    </section>
  )
}
