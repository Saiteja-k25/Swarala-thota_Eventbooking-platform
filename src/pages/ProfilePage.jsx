import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function ProfilePage() {
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
      <div className="custom-page-content profile-page-content">
        <div className="profile-card">
          <div className="profile-avatar">KS</div>
          <h2 className="profile-name">Kurapati Saiteja</h2>
          <p className="profile-email">user@example.com</p>
        </div>
        <div className="profile-menu">
          <button className="profile-menu-item">
            <span className="profile-menu-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 5v2"/><path d="M15 11v2"/><path d="M15 17v2"/><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"/></svg>
            </span>
            My Tickets
          </button>
          <button className="profile-menu-item">
            <span className="profile-menu-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            Privacy Policy
          </button>
          <button className="profile-menu-item">
            <span className="profile-menu-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </span>
            Terms of Use
          </button>
          <button className="profile-menu-item admin">
            <span className="profile-menu-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            Admin Portal
          </button>
          <button className="profile-menu-item logout" onClick={() => navigate('/')}>
            <span className="profile-menu-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
