const CACHE_NAME = "pal-optical-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/data.js",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/public/manifest.json",
  "/public/pal2.JPG",
  "/public/palpricelist.mp4",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
