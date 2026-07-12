/**
 * Navigation
 *
 * Platform navigation skeleton.
 * Per DESIGN.md: "Minimal chrome" — navigation should not compete with the 3D experience.
 * Per docs/17_ACCESSIBILITY.md: keyboard navigable, visible focus states, semantic HTML.
 */

'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Research', href: '/research' },
  { label: 'Products', href: '/products' },
  { label: 'Ingredients', href: '/ingredients' },
  { label: 'Our Story', href: '/story' },
] as const

/**
 * Navigation renders the global top bar.
 * Transparent by default, designed to sit over the 3D hero canvas.
 */
export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  // Escape closes the mobile menu and returns focus to the toggle button —
  // per docs/17_ACCESSIBILITY.md keyboard-navigable requirement, found
  // missing during the Phase 1 accessibility audit.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6"
      role="banner"
    >
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:rounded-md focus:text-gold-400 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Wordmark */}
      <Link
        href="/"
        className="font-display text-xl tracking-wider text-content-primary hover:text-gold-400 transition-colors duration-300"
        aria-label="ZeedBeez — Home"
      >
        ZEEDBEEZ
      </Link>

      {/* Desktop nav */}
      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm tracking-wide text-content-secondary hover:text-content-primary transition-colors duration-300 focus-visible:text-gold-400"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/products"
          className="text-sm tracking-wider px-5 py-2.5 border border-gold-500/40 text-gold-400 hover:bg-gold-glass hover:border-gold-400 rounded-md transition-all duration-300 focus-visible:outline-gold-400"
        >
          Shop Now
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        ref={menuToggleRef}
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span
          className={`block w-6 h-px bg-content-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-content-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-content-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-full left-0 right-0 bg-depth border-t border-border-soft py-8 flex flex-col items-center gap-6"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-base tracking-wide text-content-secondary hover:text-content-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/products"
            className="mt-2 text-sm tracking-wider px-6 py-3 border border-gold-500/40 text-gold-400 hover:bg-gold-glass rounded-md transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </nav>
      )}
    </header>
  )
}
