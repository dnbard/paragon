var UsersDirectory = require('../services/usersDirectory');

function auth(req, res, next){
    var authHeader = req.headers['authorization'];

    UsersDirectory.getByToken(authHeader)
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
