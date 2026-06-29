import { Link, NavLink } from 'react-router-dom'
import { Home, UserPlus, Info } from 'lucide-react'

// Right-aligned nav links. `end` makes Home active only on the exact "/" path
// (otherwise NavLink to="/" would match every route).
const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/contact/add', label: 'Add', icon: UserPlus },
  { to: '/about', label: 'About', icon: Info },
]

function navLinkClass({ isActive }) {
  return [
    'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-white/20 text-white'
      : 'text-white/80 hover:bg-white/10 hover:text-white',
  ].join(' ')
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand shadow-md">
      <nav className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Contact Manager
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={navLinkClass}>
                <Icon size={16} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
