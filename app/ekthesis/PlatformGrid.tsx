'use client'

import type { PlatformComparable } from '@/lib/content/types'

const platforms = [
  {
    name: 'YouTube / YouTube Music',
    monthlyActiveUsers: '2.5B+ (YouTube), 100M+ (Music)',
    revenueModel: '$8B/yr paid to music industry. 55% long-form / 45% Shorts rev share to creators. $40.4B total ad revenue (2025).',
    relevanceToFree: 'Primary long-form film distribution. Music videos + short films generate both ad revenue and discovery. Music is #1 content category.',
  },
  {
    name: 'Spotify',
    monthlyActiveUsers: '751M total, 290M paid',
    revenueModel: '$10B+ paid to rights holders in 2024 (record year). $0.003-$0.005/stream. 70/30 split favoring rights holders.',
    relevanceToFree: 'Primary streaming platform. Canvas feature (+5% streams, +145% shares, +20% playlist adds). Discover Weekly and Release Radar drive indie discovery.',
  },
  {
    name: 'Apple Music',
    monthlyActiveUsers: '~88-100M subscribers',
    revenueModel: '~$0.01/stream (highest major platform rate). Editorial-first curation. 30,000+ curated playlists.',
    relevanceToFree: 'Higher per-stream payout rewards quality over volume. Editorial approach favors artists with strong narratives and visual assets.',
  },
  {
    name: 'TIDAL',
    monthlyActiveUsers: 'Undisclosed (~5-10M est.)',
    revenueModel: '~$0.013/stream. Artist-owned platform (Block/Square). HiFi audio focus.',
    relevanceToFree: 'Highest per-stream payout of major DSPs. Artist-ownership ethos aligns with FREE\'s independent model.',
  },
  {
    name: 'Vevo',
    monthlyActiveUsers: '25B+ monthly views across platforms',
    revenueModel: 'Ad-supported music video distribution. Revenue share with labels/artists. Distributes to YouTube, Apple TV, Roku, Samsung TV+.',
    relevanceToFree: 'Largest music video distributor. Multi-platform reach for visual content beyond YouTube alone.',
  },
  {
    name: 'Patreon',
    monthlyActiveUsers: '10M+ paying members',
    revenueModel: '$3.5B+ paid to creators lifetime. 5-12% platform cut. Subscription tiers ($3-$25/mo typical).',
    relevanceToFree: 'Direct fan monetization for exclusive BTS, early access, director\'s cuts. Highest per-fan revenue potential.',
  },
  {
    name: 'Short of the Week',
    monthlyActiveUsers: '2,000+ films, 30,000 filmmakers',
    revenueModel: 'Curated editorial platform. Backed by Oscar-winning producer Michael Sugar. "Be Everywhere At Once" release strategy guides.',
    relevanceToFree: 'Premier short film discovery platform. Staff Pick designation equals credibility for festival submissions and press.',
  },
  {
    name: 'Gunpowder & Sky (DUST / ALTER)',
    monthlyActiveUsers: '7M+ combined YouTube subscribers',
    revenueModel: 'Genre-specific short film channels (sci-fi, horror). YouTube ad revenue share. Content acquisition.',
    relevanceToFree: 'Model for genre-specific short film distribution at scale. Proves curated short film channels build dedicated audiences.',
  },
] as const satisfies readonly PlatformComparable[]

export default function PlatformGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {platforms.map((p) => (
        <div
          key={p.name}
          className="border border-white/8 p-5 hover:border-white/15 transition-colors"
        >
          <h4 className="font-display text-sm text-heading mb-2">{p.name}</h4>
          <div className="font-mono text-[10px] text-accent/60 mb-3">{p.monthlyActiveUsers}</div>
          <p className="font-sans text-[11px] text-muted leading-relaxed mb-2">{p.revenueModel}</p>
          <p className="font-sans text-[11px] text-white/40 leading-relaxed italic">{p.relevanceToFree}</p>
        </div>
      ))}
      <p className="md:col-span-2 mt-2 font-mono text-[10px] text-white/20">
        Sources: Spotify Loud &amp; Clear 2024, IFPI 2025, Statista 2025, demandsage.com, Patreon About page, shortoftheweek.com. Subscriber/user counts as of latest available reporting.
      </p>
    </div>
  )
}
