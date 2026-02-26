import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internal Login',
  robots: { index: false, follow: false },
}

export default function InternalLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
