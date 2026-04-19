"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import {
  Box,
  InputBase,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { docsSearchIndex } from "../_content/nav";

function norm(s: string) {
  return s.toLowerCase().trim();
}

export function DocsSearch() {
  const [q, setQ]                   = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = norm(q);

  const results = useMemo(() => {
    if (!query) return [];
    return docsSearchIndex
      .map((item) => {
        const hay = norm([item.title, item.description, item.keywords.join(" ")].join(" "));
        return { item, score: hay.includes(query) ? 1 : 0 };
      })
      .filter((r) => r.score > 0)
      .slice(0, 10)
      .map((r) => r.item);
  }, [query]);

  useEffect(() => { setSelectedIndex(0); }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (results.length > 0) {
        if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((p) => (p + 1) % results.length); }
        if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIndex((p) => (p - 1 + results.length) % results.length); }
        if (e.key === "Enter") {
          e.preventDefault();
          const result = results[selectedIndex];
          if (result) window.location.href = result.href;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [results, selectedIndex]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Search input */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          px: 1.5,
          py: 0.35,
          gap: 1,
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: (t) => `0 0 0 3px ${t.palette.primary.main}22`,
          },
          transition: "box-shadow 0.2s, border-color 0.2s",
        }}
      >
        <SearchIcon sx={{ fontSize: 17, color: "text.secondary", flexShrink: 0 }} />
        <InputBase
          inputRef={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documentation..."
          fullWidth
          inputProps={{ "aria-label": "search documentation" }}
          sx={{
            fontSize: "0.875rem",
            color: "text.primary",
            "& input::placeholder": { color: "text.secondary", opacity: 1 },
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 0.5,
            flexShrink: 0,
            pointerEvents: "none",
          }}
        >
          {["⌘", "K"].map((k) => (
            <Box
              key={k}
              component="kbd"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 18,
                minWidth: 18,
                px: 0.75,
                borderRadius: "4px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.625rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {k}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Results dropdown */}
      {results.length > 0 ? (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 6px)",
            zIndex: 9999,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ maxHeight: 380, overflowY: "auto" }}>
            {results.map((r, i) => (
              <Box
                key={r.href}
                component={NextLink}
                href={r.href}
                onClick={() => setQ("")}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.25,
                  px: 2,
                  py: 1.25,
                  textDecoration: "none",
                  borderLeft: "2px solid",
                  borderColor: i === selectedIndex ? "primary.main" : "transparent",
                  bgcolor: i === selectedIndex ? "primary.50" : "background.paper",
                  "&:hover": { bgcolor: "action.hover" },
                  transition: "background 0.15s",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {r.title}
                </Typography>
                {r.description && (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {r.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          <Divider />
          <Box
            sx={{ px: 2, py: 0.75, bgcolor: "background.default", display: "flex", gap: 1 }}
          >
            <Typography variant="caption" color="text.secondary">
              Use{" "}
              <Box component="kbd" sx={{ fontFamily: "monospace", fontWeight: 600 }}>↑↓</Box>
              {" "}to navigate,{" "}
              <Box component="kbd" sx={{ fontFamily: "monospace", fontWeight: 600 }}>Enter</Box>
              {" "}to select
            </Typography>
          </Box>
        </Paper>
      ) : q ? (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            left: 0, right: 0,
            top: "calc(100% + 6px)",
            zIndex: 9999,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "10px",
            px: 3, py: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No results for &ldquo;{q}&rdquo;
          </Typography>
        </Paper>
      ) : null}
    </Box>
  );
}
