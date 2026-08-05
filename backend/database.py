"""
Database setup for CareerPilot AI.

Uses SQLite — a single file on disk (careerpilot.db), no separate
database server needed. Good enough for a final-year project; if you
ever outgrow it, only this file needs to change (swap DATABASE_URL for
a Postgres/MySQL connection string) — nothing else in the app touches
the database directly except through this module.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'careerpilot.db')}"

# check_same_thread=False is required for SQLite + FastAPI's threaded request handling
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a DB session and always closes it after the request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
