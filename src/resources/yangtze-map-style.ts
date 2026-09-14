import type { StyleSpecification } from "maplibre-gl";

export type MapProvider = "esri" | "osm";

export function yangtzeMapStyle(
  dark: boolean,
  provider: MapProvider,
  protocol: string,
  generation: number,
): StyleSpecification {
  const source = `basemap-${generation}-base`;
  const reference = `basemap-${generation}-labels`;
  const esriBase = dark ? "Canvas/World_Dark_Gray_Base" : "World_Topo_Map";
  const baseUrl =
    provider === "esri"
      ? `${protocol}://services.arcgisonline.com/ArcGIS/rest/services/${esriBase}/MapServer/tile/{z}/{y}/{x}?generation=${generation}`
      : `${protocol}://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png?generation=${generation}`;
  return {
    version: 8,
    sources: {
      [source]: {
        type: "raster",
        tiles: [baseUrl],
        tileSize: 256,
        maxzoom: 13,
        attribution:
          provider === "esri"
            ? "Tiles © Esri — Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors"
            : '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, tiles by <a href="https://www.hotosm.org/">HOT</a> / <a href="https://www.openstreetmap.fr/">OSM France</a>',
      },
      ...(dark && provider === "esri"
        ? {
            [reference]: {
              type: "raster" as const,
              tiles: [
                `${protocol}://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}?generation=${generation}`,
              ],
              tileSize: 256,
              maxzoom: 13,
            },
          }
        : {}),
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": dark ? "#343638" : "#eef0e9" },
      },
      { id: source, type: "raster", source, paint: { "raster-fade-duration": 150 } },
      ...(dark && provider === "esri"
        ? [{ id: reference, type: "raster" as const, source: reference }]
        : []),
    ],
  };
}

// A plain Error makes even HTTP 404 failures visible to MapLibre's error handler.
// It otherwise treats missing tiles as settled, potentially displaying a partial map.
export async function fetchMapTile(url: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const remote = new URL(url.replace(/^[a-z0-9-]+:/, "https:"));
  remote.searchParams.delete("generation");
  for (let attempt = 0; attempt < 2; attempt++) {
    signal.throwIfAborted();
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal.addEventListener("abort", abort, { once: true });
    const timeout = window.setTimeout(abort, 6000);
    try {
      const response = await fetch(remote.href, {
        signal: controller.signal,
        cache: attempt === 0 ? "default" : "reload",
      });
      if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
        throw new Error("The map tile service returned an invalid image.");
      }
      return await response.arrayBuffer();
    } catch {
      signal.throwIfAborted();
      if (attempt === 1) throw new Error("The map tile could not be loaded after retrying.");
    } finally {
      window.clearTimeout(timeout);
      signal.removeEventListener("abort", abort);
    }
  }
  throw new Error("The map tile could not be loaded.");
}
