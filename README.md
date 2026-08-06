[README.md](https://github.com/user-attachments/files/30770712/README.md)
# CareerPilot AI

An AI-powered career guidance platform that predicts your best-fit tech careers from your skills and interests, analyzes your resume, and generates a personalized roadmap to close the gap — built as a final-year project.

## Features

- **Career Predictor** — enter your skills, interests, and experience to get your top 5 career matches, ranked by fit, with salary range and market demand for each
- **Resume Analyzer** — paste your resume text to get an ATS compatibility score, a content score, detected skills, and specific improvement suggestions
- **Skill Roadmap** — a 10-week, step-by-step roadmap to close the gap to your predicted career
- **User Accounts** — sign up, log in, and save your prediction/resume results to revisit later

## Tech Stack

**Backend:** FastAPI · scikit-learn (Random Forest + TF-IDF) · SQLAlchemy · SQLite · JWT auth
**Frontend:** React + Vite · React Router · Axios

## Dataset

The model is trained on 1,539 samples across 11 career classes: 220 curated skill-interest-career mappings, augmented with 1,320 real 2024 LinkedIn job postings (skills + titles), filtered and balanced per class.

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux
pip install fastapi uvicorn pydantic numpy scikit-learn sqlalchemy python-jose[cryptography] bcrypt pydantic[email]
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

Create a `.env` file in `frontend/` with:
```
VITE_API_URL=http://localhost:8000
```
