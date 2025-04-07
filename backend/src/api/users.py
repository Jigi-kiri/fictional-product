from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from email_validator import EmailNotValidError

from src.database import get_db
from src.models import user as models
from src.schemas.user import UserCreate, UserResponse, ErrorResponse

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    responses={400: {"model": ErrorResponse}}
)

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Additional validation for pricing plan
        if user.pricing_plan not in ["Monthly", "Annual"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid pricing plan. Must be either 'Monthly' or 'Annual'"
            )

        # Additional validation for name
        if not user.name or len(user.name.strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Name cannot be empty"
            )

        # Create user
        db_user = models.User(
            name=user.name.strip(),
            email=user.email,
            pricing_plan=user.pricing_plan
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    except EmailNotValidError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users