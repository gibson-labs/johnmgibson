const BASE = "/api";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

export const api = {
  // Projects
  getProjects: (featured?: boolean) =>
    request<import("@/types/project").Project[]>(
      `/projects${featured ? "?featured=true" : ""}`
    ),

  createProject: (data: Partial<import("@/types/project").Project>) =>
    request<import("@/types/project").Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateProject: (id: number, data: Partial<import("@/types/project").Project>) =>
    request<import("@/types/project").Project>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteProject: (id: number) =>
    request<{ deleted: number }>(`/projects/${id}`, { method: "DELETE" }),

  toggleFeatured: (id: number) =>
    request<import("@/types/project").Project>(`/projects/${id}/featured`, {
      method: "PATCH",
    }),

  uploadImage: async (id: number, file: File, field: "thumbnail" | "gallery" = "thumbnail") => {
    const form = new FormData();
    form.append("file", file);
    form.append("field", field);
    const res = await fetch(`${BASE}/projects/${id}/upload`, {
      method: "POST",
      headers: authHeaders(),
      body: form,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json() as Promise<{ url: string }>;
  },

  // Auth
  login: (password: string) =>
    request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  verify: () => request<{ valid: boolean }>("/auth/verify"),
};
