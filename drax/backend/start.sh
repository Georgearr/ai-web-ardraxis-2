#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate 2>/dev/null || true
pip install -r requirements.txt -q
gunicorn -w 4 -b 0.0.0.0:5000 app:create_app
