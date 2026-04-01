import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { Project } from "@/types/project";
import { CATEGORIES, TECHNOLOGIES } from "@/lib/portfolioData";
import { Star, StarOff, Pencil, Trash2, Plus, X, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(password);
      localStorage.setItem("admin_token", token);
      onLogin();
    } catch {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-foreground mb-2">Admin</h1>
        <p className="text-muted-foreground text-sm mb-6">Enter your password to continue.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Checking…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Project Form ─────────────────────────────────────────────────────────────

const EMPTY: Partial<Project> = {
  slug: "", title: "", description: "", category: CATEGORIES[0],
  technologies: [], date: "", featured: false,
  goal: "", results: "", githubUrl: "", liveUrl: "",
  role: "", timeline: "", teamSize: undefined,
};

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Project;
  onSave: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Project>>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  const set = (k: keyof Project, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies?.includes(t)) {
      set("technologies", [...(form.technologies ?? []), t]);
    }
    setTechInput("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
          <input required value={form.title ?? ""} onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Slug *</label>
          <input required value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Description *</label>
        <textarea required rows={2} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Category *</label>
          <select required value={form.category ?? ""} onChange={(e) => set("category", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Date *</label>
          <input type="date" required value={form.date ?? ""} onChange={(e) => set("date", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
            <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 accent-primary" />
            Featured on homepage
          </label>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Technologies</label>
        <div className="flex gap-2 mb-2">
          <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
            placeholder="Type tech then Enter or use presets below"
            className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <Button type="button" variant="outline" size="sm" onClick={addTech}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {TECHNOLOGIES.map((t) => (
            <button key={t} type="button"
              onClick={() => { if (!form.technologies?.includes(t)) set("technologies", [...(form.technologies ?? []), t]); }}
              className={`px-2 py-0.5 rounded-full text-xs border transition-colors ${form.technologies?.includes(t) ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border hover:border-primary/30"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(form.technologies ?? []).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
              {t}
              <button type="button" onClick={() => set("technologies", form.technologies?.filter((x) => x !== t))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Goal</label>
          <textarea rows={3} value={form.goal ?? ""} onChange={(e) => set("goal", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Results</label>
          <textarea rows={3} value={form.results ?? ""} onChange={(e) => set("results", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">GitHub URL</label>
          <input value={form.githubUrl ?? ""} onChange={(e) => set("githubUrl", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Live URL</label>
          <input value={form.liveUrl ?? ""} onChange={(e) => set("liveUrl", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Role</label>
          <input value={form.role ?? ""} onChange={(e) => set("role", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Timeline</label>
          <input value={form.timeline ?? ""} onChange={(e) => set("timeline", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Team Size</label>
          <input type="number" min={1} value={form.teamSize ?? ""} onChange={(e) => set("teamSize", Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Project"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

// ── Image Upload ──────────────────────────────────────────────────────────────

function ImageUpload({ project, onDone }: { project: Project; onDone: (p: Project) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(project.id, file, field);
      const updated = field === "thumbnail"
        ? { ...project, thumbnail: url }
        : { ...project, gallery: [...(project.gallery ?? []), url] };
      onDone(updated as Project);
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-primary hover:text-primary/80 transition-colors">
        <Upload className="w-3.5 h-3.5" />
        {uploading ? "Uploading…" : "Set Thumbnail"}
        <input ref={ref} type="file" accept="image/*" className="sr-only"
          onChange={(e) => upload(e, "thumbnail")} disabled={uploading} />
      </label>
      <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors">
        <Upload className="w-3.5 h-3.5" />
        Add to Gallery
        <input type="file" accept="image/*" className="sr-only"
          onChange={(e) => upload(e, "gallery")} disabled={uploading} />
      </label>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => api.getProjects().then(setProjects);
  useEffect(() => { load(); }, []);

  const handleToggleFeatured = async (p: Project) => {
    const updated = await api.toggleFeatured(p.id);
    setProjects((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  };

  const handleDelete = async (id: number) => {
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const handleSaveNew = async (data: Partial<Project>) => {
    const created = await api.createProject(data);
    setProjects((prev) => [created, ...prev]);
    setAdding(false);
  };

  const handleSaveEdit = async (data: Partial<Project>) => {
    if (!editing) return;
    const updated = await api.updateProject(editing.id, data);
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Project Admin</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => setAdding(true)} className="gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Add form */}
        {adding && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">New Project</h2>
            <ProjectForm onSave={handleSaveNew} onCancel={() => setAdding(false)} />
          </div>
        )}

        {/* Edit form */}
        {editing && (
          <div className="bg-card border border-primary/30 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Edit: {editing.title}</h2>
            <ProjectForm initial={editing} onSave={handleSaveEdit} onCancel={() => setEditing(null)} />
          </div>
        )}

        {/* Projects list */}
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
              {/* Thumbnail */}
              <div className="w-full sm:w-24 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                {p.thumbnail
                  ? <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary/20">{p.title.charAt(0)}</div>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <span className="font-semibold text-foreground truncate">{p.title}</span>
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{p.category}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{p.description}</p>
                <ImageUpload project={p} onDone={(updated) => setProjects((prev) => prev.map((x) => x.id === updated.id ? updated : x))} />
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleFeatured(p)}
                  title={p.featured ? "Remove from featured" : "Mark as featured"}
                  className={`p-2 rounded-lg transition-colors ${p.featured ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {p.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditing(p)}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteId(p.id)}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete confirm */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="text-lg font-semibold mb-2">Delete project?</h3>
              <p className="text-muted-foreground text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <Button variant="destructive" onClick={() => handleDelete(deleteId)}>Delete</Button>
                <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { setChecking(false); return; }
    api.verify()
      .then(() => setAuthed(true))
      .catch(() => localStorage.removeItem("admin_token"))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return authed ? <Dashboard /> : <LoginForm onLogin={() => setAuthed(true)} />;
}
