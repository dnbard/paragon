var Joi = require('joi'),
    loginSchema = Joi.object().keys({
        login: Joi.string().min(1),
        password: Joi.string().min(1)
    }),
    Users = require('../models/usersModel'),
    crypto = require('crypto'),
    uuid = require('node-uuid').v4;

exports.default = function(req, res, next){
    Joi.validate(req.body, loginSchema, function(err){
        if (err){
            next(new Error(err));
        }

        Users.findOne({
            login: req.body.login
        }).exec().then(function(user){
            if (!user){
                return next({
                    message: 'User ' + req.body.login + ' not found',
                    status: 400
                });
            }

            var passwordCheck = crypto.createHash('md5')
                .update(req.body.password + user.salt)
                .digest('hex');

            if (passwordCheck !== user.password){
                //invalid password
                return next({
                    status: 401,
                    message: 'Invalid password'
                });
            }

            //set new token and return it
            user.token = uuid();
            user.save(function(err){
                if (err){
                    return next(new Error(err));
                }

                res.status(200).send({
                    _id: user._id,
                    token: user.token
                });
            });
        });
    });
}
