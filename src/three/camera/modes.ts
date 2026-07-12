/**
 * Camera Modes
 *
 * Cinematic camera positions per scene.
 * Per docs/CAMERA.md: movement must feel intentional and support scroll transitions.
 */

import type { CameraMode } from '@/types'

export const CAMERA_MODES = {
  /** Hero orbit — front-centered product reveal */
  heroOrbit: {
    name: 'heroOrbit',
    position: [0, 0, 4] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 45,
  },

  /** Product reveal — slight low angle, dramatic */
  productReveal: {
    name: 'productReveal',
    position: [0.8, -0.5, 3.5] as [number, number, number],
    target: [0, 0.2, 0] as [number, number, number],
    fov: 42,
  },

  /** Research exploration — overhead, analytical */
  researchExploration: {
    name: 'researchExploration',
    position: [0, 2, 3] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 50,
  },

  /** Ingredient close-up — tight macro feel */
  ingredientCloseUp: {
    name: 'ingredientCloseUp',
    position: [0, 0, 2] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 35,
  },

  /** Manufacturing — wide industrial perspective */
  manufacturing: {
    name: 'manufacturing',
    position: [2, 1, 5] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 55,
  },
} as const satisfies Record<string, CameraMode>

export type CameraModeName = keyof typeof CAMERA_MODES
