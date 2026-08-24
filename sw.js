const CACHE_NAME = 'jachwi-app-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html' // 현재 사용 중인 HTML 파일명으로 지정
];

// 최초 설치 시 파일들을 기기에 영구 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 구버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 캐시 우선 전략 (Cache First, Network Fallback)
// 네트워크가 느려도 기기에 저장된 캐시로 즉시 앱을 실행
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});