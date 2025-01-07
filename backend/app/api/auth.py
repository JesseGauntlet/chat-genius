from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import logging
import traceback
from ..core.database import get_db
from ..services.auth import authenticate_user, create_access_token, get_password_hash
from ..schemas.auth import Token, UserCreate
from ..models.user import User
from ..core.config import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Starting registration for email: {user_data.email}")
    try:
        # Check if user exists
        db_user = db.query(User).filter(User.email == user_data.email).first()
        if db_user:
            logger.warning(f"Registration failed: Email already exists: {user_data.email}")
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        
        # Create new user
        logger.info("Creating new user")
        db_user = User(
            email=user_data.email,
            password_hash=get_password_hash(user_data.password),
            status="online"
        )
        
        logger.info("Adding user to database")
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        logger.info(f"Successfully created user with ID: {db_user.id}")
        
        # Create access token
        logger.info("Generating access token")
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data.email}, expires_delta=access_token_expires
        )
        logger.info("Registration complete")
        
        token_response = {"access_token": access_token, "token_type": "bearer"}
        logger.info(f"Returning token response: {token_response}")
        return token_response
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during registration: {str(e)}"
        )

@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    logger.info(f"Login attempt for user: {form_data.username}")
    try:
        user = authenticate_user(db, form_data.username, form_data.password)
        if not user:
            logger.warning(f"Login failed for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        logger.info("Generating access token")
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        logger.info(f"Login successful for user: {form_data.username}")
        
        token_response = {"access_token": access_token, "token_type": "bearer"}
        logger.info(f"Returning token response: {token_response}")
        return token_response
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during login: {str(e)}"
        ) 