// Offline režim: při prvním otevření se do telefonu uloží menu i VŠECHNY hry.
// Hry se pak spouští vždy hned z telefonu (i ve vlaku, bez signálu nebo na vlakové Wi-Fi),
// a když je internet, nová verze se potichu stáhne na pozadí.
// VERZE 26 – při každé nové verzi zvyš toto číslo i HERNA_VERZE v hry.js
importScripts('hry.js');
const CACHE = 'herna-v' + self.HERNA_VERZE;
const ZAKLAD = ['./', './index.html', './hry.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const FILES = ZAKLAD.concat(...self.HERNA_HRY.map(h => h.soubory.map(f => './' + f)));

// Je odpověď opravdu náš soubor? (ne přihlašovací stránka vlakové Wi-Fi apod.)
async function jeNase(res){
  if (!res || !res.ok || res.redirected || res.type !== 'basic') return false;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/html')) { try { return (await res.clone().text()).includes('herna-ok'); } catch (e) { return false; } }
  return true;
}
function sTimeoutem(req, ms){
  return Promise.race([fetch(req, { cache: 'no-store' }), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // hlavní soubory musí projít, hry se zkusí každá zvlášť (jedna chyba nezastaví celou aktualizaci)
    const zkus = async (f, nutny) => {
      for (let pokus = 0; pokus < 3; pokus++) {
        try { const res = await fetch(new Request(f, { cache: 'reload' })); if (await jeNase(res)) { await c.put(f, res); return; } } catch (e) {}
      }
      if (nutny) throw new Error('nepodařilo se stáhnout ' + f);
    };
    await Promise.all(ZAKLAD.map(f => zkus(f, true)));
    await Promise.all(FILES.filter(f => !ZAKLAD.includes(f)).map(f => zkus(f, false)));
    // co se nestáhlo, vezmi ze staré verze
    for (const f of FILES) if (!(await c.match(f))) { const old = await caches.match(f); if (old) await c.put(f, old); }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // starší cache smaž, až když je nová kompletní
    const ok = (await Promise.all(FILES.map(f => c.match(f)))).every(Boolean);
    if (ok) { const keys = await caches.keys(); await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))); }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // kontrola nové verze z menu jde vždy přímo na internet
  if (url.searchParams.has('nc')) return;
  e.respondWith((async () => {
    let hit = await caches.match(req, { ignoreSearch: true });
    if (!hit && req.mode === 'navigate') {
      const hra = self.HERNA_HRY.find(h => url.pathname.includes('/hry/' + h.id + '/'));
      hit = await caches.match(hra ? './hry/' + hra.id + '/index.html' : './index.html');
    }
    // na pozadí stáhni novější verzi (jen když je to opravdu náš soubor)
    const obnov = (async () => {
      try {
        const res = await sTimeoutem(req, 15000);
        if (await jeNase(res)) { const c = await caches.open(CACHE); await c.put(req, res.clone()); return res; }
      } catch (err) {}
      return null;
    })();
    if (hit) { e.waitUntil(obnov); return hit; }
    const res = await obnov;
    return res || Response.error();
  })());
});
