from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()


def create_app():
    app = Flask(__name__, static_folder="/app/static", static_url_path="")
    CORS(app)

    # Config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", "sqlite:////app/data/portfolio.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "change-me-in-prod")

    # Extensions
    from app.extensions import db, jwt
    db.init_app(app)
    jwt.init_app(app)

    # Blueprints
    from app.routes import main
    from app.routes import projects, auth
    app.register_blueprint(main.bp)
    app.register_blueprint(projects.bp)
    app.register_blueprint(auth.bp)

    # Create tables + upload dir on startup
    with app.app_context():
        os.makedirs("/app/static/uploads", exist_ok=True)
        os.makedirs("/app/data", exist_ok=True)
        db.create_all()

    # SPA fallback
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        static_folder = app.static_folder or "/app/static"
        if path and os.path.exists(os.path.join(static_folder, path)):
            return send_from_directory(static_folder, path)
        return send_from_directory(static_folder, "index.html")

    return app
