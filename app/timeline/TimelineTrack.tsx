'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useState, useEffect, type ReactNode } from 'react'

interface TimelineTrackProps {
  children: ReactNode
}

export default function TimelineTrack({ children }: TimelineTrackProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [trackWidth, setTrackWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth)
      }
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
      setIsMobile(window.innerWidth < 768)
    }

    measure()
    setMounted(true)

    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const scrollDistance = Math.max(trackWidth - viewportWidth, 0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])

  // Pre-mount placeholder to avoid hydration mismatch
  if (!mounted) {
    return <div className="h-screen" />
  }

  // Mobile or reduced motion: vertical stack layout
  if (isMobile || prefersReducedMotion) {
    return (
      <div className="relative px-6 md:px-10">
        {/* Vertical timeline rail */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-white/10" />
        <div className="flex flex-col gap-12 pl-12 md:pl-20">
          {children}
        </div>
      </div>
    )
  }

  // Desktop: horizontal scroll driven by vertical scrolling
  return (
    <div
      ref={containerRef}
      style={{ height: scrollDistance + viewportHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center h-full gap-0 will-change-transform"
        >
          {/* Horizontal timeline rail running through vertical center */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2 pointer-events-none" />
          {children}
        </motion.div>
      </div>

      {/* Fixed progress bar at bottom of viewport */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/5 z-30 pointer-events-none">
        <motion.div
          className="h-full bg-white/20 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </div>
  )
}
