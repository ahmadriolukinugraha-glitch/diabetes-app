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

# ---- CORS (izinkan request dari React dev server) ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', '*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

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
    features = np.array([[
        data.pregnancies, data.glucose, data.blood_pressure,
        data.skin_thickness, data.insulin, data.bmi,
        data.diabetes_pedigree, data.age
    ]])
    
    scaled  = scaler.transform(features)
    prob    = model.predict_proba(scaled)[0][1]
    label   = int(model.predict(scaled)[0])
    contrib = (scaled[0] * model.coef_[0]).tolist()
    
    return {
        'probability': round(float(prob), 4),
        'prediction' : label,
        'risk_level' : get_risk(prob),
        'contributions': contrib,
    }

def get_risk(p):
    if p < 0.25: return 'Risiko Rendah'
    if p < 0.50: return 'Risiko Sedang'
    if p < 0.75: return 'Risiko Tinggi'
    return 'Risiko Sangat Tinggi'

@app.get('/')
def root():
    return {'message': 'DiabetesCare API aktif ✅'}