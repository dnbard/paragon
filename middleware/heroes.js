var _ = require('lodash'),
    classesDirectory = require('../services/classesDirectory');

function applyParam(hero, param){
    var selectedParam = _.find(hero.params, p => p.title === param.title);

    if (selectedParam){
        selectedParam.value += param.value;
    } else {
        hero.params.push({
            title: param.title,
            value: param.value
        });
    }
}

exports.onPostValidate = function(req, res, next){
    req.body.abilities = [];
    req.body.params = [];

    if (!req.body.class || typeof req.body.class !== 'string' || !classesDirectory.getByTitle(req.body.class)){
        return next({
            status: 400,
            message: 'Field "class" must be set to valid value'
        });
    }

    var heroClass = classesDirectory.getByTitle(req.body.class);

    _.each(heroClass.paramMods, paramMod => applyParam(req.body, paramMod));

    next();
}
