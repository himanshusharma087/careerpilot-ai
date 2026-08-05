import { useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center' }}>
      <Compass size={40} color="#6c63ff" style={{ marginBottom: '1rem' }} />
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Page not found</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This page doesn't exist. Let's get you back on track.</p>
      <button onClick={() => nav('/')} style={{
        background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
        color: '#fff', border: 'none', borderRadius: '12px',
        padding: '12px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
      }}>
        Back to Home
      </button>
    </div>
  )
}
