const CACHE = "adif-oep2026-v3";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./data/ugt.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon-180.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Stale-while-revalidate: responde al instante desde caché y actualiza en segundo plano */
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  const key = req.mode === "navigate" ? "./index.html" : req;
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(key).then((hit) => {
        const net = fetch(req)
          .then((res) => { if (res.ok) c.put(key, res.clone()); return res; })
          .catch(() => hit);
        if (hit) { e.waitUntil(net); return hit; }
        return net;
      })
    )
  );
});
