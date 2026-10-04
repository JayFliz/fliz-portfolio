<script>
  import { onMount } from 'svelte';
  import * as maplibregl from 'maplibre-gl';
  import bbox from '@turf/bbox';

  const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea', '#0891b2'];
  const GLYPHS = 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf';
  const STYLES = {
    Streets: 'https://tiles.openfreemap.org/styles/liberty',
    Light: 'https://tiles.openfreemap.org/styles/positron',
    Satellite: {
      version: 8,
      glyphs: GLYPHS,
      sources: {
        esri: {
          type: 'raster', tileSize: 256, maxzoom: 19, attribution: 'Tiles © Esri',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        },
      },
      layers: [{ id: 'esri', type: 'raster', source: 'esri' }],
    },
  };

  let files = $state([]); // { id, name, color, visible, data }
  let selected = $state(null); // properties of clicked feature
  let style = $state('Streets');
  let dragging = $state(false);
  let container;
  let map;
  let nextId = 0;

  onMount(() => {
    map = new maplibregl.Map({ container, style: STYLES[style], center: [0, 20], zoom: 1.5 });
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl());
    // Style changes wipe custom layers, so re-add them.
    map.on('style.load', () => files.forEach(addLayers));
  });

  function setStyle(name) {
    style = name;
    map.setStyle(STYLES[name]);
  }

  function addLayers(f) {
    const src = `f${f.id}`;
    const vis = f.visible ? 'visible' : 'none';
    map.addSource(src, { type: 'geojson', data: $state.snapshot(f.data) }); // proxies can't go to the worker
    map.addLayer({
      id: `${src}-fill`, type: 'fill', source: src, layout: { visibility: vis },
      filter: ['==', '$type', 'Polygon'],
      paint: { 'fill-color': f.color, 'fill-opacity': 0.2 },
    });
    map.addLayer({
      id: `${src}-line`, type: 'line', source: src, layout: { visibility: vis, 'line-join': 'round', 'line-cap': 'round' },
      filter: ['in', '$type', 'LineString', 'Polygon'],
      paint: { 'line-color': f.color, 'line-width': 4 },
    });
    map.addLayer({
      id: `${src}-point`, type: 'circle', source: src, layout: { visibility: vis },
      filter: ['==', '$type', 'Point'],
      paint: { 'circle-color': f.color, 'circle-radius': 7, 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 },
    });
    map.addLayer({
      id: `${src}-label`, type: 'symbol', source: src, layout: {
        visibility: vis,
        'text-field': ['coalesce', ['get', 'name'], ['get', 'title'], ''],
        'text-font': ['Noto Sans Regular'],
        'text-size': 12, 'text-offset': [0, 1.2], 'text-anchor': 'top',
      },
      paint: { 'text-color': '#111', 'text-halo-color': '#fff', 'text-halo-width': 1.5 },
    });
    for (const kind of ['fill', 'line', 'point']) {
      const id = `${src}-${kind}`;
      map.on('click', id, (e) => (selected = { file: f.name, ...e.features[0].properties }));
      map.on('mouseenter', id, () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', id, () => (map.getCanvas().style.cursor = ''));
    }
  }

  async function load(fileList) {
    for (const file of fileList) {
      try {
        let data = JSON.parse(await file.text());
        if (data.type !== 'FeatureCollection' && data.type !== 'Feature')
          data = { type: 'Feature', geometry: data, properties: {} };
        const f = { id: nextId++, name: file.name, color: COLORS[files.length % COLORS.length], visible: true, data };
        files.push(f);
        addLayers(f);
        zoomTo(f);
      } catch (err) {
        alert(`${file.name}: ${err.message}`);
      }
    }
  }

  function zoomTo(f) {
    const [w, s, e, n] = bbox(f.data);
    map.fitBounds([[w, s], [e, n]], { padding: 60, maxZoom: 17 });
  }

  function toggle(f) {
    f.visible = !f.visible;
    for (const kind of ['fill', 'line', 'point', 'label'])
      map.setLayoutProperty(`f${f.id}-${kind}`, 'visibility', f.visible ? 'visible' : 'none');
  }

  function remove(f) {
    for (const kind of ['fill', 'line', 'point', 'label']) map.removeLayer(`f${f.id}-${kind}`);
    map.removeSource(`f${f.id}`);
    files = files.filter((x) => x.id !== f.id);
  }

  const fmt = (v) => (typeof v === 'object' ? JSON.stringify(v) : String(v));
</script>

<svelte:window
  ondragover={(e) => { e.preventDefault(); dragging = true; }}
  ondragleave={(e) => { if (!e.relatedTarget) dragging = false; }}
  ondrop={(e) => { e.preventDefault(); dragging = false; if (map) load(e.dataTransfer.files); }}
/>

<div class="map" bind:this={container}></div>

<aside>
    <label class="open">
      Open GeoJSON…
      <input type="file" accept=".geojson,.json" multiple hidden onchange={(e) => load(e.target.files)} />
    </label>
    <select value={style} onchange={(e) => setStyle(e.target.value)}>
      {#each Object.keys(STYLES) as s}<option>{s}</option>{/each}
    </select>

    {#if files.length === 0}
      <p class="muted">…or drop files onto the map</p>
    {/if}
    {#each files as f (f.id)}
      <div class="file">
        <input type="checkbox" checked={f.visible} onchange={() => toggle(f)} />
        <span class="swatch" style:background={f.color}></span>
        <button class="link" onclick={() => zoomTo(f)} title="Zoom to">{f.name}</button>
        <span class="muted">{f.data.features?.length ?? 1}</span>
        <button class="link" onclick={() => remove(f)} title="Remove">✕</button>
      </div>
    {/each}

    {#if selected}
      <table><tbody>
        {#each Object.entries(selected) as [k, v]}
          <tr><td>{k}</td><td>{fmt(v)}</td></tr>
        {/each}
      </tbody></table>
    {/if}
  </aside>

{#if dragging}<div class="drop">Drop to load</div>{/if}

<style>
  :global(body) { margin: 0; font: 13px/1.4 system-ui, sans-serif; }
  .map { position: fixed; inset: 0; }
  aside {
    position: fixed; top: 10px; left: 10px; width: 300px; max-height: calc(100vh - 40px); overflow: auto;
    background: #fff; border-radius: 8px; box-shadow: 0 2px 10px #0003; padding: 12px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .open { background: #2563eb; color: #fff; text-align: center; padding: 6px; border-radius: 6px; cursor: pointer; }
  .file { display: flex; align-items: center; gap: 6px; }
  .file .link:first-of-type { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .swatch { width: 10px; height: 10px; border-radius: 50%; flex: none; }
  .link { background: none; border: none; padding: 0; cursor: pointer; font: inherit; }
  .muted { color: #888; margin: 0; }
  table { border-collapse: collapse; font-size: 12px; border-top: 1px solid #eee; }
  td { padding: 3px 4px; border-bottom: 1px solid #eee; vertical-align: top; word-break: break-all; }
  td:first-child { color: #888; white-space: nowrap; }
  .drop {
    position: fixed; inset: 0; display: grid; place-items: center; pointer-events: none;
    background: #2563eb22; border: 3px dashed #2563eb; font-size: 20px; font-weight: 600;
  }
</style>
