export const PALETTES = {
  canvas: { background: '#0a0a08', foreground: '#f2ede8', accent: '#b5afa5', muted: '#b5afa5' },
  finexme: { background: '#1a0505', foreground: '#f5e6e0', accent: '#c0392b', muted: '#b5afa5' },
  sinenoctis: { background: '#0f0f0f', foreground: '#e8e8e8', accent: '#d0d0d0', muted: '#8a8a8a' },
} as const

export type PaletteKey = keyof typeof PALETTES
