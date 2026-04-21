const CACHE_NAME = 'mathiya-omnipotence-v11';
const ASSETS = [
  './',
  './index.html',
  './about.html',
  './projects.html',
  './skills.html',
  './blog.html',
  './marketplace.html',
  './contact.html',
  './games.html',
  './setup.html',
  './license.html',
  './changelog.html',
  './archive.html',
  './legal.html',
  './assets/css/tokens.css',
  './assets/css/reset.css',
  './assets/css/layout.css',
  './assets/css/components.css',
  './assets/css/animations.css',
  './assets/js/core/Loader.js',
  './assets/js/core/Byte.js',
  './assets/js/core/Cursor.js',
  './assets/js/core/SmoothScroll.js',
  './assets/js/core/TypeWriter.js',
  './assets/js/engine/WebGLEngine.js',
  './assets/js/engine/shaders.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => caches.match('./offline.html')))
  );
});

