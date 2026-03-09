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
    <nav className="flex flex-col gap-8">
      {docsNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 pl-4 text-gradient">
            {group.title}
          </h3>
          <ul className="flex flex-col gap-1.5 border-l border-zinc-300/50 dark:border-zinc-700/50 ml-0">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "group relative flex w-full items-center rounded-r-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-2",
                      active
                        ? "border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-950/40 dark:to-transparent text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm"
                        : "border-l-transparent text-zinc-600 dark:text-zinc-400 hover:border-l-indigo-300 dark:hover:border-l-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
