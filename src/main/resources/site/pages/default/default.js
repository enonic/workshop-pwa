var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var view = resolve('../../../templates/page.html');

function getBgColor() {
    var siteConfig = portal.getSiteConfig();
    var bgColor;
    switch (siteConfig.backgroundColor) {
    case 'grey':
        bgColor = '#EEEEEE';
        break;
    case 'white':
        bgColor = '#FFFFFF';
        break;
    case 'red':
        bgColor = '#D59392';
        break;
    case 'blue':
        bgColor = '#F0F8FF';
        break;
    default:
        bgColor = '#FFFFFF';
    }

    return bgColor;
}

function getSiteUrl() {

    var sitePath = portal.getSite()._path;
    return portal.pageUrl({
        path: sitePath
    }) + '/';
}

function handleGet(req) {

    var params = {
        title: 'PWA Workshop',
        pageId: 'main',
        appUrl: getSiteUrl(),
        bgColor: getBgColor(),
        version: app.version,
        isLive: (req.mode == 'live')
    };
    var body = thymeleaf.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;