import React from 'react';

export default function FeatureContributions({ importance }) {
  if (!importance || importance.length === 0) return null;

  const sortedImportance = [...importance].sort(
    (a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)
  );

  return (
    <div className="mt-6 p-5 bg-slate-800 rounded-xl border border-slate-700/50 shadow-lg text-white">
      <h3 className="text-xl font-bold text-center mb-2">
        📊 Analisis Faktor Risiko (Explainable AI)
      </h3>
      <p className="text-center text-xs text-slate-400 mb-6">
        Batang <span className="text-red-400 font-semibold">Merah</span> meningkatkan risiko diabetes, sedangkan batang <span className="text-emerald-400 font-semibold">Hijau</span> menurunkan risiko.
      </p>

      <div className="space-y-3">
        {sortedImportance.map((item, index) => {
          const isPositive = item.direction === 'increase';
          const percentage = Math.min(Math.abs(item.contribution) * 20, 100);

          return (
            <div key={index} className="flex items-center text-sm">
              <div className="w-32 font-medium text-slate-300 capitalize">
                {item.feature.replace(/([A-Z])/g, ' $1').trim()}
              </div>

              <div className={`flex-grow bg-slate-700 h-5 rounded-lg overflow-hidden relative flex ${isPositive ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`h-full rounded-lg transition-all duration-500 ${isPositive ? 'bg-gradient-to-r from-red-500 to-rose-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className={`w-16 text-right font-bold ml-3 ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
                {isPositive ? '+' : ''}{item.contribution.toFixed(3)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}