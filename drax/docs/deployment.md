# DRAX Deployment Guide

## Prerequisites

- Linux VPS with cPanel
- Node.js 20+
- Python 3.10+
- Domain/subdomain configured

## Backend Deployment (Python App)

1. Upload `backend/` to the server
2. Create virtual environment:
   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configure `.env`:
   ```
   GEMINI_API_KEY=your_actual_key
   FLASK_ENV=production
   ```
4. In cPanel: Create Python App
   - App path: `/backend`
   - App startup file: `app.py`
   - App callable: `create_app`
   - App URL: `/api`

## Frontend Deployment (Node.js App)

1. Upload `frontend/` to the server
2. Create `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-domain.com/api
   ```
3. Build:
   ```
   cd frontend
   npm install
   npm run build
   ```
4. In cPanel: Create Node.js App
   - App path: `/frontend`
   - App startup file: `node_modules/.bin/next`
   - App arguments: `start`
   - App URL: `/`

## CSV Data

Place CSV files in `backend/data/`:
- `members.csv`
- `events.csv`
- `faq.csv`
- `programs.csv`

The system auto-loads CSVs on startup and watches for file changes.

## Environment Variables

### Backend (.env)
- `GEMINI_API_KEY` - Google Gemini API key
- `FLASK_ENV` - `development` or `production`

### Frontend (.env.production)
- `NEXT_PUBLIC_API_URL` - Backend URL (e.g. `https://your-domain.com/api`)

## Health Check

After deployment, verify:
- `GET /api/health` - Returns `{"status": "ok"}`
- Frontend loads at domain root
- `/drax` route shows the AI chat interface
