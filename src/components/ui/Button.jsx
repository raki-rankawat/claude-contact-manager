// Polymorphic button. `as` lets it render as a <button> (default), an <a>, or a
// react-router <Link> while keeping consistent styling.
const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-brand text-white shadow-sm hover:bg-brand-dark',
  subtle: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
}

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <Comp
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    />
  )
}
