"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { docsSearchIndex } from "../_content/nav";

function norm(s: string) {
  return s.toLowerCase().trim();
}

export function DocsSearch() {
  const [q, setQ] = useState("");
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
      .slice(0, 8)
      .map((r) => r.item);
    return out;
  }, [query]);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs…"
        className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none placeholder:text-zinc-400 focus:border-[color:var(--accent)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[color:var(--accent)]"
      />

      {results.length > 0 ? (
        <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="max-h-[320px] overflow-auto p-1">
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setQ("")}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <div className="font-semibold accent-text">
                  {r.title}
                </div>
                {r.description ? (
                  <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {r.description}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

