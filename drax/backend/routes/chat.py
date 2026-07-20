import time
import logging
from datetime import datetime
from flask import Blueprint, request, jsonify
from services.csv_service import CSVService
from services.gemini_service import GeminiService

chat_bp = Blueprint("chat", __name__)
logger = logging.getLogger(__name__)

csv_service = CSVService()
gemini_service = GeminiService()

KEYWORD_MAP = {
    "website": "Multimedia Website",
    "it": "Information Technology",
    "programming": "Information Technology",
    "instagram": "Humas dan Publikasi",
    "social media": "Humas dan Publikasi",
    "humas": "Humas dan Publikasi",
    "publikasi": "Humas dan Publikasi",
    "lighting": "Multimedia Onfield",
    "multimedia": "Multimedia Onfield",
    "feedback": "Governance",
    "governance": "Governance",
    "video": "Video Editor",
    "editor": "Video Editor",
    "script": "Producer",
    "producer": "Producer",
    "design": "Graphic Designer",
    "graphic": "Graphic Designer",
    "event": "Event Organizer",
    "organizer": "Event Organizer",
    "sponsor": "Sponsorship",
    "fundraising": "Sponsorship",
    "documentation": "Documentation",
    "doc": "Documentation",
}


def keyword_search(query: str, records: list) -> list:
    query_lower = query.lower()
    relevant = []
    for record in records:
        record_str = " ".join(str(v).lower() for v in record.values())
        score = 0
        for keyword, sekbid in KEYWORD_MAP.items():
            if keyword in query_lower or keyword in record_str:
                if sekbid.lower() in record_str:
                    score += 3
                score += 1
            if sekbid.lower() in query_lower and sekbid.lower() in record_str:
                score += 5
        if score > 0:
            relevant.append((score, record))
    relevant.sort(key=lambda x: x[0], reverse=True)
    return [r for _, r in relevant[:10]]


@chat_bp.route("/chat", methods=["POST"])
def chat():
    start_time = time.time()
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Message is required"}), 400

    user_message = data["message"].strip()
    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    try:
        # Load CSV data
        members = csv_service.get_members()
        events = csv_service.get_events()
        faq = csv_service.get_faq()
        programs = csv_service.get_programs()

        # Keyword search for relevant context
        relevant_members = keyword_search(user_message, members)
        relevant_events = keyword_search(user_message, events)
        relevant_faq = keyword_search(user_message, faq)
        relevant_programs = keyword_search(user_message, programs)

        # Build context
        context_parts = []
        if relevant_faq:
            context_parts.append("=== FAQ ===")
            for item in relevant_faq[:3]:
                context_parts.append(
                    f"Q: {item.get('pertanyaan', '')}\nA: {item.get('jawaban', '')}"
                )
        if relevant_members:
            context_parts.append("=== MEMBERS ===")
            for m in relevant_members[:3]:
                context_parts.append(
                    f"{m.get('nama_panggilan', '')} ({m.get('nama_lengkap', '')}) - {m.get('jabatan', '')} - {m.get('sekbid', '')}"
                )
        if relevant_programs:
            context_parts.append("=== PROGRAMS ===")
            for p in relevant_programs[:3]:
                context_parts.append(
                    f"{p.get('nama_program', '')} ({p.get('sekbid', '')}): {p.get('deskripsi', '')}"
                )
        if relevant_events:
            context_parts.append("=== EVENTS ===")
            for e in relevant_events[:3]:
                context_parts.append(
                    f"{e.get('nama_event', '')} - {e.get('tanggal', '')}"
                )

        context = "\n\n".join(context_parts) if context_parts else ""

        # Get AI response
        response = gemini_service.generate_response(user_message, context)
        elapsed = time.time() - start_time

        logger.info(
            f"Question: {user_message[:100]} | Time: {elapsed:.2f}s | Context: {len(context_parts)} sources"
        )

        return jsonify({
            "response": response,
            "sources_used": len(context_parts),
            "processing_time": round(elapsed, 2),
        })

    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to process request"}), 500
