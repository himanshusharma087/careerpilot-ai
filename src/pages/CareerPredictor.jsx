import { useState } from 'react'
import axios from 'axios'

const SKILL_OPTIONS = ['Python', 'JavaScript', 'React', 'SQL', 'Machine Learning',
  'Data Analysis', 'Docker', 'Cloud', 'Design', 'Communication', 'Java', 'C++']
const INTEREST_OPTIONS = ['Problem Solving', 'Building Products', 'Working with Data',
  'Design & Creativity', 'Teaching', 'Research', 'Entrepreneurship', 'Automation']

export default function CareerPredictor() {
  const [skills,    setSkills]    = useState([])
  const [interests, setInterests] = useState([])
  const [exp,       setExp]       = useState(0)
  const [result,    setResult]    = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [active,    setActive]    = useState(0)

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const predict = async () => {
    if (!skills.length && !interests.length) return alert('Please select at least one skill or interest!')
    setLoading(true); setResult(null)
    try {
      const { data } = await axios.post('http://localhost:8000/predict-career', {
        skills, interests, experience_years: exp,
      })
      setResult(data); setActive(0)
    } catch { alert('Backend not running! Start FastAPI first.') }
    finally { setLoading(false) }
  }

  const chip = (label, selected, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding: '6px 14px', borderRadius: '999px', fontSize: '13px',
      fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
      background: selected ? '#6c63ff' : 'rgba(255,255,255,0.05)',
      color:      selected ? '#fff'     : '#94a3b8',
      border:     selected ? '1px solid #6c63ff' : '1px solid #2d2d4e',
    }}>
      {label}
    </button>
  )

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>🎯 Career Predictor</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Select your skills and interests to discover your ideal career path.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Skills */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#a78bfa', fontSize: '15px' }}>💡 Your Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SKILL_OPTIONS.map(s => chip(s, skills.includes(s), () => toggle(skills, setSkills, s)))}
          </div>
        </div>
        {/* Interests */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#34d399', fontSize: '15px' }}>❤️ Your Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTEREST_OPTIONS.map(i => chip(i, interests.includes(i), () => toggle(interests, setInterests, i)))}
          </div>
        </div>
      </div>

      {/* Experience slider */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '15px', color: '#fbbf24' }}>📅 Experience: <span style={{ color: '#fff' }}>{exp} {exp === 1 ? 'year' : 'years'}</span></h3>
        <input type="range" min={0} max={10} value={exp} onChange={e => setExp(+e.target.value)}
          style={{ width: '100%', accentColor: '#6c63ff' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginTop: '4px' }}>
          <span>Fresher</span><span>5 yrs</span><span>10+ yrs</span>
        </div>
      </div>

      <button onClick={predict} disabled={loading} style={{
        width: '100%', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 700,
        background: loading ? '#3d3d5e' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
        color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '2rem',
      }}>
        {loading ? '🔮 Analyzing your profile...' : '🚀 Predict My Career'}
      </button>

      {/* Results */}
      {result && (
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            🏆 Top match: <span style={{ color: '#6c63ff' }}>{result.top_career}</span>
          </h3>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {result.predictions.map((p, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                background: active === i ? '#6c63ff' : 'transparent',
                color:      active === i ? '#fff'     : '#94a3b8',
                border:     active === i ? 'none'     : '1px solid #2d2d4e',
              }}>
                {p.title} ({p.match}%)
              </button>
            ))}
          </div>

          {/* Detail card */}
          {(() => {
            const p = result.predictions[active]
            return (
              <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid #6c63ff', borderRadius: '16px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{p.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>Demand: {p.demand} · Salary: {p.avg_salary}</p>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(108,99,255,0.2)', borderRadius: '12px', padding: '10px 20px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a78bfa' }}>{p.match}%</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>match</div>
                  </div>
                </div>

                {/* Match bar */}
                <div style={{ background: '#1e1e3a', borderRadius: '999px', height: '8px', marginBottom: '1.5rem' }}>
                  <div style={{ height: '8px', borderRadius: '999px', width: `${p.match}%`, background: 'linear-gradient(90deg, #6c63ff, #a78bfa)', transition: 'width 0.6s ease' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Skill gaps */}
                  <div>
                    <h4 style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '0.6rem' }}>🔧 Skill Gaps to Fill</h4>
                    {p.skill_gaps.map(s => (
                      <div key={s} style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px', padding: '6px 10px', marginBottom: '6px', fontSize: '13px', color: '#e2e8f0' }}>
                        {s}
                      </div>
                    ))}
                  </div>
                  {/* Roadmap */}
                  <div>
                    <h4 style={{ fontSize: '14px', color: '#34d399', marginBottom: '0.6rem' }}>🗺️ 10-Week Roadmap</h4>
                    {p.roadmap.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#6c63ff', minWidth: '70px', fontWeight: 600 }}>{r.week}</span>
                        <span style={{ color: '#94a3b8' }}>{r.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}