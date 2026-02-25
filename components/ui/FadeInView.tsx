'use client'
import { useRef, useEffect, useState, type ReactNode } from 'react'

// Module-level shared observer — one instance for the entire page
type Callback = (entry: IntersectionObserverEntry) => void
const callbacks = new Map<Element, Callback>()
let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = callbacks.get(entry.target)
        if (cb) cb(entry)
      }
    },
    { rootMargin: '-10% 0px', threshold: 0.1 }
  )
  return sharedObserver
}

interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FadeInView({ children, className, delay = 0 }: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = getObserver()
    callbacks.set(el, (entry) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(el)
        callbacks.delete(el)
      }
    })
    observer.observe(el)
    return () => {
      observer.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-in-view ${className || ''}`}
      data-in-view={inView}
      style={{ animationDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
