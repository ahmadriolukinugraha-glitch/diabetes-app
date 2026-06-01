// src/utils/risk.js

export function getTier(probability) {
  if (probability < 0.25) return 0; // Risiko Rendah
  if (probability < 0.50) return 1; // Risiko Sedang
  if (probability < 0.75) return 2; // Risiko Tinggi
  return 3;                         // Risiko Sangat Tinggi
}

export function getRisk(probability) {
  const tier = getTier(probability);

  const map = [
    { label: 'Risiko Rendah',        color: '#10b981', emoji: '🟢' },
    { label: 'Risiko Sedang',        color: '#f59e0b', emoji: '🟡' },
    { label: 'Risiko Tinggi',        color: '#f97316', emoji: '🟠' },
    { label: 'Risiko Sangat Tinggi', color: '#ef4444', emoji: '🔴' }
  ];

  return { ...map[tier], tier };
}