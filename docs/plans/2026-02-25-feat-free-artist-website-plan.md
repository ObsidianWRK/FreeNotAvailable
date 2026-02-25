---
title: "feat: Build FREE Artist Website — Other World Mythos"
type: feat
status: active
date: 2026-02-25
deepened: 2026-02-25
---

## Enhancement Summary

**Deepened on:** 2026-02-25
**Research agents used:** TypeScript Reviewer, Performance Oracle, Architecture Strategist, Frontend Races Reviewer, Security Sentinel, Code Simplicity Reviewer, Spec Flow Analyzer

### Key Improvements
1. **Use hand-drawn logotype PNGs** (owm-020 through owm-026) instead of font simulation — these are brand-critical assets
2. **Pre-optimize images with Sharp at build time** — 98% size reduction (10MB PNG → ~180KB AVIF), bypass Vercel optimization quota
3. **Replace SVG feTurbulence grain with CSS noise texture** — eliminates 15-25ms/frame CPU cost on mobile
4. **Single IntersectionObserver** for both color transitions AND nav highlighting — prevents race conditions
5. **Share one `useScroll` instance** via context — not per-component — prevents layout thrash
6. **CSS custom property mutation via DOM** for color transitions — keep React out of the scroll hot path
7. **Add 6 security headers** in next.config.ts (CSP, HSTS, X-Content-Type, X-Frame-Options, Referrer-Policy, Permissions-Policy)
8. **Fix image map** — 20 assets were unmapped; owm-003 (blue-grey) was wrongly assigned to FINExME
9. **Simple CSS opacity hover** instead of direction-aware reveals — removes 40-60 lines of JS per gallery item, works on mobile
10. **Fix muted text contrast** — `#9a948a` on `#1a0505` fails WCAG AA (3.2:1). Need 4.5:1 minimum.

### Critical Findings from Spec Flow Analysis
- Missing: OG image (1200x630), favicon, robots.txt, sitemap.xml, Twitter card metadata
- ANTE naming conflict between transition section and SINE NOCTIS subsection
- "LONG LIVE WORST CHOICE" dedication missing from plan
- Press sheet streaming links (Spotify, YouTube, Instagram, Apple Music) not represented
- `pointer-events: none` required on GrainOverlay

---

# Build FREE Artist Website — Other World Mythos

## Overview

Build an editorial, dark-first website for Detroit R&B artist FREE that embodies the **Other World Mythos** visual bible. The site is a single-page, scroll-driven narrative experience divided into two acts (FINExME in hot reds/blacks, SINE NOCTIS in B&W greyscale), inspired by every.to's editorial-tech hybrid aesthetic. Deploy to Vercel via GitHub under the org/repo name **FreeNotAvailable**.

## Problem Statement / Motivation

FREE's visual identity is meticulously crafted around a Prometheus mythology — reincarnation cycles, voyeuristic camera work, obscured faces, and strict color logic per era. There is currently no web presence that captures this narrative cohesion. The website must function as a living visual bible — not a generic artist page, but a cinematic scroll experience that makes visitors feel like they're entering the Other World.

## Proposed Solution

A Next.js 15 (App Router) single-page site with Tailwind CSS v4, deployed to Vercel. The page is structured as a vertical scroll narrative with distinct visual chapters that transition between the two eras. Motion library for hero parallax only. CSS IntersectionObserver + custom property mutation handles color transitions and fade-ins (keeping React out of the scroll hot path). Pre-optimized AVIF images extracted from the PDFs serve as the primary visual content.

## Technical Approach

### Architecture

```
free-not-available/
├── app/
│   ├── layout.tsx              # Root layout: fonts, dark mode, metadata, security headers, preload
│   ├── page.tsx                # Pure composition root (Server Component)
│   ├── globals.css             # Tailwind v4 @theme tokens, custom utilities, animations
│   ├── fonts.ts                # Font definitions (Cormorant Garamond + Inter)
│   ├── icon.png                # Favicon (from OWJV cherub logo)
│   ├── opengraph-image.png     # OG image (1200x630 composed from owm-000)
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   └── not-found.tsx           # Custom 404: "FREE is not available"
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # 'use client' — fixed nav, frosted glass, section observer
│   │   └── Footer.tsx          # Server Component — OWJV branding, credits, streaming links
│   ├── sections/               # ALL Server Components (animation pushed to ui/ children)
│   │   ├── HeroSection.tsx     # Full-bleed dual cover, FREE wordmark (owm-026), parallax
│   │   ├── FineXMeSection.tsx  # ACT I: red/black era with ANTE transition at bottom
│   │   ├── SineNoctisSection.tsx # ACT II: B&W era — jacket, European streets
│   │   ├── MythosSection.tsx   # The Prometheus mythology explained
│   │   └── LinksSection.tsx    # Streaming links + press (Spotify, YouTube, IG, Apple Music)
│   └── ui/
│       ├── ScrollController.tsx # 'use client' — single useScroll, color transition, observer
│       ├── ParallaxImage.tsx   # 'use client' — derives from shared scroll context
│       ├── FadeInView.tsx      # 'use client' — CSS animation + data attribute trigger
│       └── GrainOverlay.tsx    # Server Component — CSS noise texture (NOT SVG turbulence)
├── hooks/
│   ├── useScrollPosition.ts    # Shared scroll motion value
│   ├── useSectionInView.ts     # Single observer for nav + color transitions
│   └── useColorTransition.ts   # DOM mutation of CSS custom properties
├── lib/
│   ├── animation.ts            # Centralized duration/easing/variant tokens
│   ├── palettes.ts             # Color palette definitions per section
│   └── content/
│       ├── types.ts            # PhotoAsset, SectionContent, GalleryImage interfaces
│       ├── index.ts            # Aggregates all content exports
│       ├── hero.ts             # Hero section data
│       ├── finexme.ts          # FINExME section data + tracklist
│       ├── sine-noctis.ts      # SINE NOCTIS section data + tracklist
│       └── mythos.ts           # Prometheus mythology text
├── scripts/
│   └── optimize-images.mjs     # Sharp build pipeline: PNG → AVIF/WebP + blur placeholders
├── public/
│   ├── images/                 # Pre-optimized AVIF/WebP (generated by scripts/)
│   └── textures/
│       └── grain-200x200.png   # Film grain noise tile (~10KB)
├── next.config.ts              # Security headers, image config, remotePatterns: []
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

### Key Architecture Decisions

**Server/Client boundary:** Sections remain Server Components. Only `ScrollController.tsx`, `Nav.tsx`, `ParallaxImage.tsx`, and `FadeInView.tsx` are `'use client'`. This keeps the RSC payload lean.

**Color transitions:** CSS custom properties mutated via direct DOM access in `useColorTransition.ts` — never via React state. A single `IntersectionObserver` in `ScrollController.tsx` determines the active section (highest intersection ratio wins), then writes `--color-background`, `--color-foreground`, `--color-accent` to `document.documentElement.style`.

**Content layer:** All text, image references, and tracklists live in `lib/content/` as typed TypeScript files. Sections receive props, never contain hardcoded content.

**Animation tokens:** All durations, easings, and variants defined in `lib/animation.ts`. Components compose from tokens rather than inventing inline values.

### Implementation Phases

#### Phase 1: Project Scaffold, Image Pipeline & Design System

**Tasks:**
- [ ] Initialize Next.js 15 project with TypeScript and Tailwind CSS v4
- [ ] `npm install tailwindcss@next @tailwindcss/postcss@next motion sharp`
- [ ] Create `scripts/optimize-images.mjs` — Sharp pipeline to convert all `assets/*.png` to AVIF/WebP at multiple breakpoints (3840, 1920, 1280, 828px) + generate base64 blur placeholders
- [ ] Run image optimization pipeline, output to `public/images/`
- [ ] Configure fonts in `app/fonts.ts`: Cormorant Garamond (display/serif) + Inter (body/sans) via `next/font/google` with `variable` option
- [ ] Set up `globals.css` with `@theme` tokens and CSS-only animations:
  - Canvas: warm near-black `#0a0a08`
  - FINExME accent: `#c0392b` (hot red)
  - SINE NOCTIS: greyscale
  - Text primary: `#f2ede8` (cream-white, not pure white)
  - Text muted: `#b5afa5` (adjusted from `#9a948a` to meet WCAG AA 4.5:1 on all backgrounds)
  - Typography scale: `clamp()` fluid sizing
  - `@keyframes fade-up` for CSS-driven fade-in animations
  - `.film-grain-overlay` using `background-image: url('/textures/grain-200x200.png')` with `background-position` animation + `pointer-events: none`
- [ ] Create root `layout.tsx` with full metadata (title, description, OG, Twitter card, viewport), fonts, permanent `.dark` class, `<link rel="preload">` for hero image
- [ ] Create `GrainOverlay.tsx` — CSS noise texture tile, NOT SVG turbulence. `position: fixed; opacity: 0.035; pointer-events: none; will-change: opacity;`
- [ ] Add security headers in `next.config.ts`: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- [ ] Set `images: { remotePatterns: [] }` in next.config.ts to close SSRF vector
- [ ] Create `app/icon.png` from OWJV cherub logo (pdf1-000)
- [ ] Create `app/opengraph-image.png` (1200x630 landscape crop from owm-000)
- [ ] Create `app/robots.ts` and `app/sitemap.ts`
- [ ] Create `app/not-found.tsx` — "FREE is not available" custom 404
- [ ] Set up `lib/content/types.ts` with `PhotoAsset`, `SectionContent`, `GalleryImage` interfaces
- [ ] Populate `lib/content/` files with all text from PDFs and image manifest
- [ ] Set up `lib/animation.ts` with centralized duration/easing tokens
- [ ] Set up `lib/palettes.ts` with typed palette definitions

**Files:** `app/layout.tsx`, `app/globals.css`, `app/fonts.ts`, `app/icon.png`, `app/opengraph-image.png`, `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, `components/ui/GrainOverlay.tsx`, `scripts/optimize-images.mjs`, `next.config.ts`, `postcss.config.mjs`, `package.json`, `lib/content/*.ts`, `lib/animation.ts`, `lib/palettes.ts`

**Success criteria:** Dev server runs, dark page with correct fonts and color tokens visible, all images optimized in `public/images/`, security headers present.

#### Phase 2: Scroll System, Navigation & Hero

**Tasks:**
- [ ] Build `ScrollController.tsx` ('use client') — single `useScroll()` instance, single `IntersectionObserver` with `threshold: [0, 0.25, 0.5, 0.75, 1.0]` and `rootMargin: '-33% 0px -33% 0px'`
- [ ] Build `useColorTransition.ts` hook — reads active section from observer, mutates CSS custom properties on `document.documentElement` via `requestAnimationFrame` (NOT React state)
- [ ] Build `useSectionInView.ts` hook — determines winner by highest intersection ratio, batch-process all entries before writing
- [ ] Build `Nav.tsx` ('use client') — transparent fixed nav, frosted glass (`backdrop-filter: blur(12px)`) on scroll, OWJV cherub logo (pdf1-000) left, section anchors right. Nav labels: FREE (logo), ACT I, ACT II, MYTHOS, LINKS. Mobile: hamburger with full-screen overlay.
- [ ] Build `HeroSection.tsx` (Server Component) — full-viewport, dual cover art (owm-000), FREE wordmark PNG (owm-026) NOT a font, parallax via `ParallaxImage.tsx` child
- [ ] Build `ParallaxImage.tsx` ('use client') — derives from shared scroll context, `useTransform` for parallax. Only on hero. `@media (pointer: coarse)` disables.
- [ ] Implement smooth scroll: `html { scroll-behavior: smooth; }` + `section[id] { scroll-margin-top: 5rem; }`
- [ ] `<link rel="preload">` for hero AVIF in layout head with `imageSrcSet` and `imageSizes="100vw"`
- [ ] Hero image uses `priority` (or `preload` in Next.js 16), `placeholder="blur"`, `blurDataURL` from build pipeline

**Files:** `components/ui/ScrollController.tsx`, `hooks/useScrollPosition.ts`, `hooks/useSectionInView.ts`, `hooks/useColorTransition.ts`, `components/layout/Nav.tsx`, `components/sections/HeroSection.tsx`, `components/ui/ParallaxImage.tsx`

**Success criteria:** Hero fills viewport with preloaded AVIF, parallax works on desktop, single observer tracks sections, nav highlights correctly, color vars update on scroll.

#### Phase 3: ACT I — FINExME Section

**Tasks:**
- [ ] Build `FineXMeSection.tsx` (Server Component) — red/black color palette section
- [ ] Chapter label: "ACT I" in tracked uppercase Inter
- [ ] Use FINExME logotype PNG (owm-020) as `<Image>` — NOT a font simulation
- [ ] Red BMW wheel detail (owm-027) — this is the warm red image for FINExME
- [ ] Red-lit portrait (owm-005) with parallax
- [ ] Fine By Me visual still (owm-004) — intimate scene
- [ ] Dusk silhouette with two figures (owm-006) — intro/opening image
- [ ] PILGRIM title card (owm-007) — BMW dashboard with song title
- [ ] FINExME cover art square (pdf1-001)
- [ ] Back cover art display (owm-017) with tracklist: Fine By Me, Twins, Chambers, Flo, Zodiac Killer, Maybe, Pilgrim
- [ ] Narrative text from PDF: "In today's R&B landscape, men rarely make music that yearns anymore..."
- [ ] Gallery grid with simple CSS opacity hover (caption fade-in, NOT direction-aware)
- [ ] ANTE transition at section bottom: stone archway doorway (owm-008), "ANTE" text fading, color bleeding from red to greyscale. Use `id="threshold"` (NOT `id="ante"` to avoid naming conflict with SINE NOCTIS)
- [ ] Credits: "Creative Minds Coalition 2024 / OWJV 2024"

**Files:** `components/sections/FineXMeSection.tsx`, `lib/content/finexme.ts`

**Success criteria:** Scrolling into FINExME triggers red color shift via CSS custom properties, logotype PNG renders crisp, all 7+ FINExME images displayed, tracklist visible, ANTE transition at bottom bleeds to greyscale.

#### Phase 4: ACT II — SINE NOCTIS Section

**Tasks:**
- [ ] Build `SineNoctisSection.tsx` (Server Component) — strict B&W/greyscale palette
- [ ] Chapter label: "ACT II"
- [ ] Use SINE NOCTIS logotype PNG (owm-021 or owm-022) as `<Image>`
- [ ] Alpinestars jacket close-up (owm-028) — horizontal dark
- [ ] Jacket portrait B&W (owm-009) as focal motif
- [ ] BMW at dusk silhouette (owm-003) — blue-grey tone, correct for SINE NOCTIS (NOT FINExME)
- [ ] European architecture / Birmingham night scenes (owm-014)
- [ ] SINE NOCTIS street scenes (owm-010, owm-011, owm-012)
- [ ] Seated figure under pendant light (owm-013)
- [ ] B&W crouching figure in smoke/fog (pdf1-002) — one of the strongest images
- [ ] Bokeh night photography (pdf1-006)
- [ ] SINE NOCTIS back cover (owm-019) with tracklist: Al B. Sure!/Donell Jones, Van Gogh, Thin Ice Freestyle
- [ ] "LONG LIVE WORST CHOICE" dedication — must appear verbatim
- [ ] Credits: "Creative Minds Coalition 2026 / OWJV 2026"
- [ ] Continuous section (do NOT subdivide into ANTE/VESPERA/NOCTEM — same B&W palette throughout, labeling adds complexity without visual distinction)
- [ ] Grayscale CSS filter on all images: `filter: grayscale(1)` with hover to reveal slight warmth
- [ ] Gallery with simple CSS opacity hover overlays

**Files:** `components/sections/SineNoctisSection.tsx`, `lib/content/sine-noctis.ts`

**Success criteria:** Section is entirely greyscale, jacket imagery prominent, all SINE NOCTIS images displayed, "LONG LIVE WORST CHOICE" visible, back cover tracklist visible.

#### Phase 5: Mythos, Links & Footer

**Tasks:**
- [ ] Build `MythosSection.tsx` (Server Component) — the Prometheus mythology
  - FREE = Prometheus: overindulges, gets punished, reincarnates
  - The Lady In Black = the Eagle: executor of consequence
  - Visual law: voyeurism, intimacy vs distance, reincarnation cues
  - Future vision: OTHERLAND logotype (owm-023), NEVERDYIN logotype (owm-024), SEX SYMBOL logotype (owm-025) — displayed as image thumbnails with project names, minimal text since no content exists yet
- [ ] Build `LinksSection.tsx` — streaming/social links
  - Spotify, YouTube, Instagram, Apple Music icons (pdf1-010 through pdf1-015)
  - All external links open in `target="_blank"` with `rel="noopener noreferrer"`
  - Red bokeh portrait (pdf1-005) as section background
- [ ] Build `Footer.tsx` (Server Component) — OWJV cherub logo (pdf1-000/owm-014), Creative Minds Coalition, credits per PDF
  - "TENNESSEE HIGHLIGHTER" and "NORBU" credits if applicable

**Files:** `components/sections/MythosSection.tsx`, `components/sections/LinksSection.tsx`, `components/layout/Footer.tsx`, `lib/content/mythos.ts`

**Success criteria:** Full narrative flows from hero through both acts to mythology and links. All logotype PNGs displayed. Streaming links functional.

#### Phase 6: Animation & Polish

**Tasks:**
- [ ] Build `FadeInView.tsx` ('use client') — uses CSS `@keyframes fade-up` triggered by `data-in-view` attribute set by shared IntersectionObserver (NOT per-component observers). Alternatively: inline `motion.div` with `whileInView` + `viewport={{ once: true }}`.
- [ ] Centralized animation tokens from `lib/animation.ts`:
  - `DURATIONS: { fast: 0.2, normal: 0.5, slow: 0.9 }`
  - `EASINGS: { enter: [0.0, 0.0, 0.2, 1.0], standard: [0.4, 0.0, 0.2, 1.0] }`
- [ ] Gallery hover: simple CSS `opacity: 0 → 1` on caption overlay with `transition: opacity 0.4s ease`. No direction-aware reveals.
- [ ] Cinematic vignette overlays: `radial-gradient(ellipse at center, transparent 40%, rgba(0 0 0 / 0.7) 100%)` on hero and full-bleed images
- [ ] Film grain: CSS noise tile animation via `background-position` in `steps(1)` — compositor thread. Verify with DevTools Layers panel.
- [ ] `@media (prefers-reduced-motion: reduce)` — collapse all animations to near-instant
- [ ] `@media (pointer: coarse)` — disable parallax, show gallery captions by default
- [ ] Responsive breakpoints: mobile-first, test at 375px, 768px, 1280px, 1920px
- [ ] All images use `fill` with positioned parent OR explicit `width`/`height` — CLS target: 0
- [ ] ResizeObserver to remeasure sections when layout changes (image loads)

**Files:** `components/ui/FadeInView.tsx`, `app/globals.css` (enhance)

**Success criteria:** Smooth 60fps animations, graceful degradation on mobile, reduced motion respected, CLS < 0.05.

#### Phase 7: Content Review & Humanizer Pass

**Tasks:**
- [ ] Run `/humanizer` on all text content to remove AI-generated writing patterns
- [ ] Verify all manifesto text matches PDF source material verbatim
- [ ] Ensure no generic AI vocabulary (tapestry, delve, landscape, etc.)
- [ ] Verify all logotype PNGs render correctly (owm-020 through owm-026)
- [ ] Verify "LONG LIVE WORST CHOICE" appears verbatim
- [ ] Verify copyright years: FINExME = 2024, SINE NOCTIS = 2026
- [ ] Check text contrast: all `text-muted` usage meets WCAG AA (4.5:1) on both era backgrounds

**Success criteria:** All text reads as authentic, human-written artist copy. No AI patterns.

#### Phase 8: Deployment

**Tasks:**
- [ ] Initialize git repo in `/Users/damon/free-not-available/`
- [ ] Create `.gitignore` (exclude `.next/`, `node_modules/`, `assets/` raw PNGs)
- [ ] Create GitHub repo `FreeNotAvailable` via `gh repo create FreeNotAvailable --public`
- [ ] Push to GitHub
- [ ] Deploy to Vercel via `vercel` CLI or GitHub integration
- [ ] Verify production deployment: all images loading, animations working, security headers present
- [ ] Set Vercel spend limit in dashboard
- [ ] If Vercel/GitHub deployment fails, fall back to `next dev` on localhost

**Files:** `.gitignore`

**Success criteria:** Site live at `freenotavailable.vercel.app` or localhost, all images loading, security headers verified, OG image rendering in social unfurls.

## Design Specifications

### Color Palettes

**FINExME Era (ACT I):**
```css
--bg-finexme:     #1a0505;     /* deep blood-dark */
--accent-finexme: #c0392b;     /* hot red */
--text-finexme:   #f5e6e0;     /* warm cream */
--glow-finexme:   rgba(192, 57, 43, 0.15); /* red ambient glow */
```

**SINE NOCTIS Era (ACT II):**
```css
--bg-sinenoctis:     #0f0f0f;  /* near-black */
--accent-sinenoctis: #e8e8e8;  /* cold white */
--text-sinenoctis:   #d0d0d0;  /* soft grey */
```

**Neutral/Base:**
```css
--bg-canvas:    #0a0a08;       /* warm near-black base */
--bg-surface:   #111110;       /* primary surface */
--text-primary: #f2ede8;       /* cream-white (not pure white) */
--text-muted:   #b5afa5;       /* ADJUSTED: was #9a948a, now meets WCAG AA 4.5:1 on all bgs */
```

### Typography

- **Display**: Cormorant Garamond, weight 300, italic, line-height 0.95
- **Body**: Inter, weight 350 (dark-adjusted), line-height 1.7, max-width 65ch
- **Labels**: Inter, weight 400, letter-spacing 0.12em, uppercase
- **Project titles**: Hand-drawn logotype PNGs (owm-020 through owm-025) — NEVER font simulation
- **FREE wordmark**: owm-026 PNG — blocky, textured

### Complete Image Map (PDF Assets → Public Images)

| Source File | Content | Section | Notes |
|---|---|---|---|
| `owm-000.png` | Dual cover (red top / B&W bottom) | Hero | Also source for OG image crop |
| `owm-003.png` | BMW at dusk, blue-grey silhouette | **SINE NOCTIS** | Cool tones — NOT FINExME |
| `owm-004.png` | Fine By Me visual still | FINExME | Intimate scene |
| `owm-005.png` | Red-lit portrait, hand on face | FINExME | Key FINExME portrait |
| `owm-006.png` | Dusk silhouette, two figures, red-twilight | FINExME | Previously unmapped |
| `owm-007.png` | PILGRIM title card, BMW dashboard | FINExME | Song title visual |
| `owm-008.png` | Stone archway doorway | FINExME (ANTE transition) | Liminal corridor |
| `owm-009.png` | Alpinestars jacket portrait B&W | SINE NOCTIS | Focal motif |
| `owm-010.png` | SINE NOCTIS street scene | SINE NOCTIS | |
| `owm-011.png` | SINE NOCTIS architecture | SINE NOCTIS | |
| `owm-012.png` | Additional SINE NOCTIS | SINE NOCTIS | |
| `owm-013.png` | Seated figure, pendant light, very dark | SINE NOCTIS | Previously unmapped |
| `owm-014.png` | OWJV logo + Birmingham street | SINE NOCTIS / Footer | |
| `owm-017.png` | FINExME back cover / tracklist | FINExME | Golden standard |
| `owm-019.png` | SINE NOCTIS back cover / tracklist | SINE NOCTIS | Contains "LONG LIVE WORST CHOICE" |
| `owm-020.png` | FINExME logotype PNG (hand-drawn) | FINExME | BRAND CRITICAL — use as image |
| `owm-021.png` | SINE NOCTIS logotype PNG (banner) | SINE NOCTIS | BRAND CRITICAL — use as image |
| `owm-022.png` | SINE NOCTIS logotype PNG (standalone) | SINE NOCTIS | Alt version |
| `owm-023.png` | OTHERLAND logotype PNG | Mythos | Future project |
| `owm-024.png` | NEVERDYIN logotype PNG | Mythos | Future project |
| `owm-025.png` | SEX SYMBOL logotype PNG | Mythos | Future project |
| `owm-026.png` | FREE wordmark PNG (blocky, textured) | Hero / Nav | BRAND CRITICAL |
| `owm-027.png` | Red BMW wheel detail, warm tones | FINExME | Correct red image for ACT I |
| `owm-028.png` | Alpinestars jacket close-up, horizontal | SINE NOCTIS | Previously unmapped |
| `pdf1-000.png` | OWJV cherub logo (white on black) | Nav / Footer / Favicon | |
| `pdf1-001.png` | FINExME cover art (square) | FINExME | |
| `pdf1-002.png` | B&W crouching figure in smoke/fog | SINE NOCTIS | Strongest standalone photo |
| `pdf1-005.png` | Red bokeh portrait, hand raised | FINExME or Links bg | |
| `pdf1-006.png` | Bokeh night shots (B&W) | SINE NOCTIS | |
| `pdf1-007.png` | "NORBU" wordmark | Footer (credits) | Collaborator/outlet |
| `pdf1-008.png` | "TENNESSEE HIGHLIGHTER" masthead | Footer (credits) | Press outlet |
| `pdf1-010–015` | Platform icons (Spotify, YT, IG, Apple) | Links section | |
| `owm-018.png` | Blank white page | **EXCLUDED** | Not usable |
| `owm-001.png` | Duplicate of owm-000 top half | **EXCLUDED** | Redundant |
| `owm-002.png` | Duplicate of owm-000 bottom half | **EXCLUDED** | Redundant |
| `owm-015.png` | Duplicate of owm-001 | **EXCLUDED** | Redundant |
| `owm-016.png` | Duplicate of owm-002 | **EXCLUDED** | Redundant |

### Interaction Patterns

- **Scroll-driven color transitions**: Single IntersectionObserver with highest-ratio-wins algorithm. Mutates CSS custom properties on `document.documentElement` via `requestAnimationFrame`. Batch all entries before writing.
- **Parallax**: Hero image only. Shared `useScroll()` instance via context. Disabled on touch devices (`@media (pointer: coarse)`).
- **Fade-in on view**: CSS `@keyframes fade-up` + IntersectionObserver sets `data-in-view` attribute. Or Motion `whileInView` with `viewport={{ once: true }}`.
- **Gallery hover**: Simple CSS `opacity: 0 → 1` on caption overlay. No direction-aware reveals.
- **Nav**: Transparent → frosted glass (`backdrop-filter: blur(12px)`) on scroll. Mobile: hamburger with full-screen overlay.
- **Film grain**: CSS noise PNG tile (200x200, ~10KB), animated via `background-position` in `steps(1)`. `pointer-events: none; will-change: opacity;` on its own compositor layer.

### Performance Budget

| Metric | Target | Maximum |
|---|---|---|
| LCP | < 1.8s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| INP | < 100ms | < 200ms |
| FCP | < 1.0s | < 1.8s |
| Total JS (parsed) | < 150KB | < 200KB |
| Total images (initial load) | < 400KB | < 600KB |
| Total images (full scroll) | < 3MB | < 5MB |
| CSS bundle | < 15KB gzipped | — |

### Image Optimization Pipeline

```
Source PNG (5-15MB, e.g. 6000x4000px)
  └── AVIF @ 80 quality, width 3840px  → ~400-600KB  (retina hero)
  └── AVIF @ 75 quality, width 1920px  → ~150-250KB  (desktop)
  └── AVIF @ 70 quality, width 1280px  → ~80-140KB   (tablet)
  └── AVIF @ 65 quality, width 828px   → ~40-80KB    (mobile)
  └── WebP fallback @ 82 quality, width 1920px → ~300-500KB
  └── Blur placeholder: WebP @ 20 quality, width 40px → ~800 bytes (base64)
```

Sharp settings: `effort: 6` on AVIF (balances encode time vs file size). `chromaSubsampling: '4:2:0'`. Pre-optimized images use `unoptimized={true}` on `next/image` to bypass Vercel optimization — served directly from CDN edge.

### Security Headers (next.config.ts)

```typescript
const cspHeader = `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`

headers: [
  { key: 'Content-Security-Policy', value: cspHeader },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
]
```

## Acceptance Criteria

### Functional Requirements
- [ ] Single-page scroll experience with 6 distinct sections (Hero, FINExME+ANTE, SINE NOCTIS, Mythos, Links, Footer)
- [ ] ACT I (FINExME) section with red/black color palette, BMW imagery, 7+ images
- [ ] ACT II (SINE NOCTIS) section with B&W greyscale, jacket imagery, 8+ images
- [ ] Smooth color transitions between eras via CSS custom properties
- [ ] All hand-drawn logotype PNGs displayed (owm-020 through owm-026) — no font simulation
- [ ] Tracklists for both FINExME (7 tracks) and SINE NOCTIS (3 tracks) visible
- [ ] "LONG LIVE WORST CHOICE" dedication visible in SINE NOCTIS section
- [ ] OWJV cherub logo in nav and footer
- [ ] Streaming links section with Spotify, YouTube, Instagram, Apple Music
- [ ] Responsive: works on mobile (375px) through desktop (1920px+)
- [ ] Custom 404 page: "FREE is not available"
- [ ] OG image renders correctly in social unfurls (1200x630)
- [ ] Favicon from OWJV cherub logo

### Non-Functional Requirements
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] All text-muted usage meets WCAG AA contrast (4.5:1) on all backgrounds
- [ ] Dark-first design with cream-white text (not pure white)
- [ ] Film grain overlay (CSS noise, NOT SVG turbulence) with `pointer-events: none`
- [ ] Parallax on hero only, disabled on touch devices
- [ ] `prefers-reduced-motion` respected — all animations collapse
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] All images pre-optimized to AVIF/WebP with blur placeholders
- [ ] All text passes humanizer check (no AI writing patterns)
- [ ] 6 security headers configured in next.config.ts

### Deployment Requirements
- [ ] GitHub repo created as `FreeNotAvailable`
- [ ] Deployed to Vercel at `freenotavailable.vercel.app` OR running on localhost
- [ ] Security headers verified via `curl -I`
- [ ] robots.txt and sitemap.xml accessible

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 | App Router, image optimization, metadata API |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | CSS-first styling with `@theme` |
| Motion | latest | Hero parallax only (`useScroll` + `useTransform`) |
| Sharp | latest | Build-time image optimization pipeline |
| Vercel | — | Deployment platform |
| GitHub | — | Source control |

## Dependencies & Risks

- **Image file sizes**: Mitigated by Sharp build pipeline (98% reduction). Pre-optimized AVIF served directly from CDN.
- **Vercel/GitHub auth**: Deployment depends on `gh` CLI and `vercel` CLI being authenticated. Fallback: `next dev` on localhost.
- **Font licensing**: Google Fonts (Cormorant Garamond, Inter) — no licensing issues.
- **Browser support**: Framer Motion handles cross-browser parallax. CSS noise grain works everywhere. `backdrop-filter` needs `-webkit-` prefix for Safari.
- **INP risk**: Film grain SVG turbulence eliminated. CSS noise tile on compositor thread.
- **Layout shift risk**: All images use explicit dimensions or `fill` + positioned parent. ResizeObserver remeasures on layout changes.
- **Race conditions**: Single IntersectionObserver prevents conflicting writes. Shared `useScroll` prevents multiple layout reads.

## Sources & References

### Content Sources
- `/Users/damon/Downloads/PDF.pdf` — Artist press sheet
- `/Users/damon/Downloads/OTHER WORLD MYTHOS.pdf` — 31-page visual bible

### Design Inspiration
- every.to — dark editorial layout, section-based scrolling, minimal nav
- Typography: Cormorant Garamond + Inter pairing (high-fashion editorial register)

### Technical References
- Next.js 15 App Router documentation (verified 2026-02-24)
- Tailwind CSS v4 `@theme` CSS-first configuration
- Motion (Framer Motion) `useScroll` and `useTransform` APIs
- Vercel deployment and security headers documentation
- WCAG 2.1 AA color contrast requirements (4.5:1 for normal text)
