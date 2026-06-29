// Labeled text field with inline error state (red border + message), driven
// entirely by props so the parent form owns the value.
export default function TextInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={[
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2',
          error
            ? 'border-brand focus:border-brand focus:ring-brand/30'
            : 'border-gray-300 focus:border-brand focus:ring-brand/20',
        ].join(' ')}
      />
      {error && <p className="text-sm text-brand">{error}</p>}
    </div>
  )
}
