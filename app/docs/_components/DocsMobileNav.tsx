"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Drawer,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon  from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { DocsSidebar } from "./DocsSidebar";
import { DocsSearch }  from "./DocsSearch";

const DRAWER_W = 280;

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* Hamburger — only on small screens */}
      <IconButton
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        size="small"
        sx={{
          display: { lg: "none" },
          color: "text.secondary",
          "&:hover": { color: "text.primary", bgcolor: "action.hover" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* MUI Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_W,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <NextLink href="/docs" onClick={() => setOpen(false)}>
            <Image
              src="/kashvi2.png"
              alt="Kashvi"
              width={120}
              height={36}
              style={{ height: 30, width: "auto", objectFit: "contain" }}
            />
          </NextLink>
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ px: 1.5, py: 1.5 }}>
          <DocsSearch />
        </Box>

        <Divider />

        {/* Nav links */}
        <Box
          sx={{ flex: 1, overflowY: "auto", px: 1, py: 1 }}
          onClick={() => setOpen(false)}
        >
          <DocsSidebar />
        </Box>
      </Drawer>
    </>
  );
}
