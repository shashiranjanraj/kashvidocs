import type { Metadata } from "next";
import Link from "next/link";
import { docsNav } from "./_content/nav";
import { DocsPageHeader } from "./_components/DocsPageHeader";

export const metadata: Metadata = {
  title: "Overview",
  description: "Kashvi framework documentation overview.",
};

export default function DocsHomePage() {
  return (
    <article data-doc="true" className="docs-content">
      <DocsPageHeader
        id="overview"
        eyebrow="Kashvi"
        title="Framework documentation"
        description={
          <>
            Kashvi is a Laravel-inspired Go web framework for APIs and web apps: ORM, migrations, JWT auth,
            caching, queues, WebSockets, gRPC, and a CLI for scaffolding. Use the map below to jump to guides
            and reference pages.
          </>
        }
      />

      <p className="text-zinc-500 dark:text-zinc-400">
        <em>Made with care by an Indian developer.</em>
      </p>

      <h2 id="documentation-map">Documentation map</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-3 font-semibold">Goal</th>
              <th className="text-left px-4 py-3 font-semibold">Where to read</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">Install CLI, new project, first run</td>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <Link href="/docs/installation">Installation &amp; Quick Start</Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">Full CRUD (model → DTO → migration → repo → tests)</td>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <Link href="/docs/user-crud">Complete CRUD walkthrough</Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">App logs and SQL (<code>LOG_LEVEL</code>, <code>DB_LOG_MODE</code>)</td>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <Link href="/docs/installation#logging">Logging</Link> on Installation
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">CLI (<code>migrate</code>, <code>make:resource</code>, …)</td>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <Link href="/docs/cli">CLI reference</Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">Routes, context, validation, auth</td>
              <td className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <Link href="/docs/routing">Routing</Link>, <Link href="/docs/context">Context</Link>,{" "}
                <Link href="/docs/validation">Validation</Link>, <Link href="/docs/authentication">Authentication</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="key-features">Key features</h2>
      <ul>
        <li>
          <strong>MVC + DTOs</strong>: Controllers, services, repositories, models, and request/response DTOs
        </li>
        <li>
          <strong>Database ORM</strong>: GORM-backed queries (MySQL, PostgreSQL, SQLite, SQL Server)
        </li>
        <li>
          <strong>Migrations &amp; seeders</strong>: Versioned schema and data
        </li>
        <li>
          <strong>Authentication</strong>: JWT middleware and optional RBAC
        </li>
        <li>
          <strong>Caching &amp; queues</strong>: Redis-oriented integrations
        </li>
        <li>
          <strong>WebSockets &amp; gRPC</strong>: Real-time and RPC alongside HTTP
        </li>
        <li>
          <strong>Testing</strong>: TestKit with JSON scenario files
        </li>
        <li>
          <strong>CLI</strong>: <code>kashvi new</code>, <code>kashvi make:*</code>, project-aware <code>serve</code> / <code>migrate</code>
        </li>
      </ul>

      <h2 id="architecture">Architecture</h2>
      <p>
        Kashvi follows <strong>MVC</strong> with a repository layer and <strong>DTOs</strong> for API
        contracts. Controllers bind JSON to DTOs, validate, call repositories or services, and respond.
      </p>
      <pre className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-sm font-mono overflow-x-auto">
{`┌─────────────────┐
│  Controllers    │ ← HTTP; bind DTOs, call services/repositories
├─────────────────┤
│      DTOs       │ ← Request/response structs (CreateXRequest, …)
├─────────────────┤
│    Services     │ ← Business logic (optional)
├─────────────────┤
│  Repositories   │ ← Data access; encapsulate ORM/DB calls
├─────────────────┤
│     Models      │ ← GORM models
├─────────────────┤
│   Database      │ ← Migrations & GORM
└─────────────────┘`}
      </pre>

      <h2 id="start-here">Start here</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link href="/docs/installation" className="docs-card block">
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Installation &amp; Quick Start
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Install the CLI, create a project, configure env, and run the server.
          </div>
        </Link>
        <Link href="/docs/user-crud" className="docs-card block">
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Complete CRUD walkthrough (Product API)
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Model → DTO → migration → repository → service → controller → auth → seed → test.
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
