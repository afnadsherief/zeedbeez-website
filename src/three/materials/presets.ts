/**
 * Material Presets
 *
 * Reusable PBR material configurations for premium 3D product rendering.
 * Per docs/09_SHADER_GUIDELINES.md: materials must have purpose, fallback, and performance budget.
 */

import type { MaterialPreset } from '@/types'

export const MATERIAL_PRESETS = {
  /** Premium glass — bottle body */
  glass: {
    name: 'glass',
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 0.5,
  },

  /** Honey liquid — viscous, amber, luminous */
  honey: {
    name: 'honey',
    metalness: 0.0,
    roughness: 0.15,
    transmission: 0.7,
    thickness: 0.8,
  },

  /** Metal cap — brushed gold */
  metalGold: {
    name: 'metalGold',
    metalness: 0.9,
    roughness: 0.2,
  },

  /** Matte label surface */
  label: {
    name: 'label',
    metalness: 0.0,
    roughness: 0.85,
  },

  /** Environment — subtle reflective floor */
  floor: {
    name: 'floor',
    metalness: 0.1,
    roughness: 0.6,
  },
} as const satisfies Record<string, MaterialPreset>

export type MaterialPresetName = keyof typeof MATERIAL_PRESETS
