import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clips — FREE',
  description: 'Short-form video content for the Other World. Clips for TikTok, YouTube, and Instagram.',
  openGraph: {
    title: 'Clips — FREE',
    description: 'Short-form video content for the Other World.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Clips' }],
  },
}

export default function ClipsLayout({ children }: { children: React.ReactNode }) {
  return children
}
