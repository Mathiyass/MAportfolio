const CACHE_NAME = 'mathiya-v11';
const ASSETS = [
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
  '/lab.html',
  '/now.html',
  '/uses.html',
  '/404.html',
  '/admin.html',
  '/offline.html',
  '/colophon.html',
  '/certifications.html',
  '/timeline.html',
  '/open-source.html',
  '/sri-lanka.html',
  '/assets/css/tokens.css',
  '/assets/css/reset.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/css/animations.css',
  '/assets/css/print.css',
  '/assets/js/core/Loader.js',
  '/assets/js/core/Cursor.js',
  '/assets/js/core/SmoothScroll.js',
  '/assets/js/core/ScrollReveal.js',
  '/assets/js/core/TypeWriter.js',
  '/assets/js/core/CountUp.js',
  '/assets/js/core/MatrixRain.js',
  '/assets/js/core/GitHubStats.js',
  '/assets/js/core/Audio.js',
  '/assets/js/core/PageTransitions.js',
  '/assets/js/core/Konami.js',
  '/assets/js/core/Toast.js',
  '/assets/js/core/ProgressBar.js',
  '/assets/js/core/ThemeSystem.js',
  '/assets/js/core/LazyLoad.js',
  '/assets/js/engine/WebGLEngine.js',
  '/assets/js/engine/shaders.js',
  '/assets/js/mascot/Byte.js',
  '/assets/js/utils/math.js',
  '/assets/js/utils/dom.js',
  '/assets/js/utils/github-chart.js',
  '/assets/js/games/Snake.js',
  '/assets/js/games/QuebeInvaders.js',
  '/assets/js/games/Racer.js',
  '/assets/js/games/HexPuzzle.js',
  '/assets/js/games/TerminalTyper.js',
  '/assets/js/games/ByteAdventure.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.origin === 'https://api.github.com') return; // Network only for API

  if (event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).catch(() => 
        caches.match(event.request).then(res => res || caches.match('/offline.html'))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(networkRes => {
        if (networkRes.ok) {
          const cacheCopy = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
        }
        return networkRes;
      }).catch(() => { /* ignore */ });
      
      return cached || fetchPromise;
    })
  );
});
