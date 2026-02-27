'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react'

interface TimelineTrackProps {
  children: ReactNode
}

export default function TimelineTrack({ children }: TimelineTrackProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [trackWidth, setTrackWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(1280)
  const [viewportHeight, setViewportHeight] = useState(800)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const measure = useCallback(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth)
    }
    setViewportWidth(window.innerWidth)
    setViewportHeight(window.innerHeight)
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    measure()
    setMounted(true)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // Re-measure after mount once images/fonts settle
  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(measure, 500)
    return () => clearTimeout(timer)
  }, [mounted, measure])

  const scrollDistance = Math.max(trackWidth - viewportWidth, 0)
  const useVertical = isMobile || prefersReducedMotion

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])

  // Mobile or reduced motion: vertical stack layout
  if (mounted && useVertical) {
    return (
      <div className="relative px-6 md:px-10">
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-white/10" />
        <div className="flex flex-col gap-12 pl-12 md:pl-20">
          {children}
        </div>
      </div>
    )
  }

  // Desktop: horizontal scroll driven by vertical scrolling
  // The containerRef MUST always be rendered so useScroll can attach to it
  return (
    <div
      ref={containerRef}
      style={{ height: mounted ? scrollDistance + viewportHeight : '100vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center h-full will-change-transform"
        >
          {/* Horizontal timeline rail */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2 pointer-events-none" />
          {children}
        </motion.div>
      </div>

      {/* Progress bar at viewport bottom */}
      {mounted && (
        <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/5 z-30 pointer-events-none">
          <motion.div
            className="h-full bg-white/20 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      )}
    </div>
  )
}
