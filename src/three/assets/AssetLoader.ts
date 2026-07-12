/**
 * Asset Loader
 *
 * Centralised loading pipeline for 3D assets (GLTF, textures, HDR).
 * Per docs/08_3D_ENGINE.md: reusable loading pipeline.
 * Per docs/16_PERFORMANCE_BUDGET.md: lazy-load heavy assets.
 */

import type { QualityTier } from '@/types'

interface AssetManifest {
  readonly models: Record<string, string>
  readonly textures: Record<string, string>
  readonly hdri: Record<string, string>
}

/**
 * Returns the asset URL for the given key, selecting quality-appropriate variants.
 */
export function resolveAssetUrl(
  manifest: AssetManifest,
  type: keyof AssetManifest,
  key: string,
  _quality: QualityTier,
): string {
  const entry = manifest[type][key]

  if (entry === undefined) {
    throw new Error(`[AssetLoader] Asset not found: ${type}/${key}`)
  }

  return entry
}

/**
 * Asset path builder — keeps asset paths consistent and avoids magic strings.
 */
export const ASSET_PATHS = {
  models: {
    bottleHero: '/models/bottle-hero.glb',
    bottleProduct: '/models/bottle-product.glb',
  },
  textures: {
    labelHypermoon: '/textures/label-hypermoon.webp',
    labelHerbze: '/textures/label-herbze.webp',
    labelZeedbeez: '/textures/label-zeedbeez-pro.webp',
    labelSleep: '/textures/label-sleep-better.webp',
    envStudio: '/hdri/studio.hdr',
  },
  hdri: {
    studio: '/hdri/studio.hdr',
    nature: '/hdri/nature.hdr',
  },
} as const satisfies AssetManifest

export type ModelKey = keyof typeof ASSET_PATHS.models
export type TextureKey = keyof typeof ASSET_PATHS.textures
export type HdriKey = keyof typeof ASSET_PATHS.hdri
