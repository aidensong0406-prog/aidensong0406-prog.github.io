"use client";

import { useEffect, useState } from "react";
import styles from "./BackgroundMotionToggle.module.css";

export function BackgroundMotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(document.documentElement.dataset.backgroundMotion === "paused");
  }, []);

  function toggle() {
    const nextPaused = !paused;
    document.documentElement.dataset.backgroundMotion = nextPaused ? "paused" : "running";
    setPaused(nextPaused);
    try {
      localStorage.setItem("background-motion", nextPaused ? "paused" : "running");
    } catch {
      // The control also works without browser storage.
    }
  }

  return (
    <button className={styles.button} type="button" onClick={toggle}>
      {paused ? "Resume background" : "Pause background"}
    </button>
  );
}
