import { useNavigate } from 'react-router-dom'

const features = [
  { icon: '🎯', title: 'Career Prediction', desc: 'Enter your skills & interests to get AI-powered career matches with salary insights.', path: '/predict' },
  { icon: '📄', title: 'Resume Analyzer',   desc: 'Paste your resume and get ATS score, skill gaps, and actionable feedback.',        path: '/resume' },
]

export default function Home() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', maxWidth: '680px', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', background: 'rgba(108,99,255,0.15)', border: '1px solid #6c63ff', borderRadius: '999px', padding: '6px 20px', fontSize: '13px', color: '#a78bfa', marginBottom: '1.5rem' }}>
          ✨ Final Year Project Demo
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.2rem' }}>
          Navigate Your Career with{' '}
          <span style={{ background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Artificial Intelligence
          </span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
          CareerPilot AI predicts your ideal career path, analyzes your resume, and builds a personalized skill roadmap — all in seconds.
        </p>
        <button onClick={() => nav('/predict')} style={{
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          color: '#fff', border: 'none', borderRadius: '12px',
          padding: '14px 32px', fontSize: '16px', fontWeight: 600,
          cursor: 'pointer', marginRight: '12px',
        }}>
          Get Started →
        </button>
        <button onClick={() => nav('/resume')} style={{
          background: 'transparent', color: '#a78bfa',
          border: '1px solid #6c63ff', borderRadius: '12px',
          padding: '14px 32px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
        }}>
          Analyze Resume
        </button>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '720px' }}>
        {features.map(f => (
          <div key={f.path} onClick={() => nav(f.path)} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #2d2d4e',
            borderRadius: '16px', padding: '2rem',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.border = '1px solid #6c63ff'; e.currentTarget.style.background = 'rgba(108,99,255,0.07)' }}
          onMouseLeave={e => { e.currentTarget.style.border = '1px solid #2d2d4e'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#e2e8f0' }}>{f.title}</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}