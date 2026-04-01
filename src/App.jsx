import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Booking from './pages/Booking'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

function AppContent() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  )
}

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after layout settles
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(refreshTimeout)
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
