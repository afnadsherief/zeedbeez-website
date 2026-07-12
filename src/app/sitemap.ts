/**
 * Sitemap Scaffold
 * Per docs/13_SEO_STRATEGY.md: sitemap must be generated, not hand-maintained.
 * Phase 2+ will extend this with dynamic product/market routes.
 */

import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_META.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
