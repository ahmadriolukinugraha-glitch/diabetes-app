// frontend/src/components/ResultCard.jsx
const RISK_COLORS = {
  'Risiko Rendah': 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
  'Risiko Sedang': 'text-amber-400 bg-amber-950/40 border-amber-500/30',
  'Risiko Tinggi': 'text-orange-400 bg-orange-950/40 border-orange-500/30',
  'Risiko Sangat Tinggi': 'text-rose-400 bg-rose-950/40 border-rose-500/30',
}

export default function ResultCard({ result }) {
  const colorClass = RISK_COLORS[result.risk_level] || 'text-white bg-slate-700'
  const pct = Math.round(result.probability * 100)

  return (
    <div className="mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-fade-in">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📊 Hasil Analisis Medis
      </h2>

      {/* Tampilan Badge Tingkat Risiko */}
      <div className={`${colorClass} border p-5 rounded-xl text-center mb-6 backdrop-blur-sm`}>
        <div className="text-5xl font-black tracking-tight mb-1">{pct}%</div>
        <div className="text-lg font-bold tracking-wide uppercase">{result.risk_level}</div>
      </div>

      {/* Judul Progress Bar */}
      <div className="flex justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
        <span>Tingkat Kerentanan</span>
        <span>{pct}%</span>
      </div>

      {/* Rumah Progress Bar */}
      <div className="bg-slate-700/60 rounded-full h-4 p-0.5 overflow-hidden border border-slate-600/30">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out shadow-inner"
          style={{
            width: `${pct}%`,
            background: pct < 25 ? '#10b981' // Hijau Emerald
                      : pct < 50 ? '#f59e0b' // Kuning Amber
                      : pct < 75 ? '#f97316' // Oranye
                      : '#f43f5e'            // Merah Rose
          }}
        />
      </div>

      <div className="mt-4 flex justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
        <span>Akurasi Model AI: ~80%</span>
        <span>Probabilitas Negatif: {100 - pct}%</span>
      </div>
    </div>
  )
}