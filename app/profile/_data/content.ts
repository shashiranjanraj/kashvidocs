/** Copy and structured data for the developer profile — single source of truth. */

export const profile = {
  name: "Shashi Ranjan",
  location: "Delhi, India",
  role: "Senior Software Engineer",
  subtitle: "Backend / Full Stack",
  tagline:
    "I design and ship backends that stay calm under load — microservices in Go, real-time systems, and APIs that teams can actually evolve.",
  email: "shashiranjanraj@gmail.com",
  /** wa.me expects country code + number without + or spaces */
  whatsapp: {
    display: "+91 87008 98002",
    href: "https://wa.me/918700898002",
  },
  social: {
    github: "https://github.com/shashiranjanraj",
    linkedin: "https://www.linkedin.com/in/shashiranjanraj/",
    medium: "https://medium.com/@shashiranjanraj",
  },
  resumePath: "/resume.pdf",
  kashvi: {
    title: "Kashvi",
    titleAccent: "Golang Framework",
    url: "https://gokashvi.in",
    /** One line for recruiters — scan in ~5s */
    recruiterHook:
      "Author of a production-grade Go framework: CLI, ORM, auth, queues, docs — shipped as a real product, not a weekend repo.",
    description:
      "A backend framework I built from the ground up for teams who want Go services with clean architecture, strong conventions, and room to grow. Think productivity without sacrificing structure.",
    tags: ["Go", "Microservices", "Clean Architecture"] as const,
    badge: "Built from Scratch",
    /** Shown as a prominent badge row above the headline */
    showcaseBadges: ["Open Source", "Custom Built", "Built from Scratch"] as const,
    quickStats: [
      { label: "Scope", value: "Full framework + CLI" },
      { label: "Docs", value: "This site" },
      { label: "Focus", value: "Clean architecture" },
    ] as const,
  },
} as const;

export const about = {
  paragraphs: [
    "I’m a practical problem solver based in Delhi. Most of my time goes into backend architecture — how services talk, how data flows, and how systems stay maintainable when traffic and teams both scale up.",
    "Go is my happy place: I lean on clean architecture and SOLID principles to keep boundaries clear. I’ve also shipped plenty of Node.js and PHP when the problem called for it, and I’m comfortable across MongoDB, PostgreSQL, and Redis — plus Kafka when the pipeline needs to be serious.",
    "On the human side, I enjoy mentoring: breaking down complex ideas, reviewing with empathy, and helping juniors ship with confidence. Slightly desi, straight-talking, tech-first.",
  ],
  strengths: [
    "Backend architecture & scalable system design",
    "Go microservices (clean architecture, SOLID)",
    "Real-time systems — notifications, tracking pipelines",
    "REST APIs & distributed systems",
    "CI/CD and AWS ECS in production",
  ],
} as const;

export type SkillCategory = {
  title: string;
  items: { label: string; highlight?: boolean }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & runtime",
    items: [
      { label: "Golang", highlight: true },
      { label: "Node.js" },
      { label: "PHP" },
    ],
  },
  {
    title: "Frontend",
    items: [{ label: "React" }, { label: "SvelteKit" }],
  },
  {
    title: "Data & messaging",
    items: [
      { label: "MongoDB" },
      { label: "PostgreSQL" },
      { label: "Redis" },
      { label: "Kafka" },
    ],
  },
  {
    title: "Platform & APIs",
    items: [
      { label: "Docker" },
      { label: "Kubernetes" },
      { label: "REST APIs" },
      { label: "Microservices" },
    ],
  },
] as const;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  featured?: boolean;
  href?: string;
  cta?: string;
};

export const projects: Project[] = [
  {
    title: "Kashvi Framework",
    description:
      "My flagship product: a custom Go framework focused on scalability, modularity, and developer productivity — not a weekend toy, a deliberate platform for serious backends.",
    stack: ["Go", "Clean Architecture", "CLI", "Microservices"],
    featured: true,
    href: "https://gokashvi.in",
    cta: "Visit Website",
  },
  {
    title: "E-Library REST API",
    description:
      "A structured API layer with SOLID boundaries, PostgreSQL underneath, and patterns that make features easy to add without breaking callers.",
    stack: ["Go", "PostgreSQL", "REST", "SOLID"],
  },
  {
    title: "Real-time student tracking & parent notifications",
    description:
      "Safety-critical flows: biometrics, face recognition hooks, and live tracking with alerting so parents and admins get signal, not noise.",
    stack: ["Real-time", "Notifications", "Distributed systems"],
  },
  {
    title: "Multi-platform e-commerce backend",
    description:
      "Centralized orders and inventory so multiple storefronts could share one source of truth without turning the database into a battlefield.",
    stack: ["Microservices", "REST", "PostgreSQL / Redis"],
  },
  {
    title: "Voice-based billing (experimental)",
    description:
      "Exploring voice as an interface for SMEs — fast entry, fewer mistakes at the counter, and room to iterate on UX.",
    stack: ["Go / Node", "API design", "Product experiment"],
  },
] as const;

export type ExperienceItem = {
  period: string;
  title: string;
  company: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "2022 — Present",
    title: "Senior Software Engineer (Backend / Full Stack)",
    company: "Product-led teams",
    points: [
      "Lead design and delivery of Go microservices with clean architecture; mentor engineers on patterns and reviews.",
      "Own real-time notification and tracking pipelines; optimize for reliability and observability.",
      "Partner with frontend (React / SvelteKit) and DevOps for CI/CD on AWS ECS.",
    ],
  },
  {
    period: "2019 — 2022",
    title: "Software Engineer — Backend",
    company: "High-traffic applications",
    points: [
      "Built REST APIs and integrations across Node.js, PHP, and Go; PostgreSQL, MongoDB, Redis in production.",
      "Contributed to student safety initiatives: biometrics, face recognition integrations, and live tracking backends.",
      "Improved performance and consistency across distributed services.",
    ],
  },
] as const;

export const buildingNow = {
  title: "What I’m building now",
  body:
    "Pushing Kashvi forward — better ergonomics for teams, sharper defaults for production, and docs that respect your time. On the side: deeper experiments in real-time systems and developer tooling that stays out of your way.",
  kashviDocsHref: "/docs",
} as const;

export type BlogPost = {
  title: string;
  href: string;
  source: "Medium" | "LinkedIn";
};

/** Articles & posts — Medium + LinkedIn Pulse */
export const blogPosts: readonly BlogPost[] = [
  {
    title: "I built a Laravel-inspired web framework in Go — meet Kashvi",
    href: "https://medium.com/@shashiranjanraj/i-built-a-laravel-inspired-web-framework-in-go-meet-kashvi-03ab37346bb7",
    source: "Medium",
  },
  {
    title: "AI Isn’t Always the Right Answer — Sometimes It Makes Systems Worse",
    href: "https://www.linkedin.com/pulse/ai-isnt-always-right-answer-sometimes-makes-systems-worse-ranjan-gndyf/",
    source: "LinkedIn",
  },
  {
    title: "The Go Revolution: Why Big Tech is Trading Java Threads for Go routines",
    href: "https://www.linkedin.com/pulse/go-revolution-why-big-tech-trading-java-threads-routines-ranjan-iungc/",
    source: "LinkedIn",
  },
] as const;

export const githubStatsDummy = {
  repos: "48",
  stars: "120+",
  contributions: "1.4k+",
  label: "GitHub snapshot (illustrative)",
} as const;
