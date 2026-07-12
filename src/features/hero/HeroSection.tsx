/**
 * Hero Section
 *
 * Premium full-viewport hero experience.
 * Per DESIGN.md: "Large, authoritative headlines. Short premium statements."
 * Per docs/30_PHASE_1_IMPLEMENTATION_SPEC.md: "hero scene renders with premium motion direction."
 */

'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { DURATIONS, GSAP_EASES } from '@/lib/motion/timings'

/**
 * HeroScene (Three.js/R3F/drei — the largest client bundle in the app) is
 * loaded dynamically so the LCP-critical headline/copy above renders and
 * paints immediately, without waiting on the 3D engine to download and
 * initialise. `ssr: false` is required because R3F's Canvas touches
 * WebGL/window APIs that do not exist on the server.
 */
const HeroScene = dynamic(() => import('./components/HeroScene').then((mod) => mod.HeroScene), {
  ssr: false,
})

/**
 * HeroSection renders the 3D canvas fixed behind the editorial overlay.
 * Text is revealed with GSAP on mount; scroll drives the camera.
 */
export function HeroSection() {
  const { progress } = useScrollProgress()
  const prefersReduced = useReducedMotion()

  const containerRef = useRef<HTMLElement>(null)

  // Entrance animation — GSAP stagger reveal.
  // useGSAP scopes selectors to containerRef and auto-reverts the animation
  // context on unmount/re-run, which raw useEffect + gsap.fromTo does not
  // guarantee (no cleanup was being returned previously).
  useGSAP(
    () => {
      if (prefersReduced) return

      gsap.fromTo(
        '[data-hero-reveal]',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: DURATIONS.premium,
          ease: GSAP_EASES.reveal,
          stagger: 0.12,
          delay: 0.4,
        },
      )
    },
    { scope: containerRef, dependencies: [prefersReduced] },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero — ZeedBeez Premium Wellness"
    >
      {/* 3D Canvas Layer */}
      <HeroScene scrollProgress={progress} />

      {/* Gradient overlay — pulls content from dark canvas */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void/60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen pb-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <p
          data-hero-reveal
          className="text-xs tracking-widest uppercase text-gold-400 mb-6 opacity-0"
        >
          Biotechnology Wellness
        </p>

        {/* Headline */}
        <h1
          data-hero-reveal
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-content-primary leading-none mb-6 opacity-0 max-w-3xl"
        >
          Nature.
          <br />
          <span className="text-gold-400 italic">Refined.</span>
        </h1>

        {/* Subtitle */}
        <p
          data-hero-reveal
          className="text-base md:text-lg text-content-secondary max-w-md leading-relaxed mb-10 opacity-0"
        >
          Premium biotechnology wellness rooted in science, designed for the demands of modern life.
        </p>

        {/* CTA */}
        <div data-hero-reveal className="flex items-center gap-4 opacity-0">
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black text-sm font-medium tracking-wide px-7 py-3.5 rounded-md transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
          >
            Discover Products
          </a>
          <a
            href="/research"
            className="inline-flex items-center gap-2 border border-glass-border text-content-secondary hover:text-content-primary hover:border-glass-heavy text-sm tracking-wide px-7 py-3.5 rounded-md transition-all duration-300 backdrop-blur-sm"
          >
            The Science
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest text-content-disabled uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-content-disabled to-transparent" />
        </div>
      </div>
    </section>
  )
}
