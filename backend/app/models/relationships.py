from sqlalchemy.orm import relationship
from .user import User
from .channel import Channel
from .message import Message

# Add relationships to User
User.messages = relationship("Message", back_populates="user")
User.channels = relationship("Channel", back_populates="creator")

# Add relationships to Channel
Channel.messages = relationship("Message", back_populates="channel")
Channel.creator = relationship("User", back_populates="channels")

# Add relationships to Message
Message.channel = relationship("Channel", back_populates="messages")
Message.user = relationship("User", back_populates="messages") 