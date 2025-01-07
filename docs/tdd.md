# TDD (Technical Design Document)

## System Architecture

The system will follow a microservices-based architecture:

### Authentication Service
- Implements OAuth, JWT, and MFA

### Messaging Service
- Manages WebSocket connections and room subscriptions
- Publishes messages to Redis channels for distribution

### File Service
- Handles file uploads and metadata storage

### Search Service
- Syncs data from PostgreSQL to ElasticSearch
- Provides APIs for querying messages and files

### Notification Service
- Pushes real-time updates (e.g., message notifications, user presence) to clients

## Database Schema

### Users Table
- id, email, passwordHash, status, lastActive

### Channels Table
- id, name, type, createdBy

### Messages Table
- id, channelId, userId, content, timestamp, threadParentId

### Files Table
- id, messageId, url, metadata

## Key Algorithms

### Message Delivery
- Use a Redis pub/sub system to deliver messages to active WebSocket connections

### Search Indexing
- Incremental sync from PostgreSQL to ElasticSearch via change-data-capture (CDC) techniques

### Presence Tracking
- Maintain a hash map in Redis with user IDs and presence status

### Emoji Reaction Updates
- Efficient aggregation using Redis counters

## Technology Stack

- Frontend: React + Redux, TailwindCSS for styling
- Backend: Python with FastAPI, Redis, PostgreSQL, ElasticSearch
- DevOps: Docker, Kubernetes for container orchestration, CI/CD pipeline using GitHub Actions