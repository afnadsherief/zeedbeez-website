import { describe, it, expect } from 'vitest'
import {
  getQualityTier,
  setQualityTier,
  getAdaptivePixelRatio,
} from '@/three/performance/qualityManager'

describe('qualityManager', () => {
  it('returns a valid quality tier', () => {
    const tier = getQualityTier()
    expect(['low', 'medium', 'high', 'ultra']).toContain(tier)
  })

  it('allows manual override', () => {
    setQualityTier('low')
    expect(getQualityTier()).toBe('low')
  })

  it('returns pixel ratio of 1 for low tier', () => {
    setQualityTier('low')
    expect(getAdaptivePixelRatio()).toBe(1)
  })
})
