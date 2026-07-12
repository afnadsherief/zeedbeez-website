/**
 * Media Query Utilities
 *
 * Single source of truth for the prefers-reduced-motion check.
 * Per docs/17_ACCESSIBILITY.md: all motion must respect this preference.
 *
 * Previously this check was duplicated independently in three call sites
 * (Providers, useReducedMotion, useScrollProgress) — consolidated here.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** SSR-safe synchronous read of the user's reduced-motion preference. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/** Returns the live MediaQueryList for subscribing to preference changes. */
export function getReducedMotionMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined') return null
  return window.matchMedia(REDUCED_MOTION_QUERY)
}
