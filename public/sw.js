self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Basic network-first strategy for API/static files
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
