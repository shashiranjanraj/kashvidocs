"use client";

import { createTheme } from "@mui/material/styles";

// ─── Shared design tokens ─────────────────────────────────────────────────────
const INDIGO = {
  50:  "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
};

// ─── Light theme ─────────────────────────────────────────────────────────────
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary:   { main: INDIGO[700], light: INDIGO[500], dark: INDIGO[900] },
    secondary: { main: "#64748b" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    text: {
      primary:   "#0f172a",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2rem",    fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.03em" },
    h2: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.4,  letterSpacing: "-0.01em" },
    h3: { fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.5 },
    h4: { fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: "0.9375rem", lineHeight: 1.75 },
    body2: { fontSize: "0.875rem",  lineHeight: 1.6 },
    caption: { fontSize: "0.75rem", lineHeight: 1.5, color: "#64748b" },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    fontWeightBold: 700,
  },
  shape: { borderRadius: 8 },
  shadows: [
    "none",
    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
    "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
    "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)",
    "0 20px 25px -5px rgb(0 0 0 / 0.07), 0 8px 10px -6px rgb(0 0 0 / 0.07)",
    ...Array(19).fill("none"),
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": { boxSizing: "border-box" },
        html: { scrollBehavior: "smooth" },
        body: {
          backgroundColor: "#f8fafc",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        a: { color: "inherit", textDecoration: "none" },
        "::selection": { backgroundColor: `${INDIGO[500]}40` },
        "::-webkit-scrollbar": { width: "6px", height: "6px" },
        "::-webkit-scrollbar-track": { background: "transparent" },
        "::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "999px" },
        "::-webkit-scrollbar-thumb:hover": { background: "#94a3b8" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: INDIGO[700],
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": { color: INDIGO[600], textDecoration: "underline", textUnderlineOffset: "3px" },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "12px",
          paddingRight: "12px",
          fontSize: "0.875rem",
          color: "#475569",
          transition: "background 0.15s, color 0.15s",
          "&:hover": { backgroundColor: INDIGO[50], color: "#0f172a" },
          "&.Mui-selected": {
            backgroundColor: INDIGO[50],
            color: INDIGO[700],
            fontWeight: 600,
            "&:hover": { backgroundColor: INDIGO[100] },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "6px", fontWeight: 600, letterSpacing: "0.02em" },
        sizeSmall: { height: "20px", fontSize: "0.65rem" },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "8px", fontSize: "0.875rem", border: "1px solid transparent" },
        colorInfo:    { borderColor: "#bae6fd", backgroundColor: "#f0f9ff" },
        colorSuccess: { borderColor: "#bbf7d0", backgroundColor: "#f0fdf4" },
        colorWarning: { borderColor: "#fde68a", backgroundColor: "#fffbeb" },
        colorError:   { borderColor: "#fecaca", backgroundColor: "#fef2f2" },
        message: { lineHeight: 1.65 },
        icon: { alignItems: "flex-start", paddingTop: "14px" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        outlined: { borderColor: "#e2e8f0" },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "#e2e8f0" } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(248,250,252,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "none",
          color: "#0f172a",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: { root: { minHeight: "60px !important" } },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0" },
      },
    },
  },
});

// ─── Dark theme ───────────────────────────────────────────────────────────────
const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: "dark",
    primary:   { main: INDIGO[400], light: INDIGO[300], dark: INDIGO[600] },
    secondary: { main: "#94a3b8" },
    background: { default: "#0a0a0f", paper: "#111118" },
    text: {
      primary:   "#f1f5f9",
      secondary: "#94a3b8",
    },
    divider: "#1e293b",
  },
  components: {
    ...lightTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...((lightTheme.components?.MuiCssBaseline?.styleOverrides as object) ?? {}),
        body: {
          backgroundColor: "#0a0a0f",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::-webkit-scrollbar-thumb": { background: "#334155" },
        "::-webkit-scrollbar-thumb:hover": { background: "#475569" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #1e293b",
          boxShadow: "none",
          color: "#f1f5f9",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#111118", borderRight: "1px solid #1e293b" },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "#1e293b" } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", backgroundColor: "#111118" },
        outlined: { borderColor: "#1e293b" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ...((lightTheme.components?.MuiListItemButton?.styleOverrides?.root as object) ?? {}),
          color: "#94a3b8",
          "&:hover": { backgroundColor: "rgba(99,102,241,0.08)", color: "#f1f5f9" },
          "&.Mui-selected": {
            backgroundColor: "rgba(99,102,241,0.12)",
            color: INDIGO[300],
            fontWeight: 600,
            "&:hover": { backgroundColor: "rgba(99,102,241,0.18)" },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: "8px", fontSize: "0.875rem", border: "1px solid transparent" },
        colorInfo:    { borderColor: "#075985", backgroundColor: "#0c1e2e" },
        colorSuccess: { borderColor: "#065f46", backgroundColor: "#0a1f18" },
        colorWarning: { borderColor: "#92400e", backgroundColor: "#1f1500" },
        colorError:   { borderColor: "#991b1b", backgroundColor: "#1f0606" },
        message: { lineHeight: 1.65, color: "#e2e8f0" },
      },
    },
  },
});

export { lightTheme, darkTheme };
