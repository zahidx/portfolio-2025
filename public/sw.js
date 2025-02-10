const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  "/",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/index.html", // Add other important pages or assets you need to cache
  "/styles.css",  // Example CSS file, add yours
  "/app.js",      // Example JavaScript file, add yours
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  
  // Perform install steps (caching important assets)
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  
  // Clean up old caches
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  // Serve cached content when offline
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return the cached response if found
      }
      // If not found in cache, fetch from network
      return fetch(event.request).then((response) => {
        // Optionally, cache the new response
        if (event.request.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    })
  );
});
