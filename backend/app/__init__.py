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

    # Create tables + upload dir + seed on startup
    with app.app_context():
        os.makedirs("/app/static/uploads", exist_ok=True)
        os.makedirs("/app/data", exist_ok=True)
        db.create_all()
        _seed(db)

    # SPA fallback
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        static_folder = app.static_folder or "/app/static"
        if path and os.path.exists(os.path.join(static_folder, path)):
            return send_from_directory(static_folder, path)
        return send_from_directory(static_folder, "index.html")

    return app


def _seed(db):
    from app.models.project import Project
    if Project.query.count() > 0:
        return
    seeds = [
        Project(
            slug="cineniche",
            title="CineNiche",
            description="A secure movie streaming platform with custom ML models that recommend movies based on user preferences.",
            category="Full-Stack",
            date="2024-04-01",
            featured=True,
            goal="Build a streaming platform with personalized movie recommendations using machine learning.",
            results="Achieved 85% user satisfaction. Platform handles 500+ concurrent users with 40% higher engagement.",
            github_url="https://github.com/johnmgibson3/INTEX2_cineniche",
            role="Full-Stack Developer",
            timeline="4 months",
            team_size=4,
        ),
        Project(
            slug="turtle-shelter",
            title="Turtle Shelter Project",
            description="Charity management system for a sea turtle conservation org — volunteer scheduling, donation tracking, and automated email via AWS SES.",
            category="Full-Stack",
            date="2024-01-01",
            featured=True,
            goal="Replace spreadsheets and manual emails with a centralized web app for volunteers and donations.",
            results="Reduced admin overhead 60%. Volunteer coordination dropped from 10 hrs/week to 2. Tracks $50K+ in donations annually.",
            github_url="https://github.com/Team1-12/intex-2024",
            live_url="https://turtleshelterintex.dev",
            role="Lead Developer",
            timeline="3 months",
            team_size=5,
        ),
        Project(
            slug="mail-services",
            title="Mail Services Financial System",
            description="Enterprise financial management system for BYU's Print and Mail center — invoices, payments, budget tracking, and real-time reporting.",
            category="Full-Stack",
            date="2023-12-01",
            featured=False,
            goal="Replace legacy software with a modern app that handles financial workflows and integrates with university systems.",
            results="Transaction processing time reduced 70%. Data entry errors down 95%. Saves 20+ staff hours/month on reports.",
            role="Backend Developer",
            timeline="5 months",
            team_size=3,
        ),
    ]
    tech_map = {
        "cineniche": ["React", "TypeScript", ".NET", "Azure", "MySQL"],
        "turtle-shelter": ["JavaScript", "AWS", "MySQL"],
        "mail-services": ["TypeScript", "Angular", "Python", "Flask", "Oracle"],
    }
    for p in seeds:
        p.technologies = tech_map[p.slug]
    db.session.add_all(seeds)
    db.session.commit()
