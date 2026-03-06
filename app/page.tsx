import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh bg-white dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-28">
        <div className="flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            Kashvi Framework
            <span className="text-zinc-400 dark:text-zinc-500">·</span>
            Documentation
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Build production-grade Go APIs with Kashvi.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            A modern docs experience—fast navigation, searchable sections, and
            clean reference pages. All content is authored as React pages (no
            markdown runtime rendering).
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open Docs
            </Link>
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-950 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Quick Start
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="docs-card">
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Getting Started
            </div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Install the CLI, create a project, and ship your first resource.
            </div>
            <div className="mt-4">
              <Link href="/docs/installation" className="text-sm">
                Go to Installation →
              </Link>
            </div>
          </div>
          <div className="docs-card">
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Reference
            </div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              CLI commands, routing, context API, validation, auth, ORM, and
              more.
            </div>
            <div className="mt-4">
              <Link href="/docs/cli" className="text-sm">
                Go to CLI Reference →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
