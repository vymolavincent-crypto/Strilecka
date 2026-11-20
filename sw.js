// Offline režim Herny: při prvním otevření se do telefonu uloží Herna i VŠECHNY hry,
// takže pak jedou i bez internetu. Když je internet, stáhne se nejnovější verze.
importScripts('hry.js');
const CACHE = 'herna-v' + self.HERNA_VERZE;
const ZAKLAD = ['./', './index.html', './hry.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const FILES = ZAKLAD.concat(...self.HERNA_HRY.map(h => h.soubory.map(f => './' + f)));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const zUlozenych = () => caches.match(req, { ignoreSearch: true }).then(hit => {
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const hra = self.HERNA_HRY.find(h => new URL(req.url).pathname.includes('/hry/' + h.id + '/'));
      return caches.match(hra ? './hry/' + hra.id + '/index.html' : './index.html');
    }
    return Response.error();
  });
  // Nejdřív internet (max 4 s, ať se slabý signál nezasekne), jinak uložená kopie.
  e.respondWith(new Promise(resolve => {
    let hotovo = false;
    const zaloha = () => { if (!hotovo) { hotovo = true; resolve(zUlozenych()); } };
    const t = setTimeout(zaloha, 4000);
    fetch(req, { cache: 'no-store' }).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      clearTimeout(t);
      if (!hotovo) { hotovo = true; resolve(res); }
    }).catch(() => { clearTimeout(t); zaloha(); });
  }));
});
