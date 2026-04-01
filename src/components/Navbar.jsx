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
        <img src={logoEn} alt="Swarala Thota" className="nav-logo" />
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
        <li><a href="#passes" onClick={() => scrollTo('passes')}>Passes</a></li>
        <li><a href="#vibe" onClick={() => scrollTo('vibe')}>Vibe</a></li>
        <li><a href="#venue" onClick={() => scrollTo('venue')}>Venue</a></li>
      </ul>

      <Link to="/booking" className="nav-cta"><span>Book Now</span></Link>
    </nav>
  )
}
