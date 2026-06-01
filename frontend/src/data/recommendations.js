// src/data/recommendations.js
export const RECS = {
  // Tier 0 – Risiko Rendah
  "Rendah": {
    summary: 'Kondisi Anda baik. Pertahankan gaya hidup sehat.',
    categories: [
      {
        cat: '🥗 Pola Makan',
        color: '#10b981',
        items: [
          {
            icon: '🥦',
            title: 'Perbanyak sayur & buah',
            desc: 'Konsumsi 5 porsi sayur & buah per hari, pilih yang kaya serat.'
          },
          {
            icon: '🌾',
            title: 'Pilih karbohidrat kompleks',
            desc: 'Beras merah, oat, quinoa lebih baik dari nasi putih biasa.'
          }
        ]
      },
      {
        cat: '🏃 Aktivitas Fisik',
        color: '#3b82f6',
        items: [
          {
            icon: '🚶',
            title: 'Olahraga rutin',
            desc: '150 menit/minggu aktivitas aerobik sedang (seperti jalan cepat).'
          }
        ]
      },
      {
        cat: '🩺 Pemantauan',
        color: '#8b5cf6',
        items: [
          {
            icon: '📅',
            title: 'Cek gula darah tahunan',
            desc: 'Tes gula darah puasa setiap 1 tahun sekali untuk preventif.'
          }
        ]
      }
    ]
  },

  // Tier 1 – Risiko Sedang
  "Sedang": {
    summary: 'Perhatian! Anda memiliki risiko sedang. Mulai lakukan pembatasan.',
    categories: [
      {
        cat: '🥗 Pola Makan',
        color: '#f59e0b',
        items: [
          {
            icon: '🧃',
            title: 'Batasi konsumsi gula',
            desc: 'Hindari minuman manis kemasan, kurangi camilan tinggi karbohidrat sederhana.'
          },
          {
            icon: '🍽️',
            title: 'Kontrol porsi makan',
            desc: 'Gunakan metode piring makan model T (setengah sayur, seperempat protein, seperempat karbohidrat).'
          }
        ]
      },
      {
        cat: '🏃 Aktivitas Fisik',
        color: '#3b82f6',
        items: [
          {
            icon: '🚴',
            title: 'Tingkatkan intensitas fisik',
            desc: 'Lakukan olahraga 30-45 menit sehari, minimal 4 kali seminggu untuk membakar kalori berlebih.'
          }
        ]
      },
      {
        cat: '🩺 Pemantauan',
        color: '#8b5cf6',
        items: [
          {
            icon: '🩸',
            title: 'Cek gula darah berkala',
            desc: 'Lakukan pemeriksaan glukosa setiap 3-6 bulan sekali ke fasilitas kesehatan.'
          }
        ]
      }
    ]
  },

  // Tier 2 – Risiko Tinggi
  "Tinggi": {
    summary: 'Peringatan! Risiko Anda tinggi. Segera konsultasikan dengan dokter ahli.',
    categories: [
      {
        cat: '🥗 Pola Makan',
        color: '#ef4444',
        items: [
          {
            icon: '❌',
            title: 'Diet ketat rendah gula',
            desc: 'Ganti nasi putih dengan nasi merah/shirataki, eliminasi total pemanis tambahan.'
          },
          {
            icon: '🍎',
            title: 'Pilih buah rendah glikemik',
            desc: 'Konsumsi buah seperti apel, avokad, atau buah beri yang tidak melonjakkan gula darah.'
          }
        ]
      },
      {
        cat: '🏃 Aktivitas Fisik',
        color: '#3b82f6',
        items: [
          {
            icon: '👟',
            title: 'Aktivitas terukur',
            desc: 'Konsultasikan jenis latihan yang aman dengan dokter, hindari olahraga yang terlalu ekstrem jika ada komplikasi.'
          }
        ]
      },
      {
        cat: '🩺 Pemantauan',
        color: '#8b5cf6',
        items: [
          {
            icon: '👨‍⚕️',
            title: 'Konsultasi Medis Segera',
            desc: 'Segera temui dokter spesialis penyakit dalam (Sp.PD) atau ahli endokrinologi untuk penanganan klinis.'
          },
          {
            icon: '📟',
            title: 'Gunakan glukometer mandiri',
            desc: 'Pantau kadar gula darah puasa dan 2 jam setelah makan secara mandiri di rumah.'
          }
        ]
      }
    ]
  }
};