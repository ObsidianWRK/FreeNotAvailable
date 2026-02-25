'use client'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

const PALETTES: Record<string, { background: string; foreground: string; accent: string }> = {
  hero: { background: '#0a0a08', foreground: '#f2ede8', accent: '#b5afa5' },
  finexme: { background: '#1a0505', foreground: '#f5e6e0', accent: '#c0392b' },
  threshold: { background: '#0a0a08', foreground: '#d0d0d0', accent: '#666666' },
  sinenoctis: { background: '#0f0f0f', foreground: '#e8e8e8', accent: '#d0d0d0' },
  mythos: { background: '#0a0a08', foreground: '#f2ede8', accent: '#b5afa5' },
  links: { background: '#0a0a08', foreground: '#f2ede8', accent: '#c0392b' },
}

interface ScrollContextValue { activeSection: string }
const ScrollContext = createContext<ScrollContextValue>({ activeSection: 'hero' })
export const useActiveSection = () => useContext(ScrollContext)

export default function ScrollController({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('hero')
  const visibleSections = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Batch all entries before writing
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-section-id')
          if (!id) continue
          if (entry.isIntersecting) {
            visibleSections.current.set(id, entry.intersectionRatio)
          } else {
            visibleSections.current.delete(id)
          }
        }
        // Find winner by highest ratio
        let winner: string | null = null
        let highest = 0
        for (const [id, ratio] of visibleSections.current) {
          if (ratio > highest) { highest = ratio; winner = id }
        }
        if (winner) {
          setActiveSection(winner)
          const palette = PALETTES[winner] || PALETTES.hero
          requestAnimationFrame(() => {
            const root = document.documentElement
            root.style.setProperty('--section-bg', palette.background)
            root.style.setProperty('--section-text', palette.foreground)
            root.style.setProperty('--section-accent', palette.accent)
          })
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1.0], rootMargin: '-33% 0px -33% 0px' }
    )

    const sections = document.querySelectorAll('[data-section-id]')
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <ScrollContext.Provider value={{ activeSection }}>
      <div style={{ backgroundColor: 'var(--section-bg)', color: 'var(--section-text)', transition: 'background-color 0.8s ease, color 0.8s ease' }}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
