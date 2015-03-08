var _ = require('lodash'),
    abilitiesDirectory = [];

exports.getByTitle = function(title){
    return _.find(abilitiesDirectory, function(_ability){
        return _ability.title === title;
    });
}

exports.init = function(){
    var Abilities = require('../models/abilitiesModel');

    Abilities.find({})
        .select({ _id: 0, __v:0 })
        .lean()
        .exec()
        .then(abilities => abilitiesDirectory = abilities);
}
