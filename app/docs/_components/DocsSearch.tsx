"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { docsSearchIndex } from "../_content/nav";

function norm(s: string) {
  return s.toLowerCase().trim();
}

export function DocsSearch() {
  const [q, setQ] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = norm(q);

  const results = useMemo(() => {
    if (!query) return [];
    const out = docsSearchIndex
      .map((item) => {
        const hay = norm(
          [item.title, item.description, item.keywords.join(" ")].join(" "),
        );
        const score = hay.includes(query) ? 1 : 0;
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .slice(0, 10)
      .map((r) => r.item);
    setSelectedIndex(0);
    return out;
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Arrow keys for navigation
      if (results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const result = results[selectedIndex];
          if (result) {
            window.location.href = result.href;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [results, selectedIndex]);

  return (
    <div className="relative w-full max-w-md mx-auto group">
      <div className="relative flex items-center">
        <svg className="absolute left-3.5 h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documentation..."
          className="h-10 w-full rounded-lg border border-zinc-200/80 bg-white/50 dark:bg-zinc-900/40 pl-10 pr-28 text-sm text-zinc-900 dark:text-white shadow-sm outline-none transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/20"
        />
        <div className="absolute right-3 hidden items-center gap-1 sm:flex pointer-events-none">
          <kbd className="inline-flex h-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 dark:text-zinc-500">⌘</kbd>
          <kbd className="inline-flex h-5 items-center justify-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 dark:text-zinc-500">K</kbd>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in-0 zoom-in-95">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {results.map((r, i) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setQ("")}
                className={`flex flex-col gap-1.5 px-4 py-3 text-sm transition-all border-l-2 ${
                  i === selectedIndex
                    ? "border-l-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                    : "border-l-transparent hover:border-l-indigo-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {r.title}
                </div>
                {r.description ? (
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {r.description}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Use <kbd className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-mono border border-zinc-200 dark:border-zinc-700">↑↓</kbd> to navigate, <kbd className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-mono border border-zinc-200 dark:border-zinc-700">Enter</kbd> to select</span>
          </div>
        </div>
      ) : q ? (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 shadow-2xl backdrop-blur-xl p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          No results found for "{q}"
        </div>
      ) : null}
    </div>
  );
}
