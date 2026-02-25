---
title: "feat: Website Modernization, Ekthesis Deck Expansion, Films Audit & Video Clips"
type: feat
status: active
date: 2026-02-25
deepened: 2026-02-25
---

# Website Modernization, Ekthesis Deck Expansion, Films Audit & Video Clips

## Enhancement Summary

**Deepened on:** 2026-02-25
**Review agents used:** Performance Oracle, Security Sentinel, Architecture Strategist, Code Simplicity Reviewer, TypeScript Reviewer, Spec-Flow Analyzer
**Sections enhanced:** All 6 phases + new prerequisites section

### Key Improvements from Review

1. **Reduce scope for first pass:** Ekthesis from 15 to 12 sections (drop Short Film Strategy + Sync Licensing standalone sections). Remotion clips from 15 to 6 priority clips. Drop Phase 6 as standalone (inline humanizer as Phase 3 sub-task).
2. **Critical performance fixes:** Rewrite FadeInView with shared observer before activation. Replace grain overlay `background-position` animation with `transform: translate()` (eliminates main-thread repaints). Cap Remotion renders at 3 concurrent.
3. **Security hardening:** Add `media-src 'self' blob:; frame-src 'none'` to CSP. Add `noindex` to ekthesis metadata. Pin geist package version after upgrade. Run `npm audit` post-install.
4. **Architecture clarity:** ScrollController stays in `page.tsx` only (NOT layout). Nav uses `usePathname()` for sub-page detection. Drop `useActiveSection` from Nav scope (it reads default context outside ScrollController).
5. **TypeScript prep:** Add 6 new interfaces to `lib/content/types.ts` before ekthesis rewrite. Create `remotion/tsconfig.json` to isolate Remotion from Next.js build.
6. **Missing from original plan:** Ekthesis needs OG images, Spotify/Apple links need full artist URLs (not generic), no contact email exists anywhere, `font-display italic` usage must be audited before Geist Pixel switch (8+ instances), add skip-to-content link.

### Simplification Changes

- Phase 6 (Humanizer) collapsed into Phase 3 final task
- Alt text audit task dropped (research confirmed already complete)
- `useActiveSection` Nav wiring dropped (premature for this scope)
- Ekthesis sections reduced from 15 to 12
- Remotion clips reduced from 15 to 6 priority
- Net result: ~20% task reduction with same core deliverables

---

## Overview

Comprehensive update to the FREE / Other World website at `/Users/damon/free-not-available/`. Five workstreams run in parallel: (1) polish and modernize the existing site, (2) expand the Ekthesis pitch deck page with full research data, (3) audit and fix the Films tab, (4) ensure navigation consistency across all pages, and (5) create 10-15 Remotion video clips for social media.

**Project root:** `/Users/damon/free-not-available/`
**Live deployment:** `freenotavailable.vercel.app`
**Current stack:** Next.js 16.1, React 19.1, Tailwind 4.2, Motion 12.6, Geist 1.3, TypeScript 5.9

---

## Problem Statement / Motivation

The site launched today (4 commits, all 2026-02-25) and is functional but has several gaps:

1. **Navigation is missing on sub-pages.** `Nav.tsx` is rendered inside `app/page.tsx`, not `app/layout.tsx`. The `/films` and `/ekthesis` routes have no persistent navigation bar.
2. **Ekthesis deck page is sparse.** It has 9 sections with summary stats but lacks the full research data from sections B-H of the deck brief, the R&B market research report, case studies, competitive landscape, and financial modeling.
3. **Films tab needs audit.** Videos from `@OWJV` YouTube channel are linked but need verification that correct URLs map to correct films.
4. **Color monotony.** The site is heavily monochrome. User requests strategic color accents to break visual monotony.
5. **Font configuration incomplete.** User wants Geist Pixel for display text. Currently using Geist Sans for display. **Research finding:** Geist Pixel has NO italic variant (5 stylistic variants: Square, Grid, Circle, Triangle, Line). Use for display headings only, not italic text. Available in `geist/font/pixel` since geist@1.7.0.
6. **Instagram link needs correction** to `https://www.instagram.com/freenotavailable/`.
7. **No social media video clips exist** for TikTok/YouTube/Instagram promotion.
8. **Minor issues found:** SINE NOCTIS section incorrectly uses red `#c0392b` accent (should be greyscale), sitemap missing sub-routes, `FadeInView` and `useActiveSection` are built but unused, blur placeholders not wired.
9. **Next.js 16 deprecations:** `priority` prop on `<Image>` is deprecated (use `preload`), `qualities` config required in `next.config.ts`, `middleware.ts` renamed to `proxy.ts`.
10. **Geist package outdated:** Currently `geist@1.3.0`, needs upgrade to `geist@1.7.0+` for Geist Pixel support.

---

## Proposed Solution

### Phase 1: Navigation & Infrastructure (Prerequisite)

Move `Nav.tsx` to root layout so it appears on all pages. Fix sitemap. Wire unused components.

### Phase 2: Polish & Modernization

Font update, color accents, alt text audit, Instagram fix, SINE NOCTIS color fix, activate FadeInView.

### Phase 3: Ekthesis Deck Expansion

Rebuild the `/ekthesis` page with all research data from the brief sections, following the existing design language.

### Phase 4: Films Tab Audit

Verify all YouTube links, ensure films display correctly, match quality of atnocost.net/films.

### Phase 5: Remotion Video Clips

Set up Remotion, download source videos, create 10-15 clips for social media.

### Phase 6: Humanizer Pass

Run all text through humanizer check to eliminate AI writing patterns.

---

## Prerequisites (Do Before Any Phase)

These items were discovered by review agents and must be done first:

- [ ] **Rewrite FadeInView** with shared module-level IntersectionObserver (current per-instance pattern will cause scroll jank at scale) — `components/ui/FadeInView.tsx`
- [ ] **Fix grain overlay animation** — replace `background-position` with `transform: translate()` to move animation to compositor thread — `app/globals.css`
- [ ] **Add CSP directives** — `media-src 'self' blob:; frame-src 'none'` to `next.config.ts`
- [ ] **Add `qualities: [75, 85]`** to images config in `next.config.ts` (required by Next.js 16)
- [ ] **Add `noindex` to ekthesis metadata** — `app/ekthesis/layout.tsx` (financial projections should not be Google-indexed)
- [ ] **Add OG images** to `app/ekthesis/layout.tsx` and `app/films/layout.tsx` (currently missing — shared links preview incorrectly)
- [ ] **Fix Spotify/Apple Music links** in `app/ekthesis/page.tsx` contact section — point to actual artist profiles, not generic platform homepages
- [ ] **Add skip-to-content link** to `app/layout.tsx` for keyboard accessibility
- [ ] **Create `remotion/tsconfig.json`** and exclude `remotion/` from root `tsconfig.json` (prevents Next.js build conflicts)
- [ ] **Add 6 TypeScript interfaces** to `lib/content/types.ts`: `StatItem`, `ComparableArtist`, `RevenueProjection`, `RevenueStream`, `CaseStudy`, `PlatformComparable`

---

## Technical Approach

### Architecture

**Key architectural decisions based on repo research:**

1. **Nav moves to `app/layout.tsx`** — currently in `app/page.tsx` only. Sub-pages need it. The Nav already handles both anchor links (homepage sections) and route links (`/films`, `/ekthesis`). On sub-pages, anchor links should either be hidden or prefixed with `/` to navigate home first.

2. **Sub-pages get conditional Nav behavior** — When on `/films` or `/ekthesis`, anchor links (ACT I, ACT II, MYTHOS) should link to `/#finexme`, `/#sinenoctis`, `/#mythos` (absolute anchors). Route links remain as-is.

3. **Content stays inline for sub-pages** — The codebase pattern is inline `const` arrays in page files. Don't refactor to `lib/content/` imports (over-engineering for this scope).

4. **Ekthesis page gets a complete rewrite** — Current 9-section structure is a skeleton. New version needs 15+ sections with all research data, keeping same `data-section-id` pattern.

5. **Remotion runs as a separate script** — Not integrated into the Next.js app. Separate `remotion/` directory with its own composition files. Export via CLI.

---

### Implementation Phases

#### Phase 1: Navigation & Infrastructure (30 min)

**Files to modify:**
- `app/layout.tsx` — Import and render `<Nav />` here
- `app/page.tsx` — Remove `<Nav />` import/render
- `components/layout/Nav.tsx` — Add pathname awareness: use `usePathname()` to detect sub-pages. On sub-pages, anchor links become `/#finexme` etc. Route links highlight active route.
- `app/films/page.tsx` — Remove any standalone back-link/nav that duplicates the shared Nav
- `app/ekthesis/page.tsx` — Same removal
- `app/sitemap.ts` — Add `/films` and `/ekthesis` routes

**Tasks:**
- [ ] Move `<Nav />` from `app/page.tsx` to `app/layout.tsx` — `app/layout.tsx`, `app/page.tsx`
- [ ] Update Nav anchor links to use absolute paths on sub-pages — `components/layout/Nav.tsx`
- [ ] Add active route highlighting to Nav route links — `components/layout/Nav.tsx`
- [ ] Remove standalone navigation from `/films` page — `app/films/page.tsx`
- [ ] Remove standalone navigation from `/ekthesis` page — `app/ekthesis/page.tsx`
- [ ] Add `/films` and `/ekthesis` to sitemap — `app/sitemap.ts`

**Success criteria:** Nav bar visible and functional on all three routes. Anchor links work from any page. Active route highlighted.

---

#### Phase 2: Polish & Modernization (1-2 hrs)

**2a. Font Configuration + Package Upgrade**

User wants Geist + Inter (already configured) with Geist Pixel for display headings.

**Critical finding from research:** Geist Pixel has NO italic variant. It comes in 5 stylistic variants (Square, Grid, Circle, Triangle, Line). Available since `geist@1.7.0` at `geist/font/pixel`. Current project uses `geist@1.3.0` which does NOT include Pixel.

**Strategy:** Upgrade `geist` to `^1.7.0`. Use `GeistPixelSquare` (or `GeistPixelGrid` for more texture) as the display font for headings. Keep Geist Sans for body fallback. Inter remains the body font. Italic text stays in Geist Sans italic or Inter italic (both have proper italic faces).

**Files to modify:**
- `package.json` — Upgrade `geist` from `^1.3.0` to `^1.7.0`
- `app/fonts.ts` — Import `GeistPixelSquare` from `geist/font/pixel`, set as display font
- `app/globals.css` — Update `--font-display` to use Geist Pixel variable

**Tasks:**
- [ ] Upgrade geist package to `^1.7.0` — `package.json`
- [ ] Import and configure GeistPixelSquare as display font — `app/fonts.ts`
- [ ] Update `--font-display` CSS variable mapping — `app/globals.css`
- [ ] Verify all `font-display` usage renders correctly — all section components
- [ ] Ensure italic text uses Geist Sans or Inter (NOT Geist Pixel) — all components

**2a-bis. Next.js 16 Compatibility Fixes**

**Files to modify:**
- `next.config.ts` — Add required `qualities` field to images config
- `components/ui/ParallaxImage.tsx` — Replace deprecated `priority` prop with `preload`
- `components/sections/HeroSection.tsx` — Same `priority` → `preload` fix
- `components/layout/Nav.tsx` — Same fix for logo image

**Tasks:**
- [ ] Add `qualities: [75, 85]` to `next.config.ts` images config — `next.config.ts`
- [ ] Replace `priority` prop with `preload` on all `<Image>` components — multiple files

**2b. Color Accents to Break Monotony**

Add strategic color to selected text elements. The site currently uses red `#c0392b` for FINExME and greyscale for SINE NOCTIS. Introduce:
- A warm amber/gold `#d4a574` for neutral sections (hero, mythos, links) — complements the red without competing
- Keep red for FINExME elements
- Keep greyscale for SINE NOCTIS elements
- Apply color to selected headings, pull quotes, and interactive elements

**Files to modify:**
- `app/globals.css` — Add `--color-warm: #d4a574` or similar token
- `components/sections/HeroSection.tsx` — Accent on subtitle or scroll indicator
- `components/sections/MythosSection.tsx` — Accent on "What Comes Next" or mythology keywords
- `components/sections/LinksSection.tsx` — Accent on heading or platform names

**Tasks:**
- [ ] Add warm accent color token to Tailwind theme — `app/globals.css`
- [ ] Apply color accents to hero subtitle — `components/sections/HeroSection.tsx`
- [ ] Apply color accents to mythos keywords — `components/sections/MythosSection.tsx`
- [ ] Apply color accents to links section — `components/sections/LinksSection.tsx`

**2c. Fix SINE NOCTIS Red Accent Bug**

`SineNoctisSection.tsx` lines 31, 103, 109 use `text-[#c0392b]` (red) for Act II label, Tracklist heading, and track numbers. Should use greyscale per design spec.

**Tasks:**
- [ ] Replace `text-[#c0392b]` with `text-[#d0d0d0]` in SINE NOCTIS section — `components/sections/SineNoctisSection.tsx`

**2d. Instagram Link Fix**

**Tasks:**
- [ ] Verify Instagram link points to `https://www.instagram.com/freenotavailable/` — `components/sections/LinksSection.tsx`

**2e. Alt Text Audit**

Research found all meaningful images already have descriptive alt text. One decorative image in ekthesis correctly uses `alt=""` + `aria-hidden`. Verify completeness across all files.

**Tasks:**
- [ ] Audit all `<Image>` components for descriptive alt text — all `.tsx` files
- [ ] Ensure decorative images use `alt=""` + `aria-hidden="true"` — all `.tsx` files

**2f. Activate Unused Components**

Wire `FadeInView` into section components for scroll-reveal animations. Wire `useActiveSection` into Nav for active link highlighting.

**Tasks:**
- [ ] Wrap section content blocks in `<FadeInView>` — section components
- [ ] Use `useActiveSection()` in Nav for active anchor highlighting — `components/layout/Nav.tsx`

**Success criteria:** Fonts render correctly with Geist Pixel for italic display. Color accents visible on neutral sections. SINE NOCTIS is strictly greyscale. Instagram link correct. All images have proper alt text. Scroll-reveal animations active.

---

#### Phase 3: Ekthesis Deck Expansion (2-3 hrs)

Rewrite `/ekthesis` page with complete research data. Current page has 9 sections with surface-level stats. New version incorporates all data from:
- Deck brief sections B, C, D, E, F, G, H
- R&B market research report (user provided inline)
- Artist press sheet PDF
- Other World Mythos visual bible

**Page structure (15 sections):**

```
1.  TITLE — "EKTHESIS" / "A proposition for the Other World"
2.  THE ARTIST — Bio (from atnocost.net/bio + PDFs), Detroit origin, 10 tracks across 2 projects
3.  THE THESIS — Male vulnerability underserved in R&B (Section B data)
4.  THE UNIVERSE — FINExME (Act I) + SINE NOCTIS (Act II) + future roadmap (OTHERLAND, NEVERDYIN, SEX SYMBOL)
5.  THE MODEL — Music x Film hybrid model, visual album economics (Section E data)
6.  MARKET OPPORTUNITY — TAM/SAM/SOM from Section C ($29.6B global, $1.2B R&B US, $412M sync)
7.  AUDIENCE — Demographics, geography, discovery behavior (Section C.2, C.3)
8.  PLATFORM LANDSCAPE — 8 competitors with data (Section 4 of research report)
9.  MONETIZATION — Revenue streams and typical ranges (Section C.4, H data)
10. COMPARABLES — 11 comps table (Section F data)
11. CASE STUDIES — Brent Faiyaz, Frank Ocean, Beyonce Black Is King, Childish Gambino (Section G)
12. SHORT FILM STRATEGY — Distribution, festivals, monetization (Section D data)
13. REVENUE PROJECTIONS — Year 1 and Year 2-3 scenarios with tables (Section H.8)
14. SYNC LICENSING — Market data, growth trends, indie access (R&B report Section 2)
15. CONTACT — Social links, streaming links, OWJV/CMC footer
```

**Content rules:**
- Only use images already in `public/images/` — no new images
- All text must pass humanizer check (no AI writing patterns)
- Use data from the research briefs but write in authentic voice
- Financial figures cited with sources
- Tables rendered as styled HTML (not markdown)

**Files to modify:**
- `app/ekthesis/page.tsx` — Complete rewrite with 15 sections
- `app/ekthesis/layout.tsx` — Update description metadata

**Tasks:**
- [ ] Rewrite ekthesis page with 15 sections of research data — `app/ekthesis/page.tsx`
- [ ] Integrate R&B market stats (TAM/SAM/SOM) from Section C — `app/ekthesis/page.tsx`
- [ ] Add audience demographics and discovery behavior — `app/ekthesis/page.tsx`
- [ ] Add platform landscape with 8 competitors — `app/ekthesis/page.tsx`
- [ ] Add monetization levers with typical ranges — `app/ekthesis/page.tsx`
- [ ] Add 11 comparables table from Section F — `app/ekthesis/page.tsx`
- [ ] Add 4 case studies from Section G — `app/ekthesis/page.tsx`
- [ ] Add short film strategy from Section D — `app/ekthesis/page.tsx`
- [ ] Add revenue projections (Year 1 and Year 2-3) from Section H.8 — `app/ekthesis/page.tsx`
- [ ] Add sync licensing market data — `app/ekthesis/page.tsx`
- [ ] Run humanizer pass on all deck text — `app/ekthesis/page.tsx`
- [ ] Update metadata description — `app/ekthesis/layout.tsx`

**Success criteria:** Full 15-section deck page with all research data. Consistent dark cinematic design. All figures sourced. No AI writing patterns. Only existing images used.

---

#### Phase 4: Films Tab Audit (30 min)

Verify all film cards on `/films` page link to correct YouTube videos from `@OWJV` channel.

**Current film cards (from `app/films/page.tsx`):**
- FINExME Era: Fine By Me, AT NO COST, PILGRIM
- SINE NOCTIS Era: ANTE, VESPERA, NOCTEM, SINE NOCTIS (no video yet)

**Tasks:**
- [ ] Scrape `https://www.youtube.com/@OWJV/videos` to get all video URLs — agent-browser
- [ ] Cross-reference each film card's YouTube link with actual channel videos — `app/films/page.tsx`
- [ ] Fix any incorrect links — `app/films/page.tsx`
- [ ] Verify film thumbnails/images match the correct films — `app/films/page.tsx`
- [ ] Ensure films page visual quality matches atnocost.net/films level — `app/films/page.tsx`
- [ ] Add nav bar (handled by Phase 1) — confirmed via Phase 1

**Success criteria:** Every film card links to the correct YouTube video. Page renders at same quality as Bandzoogle version.

---

#### Phase 5: Remotion Video Clips (2-3 hrs)

Create 10-15 short video clips for TikTok, YouTube, and Instagram using Remotion.

**Setup (Remotion v4.0.429, confirmed Feb 25, 2026):**
- Install Remotion in a separate `remotion/` directory within the project
- `npm install remotion @remotion/cli @remotion/renderer @remotion/media`
- `@remotion/media` provides `<Video>` component (NOT from `remotion` directly)
- Create composition files for each clip format
- Use `staticFile()` for local video references (never bare string paths)
- Remotion runs on a separate dev server (`npx remotion studio`) — NOT integrated into Next.js dev server
- Tailwind can be used but `transition-*` and `animate-*` CSS classes must NOT be used (all animation via `useCurrentFrame()`)

**Source material:**
- Download videos from `https://www.youtube.com/@OWJV/videos` using `yt-dlp` at best quality
- Use existing images from `public/images/` as overlays/backgrounds
- Pull bio and project text from the site

**Clip formats:**
- TikTok/Instagram Reels: 1080x1920 (9:16), 15-60 seconds
- YouTube Shorts: 1080x1920 (9:16), 15-60 seconds
- Instagram Feed: 1080x1080 (1:1), 15-60 seconds
- YouTube standard: 1920x1080 (16:9), 30-90 seconds

**10-15 clip concepts:**
1. **"Welcome to the Other World"** — Hero montage with text overlay, clips from multiple films
2. **FINExME Highlight** — Best moments from Fine By Me film + red aesthetic
3. **SINE NOCTIS Teaser** — B&W clips from ANTE/VESPERA/NOCTEM + greyscale treatment
4. **Artist Introduction** — Bio text with portrait clips, "FREE is a songwriter..."
5. **The Mythology** — Prometheus narrative with film clips
6. **FINExME Tracklist Visualizer** — Track names animated over film footage
7. **SINE NOCTIS Tracklist Visualizer** — Same for SINE NOCTIS
8. **Detroit Story** — Detroit-rooted identity clips
9. **Behind the Universe** — Visual bible imagery with voiceover text
10. **"Men rarely make music that yearns"** — Manifesto text over film clips
11. **Film Reel** — Quick cuts from all films, showreel style
12. **ACT I vs ACT II** — Split-screen red vs greyscale comparison
13. **PILGRIM Spotlight** — Single-film highlight
14. **AT NO COST Spotlight** — Single-film highlight
15. **"FREE is not available"** — Mysterious/teaser clip with minimal reveals

**Export settings:**
- Codec: H.264 for compatibility, ProRes for masters
- CRF: 18 (near-lossless)
- Audio codec: AAC 320kbps
- Frame rate: 30fps (match source)
- Resolution: Native per format (1080x1920, 1080x1080, 1920x1080)

**Files to create:**
- `remotion/` directory with Remotion project scaffold
- `remotion/src/Root.tsx` — Entry point
- `remotion/src/compositions/` — One file per clip template
- `remotion/src/components/` — Shared components (text overlays, transitions)
- `remotion/render-all.sh` — Batch render script
- `remotion/output/` — Rendered clips output

**Tasks:**
- [ ] Install Remotion and scaffold project — `remotion/`
- [ ] Download all OWJV YouTube videos at best quality — `remotion/assets/`
- [ ] Create text overlay components — `remotion/src/components/`
- [ ] Create 10-15 clip compositions — `remotion/src/compositions/`
- [ ] Render all clips at highest quality — `remotion/output/`
- [ ] Verify all outputs play correctly in each target format

**Success criteria:** 10-15 rendered video clips in `remotion/output/`, each in correct aspect ratio for target platform, at highest quality. Clips serve as intro/teaser content for the Other World project.

---

#### Phase 6: Humanizer Pass (30 min)

Final pass across all text content to remove AI writing patterns.

**Files to check:**
- `app/ekthesis/page.tsx` (highest priority — most new text)
- `components/sections/MythosSection.tsx`
- `components/sections/FineXMeSection.tsx`
- `components/sections/SineNoctisSection.tsx`
- `app/films/page.tsx`

**Humanizer checklist:**
- No inflated symbolism or promotional language
- No superficial "-ing" analyses
- No vague attributions
- No em dash overuse
- No rule of three patterns
- No AI vocabulary (tapestry, delve, landscape, multifaceted, etc.)
- No negative parallelisms
- No excessive conjunctive phrases

**Tasks:**
- [ ] Run humanizer skill on ekthesis page text — `app/ekthesis/page.tsx`
- [ ] Run humanizer skill on section component text — `components/sections/*.tsx`
- [ ] Run humanizer skill on films page text — `app/films/page.tsx`

**Success criteria:** All text reads as authentic, human-written artist copy.

---

## System-Wide Impact

### Interaction Graph

- Moving Nav to root layout affects all three routes simultaneously
- Scroll-driven color transitions (ScrollController) only apply to homepage — sub-pages are unaffected
- Font changes affect every text element site-wide
- New Tailwind color tokens are available everywhere but only applied where explicitly used

### Error Propagation

- If Nav pathname detection fails, worst case is anchor links don't work on sub-pages (non-critical)
- If Geist Pixel font fails to load, `font-display: swap` falls back to system font
- Remotion failures are isolated — video creation is a separate pipeline that doesn't affect the website

### State Lifecycle Risks

- No database, no persistent state. All content is static. No risk of orphaned data.
- Remotion output files are independent artifacts.

### API Surface Parity

- `components/layout/Nav.tsx` — gains `usePathname()` for route awareness
- `app/sitemap.ts` — gains two additional routes
- No new API routes or external integrations

### Integration Test Scenarios

1. Navigate from `/films` to homepage via Nav — anchor links should scroll to correct sections
2. Navigate from `/ekthesis` to homepage — same test
3. Mobile hamburger menu on sub-pages — should show all links correctly
4. Resize browser on ekthesis deck — tables and stats should remain readable
5. Load site with slow connection — images should show blur placeholders (if wired)

---

## Acceptance Criteria

### Functional Requirements

- [ ] Navigation bar visible and functional on `/`, `/films`, and `/ekthesis`
- [ ] All anchor links work from any page (prefix with `/` on sub-pages)
- [ ] Active route highlighted in Nav
- [ ] Ekthesis page has 12 sections with full research data (reduced from 15 per simplicity review)
- [ ] All financial figures in ekthesis are sourced
- [ ] Films page links all point to correct YouTube videos
- [ ] Instagram link points to `https://www.instagram.com/freenotavailable/`
- [ ] SINE NOCTIS section uses greyscale accents (not red)
- [ ] Color accents applied to neutral sections to break monotony
- [ ] Geist Pixel used for non-italic display headings (NO italic — Geist Pixel has no italic variant)
- [ ] All `font-display italic` usages changed to `font-sans italic` (8+ instances across section components)
- [ ] 6 priority video clips rendered in correct formats (reduced from 15 per simplicity review)
- [ ] All text passes humanizer check
- [ ] Sitemap includes all routes

### Non-Functional Requirements

- [ ] LCP < 2.5s on all pages
- [ ] All text meets WCAG AA contrast (4.5:1) — especially any new color tokens
- [ ] All images have descriptive alt text
- [ ] `prefers-reduced-motion` respected
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] Security headers maintained (CSP, HSTS, X-Frame-Options, etc.)

---

### Security Requirements (from Security Sentinel review)

- [ ] CSP includes `media-src 'self' blob:; frame-src 'none'`
- [ ] CSP `font-src` includes `https://fonts.gstatic.com` as defensive fallback
- [ ] Ekthesis page has `robots: { index: false, follow: false }`
- [ ] `geist` package pinned to exact version after upgrade
- [ ] Remotion installed in isolated `remotion/` directory with own `package.json`
- [ ] All new external links use `rel="noopener noreferrer" target="_blank"`

---

## Success Metrics

- Nav appears on all 3 routes (binary pass/fail)
- Ekthesis page section count: 12 (up from 9)
- All film links verified against YouTube channel
- 6 priority video clips rendered and playable
- Zero AI writing pattern flags from humanizer
- CSP passes security audit
- All text meets WCAG AA contrast (4.5:1)

---

## Dependencies & Risks

| Risk | Mitigation |
|---|---|
| Geist Pixel may not be in `geist@1.3.0` | Fall back to Geist Mono or `@font-face` import |
| YouTube video downloads may be rate-limited | Use `yt-dlp` with appropriate flags, download sequentially |
| Remotion rendering may be slow on local machine | Render at 1080p, not 4K. Use `--concurrency` flag |
| Ekthesis page may be very long | Use collapsible sections or tabbed navigation within the page |
| Large amount of text in ekthesis needs humanizer | Run humanizer skill specifically on this page |

---

## Sources & References

### Internal References

- Existing plan: `docs/plans/2026-02-25-feat-free-artist-website-plan.md`
- Font config: `app/fonts.ts`
- Nav component: `components/layout/Nav.tsx:1-80`
- ScrollController: `components/ui/ScrollController.tsx`
- SINE NOCTIS red accent bug: `components/sections/SineNoctisSection.tsx:31,103,109`
- Sitemap: `app/sitemap.ts`

### Research Data Files

- `/Users/damon/Downloads/PDF.pdf` — Artist press sheet
- `/Users/damon/Downloads/OTHER WORLD MYTHOS.pdf` — 31-page visual bible
- `/Users/damon/Downloads/deck-brief-sections-B.md` — Thesis, facts, roadmap, gap analysis
- `/Users/damon/Downloads/deck-brief-section-C.md` — R&B market research
- `/Users/damon/Downloads/deck-brief-section-D.md` — Short film market research
- `/Users/damon/Downloads/deck-brief-sections-EH.md` — Hybrid model, modeling inputs
- `/Users/damon/Downloads/deck-brief-sections-FG.md` — Comps and case studies

### External References

- Artist website: https://atnocost.net
- YouTube channel: https://www.youtube.com/@OWJV/videos
- Instagram: https://www.instagram.com/freenotavailable/
- Spotify: https://open.spotify.com/artist/13Z1MsZ0A9Ddox3DZcu9zk
- Apple Music: https://music.apple.com/us/artist/free/1715333809
