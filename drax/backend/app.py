import os
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.chat import chat_bp
from routes.health import health_bp
from routes.members import members_bp
from routes.events import events_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Ensure directories exist
    os.makedirs(Config.CSV_DIR, exist_ok=True)
    os.makedirs(Config.CACHE_DIR, exist_ok=True)
    os.makedirs(Config.LOG_DIR, exist_ok=True)
    os.makedirs(Config.PROMPT_DIR, exist_ok=True)

    # Logging
    handler = RotatingFileHandler(
        os.path.join(Config.LOG_DIR, "app.log"), maxBytes=10485760, backupCount=5
    )
    handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO if not Config.DEBUG else logging.DEBUG)

    # Register blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(members_bp)
    app.register_blueprint(events_bp)

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=Config.DEBUG)
