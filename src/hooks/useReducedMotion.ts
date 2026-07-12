/**
 * useReducedMotion
 *
 * Returns true when the user prefers reduced motion.
 * Per docs/17_ACCESSIBILITY.md: all animations must respect this preference.
 */

'use client'

import { useState, useEffect } from 'react'
import { prefersReducedMotion, getReducedMotionMediaQuery } from '@/utils/media'

export function useReducedMotion(): boolean {
  // Lazy initializer captures the correct value on first render,
  // avoiding a setState call inside the effect body.
  const [prefersReduced, setPrefersReduced] = useState<boolean>(prefersReducedMotion)

  useEffect(() => {
    const mq = getReducedMotionMediaQuery()
    if (!mq) return

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}
