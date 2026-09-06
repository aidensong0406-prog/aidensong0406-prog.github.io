"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { transitionProfile } from "@/utils/viewTransitions";

export const Header = () => {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  return (
    <header className="site-header">
      <nav className="site-navigation" aria-label="Main navigation">
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/work", label: "Experiences" },
          { href: "/honors", label: "Honors" },
        ].map((item) => {
          const selected = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={selected ? "page" : undefined}
              onClick={(event) => {
                if (pathname === item.href && window.location.hash) {
                  event.preventDefault();
                  const resetSection = () => {
                    window.history.pushState(null, "", item.href);
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                    window.scrollTo({ top: 0 });
                  };
                  if (pathname === "/about") transitionProfile(resetSection);
                  else resetSection();
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
        <span className="navigation-theme" data-js-only>
          <ThemeToggle />
        </span>
      </nav>
    </header>
  );
};
