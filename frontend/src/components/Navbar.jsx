import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Compass, Menu, X, User, LogOut, History } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/predict', label: 'Career Predictor' },
    { to: '/resume', label: 'Resume Analyzer' },
    ...(user ? [{ to: '/history', label: 'History' }] : []),
  ]

  const handleLogout = () => {
    logout()
    setOpen(false)
    nav('/')
  }

  return (
    <nav style={{
      background: 'rgba(15,15,26,0.95)',
      borderBottom: '1px solid #2d2d4e',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <Compass size={22} color="#a78bfa" />
        <span style={{ fontWeight: 700, fontSize: '18px', color: '#a78bfa' }}>
          CareerPilot <span style={{ color: '#6c63ff' }}>AI</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="navbar-links" style={{ alignItems: 'center', gap: '8px' }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className="nav-link" onClick={() => setOpen(false)} style={{
            padding: '6px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            background: pathname === l.to ? '#6c63ff' : 'transparent',
            color: pathname === l.to ? '#fff' : '#94a3b8',
            border: pathname === l.to ? 'none' : '1px solid #2d2d4e',
            transition: 'all 0.2s',
          }}>
            {l.label}
          </Link>
        ))}

        <div style={{ width: '1px', height: '24px', background: '#2d2d4e', margin: '0 4px' }} />

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px' }}>
              <User size={14} /> {user.email}
            </div>
            <button onClick={handleLogout} title="Log out" style={{
              background: 'none', border: '1px solid #2d2d4e', borderRadius: '8px',
              color: '#94a3b8', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center',
            }}>
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/login" style={{
              padding: '6px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px',
              fontWeight: 500, color: '#94a3b8', border: '1px solid #2d2d4e',
            }}>Log In</Link>
            <Link to="/signup" style={{
              padding: '6px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px',
              fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            }}>Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        className="navbar-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', display: 'none' }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="navbar-mobile-menu">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              padding: '12px 16px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              color: pathname === l.to ? '#fff' : '#94a3b8',
              background: pathname === l.to ? '#6c63ff' : 'transparent',
              borderRadius: '8px',
            }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} style={{
              padding: '12px 16px', textAlign: 'left', background: 'none', border: 'none',
              color: '#94a3b8', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <LogOut size={16} /> Log Out ({user.email})
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} style={{
                padding: '12px 16px', textDecoration: 'none', fontSize: '15px', fontWeight: 500, color: '#94a3b8',
              }}>Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} style={{
                padding: '12px 16px', textDecoration: 'none', fontSize: '15px', fontWeight: 500, color: '#a78bfa',
              }}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
