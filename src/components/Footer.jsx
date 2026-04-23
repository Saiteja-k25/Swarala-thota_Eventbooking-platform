import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-v2">
      <div className="footer-v2-container">
        {/* ROW 1 — Brand + Social */}
        <div className="footer-v2-row1">
          <div className="footer-v2-brand">
            <div className="footer-v2-brand-en">Swarala Thota</div>
            <div className="footer-v2-brand-te">స్వరాల తోట</div>
          </div>
          <div className="footer-v2-socials">
            <a
              href="https://www.instagram.com/swarala_tho_ta_?igsh=d2QwcmQ5dzF5NWxj"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v2-icon-btn"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=919848481900&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v2-icon-btn"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-v2-divider"></div>

        {/* ROW 2 — Support row */}
        <div className="footer-v2-row2">
          <a href="https://api.whatsapp.com/send/?phone=919848481900&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="footer-v2-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Contact on WhatsApp</span>
          </a>
          <Link to="/privacy" className="footer-v2-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Privacy Policy</span>
          </Link>
          <Link to="/terms" className="footer-v2-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>Terms of Use</span>
          </Link>
        </div>

        <div className="footer-v2-divider"></div>

        {/* ROW 3 — Bottom bar */}
        <div className="footer-v2-row3">
          <p>© 2026 Swarala Thota. All rights reserved.</p>
          <p className="footer-v2-powered">Powered by Paatashala</p>
        </div>
      </div>
    </footer>
  )
}
