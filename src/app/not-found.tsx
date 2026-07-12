/**
 * 404 Page
 */

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-void text-content-primary px-8 text-center">
      <p className="text-gold-400 text-sm tracking-widest uppercase mb-4">404</p>
      <h1 className="font-display text-4xl mb-4">Page not found</h1>
      <p className="text-content-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-md text-sm font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
