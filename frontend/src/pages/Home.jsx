import { useNavigate } from 'react-router-dom'
import {
  Target, FileText, Map, ArrowRight, Radar,
} from 'lucide-react'

const STATS = [
  { value: '1,539', label: 'training samples' },
  { value: '94.8%', label: 'model accuracy' },
  { value: '11',    label: 'career tracks' },
  { value: '1,320', label: 'real LinkedIn postings' },
]

const FEATURES = [
  {
    icon: Target, path: '/predict', accent: '#6c63ff',
    title: 'Career Predictor',
    desc: 'Enter your skills and interests — get your top 5 career matches, ranked by fit, with salary range and market demand for each.',
  },
  {
    icon: FileText, path: '/resume', accent: '#38bdf8',
    title: 'Resume Analyzer',
    desc: 'Paste your resume text — get an ATS compatibility score, a content score, detected skills, and specific lines to fix.',
  },
  {
    icon: Map, path: '/predict', accent: '#fbbf24',
    title: 'Skill Roadmap',
    desc: 'Every prediction comes with a 10-week roadmap — the exact skills to learn next, in order, to close the gap to your target role.',
  },
]

const STEPS = [
  {
    n: '01', title: 'Log your coordinates',
    desc: 'Tell us your current skills, interests, and years of experience.',
  },
  {
    n: '02', title: 'Get your flight plan',
    desc: 'Our model — trained on 1,539 real career profiles — ranks your best-fit roles with salary and demand data.',
  },
  {
    n: '03', title: 'Follow your route',
    desc: 'Save your results, track them in your history, and follow the roadmap to close your skill gaps.',
  },
]

const TECH = ['FastAPI', 'React + Vite', 'Random Forest', 'TF-IDF / NLP', 'scikit-learn', '2024 LinkedIn Data']

export default function Home() {
  const nav = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '5rem 1.5rem 4rem', textAlign: 'center',
        borderBottom: '1px solid #1c2036',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(#1c2036 1px, transparent 1px), linear-gradient(90deg, #1c2036 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 20%, black, transparent)',
        }} />

        <div className="fade-up font-mono" style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '12px', letterSpacing: '0.12em', color: '#38bdf8',
          border: '1px solid #1c3a4d', background: 'rgba(56,189,248,0.08)',
          borderRadius: '999px', padding: '6px 16px', marginBottom: '1.8rem',
        }}>
          <Radar size={13} /> FASTAPI · SCIKIT-LEARN · REACT — FINAL YEAR PROJECT
        </div>

        <h1 className="font-display fade-up" style={{
          position: 'relative', fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 700,
          lineHeight: 1.12, marginBottom: '1.3rem', animationDelay: '0.05s',
        }}>
          Chart your career<br />
          <span style={{
            background: 'linear-gradient(135deg, #6c63ff, #38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>flight path</span>
        </h1>

        <p className="fade-up" style={{
          position: 'relative', fontSize: '1.08rem', color: '#94a3b8', lineHeight: 1.7,
          maxWidth: '580px', margin: '0 auto 2.2rem', animationDelay: '0.1s',
        }}>
          Tell CareerPilot AI your skills and interests. It plots your route to the
          careers you're best matched for — with real salary data, market demand,
          and a roadmap to get there.
        </p>

        <div className="fade-up" style={{
          position: 'relative', display: 'flex', gap: '12px', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '3.5rem', animationDelay: '0.15s',
        }}>
          <button onClick={() => nav('/predict')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #6c63ff, #38bdf8)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '14px 30px', fontSize: '15.5px', fontWeight: 600, cursor: 'pointer',
          }}>
            Predict My Career <ArrowRight size={17} />
          </button>
          <button onClick={() => nav('/resume')} style={{
            background: 'transparent', color: '#94a3b8',
            border: '1px solid #2d2d4e', borderRadius: '10px',
            padding: '14px 30px', fontSize: '15.5px', fontWeight: 600, cursor: 'pointer',
          }}>
            Analyze My Resume
          </button>
        </div>

        <div className="fade-up" style={{ position: 'relative', maxWidth: '560px', margin: '0 auto', animationDelay: '0.2s' }}>
          <svg viewBox="0 0 500 170" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <path d="M20,150 C90,150 110,40 190,40 C270,40 260,110 340,110 C420,110 410,20 480,20"
              fill="none" stroke="#2d2d4e" strokeWidth="2" />
            <path className="flight-path-line" d="M20,150 C90,150 110,40 190,40 C270,40 260,110 340,110 C420,110 410,20 480,20"
              fill="none" stroke="#6c63ff" strokeWidth="2" />

            <circle cx="20" cy="150" r="5" fill="#0b0e1a" stroke="#94a3b8" strokeWidth="2" />
            <text x="20" y="168" textAnchor="middle" className="font-mono" fontSize="10" fill="#64748b">YOU</text>

            <circle cx="190" cy="40" r="4" fill="#38bdf8" />
            <text x="190" y="28" textAnchor="middle" className="font-mono" fontSize="9" fill="#38bdf8">ML Engineer</text>

            <circle cx="340" cy="110" r="4" fill="#fbbf24" />
            <text x="340" y="130" textAnchor="middle" className="font-mono" fontSize="9" fill="#fbbf24">₹18–32L</text>

            <circle cx="480" cy="20" r="5" fill="#0b0e1a" stroke="#a78bfa" strokeWidth="2" />
            <text x="465" y="12" textAnchor="middle" className="font-mono" fontSize="9" fill="#a78bfa">DESTINATION</text>

            <circle className="flight-dot" r="4" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }} />
          </svg>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0', borderBottom: '1px solid #1c2036',
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            flex: '1 1 160px', textAlign: 'center', padding: '1.8rem 1rem',
            borderLeft: i === 0 ? 'none' : '1px solid #1c2036',
          }}>
            <div className="font-display" style={{ fontSize: '1.7rem', fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
            <div className="font-mono" style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', letterSpacing: '0.04em' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Feature panels */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.6rem' }}>
            Three instruments, one dashboard
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Everything you need to plan your next move</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} onClick={() => nav(f.path)} style={{
              background: 'rgba(255,255,255,0.025)', border: '1px solid #1c2036',
              borderRadius: '16px', padding: '1.8rem', cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = f.accent; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1c2036'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px', marginBottom: '1.1rem',
                background: `${f.accent}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon size={20} color={f.accent} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '3rem 1.5rem 4.5rem', borderTop: '1px solid #1c2036' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.4rem' }}>
            Pre-flight checklist
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: '1.4rem', paddingBottom: i < STEPS.length - 1 ? '1.6rem' : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="font-mono" style={{
                    width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                    border: '1px solid #6c63ff', color: '#a78bfa', fontSize: '13px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div style={{ width: '1px', flex: 1, background: '#1c2036', marginTop: '6px' }} />}
                </div>
                <div style={{ paddingTop: '6px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, maxWidth: '480px' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech / credibility strip */}
      <section style={{ borderTop: '1px solid #1c2036', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div className="font-mono" style={{ fontSize: '11px', color: '#475569', marginBottom: '0.9rem', letterSpacing: '0.08em' }}>
          BUILT WITH
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {TECH.map(t => (
            <span key={t} className="font-mono" style={{
              fontSize: '12px', color: '#94a3b8', border: '1px solid #1c2036',
              borderRadius: '6px', padding: '5px 12px', background: 'rgba(255,255,255,0.02)',
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid #1c2036', padding: '3.5rem 1.5rem', textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.6rem' }}>
          Ready for takeoff?
        </h2>
        <p style={{ color: '#64748b', fontSize: '14.5px', marginBottom: '1.6rem' }}>
          Create an account to save your predictions and track your progress.
        </p>
        <button onClick={() => nav('/signup')} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg, #6c63ff, #38bdf8)',
          color: '#fff', border: 'none', borderRadius: '10px',
          padding: '13px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
        }}>
          Create Free Account <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer / credits */}
      <footer style={{ borderTop: '1px solid #1c2036', padding: '1.6rem 1.5rem', textAlign: 'center' }}>
        <p className="font-mono" style={{ fontSize: '11.5px', color: '#475569' }}>
          CareerPilot AI — Final Year Project · Built by Himanshu Sharma, Arun Kumar S &amp; Rakshith Reddy H · Guide: Sowmya D N
        </p>
      </footer>
    </div>
  )
}
