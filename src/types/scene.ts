/**
 * 3D scene and engine types.
 * Aligns with docs/02_ARCHITECTURE.md Core Systems.
 */

export type QualityTier = 'low' | 'medium' | 'high' | 'ultra'

export type SceneId = 'hero' | 'nature' | 'research' | 'ingredients' | 'manufacturing' | 'product'

export interface SceneConfig {
  readonly id: SceneId
  readonly scrollStart: number // 0-1 normalized
  readonly scrollEnd: number
  readonly qualityTier: QualityTier
}

export interface CameraMode {
  readonly name: string
  readonly position: [number, number, number]
  readonly target: [number, number, number]
  readonly fov: number
}

export interface LightingPreset {
  readonly name: string
  readonly ambientIntensity: number
  readonly primaryColor: string
  readonly accentColor: string
}

export interface MaterialPreset {
  readonly name: string
  readonly metalness: number
  readonly roughness: number
  readonly transmission?: number
  readonly thickness?: number
}
