/**
 * Footer
 *
 * Per DESIGN.md: "Editorial pacing, spacious sections".
 * Minimal, premium — brand statement, not an information dump.
 */

import Link from 'next/link'

const FOOTER_LINKS = {
  Products: [
    { label: 'ZeedBeez Pro', href: '/products/zeedbeez-pro' },
    { label: 'Sleep Better', href: '/products/sleep-better' },
    { label: 'HyperMoon', href: '/products/hypermoon' },
    { label: 'Herbze', href: '/products/herbze' },
  ],
  Science: [
    { label: 'Research', href: '/research' },
    { label: 'Ingredients', href: '/ingredients' },
    { label: 'Our Process', href: '/manufacturing' },
  ],
  Company: [
    { label: 'Our Story', href: '/story' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border-soft bg-void" role="contentinfo">
      <div className="mx-auto max-w-7xl px-8 py-20">
        {/* Brand statement */}
        <div className="mb-16">
          <p className="font-display text-4xl font-light tracking-tight text-content-primary mb-4">
            Nature. Research. Trust.
          </p>
          <p className="text-sm text-content-tertiary max-w-sm leading-relaxed">
            Premium biotechnology wellness, rooted in science and designed for life.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {(
            Object.entries(FOOTER_LINKS) as [
              string,
              ReadonlyArray<{ label: string; href: string }>,
            ][]
          ).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs tracking-widest text-content-tertiary uppercase mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-content-secondary hover:text-gold-400 transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border-soft">
          <p className="text-xs text-content-disabled">© {year} ZeedBeez. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-content-disabled hover:text-content-secondary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-content-disabled hover:text-content-secondary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
