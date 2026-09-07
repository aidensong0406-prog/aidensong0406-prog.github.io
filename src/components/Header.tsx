"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { transitionProfile } from "@/utils/viewTransitions";
import { getProjectSection, siteSections } from "@/resources/site-sections";

export const Header = () => {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const projectSection = pathname.startsWith("/work/")
    ? getProjectSection(pathname.slice("/work/".length))
    : undefined;
  const sectionPath = projectSection?.path.replace(/\/$/, "");
  return (
    <header className="site-header">
      <nav className="site-navigation" aria-label="Main navigation">
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          ...[siteSections.climate, siteSections.music, siteSections.projects].map((section) => ({
            href: section.path,
            label: section.label,
          })),
        ].map((item) => {
          const itemPath = item.href.replace(/\/$/, "") || "/";
          const selected = pathname === itemPath || sectionPath === itemPath;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={selected ? "page" : undefined}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                if (pathname === itemPath && window.location.hash) {
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
