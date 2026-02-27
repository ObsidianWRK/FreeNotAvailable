'use client'

import { useRef, useEffect } from 'react'

interface AutoplayVideoProps {
  src: string
  poster?: string
  className?: string
}

export default function AutoplayVideo({ src, poster, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Silently handle play() rejection (iOS low-power mode, etc.)
          })
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      preload="auto"
      className={className}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
