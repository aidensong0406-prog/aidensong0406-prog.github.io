"use client";

import { useEffect, useState } from "react";
import { ActionArrow } from "./ActionArrow";

type LegacyPageRedirectProps = {
  title: string;
  href: string;
  hashRedirects?: Record<string, string>;
};

export function LegacyPageRedirect({ title, href, hashRedirects }: LegacyPageRedirectProps) {
  const [destination, setDestination] = useState(href);

  useEffect(() => {
    const target = hashRedirects?.[window.location.hash] ?? href;
    setDestination(target);
    window.location.replace(target);
  }, [href, hashRedirects]);

  return (
    <main id="main-content" className="portfolio-shell subpage">
      <header className="page-heading">
        <h1>{title}</h1>
        <p>This page has moved.</p>
        <div className="profile-actions">
          <a className="site-button" href={destination}>
            Continue
            <ActionArrow />
          </a>
        </div>
      </header>
    </main>
  );
}
