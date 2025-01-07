from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging
from ..core.database import get_db
from ..models.channel import Channel
from ..schemas.channels import ChannelCreate, ChannelResponse, ChannelUpdate
from ..services.auth import get_current_user
from ..models.user import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=ChannelResponse)
async def create_channel(
    channel: ChannelCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new channel"""
    logger.info(f"Creating channel: {channel.name}")
    db_channel = Channel(
        name=channel.name,
        type=channel.type,
        created_by=current_user.id,
        is_default=channel.is_default
    )
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    logger.info(f"Channel created: {db_channel.id}")
    return db_channel

@router.get("/", response_model=List[ChannelResponse])
async def get_channels(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all channels"""
    channels = db.query(Channel).offset(skip).limit(limit).all()
    return channels

@router.get("/{channel_id}", response_model=ChannelResponse)
async def get_channel(
    channel_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific channel"""
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    return channel

@router.patch("/{channel_id}", response_model=ChannelResponse)
async def update_channel(
    channel_id: int,
    channel_update: ChannelUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a channel"""
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    # Only creator can update channel
    if channel.created_by != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update this channel"
        )
    
    for field, value in channel_update.dict(exclude_unset=True).items():
        setattr(channel, field, value)
    
    db.commit()
    db.refresh(channel)
    return channel 