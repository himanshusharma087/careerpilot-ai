import { useState } from 'react'
import axios from 'axios'

const SAMPLE = `John Doe | johndoe@email.com | github.com/johndoe
Final Year B.Tech CSE Student

SKILLS
Python, Machine Learning, React, SQL, Docker, Git, TensorFlow, Data Analysis

PROJECTS
- Built a sentiment analysis model using Python and scikit-learn (92% accuracy)
- Developed a full-stack web app with React frontend and Node.js backend
- Led a team of 4 to design and deploy a cloud-based inventory system

EDUCATION
B.Tech Computer Science | XYZ University | 2021–2025 | CGPA: 8.4

EXPERIENCE
Intern | ABC Tech | Summer 2024 | Worked on data pipeline automation using Python and Airflow`

export default function ResumeAnalyzer() {
  const [text,    setText]    = useState('')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (text.trim().length < 50) return alert('Please paste at least 50 characters of resume text.')
    setLoading(true); setResult(null)
    try {
      const { data } = await axios.post('http://localhost:8000/analyze-resume', { resume_text: text })
      setResult(data)
    } catch { alert('Backend not running! Start FastAPI first.') }
    finally { setLoading(false) }
  }

  const ScoreCircle = ({ score, label, color }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 8px',
        background: `conic-gradient(${color} ${score * 3.6}deg, #1e1e3a 0deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color }}>{score}</span>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b' }}>{label}</p>
    </div>
  )

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>📄 Resume Analyzer</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Paste your resume text to get ATS score, strengths, and improvement tips.</p>

      {/* Textarea */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', color: '#a78bfa' }}>Paste Resume Text</h3>
          <button onClick={() => setText(SAMPLE)} style={{ fontSize: '12px', color: '#6c63ff', background: 'none', border: '1px solid #6c63ff', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}>
            Load Sample
          </button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your resume text here..."
          style={{
            width: '100%', minHeight: '220px', background: '#0a0a18',
            border: '1px solid #2d2d4e', borderRadius: '10px',
            color: '#e2e8f0', fontSize: '13px', padding: '12px',
            resize: 'vertical', fontFamily: 'monospace', lineHeight: 1.6,
          }}
        />
        <p style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>{text.split(/\s+/).filter(Boolean).length} words</p>
      </div>

      <button onClick={analyze} disabled={loading} style={{
        width: '100%', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 700,
        background: loading ? '#3d3d5e' : 'linear-gradient(135deg, #6c63ff, #a78bfa)',
        color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '2rem',
      }}>
        {loading ? '🔍 Analyzing resume...' : '🔍 Analyze My Resume'}
      </button>

      {/* Results */}
      {result && (
        <div>
          {/* Score circles */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.2rem', fontSize: '15px', color: '#e2e8f0' }}>📊 Resume Scores</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
              <ScoreCircle score={result.overall_score} label="Overall Score" color="#6c63ff" />
              <ScoreCircle score={result.ats_score}     label="ATS Score"     color="#34d399" />
              <ScoreCircle score={result.content_score} label="Content Score" color="#fbbf24" />
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px', color: '#94a3b8' }}>
              Best fit role: <span style={{ color: '#a78bfa', fontWeight: 700 }}>{result.best_fit_role}</span>
              {' · '}{result.word_count} words detected
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Strengths */}
            <div style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '14px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '15px', color: '#34d399', marginBottom: '1rem' }}>✅ Strengths</h3>
              {result.strengths.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#e2e8f0' }}>
                  <span style={{ color: '#34d399' }}>●</span> {s}
                </div>
              ))}
            </div>
            {/* Improvements */}
            <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '14px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '15px', color: '#fbbf24', marginBottom: '1rem' }}>⚡ Improve This</h3>
              {result.improvements.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#e2e8f0' }}>
                  <span style={{ color: '#fbbf24' }}>→</span> {s}
                </div>
              ))}
            </div>
          </div>

          {/* Detected skills */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: '14px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '15px', color: '#e2e8f0', marginBottom: '1rem' }}>🔍 Detected Skills ({result.detected_skills.length})</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.detected_skills.length > 0
                ? result.detected_skills.map(s => (
                    <span key={s} style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid #6c63ff', borderRadius: '999px', padding: '4px 12px', fontSize: '13px', color: '#a78bfa' }}>
                      {s}
                    </span>
                  ))
                : <p style={{ color: '#475569', fontSize: '14px' }}>No recognized skills detected. Try the sample resume!</p>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}