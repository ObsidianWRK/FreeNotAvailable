# Multi-Route Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add streaming links to homepage tracklists, fix clips loading/descriptions, convert films to inline playback, make Revenue Streams expandable, and apply a design consistency audit.

**Architecture:** Five independent UI changes across 4 files, plus a cross-route design pass. Each task is self-contained. No shared state between tasks. All changes are client-side React components with Tailwind CSS and Motion animations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Motion 12, TypeScript 5.9

---

### Task 1: Streaming Links on FINExME Tracklist

**Files:**
- Modify: `components/sections/FineXMeSection.tsx`

**Context:** The tracklist is an `<ol>` at line 108 rendering `TRACKLIST` array items as `<li>` with track number, italic title, and a dotted leader line (`border-b border-white/5`). The component is a server component (no 'use client').

**Step 1: Update TRACKLIST data to include streaming URLs**

Replace lines 4-12 in `FineXMeSection.tsx`:

```tsx
const TRACKLIST = [
  { num: '01', title: 'Fine By Me', spotify: 'https://open.spotify.com/track/1bDsTY39ICcA0DlBkiFDDv', apple: 'https://music.apple.com/us/album/fine-by-me/1724039694?i=1724039695' },
  { num: '02', title: 'Twins', spotify: 'https://open.spotify.com/track/3gGDqcfkXGhC3djgbglAom', apple: 'https://music.apple.com/us/album/twins/1724039694?i=1724039696' },
  { num: '03', title: 'Chambers', spotify: 'https://open.spotify.com/track/0bSisXV76kUMxJSIMsUPbN', apple: 'https://music.apple.com/us/album/chambers/1724039694?i=1724039697' },
  { num: '04', title: 'Flo', spotify: 'https://open.spotify.com/track/7zGYtI2yueti0HpEKmQlni', apple: 'https://music.apple.com/us/album/flo/1724039694?i=1724039698' },
  { num: '05', title: 'Zodiac Killer', spotify: 'https://open.spotify.com/track/3R5F18TT6SwbV6a9bD1bkh', apple: 'https://music.apple.com/us/album/zodiac-killer/1724039694?i=1724039699' },
  { num: '06', title: 'Maybe', spotify: 'https://open.spotify.com/track/3JT3Oj6jsTS855v3Y2qazP', apple: 'https://music.apple.com/us/album/maybe/1724039694?i=1724039700' },
  { num: '07', title: 'Pilgrim', spotify: 'https://open.spotify.com/track/39JXoG0CZxHFRiWwg29zi4', apple: 'https://music.apple.com/us/album/pilgrim/1724039694?i=1724039701' },
]
```

> **Note:** Replace `SPOTIFY_URL` and `APPLE_URL` with real URLs from the streaming link research. If a track isn't on a platform, set that field to `null`.

**Step 2: Add inline streaming link icons to each track row**

Replace the tracklist `<ol>` (lines 108-118) with:

```tsx
<ol className="space-y-4">
  {TRACKLIST.map(({ num, title, spotify, apple }) => (
    <li key={num} className="flex items-baseline gap-4 group">
      <span className="text-xs font-sans text-[#c0392b]/40 tabular-nums">{num}</span>
      <span className="font-sans text-lg md:text-xl italic text-[#f5e6e0]/80 group-hover:text-[#f5e6e0] transition-colors">
        {title}
      </span>
      {/* Streaming icons — slide in on hover */}
      <span className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 md:ml-auto">
        {spotify && (
          <a
            href={spotify}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} on Spotify`}
            className="text-white/30 hover:text-[#1DB954] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
        )}
        {apple && (
          <a
            href={apple}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} on Apple Music`}
            className="text-white/30 hover:text-[#FC3C44] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525-.015 1.05-.04 1.573-.104.727-.088 1.433-.247 2.08-.594.91-.488 1.61-1.2 2.083-2.14.29-.576.447-1.19.536-1.82.07-.51.105-1.022.116-1.536.003-.076.01-.152.01-.228V6.124zm-3.4 8.636a3.44 3.44 0 01-1.972 3.072c-.6.283-1.23.39-1.893.39-.334 0-.667-.048-.99-.148-.383-.12-.737-.312-1.098-.493-.298-.149-.596-.297-.916-.39-.24-.07-.49-.091-.737-.047-.34.06-.654.2-.957.363-.393.21-.773.446-1.2.574-.504.153-1.016.19-1.534.076-.632-.14-1.17-.452-1.612-.925-.76-.812-1.127-1.79-1.143-2.893-.008-.543.088-1.074.3-1.577.494-1.173 1.373-1.914 2.565-2.26.77-.224 1.555-.28 2.35-.19.524.06 1.034.18 1.524.394.024.01.05.015.094.028V7.2c0-.088-.01-.176-.027-.263-.044-.218-.222-.37-.444-.368-.108.002-.217.016-.325.036-.296.054-.59.123-.884.188-.79.175-1.584.302-2.392.263a3.466 3.466 0 01-1.292-.288c-.35-.153-.638-.39-.836-.72-.1-.165-.155-.347-.155-.54.002-.396.002-.792.002-1.188V3.71c0-.064.003-.128.012-.192.038-.256.206-.423.46-.45.132-.014.265-.004.397.016.3.046.596.11.893.173.9.193 1.804.34 2.724.328.24-.003.48-.03.717-.076.168-.033.328-.092.466-.207.093-.077.138-.175.138-.3V2.78c0-.205.004-.41.01-.614.01-.256.19-.462.442-.492.147-.018.296-.012.443.007.27.035.536.094.802.155 1.07.244 2.14.432 3.234.374.1-.005.2-.023.297-.05.204-.056.33-.194.362-.404.012-.073.016-.148.016-.222V1.19c0-.09.007-.18.022-.268.04-.225.2-.378.427-.4.167-.015.336-.003.502.027.42.075.835.174 1.25.276l.157.04c.208.052.325.202.353.414.012.086.015.173.015.26V14.76z"/>
            </svg>
          </a>
        )}
      </span>
      <span className="flex-1 border-b border-white/5" />
    </li>
  ))}
</ol>
```

**Key design notes:**
- Icons are `opacity-0` by default, `group-hover:opacity-100` on row hover
- Spotify icon turns green (#1DB954) on icon hover, Apple icon turns red (#FC3C44)
- Icons have `shrink-0` so they don't compress
- `md:ml-auto` pushes icons right on desktop; on mobile they sit after the title
- Icons only render if URL is truthy (graceful degradation)
- `aria-label` on each link for screen readers

**Step 3: Handle mobile (always-visible icons)**

Add this CSS utility to `app/globals.css`:

```css
@media (hover: none) {
  .group .group-hover\:opacity-100 {
    opacity: 1;
  }
}
```

This makes streaming icons always visible on touch devices where hover isn't available.

**Step 4: Verify in dev server**

Run: `npm run dev`
Check: Homepage → scroll to FINExME tracklist → hover each track → icons should appear → click icons → opens streaming platform in new tab.

**Step 5: Commit**

```bash
git add components/sections/FineXMeSection.tsx app/globals.css
git commit -m "feat: add streaming link icons to FINExME tracklist"
```

---

### Task 2: Streaming Links on SINE NOCTIS Tracklist

**Files:**
- Modify: `components/sections/SineNoctisSection.tsx`

**Context:** Same pattern as Task 1. The tracklist is at line 107. SINE NOCTIS uses grey-white (`#d0d0d0`) instead of red.

**Step 1: Update TRACKLIST data**

Replace lines 4-8:

```tsx
const TRACKLIST = [
  { num: '01', title: 'Al B. Sure!/Donell Jones', spotify: null, apple: null },
  { num: '02', title: 'Van Gogh', spotify: null, apple: null },
  { num: '03', title: 'Thin Ice Freestyle', spotify: null, apple: null },
]
```

> **Note:** SINE NOCTIS is not available on any streaming platform (unreleased). No streaming icons will render for these tracks (graceful degradation). When SINE NOCTIS releases to DSPs, simply update the URLs.

**Step 2: Add inline streaming icons (same pattern, different hover color)**

Replace the tracklist `<ol>` at lines 107-117. Same structure as Task 1, but use `hover:text-white` instead of `hover:text-[#c0392b]` for icon hover to match the SINE NOCTIS greyscale aesthetic.

**Step 3: Verify in dev server**

Run: `npm run dev`
Check: Homepage → scroll to SINE NOCTIS tracklist → hover tracks → icons appear with grey-white hover.

**Step 4: Commit**

```bash
git add components/sections/SineNoctisSection.tsx
git commit -m "feat: add streaming link icons to SINE NOCTIS tracklist"
```

---

### Task 3: Films Inline Playback (Remove Modal)

**Files:**
- Modify: `app/films/page.tsx`

**Context:** Currently, clicking a film opens `VideoModal` (a fixed overlay at z-50 with YouTube iframe). The user wants inline embed: clicking swaps the thumbnail image for a YouTube iframe in the same card position.

**Step 1: Remove VideoModal component and page-level state**

Delete the `VideoModal` function (lines 99-167), the `activeVideo` state (line 301), `openVideo` callback (lines 303-305), `closeVideo` callback (lines 307-309), and the VideoModal render (lines 314-319).

**Step 2: Add per-card state to FilmCard**

Rewrite `FilmCard` to manage its own `playing` state:

```tsx
function FilmCard({
  title,
  role,
  description,
  image,
  alt,
  videoUrl,
  index,
  grayscale,
  accentColor,
}: {
  title: string
  role: string
  description: string
  image: string
  alt: string
  videoUrl?: string
  index: number
  grayscale?: boolean
  accentColor?: string
}) {
  const [playing, setPlaying] = useState(false)
  const isReversed = index % 2 !== 0
  const labelColor = accentColor ?? 'rgba(255,255,255,0.4)'

  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPlaying(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  const imageContent = (
    <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
      <div className="relative aspect-[16/10] overflow-hidden group">
        {playing && videoUrl ? (
          <>
            <iframe
              src={toEmbedUrl(videoUrl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            {/* Close button */}
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-3 right-3 z-10 text-white/50 hover:text-white transition-colors text-xs font-sans tracking-[0.2em] uppercase flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5"
              aria-label="Close video"
            >
              Close
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Image
              src={image}
              alt={alt}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${grayscale ? 'grayscale' : ''}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 vignette" />

            {/* Play overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col items-center gap-3 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                <PlayIcon />
                <span className="text-xs font-sans tracking-[0.2em] uppercase">
                  {videoUrl ? 'Watch' : 'Coming Soon'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index > 0 ? 'mt-24 md:mt-32' : ''
      }`}
    >
      {/* Image side */}
      {videoUrl && !playing ? (
        <button onClick={() => setPlaying(true)} className="block text-left w-full cursor-pointer" aria-label={`Watch ${title}`}>
          {imageContent}
        </button>
      ) : (
        imageContent
      )}

      {/* Text side */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        <span
          className="text-xs font-sans tracking-[0.2em] uppercase block mb-4"
          style={{ color: labelColor }}
        >
          {role}
        </span>
        <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl italic text-heading mb-6 tracking-wide">
          {videoUrl ? (
            <button onClick={() => setPlaying(true)} className="hover:text-[#c0392b] transition-colors duration-300 text-left cursor-pointer">
              {title}
            </button>
          ) : (
            title
          )}
        </h3>
        <p className="font-sans text-sm md:text-base leading-[1.85] text-muted max-w-[55ch]">
          {description}
        </p>
        {videoUrl && (
          playing ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs font-sans tracking-[0.15em] uppercase text-[#c0392b]/70 hover:text-[#c0392b] transition-colors"
            >
              Watch on YouTube
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </a>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="inline-flex items-center gap-2 mt-6 text-xs font-sans tracking-[0.15em] uppercase text-[#c0392b]/70 hover:text-[#c0392b] transition-colors cursor-pointer"
            >
              Watch Now
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </button>
          )
        )}
      </div>
    </article>
  )
}
```

**Step 3: Update FilmCard usage (remove onPlay prop)**

In the `FilmsPage` component, remove `onPlay` prop from all `<FilmCard>` calls. The card now manages its own playback state. Also remove `openVideo`/`closeVideo`/`activeVideo` state.

```tsx
export default function FilmsPage() {
  return (
    <div className="min-h-screen bg-canvas text-body">
      {/* ... hero stays the same ... */}

      {/* FINExME films */}
      {FINEXME_FILMS.map((film, i) => (
        <FilmCard
          key={film.slug}
          title={film.title}
          role={film.role}
          description={film.description}
          image={film.image}
          alt={film.alt}
          videoUrl={film.videoUrl}
          index={i}
          accentColor="rgba(192,57,43,0.8)"
        />
      ))}

      {/* SINE NOCTIS films — same pattern, add grayscale */}
      {SINENOCTIS_FILMS.map((film, i) => (
        <FilmCard
          key={film.slug}
          title={film.title}
          role={film.role}
          description={film.description}
          image={film.image}
          alt={film.alt}
          videoUrl={(film as Record<string, string>).videoUrl}
          index={i}
          grayscale
        />
      ))}
    </div>
  )
}
```

**Step 4: Verify in dev server**

Run: `npm run dev`
Check: /films → click any film thumbnail → YouTube embed appears in-place → Close button works → ESC key works → no layout shift → "Watch on YouTube" link appears when playing.

**Step 5: Commit**

```bash
git add app/films/page.tsx
git commit -m "feat: replace film modal with inline YouTube embed"
```

---

### Task 4: Clips — Verify Loading + Humanize Descriptions + Colored Italics + Source Links

**Files:**
- Modify: `app/clips/page.tsx`

**Context:** 6 clips with local `.mp4` files. Descriptions need humanizer pass. Need colored+italic emphasis words and source hyperlinks.

**Step 1: Add onError handler to video elements**

In `ClipCard`, update the `<video>` tag to include an error handler:

```tsx
<video
  src={clip.video}
  poster={clip.thumbnail}
  controls
  playsInline
  preload="metadata"
  onError={(e) => {
    const target = e.currentTarget
    target.style.display = 'none'
    const fallback = target.parentElement?.querySelector('.video-fallback')
    if (fallback) (fallback as HTMLElement).style.display = 'flex'
  }}
  className={`w-full h-full object-cover ${
    clip.era === 'sinenoctis' ? 'grayscale' : ''
  }`}
/>
<div className="video-fallback hidden absolute inset-0 items-center justify-center bg-black/80 text-white/40 text-xs font-sans tracking-wider uppercase">
  Video unavailable
</div>
```

**Step 2: Rewrite descriptions with humanizer pass + add colored italics + source links**

Replace the CLIPS array descriptions. Use `ReactNode` for descriptions instead of plain strings to support JSX. Update the type and each description:

```tsx
import { type ReactNode } from 'react'

// Update clip type to use ReactNode for description
type Clip = {
  id: string
  title: string
  description: ReactNode
  format: string
  duration: string
  platforms: readonly string[]
  era: 'finexme' | 'sinenoctis' | 'neutral'
  thumbnail: string
  video: string
  aspectClass: string
}

const CLIPS: readonly Clip[] = [
  {
    id: 'WelcomeHero',
    title: 'Welcome to the Other World',
    description: <>Crossfade cuts from all six films. Text fades in over silence. Thirty seconds to set the <em className="text-[#d4a574] italic">entire mythology</em> in motion.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/hero-cover.avif',
    video: '/clips/WelcomeHero.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FinexmeHighlight',
    title: 'FINExME Highlight',
    description: <>The red wash, the BMW, the night drives. <a href="/#finexme" className="text-[#c0392b] italic hover:underline">Act I</a> distilled into its sharpest thirty seconds.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'finexme',
    thumbnail: '/images/red-portrait.avif',
    video: '/clips/FinexmeHighlight.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'SineNoctisTeaser',
    title: 'SINE NOCTIS Teaser',
    description: <>The three-part descent: <a href="/films#ante" className="text-[#d0d0d0] italic hover:underline">ANTE</a>, <a href="/films#vespera" className="text-[#d0d0d0] italic hover:underline">VESPERA</a>, <a href="/films#noctem" className="text-[#d0d0d0] italic hover:underline">NOCTEM</a>. Greyscale cuts from the <em className="text-[#d0d0d0] italic">SINE NOCTIS</em> trilogy, recut for short-form.</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'sinenoctis',
    thumbnail: '/images/crouching-smoke.avif',
    video: '/clips/SineNoctisTeaser.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'ArtistIntro',
    title: 'Artist Introduction',
    description: <>Portrait footage over bio text. Detroit. The <em className="text-[#d4a574] italic">cold croon</em> of the early 2010s. Where deflection meets self-reflection.</>,
    format: '9:16 Vertical',
    duration: '45s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/jacket-portrait.avif',
    video: '/clips/ArtistIntro.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'Manifesto',
    title: 'The Manifesto',
    description: <>Full screen. One statement. Blurred background, minimal type. "<em className="text-[#d4a574] italic">Men rarely make music that yearns anymore.</em>"</>,
    format: '9:16 Vertical',
    duration: '30s',
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
    era: 'neutral',
    thumbnail: '/images/bokeh-night.avif',
    video: '/clips/Manifesto.mp4',
    aspectClass: 'aspect-[9/16]',
  },
  {
    id: 'FilmReel',
    title: 'Film Reel',
    description: <>Hard cuts, slow zoom, no text. Sixty seconds across all <a href="/films" className="text-[#d4a574] italic hover:underline">eleven source films</a>. Let the work speak.</>,
    format: '16:9 Landscape',
    duration: '60s',
    platforms: ['YouTube', 'Website'],
    era: 'neutral',
    thumbnail: '/images/fine-by-me-still.avif',
    video: '/clips/FilmReel.mp4',
    aspectClass: 'aspect-video',
  },
]
```

**Step 3: Verify in dev server**

Run: `npm run dev`
Check: /clips → all 6 videos load → descriptions are rewritten → colored words are italicized → source links work.

**Step 4: Commit**

```bash
git add app/clips/page.tsx
git commit -m "feat: humanize clip descriptions, add colored italics + source links"
```

---

### Task 5: Revenue Streams Expandable

**Files:**
- Modify: `app/ekthesis/page.tsx` (lines 401-421)

**Context:** The Revenue Streams section is a static `motion.div` with a 2-column grid of 8 items. Other sections (Platforms, Comparables, Case Studies) already use `<details>` elements. Match that pattern.

**Step 1: Wrap revenue streams in a details element**

Replace lines 401-421 (the `motion.div` containing Revenue Streams):

```tsx
<motion.div variants={fadeUp} custom={4}>
  <details className="group border border-white/10">
    <summary className="flex items-center gap-3 cursor-pointer p-6 md:p-10 select-none focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:outline-none">
      <span
        className="text-white/30 text-xs transition-transform duration-200 group-open:rotate-90"
        aria-hidden="true"
      >&#9654;</span>
      <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30">
        8 Revenue Streams — click to expand
      </span>
    </summary>
    <div className="px-6 md:px-10 pb-6 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
        {[
          'Streaming royalties (Spotify, Apple Music, TIDAL, etc.)',
          'YouTube ad revenue (long-form films)',
          'Sync licensing (TV, film, ads, games)',
          'Live performance / touring',
          'Merchandise (Other World IP-driven)',
          'Brand deals (music + visual content)',
          'Patreon / Bandcamp (direct fan support)',
          'Film festivals / platform acquisitions',
        ].map((s) => (
          <div key={s} className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0">
            <span className="text-accent/40 mt-0.5">+</span>
            <span className="font-sans text-xs text-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  </details>
</motion.div>
```

**Key details:**
- Uses `<details>` / `<summary>` (natively keyboard-accessible)
- `group-open:rotate-90` on the triangle chevron (matches existing pattern)
- `focus-visible:ring-1 focus-visible:ring-accent/50` for keyboard users
- Summary says "8 Revenue Streams — click to expand" (matches "8 platforms — click to expand" pattern)

**Step 2: Verify in dev server**

Run: `npm run dev`
Check: /ekthesis → scroll to Revenue Streams → starts collapsed → click to expand → chevron rotates → keyboard Tab + Enter works → focus ring visible.

**Step 3: Commit**

```bash
git add app/ekthesis/page.tsx
git commit -m "feat: make Revenue Streams section expandable"
```

---

### Task 6: Design Consistency Audit

**Files:**
- Modify: `app/globals.css` (if needed)
- Modify: `app/clips/page.tsx` (minor polish)
- Modify: `app/films/page.tsx` (minor polish)
- Modify: `components/sections/FineXMeSection.tsx` (if needed)
- Modify: `components/sections/SineNoctisSection.tsx` (if needed)

**Step 1: Audit and normalize these patterns across all touched files**

Checklist:
- [ ] All uppercase labels use `tracking-[0.2em]` consistently
- [ ] All hover transitions use `duration-300` (not mix of 200/300/700)
- [ ] All focus-visible elements have `focus-visible:ring-1 focus-visible:ring-accent/50`
- [ ] All `text-muted` elements have sufficient contrast against `bg-canvas`
- [ ] All border opacities use consistent scale (`border-white/5` for subtle, `border-white/10` for normal, `border-white/20` for emphasis)
- [ ] Typography spacing: consistent gap between section labels → headings → body text

**Step 2: Apply fixes found in audit**

Make the specific changes identified. Keep changes minimal — only fix actual inconsistencies, don't redesign.

**Step 3: Verify in dev server**

Run: `npm run dev`
Check all 4 routes: /, /clips, /films, /ekthesis — verify visual consistency.

**Step 4: Build check**

Run: `npm run build`
Expected: No errors, no warnings.

**Step 5: Commit**

```bash
git add -A
git commit -m "style: normalize design consistency across routes"
```

---

### Task 7: Final Verification + Dogfooding

**Step 1: Run the full dev server and manually verify each acceptance criterion:**

- [ ] Homepage: FINExME tracklist — hover shows Spotify + Apple Music icons
- [ ] Homepage: SINE NOCTIS tracklist — hover shows streaming icons
- [ ] /clips: All 6 clips load and play
- [ ] /clips: Descriptions are rewritten, specific, human
- [ ] /clips: Colored emphasis words are also italicized
- [ ] /clips: Source references are hyperlinked
- [ ] /films: Click film → inline YouTube embed (no modal)
- [ ] /films: Close button + ESC key returns to thumbnail
- [ ] /films: No layout shift during embed swap
- [ ] /ekthesis: Revenue Streams expands on click
- [ ] /ekthesis: Keyboard accessible (Tab + Enter)
- [ ] Cross-route: Design consistency verified

**Step 2: Build passes**

Run: `npm run build`
Expected: Clean build, no errors.
