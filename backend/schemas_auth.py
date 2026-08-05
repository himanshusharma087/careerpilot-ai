"""
Pydantic schemas for auth and saved-prediction endpoints.

Named schemas_auth.py to avoid clashing with the CareerRequest/ResumeRequest
models already defined in main.py.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class SavePredictionRequest(BaseModel):
    kind: str = Field(pattern="^(career|resume)$")   # "career" or "resume"
    input_text: str = Field(min_length=1, max_length=20000)
    result_json: str = Field(min_length=1)            # frontend sends JSON.stringify(result)


class SavedPredictionOut(BaseModel):
    id: int
    kind: str
    input_text: str
    result_json: str
    created_at: datetime

    class Config:
        from_attributes = True
