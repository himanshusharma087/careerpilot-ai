import { useState } from 'react'
import { Target, Lightbulb, Heart, Calendar, Rocket, Trophy, Wrench, Map, Bookmark, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import ErrorBanner from '../components/ErrorBanner'
import SkeletonCard from '../components/SkeletonCard'

const SKILL_OPTIONS = ['Python', 'JavaScript', 'React', 'SQL', 'Machine Learning',
  'Data Analysis', 'Docker', 'Cloud', 'Design', 'Communication', 'Java', 'C++']
const INTEREST_OPTIONS = ['Problem Solving', 'Building Products', 'Working with Data',
  'Design & Creativity', 'Teaching', 'Research', 'Entrepreneurship', 'Automation']

export default function CareerPredictor() {
  const { user } = useAuth()
  const [skills,    setSkills]    = useState([])
  const [interests, setInterests] = useState([])
  const [exp,       setExp]       = useState(0)
  const [result,    setResult]    = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [active,    setActive]    = useState(0)
  const [error,     setError]     = useState(null)
  const [saved,     setSaved]     = useState(false)
  const [saving,    setSaving]    = useState(false)

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const predict = async () => {
    if (!skills.length && !interests.length) {
      setError('Select at least one skill or interest to get a prediction.')
      return
    }
    setError(null); setLoading(true); setResult(null); setSaved(false)
    try {
      const { data } = await api.post('/predict-career', {
        skills, interests, experience_years: exp,
      })
      setResult(data); setActive(0)
    } catch {
      setError('Could not reach the prediction service. Make sure the backend is running and try again.')
    } finally {
      setLoading(false)
    }
  }

  const saveResult = async () => {
    setSaving(true)
    try {
      await api.post('/predictions/save', {
        kind: 'career',
        input_text: `Skills: ${skills.join(', ')} | Interests: ${interests.join(', ')} | Experience: ${exp} yrs`,
        result_json: JSON.stringify(result),
      })
      setSaved(true)
    } catch {
      setError('Could not save this result. Try again.')
    } finally {
      setSaving(false)
    }
  }

  const chip = (label, selected, onClick) => (
    <button
      key={label}
      onClick={onClick}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = '#6c63ff' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = '#2d2d4e' }}
      style={{
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
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>
        <Target color="#6c63ff" /> Career Predictor
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Select your skills and interests to discover your ideal career path.</p>

      <ErrorBanner message={error} onDismiss={() => setError(null)} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Skills */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#a78bfa', fontSize: '15px' }}>
            <Lightbulb size={16} /> Your Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SKILL_OPTIONS.map(s => chip(s, skills.includes(s), () => toggle(skills, setSkills, s)))}
          </div>
        </div>
        {/* Interests */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#34d399', fontSize: '15px' }}>
            <Heart size={16} /> Your Interests
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTEREST_OPTIONS.map(i => chip(i, interests.includes(i), () => toggle(interests, setInterests, i)))}
          </div>
        </div>
      </div>

      {/* Experience slider */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', fontSize: '15px', color: '#fbbf24' }}>
          <Calendar size={16} /> Experience: <span style={{ color: '#fff' }}>{exp} {exp === 1 ? 'year' : 'years'}</span>
        </h3>
        <input type="range" min={0} max={10} value={exp} onChange={e => setExp(+e.target.value)}
          aria-label="Years of experience" style={{ width: '100%', accentColor: '#6c63ff' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginTop: '4px' }}>
          <span>Fresher</span><span>5 yrs</span><span>10+ yrs</span>
        </div>
      </div>

      <button
        onClick={predict}
        disabled={loading}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
        style={{
          width: '100%', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: loading ? '#3d3d5e' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '2rem',
          transition: 'filter 0.15s',
        }}>
        <Rocket size={18} /> {loading ? 'Analyzing your profile...' : 'Predict My Career'}
      </button>

      {loading && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <SkeletonCard height={60} />
          <SkeletonCard height={220} />
        </div>
      )}

      {/* Results */}
      {!loading && result && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', margin: 0 }}>
              <Trophy size={20} color="#fbbf24" /> Top match: <span style={{ color: '#6c63ff' }}>{result.top_career}</span>
            </h3>
            {user ? (
              <button onClick={saveResult} disabled={saving || saved} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                background: saved ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                border: saved ? '1px solid #34d399' : '1px solid #2d2d4e',
                color: saved ? '#34d399' : '#94a3b8', fontSize: '13px', fontWeight: 600,
                cursor: saved ? 'default' : 'pointer',
              }}>
                {saved ? <Check size={15} /> : <Bookmark size={15} />}
                {saved ? 'Saved' : saving ? 'Saving…' : 'Save Result'}
              </button>
            ) : (
              <Link to="/login" style={{ fontSize: '13px', color: '#a78bfa', textDecoration: 'none' }}>
                Log in to save this result
              </Link>
            )}
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {result.predictions.map((p, i) => (
              <button key={i} onClick={() => setActive(i)}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.borderColor = '#6c63ff' }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.borderColor = '#2d2d4e' }}
                style={{
                  padding: '6px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                  background: active === i ? '#6c63ff' : 'transparent',
                  color:      active === i ? '#fff'     : '#94a3b8',
                  border:     active === i ? 'none'     : '1px solid #2d2d4e',
                  transition: 'border-color 0.15s',
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {/* Skill gaps */}
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#fbbf24', marginBottom: '0.6rem' }}>
                      <Wrench size={14} /> Skill Gaps to Fill
                    </h4>
                    {p.skill_gaps.map(s => (
                      <div key={s} style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px', padding: '6px 10px', marginBottom: '6px', fontSize: '13px', color: '#e2e8f0' }}>
                        {s}
                      </div>
                    ))}
                  </div>
                  {/* Roadmap */}
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#34d399', marginBottom: '0.6rem' }}>
                      <Map size={14} /> 10-Week Roadmap
                    </h4>
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
