import type { ReactNode } from "react";
import Link from "next/link";
import { DocsMobileNav } from "./_components/DocsMobileNav";
import { DocsSearch } from "./_components/DocsSearch";
import { DocsSidebar } from "./_components/DocsSidebar";
import { Toc } from "./_components/Toc";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
          <DocsMobileNav />
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold text-zinc-950 hover:bg-[color:var(--accent)/10] dark:text-zinc-50 dark:hover:bg-[color:var(--accent)/20]"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[color:var(--accent)] text-xs font-bold text-white dark:bg-[color:var(--accent)] dark:text-white">
              K
            </span>
            Kashvi Docs
          </Link>

          <div className="flex-1" />

          <div className="hidden w-[420px] max-w-[48vw] sm:block">
            <DocsSearch />
          </div>

          <Link
            href="https://github.com/shashiranjanraj/kashvi"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-[color:var(--accent)/10] dark:text-zinc-300 dark:hover:bg-[color:var(--accent)/20] sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)_240px] lg:gap-8">
        <aside className="hidden border-r border-zinc-200 py-8 pr-6 dark:border-zinc-800 lg:block">
          <DocsSidebar />
        </aside>

        <main className="min-w-0 py-8">
          <div className="mx-auto w-full max-w-3xl">{children}</div>
        </main>

        <aside className="hidden py-8 lg:block">
          <div className="sticky top-20">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              On this page
            </div>
            <Toc />
          </div>
        </aside>
      </div>
    </div>
  );
}

