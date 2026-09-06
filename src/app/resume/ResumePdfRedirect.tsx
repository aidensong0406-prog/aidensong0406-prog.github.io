"use client";

import { useEffect } from "react";
import { ActionArrow } from "@/components/ActionArrow";

export function ResumePdfRedirect() {
  useEffect(() => {
    window.location.replace("/AidenSongResume0831.pdf");
  }, []);

  return (
    <main id="main-content" className="portfolio-shell">
      <h1>Résumé</h1>
      <a className="site-button" href="/AidenSongResume0831.pdf">
        Open résumé PDF
        <ActionArrow />
      </a>
    </main>
  );
}
