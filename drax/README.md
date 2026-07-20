# DRAX - Digital Resource Assistant of ARDRAXIS

AI-powered assistant that helps users obtain official information about ARDRAXIS, the OSIS SMA Ignatius Global School cabinet for the 2025/2026 period.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS v4
- **Backend**: Python Flask, Gunicorn
- **AI**: Google Gemini API
- **Data**: CSV Database with file-watch caching

## Project Structure

```
drax/
├── frontend/         # Next.js 15 application
│   ├── src/
│   │   ├── app/      # Pages (/, /drax)
│   │   ├── components/  # Reusable UI components
│   │   └── lib/      # API client, utilities
│   └── public/       # Static assets
├── backend/          # Flask API
│   ├── routes/       # API endpoints
│   ├── services/     # CSV service, Gemini service
│   ├── data/         # CSV database files
│   ├── prompts/      # System prompt
│   └── logs/         # Application logs
├── docs/             # Architecture & deployment docs
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_key_here" > .env
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000/drax`

## Design

DRAX uses the exact same visual language as the ARDRAXIS homepage. Every component - colors, typography, spacing, animations, glass cards, buttons, and layout patterns - is reused from the official ARDRAXIS website.

## Routes

| Route | Description |
|-------|-------------|
| `/drax` | AI Chat page |
| `GET /health` | Backend health check |
| `POST /chat` | Send message to AI |
| `GET /members` | Get OSIS members |
| `GET /events` | Get events |

## Branding

- **Title**: DRAX
- **Subtitle**: Digital Resource Assistant of ARDRAXIS
- **Tagline**: Empowering Information, Igniting Innovation.
