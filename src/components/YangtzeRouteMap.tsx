"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { FiMaximize2, FiMinus, FiPlus } from "react-icons/fi";
import { expeditionRegions } from "@/resources/yangtze-expedition";
import mapImage from "@/resources/yangtze-map-image.json";
import styles from "./YangtzeRouteMap.module.css";

const MAX_ZOOM = 3;
const RADIUS = 6378137;

// The coordinates use the exact Web Mercator extent returned with the map export.
// Labels identify broad regions; they do not imply sampling GPS coordinates.
const places = expeditionRegions.map((region) => {
  const [longitude, latitude] = region.coordinates;
  const x = (RADIUS * longitude * Math.PI) / 180;
  const y = RADIUS * Math.log(Math.tan(Math.PI / 4 + (latitude * Math.PI) / 360));
  return {
    ...region,
    x: (x - mapImage.extent.xmin) / (mapImage.extent.xmax - mapImage.extent.xmin),
    y: (mapImage.extent.ymax - y) / (mapImage.extent.ymax - mapImage.extent.ymin),
  };
});

type Offset = { x: number; y: number };

export function YangtzeRouteMap({
  activeRegionId,
  onSelectRegion,
  detailsId,
}: {
  activeRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  detailsId: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ start: Offset; pan: Offset } | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const [pan, setPan] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const active = places.find((place) => place.id === activeRegionId);

  function bounded(offset: Offset, scale = zoom): Offset {
    const maxX = (size.width * (scale - 1)) / 2;
    const maxY = (size.height * (scale - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, offset.x)),
      y: Math.max(-maxY, Math.min(maxY, offset.y)),
    };
  }

  function fullRoute() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function changeZoom(value: number) {
    const next = Math.max(1, Math.min(MAX_ZOOM, value));
    setZoom(next);
    setPan(
      bounded(
        active
          ? {
              x: (0.5 - active.x) * size.width * next,
              y: (0.5 - active.y) * size.height * next,
            }
          : { x: (pan.x * next) / zoom, y: (pan.y * next) / zoom },
        next,
      ),
    );
  }

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      setSize({ width: element.clientWidth, height: element.clientHeight });
      // Reset a crop when the viewport changes so every region remains reachable.
      setZoom(1);
      setPan({ x: 0, y: 0 });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // A sidebar selection brings its region into view if the reader has zoomed in.
  useEffect(() => {
    if (!activeRegionId) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    const place = places.find((item) => item.id === activeRegionId);
    const element = viewport.current;
    if (!place || !element) return;
    const currentZoom = zoomRef.current;
    if (currentZoom > 1) {
      const maxX = (element.clientWidth * (currentZoom - 1)) / 2;
      const maxY = (element.clientHeight * (currentZoom - 1)) / 2;
      setPan({
        x: Math.max(-maxX, Math.min(maxX, (0.5 - place.x) * element.clientWidth * currentZoom)),
        y: Math.max(-maxY, Math.min(maxY, (0.5 - place.y) * element.clientHeight * currentZoom)),
      });
    }
  }, [activeRegionId]);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (zoom === 1 || event.button !== 0 || (event.target as Element).closest("button, a")) return;
    drag.current = { start: { x: event.clientX, y: event.clientY }, pan };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setPan(
      bounded({
        x: drag.current.pan.x + event.clientX - drag.current.start.x,
        y: drag.current.pan.y + event.clientY - drag.current.start.y,
      }),
    );
  }

  function endDrag() {
    drag.current = null;
    setDragging(false);
  }

  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      changeZoom(zoom + 0.5);
      return;
    }
    if (event.key === "-") {
      event.preventDefault();
      changeZoom(zoom - 0.5);
      return;
    }
    if (event.key === "Escape" || event.key === "0") {
      event.preventDefault();
      fullRoute();
      return;
    }
    if (zoom === 1) return;
    const moves: Record<string, Offset> = {
      ArrowLeft: { x: 60, y: 0 },
      ArrowRight: { x: -60, y: 0 },
      ArrowUp: { x: 0, y: 60 },
      ArrowDown: { x: 0, y: -60 },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setPan(bounded({ x: pan.x + move.x, y: pan.y + move.y }));
  }

  return (
    <div
      className={styles.column}
      data-map-view="local-image"
      data-map-zoom={zoom}
      onKeyDown={keyDown}
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarHeading}>
          <span>{active?.name ?? "Explore the river"}</span>
          <button className={styles.resetButton} type="button" onClick={fullRoute}>
            <FiMaximize2 aria-hidden="true" /> Full route
          </button>
        </div>
        <fieldset className={styles.zoomControls} aria-label="Map zoom">
          <button
            type="button"
            onClick={() => changeZoom(zoom - 0.5)}
            disabled={zoom === 1}
            aria-label="Zoom out"
            aria-controls={`${detailsId}-map`}
            aria-describedby={`${detailsId}-zoom-help`}
          >
            <FiMinus aria-hidden="true" /> Zoom out
          </button>
          <output className={styles.zoomLevel} aria-label="Map magnification" aria-live="polite">
            {Math.round(zoom * 100)}%
          </output>
          <button
            type="button"
            onClick={() => changeZoom(zoom + 0.5)}
            disabled={zoom === MAX_ZOOM}
            aria-label="Zoom in"
            aria-controls={`${detailsId}-map`}
            aria-describedby={`${detailsId}-zoom-help`}
          >
            <FiPlus aria-hidden="true" /> Zoom in
          </button>
        </fieldset>
      </div>
      <div
        ref={viewport}
        id={`${detailsId}-map`}
        className={`${styles.viewport} ${zoom > 1 ? styles.zoomed : ""} ${dragging ? styles.dragging : ""}`}
        style={{ aspectRatio: `${mapImage.image.width} / ${mapImage.image.height}` }}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div
          className={styles.imagePlane}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            backgroundImage: `url("${mapImage.preview}")`,
          }}
        >
          <img
            src={mapImage.image.src}
            width={mapImage.image.width}
            height={mapImage.image.height}
            alt="Complete terrain map of the Yangtze journey, from the mountains of Yunnan through Yibin, Luzhou, the Three Gorges and Yichang to Wuhan."
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
        </div>
        <fieldset className={styles.places} aria-label="Select an expedition region">
          {places.map((place, index) => {
            const x = 0.5 + (place.x - 0.5) * zoom;
            const y = 0.5 + (place.y - 0.5) * zoom;
            const visible =
              zoom === 1 ||
              (x * size.width + pan.x > 45 &&
                x * size.width + pan.x < size.width - 45 &&
                y * size.height + pan.y > 55 &&
                y * size.height + pan.y < size.height - 55);
            return (
              <div
                key={place.id}
                className={`${styles.place} ${styles[place.id]}`}
                style={{
                  left: `calc(${x * 100}% + ${pan.x}px)`,
                  top: `calc(${y * 100}% + ${pan.y}px)`,
                  visibility: visible ? "visible" : "hidden",
                }}
              >
                <span className={styles.anchor} aria-hidden="true" />
                <button
                  type="button"
                  className={styles.placeButton}
                  aria-label={`Explore ${place.name}, ${place.stops.length} ${place.stops.length === 1 ? "stop" : "stops"}`}
                  aria-pressed={activeRegionId === place.id}
                  aria-controls={detailsId}
                  tabIndex={visible ? 0 : -1}
                  onClick={() => onSelectRegion(place.id)}
                >
                  <span className={styles.placeNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    {place.name}
                    <span className={styles.chinese} lang="zh">
                      {place.chinese}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </fieldset>
        {zoom > 1 && <span className={styles.dragHint}>Drag to explore</span>}
        <p id={`${detailsId}-zoom-help`} className={styles.srOnly}>
          Zoom from 100 to 300 percent. After zooming, drag the map or use the arrow keys while a map
          control is focused. Use plus and minus to zoom, or Escape, zero, or Full route to reset.
        </p>
      </div>
      <div className={styles.caption}>
        <span>Regional markers; exact sampling sites to follow.</span>
        <a href={mapImage.source.url} target="_blank" rel="noreferrer">
          Map © Esri and contributors
        </a>
      </div>
    </div>
  );
}
