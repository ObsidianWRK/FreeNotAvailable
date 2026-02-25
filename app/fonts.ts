import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const displayFont = GeistSans  // Use Geist Sans for display/headings
export const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
export const monoFont = GeistMono  // Use Geist Mono for italic/accent display text
