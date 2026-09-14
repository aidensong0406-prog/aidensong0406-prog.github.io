"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Map as LibreMap, Marker } from "maplibre-gl";
import { FiMaximize2, FiMinus, FiPlus } from "react-icons/fi";
import { expeditionRegions } from "@/resources/yangtze-expedition";
import { fetchMapTile, yangtzeMapStyle, type MapProvider } from "@/resources/yangtze-map-style";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./YangtzeWebMap.module.css";

const BOUNDS: [[number, number], [number, number]] = [
  [99.6, 26.8],
  [114.85, 31.8],
];
let mapInstance = 0;
const OFFSETS: [number, number][] = [
  [0, -12],
  [-30, 46],
  [28, -12],
  [-25, -12],
  [12, 46],
  [0, -12],
];

function duration() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100;
}

function fitJourney(map: LibreMap, animate = true) {
  const mobile = map.getContainer().clientWidth < 500;
  map.fitBounds(BOUNDS, {
    padding: { top: 74, bottom: 80, left: mobile ? 42 : 64, right: mobile ? 42 : 64 },
    duration: animate ? duration() : 0,
    maxZoom: 6,
  });
}

export function YangtzeWebMap({
  activeRegionId,
  onSelectRegion,
  detailsId,
}: {
  activeRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  detailsId: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LibreMap | null>(null);
  const [markerNodes, setMarkerNodes] = useState<HTMLElement[]>([]);
  const [visibleMarkers, setVisibleMarkers] = useState<boolean[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [attempt, setAttempt] = useState(0);
  const [zoom, setZoom] = useState(4);
  const [providerName, setProviderName] = useState<MapProvider>("esri");
  const regionRef = useRef(activeRegionId);
  regionRef.current = activeRegionId;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Retry explicitly recreates the map instance.
  useEffect(() => {
    let disposed = false;
    let map: LibreMap | undefined;
    let observer: MutationObserver | undefined;
    let resize: ResizeObserver | undefined;
    let removeProtocol: (() => void) | undefined;
    const protocol = `yangtze-tiles-${++mapInstance}`;
    let generation = 0;
    let provider: MapProvider = "esri";
    let failed = false;
    let sourceIds: string[] = [];
    const loadedSources = new Set<string>();
    const markers: Marker[] = [];
    let timeout: number;
    let recoverMap = () => setStatus("unavailable");
    setProviderName("esri");
    function beginLoading() {
      window.clearTimeout(timeout);
      setStatus("loading");
      timeout = window.setTimeout(() => {
        if (!disposed) recoverMap();
      }, 20000);
    }
    beginLoading();

    async function initialize() {
      try {
        const maplibre = await import("maplibre-gl");
        if (disposed || !container.current) return;
        maplibre.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");
        maplibre.addProtocol(protocol, async (request, controller) => ({
          data: await fetchMapTile(request.url, controller.signal),
        }));
        removeProtocol = () => maplibre.removeProtocol(protocol);
        const isDark = () => document.documentElement.dataset.theme === "dark";
        const initialStyle = yangtzeMapStyle(isDark(), provider, protocol, generation);
        sourceIds = Object.keys(initialStyle.sources);
        map = new maplibre.Map({
          container: container.current,
          style: initialStyle,
          center: [107, 29.5],
          zoom: 4,
          minZoom: 3,
          maxZoom: 11,
          maxBounds: [
            [88, 8],
            [130, 50],
          ],
          attributionControl: false,
          cooperativeGestures: true,
          renderWorldCopies: false,
          pitchWithRotate: false,
          dragRotate: false,
        });
        const currentMap = map;
        mapRef.current = currentMap;
        function changeStyle() {
          generation++;
          failed = false;
          loadedSources.clear();
          const style = yangtzeMapStyle(isDark(), provider, protocol, generation);
          sourceIds = Object.keys(style.sources);
          beginLoading();
          currentMap.setStyle(style, { diff: false });
        }
        recoverMap = () => {
          if (disposed) return;
          if (provider === "esri") {
            provider = "osm";
            setProviderName(provider);
            changeStyle();
          } else {
            failed = true;
            window.clearTimeout(timeout);
            setStatus("unavailable");
          }
        };
        currentMap.touchZoomRotate.disableRotation();
        currentMap.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-right");
        currentMap
          .getCanvas()
          .setAttribute(
            "aria-label",
            "Interactive Yangtze expedition map. Use arrow keys to pan, plus and minus to zoom, or select a named region.",
          );
        fitJourney(currentMap, false);

        const nodes = expeditionRegions.map((region, index) => {
          const element = document.createElement("div");
          element.className = styles.marker;
          const marker = new maplibre.Marker({ element, anchor: "bottom", offset: OFFSETS[index] })
            .setLngLat(region.coordinates)
            .addTo(currentMap);
          markers.push(marker);
          return element;
        });
        setMarkerNodes(nodes);
        function updateMarkerVisibility() {
          const width = currentMap.getContainer().clientWidth;
          const height = currentMap.getContainer().clientHeight;
          const visibility = expeditionRegions.map((region, index) => {
            const point = currentMap.project(region.coordinates);
            const x = point.x + OFFSETS[index][0];
            const y = point.y + OFFSETS[index][1];
            const halfWidth = Math.max(nodes[index].offsetWidth / 2, 35);
            const visible = x > halfWidth && x < width - halfWidth && y > 54 && y < height - 12;
            nodes[index].style.visibility = visible ? "visible" : "hidden";
            return visible;
          });
          setVisibleMarkers((previous) =>
            previous.every((value, index) => value === visibility[index]) &&
            previous.length === visibility.length
              ? previous
              : visibility,
          );
        }
        currentMap.on("move", updateMarkerVisibility);
        currentMap.on("resize", updateMarkerVisibility);
        updateMarkerVisibility();

        currentMap.on("style.load", () => {
          if (disposed) return;
          if (!currentMap.getSource("yangtze-river")) {
            currentMap.addSource("yangtze-river", {
              type: "geojson",
              data: "/maps/yangtze-river.geojson",
              attribution:
                'River: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>',
            });
            // Real Natural Earth centerlines emphasize the corridor only at regional zooms.
            // At city scale the basemap’s more detailed water geometry takes over.
            currentMap.addLayer({
              id: "yangtze-corridor",
              type: "line",
              source: "yangtze-river",
              maxzoom: 8,
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": isDark() ? "#91c8d5" : "#367c98",
                "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.7, 7, 3.2],
                "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.8, 8, 0],
              },
            });
          }
        });
        currentMap.on("load", () => {
          if (disposed) return;
          updateMarkerVisibility();
          const selected = expeditionRegions.find((region) => region.id === regionRef.current);
          if (selected)
            currentMap.easeTo({
              center: selected.coordinates,
              zoom: selected.id === "three-gorges" ? 7 : 8,
              duration: 0,
            });
        });
        currentMap.on("sourcedata", (event) => {
          if (sourceIds.includes(event.sourceId) && event.tile?.state === "loaded") {
            loadedSources.add(event.sourceId);
          }
        });
        currentMap.on("idle", () => {
          if (disposed) return;
          // Raster tiles must actually decode, and no tile in this style may have
          // failed. A single visible feature is not proof that the whole map loaded.
          if (
            !failed &&
            sourceIds.every(
              (source) => loadedSources.has(source) && currentMap.isSourceLoaded(source),
            ) &&
            currentMap.areTilesLoaded()
          ) {
            window.clearTimeout(timeout);
            setStatus("ready");
          }
        });
        currentMap.on("zoomend", () => setZoom(currentMap.getZoom()));
        currentMap.on("error", (event) => {
          // MapLibre attaches sourceId at runtime when a source bubbles an error.
          const sourceId = (event as typeof event & { sourceId?: string }).sourceId;
          if (
            disposed ||
            failed ||
            (sourceId && !sourceIds.includes(sourceId) && sourceId !== "yangtze-river")
          )
            return;
          failed = true;
          setStatus("loading");
          const failedGeneration = generation;
          queueMicrotask(() => {
            if (!disposed && generation === failedGeneration) recoverMap();
          });
        });
        let theme = document.documentElement.dataset.theme;
        observer = new MutationObserver(() => {
          const nextTheme = document.documentElement.dataset.theme;
          if (nextTheme === theme) return;
          theme = nextTheme;
          changeStyle();
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        let width = container.current.clientWidth;
        resize = new ResizeObserver(() => {
          currentMap.resize();
          const nextWidth = container.current?.clientWidth ?? width;
          if (Math.abs(nextWidth - width) > 20 && !regionRef.current) fitJourney(currentMap, false);
          width = nextWidth;
        });
        resize.observe(container.current);
      } catch {
        if (!disposed) setStatus("unavailable");
      }
    }
    initialize();
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      observer?.disconnect();
      resize?.disconnect();
      for (const marker of markers) marker.remove();
      map?.remove();
      removeProtocol?.();
      mapRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const region = expeditionRegions.find((item) => item.id === activeRegionId);
    if (region) {
      map.flyTo({
        center: region.coordinates,
        zoom: region.id === "three-gorges" ? 7 : 8,
        duration: duration(),
        curve: 1.15,
      });
    } else {
      fitJourney(map);
    }
  }, [activeRegionId]);

  return (
    <div className={styles.column} data-map-status={status} data-map-provider={providerName}>
      <div className={styles.toolbar}>
        <span>
          {expeditionRegions.find((region) => region.id === activeRegionId)?.name ??
            "Explore the river"}
        </span>
        <button
          type="button"
          onClick={() => mapRef.current && fitJourney(mapRef.current)}
          disabled={status !== "ready"}
        >
          <FiMaximize2 aria-hidden="true" /> Full route
        </button>
      </div>
      <div className={styles.mapFrame}>
        <div ref={container} className={styles.map} inert={status !== "ready"} />
        {markerNodes.map((element, index) => {
          const region = expeditionRegions[index];
          return createPortal(
            <button
              type="button"
              className={`${styles.placeButton} ${index === 1 || index === 4 ? styles.below : ""}`}
              aria-label={`Explore ${region.name}, ${region.stops.length} ${region.stops.length === 1 ? "stop" : "stops"}`}
              aria-pressed={activeRegionId === region.id}
              aria-controls={detailsId}
              tabIndex={status === "ready" && visibleMarkers[index] ? 0 : -1}
              onClick={() => onSelectRegion(region.id)}
            >
              <span className={styles.placeNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>
                {region.name}
                <span className={styles.chinese} lang="zh">
                  {region.chinese}
                </span>
              </span>
            </button>,
            element,
            region.id,
          );
        })}
        {status !== "ready" && (
          <div className={styles.status} aria-live="polite">
            {status === "loading" ? (
              <p>Loading the river map…</p>
            ) : (
              <>
                <p>The map could not load. You can still explore every stop in the itinerary.</p>
                <button
                  type="button"
                  onClick={() => {
                    setMarkerNodes([]);
                    setAttempt((value) => value + 1);
                  }}
                >
                  Reload map
                </button>
              </>
            )}
          </div>
        )}
        <fieldset
          className={styles.zoomControls}
          aria-label="Map zoom"
          disabled={status !== "ready"}
        >
          <button
            type="button"
            onClick={() => mapRef.current?.zoomIn({ duration: duration() / 3 })}
            disabled={zoom >= 11}
            aria-label="Zoom in"
          >
            <FiPlus aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.zoomOut({ duration: duration() / 3 })}
            disabled={zoom <= 3}
            aria-label="Zoom out"
          >
            <FiMinus aria-hidden="true" />
          </button>
        </fieldset>
      </div>
      <p className={styles.caption}>Regional markers; exact sampling sites to follow.</p>
    </div>
  );
}
