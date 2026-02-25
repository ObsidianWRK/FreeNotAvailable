const LINKS = [
  { label: 'Spotify', href: 'https://open.spotify.com' },
  { label: 'Apple Music', href: 'https://music.apple.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
]

export default function LinksSection() {
  return (
    <section
      id="links"
      data-section-id="links"
      className="relative section-padding"
      aria-label="Listen"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 text-center">
        {/* Heading */}
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
          Listen
        </span>
        <h2 className="font-display text-3xl md:text-4xl italic text-[#f2ede8] mb-4">
          Find FREE everywhere
        </h2>
        <p className="font-sans text-sm text-white/40 mb-12 md:mb-16">
          Streaming now on all platforms.
        </p>

        {/* Link buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
