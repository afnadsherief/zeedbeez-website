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
import { fontBody, fontDisplay } from '@/lib/fonts'
import { buildMetadata, buildOrganizationJsonLd } from '@/lib/metadata'
import { Providers } from '@/providers'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
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
      suppressHydrationWarning
    >
      <head>
        {/* Organisation structured data — SEO baseline */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-void text-content-primary antialiased">
        <Providers>
          {/* Skip link target */}
          <div id="top" />

          {/* Global navigation */}
          <Navigation />

          {/* Page content — <main> has an implicit ARIA role of "main";
              an explicit role attribute here would be redundant. */}
          <main id="main-content" className="scroll-container relative">
            {children}
          </main>

          {/* Global footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
