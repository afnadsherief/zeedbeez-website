# CLAUDE.md

Read this file before doing any implementation.

## Project

ZeedBeez Website is a premium biotechnology wellness platform with immersive 3D storytelling and SEO-first architecture.

Primary products:
- ZeedBeez Pro
- Sleep Better

Core narrative:
Nature → Research → Biotechnology → Innovation → Quality → Product → Trust → Purchase

## Operating Rules

- Work in milestones only.
- Do not redesign approved architecture.
- Prefer reusable systems over page-specific code.
- Keep animations purposeful and story-driven.
- Treat research and product content as separate but connected pillars.
- Never invent unsupported health claims.
- Keep implementation production-grade.

## Required Tech Direction

- Next.js 15
- React 19
- TypeScript strict
- Tailwind CSS
- Three.js / React Three Fiber / Drei
- GSAP / ScrollTrigger
- Lenis
- Theatre.js
- Framer Motion
- Zustand
- React Query
- Vercel deployment

## Architecture Rules

- Feature-first structure.
- Reusable scene, camera, animation, and shader systems.
- No `any` in TypeScript.
- No duplicated logic.
- No duplicated animation timelines.
- No duplicated shader code.
- No inline styles unless explicitly required for a technical reason.
- Build for performance and accessibility from the start.

## Milestone Flow

1. Bootstrap foundation
2. Hero experience
3. Nature scene
4. Research scene
5. Ingredient storytelling
6. Manufacturing scene
7. Product pages
8. SEO and content system
9. Performance optimization
10. Production hardening

## Definition of Done

A milestone is done only when:
- It builds successfully
- TypeScript passes
- Lint passes
- The UX matches the approved vision
- It is responsive
- It is accessible
- It is SEO-conscious
- It is maintainable

## Documentation Rule

If architecture changes, update the relevant docs in `/docs` in the same change.
