# ADR: API Routes / Agent-Native Parity

## Status: Rejected (Not Needed)

## Context

Code review finding #10 raised whether the site should expose API routes
for agent/programmatic access to content data (films, clips, revenue
projections, comparables, platforms).

## Decision

This is a personal artist portfolio. There are no external consumers,
no mobile app, no syndication needs. All content is hardcoded in page
components by design. Building API endpoints would be premature. The
finding is closed as not applicable.

## Future Path

If agent access or CMS integration becomes needed:

1. Extract hardcoded arrays from page components into `lib/content/*.ts`
   data modules (films.ts, clips.ts, revenue.ts, comparables.ts,
   platforms.ts). Types already exist in `lib/content/types.ts`.
2. Import data modules from both page components and new API routes.
3. Expose via Next.js Route Handlers (`app/api/content/[type]/route.ts`).
