'use client'

import type { RevenueStream } from '@/lib/content/types'

/* ── Streaming payout rates ── */
const streamingRates = [
  { name: 'Napster',       typicalRange: '~$0.019',  notes: 'Highest per-stream but smallest user base' },
  { name: 'TIDAL',         typicalRange: '~$0.013',  notes: 'Artist-centric model' },
  { name: 'Apple Music',   typicalRange: '~$0.008',   notes: '~88-100M subscribers' },
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
  { name: 'Streaming original (Netflix etc)', typicalRange: '$3,000-$20,000',   notes: 'Outpacing traditional TV placements' },
  { name: 'Video games',                    typicalRange: '$2,500-$25,000',      notes: 'AAA titles pay top end' },
] as const satisfies readonly RevenueStream[]


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

export default function RevenueTable() {
  return (
    <div>
      <StreamingRatesTable />
      <SyncRangesTable />
      <p className="font-mono text-[10px] text-white/20 mt-4">
        All projections are modeled estimates. Sources: Spotify Loud &amp; Clear 2024, IFPI 2024, RIAA 2024, industry benchmarks.
        Actual results depend on release cadence, audience growth, and market conditions.
      </p>
    </div>
  )
}
