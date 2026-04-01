import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoEn from '../assets/logo_en.png'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '5th', label: 'Edition' },
  { number: '500+', label: 'Attendees' },
  { number: '8+', label: 'Performances' },
  { number: '1', label: 'Magical Evening' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current.querySelectorAll('.about-reveal')
      gsap.fromTo(reveals, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      const stats = sectionRef.current.querySelectorAll('.stat-card')
      gsap.fromTo(stats,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.stats-grid'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-grid">
        {/* Left: Text + stats */}
        <div>
          <div className="about-label about-reveal">Our Story</div>
          <h2 className="about-title about-reveal">
            More Than a Concert — <span>An Experience</span>
          </h2>
          <p className="about-text about-reveal">
            Swarala Thota — The Musical Garden is Hyderabad&apos;s most beloved
            outdoor music celebration. Born from a passion for bringing
            communities together through the universal language of music, each
            edition transforms a serene garden setting into an enchanting
            evening of live performances, soulful melodies, and warm
            connections. From classical ragas to folk rhythms, every note is
            curated to create an unforgettable memory under the open sky.
          </p>

          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Logo with spinning decorative ring */}
        <div className="about-logo-wrapper about-reveal">
          {/* Outer spinning ring - SVG dashed circle */}
          <svg className="spinning-ring" viewBox="0 0 320 320" fill="none">
            <circle
              cx="160" cy="160" r="155"
              stroke="rgba(200,168,75,0.2)"
              strokeWidth="1"
              strokeDasharray="8 12"
            />
            <circle
              cx="160" cy="160" r="145"
              stroke="rgba(200,168,75,0.1)"
              strokeWidth="0.5"
              strokeDasharray="4 16"
            />
            {/* Decorative dots */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const x = 160 + 155 * Math.cos(rad)
              const y = 160 + 155 * Math.sin(rad)
              return <circle key={i} cx={x} cy={y} r="3" fill="rgba(200,168,75,0.4)" />
            })}
          </svg>

          {/* Inner reverse-spinning ring */}
          <svg className="spinning-ring-inner" viewBox="0 0 280 280" fill="none">
            <circle
              cx="140" cy="140" r="135"
              stroke="rgba(200,168,75,0.15)"
              strokeWidth="1"
              strokeDasharray="16 8"
            />
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              const x = 140 + 135 * Math.cos(rad)
              const y = 140 + 135 * Math.sin(rad)
              return <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(200,168,75,0.3)" />
            })}
          </svg>

          <img src={logoEn} alt="Swarala Thota" className="about-logo" />
        </div>
      </div>
    </section>
  )
}
