from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="")

# ---- Your API routes (keep under /api to avoid SPA catch-all) ----
# @app.route("/api/hello")
# def hello(): return {"ok": True}

# ---- React static + SPA fallback ----
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    try:
        return send_from_directory(app.static_folder, path)
    except Exception:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
