// Service worker, generated at build time with the list of pages to keep for offline use.
// After the first visit, every why works without an internet connection.
import type { APIRoute } from 'astro';
import { locales } from '@/config/site';
import { whys } from '@/data/whys';
import { href } from '@/i18n';

export const GET: APIRoute = () => {
  const pages = locales.flatMap((l) => [href(l), ...whys.map((x) => href(l, `${x.slug}/`))]);
  const config = { version: String(Date.now()), base: import.meta.env.BASE_URL.replace(/\/?$/, '/'), pages };
  return new Response(`const CONFIG = ${JSON.stringify(config)};\n${worker.toString().slice(worker.toString().indexOf('{') + 1, -1)}`, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  });
};

declare const CONFIG: { version: string; base: string; pages: string[] };
// Only the body of this function is shipped (it runs in the service worker, not here).
function worker() {
  const sw = self as unknown as ServiceWorkerGlobalScope;
  const CACHE = `whys-${CONFIG.version}`;
  const ASSET = /\/_astro\//;

  // Cache a page plus the scripts, styles and fonts it needs, following imports one level at a time.
  async function keep(cache: Cache, url: string) {
    if (await cache.match(url, { ignoreVary: true })) return;
    const res = await fetch(url);
    if (!res.ok) return;
    const type = res.headers.get('content-type') || '';
    const text = /text|javascript|css/.test(type) ? await res.clone().text() : '';
    await cache.put(url, res);
    const found = new Set<string>();
    for (const m of text.matchAll(/(?:href|src|component-url|renderer-url|before-hydration-url)="([^"]+)"/g)) found.add(m[1]);
    for (const m of text.matchAll(/(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) found.add(m[1]);
    for (const m of text.matchAll(/url\(([^)]+\.woff2)\)/g)) found.add(m[1].replace(/["']/g, ''));
    for (const f of found) {
      const abs = new URL(f, new URL(url, sw.location.href)).href;
      if (ASSET.test(abs) && abs.startsWith(sw.location.origin)) await keep(cache, abs).catch(() => {});
    }
  }

  sw.addEventListener('install', (e) => {
    sw.skipWaiting();
    e.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE);
        await keep(cache, CONFIG.base).catch(() => {});
        // The rest downloads in the background; skip it when the visitor asked to save data.
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        if (!conn?.saveData) for (const p of CONFIG.pages) await keep(cache, p).catch(() => {});
      })(),
    );
  });

  sw.addEventListener('activate', (e) => {
    e.waitUntil(
      (async () => {
        for (const k of await caches.keys()) if (k.startsWith('whys-') && k !== CACHE) await caches.delete(k);
        await sw.clients.claim();
      })(),
    );
  });

  sw.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET' || !req.url.startsWith(sw.location.origin)) return;
    if (req.mode === 'navigate') {
      // Pages: fresh from the network when possible, otherwise the saved copy.
      e.respondWith(
        (async () => {
          try {
            const res = await fetch(req);
            if (res.ok) (await caches.open(CACHE)).put(req.url.split(/[?#]/)[0], res.clone());
            return res;
          } catch {
            return (await caches.match(req, { ignoreSearch: true, ignoreVary: true })) || (await caches.match(CONFIG.base)) || Response.error();
          }
        })(),
      );
    } else if (ASSET.test(req.url) || req.url.endsWith('.svg') || req.url.endsWith('.png')) {
      // Built files have unique names, so a saved copy is always correct.
      e.respondWith(
        (async () => {
          const hit = await caches.match(req, { ignoreVary: true });
          if (hit) return hit;
          const res = await fetch(req);
          if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
          return res;
        })(),
      );
    }
  });
}
