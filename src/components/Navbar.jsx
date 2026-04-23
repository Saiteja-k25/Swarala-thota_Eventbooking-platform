import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoEn from '../assets/logo_en.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <Link to="/" className="nav-brand">
        <img src={logoEn} alt="Swarala Thota" className="nav-logo" style={{ borderRadius: '50%' }} />
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span style={menuOpen ? { transform: 'rotate(45deg) translateY(7px)' } : {}} />
        <span style={menuOpen ? { opacity: 0 } : {}} />
        <span style={menuOpen ? { transform: 'rotate(-45deg) translateY(-7px)' } : {}} />
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#about" onClick={() => scrollTo('about')}>About</a></li>
        <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
      </ul>

      <button className="nav-login-icon" aria-label="Login">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
    </nav>
  )
}
