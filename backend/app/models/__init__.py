from .base import Base
from .user import User
from .channel import Channel
from .message import Message
from . import relationships  # This will set up all relationships

__all__ = ['Base', 'User', 'Channel', 'Message']
