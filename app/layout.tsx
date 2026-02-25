import type { Metadata } from 'next'
import { displayFont, bodyFont } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://freenotavailable.vercel.app'),
  title: {
    template: '%s | FREE',
    default: 'FREE — Other World Mythos',
  },
  description: 'Welcome to the Other World. FREE is a Detroit R&B artist whose sound thrives in the grey area where deflection meets self-reflection.',
  keywords: ['FREE', 'R&B', 'Detroit', 'FINExME', 'SINE NOCTIS', 'Other World Mythos'],
  authors: [{ name: 'FREE' }],
  openGraph: {
    title: 'FREE — Other World Mythos',
    description: 'Welcome to the Other World.',
    url: 'https://freenotavailable.vercel.app',
    siteName: 'FREE',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'FREE — Other World Mythos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREE — Other World Mythos',
    description: 'Welcome to the Other World.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} dark`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-cover.avif"
          type="image/avif"
        />
      </head>
      <body className="bg-canvas text-body antialiased">
        {children}
      </body>
    </html>
  )
}
