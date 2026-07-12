# Releases

## v0.1.0-foundation — Phase 1: Bootstrap & Foundation

**Branch:** `feature/phase-1-bootstrap` → merged to `main`
**Full review:** [`docs/reviews/PHASE_1_REVIEW.md`](docs/reviews/PHASE_1_REVIEW.md)

### Summary

Phase 1 delivers the production foundation for the ZeedBeez Enterprise
Platform website: a fully configured Next.js 15/16 + React 19 +
TypeScript-strict application shell, a reusable 3D engine (scene, camera,
lighting, materials, asset loading), a scroll engine (Lenis + GSAP
ScrollTrigger), the platform design token system, and the first premium
hero experience — all built from shared, composable systems with zero
page-specific logic leaked into shared modules. SEO, accessibility, and
performance baselines are established. No product, CRM, CMS, e-commerce,
or localization work was in scope, per
`docs/30_PHASE_1_IMPLEMENTATION_SPEC.md`.

This release also includes a full pre-merge Architecture and Production
Readiness Review across seven audit areas (dependency, bundle,
folder/architecture, Three.js, SEO, accessibility, performance), with
every genuine defect found fixed and verified on the branch before merge.

### Major Architectural Decisions

- **Feature-first folder structure** (`app/`, `components/`, `features/`,
  `lib/`, `hooks/`, `providers/`, `services/`, `shaders/`, `store/`,
  `styles/`, `three/`, `types/`, `utils/`) per `docs/04_FOLDER_STRUCTURE.md`,
  with shared systems fully decoupled from feature/page content.
- **3D engine composed from shared primitives** — `SceneManager`,
  `CameraRig`, `LightingSystem`, quality-adaptive rendering, and
  material/lighting/camera preset libraries. No scene ever constructs its
  own Canvas or duplicates lighting/camera logic; everything is composed
  per `docs/02_ARCHITECTURE.md`'s "do not duplicate scene logic" rule.
- **Design tokens as CSS custom properties**, mirrored into
  `tailwind.config.ts` as a single visual source of truth.
- **`docs/30_PHASE_1_IMPLEMENTATION_SPEC.md` treated as the scope-governing
  document** where it differed from the original conversational
  Implementation Directive — the spec's Step 5 (hero experience) was
  included in Phase 1 accordingly.
- **Zustand, Framer Motion, and `@theatre/core`** installed per
  `docs/03_TECH_STACK.md` despite no Phase 1 call sites yet — kept
  because the governed tech stack doc mandates them for the platform,
  not because Phase 1 needed them. `@theatre/studio` (the visual editor,
  not the runtime library) was placed in `devDependencies` instead of
  regular dependencies.
- **Three.js/R3F/drei dynamically imported** (`next/dynamic`,
  `ssr: false`) so the LCP-critical hero headline renders independently
  of the 3D engine's ~960K bundle.

### Audit Summary

Seven audits performed with real inspection (grep, `madge`, computed WCAG
contrast ratios, bundle manifest analysis) rather than assumption. Full
detail in `docs/reviews/PHASE_1_REVIEW.md`. Headline findings, all fixed
and verified on the branch prior to merge:

- **Dependency audit** — removed one genuinely unused package
  (`eslint-plugin-import`); corrected `@theatre/studio`'s dependency
  classification.
- **Bundle audit** — fixed a real LCP-blocking issue: the 3D engine was
  bundled synchronously with critical text; root-route JS dropped from
  ~964K+ to ~456K after splitting.
- **Folder/architecture audit** — no circular dependencies, no
  page-specific logic leaked into shared systems; fixed a triplicated
  `prefers-reduced-motion` check and committed three architecturally
  mandated but previously-untracked empty folders.
- **Three.js audit** — fixed a real memory leak: the scroll engine's
  `gsap.ticker`/`ScrollTrigger` listeners were never removed on
  teardown, accumulating on every re-init.
- **SEO audit** — metadata factory and JSON-LD are correct; flagged (not
  fixed, since they require real assets) a missing default OG image and
  an unverified social handle.
- **Accessibility audit** — fixed two real WCAG AA contrast failures
  (one affecting the Privacy/Terms links directly), added
  reduced-motion gating to three previously-ungated continuous 3D
  animation loops, and added a missing keyboard-close path to the
  mobile menu.
- **Performance audit** — confirmed correct Server/Client Component
  boundaries, correct font-loading strategy, and correct adaptive
  render-quality configuration; primary finding was the bundle-splitting
  issue captured above.

**Final review recommendation:** ✅ Approve with minor observations.

### Remaining Non-Blocking Items

These do not block this merge and are tracked for resolution before
public launch or in Phase 2, as applicable:

- Missing default Open Graph share image (`public/og/default.jpg`) —
  requires real brand photography.
- `SITE_META.twitterHandle` (`@zeedbeez`) is unverified as a live account.
- `NEXT_PUBLIC_APP_URL` must be explicitly set per deployed environment
  (Vercel preview + production) rather than relying on the
  `.env.example` default of `localhost:3000`.
- A transitive `postcss <8.5.10` moderate advisory bundled inside
  Next.js itself — no fix available without downgrading Next; expected
  to resolve as Next.js updates its bundled dependency upstream.
- Mobile navigation menu has `Escape`-to-close and focus-return but not
  a full Tab focus trap — acceptable for its current 5-link scope,
  worth revisiting if the menu grows in Phase 2.
- Playwright e2e suite is configured and was verified structurally but
  not executed against a live browser in the review's sandboxed
  environment — should run in CI before any production deploy.

---

*For the complete architecture assessment, decisions, problems
discovered, fixes applied, test summary, and bundle metrics, see
[`docs/reviews/PHASE_1_REVIEW.md`](docs/reviews/PHASE_1_REVIEW.md).*
