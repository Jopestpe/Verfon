self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('verfon-cache').then(cache => {
            return cache.addAll([
                '/',
                '/style.css',
                '/script.js',
                '/icone.svg'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
