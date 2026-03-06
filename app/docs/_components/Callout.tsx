import type { ReactNode } from "react";

const styles: Record<
  "note" | "tip" | "caution",
  { wrapper: string; title: string }
> = {
  note: {
    wrapper:
      "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-300",
    title: "text-zinc-950 dark:text-zinc-50",
  },
  tip: {
    wrapper:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100",
    title: "text-emerald-950 dark:text-emerald-50",
  },
  caution: {
    wrapper:
      "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-50",
    title: "text-amber-950 dark:text-amber-50",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "tip" | "caution";
  title: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`mt-4 rounded-xl border p-4 ${s.wrapper}`}>
      <div className={`text-sm font-semibold ${s.title}`}>{title}</div>
      <div className="mt-2 text-sm leading-6">{children}</div>
    </div>
  );
}

