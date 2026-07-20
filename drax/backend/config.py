import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    FLASK_ENV = os.getenv("FLASK_ENV", "production")
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    CSV_DIR = os.path.join(os.path.dirname(__file__), "data")
    CACHE_DIR = os.path.join(os.path.dirname(__file__), "cache")
    LOG_DIR = os.path.join(os.path.dirname(__file__), "logs")
    PROMPT_DIR = os.path.join(os.path.dirname(__file__), "prompts")
    MAX_CACHE_AGE = 300  # 5 minutes
