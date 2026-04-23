import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function PrivacyPolicy() {
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
        <h1 className="custom-page-title">Privacy Policy</h1>
        <p className="doc-date">Last updated: April 2026</p>
        
        <div className="doc-section">
          <h2>Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services. We do not process sensitive information.</p>
        </div>

        <div className="doc-section">
          <h2>How We Use Your Information</h2>
          <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
        </div>

        <div className="doc-section">
          <h2>Data Security</h2>
          <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
        </div>

        <div className="doc-section">
          <h2>Third Party Services</h2>
          <p>We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. We only share exactly what is needed for functionality and processing of seamless services.</p>
        </div>

        <div className="doc-section">
          <h2>Contact Us</h2>
          <p>If you have questions or comments about this notice, you may email us at privacy@swaralathota.com or by post to our registered head office in Hyderabad, India.</p>
        </div>
      </div>
    </div>
  )
}
