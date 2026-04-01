export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  gallery?: string[];
  category: string;
  technologies: string[];
  date: string; // ISO "2024-03-01"
  featured: boolean;
  goal?: string;
  results?: string;
  githubUrl?: string;
  liveUrl?: string;
  role?: string;
  timeline?: string;
  teamSize?: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  filterCompany: string;
  period: string;
  description: string;
}
