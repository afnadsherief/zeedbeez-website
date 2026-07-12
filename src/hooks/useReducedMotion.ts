/**
 * useReducedMotion
 *
 * Returns true when the user prefers reduced motion.
 * Per docs/17_ACCESSIBILITY.md: all animations must respect this preference.
 */

'use client'

import { useState, useEffect } from 'react'

function readPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion(): boolean {
  // Lazy initializer captures the correct value on first render,
  // avoiding a setState call inside the effect body.
  const [prefersReduced, setPrefersReduced] = useState<boolean>(readPrefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}
