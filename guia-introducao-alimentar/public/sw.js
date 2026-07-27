/*
 * Service worker minimalista, estratégia network-first:
 * online, sempre a versão mais nova; offline, a última visitada em cache.
 * Sem lista de pré-cache — evita servir builds antigos por engano.
 */
const CACHE = 'guia-ia-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(chaves => Promise.all(chaves.filter(c => c !== CACHE).map(c => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(request)
      .then(resposta => {
        const copia = resposta.clone();
        caches.open(CACHE).then(cache => cache.put(request, copia));
        return resposta;
      })
      .catch(() => caches.match(request).then(emCache => emCache ?? caches.match('./index.html')))
  );
});
