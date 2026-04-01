from app.extensions import db
import json


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    title = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=False)
    thumbnail = db.Column(db.String(500))
    _gallery = db.Column("gallery", db.Text, default="[]")
    category = db.Column(db.String(100), nullable=False)
    _technologies = db.Column("technologies", db.Text, default="[]")
    date = db.Column(db.String(20), nullable=False)  # ISO "2024-03-01"
    featured = db.Column(db.Boolean, default=False, nullable=False)
    goal = db.Column(db.Text)
    results = db.Column(db.Text)
    github_url = db.Column(db.String(500))
    live_url = db.Column(db.String(500))
    role = db.Column(db.String(200))
    timeline = db.Column(db.String(100))
    team_size = db.Column(db.Integer)

    @property
    def gallery(self):
        return json.loads(self._gallery or "[]")

    @gallery.setter
    def gallery(self, value):
        self._gallery = json.dumps(value or [])

    @property
    def technologies(self):
        return json.loads(self._technologies or "[]")

    @technologies.setter
    def technologies(self, value):
        self._technologies = json.dumps(value or [])

    def to_dict(self):
        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "gallery": self.gallery,
            "category": self.category,
            "technologies": self.technologies,
            "date": self.date,
            "featured": self.featured,
            "goal": self.goal,
            "results": self.results,
            "githubUrl": self.github_url,
            "liveUrl": self.live_url,
            "role": self.role,
            "timeline": self.timeline,
            "teamSize": self.team_size,
        }
