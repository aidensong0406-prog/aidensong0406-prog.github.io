"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { style } from "@/resources/once-ui.config";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(style.theme === "light" ? "light" : "dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const sync = (event: StorageEvent) => {
      if (event.key === "data-theme" && (event.newValue === "light" || event.newValue === "dark")) {
        document.documentElement.dataset.theme = event.newValue;
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  function toggle() {
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem("data-theme", nextTheme);
    } catch {
      // Switching remains available when the browser blocks saved preferences.
    }
  }

  return (
    <button
      className="theme-button"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}
