var Users = require('../models/usersModel');
//TODO: cache user information to reduce number of requests

function get(id){
    return searchUserByField('_id', id);
}

function getByToken(tokenId){
    return searchUserByField('token', tokenId);
}

function searchUserByField(fieldName, id){
    var query = {},
        promise;

    query[fieldName] = id;

    promise = new Promise(function(resolve, reject){
        Users.findOne(query)
            .lean()
            .exec()
            .then(resolve);
    });

    return promise;
}

exports.get = get;
exports.getByToken = getByToken;
