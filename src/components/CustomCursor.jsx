import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out',
      })
      gsap.to(ring, {
        x: e.clientX - 18,
        y: e.clientY - 18,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      cursor.classList.add('hovering')
      ring.classList.add('hovering')
    }

    const onMouseLeave = () => {
      cursor.classList.remove('hovering')
      ring.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMouseMove)

    // Add hover effects to all interactive elements
    const interactives = document.querySelectorAll('a, button, .ticket-card, .vibe-card, .stat-card, .booking-option')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // Re-attach after route changes using MutationObserver
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, .ticket-card, .vibe-card, .stat-card, .booking-option')
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
