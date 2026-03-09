"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DocsSidebar } from "./DocsSidebar";
import { DocsSearch } from "./DocsSearch";

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 lg:hidden"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute inset-y-0 left-0 w-[85vw] max-w-sm flex flex-col bg-white shadow-2xl dark:bg-black border-r border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-bold"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">
                  K
                </span>
                <span className="text-zinc-900 dark:text-zinc-100 text-sm tracking-tight">Kashvi</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="mb-6">
                <DocsSearch />
              </div>
              <div onClickCapture={() => setOpen(false)}>
                <DocsSidebar />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
