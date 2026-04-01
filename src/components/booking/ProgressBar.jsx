const STEPS = ['Tickets', 'Details', 'Payment', 'Confirmation']

export default function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar">
      {STEPS.map((label, i) => {
        const isActive = i === currentStep
        const isCompleted = i < currentStep

        return (
          <div key={label} style={{ display: 'contents' }}>
            {/* Connecting line before step (skip first) */}
            {i > 0 && (
              <div className="progress-line">
                <div
                  className="progress-line-fill"
                  style={{ width: isCompleted || isActive ? '100%' : '0%' }}
                />
              </div>
            )}

            <div
              className={`progress-step ${isActive ? 'active' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
            >
              <div className="progress-circle">
                {isCompleted ? '✓' : i + 1}
              </div>
              <span className="progress-label">{label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
