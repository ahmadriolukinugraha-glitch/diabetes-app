# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

# ---- Load model & scaler ----
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

app = FastAPI(title='DiabetesCare API', version='1.0')

# ---- CORS (izinkan request dari React dev server & Vercel) ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Mengizinkan frontend Vercel Anda mengakses backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# === TAMBAHKAN KODE INI AGAR TIDAK "NOT FOUND" LAGI ===
@app.get('/')
def index():
    return {
        "status": "online",
        "message": "Backend DiabetesCare API berhasil berjalan dengan sukses!"
    }
# =====================================================

# ---- Fungsi Pembantu Penentu Tingkat Risiko ----
def get_risk(prob: float) -> str:
    """Menentukan kategori tingkat risiko berdasarkan nilai probabilitas."""
    if prob < 0.3:
        return "Rendah"
    elif prob < 0.7:
        return "Sedang"
    else:
        return "Tinggi"

# ---- Schema Input ----
class PatientData(BaseModel):
    pregnancies     : float
    glucose         : float
    blood_pressure  : float
    skin_thickness  : float
    insulin         : float
    bmi             : float
    diabetes_pedigree: float
    age             : float

# ---- Endpoint Prediksi ----
@app.post('/predict')
def predict(data: PatientData):
    # 1. Mengubah input data dari frontend menjadi Array
    features = np.array([[
        data.pregnancies, data.glucose, data.blood_pressure,
        data.skin_thickness, data.insulin, data.bmi,
        data.diabetes_pedigree, data.age
    ]])

    # 2. Normalisasi menggunakan scaler bawaan model
    scaled = scaler.transform(features)

    # 3. Prediksi probabilitas dan label kelas asli (0 atau 1)
    prob = model.predict_proba(scaled)[0][1]
    label = int(model.predict(scaled)[0])

    # 4. Menghitung Nilai Kontribusi tiap fitur
    contributions = (scaled[0] * model.coef_[0]).tolist()

    # 5. Pemetaan nama fitur sesuai urutan dataset
    feature_names = [
        'Pregnancies', 'Glucose', 'BloodPressure', 
        'SkinThickness', 'Insulin', 'BMI', 
        'DiabetesPedigree', 'Age'
    ]

    # 6. Menyusun Feature Importance berbentuk List Object untuk Frontend
    importance = [
        {
            'feature': name, 
            'contribution': round(float(c), 4),
            'direction': 'increase' if c > 0 else 'decrease'
        }
        for name, c in zip(feature_names, contributions)
    ]

    # 7. Mengembalikan respons JSON lengkap ke frontend
    return {
        'probability': round(float(prob), 4),
        'prediction': label,
        'risk_level': get_risk(prob),  # Sekarang fungsi ini sudah aman dipanggil
        'contributions': contributions,
        'importance': importance
    }