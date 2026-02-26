'use client'

import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
}

type Tag = 'div' | 'span' | 'h2' | 'p' | 'button'

export default function AnimatedElement({
  children,
  as = 'div',
  custom = 0,
  className = '',
  ...rest
}: {
  children: ReactNode
  as?: Tag
  custom?: number
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'custom' | 'children'>) {
  const Component = motion[as] as any
  return (
    <Component variants={fadeUp} custom={custom} className={className} {...rest}>
      {children}
    </Component>
  )
}
