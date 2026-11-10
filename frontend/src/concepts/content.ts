// Shared copy for the design concepts. Facts come from John_Gibson_Resume.pdf and
// lib/portfolioData.ts — every concept renders the same story so only design varies.
import portrait from "@/assets/images/portrait.jpeg";
import n8nServer from "@/assets/images/n8n_server.jpeg";
import n8nDiscord from "@/assets/images/n8n_discord.jpeg";
import cineniche from "@/assets/images/optimized/cineniche.webp";
import turtleShelter from "@/assets/images/optimized/turtleshelter.webp";
import shipments1 from "@/assets/images/optimized/shipments1.webp";
import shipments2 from "@/assets/images/optimized/shipments2.webp";
import shipments3 from "@/assets/images/optimized/shipments3.webp";
import shipments4 from "@/assets/images/optimized/shipments4.webp";
import shipments5 from "@/assets/images/optimized/shipments5.webp";

export const PROFILE = {
  name: "John Gibson",
  portrait,
  positioning: "Cloud engineer building AI platform infrastructure at MasterControl.",
  statement:
    "I build the infrastructure that makes AI usable inside a company — the gateways, telemetry, and tools that let teams and agents get real work done.",
  bio: [
    "Right now I work on the internal AI platform at MasterControl: routing LLM traffic through a resilient gateway, instrumenting it end to end with OpenTelemetry, and building MCP servers so tools like Claude Code can manage the platform directly.",
    "Before that I led development at BYU Print & Mail Services, replacing a legacy Pascal billing system with a modern Flask and Angular app. The work I like best sits between the business problem and the infrastructure underneath it.",
  ],
  offClock:
    "Off the clock: mountain biking, scuba diving, and running a homelab that asks my permission on Discord before it fixes itself.",
  location: "Utah",
  timezone: "America/Denver",
  email: "johnmgibson3@gmail.com",
  github: "https://github.com/johnmgibson3",
  githubHandle: "johnmgibson3",
  linkedin: "https://www.linkedin.com/in/johnmgibson3/",
  resume: "/John_Gibson_Resume.pdf",
};

export type TimelineKind = "work" | "education";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  period: string;
  year: string;
  role: string;
  org: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: "mastercontrol",
    kind: "work",
    period: "Nov 2025 — Present",
    year: "2025",
    role: "Cloud Engineer · Full-time",
    org: "MasterControl",
    location: "Cottonwood Heights, UT",
    summary: "Platform engineering for the internal AI stack used by 400+ employees.",
    bullets: [
      "Architected an OpenTelemetry pipeline on Lambda, Glue, and Athena that tracks LLM latency, token usage, and fallback behavior.",
      "Built TypeScript MCP servers that let Claude Code manage Open WebUI and LiteLLM — users, models, prompts, tools, and settings.",
      "Configured LiteLLM as the enterprise AI gateway: 20+ models, fallback chains, wildcard routing, and Tika + Tesseract OCR for PDFs.",
      "Shipped 15+ AWS CDK stacks with GitHub Actions CI/CD, OIDC auth, and change detection.",
    ],
    stack: ["TypeScript", "AWS CDK", "Lambda", "OpenTelemetry", "MCP", "LiteLLM"],
    current: true,
  },
  {
    id: "byu",
    kind: "education",
    period: "Aug 2021 — Dec 2025",
    year: "2025",
    role: "B.S. Information Systems",
    org: "Brigham Young University",
    location: "Marriott School of Business",
    summary:
      "Software Development emphasis. Coursework in AI & agentic systems, security, SQL, and software startups.",
    bullets: [],
    stack: [],
  },
  {
    id: "print-mail",
    kind: "work",
    period: "Jun 2024 — Nov 2025",
    year: "2024",
    role: "Software Developer — Team Lead",
    org: "BYU Print & Mail Services",
    location: "Provo, UT",
    summary: "Led development of the billing and shipment tools behind a university operations team.",
    bullets: [
      "Rebuilt a legacy Pascal billing system as a Flask + Angular web app, saving $70K+ a year in labor.",
      "Automated shipment, refund, and billing workflows across 12+ Oracle tables, cutting manual accounting work by 80%.",
      "Containerized deployments with Docker and GitHub Actions, cutting deploy time in half.",
    ],
    stack: ["Python", "Flask", "Angular", "Oracle", "SQLAlchemy", "Docker"],
  },
  {
    id: "oit",
    kind: "work",
    period: "Jun 2023 — Apr 2024",
    year: "2023",
    role: "Application Test Engineer",
    org: "BYU Office of Information Technology",
    location: "Provo, UT",
    summary: "Quality engineering for the university's financial planning systems.",
    bullets: [
      "Ran feature, integration, and acceptance testing, and wrote Python scripts to automate repetitive cases.",
      "Found and drove resolution of 200+ high-impact defects, reducing production incidents by 35%.",
    ],
    stack: ["Python", "Test automation"],
  },
];

export interface ConceptProject {
  slug: string;
  title: string;
  kind: string;
  context: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  image?: string;
  gallery?: string[];
  diagram?: boolean;
  note?: string;
  links?: { label: string; href: string }[];
}

export const PROJECTS: ConceptProject[] = [
  {
    slug: "ai-gateway",
    title: "Enterprise LLM Gateway & Telemetry",
    kind: "Professional",
    context: "MasterControl",
    year: "2025—26",
    role: "Cloud Engineer",
    summary: "One resilient front door for every model, with telemetry on every request.",
    problem:
      "Internal AI tools used by 400+ employees needed reliable access to many models — and the team needed visibility into latency, token usage, and when fallbacks kicked in.",
    approach:
      "Configured LiteLLM as the enterprise gateway with 20+ models, fallback chains, and wildcard routing. Instrumented traffic with OpenTelemetry and built a Lambda → Glue → Athena pipeline to make it queryable. Added TypeScript MCP servers so Claude Code can administer Open WebUI and LiteLLM directly.",
    outcome:
      "A more resilient platform with queryable usage and latency data, infrastructure defined across 15+ CDK stacks, and deployments automated through GitHub Actions with OIDC.",
    stack: ["LiteLLM", "OpenTelemetry", "Lambda", "Glue", "Athena", "AWS CDK", "TypeScript", "MCP"],
    diagram: true,
    note: "Simplified architecture. Internal details generalized.",
  },
  {
    slug: "homelab-monitor",
    title: "AI HomeLab Monitor",
    kind: "Personal",
    context: "Homelab",
    year: "2026",
    role: "Solo",
    summary: "An n8n agent that watches my server and asks permission on Discord before it changes anything.",
    problem:
      "Running a self-hosted server meant constantly checking whether containers were up and debugging crashes by hand. I wanted routine diagnostics automated — without the system ever making a change I hadn't approved.",
    approach:
      "n8n workflows check every site and Docker container on a schedule. When something fails, an AI agent diagnoses it and posts its proposed fix to Discord, then waits for my approval before running a single command.",
    outcome:
      "Routine diagnostics run themselves, a weekly service inventory arrives automatically, and nothing changes on the server without a human saying yes.",
    stack: ["n8n", "Docker", "AI agents", "Discord API"],
    image: n8nServer,
    gallery: [n8nServer, n8nDiscord],
  },
  {
    slug: "billing-platform",
    title: "Shipments & Billing Platform",
    kind: "Production",
    context: "BYU Print & Mail Services",
    year: "2024—25",
    role: "Team Lead",
    summary: "Replaced a legacy Pascal billing system with a modern web app for a university operations team.",
    problem:
      "Print & Mail ran billing, refunds, and shipments through legacy Pascal software and a lot of manual accounting work, with little real-time visibility.",
    approach:
      "Led a three-person team rebuilding it as an Angular frontend on a Flask API over Oracle — role-based access, automated workflows across 12+ tables, and ETL tuned with SQLAlchemy and Pandas.",
    outcome:
      "Saved $70K+ a year in labor, cut manual accounting work by 80%, and sped up financial data transfer by 60%.",
    stack: ["Angular", "TypeScript", "Flask", "Python", "Oracle", "Docker"],
    image: shipments3,
    gallery: [shipments1, shipments2, shipments4, shipments5],
  },
  {
    slug: "cineniche",
    title: "CineNiche",
    kind: "Case competition",
    context: "BYU INTEX",
    year: "2025",
    role: "ML pipeline & security",
    summary: "A streaming platform with a custom recommendation engine, built by a team of four.",
    problem: "Build a secure streaming site that recommends films from viewing patterns and preferences.",
    approach:
      "Built the machine learning pipeline on Azure ML — collaborative filtering plus content-based recommendations — and handled web security across the React and .NET stack.",
    outcome: "A deployed full-stack app with authentication and personalized recommendations.",
    stack: ["React", "TypeScript", ".NET", "Azure ML", "MySQL"],
    image: cineniche,
    links: [{ label: "Code", href: "https://github.com/johnmgibson3/INTEX2_cineniche" }],
  },
  {
    slug: "turtle-shelter",
    title: "Turtle Shelter Project",
    kind: "Case competition",
    context: "BYU INTEX",
    year: "2024",
    role: "Back-end & deployment lead",
    summary: "Volunteer and donation management for a nonprofit serving people experiencing homelessness.",
    problem: "The nonprofit tracked volunteers and donations in spreadsheets and sent every communication by hand.",
    approach:
      "Led back-end development and AWS deployment: admin and public portals, automated email through SES for schedules and receipts, hosted on Elastic Beanstalk with RDS.",
    outcome: "A live demo with admin and public portals, automated email, and a dashboard for volunteer hours and donations.",
    stack: ["JavaScript", "Elastic Beanstalk", "Amazon RDS", "AWS SES"],
    image: turtleShelter,
    links: [
      { label: "Code", href: "https://github.com/Team1-12/intex-2024" },
      { label: "Live demo", href: "https://turtleshelterintex.dev" },
    ],
  },
];

export const STACK: { group: string; items: string[] }[] = [
  {
    group: "AI & agents",
    items: ["LiteLLM", "Open WebUI", "MCP", "n8n", "RAG", "LangChain", "Multi-agent orchestration"],
  },
  {
    group: "Cloud & infrastructure",
    items: ["AWS CDK", "Lambda", "ECS", "S3", "RDS", "Glue", "Athena", "OpenTelemetry", "Docker", "GitHub Actions", "OIDC"],
  },
  {
    group: "Languages & frameworks",
    items: ["Python", "TypeScript", "SQL", "C#", "Flask", "Angular", "React", "Node.js"],
  },
];

// ---------------------------------------------------------------------------
// Round 2 (concepts D–G): the two main work platforms as separate case studies.
// Architecture is generalized from a high-level scan — no internal names,
// hostnames, network ranges, or account details. B and C still use PROJECTS.
// ---------------------------------------------------------------------------

export type DiagramKey = "gateway" | "chat";

export interface WorkProject extends ConceptProject {
  diagramKey: DiagramKey;
  highlights: { value: string; label: string }[];
  contributions: string[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "llm-gateway",
    title: "Enterprise LLM Gateway",
    kind: "Professional",
    context: "MasterControl",
    year: "2025—26",
    role: "Cloud Engineer",
    summary:
      "One OpenAI-compatible front door to ~40 models across Bedrock, OpenAI, and Gemini — with fallbacks, budgets, and a trace on every request.",
    problem:
      "Every internal AI tool needed reliable access to models from several providers, with spend controls — and the team needed to see latency, tokens, cost, and exactly when fallbacks kicked in.",
    approach:
      "LiteLLM runs on ECS Fargate behind CloudFront and a load balancer, with Postgres for virtual keys and Redis for rate limits and caching. Requests route by latency with multi-tier fallback chains. Every call emits an OpenTelemetry trace: Firehose lands it in S3, a Lambda converts it to Parquet, and Glue + Athena make it queryable with plain SQL.",
    outcome:
      "A resilient gateway with per-request visibility into latency, tokens, cost, and fallback behavior. Config-only changes ship in about two minutes without touching CloudFormation; infrastructure changes run the full CDK pipeline.",
    stack: ["LiteLLM", "ECS Fargate", "Redis", "Postgres", "OpenTelemetry", "Firehose", "Lambda", "Glue", "Athena", "AWS CDK"],
    diagramKey: "gateway",
    highlights: [
      { value: "~40", label: "models routed" },
      { value: "3", label: "model providers" },
      { value: "10", label: "CDK stacks" },
      { value: "~2 min", label: "config-only deploys" },
    ],
    contributions: [
      "Architected the OpenTelemetry → Firehose → Lambda → Glue → Athena trace pipeline.",
      "Added 20+ models with fallback chains and wildcard routing.",
      "Automated CI/CD with GitHub Actions + OIDC, with change detection that separates config from infrastructure deploys.",
    ],
    note: "Simplified architecture. Internal details generalized.",
  },
  {
    slug: "chat-platform",
    title: "AI Chat Platform Infrastructure",
    kind: "Professional",
    context: "MasterControl",
    year: "2025—26",
    role: "Cloud Engineer",
    summary:
      "The AWS platform behind a self-hosted Open WebUI deployment used by 400+ employees — SSO, document RAG, and upgrades nobody notices.",
    problem:
      "Give the whole company one secure, self-hosted place to work with models and their own documents — with enterprise sign-in, high availability, and deploys that don't interrupt anyone.",
    approach:
      "Open WebUI on ECS Fargate, auto-scaling from 2 to 10 tasks behind CloudFront, WAF, and a load balancer. Multi-AZ Postgres holds app data, Redis keeps websockets in sync across instances, and S3 stores files and vector embeddings. OIDC single sign-on with SCIM provisioning; scheduled Lambdas clean up stale vectors and reconcile model access. Upgrades snapshot the database, pin capacity, roll out, then restore autoscaling.",
    outcome:
      "A highly available platform for 400+ employees, defined in 12 CDK stacks across isolated dev and prod accounts and deployed through GitHub Actions with OIDC — no long-lived credentials anywhere.",
    stack: ["Open WebUI", "ECS Fargate", "CloudFront", "WAF", "Postgres", "Redis", "S3 Vectors", "OIDC + SCIM", "MCP", "AWS CDK"],
    diagramKey: "chat",
    highlights: [
      { value: "400+", label: "employees" },
      { value: "12", label: "CDK stacks" },
      { value: "2–10", label: "auto-scaling tasks" },
      { value: "0", label: "long-lived credentials" },
    ],
    contributions: [
      "Built TypeScript MCP servers so Claude Code can manage users, models, prompts, and tools directly.",
      "Deployed Apache Tika with Tesseract OCR so the platform can read scanned PDFs.",
      "Engineered CDK stacks and GitHub Actions pipelines with OIDC auth and change detection.",
    ],
    note: "Simplified architecture. Internal details generalized.",
  },
];

/** Work platforms first, then the non-work projects from round 1. */
export const PROJECTS_V2: ConceptProject[] = [...WORK_PROJECTS, ...PROJECTS.filter((p) => p.slug !== "ai-gateway")];

export const isWorkProject = (p: ConceptProject): p is WorkProject => "diagramKey" in p;

/** Career spans for timeline-as-trace layouts. `end: null` means ongoing. */
export const TIMELINE_SPANS: Record<string, { start: string; end: string | null }> = {
  mastercontrol: { start: "2025-11-01", end: null },
  byu: { start: "2021-08-01", end: "2025-12-15" },
  "print-mail": { start: "2024-06-01", end: "2025-11-01" },
  oit: { start: "2023-06-01", end: "2024-04-30" },
};

// Placeholder values for the "live homelab" widget in the Control Plane concept.
// Wire these to an n8n webhook before shipping so the numbers are real.
export const HOMELAB_STATUS = {
  services: 14,
  uptime: "99.9%",
  lastCheck: "2m ago",
};
