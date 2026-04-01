import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const venueDetails = [
  {
    icon: '📍',
    label: 'Location',
    value: 'Happy Woods, Gachibowli',
    sub: 'Hyderabad, Telangana',
  },
  {
    icon: '📅',
    label: 'Date',
    value: 'Saturday, 07 March 2026',
    sub: 'Gates open at 3:30 PM',
  },
  {
    icon: '🕟',
    label: 'Time',
    value: '4:30 PM — 9:30 PM',
    sub: 'Five hours of live music',
  },
  {
    icon: '🅿️',
    label: 'Parking',
    value: 'Free Parking Available',
    sub: 'Ample space for 200+ vehicles',
  },
]

export default function Venue() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current.querySelectorAll('.venue-reveal')
      gsap.fromTo(reveals,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      const map = sectionRef.current.querySelector('.venue-map')
      if (map) {
        gsap.fromTo(map,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: map,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="venue-section" id="venue" ref={sectionRef}>
      <div className="section-header">
        <p className="section-label venue-reveal">Venue</p>
        <h2 className="section-title venue-reveal">
          Find Your Way to the <span>Garden</span>
        </h2>
      </div>

      <div className="venue-grid">
        {/* Left: Venue details */}
        <div>
          {venueDetails.map((detail, i) => (
            <div className="venue-detail-item venue-reveal" key={i}>
              <div className="venue-detail-icon">{detail.icon}</div>
              <div>
                <div className="venue-detail-label">{detail.label}</div>
                <div className="venue-detail-value">{detail.value}</div>
                {detail.sub && (
                  <div className="venue-detail-sub">{detail.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Decorative map */}
        <div className="venue-map">
          <div className="venue-map-grid" />
          <div className="venue-map-rings" />
          <div className="venue-map-rings" />
          <div className="venue-map-rings" />
          <div className="venue-map-pin">
            <div className="venue-map-pin-inner" />
          </div>
        </div>
      </div>
    </section>
  )
}
