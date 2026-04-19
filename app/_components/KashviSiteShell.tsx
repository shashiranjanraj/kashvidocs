"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DocsMobileNav } from "../docs/_components/DocsMobileNav";
import { DocsSearch } from "../docs/_components/DocsSearch";
import { DocsSidebar } from "../docs/_components/DocsSidebar";
import { Toc } from "../docs/_components/Toc";

const SIDEBAR_W = 256;
const TOC_W     = 220;
const HEADER_H  = 60;

type Props = {
  children: ReactNode;
  showToc?: boolean;
};

export function KashviSiteShell({ children, showToc = true }: Props) {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>

      {/* ── Top AppBar ───────────────────────────────────────── */}
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 2, px: { xs: 2, md: 3 } }}>

          {/* Mobile hamburger */}
          <DocsMobileNav />

          {/* Logo */}
          <NextLink href="/docs" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image
              src="/kashvi2.png"
              alt="Kashvi"
              width={120}
              height={36}
              style={{ height: 32, width: "auto", objectFit: "contain", objectPosition: "left" }}
            />
            <Typography
              variant="body2"
              fontWeight={700}
              letterSpacing={-0.3}
              sx={{ display: { xs: "none", sm: "block" }, color: "text.primary" }}
            >
              Docs
            </Typography>
          </NextLink>

          {/* Search — centred */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: 400, display: { xs: "none", sm: "block" } }}>
              <DocsSearch />
            </Box>
          </Box>

          {/* Right actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/shashiranjanraj/kashvi"
                target="_blank"
                rel="noreferrer"
                size="small"
                sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
              >
                <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2Z" />
                </svg>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Body: sidebar | content | toc ────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          pt: `${HEADER_H}px`,
          maxWidth: 1380,
          mx: "auto",
          width: "100%",
          px: { xs: 0, lg: 2 },
        }}
      >
        {/* Left sidebar */}
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_W,
            flexShrink: 0,
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            borderRight: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: HEADER_H,
            height: `calc(100vh - ${HEADER_H}px)`,
            overflowY: "auto",
            overflowX: "hidden",
            pt: 3,
            pb: 2,
            px: 1.5,
          }}
        >
          <DocsSidebar />
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 4, md: 5 },
          }}
        >
          <Container
            disableGutters
            maxWidth={false}
            sx={{ maxWidth: 720 }}
          >
            {children}
          </Container>
        </Box>

        {/* Right TOC */}
        {showToc && (
          <Box
            component="aside"
            sx={{
              width: TOC_W,
              flexShrink: 0,
              display: { xs: "none", xl: "block" },
              position: "sticky",
              top: HEADER_H,
              height: `calc(100vh - ${HEADER_H}px)`,
              overflowY: "auto",
              pt: 4,
              pb: 2,
              pl: 3,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", mb: 1.5, display: "block" }}
            >
              On this page
            </Typography>
            <Toc />
          </Box>
        )}
      </Box>
    </Box>
  );
}
