const CACHE_NAME = 'madev-apex-v7';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/skills.html',
  '/blog.html',
  '/gallery.html',
  '/games.html',
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
  '/assets/js/core/ScrollReveal.js',
  '/assets/js/core/TypeWriter.js',
  '/assets/js/core/CountUp.js',
  '/assets/js/core/MatrixRain.js',
  '/assets/js/core/GitHubStats.js',
  '/assets/js/core/Audio.js',
  '/assets/js/core/PageTransitions.js',
  '/assets/js/core/Toast.js',
  '/assets/js/core/ProgressBar.js',
  '/assets/js/core/Konami.js',
  '/assets/js/core/LazyLoad.js',
  '/assets/js/core/ThemeSystem.js',
  '/assets/js/core/SmoothScroll.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => caches.match('/offline.html')))
  );
});