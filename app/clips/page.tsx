import Image from 'next/image'

const CLIPS = [
  {
    id: 'WelcomeHero',
    title: 'Welcome to the Other World',
    description: 'Hero montage. Crossfade cuts across six films, text overlay fades in. Sets the tone for the entire universe.',
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral' as const,
    thumbnail: '/images/hero-cover.avif',
    video: '/clips/WelcomeHero.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FinexmeHighlight',
    title: 'FINExME Highlight',
    description: 'Best moments from the FINExME era. Red color wash, warm tones, the BMW, the night drives. Act I distilled.',
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'finexme' as const,
    thumbnail: '/images/red-portrait.avif',
    video: '/clips/FinexmeHighlight.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'SineNoctisTeaser',
    title: 'SINE NOCTIS Teaser',
    description: 'The descent into greyscale. ANTE, VESPERA, NOCTEM — the three-part SINE NOCTIS trilogy cut for short-form.',
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'sinenoctis' as const,
    thumbnail: '/images/crouching-smoke.avif',
    video: '/clips/SineNoctisTeaser.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'ArtistIntro',
    title: 'Artist Introduction',
    description: 'Who is FREE? Bio text over portrait footage. The cold croon of the early 2010s. Detroit. The space where deflection meets self-reflection.',
    format: '9:16 Vertical',
    duration: '45s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral' as const,
    thumbnail: '/images/jacket-portrait.avif',
    video: '/clips/ArtistIntro.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'Manifesto',
    title: 'The Manifesto',
    description: 'One statement. Full screen. "Men rarely make music that yearns anymore." Blurred background, minimal type treatment.',
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral' as const,
    thumbnail: '/images/bokeh-night.avif',
    video: '/clips/Manifesto.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FilmReel',
    title: 'Film Reel',
    description: 'Quick-cut showreel across all eleven source videos. Hard cuts, slow zoom, no text. Let the work speak.',
    format: '16:9 Landscape',
    duration: '60s',
    platforms: ['YouTube', 'Website'],
    era: 'neutral' as const,
    thumbnail: '/images/fine-by-me-still.avif',
    video: '/clips/FilmReel.mp4',
    aspectClass: 'aspect-video',
  },
] as const

function ClipCard({ clip }: { clip: typeof CLIPS[number] }) {
  const borderColor = clip.era === 'finexme'
    ? 'border-[#c0392b]/30 hover:border-[#c0392b]/60'
    : clip.era === 'sinenoctis'
      ? 'border-white/10 hover:border-white/30'
      : 'border-[#d4a574]/20 hover:border-[#d4a574]/50'

  const accentColor = clip.era === 'finexme'
    ? 'text-[#c0392b]'
    : clip.era === 'sinenoctis'
      ? 'text-[#d0d0d0]'
      : 'text-[#d4a574]'

  return (
    <div className={`border ${borderColor} transition-colors duration-300 group`}>
      {/* Video Player */}
      <div className={`relative ${clip.aspectClass} overflow-hidden bg-black`}>
        <video
          src={clip.video}
          poster={clip.thumbnail}
          controls
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover ${
            clip.era === 'sinenoctis' ? 'grayscale' : ''
          }`}
        />
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-sans text-lg text-heading">{clip.title}</h3>
          <span className={`text-[10px] font-sans tracking-[0.2em] uppercase ${accentColor} shrink-0 ml-3`}>
            {clip.duration}
          </span>
        </div>
        <p className="font-sans text-sm text-muted leading-relaxed mb-4">{clip.description}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2">
          {clip.platforms.map((platform) => (
            <span
              key={platform}
              className="text-[10px] font-sans tracking-[0.15em] uppercase text-white/30 border border-white/10 px-2 py-1"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ClipsPage() {
  return (
    <div className="bg-canvas min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-12 md:pb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cover.avif"
            alt=""
            fill
            className="object-cover object-center opacity-10"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-canvas/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 w-full">
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#d4a574] block mb-4">
            Short-Form Content
          </span>
          <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-heading mb-4">
            Clips
          </h1>
          <p className="font-sans text-sm text-muted max-w-lg">
            Six compositions for TikTok, Instagram, and YouTube.
            Each clip draws from the Other World film catalog.
          </p>
        </div>
      </section>

      {/* Film Reel - Full Width Feature */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 mb-12">
        <div className="border border-[#d4a574]/20">
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              src="/clips/FilmReel.mp4"
              poster="/images/fine-by-me-still.avif"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-sans text-lg text-heading">Film Reel</h3>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#d4a574]">16:9 / 60s</span>
            </div>
            <p className="font-sans text-sm text-muted">Quick-cut showreel across all eleven source videos. Hard cuts, slow zoom, no text. Let the work speak.</p>
          </div>
        </div>
      </section>

      {/* Vertical Clips Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <h2 className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 mb-8">Vertical Clips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIPS.filter(c => c.id !== 'FilmReel').map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))}
        </div>
      </section>

    </div>
  )
}
