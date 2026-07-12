# Phase 1 Review — Architecture & Production Readiness

**Branch:** `feature/phase-1-bootstrap`
**Reviewer:** Claude (Implementation Engineer)
**Scope:** Pre-merge review per governed docs `docs/02_ARCHITECTURE.md` and
`docs/30_PHASE_1_IMPLEMENTATION_SPEC.md`. Seven audit areas: dependency,
bundle, folder/architecture, Three.js, SEO, accessibility, performance.

---

## Architecture Assessment

The codebase matches the governed architecture. Feature-first folder
structure is intact (`app/`, `components/`, `features/`, `lib/`, `hooks/`,
`providers/`, `services/`, `shaders/`, `store/`, `styles/`, `three/`,
`types/`, `utils/` — every folder from `docs/04_FOLDER_STRUCTURE.md` is
present). The 3D engine's core systems (`SceneManager`, `CameraRig`,
`LightingSystem`, quality manager, material/lighting/camera presets, asset
loader) are composable and contain zero page-specific logic — confirmed by
grep audit, not just by design intent. `HeroBottle`/`HeroScene`/
`HeroSection` correctly compose these shared systems rather than
reimplementing scene logic, satisfying the "do not duplicate scene logic
across pages" rule in `docs/02_ARCHITECTURE.md`.

No circular dependencies exist anywhere in `src/` (verified with `madge`).
Server/Client Component boundaries are pushed as deep as possible — the
root layout and homepage are Server Components; only `Navigation` (has
local state + a keyboard listener), the hero/3D subtree, and the error
boundary (Next.js requirement) are Client Components. `Footer` correctly
has zero interactivity and stays server-rendered.

## Decisions Made

- **Followed `docs/30_PHASE_1_IMPLEMENTATION_SPEC.md` as the scope-governing
  document** where it conflicted with the original conversational
  Implementation Directive (the spec explicitly includes the hero
  experience in Phase 1; the directive's milestone breakdown implied it
  was later). Per the Decision Rule, the committed governed doc took
  precedence.
- **Kept Zustand, Framer Motion, and `@theatre/core` installed** despite
  zero Phase 1 call sites, because `docs/03_TECH_STACK.md` mandates them
  as part of the platform stack and Phase 1's scope legitimately has no
  state/animation-timeline need yet. Removing them would be inventing
  architecture the docs already define; re-adding them in Phase 2 would be
  unnecessary churn.
- **Moved `@theatre/studio` to `devDependencies`.** It is a visual editor
  UI, not a runtime library — `@theatre/core` is what ships to production.
  Keeping the editor as a regular dependency risked it being bundled if a
  developer imported it carelessly in a later phase.
- **Did not fabricate the missing OG image or verify the placeholder
  Twitter handle.** Both are content/asset deliverables, not code — flagged
  as pre-launch blockers rather than invented.

## Problems Discovered

### Dependency Audit
- `eslint-plugin-import` installed but never wired into `eslint.config.mjs` — genuinely unused.
- `@gsap/react` installed but unused — the hero used a manual `useEffect` + `gsap.fromTo` pattern instead of the recommended `useGSAP()` hook.
- `@theatre/studio` was in regular `dependencies` despite being a dev-only editor tool.

### Bundle Audit
- `HeroScene` (Three.js + R3F + drei, ~960K) was statically imported into `HeroSection`, forcing it into the same synchronous bundle as the LCP-critical headline text on the only route in the app.
- Verified drei has no subpath-exports map in its `package.json` — barrel imports (`from '@react-three/drei'`) are the only supported consumption method; ES-module tree-shaking is already working correctly (only ~960K of the 3.0M package made it into the bundle, and that figure includes all of Three.js core itself).

### Folder/Architecture Audit
- `prefers-reduced-motion` detection was independently implemented in three places (`Providers`, `useReducedMotion`, `useScrollProgress`) — duplicated logic.
- `src/services/`, `src/shaders/`, `src/store/` existed on disk but were never committed (git doesn't track empty directories) — the governed folder structure existed locally but not in version control.
- No circular dependencies found.
- No page-specific logic found leaking into `three/`, `lib/`, or `hooks/` — preset names like `hero`/`heroOrbit` are configuration data consumed generically by systems that have no knowledge of what "hero" means, which is the correct composition pattern.

### Three.js Audit
- **Real memory leak:** `initScrollEngine()` registered anonymous `gsap.ticker.add()` and `ScrollTrigger.addEventListener('refresh', ...)` callbacks with no way for `destroyScrollEngine()` to remove them (no reference was kept). Every init→destroy cycle permanently stacked another ticker callback holding a closure over a stale Lenis instance.
- `initScrollEngine()` called `lenis.destroy()` directly instead of the full `destroyScrollEngine()` when re-initializing over an existing instance — meant a double-init also leaked.
- All declarative R3F elements (`<mesh>`, `<cylinderGeometry>`, `<meshStandardMaterial>`, `<MeshTransmissionMaterial>`) are correctly owned by R3F's reconciler, which disposes them automatically on unmount — no manual `new THREE.X()` construction anywhere requiring explicit disposal.
- No loaders (`useGLTF`/`useTexture`) are wired up yet since no real assets exist — nothing to leak there in Phase 1.

### SEO Audit
- `SITE_META.ogImage` points to `/og/default.jpg`, which does not exist in `public/` — every page using default metadata emits a broken Open Graph image URL. Real, user-visible defect for social share previews (Twitter/LinkedIn/Slack/iMessage).
- `SITE_META.twitterHandle` (`@zeedbeez`) is unverified as a real, live account.
- `NEXT_PUBLIC_APP_URL` defaults to `http://localhost:3000` in `.env.example`; if a deployed environment doesn't override it, canonical URLs and the sitemap would emit `localhost` URLs. The code's fallback logic itself is correct — this is a deployment-configuration risk, not a bug.
- `robots.ts` disallows `/api/`, a route that doesn't exist yet — forward-looking, not defective.

### Accessibility Audit
- **Contrast failure (real, user-facing):** measured actual composited contrast ratios against `--color-void` (#080808):
  - `--color-text-tertiary` (36% white): **3.23:1 — fails AA normal text (4.5:1)**
  - `--color-text-disabled` (20% white): **1.73:1 — fails AA normal text AND AA large-text/UI (3.0:1)**
  - `content-disabled` is used on the footer copyright line and, critically, the **Privacy and Terms links** — legally significant UI that must be readable.
- **Continuous 3D idle motion had no reduced-motion gate:** `HeroBottle`'s idle rotation/levitation, `LightingSystem`'s breathing key light, and `CameraRig`'s pointer parallax all ran unconditionally in `useFrame`, regardless of `prefers-reduced-motion`. GSAP entrance animations and CSS transitions correctly respected the preference; the 3D render loops did not.
- Mobile navigation menu had no `Escape`-key handler — a keyboard user could open it but had no way to close it without tabbing through every link back to the toggle.
- `<main role="main">` — redundant explicit role on a native element that already has that implicit role (minor, harmless, cleaned up per WAI-ARIA guidance).

### Performance Audit
- Root layout and homepage are correctly Server Components; no unnecessary client boundaries found.
- `next/font/google` correctly configured with `display: 'swap'` + `preload: true` — self-hosted, no render-blocking external font request, minimal CLS risk.
- R3F's `performance={{ min: 0.5 }}` adaptive-DPR is correctly configured as a runtime complement to the static `qualityManager` tier detection.
- `suppressHydrationWarning` is narrowly scoped to the `<html>` element only (the standard pattern to prevent false positives from browser-extension DOM injection) — not masking real hydration issues.
- Bundle-splitting issue (Three.js blocking LCP) already covered under Bundle Audit above; this is the primary performance finding.

## Fixes Applied

All fixes are committed on `feature/phase-1-bootstrap` (commits `df1c89f` through `b1de747`, 9 commits):

1. **`chore(deps)`** — removed `eslint-plugin-import`; moved `@theatre/studio` to `devDependencies`.
2. **`refactor(hero)`** — dynamic-imported `HeroScene` via `next/dynamic` with `ssr: false` (root-route JS dropped from Three.js-inclusive bundling to ~456K with Three.js as a separate async chunk); refactored the hero entrance animation to use `@gsap/react`'s `useGSAP()` instead of manual `useEffect`.
3. **`chore(architecture)`** — committed `.gitkeep` + explanatory `README.md` for `services/`, `shaders/`, `store/` so the governed folder structure is actually preserved in version control.
4. **`fix(a11y)`** — consolidated the triplicated `prefers-reduced-motion` check into `src/utils/media.ts`; fixed a latent `rafId`-possibly-undefined cleanup bug and a StrictMode-unsafe ref guard surfaced during the consolidation.
5. **`fix(3d-engine)`** — fixed the `gsap.ticker`/`ScrollTrigger` listener leak by keeping named references to the callbacks so `destroyScrollEngine()` can actually remove them; added regression tests.
6. **`fix(a11y)`** — raised `--color-text-tertiary` to 52% (5.65:1) and `--color-text-disabled` to 48% (5.00:1), both now passing AA normal-text contrast; updated in both `tokens.css` and `tailwind.config.ts`.
7. **`fix(a11y)`** — gated `HeroBottle`'s idle animation, `LightingSystem`'s breathing light, and `CameraRig`'s pointer parallax behind `useReducedMotion()`.
8. **`fix(a11y)`** — added `Escape`-key handler to the mobile menu, returning focus to the toggle button; added e2e coverage.
9. **`fix(a11y)`** — removed the redundant `role="main"`; documented the missing OG image asset in `public/og/README.md`.

## Remaining Risks

| Risk | Severity | Notes |
|---|---|---|
| Missing default OG image asset | **Blocking pre-launch** | Code is correct; the actual `/og/default.jpg` file needs real brand photography before any page is shared publicly. |
| Unverified `@zeedbeez` Twitter handle | Low | Confirm the account exists/is correct before relying on the JSON-LD `sameAs` reference. |
| `NEXT_PUBLIC_APP_URL` defaults to `localhost` | Medium (deployment config) | Must be explicitly set per-environment in Vercel; not a code defect, but a deployment checklist item. |
| Transitive `postcss <8.5.10` moderate XSS advisory | Low | Bundled inside Next.js itself (`node_modules/next/node_modules/postcss`); no fix available without downgrading Next to an unacceptably old version. Will resolve itself as Next.js updates its bundled PostCSS upstream. |
| Mobile menu has no full focus trap | Low | `Escape`-to-close and focus-return are now handled; a complete focus trap (Tab cycling confined within the open menu) was judged out of scope for a Phase 1 skeleton with only 5 links, but should be revisited if the menu grows more complex in Phase 2. |
| Drei ships as a single barrel import (no subpath exports) | None (verified non-issue) | Confirmed this is a drei package limitation, not fixable from our code; tree-shaking is already functioning correctly at the bundler level. |

## Technical Debt

None knowingly introduced. All placeholder/scaffold code (procedural bottle geometry pending a real `.glb` model, empty `services`/`shaders`/`store` folders) is explicitly documented as intentional Phase 1 scope, not deferred debt.

## Test Summary

| Suite | Result |
|---|---|
| TypeScript (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) | ✅ Pass, 0 errors |
| ESLint (`no-explicit-any` as error, Next core-web-vitals, React Compiler rules) | ✅ Pass, 0 errors, 0 warnings |
| Vitest unit tests | ✅ 9/9 passing (3 test files) — metadata factory (4), quality manager (3), scroll engine lifecycle (2, added this review) |
| Production build (Turbopack) | ✅ Clean — all 4 routes (`/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`) prerender statically |
| Playwright e2e | Configured; not executed in this sandboxed review environment (no headless browser binaries available in this container) — smoke tests cover homepage load, skip-link, nav, CTA visibility, and the new mobile-menu Escape-key behavior. Should be run in CI before merge. |

**Known sandbox-only limitation:** `next/font/google` cannot reach `fonts.googleapis.com` from this sandboxed container's network allowlist. Verified by temporarily stubbing the font module, confirming the build succeeds end-to-end, then restoring the real Google Fonts implementation and re-verifying typecheck/lint. This is not expected to reproduce in any environment with normal internet access, including standard CI runners.

## Bundle Metrics

| Metric | Before this review | After fixes |
|---|---|---|
| Root-route JS (critical path) | ~964K+ (Three.js/R3F/drei bundled with headline text) | ~456K (Three.js split into async chunk) |
| Three.js/R3F/drei chunk | Same chunk as critical path | ~960K, separate async chunk, loads after first paint |
| Total `.next/static/chunks/` | 1.8M | 1.8M (unchanged — same code, better split) |

*(Lighthouse was not run — no browser automation available in this sandboxed review environment. The bundle-splitting fix is expected to materially improve LCP since the largest chunk in the app no longer blocks initial text paint. Recommend running Lighthouse in CI or locally before merge to get concrete FCP/LCP/CLS numbers against the `docs/16_PERFORMANCE_BUDGET.md` targets.)*

## Recommendations Before Merge

1. **Source and add the real default OG image** (`public/og/default.jpg`, 1200×630) before any page is shared on social platforms — this is the one true blocking item found in this review.
2. **Verify the `@zeedbeez` Twitter/X handle** is correct and live, or update `SITE_META.twitterHandle`.
3. **Explicitly set `NEXT_PUBLIC_APP_URL`** in every deployed environment (Vercel preview + production) rather than relying on the `.env.example` default.
4. **Run Lighthouse and Playwright e2e in CI** before merge — both were configured and verified structurally in this review but not executed against a live browser in this sandboxed environment.
5. Consider a full focus-trap for the mobile menu if it grows beyond its current 5 links in Phase 2.

---

## Final Merge Recommendation

### ✅ Approve with minor observations

The architecture is sound, matches the governed docs, and contains no circular dependencies or leaked page-specific logic into shared systems. All issues found during this review that were within code's control — the scroll-engine memory leak, the LCP-blocking bundle, the contrast failures, the missing reduced-motion gates on continuous 3D motion, and the mobile-menu keyboard gap — have been fixed and verified (typecheck, lint, and all 9 unit tests pass; production build is clean) on this branch.

The remaining items are either genuine pre-launch content/asset gaps (the OG image, the Twitter handle) that cannot be fabricated by an engineering review, or deployment-configuration checklist items (the `NEXT_PUBLIC_APP_URL` default) rather than code defects. None of them block merging the *code* into `main`; they should be tracked and resolved before the site is actually launched publicly.
