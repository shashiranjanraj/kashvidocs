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
    const root = document.querySelector<HTMLElement>('article[data-doc="true"]');
    if (!root) return;

    const update = () => setItems(getHeadings());
    const raf = requestAnimationFrame(update);

    const mo = new MutationObserver(() => {
      requestAnimationFrame(update);
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
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
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 1] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  if (items.length === 0) {
    return (
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        No headings.
      </div>
    );
  }

  return (
    <nav className="flex flex-col gap-1">
      {items.map((i) => {
        const active = i.id === activeId;
        return (
          <a
            key={i.id}
            href={`#${i.id}`}
            className={[
              "rounded-md px-2 py-1 text-sm transition",
              i.level === 3 ? "ml-2" : "",
              active
                ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
            ].join(" ")}
          >
            {i.title}
          </a>
        );
      })}
    </nav>
  );
}

