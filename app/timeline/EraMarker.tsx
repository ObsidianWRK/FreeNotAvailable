'use client'

import { motion } from 'motion/react'
import type { Era } from './timelineData'
import { ERA_LABELS, ERA_YEAR_RANGES, ERA_COLORS } from './timelineData'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const eraNameStyles: Record<Era, string> = {
  finexme: 'text-accent/80 drop-shadow-[0_0_20px_rgba(192,57,43,0.3)]',
  sinenoctis: 'text-[#e8e8e8]/90',
  future: 'text-white/30',
}

function MarkerDot({ era }: { era: Era }) {
  if (era === 'future') {
    return (
      <span className="block h-5 w-5 rounded-full bg-white/20 border border-dashed border-white/30" />
    )
  }
  return (
    <span
      className="block h-5 w-5 rounded-full"
      style={{ backgroundColor: ERA_COLORS[era] }}
    />
  )
}

export default function EraMarker({ era }: { era: Era }) {
  return (
    <motion.div
      className="w-[300px] shrink-0 flex flex-col items-center justify-center relative h-full gap-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <MarkerDot era={era} />
      <h2 className={`font-sans text-3xl md:text-4xl italic ${eraNameStyles[era]}`}>
        {ERA_LABELS[era]}
      </h2>
      <span className="font-mono text-xs text-muted/60 tracking-widest">
        {ERA_YEAR_RANGES[era]}
      </span>
    </motion.div>
  )
}
