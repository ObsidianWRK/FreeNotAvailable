import Image from 'next/image'

const TRACKLIST = [
  { num: '01', title: 'Al B. Sure!/Donell Jones' },
  { num: '02', title: 'Van Gogh' },
  { num: '03', title: 'Thin Ice Freestyle' },
]

const GALLERY = [
  { src: '/images/jacket-portrait.avif', alt: 'Alpinestars jacket portrait in B&W', caption: 'Jacket portrait' },
  { src: '/images/jacket-closeup.avif', alt: 'Jacket close-up detail', caption: 'Jacket detail' },
  { src: '/images/bmw-dusk.avif', alt: 'BMW at dusk, blue-grey silhouette', caption: 'BMW at dusk' },
  { src: '/images/crouching-smoke.avif', alt: 'Crouching figure in smoke', caption: 'Smoke' },
  { src: '/images/sn-street-1.avif', alt: 'SINE NOCTIS street scene', caption: 'Street scene' },
  { src: '/images/sn-architecture.avif', alt: 'European architecture at night', caption: 'Architecture' },
  { src: '/images/seated-pendant.avif', alt: 'Seated figure under pendant light', caption: 'Pendant light' },
  { src: '/images/bokeh-night.avif', alt: 'Bokeh night photography', caption: 'Bokeh night' },
]

export default function SineNoctisSection() {
  return (
    <section
      id="sinenoctis"
      data-section-id="sinenoctis"
      className="relative section-padding"
      aria-label="ACT II — SINE NOCTIS"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Chapter label */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/80 block mb-6">
            Act II
          </span>
          <div className="relative w-72 md:w-96 h-12 md:h-16">
            <Image
              src="/images/logotype-sinenoctis.png"
              alt="SINE NOCTIS"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 288px, 384px"
            />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-20 md:mb-28">
          <p className="font-display text-2xl md:text-3xl italic leading-relaxed text-[#e8e8e8]/90 mb-8">
            Without the night, there is nothing.
          </p>
          <p className="font-sans text-sm md:text-base leading-[1.8] text-[#d0d0d0]/60 max-w-[65ch]">
            SINE NOCTIS strips the color away entirely. Where FINExME burned in
            reds and ambers, this is all negative space and halogen wash&mdash;European
            streets shot in monochrome, a leather jacket as armor, smoke curling
            in empty corridors. The EP is a nocturnal dispatch from the far side
            of consequence, three tracks that move like someone walking home alone
            through a city that doesn&rsquo;t know their name.
          </p>
        </div>

        {/* Gallery grid — all grayscale */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-20 md:mb-28">
          {GALLERY.map(({ src, alt, caption }, index) => (
            <div
              key={src}
              className={`gallery-item ${
                index === 0 || index === 3
                  ? 'aspect-[3/4] md:row-span-2'
                  : 'aspect-square'
              }`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover grayscale hover:grayscale-[0.7] transition-all duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
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
          {/* Back cover */}
          <div className="relative aspect-square order-2 md:order-1">
            <Image
              src="/images/sinenoctis-backcover.avif"
              alt="SINE NOCTIS back cover"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 vignette" />
          </div>

          {/* Tracklist */}
          <div className="order-1 md:order-2">
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[#c0392b]/70 mb-8">
              Tracklist
            </h3>
            <ol className="space-y-4 mb-12">
              {TRACKLIST.map(({ num, title }) => (
                <li key={num} className="flex items-baseline gap-4 group">
                  <span className="text-xs font-sans text-[#c0392b]/40 tabular-nums">{num}</span>
                  <span className="font-display text-lg md:text-xl italic text-[#e8e8e8]/80 group-hover:text-[#e8e8e8] transition-colors">
                    {title}
                  </span>
                  <span className="flex-1 border-b border-white/5" />
                </li>
              ))}
            </ol>

            {/* LONG LIVE WORST CHOICE dedication */}
            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="font-display text-xl md:text-2xl italic text-white/30 tracking-wide">
                LONG LIVE WORST CHOICE
              </p>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center">
          <p className="text-xs font-sans tracking-[0.15em] uppercase text-white/20">
            Creative Minds Coalition 2026 / OWJV 2026
          </p>
        </div>
      </div>
    </section>
  )
}
