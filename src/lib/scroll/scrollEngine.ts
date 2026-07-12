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

// Named references to the ticker/refresh callbacks so destroyScrollEngine()
// can actually remove them. Previously these were anonymous inline
// functions passed to gsap.ticker.add()/ScrollTrigger.addEventListener(),
// which meant destroy() had no way to unregister them — each
// init→destroy cycle (StrictMode double-invoke, hot reload, or any future
// multi-mount) permanently stacked another ticker callback, each holding a
// closure over a stale `lenis` instance. Fixed by naming and removing them.
let tickerCallback: ((time: number) => void) | null = null
let refreshCallback: (() => void) | null = null

export function initScrollEngine(): Lenis {
  if (lenis) {
    destroyScrollEngine()
  }

  lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  })

  tickerCallback = (time: number) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
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

  refreshCallback = () => lenis?.resize()
  ScrollTrigger.addEventListener('refresh', refreshCallback)
  ScrollTrigger.refresh()

  return lenis
}

export function destroyScrollEngine(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }

  if (refreshCallback) {
    ScrollTrigger.removeEventListener('refresh', refreshCallback)
    refreshCallback = null
  }

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
