const TICKET_DATA = [
  {
    id: 'earlyBird',
    name: 'Early Bird',
    price: 250,
    features: ['Limited seats', 'General entry', 'Live music access'],
  },
  {
    id: 'regular',
    name: 'Regular',
    price: 299,
    badge: 'Popular',
    features: ['General entry', 'Live music access'],
  },
  {
    id: 'couple',
    name: 'Couple',
    price: 499,
    features: ['Entry for 2', 'Reserved seating'],
  },
  {
    id: 'group',
    name: 'Group of 5',
    price: 1245,
    features: ['Entry for 5', 'Group seating'],
  },
]

function calcSummary(tickets) {
  let subtotal = 0
  const items = []

  TICKET_DATA.forEach((t) => {
    const qty = tickets[t.id] || 0
    if (qty > 0) {
      const lineTotal = qty * t.price
      subtotal += lineTotal
      items.push({ name: t.name, qty, price: t.price, lineTotal })
    }
  })

  const platformFee = subtotal > 0 ? 10 : 0
  const convenienceFee = Math.round(subtotal * 0.025 * 100) / 100
  const total = subtotal + platformFee + convenienceFee

  return { items, subtotal, platformFee, convenienceFee, total }
}

export { TICKET_DATA, calcSummary }

export default function TicketSelection({ tickets, setTickets, onNext }) {
  const summary = calcSummary(tickets)
  const hasTickets = summary.items.length > 0

  const updateQty = (id, delta) => {
    setTickets((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }))
  }

  return (
    <div>
      <div className="ticket-select-grid">
        {TICKET_DATA.map((t) => {
          const qty = tickets[t.id] || 0
          return (
            <div
              className={`ts-card ${qty > 0 ? 'has-qty' : ''}`}
              key={t.id}
            >
              <div className="ts-card-header">
                <div className="ts-card-name">{t.name}</div>
                {t.badge && <span className="ts-card-badge">{t.badge}</span>}
              </div>
              <div className="ts-card-price">
                ₹{t.price} <span>/ person</span>
              </div>
              <ul className="ts-card-features">
                {t.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => updateQty(t.id, -1)}
                  disabled={qty === 0}
                  aria-label={`Decrease ${t.name} quantity`}
                >
                  −
                </button>
                <span className="qty-value">{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQty(t.id, 1)}
                  aria-label={`Increase ${t.name} quantity`}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <div className="order-summary-title">Order Summary</div>

        {!hasTickets && (
          <div className="order-empty">
            Select tickets above to see your order summary
          </div>
        )}

        {hasTickets && (
          <>
            {summary.items.map((item, i) => (
              <div className="order-line item" key={i}>
                <span>
                  {item.name}
                  <span className="qty-tag">× {item.qty}</span>
                </span>
                <span>₹{item.lineTotal.toLocaleString('en-IN')}</span>
              </div>
            ))}

            <div className="order-divider" />

            <div className="order-line fee">
              <span>Platform Fee</span>
              <span>₹{summary.platformFee}</span>
            </div>
            <div className="order-line fee">
              <span>Convenience Fee (2.5%)</span>
              <span>₹{summary.convenienceFee.toFixed(2)}</span>
            </div>

            <div className="order-divider" />

            <div className="order-total">
              <span>Total</span>
              <span>₹{summary.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="step-nav" style={{ justifyContent: 'flex-end' }}>
        <button
          className="step-btn step-btn-next"
          disabled={!hasTickets}
          onClick={onNext}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
