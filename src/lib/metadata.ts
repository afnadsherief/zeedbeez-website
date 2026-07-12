/**
 * SEO Metadata Factory
 *
 * Per docs/13_SEO_STRATEGY.md: metadata discipline, Open Graph, structured data.
 * All page metadata should be generated through this factory.
 */

import type { Metadata } from 'next'
import { SITE_META } from './constants'

interface PageMetaOptions {
  readonly title?: string
  readonly description?: string
  readonly path?: string
  readonly ogImage?: string
  readonly noIndex?: boolean
}

/**
 * Generates complete metadata for any page.
 * Provides defaults from SITE_META for consistency.
 */
export function buildMetadata(options: PageMetaOptions = {}): Metadata {
  const {
    title,
    description = SITE_META.description,
    path = '',
    ogImage = SITE_META.ogImage,
    noIndex = false,
  } = options

  const pageTitle = title ? `${title} — ${SITE_META.name}` : SITE_META.title
  const canonical = `${SITE_META.url}${path}`
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_META.url}${ogImage}`

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE_META.url),
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: SITE_META.name,
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImageUrl],
      site: SITE_META.twitterHandle,
    },
  }
}

/**
 * JSON-LD structured data builder for organization schema.
 * Phase 1 baseline — extended per page in later phases.
 */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_META.name,
    url: SITE_META.url,
    description: SITE_META.description,
    sameAs: [`https://twitter.com/${SITE_META.twitterHandle.replace('@', '')}`],
  }
}
