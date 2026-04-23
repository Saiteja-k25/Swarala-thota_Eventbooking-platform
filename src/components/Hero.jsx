import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import logoEn from '../assets/logo_en.png'
import logoTe from '../assets/logo_te.png'

const petals = ['🌸', '🍃', '♪', '🌺', '🍂', '♫', '🌿', '✿', '🎵', '🌸', '🍃', '♪', '🌺', '🍂', '♫', '🌿']

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const petalsRef = useRef(null)

  useEffect(() => {
    if (!petalsRef.current) return

    const petalEls = petalsRef.current.querySelectorAll('.petal')
    petalEls.forEach((petal) => {
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const duration = 6 + Math.random() * 8
      const delay = Math.random() * 5

      gsap.set(petal, {
        left: `${startX}%`,
        top: `${startY}%`,
        opacity: 0,
        scale: 0.6 + Math.random() * 0.6,
      })

      gsap.to(petal, {
        y: -150 - Math.random() * 200,
        x: (Math.random() - 0.5) * 150,
        rotation: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.3,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        yoyo: false,
        modifiers: {
          y: (y) => {
            const val = parseFloat(y)
            if (val < -300) return '100%'
            return y
          },
        },
      })

      // Fade in / out
      gsap.to(petal, {
        opacity: 0.6,
        duration: 2,
        delay: delay,
        ease: 'power1.in',
      })
    })
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-gradient" />

      {/* Floating petals */}
      <div ref={petalsRef} className="petals-container">
        {petals.map((p, i) => (
          <span key={i} className="petal">{p}</span>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Logos */}
        <motion.div variants={itemVariants} className="hero-logos">
          <div className="logo-container logo-en-container">
            <div className="pulse-ring ring-sm" />
            <div className="pulse-ring ring-md" />
            <div className="pulse-ring ring-lg" />
            <div className="logo-img-wrapper">
              <img src={logoEn} alt="Swarala Thota English Logo" />
            </div>
          </div>
          <div className="hero-logos-divider hidden md:block" />
          <div className="logo-container logo-te-container hidden md:flex">
            <div className="pulse-ring ring-sm" />
            <div className="pulse-ring ring-md" />
            <div className="pulse-ring ring-lg" />
            <div className="logo-img-wrapper">
              <img src={logoTe} alt="Swarala Thota Telugu Logo" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          The <span>Musical Garden</span> Awaits
        </motion.h1>

        {/* Telugu subtitle */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          స్వరాల తోట
        </motion.p>



        {/* CTAs */}
        <motion.div variants={itemVariants} className="hero-ctas">
          <Link to="/events" className="cta-primary">
            <span>Grab Your Pass</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
