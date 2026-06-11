export const profile = {
  name: "Prashant Kumar",
  role: "Backend & Cloud Engineer",
  tagline: "Building scalable distributed systems and applied AI.",
  blurb:
    "Software engineer focused on backend and cloud infrastructure across AWS, Azure, and GCP. I design reliable REST APIs and distributed systems in Java and Python, and build with GenAI on the side.",
  location: "Bengaluru, India",
  email: "iampkumar02@gmail.com",
  socials: {
    github: "https://github.com/Algo-Voyager",
    linkedin: "https://linkedin.com/in/iampkumar",
    portfolio: "https://algo-voyager.app",
    leetcode: "https://leetcode.com/u/vukoga",
    codeforces: "https://codeforces.com/profile/_algo_voyager",
  },
};

export const about = {
  paragraphs: [
    "I'm a backend engineer who enjoys turning ambiguous, large-scale problems into reliable systems. My day-to-day is designing REST APIs, multicloud resource-discovery services, and observability pipelines that run across AWS, Azure, and GCP.",
    "I care about measurable impact — cutting redundant API calls, raising audit accuracy, and reducing investigation time at the scale of thousands of cloud resources. On the side, I build with GenAI: RAG agents, LLM integrations, and developer tooling.",
    "Outside work I'm a competitive programmer (LeetCode Knight, Codeforces Specialist) with 1000+ problems solved — fundamentals I bring into every system I design.",
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Lucidity",
    role: "Software Developer",
    period: "Mar 2025 — Present",
    location: "Bengaluru",
    stack: ["Java", "Python", "AWS", "Azure", "GCP", "REST APIs"],
    points: [
      "Designed and operated high-performance, scalable backend services for a multicloud audit platform — REST APIs, retry/resilience orchestration, and least-privilege IAM.",
      "Built multicloud resource discovery (EKS, AKS, Databricks, ROSA) across AWS, Azure, and GCP — improved resource visibility by 40% and tracking accuracy to 99.9%.",
      "Fixed AWS API throttling by batching permission checks, cutting redundant calls by 72%.",
      "Reduced audit “Unknown” cases by 60% across 6,000+ VMs; automated 25% of resolutions, cutting investigation time by 63%.",
      "Built observability (structured logging + Datadog/Slack alerting) for long-running jobs across 60–70 Azure subscriptions.",
    ],
  },
  {
    company: "Secure Blink",
    role: "Software Engineer Intern",
    period: "Apr 2024 — Jul 2024",
    location: "Remote",
    stack: ["Node.js", "Express", "TypeScript", "MongoDB", "Docker"],
    points: [
      "Built a web-application security-scanning platform with Node.js and Express, managing 12+ REST APIs with MongoDB and MySQL.",
      "Integrated OWASP ZAP via Docker for authenticated and unauthenticated scanning.",
      "Built a Docker-in-Docker setup that cut environment setup time by 30%.",
    ],
  },
];

export type Project = {
  name: string;
  blurb: string;
  stack: string[];
  link?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    name: "SSC Guru Talks",
    blurb:
      "A bilingual exam platform serving 196K+ requests/week for 4K+ users. Achieved a 93% TTFB reduction through 3-layer caching, database optimization with 15+ indexes, and advanced performance tuning.",
    stack: ["Next.js", "PostgreSQL", "Caching", "Performance"],
    link: "https://sscgurutalks.com/",
    accent: "#f59e0b",
  },
  {
    name: "KodeWiki",
    blurb:
      "Ask plain-English questions about any GitHub repo and get answers grounded in the code with file-path and line-number citations. Built from scratch (no LangChain) — tree-sitter cAST chunking across 306+ languages, ChromaDB vector search, a text-based ReAct agent loop, multi-tenant workspaces, and bring-your-own LLM/embedding keys.",
    stack: ["Python", "FastAPI", "ChromaDB", "Inngest", "Next.js", "Modal"],
    link: "https://kodewiki.vercel.app",
    accent: "#22d3ee",
  },
  {
    name: "Azure Cost Analytics Dashboard",
    blurb:
      "Full-stack platform processing 10,000+ cloud resources, cutting manual analysis time by 90% via memoized aggregations, plus an AI chatbot over a cost-optimization engine. 2nd Runner-Up, Lucidity Fixit Hackathon.",
    stack: ["React", "Express", "Flask", "LangChain", "Gemini"],
    accent: "#a78bfa",
  },
  {
    name: "Relay AI",
    blurb:
      "A full-stack Voice-AI call-scheduling platform for automated outbound calls with transcript extraction. Async job processing on PostgreSQL message queues with retry logic and secure multi-tenant architecture.",
    stack: ["Voice AI", "OpenAI", "PostgreSQL", "Supabase"],
    accent: "#34d399",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "C++"] },
  { group: "Backend & APIs", items: ["Spring Boot", "Node.js", "Express", "FastAPI", "Django", "Microservices", "REST APIs"] },
  { group: "Data & Caching", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Kafka"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Buildkite", "Git"] },
  { group: "AI / GenAI", items: ["LangChain", "RAG", "ChromaDB", "LLM Integration"] },
];

export const stats = [
  { label: "LeetCode", value: 1883, suffix: "", note: "Max rating · Knight" },
  { label: "Codeforces", value: 1448, suffix: "", note: "Peak · Specialist" },
  { label: "Problems Solved", value: 1000, suffix: "+", note: "Across platforms" },
  { label: "Cloud VMs Audited", value: 6000, suffix: "+", note: "In production" },
];

export const achievements = [
  "2nd Runner-Up — Lucidity Fixit Hackathon (interactive Azure cost dashboard)",
  "380th position — Codeforces Round 995",
  "154th rank — LeetCode Weekly Contest 431",
  "LeetCode Knight (top ~5%) · Codeforces Specialist",
];

export const education = {
  school: "Indian Institute of Information Technology, Gwalior",
  degree: "B.Tech (Information Technology) + Masters (Dual Degree)",
  period: "2020 — 2025",
};
