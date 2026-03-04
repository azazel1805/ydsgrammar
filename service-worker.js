const CACHE_NAME = "yds-engine-v5";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/dictionary.js",
  "/modals.js",
  "/tenses.js",
  "/relative.js",
  "/prepositions.js",
  "/passive.js",
  "/noun.js",
  "/conjunctions.js",
  "/prepositions-data.js",
  "/miniexams.js"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH (Network First Strategy)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request))
  );
});