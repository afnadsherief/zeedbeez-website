/**
 * Hero Scene
 *
 * Composes shared 3D systems into the premium hero experience.
 * Per docs/02_ARCHITECTURE.md: build from shared systems, never page-specific logic.
 * Per docs/THREE_ENGINE.md: compose scenes from shared primitives.
 */

'use client'

import { SceneManager } from '@/three/scene/SceneManager'
import { CameraRig } from '@/three/camera/CameraRig'
import { LightingSystem } from '@/three/lighting/LightingSystem'
import { HeroBottle } from './HeroBottle'

interface HeroSceneProps {
  readonly scrollProgress?: number
}

/**
 * HeroScene is the first premium 3D experience.
 * All systems are composed from shared engine modules.
 */
export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  return (
    <SceneManager>
      <CameraRig mode="heroOrbit" parallaxStrength={0.025} />
      <LightingSystem preset="hero" />
      <HeroBottle scrollProgress={scrollProgress} />

      {/* Ground reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#0c0c0e"
          metalness={0.4}
          roughness={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </SceneManager>
  )
}
