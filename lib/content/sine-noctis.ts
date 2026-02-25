import type { PhotoAsset, SectionContent, TrackItem } from './types'

/* ---------------------------------------------------------------------------
 * Images
 * -------------------------------------------------------------------------*/

export const sineNoctisLogotype: PhotoAsset = {
  src: '/images/logotype-sinenoctis.png',
  alt: 'SINE NOCTIS logotype',
  width: 800,
  height: 200,
}

export const sineNoctisImages = {
  logotype: sineNoctisLogotype,
  jacketPortrait: {
    src: '/images/jacket-portrait.avif',
    alt: 'FREE — jacket portrait',
    width: 1280,
    height: 1920,
  },
  jacketCloseup: {
    src: '/images/jacket-closeup.avif',
    alt: 'FREE — jacket close-up detail',
    width: 1920,
    height: 1280,
  },
  bmwDusk: {
    src: '/images/bmw-dusk.avif',
    alt: 'BMW silhouette at dusk',
    width: 1920,
    height: 1280,
  },
  snStreet1: {
    src: '/images/sn-street-1.avif',
    alt: 'Street scene — SINE NOCTIS era',
    width: 1920,
    height: 1280,
  },
  snArchitecture: {
    src: '/images/sn-architecture.avif',
    alt: 'Architectural detail — SINE NOCTIS era',
    width: 1920,
    height: 1280,
  },
  snScene: {
    src: '/images/sn-scene.avif',
    alt: 'Night scene — SINE NOCTIS era',
    width: 1920,
    height: 1280,
  },
  seatedPendant: {
    src: '/images/seated-pendant.avif',
    alt: 'FREE — seated with pendant',
    width: 1280,
    height: 1920,
  },
  crouchingSmoke: {
    src: '/images/crouching-smoke.avif',
    alt: 'FREE — crouching in smoke',
    width: 1280,
    height: 1920,
  },
  bokehNight: {
    src: '/images/bokeh-night.avif',
    alt: 'Bokeh city lights at night',
    width: 1920,
    height: 1280,
  },
  backcover: {
    src: '/images/sinenoctis-backcover.avif',
    alt: 'SINE NOCTIS — back cover artwork',
    width: 1400,
    height: 1400,
  },
  owjvBirmingham: {
    src: '/images/owjv-birmingham.avif',
    alt: 'OWJV — Birmingham',
    width: 1920,
    height: 1280,
  },
} as const satisfies Record<string, PhotoAsset>

/* ---------------------------------------------------------------------------
 * Copy
 * -------------------------------------------------------------------------*/

export const sineNoctisBody =
  "The icy follow-up to 2024\u2019s steamy FINExME the album. " +
  'SINE NOCTIS is perfect for the Fall/Winter season.'

export const sineNoctisDedication = 'LONG LIVE WORST CHOICE'

/* ---------------------------------------------------------------------------
 * Tracklist
 * -------------------------------------------------------------------------*/

export const sineNoctisTracklist: readonly TrackItem[] = [
  { number: 1, title: 'Al B. Sure!/Donell Jones' },
  { number: 2, title: 'Van Gogh' },
  { number: 3, title: 'Thin Ice Freestyle' },
] as const

/* ---------------------------------------------------------------------------
 * Credits
 * -------------------------------------------------------------------------*/

export const sineNoctisCredits =
  'Creative Minds Coalition 2026 / OWJV 2026'

/* ---------------------------------------------------------------------------
 * Section (aggregate)
 * -------------------------------------------------------------------------*/

export const sineNoctisSection: SectionContent = {
  id: 'sine-noctis',
  heading: 'SINE NOCTIS',
  subheading: 'The Follow-Up',
  body: sineNoctisBody,
  images: Object.values(sineNoctisImages),
}
