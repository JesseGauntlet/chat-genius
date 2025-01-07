from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import logging
from ..core.database import get_db
from ..models.user import User
from ..schemas.users import UserResponse, UserUpdate

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all users with pagination"""
    logger.info("Attempting to fetch users")
    try:
        users = db.query(User).offset(skip).limit(limit).all()
        logger.info(f"Found {len(users)} users")
        return users
    except Exception as e:
        logger.error(f"Error fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID"""
    logger.info(f"Attempting to fetch user {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        logger.warning(f"User {user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    logger.info(f"Found user {user_id}")
    return user

@router.patch("/{user_id}", response_model=UserResponse)
async def update_user_status(
    user_id: int, 
    user_update: UserUpdate,
    db: Session = Depends(get_db)
):
    """Update a user's status"""
    logger.info(f"Attempting to update user {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        logger.warning(f"User {user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(user, field, value)
    
    try:
        db.commit()
        db.refresh(user)
        logger.info(f"Successfully updated user {user_id}")
        return user
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e)) 