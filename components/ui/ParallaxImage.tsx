'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  preload?: boolean
  className?: string
}

export default function ParallaxImage({ src, alt, width, height, preload, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <motion.div style={{ y }} className="will-change-transform">
        <Image src={src} alt={alt} width={width} height={height} preload={preload} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
      </motion.div>
    </div>
  )
}
