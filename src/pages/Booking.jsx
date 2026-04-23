import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BookingHeader from '../components/booking/BookingHeader'
import ProgressBar from '../components/booking/ProgressBar'
import TicketSelection from '../components/booking/TicketSelection'
import Payment from '../components/booking/Payment'
import Confirmation from '../components/booking/Confirmation'

/* ── Framer Motion step transition variants ── */
const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
  },
  exit: (dir) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    position: 'absolute',
  }),
}

const transition = {
  x: { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  opacity: { duration: 0.25 },
}

function generateOrderId() {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `ST-2026-${num}`
}

export default function Booking() {
  const location = useLocation()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [tickets, setTickets] = useState({
    earlyBird: 0,
    regular: 0,
    couple: 0,
    group: 0,
  })
  const [attendee, setAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  })
  const [orderId, setOrderId] = useState('')

  const goNext = useCallback(() => {
    if (step === 1) {
      // Generate order ID when entering confirmation
      setOrderId(generateOrderId())
    }
    setDirection(1)
    setStep((s) => Math.min(s + 1, 2))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <TicketSelection
            tickets={tickets}
            setTickets={setTickets}
            onNext={goNext}
          />
        )
      case 1:
        return (
          <Payment
            tickets={tickets}
            onNext={goNext}
            onBack={goBack}
          />
        )
      case 2:
        return (
          <Confirmation
            tickets={tickets}
            attendee={attendee}
            orderId={orderId}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="booking-page standalone">
      <BookingHeader showBack={step < 3} />

      <div className="booking-container">
        {/* Progress Bar */}
        <ProgressBar currentStep={step} />

        {/* Step Content with slide transitions */}
        <div className="step-content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={{ width: '100%' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
