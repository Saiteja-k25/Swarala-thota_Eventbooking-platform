import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const vibeItems = [
  { emoji: '🎸', text: 'Live Guitar' },
  { emoji: '🌳', text: 'Open-Air Stage' },
  { emoji: '🎶', text: 'Classical & Folk' },
  { emoji: '🌺', text: 'Floral Ambience' },
  { emoji: '🍹', text: 'Welcome Drinks' },
  { emoji: '🌙', text: 'Evening Under Stars' },
  { emoji: '🥁', text: 'Percussion' },
  { emoji: '🎻', text: 'String Quartet' },
  { emoji: '💡', text: 'Ambient Lighting' },
]

const vibeItems2 = [
  { emoji: '🎤', text: 'Soulful Vocals' },
  { emoji: '🌿', text: 'Garden Seating' },
  { emoji: '📸', text: 'Photo Corner' },
  { emoji: '🎹', text: 'Piano Melodies' },
  { emoji: '🦋', text: 'Nature & Music' },
  { emoji: '🕯️', text: 'Candlelit Paths' },
  { emoji: '🎵', text: 'Live Flute' },
  { emoji: '🍃', text: 'Breezy Vibes' },
  { emoji: '✨', text: 'Magical Moments' },
]

function MarqueeRow({ items, direction = 'forward' }) {
  // Duplicate items to fill the loop
  const doubled = [...items, ...items]

  return (
    <div className="marquee-row">
      <div className={`marquee-track ${direction}`}>
        {doubled.map((item, i) => (
          <div className="vibe-card" key={i}>
            <span className="vibe-card-emoji">{item.emoji}</span>
            <span className="vibe-card-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Vibe() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headers = sectionRef.current.querySelectorAll('.vibe-header-reveal')
      gsap.fromTo(headers,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="vibe-section" id="vibe" ref={sectionRef}>
      <div className="section-header">
        <p className="section-label vibe-header-reveal">The Vibe</p>
        <h2 className="section-title vibe-header-reveal">
          What <span>Awaits</span> You
        </h2>
        <p className="section-desc vibe-header-reveal">
          A sensory symphony of music, nature, and togetherness.
        </p>
      </div>

      <MarqueeRow items={vibeItems} direction="forward" />
      <MarqueeRow items={vibeItems2} direction="reverse" />
    </section>
  )
}
