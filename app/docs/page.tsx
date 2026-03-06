import type { Metadata } from "next";
import Link from "next/link";
import { docsNav } from "./_content/nav";

export const metadata: Metadata = {
  title: "Overview",
  description: "Kashvi documentation overview.",
};

export default function DocsHomePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="overview">Kashvi Documentation</h1>
      <p>
        This site contains the consolidated Kashvi framework documentation,
        authored as React pages for a fast, modern reading experience.
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
            Build a User CRUD API
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            A 5-minute walkthrough: validation, controller, routes, and curl.
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

