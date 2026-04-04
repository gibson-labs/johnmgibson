from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()


STATIC_FOLDER = "/app/static"


def create_app():
    app = Flask(__name__)
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
        os.makedirs(os.path.join(STATIC_FOLDER, "uploads"), exist_ok=True)
        os.makedirs("/app/data", exist_ok=True)
        db.create_all()
        _seed(db)

    # Security headers
    @app.after_request
    def set_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        return response

    # SPA fallback
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        if path and os.path.isfile(os.path.join(STATIC_FOLDER, path)):
            return send_from_directory(STATIC_FOLDER, path)
        return send_from_directory(STATIC_FOLDER, "index.html")

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
            title="BYU Print & Mail Financial System",
            description="Rebuilt legacy Pascal billing systems into a modern Flask + Angular web app for BYU's Print and Mail Services, automating financial workflows across 12+ Oracle tables.",
            category="Full-Stack",
            date="2024-06-01",
            featured=False,
            goal="Replace legacy Pascal billing software with a modern web app that automates financial workflows and integrates with university Oracle databases.",
            results="Saved $70K+ annually in labor costs. Cut manual accounting work by 80%, increased financial data transfer speed by 60%, and reduced deployment time by 50% with Docker + GitHub Actions CI/CD.",
            role="Software Developer – Team Lead",
            timeline="17 months",
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
