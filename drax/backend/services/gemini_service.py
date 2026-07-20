import os
import logging
from typing import Optional
from google import genai
from config import Config

logger = logging.getLogger(__name__)


class GeminiService:
    _instance = None
    _system_prompt: Optional[str] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self._load_system_prompt()

        api_key = Config.GEMINI_API_KEY
        if not api_key or api_key == "your_gemini_api_key_here":
            logger.warning("Gemini API key not configured")
            self.client = None
        else:
            self.client = genai.Client(api_key=api_key)

    def _load_system_prompt(self):
        prompt_path = os.path.join(Config.PROMPT_DIR, "system_prompt.txt")
        if os.path.exists(prompt_path):
            with open(prompt_path, "r", encoding="utf-8") as f:
                self._system_prompt = f.read().strip()
        else:
            self._system_prompt = ""

    def generate_response(self, user_message: str, context: str = "") -> str:
        if not self.client:
            return (
                "Maaf, layanan AI sedang tidak tersedia. "
                "Silakan coba lagi nanti."
            )

        try:
            parts = []
            if self._system_prompt:
                parts.append(self._system_prompt)

            if context:
                parts.append(
                    f"Berikut adalah data relevan dari database ARDRAXIS:\n\n{context}"
                )

            parts.append(f"Pertanyaan pengguna: {user_message}")

            full_prompt = "\n\n".join(parts)

            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=full_prompt,
            )

            return response.text.strip() if response.text else "Maaf, tidak dapat menghasilkan jawaban."

        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}", exc_info=True)
            return "Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi."
