import type { ReactNode } from "react";
import { Box, Chip, Typography } from "@mui/material";

type Props = {
  eyebrow?: string;
  id?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

export function DocsPageHeader({
  eyebrow = "Documentation",
  id,
  title,
  description,
  children,
}: Props) {
  return (
    <Box
      sx={{
        mb: 5,
        pb: 4,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Chip
        label={eyebrow}
        size="small"
        variant="outlined"
        color="primary"
        sx={{
          mb: 1.5,
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          height: 22,
          borderRadius: "5px",
        }}
      />
      <Typography
        component="h1"
        id={id}
        sx={{
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          color: "text.primary",
          mb: description ? 1.5 : 0,
          scrollMarginTop: "80px",
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640, lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
}
