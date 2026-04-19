"use client";

import { type ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// Always render with the light theme on both server and client.
// Dark-mode is handled by CSS media queries in theme.ts component overrides,
// so there is no client/server mismatch.
import { lightTheme } from "../theme";

export function MuiProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
