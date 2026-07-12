/**
 * Motion Timings — shared GSAP defaults.
 * Per docs/07_ANIMATION_BIBLE.md: avoid decorative motion, keep transitions premium.
 */

import { gsap } from 'gsap'

/** GSAP ease strings that match the token system */
export const GSAP_EASES = {
  premium: 'power3.out',
  spring: 'elastic.out(1, 0.6)',
  smooth: 'power2.inOut',
  reveal: 'power4.out',
  linear: 'none',
} as const

/** Standard durations (seconds) */
export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  premium: 1.2,
  scene: 1.8,
} as const

/** Shared reveal animation — fade + translate Y */
export function createRevealTween(
  target: gsap.TweenTarget,
  options?: { delay?: number; from?: number },
) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: options?.from ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: DURATIONS.slow,
      ease: GSAP_EASES.premium,
      delay: options?.delay ?? 0,
    },
  )
}
