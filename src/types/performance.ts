/**
 * Performance monitoring types.
 */

export interface PerformanceBudget {
  readonly fcp: number // First Contentful Paint ms
  readonly lcp: number // Largest Contentful Paint ms
  readonly fid: number // First Input Delay ms
  readonly cls: number // Cumulative Layout Shift score
  readonly fps: number // Target frames per second
}

export interface DeviceCapability {
  readonly tier: 'low' | 'medium' | 'high'
  readonly gpu: boolean
  readonly cores: number
  readonly memory: number | null
}
