"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Link, Typography } from "@mui/material";

type TocItem = { id: string; title: string; level: 2 | 3 };

function getHeadings(): TocItem[] {
  const root = document.querySelector<HTMLElement>('article[data-doc="true"]');
  if (!root) return [];
  const nodes = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
  const items: TocItem[] = [];
  for (const el of nodes) {
    const level = el.tagName === "H2" ? 2 : 3;
    const title = (el.textContent ?? "").trim();
    const id    = el.id?.trim();
    if (!id || !title) continue;
    items.push({ id, title, level });
  }
  return items;
}

export function Toc() {
  const [items, setItems]   = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setTimeout(() => setItems(getHeadings()), 100);
    const root = document.querySelector<HTMLElement>('article[data-doc="true"]');
    if (!root) return;
    const mo = new MutationObserver(() => setItems(getHeadings()));
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
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);

  if (items.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
        No headings found.
      </Typography>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontSize: "0.8125rem",
        borderLeft: "1px solid",
        borderColor: "divider",
      }}
    >
      {items.map((i) => {
        const active = i.id === activeId;
        return (
          <Box key={i.id} sx={{ position: "relative" }}>
            {active && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  bgcolor: "primary.main",
                  borderRadius: "999px",
                }}
              />
            )}
            <Link
              href={`#${i.id}`}
              underline="none"
              sx={{
                display: "block",
                pl: i.level === 3 ? 3.5 : 2,
                pr: 1,
                py: 0.75,
                fontSize: "inherit",
                lineHeight: 1.4,
                color: active ? "primary.main" : "text.secondary",
                fontWeight: active ? 600 : 400,
                transition: "color 0.15s",
                "&:hover": { color: "text.primary" },
              }}
            >
              {i.title}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}
