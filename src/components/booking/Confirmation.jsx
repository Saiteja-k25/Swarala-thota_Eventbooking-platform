import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { calcSummary } from './TicketSelection'

/* ── Deterministic QR-like SVG pattern ── */
function QRCode({ orderId }) {
  const grid = useMemo(() => {
    // Simple hash from orderId
    let hash = 0
    for (let i = 0; i < orderId.length; i++) {
      hash = ((hash << 5) - hash) + orderId.charCodeAt(i)
      hash |= 0
    }

    const size = 21
    const cells = []

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let filled = false

        // Finder patterns (3 corners)
        const inTL = x < 7 && y < 7
        const inTR = x >= size - 7 && y < 7
        const inBL = x < 7 && y >= size - 7

        if (inTL || inTR || inBL) {
          const cx = inTL ? 3 : inTR ? size - 4 : 3
          const cy = inTL ? 3 : inTR ? 3 : size - 4
          const dx = Math.abs(x - cx)
          const dy = Math.abs(y - cy)
          const maxD = Math.max(dx, dy)
          filled = maxD <= 3 && (maxD === 3 || maxD === 0 || (dx <= 1 && dy <= 1))
        } else {
          // Pseudo-random fill for data area
          const n = Math.abs(hash * (x * 31 + y * 17 + x * y * 7))
          filled = n % 3 !== 0
        }

        if (filled) {
          cells.push({ x, y })
        }
      }
    }
    return cells
  }, [orderId])

  const cellSize = 6
  const total = 21 * cellSize

  return (
    <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`}>
      {grid.map((c, i) => (
        <rect
          key={i}
          x={c.x * cellSize}
          y={c.y * cellSize}
          width={cellSize}
          height={cellSize}
          fill="#0d2b18"
          rx={0.5}
        />
      ))}
    </svg>
  )
}

export default function Confirmation({ tickets, attendee, orderId }) {
  const summary = calcSummary(tickets)

  return (
    <motion.div
      className="confirm-card"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Success icon */}
      <div className="confirm-icon">✓</div>

      <h2 className="confirm-title">Booking Confirmed!</h2>
      <p className="confirm-subtitle">
        Your passes for Swarala Thota — The Musical Garden are secured.
      </p>

      {/* Order ID */}
      <div className="confirm-order-id">Order ID: {orderId}</div>

      {/* Itemised Invoice */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th style={{ textAlign: 'center' }}>Qty</th>
            <th style={{ textAlign: 'center' }}>Price</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {summary.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.qty}</td>
              <td style={{ textAlign: 'center' }}>₹{item.price}</td>
              <td style={{ textAlign: 'right' }}>₹{item.lineTotal.toLocaleString('en-IN')}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Platform Fee</td>
            <td style={{ textAlign: 'right' }}>₹{summary.platformFee}</td>
          </tr>
          <tr>
            <td colSpan={3}>Convenience Fee (2.5%)</td>
            <td style={{ textAlign: 'right' }}>₹{summary.convenienceFee.toFixed(2)}</td>
          </tr>
          <tr className="invoice-total">
            <td colSpan={3}><strong>Total Paid</strong></td>
            <td style={{ textAlign: 'right' }}>
              <strong>₹{summary.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Attendee info */}
      <div style={{
        textAlign: 'left',
        padding: '1rem 1.25rem',
        background: 'rgba(10, 26, 15, 0.4)',
        borderRadius: '8px',
        marginBottom: '2rem',
        fontSize: '0.85rem',
        color: '#9aab8a',
        lineHeight: 1.8,
      }}>
        <div><strong style={{ color: '#c4d0b8' }}>Name:</strong> Guest User</div>
        <div><strong style={{ color: '#c4d0b8' }}>Email:</strong> Linked via Google</div>
      </div>

      {/* QR Code */}
      <div className="qr-wrapper">
        <div className="qr-box">
          <QRCode orderId={orderId} />
        </div>
        <span className="qr-label">Show this QR at the venue entrance</span>
      </div>

      {/* Back to home */}
      <Link to="/" className="confirm-home-btn">
        Back to Home
      </Link>
    </motion.div>
  )
}
