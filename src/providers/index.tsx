/**
 * Root Providers
 *
 * All platform-wide providers composed here and mounted once in the root layout.
 * Per docs/04_FOLDER_STRUCTURE.md: shared providers live in /providers.
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useRef, type ReactNode } from 'react'
import { initScrollEngine, destroyScrollEngine } from '@/lib/scroll/scrollEngine'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  readonly children: ReactNode
}

/**
 * Providers mounts all platform-level context providers.
 * Initialises the scroll engine on the client.
 */
export function Providers({ children }: ProvidersProps) {
  const scrollInitialised = useRef(false)

  useEffect(() => {
    if (scrollInitialised.current) return
    scrollInitialised.current = true

    // Reduced motion check — skip smooth scroll if user prefers
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      initScrollEngine()
    }

    return () => {
      destroyScrollEngine()
    }
  }, [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
