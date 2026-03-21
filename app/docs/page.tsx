import type { Metadata } from "next";
import Link from "next/link";
import { docsNav } from "./_content/nav";

export const metadata: Metadata = {
  title: "Overview",
  description: "Kashvi framework documentation overview.",
};

export default function DocsHomePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="overview">Kashvi Framework Documentation</h1>
      <p>
        Kashvi is a Laravel-inspired Go web framework designed for rapid application development. It provides a clean, expressive API with powerful features like ORM, migrations, authentication, caching, queues, and more. Built on top of proven libraries like GORM, Chi router, and Redis, Kashvi helps you build scalable web applications and APIs quickly.
      </p>
      <p>
        <em>Made with ❤️ by an Indian developer</em>.
      </p>

      <h2 id="key-features">Key Features</h2>
      <ul>
        <li><strong>MVC Architecture</strong>: Model-View-Controller pattern with clear separation of concerns</li>
        <li><strong>Database ORM</strong>: GORM-powered query builder with support for MySQL, PostgreSQL, SQLite, and SQL Server</li>
        <li><strong>Migrations</strong>: Database schema versioning and management</li>
        <li><strong>Authentication</strong>: JWT-based auth with middleware</li>
        <li><strong>Caching</strong>: Redis-backed caching system</li>
        <li><strong>Queues</strong>: Background job processing with Redis</li>
        <li><strong>WebSockets</strong>: Real-time communication support</li>
        <li><strong>gRPC Support</strong>: High-performance RPC services</li>
        <li><strong>Testing</strong>: Built-in test kit with JSON scenario files</li>
        <li><strong>CLI Tool</strong>: Powerful scaffolding commands for rapid development</li>
      </ul>

      <h2 id="architecture">Architecture</h2>
      <p>
        Kashvi follows a layered architecture with a <strong>repository layer</strong> so controllers and services do not call the ORM directly:
      </p>
      <pre className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-sm font-mono overflow-x-auto">
{`┌─────────────────┐
│   Controllers   │ ← Handle HTTP, call services or repositories
├─────────────────┤
│    Services     │ ← Business logic (optional)
├─────────────────┤
│  Repositories   │ ← Data access; encapsulate orm/DB calls
├─────────────────┤
│     Models      │ ← Data structures (GORM models)
├─────────────────┤
│   Database      │ ← GORM with migrations
└─────────────────┘`}
      </pre>
      <p>
        Controllers and services depend on <strong>repositories</strong> (e.g. <code>UserRepository</code>) instead of <code>orm.DB()</code>. Repositories expose methods like <code>FindByID</code>, <code>All</code>, <code>Create</code>, <code>Update</code>, <code>Delete</code> and keep all data access in one place.
      </p>
      <p>
        <strong>Where to start:</strong> After <Link href="/docs/installation" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Installation</Link> and Configure Environment, read the Logging section for app/DB log settings, then follow the <Link href="/docs/user-crud" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Complete CRUD walkthrough</Link> to use model, migration, repository, service, controller, validation, auth, seeder, and tests together.
      </p>

      <h2 id="start-here">Start here</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link href="/docs/installation" className="docs-card block">
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Installation &amp; Quick Start
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Install the CLI, create an app, configure env, and run the server.
          </div>
        </Link>
        <Link href="/docs/user-crud" className="docs-card block">
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Complete CRUD walkthrough (Product API)
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Model → migration → repository → service → controller → validation → auth → seed → test.
          </div>
        </Link>
      </div>

      <h2 id="all-sections">All sections</h2>
      <div className="mt-4 grid gap-4">
        {docsNav.map((group) => (
          <div key={group.title} className="docs-card">
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              {group.title}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                    {item.title}
                  </div>
                  {item.description ? (
                    <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
