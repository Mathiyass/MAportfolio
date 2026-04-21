const CACHE_NAME = 'mathiya-v10-final';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/games.html',
  '/assets/css/tokens.css',
  '/assets/css/global.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/js/core/Loader.js',
  '/assets/js/core/Byte.js',
  '/assets/js/core/Cursor.js',
  '/assets/js/engine/WebGLEngine.js',
  '/assets/js/engine/shaders.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
