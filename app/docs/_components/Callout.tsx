import type { ReactNode } from "react";

const styles: Record<
  "note" | "tip" | "caution" | "warning" | "success",
  { 
    wrapper: string
    title: string
    icon: string
    border: string
  }
> = {
  note: {
    wrapper: "bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10 text-blue-900 dark:text-blue-100",
    title: "text-blue-950 dark:text-blue-100 font-semibold",
    icon: "ℹ️",
    border: "border-l-4 border-blue-400 dark:border-blue-600",
  },
  tip: {
    wrapper: "bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-950/10 text-emerald-900 dark:text-emerald-100",
    title: "text-emerald-950 dark:text-emerald-100 font-semibold",
    icon: "💡",
    border: "border-l-4 border-emerald-400 dark:border-emerald-600",
  },
  caution: {
    wrapper: "bg-gradient-to-br from-amber-50 to-amber-50/50 dark:from-amber-950/30 dark:to-amber-950/10 text-amber-900 dark:text-amber-100",
    title: "text-amber-950 dark:text-amber-100 font-semibold",
    icon: "⚠️",
    border: "border-l-4 border-amber-400 dark:border-amber-600",
  },
  warning: {
    wrapper: "bg-gradient-to-br from-red-50 to-red-50/50 dark:from-red-950/30 dark:to-red-950/10 text-red-900 dark:text-red-100",
    title: "text-red-950 dark:text-red-100 font-semibold",
    icon: "🚨",
    border: "border-l-4 border-red-400 dark:border-red-600",
  },
  success: {
    wrapper: "bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/10 text-green-900 dark:text-green-100",
    title: "text-green-950 dark:text-green-100 font-semibold",
    icon: "✓",
    border: "border-l-4 border-green-400 dark:border-green-600",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "tip" | "caution" | "warning" | "success";
  title: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`mt-6 mb-6 rounded-lg ${s.border} ${s.wrapper} p-4 backdrop-blur-sm shadow-sm`}>
      <div className={`flex items-start gap-3`}>
        <div className="text-lg flex-shrink-0 mt-0.5">{s.icon}</div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm ${s.title}`}>{title}</div>
          <div className="mt-2 text-sm leading-6 opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}

