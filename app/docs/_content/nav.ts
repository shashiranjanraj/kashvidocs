export type DocItem = {
  title: string;
  href: string;
  description?: string;
  keywords?: string[];
};

export type DocGroup = {
  title: string;
  items: DocItem[];
};

export const docsNav: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Overview",
        href: "/docs",
        description: "What is Kashvi and how to use these docs.",
        keywords: ["kashvi", "docs", "overview"],
      },
      {
        title: "Installation & Quick Start",
        href: "/docs/installation",
        description: "Install the CLI and run your first app.",
        keywords: ["install", "quick start", "env", "serve"],
      },
      {
        title: "User CRUD API (5 Minutes)",
        href: "/docs/user-crud",
        description: "Build a validated REST user API quickly.",
        keywords: ["crud", "user", "validation", "routes"],
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "CLI Reference",
        href: "/docs/cli",
        description: "Commands for server, DB, scaffolding, workers.",
        keywords: ["cli", "commands", "migrate", "seed"],
      },
      {
        title: "Configuration",
        href: "/docs/configuration",
        description: "Environment variables and app.json settings.",
        keywords: ["config", "env", "jwt", "db", "redis"],
      },
      {
        title: "Routing",
        href: "/docs/routing",
        description: "Define routes, groups, middleware, URL params.",
        keywords: ["router", "group", "middleware"],
      },
      {
        title: "Context API",
        href: "/docs/context",
        description: "Request/response helpers, binding, validation.",
        keywords: ["ctx", "bindjson", "success", "error"],
      },
      {
        title: "Validation",
        href: "/docs/validation",
        description: "Struct tags, rules, errors, nullable fields.",
        keywords: ["validate", "struct tags", "rules"],
      },
      {
        title: "Authentication",
        href: "/docs/authentication",
        description: "JWT auth, hashing, middleware, RBAC.",
        keywords: ["jwt", "auth", "rbac"],
      },
      {
        title: "ORM & Database",
        href: "/docs/orm",
        description: "GORM wrapper, query builder, pagination, cache.",
        keywords: ["orm", "gorm", "paginate", "cache"],
      },
      {
        title: "Migrations & Seeders",
        href: "/docs/migrations",
        description: "Create migrations, run/rollback, seed data.",
        keywords: ["migration", "seeder", "status"],
      },
      {
        title: "Queue & Jobs",
        href: "/docs/queue",
        description: "Background jobs, retry/backoff, drivers.",
        keywords: ["queue", "jobs", "redis", "workers"],
      },
      {
        title: "Worker Pool",
        href: "/docs/worker-pool",
        description: "Bounded goroutine pool for controlled concurrency.",
        keywords: ["workerpool", "pool", "concurrency"],
      },
      {
        title: "Storage",
        href: "/docs/storage",
        description: "Local and S3-compatible storage API.",
        keywords: ["storage", "s3", "uploads"],
      },
      {
        title: "WebSocket & SSE",
        href: "/docs/realtime",
        description: "WebSockets hub/client and Server-Sent Events.",
        keywords: ["websocket", "sse", "realtime"],
      },
      {
        title: "gRPC Server",
        href: "/docs/grpc",
        description: "Run alongside HTTP, interceptors, reflection.",
        keywords: ["grpc", "health", "reflection"],
      },
      {
        title: "MongoDB Log Storage",
        href: "/docs/mongodb-logs",
        description: "Async log mirroring to MongoDB with batching.",
        keywords: ["mongo", "logs", "observability"],
      },
      {
        title: "TestKit (JSON Scenarios)",
        href: "/docs/testkit",
        description: "Scenario-driven API integration tests in JSON.",
        keywords: ["testkit", "json", "scenarios", "mocking"],
      },
    ],
  },
];

export function flattenDocsNav(nav: DocGroup[] = docsNav): DocItem[] {
  return nav.flatMap((g) => g.items);
}

export const docsSearchIndex = flattenDocsNav(docsNav).map((i) => ({
  href: i.href,
  title: i.title,
  description: i.description ?? "",
  keywords: i.keywords ?? [],
}));

