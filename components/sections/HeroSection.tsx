import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-section-id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Welcome"
    >
      {/* Background cover image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cover.avif"
          alt="FREE — FINExME and SINE NOCTIS"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette" />

      {/* FREE wordmark */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-48 md:w-64 h-16 md:h-24">
          <Image
            src="/images/logotype-free.png"
            alt="FREE"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
        <p className="font-display text-lg md:text-xl italic text-white/60 tracking-wide">
          Welcome to the Other World
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
