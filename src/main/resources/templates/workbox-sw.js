importScripts('{{assetUrl}}/js/workbox-sw.prod.v2.0.1.js');

const swVersion = '{{appVersion}}';
const workboxSW = new self.WorkboxSW({
    skipWaiting: true,
    clientsClaim: true
});

// This is a placeholder for manifest dynamically injected from webpack.config.js
workboxSW.precache([]);

// Here we precache custom defined Urls
workboxSW.precache([
    '{{appUrl}}',
    '{{appUrl}}?source=web_app_manifest',
    '{{appUrl}}manifest.json'
]);

workboxSW.router.setDefaultHandler({
    handler: workboxSW.strategies.networkFirst()
});
