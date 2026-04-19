"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { docsNav } from "../_content/nav";

function isActive(pathname: string, href: string) {
  if (href === "/docs") return pathname === "/docs";
  return pathname === href || pathname.startsWith(href + "/");
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Nav groups */}
      <Box sx={{ flex: 1 }}>
        {docsNav.map((group) => (
          <List
            key={group.title}
            disablePadding
            subheader={
              <ListSubheader
                disableGutters
                disableSticky
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  px: 1.5,
                  pt: 2,
                  pb: 0.5,
                  lineHeight: 2,
                  bgcolor: "transparent",
                }}
              >
                {group.title}
              </ListSubheader>
            }
            sx={{ mb: 1 }}
          >
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <ListItemButton
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  selected={active}
                  sx={{
                    borderRadius: "6px",
                    px: 1.5,
                    py: 0.75,
                    mb: 0.25,
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        fontSize: "0.875rem",
                        fontWeight: active ? 600 : 400,
                        noWrap: true,
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>

      {/* Creator card — pinned bottom */}
      <Box>
        <Divider sx={{ my: 1.5 }} />
        <ListItemButton
          component={NextLink}
          href="/profile/kashvi"
          sx={{ borderRadius: "8px", px: 1.5, py: 1 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: "0.75rem",
                bgcolor: "primary.main",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              SR
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
                Built by Shashi
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Creator of Kashvi
              </Typography>
            </Box>
          </Stack>
        </ListItemButton>
      </Box>
    </Box>
  );
}
