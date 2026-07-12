/**
 * Global Loading State
 * Per docs/16_PERFORMANCE_BUDGET.md: perceived performance matters as much as real performance.
 */

export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-void"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
