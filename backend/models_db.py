"""
Database table definitions (SQLAlchemy ORM models).

Named models_db.py — not models.py — to avoid clashing with the
`model` variable (the trained Random Forest) already used in main.py.
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    email         = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at    = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    predictions = relationship("SavedPrediction", back_populates="user", cascade="all, delete-orphan")


class SavedPrediction(Base):
    __tablename__ = "saved_predictions"

    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    kind         = Column(String(50), nullable=False)   # "career" or "resume"
    input_text   = Column(Text, nullable=False)          # what the user submitted (skills/interests, or resume text)
    result_json  = Column(Text, nullable=False)          # the full JSON response, stored as text
    created_at   = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="predictions")
