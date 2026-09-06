"use client";

import { HiPrinter } from "react-icons/hi2";

export function PrintResumeButton() {
  return (
    <button data-js-only className="site-button" type="button" onClick={() => window.print()}>
      <HiPrinter aria-hidden="true" />
      Print / Save PDF
    </button>
  );
}
