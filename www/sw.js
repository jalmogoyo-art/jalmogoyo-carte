/* Offline cache for the PWA version.
 * Network first: when online the latest version is always shown; the cache is only used offline. */
var CACHE = 'jalmogoyo-menu-v6';
var FILES = [
  "css/app.css",
  "img/brand/crane-cream.png",
  "img/brand/crane-grey.png",
  "img/brand/icon-192.png",
  "img/brand/icon-512.png",
  "img/brand/logo.png",
  "img/brand/petal-one.png",
  "img/brand/petals-cream.png",
  "img/brand/petals.png",
  "img/dishes/bbq-assortment.jpg",
  "img/dishes/bbq-beef.jpg",
  "img/dishes/bbq-chicken.jpg",
  "img/dishes/bbq-duck.jpg",
  "img/dishes/bbq-lamb.jpg",
  "img/dishes/bbq-pork.jpg",
  "img/dishes/bbq-shrimp.jpg",
  "img/dishes/bibimbap-beef.jpg",
  "img/dishes/bibimbap-salmon.jpg",
  "img/dishes/bibimbap-seafood.jpg",
  "img/dishes/bibimbap-veg.jpg",
  "img/dishes/bulgogi.jpg",
  "img/dishes/dakgalbi.jpg",
  "img/dishes/dakgangjeong.jpg",
  "img/dishes/dubu-jjigae.jpg",
  "img/dishes/dubu.jpg",
  "img/dishes/fondue.jpg",
  "img/dishes/gun-mandu.jpg",
  "img/dishes/haemul-pajeon.jpg",
  "img/dishes/jajangmyeon.jpg",
  "img/dishes/japchae.jpg",
  "img/dishes/jeyuk-bokkeum.jpg",
  "img/dishes/kimchi.jpg",
  "img/dishes/kimchijeon.jpg",
  "img/dishes/kitchen-1.jpg",
  "img/dishes/kitchen-2.jpg",
  "img/dishes/kitchen-3.jpg",
  "img/dishes/ojingeo-bokkeum.jpg",
  "img/dishes/room-1.jpg",
  "img/dishes/room-2.jpg",
  "img/dishes/samgyeopsal.jpg",
  "img/dishes/tteokbokki.jpg",
  "img/dishes/yukgaejang.jpg",
  "index.html",
  "js/app.js",
  "js/menu-data.js",
  "manifest.webmanifest"
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(['./'].concat(FILES)); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
