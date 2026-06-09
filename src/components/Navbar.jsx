import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const links = [
    { to: '/',        label: 'Home' },
    { to: '/predict', label: 'Career Predictor' },
    { to: '/resume',  label: 'Resume Analyzer' },
  ]
  return (
    <nav style={{
      background: 'rgba(15,15,26,0.95)',
      borderBottom: '1px solid #2d2d4e',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '22px' }}>🧭</span>
        <span style={{ fontWeight: 700, fontSize: '18px', color: '#a78bfa' }}>
          CareerPilot <span style={{ color: '#6c63ff' }}>AI</span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            padding: '6px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            background: pathname === l.to ? '#6c63ff' : 'transparent',
            color:      pathname === l.to ? '#fff' : '#94a3b8',
            border:     pathname === l.to ? 'none' : '1px solid #2d2d4e',
            transition: 'all 0.2s',
          }}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}