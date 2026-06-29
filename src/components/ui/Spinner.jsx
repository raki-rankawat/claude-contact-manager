// Centered loading indicator. CSS border spinner so it needs no icon import.
export default function Spinner({ label = 'Loading…' }) {
  return (
    <div
      className="flex items-center justify-center py-16"
      role="status"
      aria-live="polite"
    >
      <span className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
      <span className="sr-only">{label}</span>
    </div>
  )
}
