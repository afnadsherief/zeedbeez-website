/**
 * Robots Scaffold
 * Per docs/13_SEO_STRATEGY.md: robots.txt generated from config, not static file.
 */

import type { MetadataRoute } from 'next'
import { SITE_META } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_META.url}/sitemap.xml`,
  }
}
