'use client'
import { useEffect } from 'react'

interface Palette {
  background: string
  foreground: string
  accent: string
}

export function useColorTransition(palette: Palette) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--section-bg', palette.background)
    root.style.setProperty('--section-text', palette.foreground)
    root.style.setProperty('--section-accent', palette.accent)
    root.style.setProperty('background-color', palette.background)
    root.style.setProperty('color', palette.foreground)
  }, [palette])
}
