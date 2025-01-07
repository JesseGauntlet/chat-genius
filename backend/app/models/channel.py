from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from .base import Base, TimestampMixin

class Channel(Base, TimestampMixin):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, default="public")
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_default = Column(Boolean, default=False) 