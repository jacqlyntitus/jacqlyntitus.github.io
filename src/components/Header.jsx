import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/jt-logo.png'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo-link">
        <img
          className="header-logo"
          src={logo}
          alt="Jacqlyn Titus JT monogram logo"
        />
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/links">Links</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}
