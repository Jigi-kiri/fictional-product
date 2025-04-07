from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    pricing_plan: str

    @field_validator('pricing_plan')
    def validate_pricing_plan(cls, v):
        if v not in ['Monthly', 'Annual']:
            raise ValueError('Pricing plan must be either Monthly or Annual')
        return v

    @field_validator('name')
    def validate_name(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ErrorResponse(BaseModel):
    detail: str