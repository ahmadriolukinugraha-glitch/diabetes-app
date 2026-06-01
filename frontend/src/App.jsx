// frontend/src/App.jsx
import { useState } from 'react'
import axios from 'axios'
import ResultCard from './components/ResultCard'
import FeatureContributions from './components/FeatureContributions';
import { RECS } from './data/recommendations';

const FIELDS = [
  { key: 'glucose',           label: 'Kadar Glukosa',      unit: 'mg/dL',        default: 120 },
  { key: 'bmi',               label: 'BMI',                unit: 'kg/m²',        default: 25 },
  { key: 'age',               label: 'Usia',               unit: 'tahun',        default: 30 },
  { key: 'blood_pressure',    label: 'Tekanan Darah',      unit: 'mmHg',         default: 70 },
  { key: 'insulin',           label: 'Insulin',            unit: 'muU/ml',       default: 80 },
  { key: 'skin_thickness',    label: 'Lipatan Kulit',      unit: 'mm',           default: 20 },
  { key: 'pregnancies',       label: 'Kehamilan',          unit: 'kali',         default: 0 },
  { key: 'diabetes_pedigree', label: 'Pedigree Function',  unit: '',             default: 0.47 },
]

export default function App() {
  const [values, setValues] = useState(
    Object.fromEntries(FIELDS.map(f => [f.key, f.default]))
  )
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post('/api/predict', values)
      setResult(res.data)
    } catch (e) {
      setError('Gagal terhubung ke server. Pastikan backend aktif.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          🩺 DiabetesCare AI
        </h1>
        <p className="text-center text-slate-400 mb-8 text-sm">
          Sistem Prediksi Risiko Diabetes Berbasis Machine Learning
        </p>

        {/* Form Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELDS.map(field => (
            <div key={field.key} className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 shadow-lg">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {field.label} {field.unit && `(${field.unit})`}
              </label>
              <input
                type="number"
                value={values[field.key]}
                onChange={(e) => setValues(prev => ({
                  ...prev,
                  [field.key]: parseFloat(e.target.value) || 0
                }))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
              />
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/30 transform active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? '⏳ Memproses Analisis...' : '🔍 Mulai Prediksi Sekarang'}
          </button>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mt-4 bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        
        {/* Tampilkan grafik hanya jika data hasil dari backend sudah berhasil diterima */}
        {result && (
          <div className="mt-6 space-y-6">
            {/* Kartu Hasil Medis Anda yang sudah ada */}

            {/* Panggil komponen grafik kontribusi dengan melempar dataimportance */}
            <FeatureContributions importance={result.importance} />
          </div>
        )}

        {/* Tampilkan rekomendasi jika data hasil prediksi sudah ada */}
        {result && RECS[result.risk_level] && (
          <div className="mt-6 p-6 bg-slate-800 rounded-xl border border-slate-700/50 text-white">
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              📋 Rencana Aksi & Rekomendasi Kesehatan
            </h3>
            <p className="text-sm text-slate-400 mb-6 italic">
              "{RECS[result.risk_level].summary}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECS[result.risk_level].categories.map((category, idx) => (
                <div key={idx} className="p-4 bg-slate-900/40 rounded-xl border border-slate-700/30">
                  <h4 
                    className="font-bold text-md mb-4 pb-1 border-b"
                    style={{ borderColor: category.color, color: category.color }}
                  >
                    {category.cat}
                  </h4>
                  <ul className="space-y-4">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 items-start text-sm">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <h5 className="font-semibold text-slate-200">{item.title}</h5>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}