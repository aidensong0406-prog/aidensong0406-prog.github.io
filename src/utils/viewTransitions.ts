"use client";

import { flushSync } from "react-dom";

let activePanelTransition: ViewTransition | undefined;

export function transitionProfile(update: () => void) {
  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }

  activePanelTransition?.skipTransition();
  document.documentElement.dataset.transitionKind = "profile";
  const transition = document.startViewTransition(() => flushSync(update));
  activePanelTransition = transition;

  // A newer selection can skip the outgoing animation without losing its state update.
  void transition.ready.catch(() => {});
  void transition.finished
    .catch(() => {})
    .finally(() => {
      if (activePanelTransition === transition) {
        activePanelTransition = undefined;
        delete document.documentElement.dataset.transitionKind;
      }
    });
}
