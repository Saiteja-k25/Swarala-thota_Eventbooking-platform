import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const dummyEvents = [
  {
    id: 1,
    title: "Swarala Thota — Edition 9",
    location: "Happy Woods, Gachibowli, Hyderabad",
    datetime: "Saturday, 18th April 2026 | 4:30 PM – 9:30 PM",
    description: "Join us for a mesmerizing evening of classical and fusion music. Experience the soul-stirring melodies under the stars in a beautiful open-air garden setting. Perfect for music lovers and families alike, this edition features renowned artists blending traditional ragas with contemporary folk rhythms. Get ready for an unforgettable musical journey that will leave you spellbound."
  },
  {
    id: 2,
    title: "Swarala Thota — Edition 10",
    location: "The Green Pavilion, Jubilee Hills",
    datetime: "Sunday, 24th May 2026 | 5:00 PM – 10:00 PM",
    description: "Celebrate our milestone 10th edition with an extraordinary lineup of string quartets and percussion maestros. This special evening promises an eclectic mix of instrumental mastery and vocal brilliance, set against the backdrop of a serene venue. A perfect weekend getaway to immerse yourself in the world of pure, unadulterated musical bliss, surrounded by nature and great company."
  },
  {
    id: 3,
    title: "Swarala Thota — Monsoon Special",
    location: "Lakeview Arena, Necklace Road",
    datetime: "Saturday, 15th August 2026 | 6:00 PM – 11:00 PM",
    description: "Embrace the magic of the monsoons with our special musical extravaganza. Feel the rhythm of the rain complemented by the enchanting tunes of Indian folk blending with light classical music. It's an evening designed to evoke nostalgia and create new memories. Warm beverages, cozy vibes, and soul-soothing performances await you at this scenic lakeside venue."
  },
  {
    id: 4,
    title: "Swarala Thota — Winter Serenade",
    location: "Banjara Hills Cultural Center",
    datetime: "Saturday, 12th December 2026 | 5:30 PM – 10:30 PM",
    description: "End the year on a high note with our Winter Serenade. A carefully curated presentation of piano, flute, and soulful vocals to warm your winter evening. The intimate setting combined with exquisite lighting and acoustic perfection will make this a night to remember. Bring your loved ones and experience the tranquility of a perfect musical winter night."
  }
]

export default function EventsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="custom-page-container">
      <div className="custom-page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <span className="arrow">←</span> Back
        </button>
      </div>
      <div className="custom-page-content">
        <h1 className="custom-page-title">Upcoming Events</h1>
        <div className="events-grid">
          {dummyEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }} onClick={() => navigate(`/event/${event.id}`)}>
                <h2 className="event-title">{event.title}</h2>
                <div className="event-details">
                  <p className="event-location" style={{ marginBottom: '0.25rem' }}>
                    <svg style={{ width: '1rem', height: '1rem', verticalAlign: 'middle', marginRight: '0.3rem', color: '#c8a84b' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {event.location}
                  </p>
                  <p className="event-datetime">
                    <svg style={{ width: '1rem', height: '1rem', verticalAlign: 'middle', marginRight: '0.3rem', color: '#c8a84b' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {event.datetime}
                  </p>
                </div>
                <p className="event-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
