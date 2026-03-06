"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "../_content/nav";

function isActive(pathname: string, href: string) {
  if (href === "/docs") return pathname === "/docs";
  return pathname === href || pathname.startsWith(href + "/");
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      {docsNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {group.title}
          </div>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                  ].join(" ")}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

