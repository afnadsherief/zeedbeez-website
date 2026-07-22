/**
 * Hero Bottle
 *
 * Premium 3D bottle component for the hero scene.
 * Per DESIGN.md: "Glass must feel premium and realistic."
 * Per docs/08_3D_ENGINE.md: compose from shared material presets, never inline.
 */

'use client'

import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getQualityTier } from '@/three/performance/qualityManager'

interface HeroBottleProps {
  /** Scroll progress 0-1 drives rotation and position */
  readonly scrollProgress?: number
}

/**
 * HeroBottle renders a premium glass bottle with transmission material.
 * On low-tier devices it falls back to a simpler MeshStandardMaterial.
 */
export function HeroBottle({ scrollProgress = 0 }: HeroBottleProps) {
  const meshRef = useRef<Mesh>(null!)
  const tier = getQualityTier()
  const prefersReduced = useReducedMotion()

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    if (prefersReduced) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 0.5
      meshRef.current.position.y = 0
      return
    }

    meshRef.current.rotation.y = clock.elapsedTime * 0.12 + scrollProgress * Math.PI * 0.5
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.04
  })

  return (
    <Float
      speed={prefersReduced ? 0 : 0.6}
      rotationIntensity={prefersReduced ? 0 : 0.08}
      floatIntensity={prefersReduced ? 0 : 0.12}
    >
      {/* Placeholder geometry — replace with an approved GLTF model in Sprint 2. */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.35, 1.8, 64, 1, true]} />

        {tier === 'low' ? (
          <meshStandardMaterial
            color="#d4a853"
            metalness={0.1}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        ) : (
          <MeshTransmissionMaterial
            backside
            samples={tier === 'ultra' ? 16 : tier === 'high' ? 8 : 4}
            resolution={tier === 'ultra' ? 512 : tier === 'high' ? 384 : 256}
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={tier === 'medium' ? 0 : 0.02}
            anisotropy={tier === 'medium' ? 0 : 0.2}
            color="#fef3c7"
            attenuationDistance={0.5}
            attenuationColor="#fcd34d"
          />
        )}
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.27, 0.31, 1.2, 32]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}
