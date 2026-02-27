'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Footer from '@/components/layout/Footer'
import TimelineTrack from './TimelineTrack'
import TimelineNode from './TimelineNode'
import EraMarker from './EraMarker'
import { TIMELINE_ENTRIES } from './timelineData'
import type { Era } from './timelineData'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const finexmeEntries = TIMELINE_ENTRIES.filter((e) => e.era === 'finexme')
const sinenoctisEntries = TIMELINE_ENTRIES.filter((e) => e.era === 'sinenoctis')
const futureEntries = TIMELINE_ENTRIES.filter((e) => e.era === 'future')

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="font-pixel text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-tight text-heading text-center"
      >
        TIMELINE
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="font-mono text-[clamp(0.75rem,2vw,1rem)] text-muted mt-6 text-center tracking-wider"
      >
        The chronology of the Other World
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-14 bg-white/20"
        />
      </motion.div>
    </motion.section>
  )
}

function EraNodes({ entries }: { entries: typeof TIMELINE_ENTRIES }) {
  return (
    <>
      {entries.map((entry) => (
        <TimelineNode key={entry.id} entry={entry} />
      ))}
    </>
  )
}

export default function TimelinePage() {
  return (
    <main id="main-content">
      <GrainOverlay />
      <Hero />

      <TimelineTrack>
        {/* Leading spacer */}
        <div className="w-[10vw] shrink-0 max-md:hidden" />

        <EraMarker era={'finexme' as Era} />
        <EraNodes entries={finexmeEntries} />

        <EraMarker era={'sinenoctis' as Era} />
        <EraNodes entries={sinenoctisEntries} />

        <EraMarker era={'future' as Era} />
        <EraNodes entries={futureEntries} />

        {/* Trailing spacer */}
        <div className="w-[10vw] shrink-0 max-md:hidden" />
      </TimelineTrack>

      <Footer />
    </main>
  )
}
