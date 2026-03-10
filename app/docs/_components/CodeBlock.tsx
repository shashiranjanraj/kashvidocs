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
        "mt-6 mb-8 overflow-hidden text-sm",
        isTerminal ? "terminal-codeblock bg-black" : "rounded-lg border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/30 text-zinc-900 dark:text-zinc-100 shadow-lg",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between px-4 py-3 text-xs font-medium",
          isTerminal
            ? "bg-black text-zinc-500"
            : "border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900/60 dark:to-zinc-800/40 text-zinc-600 dark:text-zinc-300",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          {isTerminal ? (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="hidden text-[11px] text-zinc-500 font-mono sm:inline">
                {headerLabel}
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold uppercase tracking-wide text-[10px]">
                {headerLabel}
              </span>
              {highlightLanguage ? (
                <span className="hidden px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono text-[11px] sm:inline">
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
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all hover:shadow-md",
            isTerminal
              ? "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors",
          ].join(" ")}
        >
          <span aria-hidden="true">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12m0 0l-1.41 1.41L9 19 21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="4" y="4" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            )}
          </span>
          <span className="font-medium">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre
        className={[
          "max-h-[500px] overflow-x-auto overflow-y-auto py-4 text-[13px] leading-6 font-mono",
          isTerminal
            ? "bg-black text-white pl-8 pr-4"
            : "px-4 bg-transparent text-zinc-900 dark:text-zinc-100",
        ].join(" ")}
        style={{ marginLeft: "20px" }}
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


