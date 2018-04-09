var portal = require('/lib/xp/portal');
var mustache = require('/lib/xp/mustache');
var view = resolve('../templates/manifest.json');

function getSiteUrl() {

    var sitePath = portal.getSite()._path;
    return portal.pageUrl({
        path: sitePath
    }) + '/';
}

exports.get = function () {
    return {
        contentType: 'application/json',
        body: mustache.render(view, {
            startUrl: getSiteUrl() + '?source=web_app_manifest'
        })
    };
};
