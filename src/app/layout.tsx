/**
 * Root Layout
 *
 * Mounts global providers, fonts, metadata baseline, and structural layout.
 * Per docs/13_SEO_STRATEGY.md: metadata discipline from the root.
 * Per docs/17_ACCESSIBILITY.md: semantic HTML structure.
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { fontBody, fontDisplay } from '@/lib/fonts'
import { buildMetadata, buildOrganizationJsonLd } from '@/lib/metadata'
import { Providers } from '@/providers'
import '@/styles/globals.css'

export const metadata: Metadata = buildMetadata()

interface RootLayoutProps {
  readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const orgJsonLd = buildOrganizationJsonLd()

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-void text-content-primary antialiased">
        <Providers>
          <div id="top" />

          <Navigation />

          <main id="main-content" className="scroll-container relative">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
