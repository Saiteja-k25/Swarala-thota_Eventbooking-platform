import { Link } from 'react-router-dom'

export default function BookingHeader({ onBack, showBack = true }) {
  return (
    <header className="booking-header">
      <div className="booking-header-container">
        {/* Left: Back Arrow */}
        <div className="booking-header-left">
          {showBack && (
            <Link to="/" className="booking-back-link">
              <span className="arrow">←</span>
              <span className="text">Back to Home</span>
            </Link>
          )}
        </div>

        {/* Center: Brand Name */}
        <div className="booking-header-center">
          <Link to="/" className="booking-brand">
            Swarala Thota
          </Link>
        </div>

        {/* Right: Empty for balance */}
        <div className="booking-header-right"></div>
      </div>
    </header>
  )
}
