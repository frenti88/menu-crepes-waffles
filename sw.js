/**
 * Crepes & Waffles · Service Worker para Resiliencia Offline (/harden)
 * Garantiza que comensales en sótanos o zonas sin señal puedan navegar el menú y preparar su comanda.
 */

const CACHE_NAME = 'cw-menu-v1.1';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './js/app.js',
  './data/menu-data.js',
  './manifest.webmanifest'
];

// Instalación: Precargar shell de la aplicación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpiar versiones antiguas de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Fetch: Network-First con fallback a Caché para datos locales y Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Solo interceptar peticiones GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Para navegación principal y recursos locales del mismo origen
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Si la respuesta es válida, clonar y actualizar en caché
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback offline a caché
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Si es navegación de página, retornar index.html
            if (request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
          });
        })
    );
  }
});
