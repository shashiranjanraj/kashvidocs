"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; title: string; level: 2 | 3 };

function getHeadings(): TocItem[] {
  const root = document.querySelector<HTMLElement>('article[data-doc="true"]');
  if (!root) return [];

  const nodes = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
  const items: TocItem[] = [];

  for (const el of nodes) {
    const level = el.tagName === "H2" ? 2 : 3;
    const title = (el.textContent ?? "").trim();
    const id = el.id?.trim();
    if (!id || !title) continue;
    items.push({ id, title, level });
  }

  return items;
}

export function Toc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // slight delay to let content render
    setTimeout(() => {
      setItems(getHeadings());
    }, 100);

    const root = document.querySelector<HTMLElement>('article[data-doc="true"]');
    if (!root) return;

    const update = () => setItems(getHeadings());
    const mo = new MutationObserver(update);
    mo.observe(root, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, []);

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  if (items.length === 0) {
    return (
      <div className="text-sm text-zinc-500 italic dark:text-zinc-500">
        No headings found on this page.
      </div>
    );
  }

  return (
    <nav className="flex flex-col relative text-[13px]">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

      {items.map((i) => {
        const active = i.id === activeId;
        return (
          <a
            key={i.id}
            href={`#${i.id}`}
            className={[
              "relative pl-4 py-1.5 transition-all duration-200 hover:text-zinc-900 dark:hover:text-zinc-100",
              i.level === 3 ? "ml-2" : "",
              active
                ? "font-semibold text-indigo-600 dark:text-indigo-400"
                : "text-zinc-500 dark:text-zinc-400",
            ].join(" ")}
          >
            {active && (
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            )}
            {i.title}
          </a>
        );
      })}
    </nav>
  );
}
