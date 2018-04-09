var portal = require('/lib/xp/portal');
var mustache = require('/lib/xp/mustache');
var view = resolve('../templates/sw.js');

function getSiteUrl() {

    var sitePath = portal.getSite()._path;
    return portal.pageUrl({
        path: sitePath
    }) + '/';
}

exports.get = function () {
    var siteUrl = getSiteUrl();

    return {
        headers: {
            'Service-Worker-Allowed': siteUrl
        },
        contentType: 'application/javascript',
        // sw.js will be generated during build by Workbox from webpack.config.js
        body: mustache.render(view, {
            appUrl: siteUrl,
            assetUrl: portal.assetUrl({path: ''}),
            appVersion: app.version
        })
    };
};
