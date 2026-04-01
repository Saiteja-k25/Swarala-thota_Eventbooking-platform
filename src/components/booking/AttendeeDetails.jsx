import { useState, useCallback } from 'react'

const validators = {
  name: (v) => {
    if (!v.trim()) return 'Name is required'
    if (v.trim().length < 2) return 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s.]+$/.test(v.trim())) return 'Only letters, spaces, and dots allowed'
    return ''
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address'
    return ''
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required'
    const digits = v.replace(/\D/g, '')
    if (digits.length !== 10) return 'Phone must be exactly 10 digits'
    if (!/^[6-9]/.test(digits)) return 'Must start with 6, 7, 8, or 9'
    return ''
  },
  age: (v) => {
    if (!v) return 'Age is required'
    const n = parseInt(v, 10)
    if (isNaN(n) || n < 1) return 'Enter a valid age'
    if (n < 5) return 'Must be at least 5 years old'
    if (n > 120) return 'Enter a valid age'
    return ''
  },
  gender: (v) => {
    if (!v) return 'Please select a gender'
    return ''
  },
}

export default function AttendeeDetails({ attendee, setAttendee, onNext, onBack }) {
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((field, value) => {
    setAttendee((prev) => ({ ...prev, [field]: value }))
  }, [setAttendee])

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const getError = (field) => {
    if (!touched[field]) return ''
    return validators[field](attendee[field] || '')
  }

  const isFormValid = () => {
    return Object.keys(validators).every(
      (field) => validators[field](attendee[field] || '') === ''
    )
  }

  const handleSubmit = () => {
    // Mark all fields as touched
    const allTouched = {}
    Object.keys(validators).forEach((k) => (allTouched[k] = true))
    setTouched(allTouched)

    if (isFormValid()) {
      onNext()
    }
  }

  const getInputClass = (field) => {
    if (!touched[field]) return 'form-input'
    const err = validators[field](attendee[field] || '')
    return `form-input ${err ? 'error' : 'valid'}`
  }

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 500,
          color: '#f0ead6',
          marginBottom: '0.3rem',
        }}>
          Attendee Information
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#6a7b5a', marginBottom: '1.5rem' }}>
          Enter the primary attendee&apos;s details for your booking.
        </p>
      </div>

      <div className="form-grid">
        {/* Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={getInputClass('name')}
            placeholder="John Doe"
            value={attendee.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          <div className="form-error">{getError('name')}</div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className={getInputClass('email')}
            placeholder="john@example.com"
            value={attendee.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          <div className="form-error">{getError('email')}</div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className={getInputClass('phone')}
            placeholder="98765 43210"
            maxLength={10}
            value={attendee.phone || ''}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 10)
              handleChange('phone', v)
            }}
            onBlur={() => handleBlur('phone')}
          />
          <div className="form-error">{getError('phone')}</div>
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="number"
            className={getInputClass('age')}
            placeholder="25"
            min="1"
            max="120"
            value={attendee.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
          />
          <div className="form-error">{getError('age')}</div>
        </div>

        {/* Gender */}
        <div className="form-group full-width">
          <label className="form-label">Gender</label>
          <select
            className={`form-select ${
              touched.gender
                ? validators.gender(attendee.gender || '')
                  ? 'error'
                  : 'valid'
                : ''
            }`}
            value={attendee.gender || ''}
            onChange={(e) => {
              handleChange('gender', e.target.value)
              setTouched((prev) => ({ ...prev, gender: true }))
            }}
            onBlur={() => handleBlur('gender')}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          <div className="form-error">{getError('gender')}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="step-nav">
        <button className="step-btn step-btn-back" onClick={onBack}>
          ← Back
        </button>
        <button
          className="step-btn step-btn-next"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
