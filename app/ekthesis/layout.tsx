import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ekthesis — FREE',
  description: 'A proposition for the Other World.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Ekthesis — FREE',
    description: 'A proposition for the Other World.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Other World Mythos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekthesis — FREE',
    description: 'A proposition for the Other World.',
    images: ['/opengraph-image.png'],
  },
}

export default function EkthesisLayout({ children }: { children: React.ReactNode }) {
  return children
}
