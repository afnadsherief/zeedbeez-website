/**
 * Lighting Presets
 *
 * Centralized lighting configurations for each narrative scene.
 * Per docs/CAMERA.md and DESIGN.md: lighting supports brand story and product credibility.
 */

import type { LightingPreset } from '@/types'

export const LIGHTING_PRESETS = {
  /** Hero — premium product reveal, warm gold backlight */
  hero: {
    name: 'hero',
    ambientIntensity: 0.15,
    primaryColor: '#fcd34d', // warm gold key light
    accentColor: '#1e3a5f', // deep blue rim
  },

  /** Nature — organic warmth, soft diffusion */
  nature: {
    name: 'nature',
    ambientIntensity: 0.4,
    primaryColor: '#fde68a', // honey-warm
    accentColor: '#134e2a', // deep forest green
  },

  /** Research — cool, scientific, precise */
  research: {
    name: 'research',
    ambientIntensity: 0.25,
    primaryColor: '#bfdbfe', // cool blue-white
    accentColor: '#1e1e24', // charcoal
  },

  /** Manufacturing — industrial, confident */
  manufacturing: {
    name: 'manufacturing',
    ambientIntensity: 0.2,
    primaryColor: '#ffffff',
    accentColor: '#fbbf24', // gold accent
  },

  /** Product — hero-quality, optimised for bottle showcase */
  product: {
    name: 'product',
    ambientIntensity: 0.1,
    primaryColor: '#fbbf24',
    accentColor: '#60a5fa', // soft blue fill
  },
} as const satisfies Record<string, LightingPreset>

export type LightingPresetName = keyof typeof LIGHTING_PRESETS
