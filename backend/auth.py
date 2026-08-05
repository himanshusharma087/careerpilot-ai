"""
Password hashing + JWT token handling for CareerPilot AI.

SECRET_KEY: set this via an environment variable in production
(export JWT_SECRET_KEY="some-long-random-string"). Falls back to a
default for local development only — never rely on the default if
you ever deploy this publicly.
"""
import os
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import bcrypt
from sqlalchemy.orm import Session

from database import get_db
from models_db import User

logger = logging.getLogger("careerpilot")

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-only-secret-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days — reasonable for a demo/project app

if SECRET_KEY == "dev-only-secret-change-in-production":
    logger.warning("⚠️  Using default JWT secret — set JWT_SECRET_KEY env var before deploying publicly.")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)


def hash_password(password: str) -> str:
    # bcrypt has a hard 72-byte input limit — truncate defensively (passwords
    # this long are already well beyond any reasonable strength requirement)
    pw_bytes = password.encode("utf-8")[:72]
    return bcrypt.hashpw(pw_bytes, bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, password_hash: str) -> bool:
    pw_bytes = plain_password.encode("utf-8")[:72]
    return bcrypt.checkpw(pw_bytes, password_hash.encode("utf-8"))


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """FastAPI dependency — protects an endpoint, requiring a valid Bearer token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials. Please log in again.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exception
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user
