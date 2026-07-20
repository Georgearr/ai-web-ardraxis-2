# DRAX Architecture

## Overview

DRAX (Digital Resource Assistant of ARDRAXIS) is an AI-powered assistant for obtaining official information about ARDRAXIS, the OSIS SMA Ignatius Global School cabinet for the 2025/2026 period.

## System Architecture

```
Browser
   │
   ▼
Next.js Frontend (Port 3000)
   │
   ├── /drax - Main AI Chat Page
   │
   ▼
REST API (HTTP)
   │
   ▼
Flask Backend (Port 5000)
   │
   ├── /health - Health Check
   ├── /chat  - AI Chat Endpoint
   ├── /members - Members Data
   └── /events - Events Data
   │
   ▼
CSV Database + Google Gemini API
```

## Frontend (Next.js 15)

- Route: `/drax`
- Styling: TailwindCSS v4 with ARDRAXIS design tokens
- Components: Header (matches ARDRAXIS navbar), Footer, Chat, TypingIndicator, etc.
- All visual elements reused from homepage-ardraxis/

## Backend (Flask)

- Blueprint-based routing
- Singleton CSV service with file-watch caching (via watchdog)
- Singleton Gemini service with dynamic system prompt loading
- Keyword-based semantic search for relevant CSV data
- Rotating file logging

## Data Flow

1. User sends question
2. Frontend POSTs to /chat
3. Backend loads CSVs (cached), runs keyword search
4. Relevant data + system prompt sent to Gemini
5. Gemini response returned to frontend
6. Frontend renders with Markdown support

## Deployment

- Frontend: Node.js Application (cPanel)
- Backend: Python Application (cPanel) via Gunicorn
- Environment variables in .env files
