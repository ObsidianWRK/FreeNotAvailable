export const DURATIONS = { fast: 0.2, normal: 0.5, slow: 0.9, crawl: 1.6 } as const
export const EASINGS = {
  enter: [0.0, 0.0, 0.2, 1.0] as const,
  exit: [0.4, 0.0, 1.0, 1.0] as const,
  standard: [0.4, 0.0, 0.2, 1.0] as const,
}
export const VARIANTS = {
  fadeUp: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} as const
