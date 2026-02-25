import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0a0a08]">
      <p className="text-xs font-sans tracking-[0.2em] uppercase text-white/30 mb-8">
        404
      </p>
      <h1 className="font-sans text-4xl md:text-6xl italic text-[#f2ede8] mb-4 text-center">
        FREE is not available
      </h1>
      <p className="font-sans text-sm text-white/40 mb-12 text-center max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist in this world or the Other.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
      >
        Return to the Other World
      </Link>
    </div>
  )
}
