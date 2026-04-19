import type { ReactNode } from "react";
import { Alert, AlertTitle } from "@mui/material";

type CalloutType = "note" | "tip" | "caution" | "warning" | "success";

const severityMap: Record<CalloutType, "info" | "success" | "warning" | "error"> = {
  note:    "info",
  tip:     "success",
  caution: "warning",
  warning: "error",
  success: "success",
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title: string;
  children: ReactNode;
}) {
  return (
    <Alert
      severity={severityMap[type]}
      variant="standard"
      sx={{ my: 2.5, "& .MuiAlert-message": { width: "100%" } }}
    >
      <AlertTitle sx={{ fontWeight: 700, fontSize: "0.875rem", mb: 0.5 }}>
        {title}
      </AlertTitle>
      <span style={{ fontSize: "0.875rem", lineHeight: 1.65 }}>{children}</span>
    </Alert>
  );
}
