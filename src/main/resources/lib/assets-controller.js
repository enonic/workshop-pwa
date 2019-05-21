var ioLib = require('/lib/xp/io');

var getMimeType = function (path) {
    var type = ioLib.getMimeType(path);
    if (type && type !== 'application/octet-stream') {
        return type;
    }

    return null;
};

exports.get = function (req) {

    var assetPath = req.url.slice(req.url.indexOf('/precache'));
    var fullPath = '../assets' + assetPath;

    return {
        contentType: getMimeType(fullPath),
        body: ioLib.getResource(resolve(fullPath)).getStream()
    };
};
