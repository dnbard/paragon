var crypto = require('crypto'),
    uuid = require('node-uuid').v4,
    UsersDirectory = require('../services/usersDirectory');

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

function allowSameUser(req, res, next){
    //relay on auth.headers middleware

    UsersDirectory.get(req.params._id)
        .then(function(user){
            if (!user || !req.user || user.token !== req.user.token){
                next({
                    status: 403,
                    message: 'Invalid token'
                });
            } else {
                next();
            }
        });
}

function saveIdInBody(req, res, next){
    //relay on auth.headers middleware

    if (req.user && req.user._id){
        req.body.userId = req.user._id;
        return next();
    } else {
        return next({
            status: 403,
            message: 'Invalid token'
        });
    }
}

exports.tranformPassword = transformPassword;
exports.createToken = createToken;
exports.allowSameUser = allowSameUser;
exports.saveIdInBody = saveIdInBody;
