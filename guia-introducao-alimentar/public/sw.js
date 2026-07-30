/*
 * Service worker: duas estratégias, escolhidas pelo tipo de recurso.
 *
 * ASSETS COM HASH (/assets/*) — cache-first. O Vite põe o hash do conteúdo no nome,
 * então o arquivo é imutável por construção: uma build nova gera nome novo. Servir do
 * cache é instantâneo e nunca entrega código ou arte velha por engano.
 *
 * HTML E DEMAIS (mutáveis) — rede primeiro, mas com TETO DE ESPERA. É a correção que
 * motivou esta versão: `network-first` puro só protege contra estar offline. Numa
 * conexão ruim — não offline, ruim — o fetch fica pendurado e a tela fica em branco.
 * Aqui, se a rede não responder em 2,5 s e existir cópia em cache, entregamos o cache
 * na hora e deixamos a rede terminar em segundo plano para atualizar. Se não houver
 * cache, não há o que fazer além de esperar a rede.
 *
 * Continua sem lista de pré-cache: nada entra no cache sem ter sido visitado.
 */
const CACHE = 'guia-ia-v2';
const TETO_REDE_MS = 2500;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(chaves => Promise.all(chaves.filter(c => c !== CACHE).map(c => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

/** Busca na rede e atualiza o cache sem segurar a resposta. */
async function buscarEGuardar(request) {
  const resposta = await fetch(request);
  if (resposta && resposta.ok && resposta.type === 'basic') {
    const copia = resposta.clone();
    caches.open(CACHE).then(cache => cache.put(request, copia));
  }
  return resposta;
}

/** Imutável: entrega do cache se houver, senão busca. */
async function cachePrimeiro(request) {
  const emCache = await caches.match(request);
  if (emCache) return emCache;
  return buscarEGuardar(request);
}

/** Mutável: rede primeiro, com teto — cache assume se a rede demorar. */
async function redePrimeiroComTeto(request) {
  const emCache = await caches.match(request);
  const daRede = buscarEGuardar(request);
  // Sem esta captura, uma rede que falha depois do teto vira rejeição não tratada.
  const redeSegura = daRede.catch(() => null);

  if (!emCache) {
    const resposta = await redeSegura;
    return resposta ?? (await caches.match('./index.html')) ?? Response.error();
  }

  const vencedor = await Promise.race([
    redeSegura,
    new Promise(resolve => setTimeout(() => resolve(null), TETO_REDE_MS)),
  ]);
  // A rede continua correndo e atualiza o cache mesmo quando o teto vence.
  return vencedor ?? emCache;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    url.pathname.includes('/assets/') ? cachePrimeiro(request) : redePrimeiroComTeto(request)
  );
});
