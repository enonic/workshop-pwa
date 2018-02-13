var mustacheLib = require('/lib/xp/mustache');
var helper = require('/lib/helper');
/*
var router = require('/lib/router')();

var renderPage = function(pageName) {
    return function() {
        return {
            body: mustacheLib.render(resolve('pages/' + pageName), {
                title: siteTitle,
                version: app.version,
                baseUrl: helper.getBaseUrl(),
                appUrl: helper.getAppUrl(),
                precacheUrl: helper.getBaseUrl() + '/precache',
                themeColor: '#FFF'
            })
        };
    }
};

router.get('/', renderPage('main.html'));

router.get('/about', renderPage('about.html'));

router.get('/sw.js', swController.get);

exports.get = function (req) {
    return router.dispatch(req);
};
*/
exports.get = function (req) {

    return {
        body: mustacheLib.render(resolve('pages/main.html'), {
            title: 'My First PWA',
            version: app.version,
            appUrl: helper.getAppUrl(),
            baseUrl: helper.getBaseUrl(),
            precacheUrl: helper.getBaseUrl() + '/precache',
            themeColor: '#FFF'
        })
    }
};