# Multi-Route Polish: Streaming Links, Inline Playback, Clips QA, Revenue UX

**Date:** 2026-02-26
**Status:** Approved

## Summary

Five coordinated improvements across the homepage, /clips, /films, and /ekthesis routes. Each objective adds missing functionality, fixes UX gaps, or raises design consistency.

## 1. Song Streaming Links (Homepage Tracklists)

**Files:** `components/sections/FineXMeSection.tsx`, `SineNoctisSection.tsx`

Add Apple Music and Spotify links to each track in both tracklists. On hover, small SVG icons slide in from the right, compressing the dotted leader line. Icons are monochrome by default, era-colored on hover (red for FINExME, grey-white for SINE NOCTIS). Each icon wraps an `<a>` tag.

Data shape changes from `{ num, title }` to `{ num, title, spotify?, apple? }`.

Tracks without links render no icons. On mobile, icons are always visible (no hover on touch).

**10 tracks total:**
- FINExME: Fine By Me, Twins, Chambers, Flo, Zodiac Killer, Maybe, Pilgrim
- SINE NOCTIS: Al B. Sure!/Donell Jones, Van Gogh, Thin Ice Freestyle

## 2. Clips Loading + Humanizer + Colored Italics

**File:** `app/clips/page.tsx`

- Verify all 6 local `.mp4` clips load. Add `onError` fallback state.
- Rewrite all 6 descriptions: remove filler, keep them specific and punchy.
- Key emphasis words get both era color and italic styling via `<em>` with color classes.
- Wrap film/content references in `<a>` tags linking to homepage sections or /films.

## 3. Films Inline Playback

**File:** `app/films/page.tsx`

Remove `VideoModal`. Replace with per-card inline embed: clicking a thumbnail swaps `<Image>` for a YouTube `<iframe>` in the same card position. Same aspect ratio, no layout shift.

Close button (top-right of embed) + ESC key returns to thumbnail. Films without `videoUrl` keep "Coming Soon" overlay.

## 4. Revenue Streams Expandable

**File:** `app/ekthesis/page.tsx` (lines 401-421)

Wrap the revenue streams grid in a `<details>` element matching the existing pattern (Platforms, Comparables, Case Studies). Starts collapsed. Chevron rotates on open. Keyboard-accessible with focus-visible ring.

## 5. Design Audit

Cross-route consistency pass:
- Uniform tracking on uppercase labels
- Consistent hover transition durations (300ms)
- Typography spacing rhythm
- Focus states on all interactive elements
- Contrast ratios on muted text
- Border-opacity normalization

## Risks

| Risk | Mitigation |
|------|-----------|
| Tracks may lack streaming URLs | Icons only render if URL exists |
| Local clips may fail to load | onError fallback message |
| YouTube iframe load latency | Loading skeleton in embed space |
| details animation jank | CSS content-visibility + tested pattern |
