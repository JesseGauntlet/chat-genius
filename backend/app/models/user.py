from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from datetime import datetime
from .base import Base, TimestampMixin

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    status = Column(String, default="offline")
    last_active = Column(
        DateTime(timezone=True), 
        nullable=False,
        server_default=func.now(),
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<User {self.email}>" 