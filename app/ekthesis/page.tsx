'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

/* ─── Animation helpers ─── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─── Reusable section ─── */
function Section({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode
  id: string
  className?: string
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className={`relative section-padding border-t border-white/5 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">{children}</div>
    </motion.section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      custom={0}
      className="text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-6"
    >
      {children}
    </motion.span>
  )
}

function SectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.h2
      variants={fadeUp}
      custom={1}
      className={`font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-12 ${className}`}
    >
      {children}
    </motion.h2>
  )
}

/* ─── Stat ─── */
function Stat({ value, label, accent, i = 0 }: { value: string; label: string; accent?: boolean; i?: number }) {
  return (
    <motion.div variants={fadeUp} custom={i}>
      <span className={`block font-display text-4xl md:text-5xl ${accent ? 'text-accent' : 'text-heading'}`}>
        {value}
      </span>
      <span className="font-sans text-xs text-muted mt-2 block">{label}</span>
    </motion.div>
  )
}

/* ─── Comp row ─── */
function CompRow({
  name,
  detail,
  relevance,
  i = 0,
}: {
  name: string
  detail: string
  relevance: string
  i?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-3 md:gap-8 py-5 border-b border-white/5 last:border-0"
    >
      <div className="font-display text-base text-heading">{name}</div>
      <div className="font-sans text-xs text-muted leading-relaxed">{detail}</div>
      <div className="font-mono text-xs text-white/50 leading-relaxed italic">{relevance}</div>
    </motion.div>
  )
}

/* ─── Revenue row ─── */
function RevenueRow({
  stream,
  conservative,
  base,
  aggressive,
  i = 0,
}: {
  stream: string
  conservative: string
  base: string
  aggressive: string
  i?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 last:border-0 text-sm"
    >
      <div className="font-sans text-muted">{stream}</div>
      <div className="font-mono text-white/40 text-right">{conservative}</div>
      <div className="font-mono text-heading text-right">{base}</div>
      <div className="font-mono text-accent text-right">{aggressive}</div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════ */
/*  EKTHESIS PAGE                              */
/* ═══════════════════════════════════════════ */
export default function EkthesisPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <main className="bg-canvas min-h-screen">
      {/* ─── 1. TITLE ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="relative w-10 h-10 mb-12"
        >
          <Image src="/images/owjv-cherub.png" alt="OWJV emblem" fill className="object-contain" sizes="40px" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-tight text-heading text-center"
        >
          EKTHESIS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-mono text-[clamp(0.75rem,2vw,1rem)] text-muted mt-6 text-center tracking-wider"
        >
          Ἔκθεσις — A proposition for the Other World
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-14 bg-white/20"
          />
        </motion.div>
      </motion.section>

      {/* ─── 2. THE ARTIST ─── */}
      <Section id="artist" className="overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cover.avif"
            alt="FREE in shadow, partially obscured face, the Faceless Man"
            fill
            className="object-cover object-center opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/70 to-canvas" />
        </div>
        <div className="relative z-10">
          <SectionLabel>The Artist</SectionLabel>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-3xl md:text-5xl italic text-heading leading-[1.05] max-w-[24ch] mb-12"
          >
            In today&rsquo;s R&amp;B landscape, men rarely make music that{' '}
            <span className="text-accent">yearns</span> anymore.
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="font-sans text-sm md:text-base leading-[1.8] text-muted max-w-[60ch] space-y-5 mb-12">
            <p>
              In 2026, we&rsquo;re just as bruised, conflicted, and love-worn as our female counterparts.
              Heartbreak is universal. Duality sits at the core of everyone navigating love and life.
            </p>
            <p>
              As a songwriter, FREE thrives in that grey area where deflection meets self-reflection.
              His sound doesn&rsquo;t chase the glossy nostalgia of old-school love ballads, but embraces
              the cold croon of the early 2010s &mdash; a shadowy echo that still resonates today.
            </p>
            <p>
              A product of the &rsquo;90s &mdash; particularly the Jodeci era &mdash; with a millennial viewpoint.
              Emotions move beyond eras, looping endlessly through time.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={3} className="flex items-baseline gap-4">
            <span className="font-display text-5xl md:text-6xl text-accent">10</span>
            <span className="font-sans text-sm text-muted">
              released tracks across 2 projects &mdash; FINExME &amp; SINE NOCTIS
            </span>
          </motion.div>
        </div>
      </Section>

      {/* ─── 3. THE MYTHOS ─── */}
      <Section id="mythos">
        <SectionLabel>The Mythos</SectionLabel>
        <SectionTitle>Other World</SectionTitle>
        <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-16">
          Each project is a self-contained Greek-style tale about FREE, whose love life and vices
          replay the Prometheus myth in modern, nocturnal settings. Every era is a new &ldquo;night-world&rdquo;
          with its own armor, color grade, and emotional weather.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {[
            { title: 'FREE = Prometheus', body: 'In every project, he overindulges in intimacy of the body while neglecting intimacy of mind and spirit, repeating the same core sin until it kills him and triggers reincarnation into a new version of himself.' },
            { title: 'The Lady in Black = The Eagle', body: 'She is the executor of consequence rather than a villain. Her face and identity are not highlighted as much as the pattern she represents: the way his own choices come back to devour him.' },
            { title: 'Eternal Return', body: 'No matter how the details change \u2014 the women, the city, the car, the jacket \u2014 the end result is always the same: Prometheus meets his demise again at the beak of his own choices.' },
          ].map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} custom={i + 3}>
              <span className="text-xs font-sans tracking-[0.15em] uppercase text-accent/70 block mb-3">{item.title}</span>
              <p className="font-sans text-xs text-muted leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} custom={6} className="border border-white/10 p-6 md:p-10">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Visual Law</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-xs text-muted leading-relaxed">
            <div><span className="text-heading">Intimacy vs Distance</span> &mdash; Bodies are close but faces are obscured. The camera is a spy.</div>
            <div><span className="text-heading">Voyeurism</span> &mdash; Long lenses, over-the-shoulder angles, silhouettes, reflections, partial occlusions.</div>
            <div><span className="text-heading">Reincarnation Cues</span> &mdash; Each era swaps his armor while retaining shared DNA: night settings, partial visibility, ambiguous urban locations.</div>
            <div><span className="text-heading">No Text on Covers</span> &mdash; Art alone must communicate the story. Each cover forms part of a cohesive visual anthology.</div>
          </div>
        </motion.div>
      </Section>

      {/* ─── 4. THE WORK ─── */}
      <Section id="work">
        <SectionLabel>The Work</SectionLabel>
        <SectionTitle>Released Projects</SectionTitle>

        <div className="space-y-16 mb-20">
          {/* FINExME */}
          <motion.div variants={fadeUp} custom={2} className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-40 h-40 shrink-0">
              <Image src="/images/finexme-cover.avif" alt="FINExME album cover \u2014 vibrant reds and neon accents, shadow work" fill className="object-cover" sizes="160px" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-36 h-10">
                  <Image src="/images/logotype-finexme.png" alt="FINExME" fill className="object-contain object-left" sizes="144px" />
                </div>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-accent">Act I &mdash; 2024</span>
              </div>
              <p className="font-sans text-sm leading-[1.8] text-muted mb-3">
                A collection of demos, sequenced into a cohesive narrative. 7 tracks. Vibrant reds
                and neon accents against shadow work. Passion and rawness, unpolished on purpose.
              </p>
              <div className="font-mono text-xs text-white/30 space-y-1">
                <div>Production: Mookie Magnolia, Ashton Woods, Worst Choice, Brando Heat</div>
                <div>Focal motif: The BMW (movement and identity)</div>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="https://open.spotify.com/album/7qa4temn9cmuwiSPTwbf8c" target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 hover:text-accent transition-colors">Spotify</a>
                <a href="https://music.apple.com/us/album/finexme/1724039694" target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 hover:text-accent transition-colors">Apple Music</a>
              </div>
            </div>
          </motion.div>

          {/* SINE NOCTIS */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-40 h-40 shrink-0">
              <Image src="/images/jacket-portrait.avif" alt="FREE in the SINE NOCTIS era \u2014 grayscale, Alpinestars jacket, alone" fill className="object-cover grayscale" sizes="160px" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative w-36 h-10">
                  <Image src="/images/logotype-sinenoctis.png" alt="SINE NOCTIS" fill className="object-contain object-left" sizes="144px" />
                </div>
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40">Act II &mdash; 2024/2026</span>
              </div>
              <p className="font-sans text-sm leading-[1.8] text-muted mb-3">
                The icy follow-up to 2024&rsquo;s steamy FINExME. Three tracks. Grayscale. Alone this time.
                Stillness on the surface, something heavier underneath.
              </p>
              <div className="font-mono text-xs text-white/30 space-y-1">
                <div>Production: FREE, HNMadeThisOne, Eli Myles, Ashton Woods</div>
                <div>Focal motif: The Alpinestars Jacket (shelter and resilience)</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Film content */}
        <motion.div variants={fadeUp} custom={4} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/10 p-6">
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-accent/60 block mb-3">Film</span>
            <span className="font-display text-lg text-heading block mb-2">Fine By Me Film</span>
            <p className="font-sans text-xs text-muted leading-relaxed">
              A short film set at an ambiguous gravel lot by water near Detroit&rsquo;s Ambassador Bridge.
              The white BMW acts as his chariot through this night-world.
            </p>
          </div>
          <div className="border border-white/10 p-6">
            <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 block mb-3">Trailers</span>
            <span className="font-display text-lg text-heading block mb-2">SINE NOCTIS Visual Series</span>
            <p className="font-sans text-xs text-muted leading-relaxed">
              ANTE (the doorway), VESPERA (the dusk walk), NOCTEM (the night plunge) &mdash; a three-part
              descent leading into the full visual for VAN GOGH and THIN ICE FREESTYLE.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ─── 5. THE MARKET ─── */}
      <Section id="market">
        <SectionLabel>The Market</SectionLabel>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-display text-3xl md:text-4xl lg:text-5xl italic text-heading leading-[1.05] max-w-[26ch] mb-6"
        >
          R&amp;B is the largest genre ecosystem in America
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-16">
          Combined R&amp;B/Hip-Hop has held the #1 genre position in US music consumption every year
          since 2017. R&amp;B standalone holds about 10-11% &mdash; a stable, loyal audience that is
          underserved on digital platforms relative to its actual popularity.
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          <Stat value="$29.6B" label="Global recorded music 2024" accent i={3} />
          <Stat value="752M" label="Global paid streaming subscribers" i={4} />
          <Stat value="$3.2B" label="US R&B/Hip-Hop revenue (est.)" i={5} />
          <Stat value="27.7%" label="#1 genre share since 2017" accent i={6} />
        </div>

        <motion.div variants={fadeUp} custom={7} className="border border-white/10 p-6 md:p-10 mb-12">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Who Listens</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-display text-3xl text-accent block">36%</span>
              <span className="font-sans text-xs text-muted mt-1 block">of Millennials prefer R&amp;B/Soul</span>
            </div>
            <div>
              <span className="font-display text-3xl text-heading block">30%</span>
              <span className="font-sans text-xs text-muted mt-1 block">of Gen Z stream R&amp;B on Spotify (4th most popular)</span>
            </div>
            <div>
              <span className="font-display text-3xl text-heading block">38.9%</span>
              <span className="font-sans text-xs text-muted mt-1 block">of US respondents self-report listening to R&amp;B/Soul</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value="$5B+" label="Indie earnings on Spotify 2024 (~50% of all royalties)" i={8} />
          <Stat value="1,500" label="Artists earning $1M+ on Spotify" i={9} />
          <Stat value="$131K" label="10,000th-ranked artist annual earnings" i={10} />
          <Stat value="75%" label="TikTok users discover music on platform" accent i={11} />
        </div>
      </Section>

      {/* ─── 6. THE GAP ─── */}
      <Section id="gap">
        <SectionLabel>The Gap</SectionLabel>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-display text-4xl md:text-5xl lg:text-6xl italic text-heading leading-[0.95] mb-16"
        >
          Why <span className="text-accent">Now</span>
        </motion.h2>

        <div className="space-y-8">
          {[
            { num: '01', title: 'R&B is under-invested relative to its audience loyalty', body: 'R\u2019B standalone holds 10-11% of consumption, yet receives less label investment than hip-hop or pop. White space for distinctive artists.' },
            { num: '02', title: 'Independent artists are winning', body: 'Indie artists earned $5B+ on Spotify alone in 2024. The tools, distribution, and economics have never been more favorable for unsigned artists.' },
            { num: '03', title: 'Discovery has decentralized', body: 'TikTok, algorithmic playlists, and social platforms mean an artist no longer needs a label\u2019s radio machine. A visual/narrative hook is what the algorithm rewards.' },
            { num: '04', title: 'Visual storytelling is a competitive moat', body: 'R&B\u2019s emotional range pairs well with cinematic content. Audio-only artists can\u2019t compete for brand deals and sync placements the same way.' },
            { num: '05', title: 'Fan-direct economics favor depth over breadth', body: 'With Bandcamp (82% to artist), Patreon ($10B+ paid out), and D2C merch, an artist with 1,000-5,000 deeply engaged fans can generate meaningful revenue.' },
            { num: '06', title: 'Detroit\u2019s Motown legacy', body: 'The city that built Motown. That still means something, globally. And it gives FREE a story no one else can claim.' },
          ].map((item, i) => (
            <motion.div key={item.num} variants={fadeUp} custom={i + 2} className="flex gap-6 items-start">
              <span className="font-mono text-sm text-accent/30 shrink-0 w-8">{item.num}</span>
              <div>
                <span className="font-sans text-sm text-heading font-medium block">{item.title}</span>
                <span className="font-sans text-xs text-muted leading-relaxed mt-1 block">{item.body}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── 7. THE MODEL ─── */}
      <Section id="model">
        <SectionLabel>The Model</SectionLabel>
        <SectionTitle className="max-w-[24ch]">Music &times; Film</SectionTitle>
        <motion.p variants={fadeUp} custom={2} className="font-display text-xl md:text-2xl italic text-heading/80 max-w-[36ch] mb-16 leading-snug">
          Every project is a Greek vignette. Every song is a scene. Every album is a season.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { label: 'Create', desc: 'Original music scored to narrative short films. Each film is a living sync demo reel.', color: 'text-accent' },
            { label: 'Circulate', desc: 'Films play festivals, YouTube, social. Music supervisors see the music working in visual context.', color: 'text-heading' },
            { label: 'Convert', desc: 'External sync inquiries follow. Brand partnerships emerge. Fans deepen through multi-format engagement.', color: 'text-heading' },
            { label: 'Compound', desc: 'Revenue funds more production. Growing catalog creates more licensing opportunities. The IP appreciates.', color: 'text-heading' },
          ].map((step) => (
            <div key={step.label} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
              <span className={`text-xs font-sans tracking-[0.15em] uppercase block mb-3 ${step.color}`}>{step.label}</span>
              <p className="font-sans text-xs text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Revenue stack per film */}
        <motion.div variants={fadeUp} custom={4} className="border border-white/10 p-6 md:p-10">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Revenue Stack per Film</span>
          <div className="space-y-2 text-sm">
            {[
              { stream: 'Festival prizes', range: '$0 \u2013 $10K' },
              { stream: 'YouTube ad revenue (1M+ views)', range: '$3K \u2013 $7K' },
              { stream: 'Platform acquisition', range: '$5K \u2013 $150K' },
              { stream: 'Brand sponsorship', range: '$25K \u2013 $200K+' },
              { stream: 'Film grants', range: '$10K \u2013 $50K' },
              { stream: 'Music streaming royalties', range: '$1K \u2013 $10K+' },
              { stream: 'Sync licensing', range: '$5K \u2013 $50K+' },
            ].map((item) => (
              <div key={item.stream} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                <span className="font-sans text-xs text-muted">{item.stream}</span>
                <span className="font-mono text-xs text-heading">{item.range}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 mt-2 border-t border-white/10">
              <span className="font-sans text-sm text-heading font-medium">Optimistic total</span>
              <span className="font-display text-lg text-accent">$50K &ndash; $300K+</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ─── 8. THE LANDSCAPE ─── */}
      <Section id="landscape">
        <SectionLabel>The Landscape</SectionLabel>
        <SectionTitle>Comparables</SectionTitle>
        <motion.p variants={fadeUp} custom={2} className="font-sans text-sm leading-[1.8] text-muted max-w-[60ch] mb-12">
          Nobody else is doing exactly this: male R&amp;B vulnerability, independent ownership,
          narrative IP from day one, and Detroit roots. That gap is the opportunity.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="hidden md:grid grid-cols-[160px_1fr_1fr] gap-8 pb-3 border-b border-white/10 text-xs font-sans tracking-[0.15em] uppercase text-white/30">
          <div>Artist</div>
          <div>Model</div>
          <div>Relevance to FREE</div>
        </motion.div>

        <CompRow name="Beyonc&eacute;" detail="Visual albums (Lemonade 4x Plat, Black Is King). Self-distributed concert film ($44M). Platform-exclusive premieres." relevance="Gold standard for visual album as narrative IP. FREE echoes this at indie scale." i={4} />
        <CompRow name="The Weeknd" detail="Multi-album cinematic universe (After Hours 3x Plat / Dawn FM / Hurry Up Tomorrow). HBO series. Feature film." relevance="Most direct comp for serialized narrative. Proves male R&B supports cinematic world-building." i={5} />
        <CompRow name="Brent Faiyaz" detail="Fully independent. Wasteland debuted #2 Billboard via Lost Kids label. Platinum. Owns masters." relevance="Most direct independent male R&B comp. Proved indie structure works commercially." i={6} />
        <CompRow name="Frank Ocean" detail="Visual album as contract escape. Blonde Platinum on Boys Don't Cry label. Limited-edition magazine." relevance="Template for visual content as strategy. FREE's creative bible parallels Ocean's magazine." i={7} />
        <CompRow name="Childish Gambino" detail="Album + screenplay + free short film. Because the Internet led to Atlanta (FX). This Is America: Diamond." relevance="Closest blueprint for free short film + written narrative as IP funnel." i={8} />
        <CompRow name="Daniel Caesar" detail="Independent via Golden Child Recordings. Get You 7x Platinum." relevance="Direct comp for indie male R&B vulnerability lane." i={9} />
        <CompRow name="SZA" detail="SOS 8x Platinum. Cohesive visual identity with ocean motifs." relevance="Shows visual cohesion drives fan engagement." i={10} />
        <CompRow name="Tyler, the Creator" detail="Music + Golf Wang fashion + Camp Flog Gnaw festival + animation. Owns masters." relevance="Artist-as-ecosystem. Each album gets distinct visual world." i={11} />

        <motion.div variants={fadeUp} custom={12} className="mt-10 border border-accent/20 bg-accent/5 p-6">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-accent block mb-2">The White Space</span>
          <p className="font-sans text-xs text-muted leading-relaxed">
            Most of these artists are on major labels, lean hip-hop, or don&rsquo;t have narrative IP baked in from the start.
            FREE built the Other World universe before the first track dropped. Independent. Male R&amp;B. Visual mythology
            from day one. That combination doesn&rsquo;t exist yet.
          </p>
        </motion.div>
      </Section>

      {/* ─── 9. PROJECTIONS ─── */}
      <Section id="projections">
        <SectionLabel>Projections</SectionLabel>
        <SectionTitle>Revenue Path</SectionTitle>

        {/* Year 1 */}
        <motion.div variants={fadeUp} custom={2} className="mb-16">
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Year 1 &mdash; Building Phase</span>
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-white/10 text-xs font-sans tracking-[0.1em] uppercase text-white/30">
            <div>Stream</div><div className="text-right">Conservative</div><div className="text-right">Base</div><div className="text-right">Aggressive</div>
          </div>
          <RevenueRow stream="Streaming" conservative="$500" base="$2,000" aggressive="$8,000" i={3} />
          <RevenueRow stream="YouTube" conservative="$200" base="$1,000" aggressive="$5,000" i={4} />
          <RevenueRow stream="Merch" conservative="$500" base="$2,500" aggressive="$10,000" i={5} />
          <RevenueRow stream="Live" conservative="$1,000" base="$5,000" aggressive="$15,000" i={6} />
          <RevenueRow stream="Sync" conservative="$0" base="$2,500" aggressive="$10,000" i={7} />
          <RevenueRow stream="Brand deals" conservative="$0" base="$1,500" aggressive="$5,000" i={8} />
          <RevenueRow stream="Patreon / direct" conservative="$200" base="$1,000" aggressive="$4,000" i={9} />
          <motion.div variants={fadeUp} custom={10} className="grid grid-cols-4 gap-4 pt-4 mt-2 border-t border-white/10 text-sm font-medium">
            <div className="text-heading">Total Year 1</div>
            <div className="font-mono text-white/40 text-right">$2,450</div>
            <div className="font-mono text-heading text-right">$15,700</div>
            <div className="font-mono text-accent text-right">$58,000</div>
          </motion.div>
        </motion.div>

        {/* Year 2-3 */}
        <motion.div variants={fadeUp} custom={11}>
          <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 block mb-6">Year 2&ndash;3 &mdash; Growth Phase (Annual)</span>
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-white/10 text-xs font-sans tracking-[0.1em] uppercase text-white/30">
            <div>Stream</div><div className="text-right">Conservative</div><div className="text-right">Base</div><div className="text-right">Aggressive</div>
          </div>
          <RevenueRow stream="Streaming" conservative="$2,000" base="$10,000" aggressive="$50,000" i={12} />
          <RevenueRow stream="YouTube" conservative="$1,200" base="$6,000" aggressive="$30,000" i={13} />
          <RevenueRow stream="Merch (IP)" conservative="$2,000" base="$10,000" aggressive="$40,000" i={14} />
          <RevenueRow stream="Live" conservative="$5,000" base="$20,000" aggressive="$75,000" i={15} />
          <RevenueRow stream="Sync" conservative="$2,000" base="$10,000" aggressive="$50,000" i={16} />
          <RevenueRow stream="Brand deals" conservative="$2,000" base="$10,000" aggressive="$50,000" i={17} />
          <RevenueRow stream="Patreon" conservative="$1,000" base="$5,000" aggressive="$20,000" i={18} />
          <RevenueRow stream="Film revenue" conservative="$500" base="$2,000" aggressive="$10,000" i={19} />
          <motion.div variants={fadeUp} custom={20} className="grid grid-cols-4 gap-4 pt-4 mt-2 border-t border-white/10 text-sm font-medium">
            <div className="text-heading">Total Year 2&ndash;3</div>
            <div className="font-mono text-white/40 text-right">$15,700</div>
            <div className="font-mono text-heading text-right">$73,000</div>
            <div className="font-display text-xl text-accent text-right">$325K</div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ─── 10. THE ROAD ─── */}
      <Section id="road">
        <SectionLabel>The Road</SectionLabel>
        <SectionTitle>What Comes Next</SectionTitle>

        <div className="flex items-center gap-6 mb-12">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-white/20">Roadmap</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-16 mb-20">
          {/* Released */}
          <div className="grid grid-cols-2 gap-8">
            {[
              { src: '/images/logotype-finexme.png', alt: 'FINExME', status: 'Released \u2014 2024', desc: '7-track debut. Act I complete. Fine By Me Film produced.' },
              { src: '/images/logotype-sinenoctis.png', alt: 'SINE NOCTIS', status: 'Released \u2014 2024/2026', desc: '3-track EP. Act II. ANTE, VESPERA, NOCTEM trailer series.' },
            ].map((item, i) => (
              <motion.div key={item.alt} variants={fadeUp} custom={i + 2}>
                <div className="relative w-full h-12 mb-4">
                  <Image src={item.src} alt={item.alt} fill className="object-contain object-left" sizes="200px" />
                </div>
                <span className="font-mono text-xs text-accent/60 block mb-1">{item.status}</span>
                <p className="font-sans text-xs text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Future */}
          <div className="grid grid-cols-3 gap-8">
            {[
              { src: '/images/logotype-otherland.png', alt: 'OTHERLAND', status: 'In Development', desc: 'Next full-length album' },
              { src: '/images/logotype-neverdyin.png', alt: 'NEVERDYIN', status: 'Early Concept', desc: 'Origins and reincarnation' },
              { src: '/images/logotype-sexsymbol.png', alt: 'SEX SYMBOL (THE ALBUM)', status: 'Postponed \u2014 The Culmination', desc: 'Entirely produced by Worst Choice' },
            ].map((item, i) => (
              <motion.div key={item.alt} variants={fadeUp} custom={i + 4}>
                <div className="relative w-full aspect-[3/1] mb-4">
                  <Image src={item.src} alt={item.alt} fill className="object-contain opacity-40" sizes="(max-width: 768px) 30vw, 250px" />
                </div>
                <span className="font-mono text-xs text-white/30 block mb-1">{item.status}</span>
                <p className="font-sans text-xs text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 11. CONTACT ─── */}
      <Section id="contact" className="border-t-0">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-display text-5xl md:text-6xl lg:text-7xl italic text-heading leading-[0.9] mb-8"
          >
            The fire is already lit.
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="font-sans text-sm text-muted mb-16 max-w-[40ch] mx-auto">
            FREE is building in public. The visual universe is live. The music is written.
            What comes next is scale.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            <a
              href="https://www.instagram.com/freenotavailable/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent/40 text-xs font-sans tracking-[0.15em] uppercase text-accent hover:bg-accent/10 transition-all duration-300 min-w-[160px]"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/13Z1MsZ0A9Ddox3DZcu9zk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/free/1715333809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-xs font-sans tracking-[0.15em] uppercase text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-w-[160px]"
            >
              Apple Music
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col items-center gap-6 pt-8 border-t border-white/5">
            <div className="relative w-10 h-10 opacity-30">
              <Image src="/images/owjv-cherub.png" alt="OWJV emblem" fill className="object-contain" sizes="40px" />
            </div>
            <span className="text-xs font-sans tracking-[0.15em] uppercase text-white/30">
              &copy; 2024&ndash;2026 Creative Minds Coalition &times; OWJV &mdash; Detroit, MI
            </span>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
