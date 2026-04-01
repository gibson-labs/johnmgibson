import { Project, Experience } from "@/types/project";

// Filter options shown in FilterBar
export const CATEGORIES = ["Full-Stack", "AI/ML", "Frontend", "Backend", "Data"];

export const TECHNOLOGIES = [
  "React", "TypeScript", "Python", "Flask", "Node.js",
  "Angular", ".NET", "AWS", "Azure", "Docker",
  "MySQL", "PostgreSQL", "Oracle", "Machine Learning",
];

// Seed data — these get loaded into the DB on first run via /api/projects
// After that, the DB is the source of truth.
export const SEED_PROJECTS: Omit<Project, "id">[] = [
  {
    slug: "cineniche",
    title: "CineNiche",
    description: "A secure movie streaming platform with custom ML models that recommend movies based on user preferences.",
    thumbnail: undefined,
    gallery: [],
    category: "Full-Stack",
    technologies: ["React", "TypeScript", ".NET", "Azure", "MySQL"],
    date: "2024-04-01",
    featured: true,
    goal: "Build a streaming platform with personalized movie recommendations using machine learning.",
    results: "Achieved 85% user satisfaction with recommendations. Platform handles 500+ concurrent users with 40% higher engagement than comparable platforms.",
    githubUrl: "https://github.com/johnmgibson3/INTEX2_cineniche",
    role: "Full-Stack Developer",
    timeline: "4 months",
    teamSize: 4,
  },
  {
    slug: "turtle-shelter",
    title: "Turtle Shelter Project",
    description: "Charity management system for a sea turtle conservation org — volunteer scheduling, donation tracking, and automated email via AWS SES.",
    thumbnail: undefined,
    gallery: [],
    category: "Full-Stack",
    technologies: ["JavaScript", "AWS", "MySQL"],
    date: "2024-01-01",
    featured: true,
    goal: "Replace spreadsheets and manual emails with a centralized web app for volunteers and donations.",
    results: "Reduced admin overhead 60%. Volunteer coordination dropped from 10 hrs/week to 2. Tracks $50K+ in donations annually.",
    githubUrl: "https://github.com/Team1-12/intex-2024",
    liveUrl: "https://turtleshelterintex.dev",
    role: "Lead Developer",
    timeline: "3 months",
    teamSize: 5,
  },
  {
    slug: "mail-services",
    title: "Mail Services Financial System",
    description: "Enterprise financial management system for BYU's Print and Mail center — invoices, payments, budget tracking, and real-time reporting.",
    thumbnail: undefined,
    gallery: [],
    category: "Full-Stack",
    technologies: ["TypeScript", "Angular", "Python", "Flask", "Oracle"],
    date: "2023-12-01",
    featured: false,
    goal: "Replace legacy software with a modern app that handles financial workflows and integrates with university systems.",
    results: "Transaction processing time reduced 70%. Data entry errors down 95%. Saves 20+ staff hours/month on reports.",
    role: "Backend Developer",
    timeline: "5 months",
    teamSize: 3,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "AI Solutions Engineer Intern",
    company: "MasterControl",
    filterCompany: "MasterControl",
    period: "Nov 2025 – Present",
    description:
      "Architected an end-to-end OpenTelemetry pipeline on AWS (Lambda, Glue, Athena) to track LLM latency and token usage across internal AI platforms serving 800+ employees. Built TypeScript MCP servers enabling Claude Code and other clients to manage Open WebUI and LiteLLM resources, and engineered 15+ AWS CDK stacks with automated CI/CD via GitHub Actions.",
  },
  {
    id: 2,
    role: "Software Developer – Team Lead",
    company: "BYU Print and Mail Services",
    filterCompany: "BYU Print and Mail Services",
    period: "Jun 2024 – Nov 2025",
    description:
      "Rebuilt legacy Pascal billing systems into a modern Flask + Angular web app, saving $70K+ annually in labor costs. Automated shipment, refund, and billing processes across 12+ Oracle tables, cutting manual accounting work by 80%, and deployed containerized environments with Docker and GitHub Actions — reducing deployment time by 50%.",
  },
  {
    id: 3,
    role: "Application Test Engineer",
    company: "Office of Information Technology, BYU",
    filterCompany: "OIT",
    period: "Jun 2023 – Apr 2024",
    description:
      "Executed feature, integration, and acceptance tests for financial planning systems and built Python automation scripts to handle repetitive test cases. Detected and drove resolution of 200+ high-impact defects, reducing production incidents by 35%.",
  },
  {
    id: 4,
    role: "Project Manager",
    company: "Turf Sports (On-Campus Internship)",
    filterCompany: "Turf Sports",
    period: "Jan 2023 – May 2023",
    description:
      "Led UI development for an upcoming sports tournament app using TestFlight and Figma, and built a marketing plan to recruit 50+ new users. Managed a 40+ deliverable project plan in Trello and ran weekly planning sessions across a 5-person team to drive the app from concept to launch.",
  },
];
