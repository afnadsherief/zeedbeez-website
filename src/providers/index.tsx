/**
 * Root Providers
 *
 * All platform-wide providers composed here and mounted once in the root layout.
 * Per docs/04_FOLDER_STRUCTURE.md: shared providers live in /providers.
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactNode } from 'react'
import { initScrollEngine, destroyScrollEngine } from '@/lib/scroll/scrollEngine'
import { prefersReducedMotion } from '@/utils/media'

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
  useEffect(() => {
    // Reduced motion check — skip smooth scroll if user prefers.
    // If we never initialised (because the user prefers reduced motion),
    // we must not call destroy — destroyScrollEngine() is a module-level
    // singleton and calling it without a matching init is a needless no-op
    // at best and a state-corruption risk if this ever gains side effects.
    if (prefersReducedMotion()) return

    initScrollEngine()

    return () => {
      destroyScrollEngine()
    }
  }, [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
