var crypto = require('crypto'),
    uuid = require('node-uuid').v4;

function transformPassword(req, res, next){
    var password = req.body.password;
    req.body.salt = crypto.randomBytes(16);
    req.body.password = crypto.createHash('md5')
        .update(password + req.body.salt)
        .digest('hex');

    next();
}

function createToken(req, res, next){
    req.body.token = uuid();

    next();
}

exports.tranformPassword = transformPassword;
exports.createToken = createToken;
