import { Project, Experience } from "@/types/project";
import CineNiche from "@/assets/images/CineNiche.jpeg";
import TurtleShelter from "@/assets/images/TurtleShelter.png";
import N8nServer from "@/assets/images/n8n_server.jpeg";
import N8nDiscord from "@/assets/images/n8n_discord.jpeg";

export const CATEGORIES = ["Full-Stack", "AI/ML", "Frontend", "Backend", "Data"];

export const TECHNOLOGIES = [
  "React", "TypeScript", "Python", "Flask", "Node.js",
  "Angular", ".NET", "AWS", "Azure", "Docker",
  "MySQL", "PostgreSQL", "Oracle", "Machine Learning",
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "CineNiche - Movie Streaming Platform",
    description: "A secure movie streaming platform build with custom machine learning models to recommend movies to users. It was built with React, .NET, and MySQL",
    thumbnail: CineNiche,
    gallery: [],
    category: "Full-Stack",
    technologies: ["React", "TypeScript", ".NET", "Azure ML", "MySQL"],
    date: "2024-04-01",
    goal: "Build a secure movie streaming platform with a custom ML recommendation engine that analyzes viewing patterns and preferences to deliver accurate movie suggestions.",
    results: "Built and deployed a full-stack React, .NET, and MySQL platform with user authentication and recommendation capabilities. Implemented a custom Azure ML model trained on 50,000+ movies that uses collaborative filtering and content-based recommendations. The architecture is designed to handle concurrent streaming for 500+ users with minimal latency.",
    githubUrl: "https://github.com/johnmgibson3/INTEX2_cineniche",
    role: "Full-Stack Developer",
    timeline: "4 months",
    teamSize: 4,
  },
  {
    id: 2,
    title: "Turtle Shelter Project - Charity Management System",
    description: "A website that allows a charity to manage their donations and volunteers. Features a fully functional admin dashboard and custom email system. It was built with JavaScript and deployed to AWS",
    thumbnail: TurtleShelter,
    gallery: [],
    category: "Full-Stack",
    technologies: ["JavaScript", "AWS", "Amazon RDS", "Amazon Beanstalk"],
    date: "2024-01-01",
    goal: "Build a centralized platform for charities to manage volunteer schedules, track donations, and automate communications without spreadsheets.",
    results: "Developed and deployed a full-stack web application with admin and public-facing portals. Implemented automated email notifications using AWS SES for volunteer schedules and donation receipts. Built a real-time analytics dashboard showing volunteer hours and donation tracking. Deployed to AWS with Elastic Beanstalk for auto-scaling and RDS for reliability. Designed to support 150+ volunteers and 200+ annual donations with automated receipt generation.",
    githubUrl: "https://github.com/Team1-12/intex-2024",
    liveUrl: "https://turtleshelterintex.dev",
    role: "Lead Developer",
    timeline: "3 months",
    teamSize: 5,
  },
  {
    id: 4,
    title: "AI-Powered HomeLab Monitor",
    description: "An autonomous monitoring system built with n8n that watches my self-hosted server, diagnoses issues, and routes fixes through a human-in-the-loop approval flow on Discord.",
    thumbnail: N8nServer,
    gallery: [N8nDiscord],
    category: "AI/ML",
    technologies: ["n8n", "Docker", "Discord API", "AI Agents"],
    date: "2026-03-01",
    goal: "Running a self-hosted server means constantly context-switching to check if containers are up, debug crashes, and keep track of what's actually running. I wanted something that would handle routine diagnostics automatically — without ever making a system change I hadn't approved.",
    results: "The system now monitors all running websites and Docker containers on a schedule, automatically diagnoses failures, and generates weekly service inventory reports. When a fix requires executing commands, the agent messages me on Discord with a summary of what it plans to do and waits for approval before acting — giving me the benefits of automation without losing control.",
    role: "Solo Engineer",
    timeline: "2 weeks",
  },
  {
    id: 3,
    title: "Mail Services Financial System",
    description: "A financial system that allows BYU's Print and Mail center to manage their finances transactions. It was built with TypeScript, Angular, Python Flask, and Oracle Database",
    thumbnail: undefined,
    gallery: [],
    category: "Full-Stack",
    technologies: ["TypeScript", "Angular", "Python Flask", "Oracle Database"],
    date: "2023-12-01",
    goal: "The Print and Mail center was using legacy software that couldn't handle complex financial workflows or provide real-time reporting. Manual data entry led to errors and inefficiencies. They needed a modern solution that could integrate with university systems while providing detailed financial analytics.",
    results: "Built a modern web application using Angular for the frontend and Python Flask for the backend API. Designed a robust Oracle database schema to handle complex financial relationships and ensure data integrity. Implemented role-based access control for different user types (administrators, accountants, and department managers). Created automated report generation and data visualization dashboards. Processing time for financial transactions reduced by 70%. Manual data entry errors decreased by 95%. Generated automated monthly reports saving 20+ hours of staff time. The system now processes over 10,000 transactions annually and provides real-time visibility into departmental budgets.",
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
