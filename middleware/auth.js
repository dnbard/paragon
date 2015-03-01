var Users = require('../models/usersModel');

function auth(req, res, next){
    var authHeader = req.headers['authorization'];

    //TODO: cache tokens
    Users.findOne({ token: authHeader })
        .lean()
        .exec()
        .then(function(user){
            if (!user){
                return next({
                    status: 403,
                    message: 'Invalid token'
                });
            }

            req.user = user;
            next();
        });
}

exports.header = auth;
