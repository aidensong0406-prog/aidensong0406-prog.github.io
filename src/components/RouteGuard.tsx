"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/resources";
import NotFound from "@/app/not-found";

// Controls navigation visibility for this public site; this is not authentication.
export function RouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const isEnabled = Boolean(
    pathname &&
      (routes[pathname as keyof typeof routes] ||
        (["/blog", "/work"] as const).some(
          (route) => routes[route] && pathname.startsWith(`${route}/`),
        )),
  );

  return isEnabled ? <>{children}</> : <NotFound />;
}
