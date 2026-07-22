/**
 * ZeedBeez Enterprise Platform — Platform Constants
 */

import type { MarketConfig, PerformanceBudget } from '@/types'

/** Ordered narrative scroll sequence per docs/10_SCROLL_STORY.md */
export const NARRATIVE_SEQUENCE = [
  'nature',
  'research',
  'biotechnology',
  'innovation',
  'quality',
  'product',
  'trust',
] as const

export type NarrativeChapter = (typeof NARRATIVE_SEQUENCE)[number]

/** Supported markets — extensible without code changes */
export const MARKETS: Record<string, MarketConfig> = {
  ae: {
    code: 'ae',
    name: 'UAE',
    currency: 'AED',
    locale: 'en-AE',
    products: ['hypermoon', 'herbze'],
  },
  in: {
    code: 'in',
    name: 'India',
    currency: 'INR',
    locale: 'en-IN',
    products: ['zeedbeez-pro', 'sleep-better'],
  },
} as const

/** Performance budgets per docs/16_PERFORMANCE_BUDGET.md */
export const PERFORMANCE_BUDGET: PerformanceBudget = {
  fcp: 1200,
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  fps: 60,
}

/**
 * 3D quality tiers — GPU adaptation.
 *
 * This is a function, not a plain object, because `high`/`ultra` need
 * `window.devicePixelRatio`, which does not exist during SSR/module
 * evaluation on the server. Call this only from client code.
 */
export function getQualityTierThresholds() {
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  return {
    low: { maxAnisotropy: 1, shadowMapSize: 512, pixelRatio: 1 },
    medium: { maxAnisotropy: 4, shadowMapSize: 1024, pixelRatio: 1.5 },
    high: { maxAnisotropy: 8, shadowMapSize: 2048, pixelRatio: Math.min(devicePixelRatio, 2) },
    ultra: { maxAnisotropy: 16, shadowMapSize: 4096, pixelRatio: Math.min(devicePixelRatio, 2) },
  } as const
}

/** Default site metadata */
export const SITE_META = {
  name: 'ZeedBeez',
  title: 'ZeedBeez — Premium Biotechnology Wellness',
  description:
    'Nature-inspired biotechnology wellness products. Backed by research. Designed for performance.',
  url: process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://zeedbeez.com',
  ogImage: '/opengraph-image',
  twitterHandle: '@zeedbeez',
} as const
