import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ErrorBanner from '../components/ErrorBanner'

export default function Signup() {
  const { signup } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await signup(email, password)
      nav('/')
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Could not create account. Try a different email.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px 12px 40px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid #2d2d4e',
    color: '#e2e8f0', fontSize: '14px', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '380px', margin: '0 auto', padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem',
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <UserPlus size={26} color="#fff" />
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem' }}>Create your account</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Save your career predictions and resume scores</p>
      </div>

      {error && <ErrorBanner message={error} />}

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative' }}>
          <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          <input type="email" required placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ position: 'relative' }}>
          <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          <input type="password" required placeholder="Password (min. 8 characters)" value={password}
            onChange={e => setPassword(e.target.value)} style={inputStyle} />
        </div>
        <button type="submit" disabled={loading} style={{
          marginTop: '8px', padding: '13px', borderRadius: '10px', border: 'none',
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', color: '#fff',
          fontWeight: 600, fontSize: '15px', cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '14px', color: '#94a3b8' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
      </p>
    </div>
  )
}
