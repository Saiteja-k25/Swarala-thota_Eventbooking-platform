import { useState } from 'react'
import { calcSummary } from './TicketSelection'

const BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Bank of Baroda',
  'Punjab National Bank',
]

export default function Payment({ tickets, onNext, onBack }) {
  const [method, setMethod] = useState('card')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [upiVpa, setUpiVpa] = useState('')
  const [bank, setBank] = useState('')

  const summary = calcSummary(tickets)

  const formatCardNum = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const isMethodValid = () => {
    if (method === 'card') {
      return (
        cardNum.replace(/\s/g, '').length === 16 &&
        cardExpiry.length === 5 &&
        cardCvv.length === 3 &&
        cardName.trim().length >= 2
      )
    }
    if (method === 'upi') {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/.test(upiVpa.trim())
    }
    if (method === 'netbanking') {
      return bank !== ''
    }
    return false
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
          Payment Method
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#6a7b5a', marginBottom: '1.5rem' }}>
          Choose your preferred payment option.
        </p>
      </div>

      {/* Method Tabs */}
      <div className="payment-methods">
        {[
          { key: 'card', icon: '💳', label: 'Card' },
          { key: 'upi', icon: '📱', label: 'UPI' },
          { key: 'netbanking', icon: '🏦', label: 'Net Banking' },
        ].map((m) => (
          <button
            key={m.key}
            className={`pay-method-tab ${method === m.key ? 'active' : ''}`}
            onClick={() => setMethod(m.key)}
          >
            <span className="pay-method-icon">{m.icon}</span>
            <span className="pay-method-name">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Card Fields */}
      {method === 'card' && (
        <div className="pay-fields">
          <div className="pay-fields-title">Card Details</div>
          <div className="form-grid" style={{ marginBottom: 0 }}>
            <div className="form-group full-width">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="1234 5678 9012 3456"
                value={cardNum}
                onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                maxLength={19}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry (MM/YY)</label>
              <input
                type="text"
                className="form-input"
                placeholder="03/28"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className="form-input"
                placeholder="•••"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                maxLength={3}
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Name on Card</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* UPI */}
      {method === 'upi' && (
        <div className="pay-fields">
          <div className="pay-fields-title">UPI Payment</div>
          <div className="form-group">
            <label className="form-label">UPI ID / VPA</label>
            <input
              type="text"
              className="form-input"
              placeholder="yourname@upi"
              value={upiVpa}
              onChange={(e) => setUpiVpa(e.target.value)}
            />
            <div style={{ fontSize: '0.72rem', color: '#5a6b4a', marginTop: '0.35rem' }}>
              Enter your UPI Virtual Payment Address (e.g., name@oksbi, name@ybl)
            </div>
          </div>
        </div>
      )}

      {/* Net Banking */}
      {method === 'netbanking' && (
        <div className="pay-fields">
          <div className="pay-fields-title">Net Banking</div>
          <div className="form-group">
            <label className="form-label">Select Your Bank</label>
            <select
              className="form-select"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Choose a bank</option>
              {BANKS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="pay-total-bar">
        <span className="pay-total-label">Amount to pay</span>
        <span className="pay-total-amount">
          ₹{summary.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Pay Button */}
      <button
        className="pay-btn"
        onClick={onNext}
        disabled={!isMethodValid()}
        style={{ opacity: isMethodValid() ? 1 : 0.4, cursor: isMethodValid() ? 'none' : 'not-allowed' }}
      >
        Pay ₹{summary.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </button>

      <div className="step-nav" style={{ marginTop: '1.25rem' }}>
        <button className="step-btn step-btn-back" onClick={onBack}>
          ← Back
        </button>
        <div />
      </div>
    </div>
  )
}
