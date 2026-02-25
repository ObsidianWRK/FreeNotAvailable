import Image from 'next/image'

const COMPARABLE_ARTISTS = [
  {
    name: 'Brent Faiyaz',
    detail: 'Wasteland debuted #2 Billboard, independent, Platinum',
  },
  {
    name: 'Frank Ocean',
    detail: 'Blonde Platinum on own label, visual album pioneer',
  },
  {
    name: 'Daniel Caesar',
    detail: '"Get You" 7x Platinum, indie male R&B',
  },
  {
    name: 'SZA',
    detail: 'SOS 8x Platinum, visual-driven rollout',
  },
  {
    name: 'The Weeknd',
    detail: 'Cinematic universe spanning albums and film',
  },
  {
    name: 'Tyler, the Creator',
    detail: 'Music + fashion + festival ecosystem',
  },
]

const REVENUE_PROJECTIONS = [
  { period: 'Year 1 — Building', conservative: '$2.5K', base: '$15.7K', aggressive: '$58K' },
  { period: 'Year 2–3 — Growth', conservative: '$15.7K', base: '$73K', aggressive: '$325K' },
]

const REVENUE_STREAMS = [
  'Streaming',
  'Sync Licensing',
  'Brand Deals',
  'Live Performance',
  'Merchandise',
  'Film / Visual',
]

export default function EkthesisPage() {
  return (
    <main className="bg-canvas min-h-screen">
      {/* ─── 1. TITLE ─── */}
      <section
        data-section-id="title"
        className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      >
        <div className="relative w-10 h-10 mb-12 opacity-40">
          <Image
            src="/images/owjv-cherub.png"
            alt="OWJV"
            fill
            className="object-contain"
            sizes="40px"
          />
        </div>
        <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-tight text-heading text-center">
          EKTHESIS
        </h1>
        <p className="font-display text-[clamp(1rem,2.5vw,1.5rem)] italic text-muted mt-6 text-center">
          A proposition for the Other World
        </p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-white/20" />
        </div>
      </section>

      {/* ─── 2. THE ARTIST ─── */}
      <section
        data-section-id="artist"
        className="relative section-padding overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cover.avif"
            alt=""
            fill
            className="object-cover object-center opacity-15"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/70 to-canvas" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            The Artist
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-12">
            FREE
          </h2>
          <p className="font-sans text-sm md:text-base leading-[1.8] text-muted max-w-[60ch] mb-10">
            FREE is a Detroit-based R&B artist whose sound thrives in the grey area
            where deflection meets self-reflection. As a &rsquo;90s-influenced songwriter
            shaped by the Jodeci era, his music explores heartbreak, duality, and the
            emotional weather of men who rarely get to yearn in public.
          </p>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl md:text-6xl text-accent">10</span>
            <span className="font-sans text-sm text-muted">
              released tracks across 2 projects&mdash;FINExME &amp; SINE NOCTIS
            </span>
          </div>
        </div>
      </section>

      {/* ─── 3. THE THESIS ─── */}
      <section
        data-section-id="thesis"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            The Thesis
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-heading leading-[1.05] max-w-[22ch] mb-12">
            Male vulnerability is underserved in R&amp;B. FREE fills the gap with a visual universe built from day one.
          </h2>
          <p className="font-sans text-sm md:text-base leading-[1.8] text-muted max-w-[60ch] mb-16">
            R&B/Hip-Hop is the #1 genre ecosystem at 28% of US consumption, yet male
            R&B vulnerability is under-invested. The audience is there. The infrastructure
            is not.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">$29.6B</span>
              <span className="font-sans text-xs text-muted mt-2 block">Global recorded music revenue (2024)</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">69%</span>
              <span className="font-sans text-xs text-muted mt-2 block">Streaming share of global market</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">752M</span>
              <span className="font-sans text-xs text-muted mt-2 block">Global paid streaming subscribers</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">$5B+</span>
              <span className="font-sans text-xs text-muted mt-2 block">Independent artist Spotify earnings (2024)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THE UNIVERSE ─── */}
      <section
        data-section-id="universe"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            The Universe
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-16">
            Other World
          </h2>

          {/* Released projects */}
          <div className="space-y-16 mb-20">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="relative w-48 h-14 shrink-0">
                <Image
                  src="/images/logotype-finexme.png"
                  alt="FINExME"
                  fill
                  className="object-contain object-left"
                  sizes="192px"
                />
              </div>
              <div>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-accent block mb-2">
                  ACT I
                </span>
                <p className="font-sans text-sm leading-[1.8] text-muted">
                  7 tracks. Hot reds and blacks. The BMW as armor.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="relative w-48 h-14 shrink-0">
                <Image
                  src="/images/logotype-sinenoctis.png"
                  alt="SINE NOCTIS"
                  fill
                  className="object-contain object-left"
                  sizes="192px"
                />
              </div>
              <div>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 block mb-2">
                  ACT II
                </span>
                <p className="font-sans text-sm leading-[1.8] text-muted">
                  3 tracks. Strict monochrome. The Alpinestars jacket as shelter.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-6 mb-16">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/20">What Comes Next</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Future projects */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 items-center">
            {[
              { src: '/images/logotype-otherland.png', alt: 'OTHERLAND', label: 'Otherland' },
              { src: '/images/logotype-neverdyin.png', alt: 'NEVERDYIN', label: 'Neverdyin' },
              { src: '/images/logotype-sexsymbol.png', alt: 'SEX SYMBOL (THE ALBUM)', label: 'Sex Symbol' },
            ].map(({ src, alt, label }) => (
              <div key={src} className="flex flex-col items-center gap-4">
                <div className="relative w-full aspect-[3/1]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain opacity-40"
                    sizes="(max-width: 768px) 30vw, 250px"
                  />
                </div>
                <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/20">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. THE MODEL ─── */}
      <section
        data-section-id="model"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            The Model
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-heading leading-[1.05] max-w-[24ch] mb-12">
            Music &times; Film
          </h2>
          <p className="font-display text-xl md:text-2xl italic text-heading/80 max-w-[36ch] mb-16 leading-snug">
            Every project is a Greek vignette. Every song is a scene. Every album is a season.
          </p>

          {/* Canvas stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border border-white/10 p-6">
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 block mb-3">Visual Albums</span>
              <span className="font-display text-3xl text-accent block mb-2">3&ndash;5&times;</span>
              <span className="font-sans text-xs text-muted">more press coverage than audio-only releases</span>
            </div>
            <div className="border border-white/10 p-6">
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 block mb-3">Spotify Canvas</span>
              <div className="space-y-1 mb-2">
                <span className="font-display text-2xl text-accent block">+5%</span>
                <span className="font-sans text-xs text-muted block">streams</span>
              </div>
              <div className="space-y-1 mb-2">
                <span className="font-display text-2xl text-accent block">+145%</span>
                <span className="font-sans text-xs text-muted block">shares</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-2xl text-accent block">+20%</span>
                <span className="font-sans text-xs text-muted block">playlist adds</span>
              </div>
            </div>
            <div className="border border-white/10 p-6">
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 block mb-3">Revenue Streams</span>
              <ul className="space-y-2">
                {REVENUE_STREAMS.map((stream) => (
                  <li key={stream} className="font-sans text-xs text-muted flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                    {stream}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. MARKET OPPORTUNITY ─── */}
      <section
        data-section-id="market"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            Market Opportunity
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-16">
            The Numbers
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">$1.2B</span>
              <span className="font-sans text-xs text-muted mt-2 block">R&B standalone US market</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">$412M</span>
              <span className="font-sans text-xs text-muted mt-2 block">US sync licensing revenue (2024)</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">$5B+</span>
              <span className="font-sans text-xs text-muted mt-2 block">Indie artist Spotify earnings (2024)</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-accent">75%</span>
              <span className="font-sans text-xs text-muted mt-2 block">of TikTok users discover new music on platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. COMPARABLE ARTISTS ─── */}
      <section
        data-section-id="comparables"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            Comparables
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-16">
            The Landscape
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {COMPARABLE_ARTISTS.map(({ name, detail }) => (
              <div key={name} className="border-l-2 border-accent/40 pl-6">
                <span className="font-display text-xl md:text-2xl text-heading block mb-1">{name}</span>
                <span className="font-sans text-xs text-muted leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. REVENUE PROJECTIONS ─── */}
      <section
        data-section-id="projections"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6">
            Projections
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-16">
            Revenue Path
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 pb-4 pr-6" />
                  <th className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 pb-4 pr-6">Conservative</th>
                  <th className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 pb-4 pr-6">Base</th>
                  <th className="font-sans text-xs tracking-[0.15em] uppercase text-accent/70 pb-4">Aggressive</th>
                </tr>
              </thead>
              <tbody>
                {REVENUE_PROJECTIONS.map(({ period, conservative, base, aggressive }) => (
                  <tr key={period} className="border-b border-white/5">
                    <td className="font-sans text-sm text-muted py-5 pr-6 whitespace-nowrap">{period}</td>
                    <td className="font-display text-xl text-heading/60 py-5 pr-6">{conservative}</td>
                    <td className="font-display text-xl text-heading py-5 pr-6">{base}</td>
                    <td className="font-display text-xl text-accent py-5">{aggressive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 9. THE ASK / CONTACT ─── */}
      <section
        data-section-id="contact"
        className="section-padding border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl italic text-heading leading-[0.9] mb-8">
            The fire is already lit.
          </h2>
          <p className="font-sans text-sm text-muted mb-16 max-w-[40ch] mx-auto">
            FREE is building in public. The visual universe is live. The music is written.
            What comes next is scale.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            <a
              href="https://www.instagram.com/freenotavailable/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent/40 text-xs font-sans tracking-[0.15em] uppercase text-accent hover:bg-accent/10 transition-all duration-300 min-w-[160px]"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Apple Music
            </a>
          </div>

          {/* Footer mark */}
          <div className="flex flex-col items-center gap-6 pt-8 border-t border-white/5">
            <div className="relative w-10 h-10 opacity-30">
              <Image
                src="/images/owjv-cherub.png"
                alt="OWJV"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30">
                OWJV / Creative Minds Coalition
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
