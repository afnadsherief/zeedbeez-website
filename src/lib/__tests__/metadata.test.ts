import { describe, it, expect } from 'vitest'
import { buildMetadata, buildOrganizationJsonLd } from '@/lib/metadata'

describe('buildMetadata', () => {
  it('returns default site metadata when no options passed', () => {
    const meta = buildMetadata()
    expect(meta.title).toBeDefined()
    expect(meta.openGraph).toBeDefined()
  })

  it('overrides title with page-specific value', () => {
    const meta = buildMetadata({ title: 'Products' })
    expect(meta.title).toContain('Products')
  })

  it('sets noindex robots when requested', () => {
    const meta = buildMetadata({ noIndex: true })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })
})

describe('buildOrganizationJsonLd', () => {
  it('returns valid Organization schema', () => {
    const jsonLd = buildOrganizationJsonLd()
    expect(jsonLd['@type']).toBe('Organization')
    expect(jsonLd['@context']).toBe('https://schema.org')
  })
})
