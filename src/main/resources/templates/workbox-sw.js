workbox.core.setCacheNameDetails({
    prefix: 'enonic-pwa-workshop',
    suffix: '{{appVersion}}',
    precache: 'precache',
    runtime: 'runtime'
});

workbox.core.clientsClaim();
workbox.core.skipWaiting();

// This is a placeholder for manifest dynamically injected from webpack.config.js
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Here we precache custom defined Urls
workbox.precaching.precacheAndRoute([{
    "revision": "{{appVersion}}",
    "url": "{{appUrl}}manifest.json"
}]);

workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());
