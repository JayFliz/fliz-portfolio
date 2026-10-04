import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// maplibre-gl loads its web worker from sibling files next to the bundle, which Vite doesn't emit.
const MAPLIBRE_WORKER_FILES = ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs'];

const maplibreWorker = {
  name: 'maplibre-worker',
  apply: 'build',
  generateBundle() {
    for (const name of MAPLIBRE_WORKER_FILES)
      this.emitFile({
        type: 'asset',
        fileName: `assets/${name}`,
        source: readFileSync(new URL(`node_modules/maplibre-gl/dist/${name}`, import.meta.url)),
      });
  },
};

export default defineConfig({
  plugins: [svelte(), maplibreWorker],
  // Built output is served statically by the portfolio at /experiments/geojson-viewer/.
  base: './',
  build: { outDir: '../../public/experiments/geojson-viewer', emptyOutDir: true, chunkSizeWarningLimit: 1500 },
  // The dep optimizer doesn't copy the worker files either.
  optimizeDeps: { exclude: ['maplibre-gl'] },
});
