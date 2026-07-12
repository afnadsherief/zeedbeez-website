/**
 * Quality Manager
 *
 * Detects device capability and returns the appropriate quality tier.
 * All 3D systems read from this to adapt rendering cost.
 *
 * Rule (docs/08_3D_ENGINE.md): Every expensive effect must have a fallback.
 */

import type { QualityTier, DeviceCapability } from '@/types'

function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') {
    return { tier: 'medium', gpu: false, cores: 2, memory: null }
  }

  const cores = navigator.hardwareConcurrency ?? 2
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null
  const hasGPU = !!window.WebGL2RenderingContext

  let tier: DeviceCapability['tier']

  if (!hasGPU || cores <= 2 || (memory !== null && memory < 2)) {
    tier = 'low'
  } else if (cores <= 4 || (memory !== null && memory < 4)) {
    tier = 'medium'
  } else {
    tier = 'high'
  }

  return { tier, gpu: hasGPU, cores, memory }
}

/** Map device tier to 3D quality tier */
function resolveQualityTier(capability: DeviceCapability): QualityTier {
  const map: Record<DeviceCapability['tier'], QualityTier> = {
    low: 'low',
    medium: 'medium',
    high: 'high',
  }
  return map[capability.tier]
}

let _cached: QualityTier | null = null

/**
 * Returns the quality tier for this device.
 * Result is cached after first call.
 */
export function getQualityTier(): QualityTier {
  if (_cached !== null) return _cached
  const capability = detectDeviceCapability()
  _cached = resolveQualityTier(capability)
  return _cached
}

/** Override quality tier (e.g. from user settings) */
export function setQualityTier(tier: QualityTier): void {
  _cached = tier
}

/** Returns the pixel ratio appropriate for the current quality tier */
export function getAdaptivePixelRatio(): number {
  const tier = getQualityTier()
  const deviceRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  switch (tier) {
    case 'low':
      return 1
    case 'medium':
      return Math.min(deviceRatio, 1.5)
    case 'high':
      return Math.min(deviceRatio, 2)
    case 'ultra':
      return deviceRatio
  }
}
