/**
 * useQualityTier
 *
 * React hook wrapping the quality manager.
 * Components use this to adapt rendering based on device capability.
 */

'use client'

import { useState } from 'react'
import type { QualityTier } from '@/types'
import { getQualityTier } from '@/three/performance/qualityManager'

export function useQualityTier(): QualityTier {
  // Lazy initializer avoids setState-in-effect; SSR-safe because
  // getQualityTier() itself guards for `typeof window === 'undefined'`.
  const [tier] = useState<QualityTier>(() => getQualityTier())

  return tier
}
