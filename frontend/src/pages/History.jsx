import { useEffect, useState } from 'react'
import { History as HistoryIcon, Trash2, Target, FileText } from 'lucide-react'
import api from '../api'
import ErrorBanner from '../components/ErrorBanner'
import SkeletonCard from '../components/SkeletonCard'

export default function History() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  const load = () => {
    setError(null)
    api.get('/predictions/history')
      .then(({ data }) => setItems(data))
      .catch(() => setError('Could not load your saved history.'))
  }

  useEffect(load, [])

  const remove = async (id) => {
    try {
      await api.delete(`/predictions/${id}`)
      setItems(items.filter(i => i.id !== id))
    } catch {
      setError('Could not delete that item. Try again.')
    }
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <HistoryIcon size={22} color="#a78bfa" />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Your Saved Results</h1>
      </div>

      {error && <ErrorBanner message={error} />}

      {items === null && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SkeletonCard /><SkeletonCard />
        </div>
      )}

      {items && items.length === 0 && (
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Nothing saved yet — use the "Save Result" button on the Career Predictor or Resume Analyzer page.
        </p>
      )}

      {items && items.map(item => {
        let parsed = {}
        try { parsed = JSON.parse(item.result_json) } catch { /* ignore */ }
        const isCareer = item.kind === 'career'
        return (
          <div key={item.id} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e',
            borderRadius: '14px', padding: '1.2rem 1.5rem', marginBottom: '12px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {isCareer ? <Target size={18} color="#a78bfa" style={{ marginTop: '2px' }} />
                        : <FileText size={18} color="#a78bfa" style={{ marginTop: '2px' }} />}
              <div>
                <div style={{ fontWeight: 600, fontSize: '14.5px', marginBottom: '4px' }}>
                  {isCareer ? (parsed.top_career || 'Career Prediction') : `Resume Analysis — ${parsed.best_fit_role || ''}`}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', maxWidth: '480px' }}>
                  {item.input_text.slice(0, 140)}{item.input_text.length > 140 ? '…' : ''}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <button onClick={() => remove(item.id)} aria-label="Delete" style={{
              background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px',
            }}>
              <Trash2 size={17} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
