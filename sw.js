const CACHE_NAME = 'belad-v1';
const assets = [
  '/',
  '/index.html',
  '/firebase.js',
  '/search-dictionary.js',
  '/driver-login.HTML',
  '/icon-512.png'
];

// تثبيت ملف الخدمة
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// استقبال الطلبات وعرضها من الكاش لتسريع التطبيق
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});