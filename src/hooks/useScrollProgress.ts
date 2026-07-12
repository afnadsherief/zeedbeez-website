/**
 * useScrollProgress
 *
 * Returns normalised scroll progress (0–1) for the full page.
 * Drives 3D camera and scene transitions per docs/10_SCROLL_STORY.md.
 */

'use client'

import { useState, useEffect } from 'react'
import type { ScrollProgress } from '@/types'

/**
 * Tracks scroll position and converts to normalised progress.
 * Respects reduced-motion preference by returning static values.
 */
export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    velocity: 0,
    direction: 1,
  })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let lastY = window.scrollY
    let lastTime = performance.now()
    let rafId: number

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const now = performance.now()
        const y = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0
        const dt = now - lastTime
        const velocity = dt > 0 ? (y - lastY) / dt : 0
        const direction = velocity >= 0 ? 1 : -1

        setState({ progress, velocity: Math.abs(velocity), direction })

        lastY = y
        lastTime = now
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return state
}
