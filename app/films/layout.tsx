import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Films — FREE',
  description: 'Visual extensions of the Other World. Short films and trailers from FREE.',
}

export default function FilmsLayout({ children }: { children: React.ReactNode }) {
  return children
}
