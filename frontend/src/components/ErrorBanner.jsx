import { AlertCircle, X } from 'lucide-react'

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.35)',
      borderRadius: '12px', padding: '12px 14px', marginBottom: '1.25rem',
    }}>
      <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '1px' }} />
      <p style={{ fontSize: '13px', color: '#fca5a5', flex: 1, lineHeight: 1.5 }}>{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fca5a5', padding: 0, lineHeight: 0 }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
