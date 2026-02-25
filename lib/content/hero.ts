import type { PhotoAsset, SectionContent } from './types'

export const heroCover: PhotoAsset = {
  src: '/images/hero-cover.avif',
  alt: 'FREE — dual exposure cover photograph',
  width: 1920,
  height: 1080,
}

export const freeWordmark: PhotoAsset = {
  src: '/images/logotype-free.png',
  alt: 'FREE wordmark logotype',
  width: 800,
  height: 200,
}

export const heroSection: SectionContent = {
  id: 'hero',
  heading: 'FREE',
  subheading: 'Welcome to the Other World',
  images: [heroCover, freeWordmark],
}
