import Image from 'next/image'

const TRACKLIST = [
  { num: '01', title: 'Fine By Me' },
  { num: '02', title: 'Twins' },
  { num: '03', title: 'Chambers' },
  { num: '04', title: 'Flo' },
  { num: '05', title: 'Zodiac Killer' },
  { num: '06', title: 'Maybe' },
  { num: '07', title: 'Pilgrim' },
]

const GALLERY = [
  { src: '/images/red-portrait.avif', alt: 'Red-lit portrait', caption: 'Red-lit portrait' },
  { src: '/images/bmw-red-wheel.avif', alt: 'BMW red wheel detail', caption: 'BMW wheel detail' },
  { src: '/images/fine-by-me-still.avif', alt: 'Fine By Me visual still', caption: 'Fine By Me' },
  { src: '/images/dusk-silhouette-two.avif', alt: 'Dusk silhouette with two figures', caption: 'Dusk silhouette' },
  { src: '/images/pilgrim-card.avif', alt: 'PILGRIM title card', caption: 'Pilgrim' },
  { src: '/images/red-bokeh-portrait.avif', alt: 'Red bokeh portrait', caption: 'Red bokeh' },
]

export default function FineXMeSection() {
  return (
    <>
      <section
        id="finexme"
        data-section-id="finexme"
        className="relative section-padding"
        aria-label="ACT I — FINExME"
      >
        {/* Ambient red glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          {/* Chapter label */}
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/80 block mb-6">
              Act I
            </span>
            <div className="relative w-64 md:w-80 h-12 md:h-16">
              <Image
                src="/images/logotype-finexme.png"
                alt="FINExME"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>

          {/* Manifesto text */}
          <div className="max-w-2xl mb-20 md:mb-28">
            <p className="font-display text-2xl md:text-3xl italic leading-relaxed text-[#f5e6e0]/90 mb-8">
              In today&rsquo;s R&amp;B landscape, men rarely make music that yearns anymore.
            </p>
            <p className="font-sans text-sm md:text-base leading-[1.8] text-[#f5e6e0]/60 max-w-[65ch]">
              FREE occupies the grey area where deflection meets self-reflection.
              FINExME is an exercise in romantic fatalism&mdash;seven tracks that circle
              the drain of a relationship with the kind of quiet obsession that makes you
              check your phone at 2AM knowing nothing good is coming. The production
              breathes in warm reds and amber, every beat a slow pulse in a room where
              someone just left.
            </p>
          </div>

          {/* Cover art */}
          <div className="relative mb-20 md:mb-28">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/images/finexme-cover.avif"
                alt="FINExME cover art"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
              <div className="absolute inset-0 vignette" />
            </div>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-20 md:mb-28">
            {GALLERY.map(({ src, alt, caption }) => (
              <div key={src} className="gallery-item aspect-[3/4]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="gallery-caption">
                  <span className="text-xs font-sans tracking-[0.1em] uppercase text-white/80">
                    {caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tracklist + Back cover */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-20 md:mb-28">
            {/* Tracklist */}
            <div>
              <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 mb-8">
                Tracklist
              </h3>
              <ol className="space-y-4">
                {TRACKLIST.map(({ num, title }) => (
                  <li key={num} className="flex items-baseline gap-4 group">
                    <span className="text-xs font-sans text-white/25 tabular-nums">{num}</span>
                    <span className="font-display text-lg md:text-xl italic text-[#f5e6e0]/80 group-hover:text-[#f5e6e0] transition-colors">
                      {title}
                    </span>
                    <span className="flex-1 border-b border-white/5" />
                  </li>
                ))}
              </ol>
            </div>

            {/* Back cover */}
            <div className="relative aspect-square">
              <Image
                src="/images/finexme-backcover.avif"
                alt="FINExME back cover"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 vignette" />
            </div>
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="text-xs font-sans tracking-[0.15em] uppercase text-white/25">
              Creative Minds Coalition 2024 / OWJV 2024
            </p>
          </div>
        </div>
      </section>

      {/* ANTE Transition */}
      <section
        id="threshold"
        data-section-id="threshold"
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        aria-label="ANTE — threshold between eras"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/ante-doorway.avif"
            alt="Stone archway — the threshold between eras"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505]/60 via-black/40 to-[#0f0f0f]/80" />
        </div>
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 text-center">
          <span className="font-display text-6xl md:text-8xl italic text-white/20 tracking-[0.2em]">
            ANTE
          </span>
        </div>
      </section>
    </>
  )
}
