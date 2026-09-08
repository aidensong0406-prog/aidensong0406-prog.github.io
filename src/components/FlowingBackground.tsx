"use client";

import { useEffect, useRef } from "react";
import type { ShaderMount, MeshGradientUniforms } from "@paper-design/shaders";
import styles from "./FlowingBackground.module.css";

// Paper Shaders Mesh Gradient: https://shaders.paper.design/mesh-gradient
// Keep the palette within one cool family; all texture/grain is disabled.
const COLORS = ["#f4f8fc", "#b8d0e1", "#8eb3ce", "#e6eff6"];

export function FlowingBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount: HTMLDivElement = mountRef.current;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let shader: ShaderMount | undefined;
    let loading = false;
    let disposed = false;
    let unavailable = false;

    function disposeShader() {
      shader?.canvasElement.removeEventListener("webglcontextlost", handleContextLost);
      shader?.dispose();
      shader = undefined;
    }

    function handleContextLost() {
      unavailable = true;
      disposeShader();
    }

    function syncPlayback() {
      const running =
        root.dataset.theme === "light" &&
        root.dataset.backgroundMotion !== "paused" &&
        !reducedMotion.matches;
      shader?.setSpeed(running ? 0.65 : 0);
      // ShaderMount also stops its animation loop when the document is hidden.
    }

    async function sync() {
      if (disposed) return;
      syncPlayback();
      if (shader || loading || unavailable || root.dataset.theme !== "light") return;
      loading = true;

      try {
        const {
          ShaderMount,
          meshGradientFragmentShader,
          getShaderColorFromString,
          ShaderFitOptions,
        } = await import("@paper-design/shaders");
        if (disposed) return;
        if (root.dataset.theme !== "light") {
          loading = false;
          return;
        }

        const uniforms: MeshGradientUniforms = {
          u_colors: COLORS.map(getShaderColorFromString),
          u_colorsCount: COLORS.length,
          u_distortion: 0.95,
          u_swirl: 0.45,
          u_grainMixer: 0,
          u_grainOverlay: 0,
          u_fit: ShaderFitOptions.cover,
          u_rotation: 0,
          u_scale: 1,
          u_originX: 0.5,
          u_originY: 0.5,
          u_offsetX: 0,
          u_offsetY: 0,
          u_worldWidth: 0,
          u_worldHeight: 0,
        };

        shader = new ShaderMount(
          mount,
          meshGradientFragmentShader,
          { ...uniforms },
          { alpha: false, antialias: false, powerPreference: "low-power" },
          0,
          12000,
          1,
          900_000,
        );
        shader.canvasElement.addEventListener("webglcontextlost", handleContextLost);
        syncPlayback();
      } catch {
        // Leave the static palette visible if WebGL or the optional chunk is unavailable.
        unavailable = true;
        disposeShader();
        mount.querySelector("canvas")?.remove();
      }
    }

    const observer = new MutationObserver(() => void sync());
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "data-background-motion"],
    });
    reducedMotion.addEventListener("change", syncPlayback);
    void sync();

    return () => {
      disposed = true;
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      disposeShader();
    };
  }, []);

  return (
    <div className={styles.background} aria-hidden="true" data-flowing-background>
      <div ref={mountRef} className={styles.canvas} />
    </div>
  );
}
