import type { PhotoAsset, SectionContent } from './types'

/* ---------------------------------------------------------------------------
 * Images — future project logotypes
 * -------------------------------------------------------------------------*/

export const mythosLogotypes = {
  otherland: {
    src: '/images/logotype-otherland.png',
    alt: 'OTHERLAND logotype',
    width: 800,
    height: 200,
  },
  neverdyin: {
    src: '/images/logotype-neverdyin.png',
    alt: 'NEVERDYIN logotype',
    width: 800,
    height: 200,
  },
  sexsymbol: {
    src: '/images/logotype-sexsymbol.png',
    alt: 'SEX SYMBOL logotype',
    width: 800,
    height: 200,
  },
} as const satisfies Record<string, PhotoAsset>

/* ---------------------------------------------------------------------------
 * Copy
 * -------------------------------------------------------------------------*/

export const mythosBody =
  'In the Other World mythology, FREE is Prometheus \u2014 ' +
  'the fire-bringer who stole something sacred and paid for it in perpetuity. ' +
  'Every project is a cycle of theft and consequence: ' +
  'stealing feeling from lovers, stealing time from himself, ' +
  'stealing honesty from a genre that would rather perform invincibility. ' +
  'The flame he carries illuminates and destroys in equal measure. ' +
  'He is bound to the mountain, yet keeps returning with fire in hand \u2014 ' +
  'an offering no one asked for, delivered at a cost only he understands.'

/* ---------------------------------------------------------------------------
 * Section (aggregate)
 * -------------------------------------------------------------------------*/

export const mythosSection: SectionContent = {
  id: 'mythos',
  heading: 'Other World Mythos',
  subheading: 'FREE as Prometheus',
  body: mythosBody,
  images: Object.values(mythosLogotypes),
}
