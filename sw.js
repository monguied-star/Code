const CACHE = "finanzas-v1";

const archivos = [
"/",
"/index.html",
"/app.js",
"/manifest.json"
];

self.addEventListener("install", e => {
e.waitUntil(
caches.open(CACHE)
.then(cache => cache.addAll(archivos))
);
});

self.addEventListener("fetch", e => {
e.respondWith(
caches.match(e.request)
.then(resp => resp || fetch(e.request))
);
});