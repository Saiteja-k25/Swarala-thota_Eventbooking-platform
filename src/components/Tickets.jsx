import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tickets = [
  {
    name: 'Early Bird',
    price: '₹250',
    features: ['Limited seats', 'General entry', 'Live music access'],
    bestFor: 'Perfect for solo music lovers who plan ahead',
    popular: false,
  },
  {
    name: 'Regular',
    price: '₹299',
    features: ['General entry', 'Welcome drink', 'Live music access'],
    bestFor: 'The go-to pass for a complete musical evening',
    popular: true,
  },
  {
    name: 'Couple',
    price: '₹499',
    features: ['Entry for 2', 'Reserved seating', '2 Welcome drinks'],
    bestFor: 'A romantic evening under the stars for two',
    popular: false,
  },
  {
    name: 'Group of 5',
    price: '₹899',
    features: ['Entry for 5', 'Group seating', '5 Welcome drinks'],
    bestFor: 'Bring the squad for an unforgettable night out',
    popular: false,
  },
]

function TicketCard({ ticket, index, hoveredIndex, setHoveredIndex }) {
  const isHovered = hoveredIndex === index
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const someHovered = hoveredIndex !== null
  const isDimmed = someHovered && !isHovered

  return (
    <motion.div
      className={`ticket-card ${ticket.popular ? 'popular' : ''}`}
      layout
      onHoverStart={() => !isMobile && setHoveredIndex(index)}
      onHoverEnd={() => !isMobile && setHoveredIndex(null)}
      animate={{
        opacity: isDimmed ? 0.55 : 1,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{
        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      style={{
        boxShadow: isHovered
          ? '0 0 30px rgba(200,168,75,0.3), 0 20px 40px rgba(0,0,0,0.3)'
          : '0 0 0 transparent',
        borderColor: isHovered
          ? 'rgba(200, 168, 75, 0.5)'
          : 'rgba(200, 168, 75, 0.1)',
      }}
    >
      {ticket.popular && (
        <div className="ticket-popular-badge">Popular</div>
      )}
      <div className="ticket-name">{ticket.name}</div>
      <div className="ticket-price">
        {ticket.price} <span>/ person</span>
      </div>
      <ul className="ticket-features">
        {ticket.features.map((f, j) => (
          <li key={j}>{f}</li>
        ))}
      </ul>

      {/* Expanded content — visible on hover (desktop) or always (mobile) */}
      <AnimatePresence>
        {(isHovered || isMobile) && (
          <motion.div
            className="ticket-expand"
            initial={isMobile ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ticket-bestfor">{ticket.bestFor}</p>
            <div className="ticket-expand-divider" />
            <motion.div
              initial={isMobile ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0 : 0.1, duration: 0.3 }}
            >
              <Link to="/booking" className="ticket-book-btn">
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Tickets() {
  const sectionRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.ticket-card')
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.tickets-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="tickets-section" id="passes" ref={sectionRef}>
      <div className="section-header">
        <p className="section-label">Passes</p>
        <h2 className="section-title">
          Choose Your <span>Experience</span>
        </h2>
        <p className="section-desc">
          Every pass unlocks an evening of soulful music, warm vibes, and
          unforgettable memories under the stars.
        </p>
      </div>

      <div className="tickets-grid">
        {tickets.map((ticket, i) => (
          <TicketCard
            key={i}
            ticket={ticket}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  )
}
