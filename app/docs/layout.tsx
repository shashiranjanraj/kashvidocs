import type { ReactNode } from "react";
import Link from "next/link";
import { DocsMobileNav } from "./_components/DocsMobileNav";
import { DocsSearch } from "./_components/DocsSearch";
import { DocsSidebar } from "./_components/DocsSidebar";
import { Toc } from "./_components/Toc";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell flex min-h-dvh flex-col bg-white dark:bg-gradient-to-b dark:from-zinc-950 dark:via-purple-950/10 dark:to-zinc-950">
      {/* Decorative gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      {/* Blurred, sticky header */}
      <header className="sticky top-0 z-40 glass-panel border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">
            <DocsMobileNav />
            <Link
              href="/docs"
              className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
                K
              </span>
              <span className="font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 hidden sm:block">
                Kashvi Docs
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 md:justify-center lg:max-w-md">
            <div className="hidden w-full sm:block">
              <DocsSearch />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 sm:gap-4 sm:w-[140px] lg:w-[160px]">
            <a
              href="https://github.com/shashiranjanraj/kashvi"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800/50 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 sm:flex shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2Z"></path></svg>
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_240px] lg:px-8 gap-8">

        {/* Left Sidebar */}
        <aside className="hidden py-10 lg:block border-r border-zinc-200/50 dark:border-zinc-800/50">
          <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden pb-8 custom-scrollbar">
            <DocsSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 py-10 lg:py-16 docs-content">
          <div className="mx-auto w-full max-w-3xl prose prose-lg dark:prose-invert">
            {children}
          </div>
        </main>

        {/* Right Sidebar (TOC) */}
        <aside className="hidden py-10 lg:block">
          <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pb-8 custom-scrollbar">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></span>
              On this page
            </h4>
            <Toc />
          </div>
        </aside>

      </div>
    </div>
  );
}
