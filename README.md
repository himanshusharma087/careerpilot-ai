# CareerPilot AI 🧭
An Intelligent Career Prediction & Skill Roadmapping Platform

## Features
- AI-powered career prediction using Random Forest + TF-IDF NLP
- Resume Analyzer with ATS scoring
- Personalized 10-week skill roadmap
- Real 2025-26 Indian IT salary data

## Tech Stack
Frontend: React.js, Vite
Backend: Python, FastAPI
ML/NLP: Scikit-learn, Random Forest, TF-IDF Vectorizer
Dataset: 220 career samples across 11 classes

## How to Run
### Backend
cd backend
python -m pip install fastapi uvicorn scikit-learn numpy
python -m uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

Open http://localhost:5173
