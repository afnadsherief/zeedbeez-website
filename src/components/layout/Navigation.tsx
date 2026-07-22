/**
 * Navigation
 *
 * Platform navigation skeleton.
 * Per DESIGN.md: "Minimal chrome" — navigation should not compete with the 3D experience.
 * Per docs/17_ACCESSIBILITY.md: keyboard navigable, visible focus states, semantic HTML.
 */

'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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
  const mobileMenuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-gold-400 focus:outline-none"
      >
        Skip to main content
      </a>

      <Link
        href="/"
        className="font-display text-xl tracking-wider text-content-primary transition-colors duration-300 hover:text-gold-400"
        aria-label="ZeedBeez — Home"
      >
        ZEEDBEEZ
      </Link>

      <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm tracking-wide text-content-secondary transition-colors duration-300 hover:text-content-primary focus-visible:text-gold-400"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-4 md:flex">
        <Link
          href="/products"
          className="rounded-md border border-gold-500/40 px-5 py-2.5 text-sm tracking-wider text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-glass focus-visible:outline-gold-400"
        >
          Shop Now
        </Link>
      </div>

      <button
        ref={menuToggleRef}
        type="button"
        className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-md p-2 md:hidden"
        aria-controls="mobile-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span
          className={`block h-px w-6 bg-content-primary transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`block h-px w-6 bg-content-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-px w-6 bg-content-primary transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {menuOpen && (
        <nav
          ref={mobileMenuRef}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute top-full left-0 right-0 flex max-h-[calc(100svh-4.5rem)] flex-col items-center gap-6 overflow-y-auto border-t border-border-soft bg-depth px-4 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:max-h-[calc(100svh-5.5rem)]"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="min-h-11 px-4 py-2 text-base tracking-wide text-content-secondary transition-colors hover:text-content-primary"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/products"
            className="mt-2 inline-flex min-h-11 items-center rounded-md border border-gold-500/40 px-6 py-3 text-sm tracking-wider text-gold-400 transition-all hover:bg-gold-glass"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </nav>
      )}
    </header>
  )
}
