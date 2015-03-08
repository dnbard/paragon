var _ = require('lodash'),
    classesDirectory = [];

exports.getByTitle = function(title){
    return _.find(classesDirectory, function(_class){
        return _class.title === title;
    });
}

exports.init = function(db){
    var Classes = require('../models/classesModel');

    Classes.find({})
        .lean()
        .exec()
        .then(classes => classesDirectory = classes);
}
