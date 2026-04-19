import type { ReactNode } from "react";

export type FileTreeItem = {
  name: string;
  description?: string;
  highlight?: boolean;
  isDir?: boolean;
  children?: FileTreeItem[];
};

function FileTreeNode({
  item,
  depth,
  isLast,
  prefix,
}: {
  item: FileTreeItem;
  depth: number;
  isLast: boolean;
  prefix: string;
}) {
  const connector = isLast ? "└── " : "├── ";
  const childPrefix = prefix + (isLast ? "    " : "│   ");

  const icon = item.isDir
    ? "📁"
    : item.name.endsWith(".go")
    ? "🔷"
    : item.name.endsWith(".env") || item.name.startsWith(".env")
    ? "🔑"
    : item.name.endsWith(".json")
    ? "📋"
    : item.name.endsWith(".mod") || item.name.endsWith(".sum")
    ? "📦"
    : "📄";

  return (
    <>
      <div
        className={[
          "flex items-start gap-2 font-mono text-[13px] leading-6 py-0.5",
          item.highlight
            ? "text-indigo-700 dark:text-indigo-300 font-semibold"
            : "text-zinc-700 dark:text-zinc-300",
        ].join(" ")}
      >
        <span className="whitespace-pre text-zinc-400 dark:text-zinc-600 select-none flex-shrink-0">
          {prefix}
          {connector}
        </span>
        <span
          className={[
            "flex items-center gap-1.5 flex-shrink-0",
            item.highlight
              ? "text-indigo-700 dark:text-indigo-300"
              : "",
          ].join(" ")}
        >
          <span className="text-[11px]">{icon}</span>
          <span
            className={[
              item.isDir
                ? "font-bold text-zinc-900 dark:text-zinc-100"
                : "",
              item.highlight
                ? "underline decoration-dotted decoration-indigo-400 underline-offset-2"
                : "",
            ].join(" ")}
          >
            {item.name}
          </span>
        </span>
        {item.description && (
          <span className="text-zinc-400 dark:text-zinc-500 font-sans text-[12px] ml-1 italic">
            {/* em-dash separator */}
            <span className="mr-1 not-italic text-zinc-300 dark:text-zinc-600 font-mono">
              {"←"}
            </span>
            {item.description}
          </span>
        )}
      </div>
      {item.children?.map((child, i) => (
        <FileTreeNode
          key={child.name}
          item={child}
          depth={depth + 1}
          isLast={i === (item.children?.length ?? 0) - 1}
          prefix={childPrefix}
        />
      ))}
    </>
  );
}

export function FileTree({
  root,
  items,
  caption,
}: {
  /** Optional root label shown at top (e.g. "myproject/") */
  root?: string;
  items: FileTreeItem[];
  /** Small caption below the tree */
  caption?: ReactNode;
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-900/50 shadow-sm">
      {root && (
        <div className="border-b border-zinc-200 dark:border-zinc-700/60 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <span className="font-mono text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
            📁 {root}
          </span>
        </div>
      )}
      <div className="px-4 py-3">
        {items.map((item, i) => (
          <FileTreeNode
            key={item.name}
            item={item}
            depth={0}
            isLast={i === items.length - 1}
            prefix=""
          />
        ))}
      </div>
      {caption && (
        <div className="border-t border-zinc-200 dark:border-zinc-700/60 px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400">
          {caption}
        </div>
      )}
    </div>
  );
}
