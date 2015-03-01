var crypto = require('crypto'),
    uuid = require('node-uuid').v4,
    Users = require('../models/usersModel');

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
    //rely on auth.headers middleware

    Users.findOne({ _id: req.params._id })
        .exec()
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

exports.tranformPassword = transformPassword;
exports.createToken = createToken;
exports.allowSameUser = allowSameUser;
