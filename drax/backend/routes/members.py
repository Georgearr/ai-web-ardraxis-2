from flask import Blueprint, jsonify
from services.csv_service import CSVService

members_bp = Blueprint("members", __name__)
csv_service = CSVService()


@members_bp.route("/members", methods=["GET"])
def get_members():
    try:
        members = csv_service.get_members()
        return jsonify({"data": members, "count": len(members)})
    except Exception as e:
        return jsonify({"error": "Failed to load members"}), 500
