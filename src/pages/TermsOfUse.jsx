import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function TermsOfUse() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="custom-page-container document-page">
      <div className="custom-page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> Back
        </button>
      </div>
      <div className="custom-page-content doc-content">
        <h1 className="custom-page-title">Terms of Use</h1>
        <p className="doc-date">Last updated: April 2026</p>
        
        <div className="doc-section">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Use of our services indicates acceptance of the terms, and any associated guidelines or policies provided to users.</p>
        </div>

        <div className="doc-section">
          <h2>Ticket Purchase Policy</h2>
          <p>All tickets are subject to availability and the organizers reserve the right to refuse admission. Your ticket confirms entry; however, please follow all venue guidelines and age restrictions as listed during checkout.</p>
        </div>

        <div className="doc-section">
          <h2>Refunds & Cancellations</h2>
          <p>Tickets booked are non-refundable unless the event is officially canceled or rescheduled by the organizers. In such cases, the refund request must be processed within 14 business days from the event date.</p>
        </div>

        <div className="doc-section">
          <h2>User Conduct</h2>
          <p>Users are expected to communicate respectfully and abstain from sharing harmful, illegal, or unethical content. Misuse of the platform may lead to an immediate ban without prior notice.</p>
        </div>

        <div className="doc-section">
          <h2>Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes.</p>
        </div>
      </div>
    </div>
  )
}
