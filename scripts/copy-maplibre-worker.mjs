import { copyFile, mkdir } from "node:fs/promises";

// MapLibre 6 uses an ES-module worker. Serve its unmodified distribution files
// alongside the static site so the worker URL survives Next's bundling.
const destination = new URL("../public/vendor/maplibre/", import.meta.url);
const source = new URL("../node_modules/maplibre-gl/", import.meta.url);
await mkdir(destination, { recursive: true });
for (const name of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  await copyFile(new URL(`dist/${name}`, source), new URL(name, destination));
}
await copyFile(new URL("LICENSE.txt", source), new URL("LICENSE.txt", destination));
