"use client";

import { LayoutProvider } from "@once-ui-system/core";
import { ViewTransitions } from "next-view-transitions";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <LayoutProvider>{children}</LayoutProvider>
    </ViewTransitions>
  );
}
