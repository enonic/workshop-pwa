var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var router = require('/lib/router')();
var mustache = require('/lib/mustache');
var siteTitle = 'PWA Workshop';

function getAppUrl() {
    return portalLib.url({path:'/webapp/' + app.name}) + '/';
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
        body: thymeleaf.render(resolve('/templates/page.html'), model)
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
router.get('/{path:.+}', function() { return renderPage('fallback', 'Under construction'); });

exports.get = function (req) {
    return router.dispatch(req);
};
