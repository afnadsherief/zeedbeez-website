/**
 * Lighting System
 *
 * Shared lighting component. Accepts a preset name and applies
 * quality-adaptive lighting configuration.
 *
 * Per DESIGN.md: "Controlled glow, not excess bloom"
 * Per docs/08_3D_ENGINE.md: Every expensive effect must have a fallback.
 */

'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import type { DirectionalLight } from 'three'
import { LIGHTING_PRESETS, type LightingPresetName } from './presets'
import { getQualityTier } from '@/three/performance/qualityManager'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LightingSystemProps {
  readonly preset: LightingPresetName
  /** 0-1 blend factor for scene transition lighting */
  readonly blend?: number
}

/**
 * LightingSystem renders premium lighting for any scene.
 * High-tier devices get environment maps; low-tier fall back to direct lights only.
 */
export function LightingSystem({ preset }: LightingSystemProps) {
  const config = LIGHTING_PRESETS[preset]
  const tier = getQualityTier()
  const prefersReduced = useReducedMotion()
  const keyLightRef = useRef<DirectionalLight>(null!)

  // Subtle key light animation — breathing life into still scenes.
  // Per docs/17_ACCESSIBILITY.md: stopped for prefers-reduced-motion users;
  // the light still renders at a fixed intensity.
  useFrame(({ clock }) => {
    if (!keyLightRef.current || tier === 'low' || prefersReduced) return
    keyLightRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 0.4) * 0.05
  })

  return (
    <>
      {/* Ambient — base fill */}
      <ambientLight intensity={config.ambientIntensity} color={config.primaryColor} />

      {/* Key light — primary gold/warm */}
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 3]}
        intensity={1.4}
        color={config.primaryColor}
        castShadow={tier !== 'low'}
        shadow-mapSize={tier === 'high' || tier === 'ultra' ? 2048 : 1024}
      />

      {/* Rim light — accent colour from behind */}
      <directionalLight position={[-3, 2, -5]} intensity={0.6} color={config.accentColor} />

      {/* Fill light — soften harsh shadows */}
      <pointLight position={[0, -2, 3]} intensity={0.3} color={config.primaryColor} distance={8} />

      {/* Environment map for reflections — high-tier only */}
      {(tier === 'high' || tier === 'ultra') && <Environment preset="studio" background={false} />}
    </>
  )
}
