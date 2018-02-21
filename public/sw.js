const staticCacheName = "cita-app-v02.1"
const dynamicCacheName = "site-dynamic"

const assets = [
  "pages/index.html",
  "pages/about.html",
  "pages/references.html",
  "image/icon-72x72.png",
  "image/icon-192x192.png",
  "image/icon-256x256.png",
  "image/icon-384x384.png",
  "image/icon-512x512.png",
  "manifest.json",
  "js/algo/index.js",
  "js/index.js",
  "js/config.js",
  "css/main.css",
]

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install event
self.addEventListener("install", evt => {
  console.log("service worker: installed")
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        cache.addAll(assets)
        console.log("service worker: caching assets...")
      })
      .then(() => self.skipWaiting()),
  )
})

// activate event
self.addEventListener("activate", evt => {
  console.log("service worker: activated")
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key)))
    }),
  )
})

// Listen fetch event
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return (
        cacheRes ||
        fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone())
            return fetchRes
          })
        })
      )
    }),
  )
})
