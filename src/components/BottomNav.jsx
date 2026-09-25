import { NavLink } from 'react-router-dom'
import { Briefcase, Home, Link, Mail } from 'lucide-react'
import './BottomNav.css'

const items = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/portfolio', label: 'Portfolio', Icon: Briefcase },
  { to: '/links', label: 'Links', Icon: Link },
  { to: '/contact', label: 'Contact', Icon: Mail },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} aria-label={label}>
          <Icon aria-hidden="true" />
        </NavLink>
      ))}
    </nav>
  )
}
