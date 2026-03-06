import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh bg-white dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:py-28">
        <div className="flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--accent)/40] bg-[color:var(--accent)/10] px-3 py-1 text-xs font-medium text-[color:var(--accent)] shadow-sm">
            Kashvi Framework
            <span className="text-[color:var(--accent)/70]">·</span>
            Documentation
          </div>
          <h1 className="text-balance text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
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
              className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-5 text-sm font-semibold text-[var(--accent-foreground)] hover:bg-[color:var(--accent)/90]"
            >
              Open Docs
            </Link>
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--accent)/50] bg-white px-5 text-sm font-semibold text-[color:var(--accent)] hover:bg-[color:var(--accent)/10] dark:border-[color:var(--accent)/30] dark:bg-zinc-950 dark:text-[color:var(--accent)] dark:hover:bg-[color:var(--accent)/20]"
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
              <Link href="/docs/installation" className="text-sm accent-text hover:underline">
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
              <Link href="/docs/cli" className="text-sm accent-text hover:underline">
                Go to CLI Reference →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
