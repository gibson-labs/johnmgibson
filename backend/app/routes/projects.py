import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.project import Project
from PIL import Image

bp = Blueprint("projects", __name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route("/api/projects", methods=["GET"])
def get_projects():
    featured_only = request.args.get("featured") == "true"
    query = Project.query
    if featured_only:
        query = query.filter_by(featured=True)
    projects = query.order_by(Project.date.desc()).all()
    return jsonify([p.to_dict() for p in projects])


@bp.route("/api/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict())


@bp.route("/api/projects", methods=["POST"])
@jwt_required()
def create_project():
    data = request.get_json()
    project = Project(
        slug=data["slug"],
        title=data["title"],
        description=data["description"],
        thumbnail=data.get("thumbnail"),
        gallery=data.get("gallery", []),
        category=data["category"],
        technologies=data.get("technologies", []),
        date=data["date"],
        featured=data.get("featured", False),
        goal=data.get("goal"),
        results=data.get("results"),
        github_url=data.get("githubUrl"),
        live_url=data.get("liveUrl"),
        role=data.get("role"),
        timeline=data.get("timeline"),
        team_size=data.get("teamSize"),
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201


@bp.route("/api/projects/<int:project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    for field in ["slug", "title", "description", "thumbnail", "category", "date",
                  "featured", "goal", "results", "role", "timeline"]:
        if field in data:
            setattr(project, field, data[field])
    if "technologies" in data:
        project.technologies = data["technologies"]
    if "gallery" in data:
        project.gallery = data["gallery"]
    if "githubUrl" in data:
        project.github_url = data["githubUrl"]
    if "liveUrl" in data:
        project.live_url = data["liveUrl"]
    if "teamSize" in data:
        project.team_size = data["teamSize"]
    db.session.commit()
    return jsonify(project.to_dict())


@bp.route("/api/projects/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"deleted": project_id})


@bp.route("/api/projects/<int:project_id>/featured", methods=["PATCH"])
@jwt_required()
def toggle_featured(project_id):
    project = Project.query.get_or_404(project_id)
    project.featured = not project.featured
    db.session.commit()
    return jsonify(project.to_dict())


@bp.route("/api/projects/<int:project_id>/upload", methods=["POST"])
@jwt_required()
def upload_image(project_id):
    project = Project.query.get_or_404(project_id)

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if not file.filename or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    upload_dir = os.path.join(current_app.static_folder, "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, filename)

    img = Image.open(file)
    img.save(filepath, optimize=True, quality=85)

    url = f"/uploads/{filename}"
    field = request.form.get("field", "thumbnail")

    if field == "gallery":
        gallery = project.gallery
        gallery.append(url)
        project.gallery = gallery
    else:
        project.thumbnail = url

    db.session.commit()
    return jsonify({"url": url})
