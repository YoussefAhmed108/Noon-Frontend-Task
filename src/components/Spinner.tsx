import React from 'react'
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer} role="status" aria-live="polite" aria-label="Loading">
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '6px solid #e0e0e0',
          borderTop: '6px solid #0070f3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
        aria-hidden="true"
      />
      <span style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)'}}>
        Loading
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Spinner