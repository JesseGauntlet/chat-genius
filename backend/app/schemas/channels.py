from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChannelBase(BaseModel):
    name: str
    type: str = "public"  # public or private
    is_default: bool = False

class ChannelCreate(ChannelBase):
    pass

class ChannelUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None

class ChannelResponse(ChannelBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 