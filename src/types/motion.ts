/**
 * Motion and animation types.
 */

export type EasingName = 'premium' | 'spring' | 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear'

export interface MotionConfig {
  readonly duration: number
  readonly ease: EasingName
  readonly delay?: number
}

export interface ScrollProgress {
  readonly progress: number // 0-1
  readonly velocity: number
  readonly direction: 1 | -1
}

export type ReducedMotionPreference = 'full' | 'reduced' | 'none'
