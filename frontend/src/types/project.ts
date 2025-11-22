export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  outcome: string;
  image?: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  role: string;
  timeline: string;
  teamSize: number;
}
