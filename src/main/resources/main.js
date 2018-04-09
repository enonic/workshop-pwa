var thymeleaf = require('/lib/xp/thymeleaf');
var router = require('/lib/router')();
var portalLib = require('/lib/xp/portal');
var siteTitle = 'PWA Workshop';
var mustache = require('/lib/xp/mustache');

function getAppUrl() {
    return portalLib.url({path:'/app/' + app.name}) + '/';
}

function renderPage(pageId, title) {
    var model = {
        version: app.version,
        appUrl: getAppUrl(),
        pageId: pageId,
        title: title || siteTitle,
        isLive: true
    };

    return {
        body: thymeleaf.render(resolve('templates/page.html'), model)
    };
}

function renderSW() {
    var appUrl = getAppUrl();

    return {
        headers: {
            'Service-Worker-Allowed': appUrl
        },
        contentType: 'application/javascript',
        // sw.js will be generated during build by Workbox from webpack.config.js
        body: mustache.render(resolve('/templates/sw.js'), {
            appUrl: appUrl,
            assetUrl: portalLib.assetUrl({path: ''}),
            appVersion: app.version
        })
    };
}

function renderManifest() {

    return {
        contentType: 'application/json',
        body: mustache.render(resolve('/templates/manifest.json'), {
            startUrl: getAppUrl() + '?source=web_app_manifest'
        })
    };
}

router.get('/sw.js', renderSW);
router.get('/manifest.json', renderManifest);

router.get('/', function() { return renderPage('main'); });

exports.get = function (req) {
    return router.dispatch(req);
};
