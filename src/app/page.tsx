/**
 * Home Page
 *
 * Composes the hero experience. Per docs/30_PHASE_1_IMPLEMENTATION_SPEC.md,
 * Phase 1 delivers only the hero + shell — full narrative sections are Phase 2+.
 */

import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { HeroSection } from '@/features/hero/HeroSection'

export const metadata: Metadata = buildMetadata({
  title: 'Premium Biotechnology Wellness',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Narrative sections (Nature → Research → ... → Trust) — Phase 2 */}
    </>
  )
}
