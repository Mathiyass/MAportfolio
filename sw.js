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
  '/marketplace.html',
  '/resume.html',
  '/contact.html',
  '/404.html',
  '/admin.html',
  '/offline.html',
  '/experiments.html',
  '/now.html',
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
  '/assets/js/core/Toast.js',
  '/assets/js/core/ProgressBar.js',
  '/assets/js/core/ThemeSystem.js',
  '/assets/js/core/LazyLoad.js',
  '/assets/js/core/MatrixRain.js',
  '/assets/js/utils/math.js',
  '/assets/js/utils/dom.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );

  // Notify clients
  self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({type: 'SW_ACTIVATED'}));
  });
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin === 'https://api.github.com' || url.origin === 'https://formsubmit.co') {
      // Network only for API
      return;
  }

  if (event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then(response => {
             return response || caches.match('/offline.html');
        });
      })
    );
    return;
  }

  // Cache First, network fallback for assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
          // Stale while revalidate
          fetch(event.request).then(res => {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, res));
          }).catch(()=>{});
          return cachedResponse;
      }
      return fetch(event.request).then(response => {
          if(response && response.status === 200 && response.type === 'basic') {
              const resClone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          }
          return response;
      });
    })
  );
});
