var package = require('../package.json');

exports.default = function(req, res, next){
    res.send({
        status: "OK",
        version: package.version
    });
}
