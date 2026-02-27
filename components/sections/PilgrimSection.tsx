import Image from 'next/image'
import FadeInView from '@/components/ui/FadeInView'

const GALLERY = [
  { src: '/images/pilgrim-snow-1.avif', alt: 'Pilgrim in snow — silhouette', caption: 'Snow I' },
  { src: '/images/pilgrim-snow-2.avif', alt: 'Pilgrim in snow — crouching', caption: 'Snow II' },
  { src: '/images/pilgrim-snow-3.avif', alt: 'Pilgrim in snow — standing', caption: 'Snow III' },
  { src: '/images/pilgrim-snow-4.avif', alt: 'Pilgrim in snow — action', caption: 'Snow IV' },
]

export default function PilgrimSection() {
  return (
    <section
      id="pilgrim"
      data-section-id="pilgrim"
      className="relative section-padding"
      aria-label="PILGRIM"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Chapter label */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs font-pixel tracking-[0.2em] uppercase text-[#8899aa]/80 block mb-6">
            Interlude
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl italic text-[#e0e8f0] tracking-wide">
            Pilgrim
          </h2>
        </div>

        {/* Description */}
        <FadeInView className="max-w-2xl mb-20 md:mb-28">
          <p className="font-sans text-sm md:text-base leading-[1.8] text-[#e0e8f0]/60 max-w-[65ch]">
            The unseen final chapter. By Pilgrim, FREE is spiritually dead &mdash; destroyed
            by his indulgence. Whether that death is literal or emotional is left ambiguous.
            The snow becomes the negative space where consequence finally arrives.
          </p>
        </FadeInView>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-20 md:mb-28">
          {GALLERY.map(({ src, alt, caption }) => (
            <div key={src} className="gallery-item aspect-[3/4]">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              <div className="gallery-caption">
                <span className="text-xs font-sans tracking-[0.1em] uppercase text-white/80">
                  {caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
