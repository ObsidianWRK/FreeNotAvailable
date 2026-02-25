'use client'

import type { RevenueProjection, RevenueStream } from '@/lib/content/types'

/* ── Streaming payout rates ── */
const streamingRates = [
  { name: 'Napster',       typicalRange: '~$0.019',  notes: 'Highest per-stream but smallest user base' },
  { name: 'TIDAL',         typicalRange: '~$0.013',  notes: 'Artist-centric model' },
  { name: 'Apple Music',   typicalRange: '~$0.01',   notes: '~88-100M subscribers' },
  { name: 'Deezer',        typicalRange: '~$0.006',  notes: 'Artist-centric model launched 2024' },
  { name: 'Spotify',       typicalRange: '$0.003-$0.005', notes: '751M users, 290M paid. 1,000-stream minimum (2024)' },
  { name: 'Amazon Music',  typicalRange: '~$0.004',  notes: 'Varies by Unlimited vs Prime tier' },
  { name: 'YouTube Music', typicalRange: '~$0.002',  notes: 'Lower on ad-supported, higher on premium' },
] as const satisfies readonly RevenueStream[]

/* ── Sync licensing ranges ── */
const syncRanges = [
  { name: 'Social media brand post',       typicalRange: '~$1,000/video',       notes: 'Pre-cleared indie music' },
  { name: 'TV show (background)',           typicalRange: '$750-$5,000',         notes: 'Wide range by show size' },
  { name: 'TV commercial (regional)',       typicalRange: '$5,000-$25,000' },
  { name: 'TV commercial (national)',       typicalRange: '$25,000-$100,000+',   notes: 'Major brand campaigns' },
  { name: 'Indie film placement',           typicalRange: '$500-$5,000',         notes: 'Often includes festival exposure' },
  { name: 'Streaming original (Netflix etc)', typicalRange: '$3,000-$20,000',   notes: 'Fastest-growing segment' },
  { name: 'Video games',                    typicalRange: '$2,500-$25,000',      notes: 'AAA titles pay top end' },
] as const satisfies readonly RevenueStream[]

/* ── Year 1 projections ── */
const year1 = [
  { period: 'Streaming',       conservative: '$500',   base: '$2,000',  aggressive: '$8,000' },
  { period: 'YouTube ad rev',  conservative: '$200',   base: '$1,000',  aggressive: '$5,000' },
  { period: 'Short-form video', conservative: '$50',   base: '$200',    aggressive: '$1,000' },
  { period: 'Merch sales',     conservative: '$500',   base: '$2,500',  aggressive: '$10,000' },
  { period: 'Live performance', conservative: '$1,000', base: '$5,000', aggressive: '$15,000' },
  { period: 'Sync licensing',  conservative: '$0',     base: '$2,500',  aggressive: '$10,000' },
  { period: 'Brand deals',     conservative: '$0',     base: '$1,500',  aggressive: '$5,000' },
  { period: 'Patreon / direct', conservative: '$200',  base: '$1,000',  aggressive: '$4,000' },
] as const satisfies readonly RevenueProjection[]

/* ── Year 2-3 projections ── */
const year23 = [
  { period: 'Streaming',        conservative: '$2,000',  base: '$10,000', aggressive: '$50,000' },
  { period: 'YouTube ad rev',   conservative: '$1,000',  base: '$5,000',  aggressive: '$25,000' },
  { period: 'Short-form video', conservative: '$200',    base: '$1,000',  aggressive: '$5,000' },
  { period: 'Merch (IP-driven)', conservative: '$2,000', base: '$10,000', aggressive: '$40,000' },
  { period: 'Live performance', conservative: '$5,000',  base: '$20,000', aggressive: '$75,000' },
  { period: 'Sync licensing',   conservative: '$2,000',  base: '$10,000', aggressive: '$50,000' },
  { period: 'Brand deals',      conservative: '$2,000',  base: '$10,000', aggressive: '$50,000' },
  { period: 'Patreon / direct', conservative: '$1,000',  base: '$5,000',  aggressive: '$20,000' },
  { period: 'Film festival/screening', conservative: '$500', base: '$2,000', aggressive: '$10,000' },
] as const satisfies readonly RevenueProjection[]

function RateTable({ title, rows, source }: { title: string; rows: readonly RevenueStream[]; source: string }) {
  return (
    <div className="mb-12">
      <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">{title}</h4>
      <div className="overflow-x-auto -mx-6 md:mx-0">
        <table className="w-full min-w-[480px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Platform / Type</th>
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Rate</th>
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-white/5 last:border-0">
                <td className="py-3 px-3 font-sans text-xs text-heading">{r.name}</td>
                <td className="py-3 px-3 font-mono text-xs text-accent text-right whitespace-nowrap">{r.typicalRange}</td>
                <td className="py-3 px-3 font-sans text-[11px] text-muted leading-relaxed">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 font-mono text-[10px] text-white/20 px-3">{source}</p>
    </div>
  )
}

function ProjectionTable({
  title,
  rows,
  totals,
}: {
  title: string
  rows: readonly RevenueProjection[]
  totals: { conservative: string; base: string; aggressive: string }
}) {
  return (
    <div className="mb-12">
      <h4 className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-4">{title}</h4>
      <div className="overflow-x-auto -mx-6 md:mx-0">
        <table className="w-full min-w-[480px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal">Stream</th>
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Conservative</th>
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Base</th>
              <th className="py-2 px-3 text-xs font-sans tracking-wider uppercase text-white/25 font-normal text-right">Aggressive</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.period} className="border-b border-white/5 last:border-0">
                <td className="py-3 px-3 font-sans text-xs text-muted">{r.period}</td>
                <td className="py-3 px-3 font-mono text-xs text-white/40 text-right">{r.conservative}</td>
                <td className="py-3 px-3 font-mono text-xs text-heading text-right">{r.base}</td>
                <td className="py-3 px-3 font-mono text-xs text-accent text-right">{r.aggressive}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/10">
              <td className="py-4 px-3 font-sans text-sm text-heading font-medium">Total</td>
              <td className="py-4 px-3 font-mono text-sm text-white/40 text-right">{totals.conservative}</td>
              <td className="py-4 px-3 font-mono text-sm text-heading text-right">{totals.base}</td>
              <td className="py-4 px-3 font-display text-lg text-accent text-right">{totals.aggressive}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export function StreamingRatesTable() {
  return (
    <RateTable
      title="Streaming Payouts Per Stream (2025 est.)"
      rows={streamingRates}
      source="Sources: freeyourmusic.com, Spotify Loud &amp; Clear 2024, ProducerHive 2025. Rates vary by geography and subscription tier."
    />
  )
}

export function SyncRangesTable() {
  return (
    <RateTable
      title="Sync Licensing Fee Ranges (Indie/Unsigned)"
      rows={syncRanges}
      source="Sources: TuneCore Sync Licensing 101 (2024), industry standard ranges. US sync licensing market: $412.6M (RIAA 2024)."
    />
  )
}

export function Year1Projections() {
  return (
    <ProjectionTable
      title="Year 1 - Building Phase"
      rows={year1}
      totals={{ conservative: '$2,450', base: '$15,700', aggressive: '$58,000' }}
    />
  )
}

export function Year23Projections() {
  return (
    <ProjectionTable
      title="Year 2-3 - Growth Phase (Annual)"
      rows={year23}
      totals={{ conservative: '$15,700', base: '$73,000', aggressive: '$325K' }}
    />
  )
}

export default function RevenueTable() {
  return (
    <div>
      <StreamingRatesTable />
      <SyncRangesTable />
      <Year1Projections />
      <Year23Projections />
      <p className="font-mono text-[10px] text-white/20 mt-4">
        All projections are modeled estimates. Sources: Spotify Loud &amp; Clear 2024, IFPI 2024, RIAA 2024, industry benchmarks.
        Actual results depend on release cadence, audience growth, and market conditions.
      </p>
    </div>
  )
}
