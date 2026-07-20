from flask import Blueprint, jsonify
from services.csv_service import CSVService

events_bp = Blueprint("events", __name__)
csv_service = CSVService()


@events_bp.route("/events", methods=["GET"])
def get_events():
    try:
        events = csv_service.get_events()
        return jsonify({"data": events, "count": len(events)})
    except Exception as e:
        return jsonify({"error": "Failed to load events"}), 500
