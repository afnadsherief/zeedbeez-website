/**
 * Camera Rig
 *
 * Shared cinematic camera controller.
 * Per docs/CAMERA.md: movement must feel intentional, use smooth interpolation,
 * and support scroll-driven transitions.
 *
 * Compose this inside SceneManager. Pass the desired CameraModeName.
 *
 * NOTE on react-hooks/immutability: react-three-fiber's useFrame callback is
 * an imperative render-loop hook that runs outside React's commit phase by
 * design — mutating `camera.position`, `camera.fov`, etc. inside it is the
 * documented, correct R3F pattern (see R3F "Automatic disposal" / animation
 * docs), not a React anti-pattern. The React Compiler's mutation-safety rule
 * cannot distinguish this from mutating a hook's return value during render,
 * so it is disabled for this file only.
 */

/* eslint-disable react-hooks/immutability -- see file-level note above: useFrame is an
   imperative render-loop callback, not React render code. */

'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import type * as THREE from 'three'
import { CAMERA_MODES, type CameraModeName } from './modes'
import type { ScrollProgress } from '@/types'

interface CameraRigProps {
  /** Predefined camera mode from CAMERA_MODES */
  readonly mode: CameraModeName
  /** Optional scroll progress to drive camera animations */
  readonly scroll?: ScrollProgress
  /** Damping factor — lower = slower/smoother */
  readonly damping?: number
  /** Subtle parallax from pointer movement (0 = disabled) */
  readonly parallaxStrength?: number
}

/**
 * CameraRig smoothly transitions the camera to the configured mode.
 * Pointer parallax adds subtle premium feel without being distracting.
 *
 * All camera mutation happens inside useFrame (the R3F render loop) rather
 * than in an effect — this is the correct imperative-mutation boundary for
 * three.js objects and keeps the component compiler-safe.
 */
export function CameraRig({
  mode,
  scroll: _scroll,
  damping = 0.05,
  parallaxStrength = 0.03,
}: CameraRigProps) {
  const { camera, pointer } = useThree()
  const lastMode = useRef<CameraModeName | null>(null)

  useFrame((_state, delta) => {
    const config = CAMERA_MODES[mode]

    // Apply FOV/lens changes only when the mode actually changes,
    // since this mutates the projection matrix (a relatively costly op).
    if (lastMode.current !== mode) {
      lastMode.current = mode
      if ('fov' in camera) {
        const perspectiveCamera = camera as THREE.PerspectiveCamera
        perspectiveCamera.fov = config.fov
        perspectiveCamera.updateProjectionMatrix()
      }
    }

    const [tx, ty, tz] = config.position

    // Subtle pointer parallax
    const px = pointer.x * parallaxStrength
    const py = pointer.y * parallaxStrength

    // Smooth damp to target with parallax offset
    easing.damp3(camera.position, [tx + px, ty + py, tz], damping, delta)

    // Always look at target
    camera.lookAt(...config.target)
  })

  return null
}
