import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline — FREE',
  description: 'The complete chronology of FREE\'s releases across Apple Music and YouTube.',
  openGraph: {
    title: 'Timeline — FREE',
    description: 'The chronology of the Other World.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Timeline' }],
  },
}

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children
}
