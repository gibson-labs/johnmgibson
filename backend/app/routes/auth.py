from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
import os

bp = Blueprint("auth", __name__)


@bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    password = data.get("password", "")
    admin_password = os.environ.get("ADMIN_PASSWORD", "")

    if not admin_password:
        return jsonify({"error": "Admin password not configured"}), 500

    if password != admin_password:
        return jsonify({"error": "Invalid password"}), 401

    token = create_access_token(identity="admin")
    return jsonify({"token": token})


@bp.route("/api/auth/verify", methods=["GET"])
@jwt_required()
def verify():
    return jsonify({"valid": True})
