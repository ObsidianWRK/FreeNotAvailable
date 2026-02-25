import type { PhotoAsset, SectionContent, TrackItem } from './types'

/* ---------------------------------------------------------------------------
 * Images
 * -------------------------------------------------------------------------*/

export const finexmeLogotype: PhotoAsset = {
  src: '/images/logotype-finexme.png',
  alt: 'FINExME logotype',
  width: 800,
  height: 200,
}

export const finexmeImages = {
  logotype: finexmeLogotype,
  bmwRedWheel: {
    src: '/images/bmw-red-wheel.avif',
    alt: 'BMW detail — red brake caliper and wheel',
    width: 1920,
    height: 1280,
  },
  redPortrait: {
    src: '/images/red-portrait.avif',
    alt: 'FREE — red-lit portrait',
    width: 1280,
    height: 1920,
  },
  duskSilhouetteTwo: {
    src: '/images/dusk-silhouette-two.avif',
    alt: 'Silhouette of two figures at dusk',
    width: 1920,
    height: 1280,
  },
  pilgrimCard: {
    src: '/images/pilgrim-card.avif',
    alt: 'Pilgrim — visual card',
    width: 1280,
    height: 1280,
  },
  fineByMeStill: {
    src: '/images/fine-by-me-still.avif',
    alt: 'Fine By Me — video still',
    width: 1920,
    height: 1080,
  },
  cover: {
    src: '/images/finexme-cover.avif',
    alt: 'FINExME — front cover artwork',
    width: 1400,
    height: 1400,
  },
  backcover: {
    src: '/images/finexme-backcover.avif',
    alt: 'FINExME — back cover artwork',
    width: 1400,
    height: 1400,
  },
  anteDoorway: {
    src: '/images/ante-doorway.avif',
    alt: 'Figure standing in a doorway',
    width: 1280,
    height: 1920,
  },
  redBokehPortrait: {
    src: '/images/red-bokeh-portrait.avif',
    alt: 'FREE — red bokeh portrait',
    width: 1280,
    height: 1920,
  },
} as const satisfies Record<string, PhotoAsset>

/* ---------------------------------------------------------------------------
 * Copy
 * -------------------------------------------------------------------------*/

export const finexmeBody =
  "In today\u2019s R&B landscape, men rarely make music that yearns anymore. " +
  "Yet in 2026, we\u2019re just as bruised, conflicted, and love-worn as our female counterparts. " +
  "Heartbreak is universal \u2014 duality sits at the core of everyone navigating love and life. " +
  "As a songwriter, FREE thrives in that grey area where deflection meets self-reflection. " +
  "His sound doesn\u2019t chase the glossy nostalgia of old-school love ballads, but instead " +
  "embraces the cold croon of the early 2010s \u2014 a shadowy echo that still resonates today."

export const finexmeBodySecondary =
  'A collection of demos, sequenced into a cohesive narrative. ' +
  'FINExME is a debut worth revisiting. Welcome To The Other World.'

/* ---------------------------------------------------------------------------
 * Tracklist
 * -------------------------------------------------------------------------*/

export const finexmeTracklist: readonly TrackItem[] = [
  { number: 1, title: 'Fine By Me' },
  { number: 2, title: 'Twins' },
  { number: 3, title: 'Chambers' },
  { number: 4, title: 'Flo' },
  { number: 5, title: 'Zodiac Killer' },
  { number: 6, title: 'Maybe' },
  { number: 7, title: 'Pilgrim' },
] as const

/* ---------------------------------------------------------------------------
 * Credits
 * -------------------------------------------------------------------------*/

export const finexmeCredits =
  'PRINCIPLE PRODUCTION: mookie magnolia, ashton woods, worst choice, brando heat / ' +
  'ENGINEERING AND POST PRODUCTION: ashton woods / ' +
  'ART DIRECTION AND DESIGN: worst choice / ' +
  'PHOTOGRAPHY: rush hour / ' +
  'THIS IS A COLLECTION OF DEMOS AND SHOULD BE CONSUMED AS SUCH / ' +
  'Creative Minds Coalition 2024 / OWJV 2024'

/* ---------------------------------------------------------------------------
 * Section (aggregate)
 * -------------------------------------------------------------------------*/

export const finexmeSection: SectionContent = {
  id: 'finexme',
  heading: 'FINExME',
  subheading: 'The Debut Project',
  body: finexmeBody,
  images: Object.values(finexmeImages),
}
