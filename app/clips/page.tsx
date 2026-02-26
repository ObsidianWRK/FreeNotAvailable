import Image from 'next/image'
import Footer from '@/components/layout/Footer'

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
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={clip.thumbnail}
          alt={`${clip.title} — preview`}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            clip.era === 'sinenoctis' ? 'grayscale' : ''
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`text-[10px] font-sans tracking-[0.2em] uppercase ${accentColor}`}>
            {clip.format} / {clip.duration}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <h3 className="font-sans text-lg text-heading mb-2">{clip.title}</h3>
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
            Six compositions built with Remotion for TikTok, Instagram, and YouTube.
            Each clip draws from the Other World film catalog — different cuts, different expositions, same universe.
          </p>
        </div>
      </section>

      {/* Clips Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CLIPS.map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))}
        </div>

        {/* Render Instructions */}
        <div className="mt-16 border border-white/10 p-6 md:p-8">
          <h2 className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 mb-4">How to Render</h2>
          <div className="font-mono text-xs text-muted space-y-3">
            <p>
              <span className="text-white/50">1.</span>{' '}
              Preview in Remotion Studio:{' '}
              <code className="text-[#d4a574] bg-white/5 px-1.5 py-0.5">cd remotion && npx remotion studio</code>
            </p>
            <p>
              <span className="text-white/50">2.</span>{' '}
              Render all clips:{' '}
              <code className="text-[#d4a574] bg-white/5 px-1.5 py-0.5">cd remotion && bash render-all.sh</code>
            </p>
            <p>
              <span className="text-white/50">3.</span>{' '}
              Render a single clip:{' '}
              <code className="text-[#d4a574] bg-white/5 px-1.5 py-0.5">npx remotion render src/index.ts WelcomeHero --codec=h264 --crf=18</code>
            </p>
          </div>
          <p className="font-sans text-[10px] text-white/20 mt-4">
            Output: H.264, CRF 18, AAC 320kbps, 30fps. Max 3 concurrent renders. Source videos required in remotion/assets/.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
