"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Prism from "prismjs";

// Import Prism themes and languages
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "prismjs/components/prism-go";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

type CodeBlockProps = {
  children: ReactNode;
  title?: string;
  /**
   * Hint to force a specific style.
   * If omitted, we auto-detect based on content.
   */
  kind?: "code" | "terminal";
  /**
   * Language for syntax highlighting (e.g., 'go', 'sql', 'javascript')
   */
  language?: string;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    // @ts-expect-error – best-effort extraction from ReactElement
    return extractText(node.props?.children);
  }
  return "";
}

function looksLikeTerminal(text: string): boolean {
  const firstLines = text.split("\n").slice(0, 3);
  return firstLines.some((raw) => {
    const line = raw.trim();
    if (!line) return false;
    return (
      line.startsWith("$") ||
      line.startsWith("# ") ||
      line.startsWith("kashvi ") ||
      line.startsWith("go ") ||
      line.startsWith("curl ") ||
      line.startsWith("docker ") ||
      line.startsWith("npm ") ||
      line.startsWith("yarn ") ||
      line.startsWith("pnpm ") ||
      line.startsWith("bun ")
    );
  });
}

export function CodeBlock({ children, title, kind, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const text = useMemo(() => extractText(children), [children]);

  const autoTerminal = looksLikeTerminal(text);
  const isTerminal = kind === "terminal" || (kind === undefined && autoTerminal);
  const isCode = !isTerminal;

  const defaultLanguage = isCode ? "go" : "";
  const highlightLanguage = language || defaultLanguage;

  const headerLabel =
    title ?? (isTerminal ? "Terminal" : highlightLanguage ? highlightLanguage : "Code");

  useEffect(() => {
    if (codeRef.current && highlightLanguage && Prism.languages[highlightLanguage]) {
      Prism.highlightElement(codeRef.current);
    }
  }, [text, highlightLanguage]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // ignore – best-effort
    }
  };

  return (
    <div
      className={[
        "mt-4 overflow-hidden rounded-xl border text-sm",
        isTerminal ? "terminal-codeblock border-zinc-800 bg-black text-white" : "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-100",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between border-b px-3 py-2 text-xs",
          isTerminal
            ? "border-zinc-800 bg-zinc-900 text-zinc-300"
            : "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-2 hidden text-[11px] text-zinc-400 sm:inline">
                {headerLabel}
              </span>
            </>
          ) : (
            <>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {headerLabel}
              </span>
              {highlightLanguage ? (
                <span className="hidden rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-500 sm:inline">
                  {highlightLanguage}
                </span>
              ) : null}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={[
            "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium",
            isTerminal
              ? "text-zinc-300 hover:bg-zinc-800"
              : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800",
          ].join(" ")}
        >
          <span aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="9"
                y="9"
                width="11"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <rect
                x="4"
                y="4"
                width="11"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre
        className={[
          "max-h-[480px] overflow-x-auto overflow-y-auto px-3 py-3 text-[13px] leading-6 font-mono",
          isTerminal
            ? "bg-transparent text-white"
            : "bg-transparent text-zinc-900 dark:text-zinc-100",
        ].join(" ")}
      >
        <code
          ref={codeRef}
          className={highlightLanguage ? `language-${highlightLanguage}` : ""}
        >
          {text}
        </code>
      </pre>
    </div>
  );
}


