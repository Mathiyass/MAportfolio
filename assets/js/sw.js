const CACHE_NAME = 'madev-apex-v7';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/skills.html',
  '/blog.html',
  '/gallery.html',
  '/games.html',
  '/ar.html',
  '/experiments.html',
  '/now.html',
  '/contact.html',
  '/404.html',
  '/offline.html',
  '/assets/css/tokens.css',
  '/assets/css/reset.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/css/animations.css',
  '/assets/js/engine/WebGLEngine.js',
  '/assets/js/engine/shaders.js',
  '/assets/js/core/Cursor.js',
  '/assets/js/core/SmoothScroll.js',
  '/assets/js/core/ScrollReveal.js',
  '/assets/js/core/TypeWriter.js',
  '/assets/js/core/CountUp.js',
  '/assets/js/core/GitHubStats.js',
  '/assets/js/core/Audio.js',
  '/assets/js/core/PageTransitions.js',
  '/assets/js/core/Konami.js',
  '/assets/js/core/MatrixRain.js',
  '/assets/js/core/Toast.js',
  '/assets/js/core/ProgressBar.js',
  '/assets/js/core/ThemeSystem.js',
  '/assets/js/core/LazyLoad.js',
  '/assets/js/utils/dom.js',
  '/assets/js/utils/math.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim().then(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ type: 'SW_ACTIVATED' }));
    });
  });
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Exclude GitHub API from cache
  if (url.hostname === 'api.github.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  // HTML: Network first, fallback to cache, then offline
  if (event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request, { signal: AbortSignal.timeout(2000) })
        .catch(() => {
          return caches.match(event.request).then(response => {
            return response || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // CSS/JS/Images: Cache first, update in background (stale-while-revalidate)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        return networkResponse;
      }).catch(() => {
        // Image placeholder fallback
        if (event.request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#03030A"/><text x="50" y="55" font-family="monospace" font-size="20" fill="#444466" text-anchor="middle">IMAGE</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
      return cachedResponse || fetchPromise;
    })
  );
});
