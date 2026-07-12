'use client'

/**
 * Global Error Boundary
 * Per docs/19_SECURITY.md: never leak stack traces or internals to the client.
 */

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error.digest ?? error.message)
  }, [error])

  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col items-center justify-center bg-void text-content-primary px-8 text-center"
    >
      <h1 className="font-display text-4xl mb-4">Something went wrong</h1>
      <p className="text-content-secondary mb-8 max-w-md">
        We hit an unexpected issue loading this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
      >
        Try again
      </button>
    </div>
  )
}
