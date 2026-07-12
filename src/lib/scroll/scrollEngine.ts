/**
 * Scroll Engine
 *
 * Integrates Lenis smooth scroll with GSAP ScrollTrigger.
 * Per docs/10_SCROLL_STORY.md: scroll timelines must be centralised and reusable.
 */

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function initScrollEngine(): Lenis {
  if (lenis) {
    lenis.destroy()
  }

  lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  })

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  lenis.on('scroll', ScrollTrigger.update)

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (value !== undefined) {
        lenis?.scrollTo(value, { immediate: true })
      }
      return lenis?.scroll ?? window.scrollY
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  })

  ScrollTrigger.addEventListener('refresh', () => lenis?.resize())
  ScrollTrigger.refresh()

  return lenis
}

export function destroyScrollEngine(): void {
  lenis?.destroy()
  lenis = null
  ScrollTrigger.killAll()
  ScrollTrigger.clearScrollMemory()
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean },
): void {
  lenis?.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
    immediate: options?.immediate ?? false,
  })
}
