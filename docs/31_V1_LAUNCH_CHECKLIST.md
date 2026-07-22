# V1 Website Launch Checklist

This checklist governs public website launch readiness only. CMS, CRM, AI,
customer portals, manufacturing systems, and other Enterprise Platform
capabilities are explicitly out of scope.

## Automated release gate

GitHub Actions must pass on the exact release commit:

- formatting check
- TypeScript check
- lint
- unit tests
- production build
- Playwright desktop and mobile smoke tests

The workflow is defined in `.github/workflows/quality.yml`.

## Deployment configuration

- Set `NEXT_PUBLIC_APP_URL` to the exact production HTTPS origin.
- Verify the deployment platform uses Node.js 20 or later.
- Do not use the development default (`http://localhost:3000`) in a
  preview or production environment.
- Confirm the production domain serves HTTPS and redirects any configured
  alternate hostnames consistently.

## Public metadata and crawlability

- Confirm `/robots.txt` returns the production sitemap URL.
- Confirm `/sitemap.xml` contains the production homepage URL.
- Confirm `/opengraph-image` returns a 1200 × 630 PNG.
- Verify the title, description, canonical URL, and social preview on the
  production domain.
- Confirm `SITE_META.twitterHandle` is accurate before relying on the
  generated Organization JSON-LD profile URL.

## Responsive and accessibility checks

- Test the homepage at 320 px, 375 px, 768 px, 1024 px, and a desktop width.
- Verify both hero calls to action remain visible and tappable at mobile widths.
- Verify the mobile menu opens, closes with Escape, retains keyboard focus while
  open, and returns focus to its toggle when dismissed.
- Verify keyboard focus indicators, skip-to-content navigation, contrast, and
  reduced-motion behavior in the deployed build.
- Confirm the page remains understandable while WebGL is loading or unavailable;
  the 3D scene is decorative and the editorial HTML is primary.

## Content and route readiness

- Replace or remove every navigation/footer link whose destination is not part
  of the approved v1 release. The current shell links to future content routes;
  these must not lead to production 404 pages.
- Confirm all public copy is approved and contains no unsupported health claims.
- Confirm any newly supplied photographs, models, textures, or fonts have a
  documented source, license, intended use, and appropriately optimized variant.

## Release evidence

For the launch record, capture:

- release commit SHA and passing workflow URLs;
- deployed production URL and timestamp;
- browser/device evidence for the responsive checks;
- a social-preview check;
- named release owner and rollback contact.

A release is not ready for public promotion until each applicable item above is
completed or explicitly waived by the website release owner.
