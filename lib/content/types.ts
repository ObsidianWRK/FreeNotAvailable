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
