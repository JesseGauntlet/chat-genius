# SDD (Software Design Document)

## System Architecture

- Frontend: React-based SPA (Single Page Application)
- Backend: Python with FastAPI for API handling
- Database: PostgreSQL for structured data (users, messages, channels) and Redis for real-time features (pub/sub, caching)
- Real-time Communication: WebSocket for live messaging and status updates
- Storage: AWS S3 for file storage

## Functional Specifications

### Authentication
- JWT-based session tokens with refresh token support
- OAuth integration for Google/Microsoft SSO

### Real-time Messaging
- WebSocket server managing room-based messaging
- Message persistence in PostgreSQL

### Channel/DM Organization
- Channels table with public/private flags and membership tracking

### File Sharing & Search
- Uploaded files stored on S3 with metadata in PostgreSQL
- ElasticSearch for full-text indexing of messages and file metadata

### User Presence & Status
- User presence tracked in Redis
- Status updates persisted in PostgreSQL for retrieval

### Thread Support
- Threads as linked messages with parent/child relationship in the database

### Emoji Reactions
- Emoji reactions stored as metadata on messages with aggregation support

## API Design

- POST /auth/login: Authenticate user and issue tokens
- GET /channels: Fetch channels user has access to
- POST /messages: Send a new message
- GET /messages/:channelId: Fetch recent messages in a channel
- POST /files/upload: Upload a file
- GET /users/status: Fetch user presence and statuses

## Testing Plan

### Unit Tests
- For authentication, message parsing, and reaction aggregation

### Integration Tests
- Ensure seamless real-time communication

### Performance Tests
- Benchmark WebSocket connections and message delivery times