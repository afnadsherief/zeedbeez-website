/**
 * Font Configuration
 *
 * Per DESIGN.md: "Large, authoritative headlines" → Cormorant Garamond
 * "Highly readable body copy" → Inter
 */

import { Cormorant_Garamond, Inter } from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display-family',
  display: 'swap',
  preload: true,
})

export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-family',
  display: 'swap',
  preload: true,
})
