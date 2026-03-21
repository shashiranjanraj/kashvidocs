import type { ReactNode } from "react";
import { KashviSiteShell } from "../_components/KashviSiteShell";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <KashviSiteShell>{children}</KashviSiteShell>;
}
