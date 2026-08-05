export default function SkeletonCard({ height = 180 }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e',
      borderRadius: '14px', padding: '1.5rem', height, position: 'relative', overflow: 'hidden',
    }}>
      <div className="skeleton-shimmer" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.08), transparent)',
      }} />
      <div style={{ width: '40%', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', marginBottom: '12px' }} />
      <div style={{ width: '90%', height: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px' }} />
      <div style={{ width: '70%', height: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}
