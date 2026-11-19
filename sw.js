// Offline režim: hra se uloží do telefonu, takže jde hrát i bez internetu.
// Když je internet, vždy se nejdřív stáhne nejnovější verze (aktualizace přijdou hned).
const CACHE = 'neon-najezd-v7';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Nejdřív internet (nejnovější verze), když není, tak uložená kopie.
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});
