// The files we want to cache
var urlsToCache = [
  './',
  './css/index.css',
  './img/happyface.png'
];
var CACHE_NAME = 'sw-demo';

// Set the callback for the install step
self.addEventListener('install', function(event){
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache){
        console.log('Cache <' + CACHE_NAME + '> Opened.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
