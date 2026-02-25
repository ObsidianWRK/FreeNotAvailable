export interface PhotoAsset {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly blurDataURL?: string
}

export interface SectionContent {
  readonly id: string
  readonly heading: string
  readonly subheading?: string
  readonly body?: string
  readonly images: readonly PhotoAsset[]
}

export interface TrackItem {
  readonly title: string
  readonly number: number
}

export interface StatItem {
  readonly value: string
  readonly label: string
  readonly source?: string
}

export interface ComparableArtist {
  readonly name: string
  readonly category: 'visual' | 'indie-rb' | 'hybrid-model' | 'franchise'
  readonly achievement: string
  readonly relevance: string
}

export interface RevenueProjection {
  readonly period: string
  readonly conservative: string
  readonly base: string
  readonly aggressive: string
}

export interface RevenueStream {
  readonly name: string
  readonly typicalRange: string
  readonly notes?: string
}

export interface CaseStudy {
  readonly artist: string
  readonly project: string
  readonly finding: string
  readonly relevance: string
}

export interface PlatformComparable {
  readonly name: string
  readonly monthlyActiveUsers: string
  readonly revenueModel: string
  readonly relevanceToFree: string
}
