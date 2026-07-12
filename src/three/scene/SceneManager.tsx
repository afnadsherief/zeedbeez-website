/**
 * Scene Manager
 *
 * Core architectural rule (docs/02_ARCHITECTURE.md):
 * "Do not duplicate scene logic across pages. Build shared systems and compose them."
 *
 * This component provides the R3F Canvas with adaptive quality settings.
 * Individual scenes are composed inside it — never standalone.
 */

'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense, type ReactNode } from 'react'
import { getAdaptivePixelRatio, getQualityTier } from '@/three/performance/qualityManager'

interface SceneManagerProps {
  readonly children: ReactNode
  /** Enables pointer events on the canvas (interactive scenes) */
  readonly interactive?: boolean
  /** Override CSS class for the container */
  readonly className?: string
}

/**
 * SceneManager wraps every R3F scene.
 * It applies adaptive pixel ratio, performance defaults, and error boundaries.
 * Do not create Canvas elements outside of this component.
 */
export function SceneManager({ children, interactive = false, className }: SceneManagerProps) {
  const tier = getQualityTier()
  const dpr = getAdaptivePixelRatio()

  return (
    <div
      className={`three-canvas-container ${interactive ? 'three-canvas-container--interactive' : ''} ${className ?? ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        gl={{
          antialias: tier !== 'low',
          alpha: true,
          powerPreference: tier === 'low' ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 4] }}
        shadows={tier !== 'low'}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
