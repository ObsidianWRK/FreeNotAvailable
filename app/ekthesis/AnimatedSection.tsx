'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function AnimatedSection({
  children,
  id,
  className = '',
}: {
  children: ReactNode
  id: string
  className?: string
}) {
  return (
    <motion.section
      id={id}
      data-section-id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className={`relative section-padding border-t border-white/5 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">{children}</div>
    </motion.section>
  )
}
