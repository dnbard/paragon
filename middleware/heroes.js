var _ = require('lodash'),
    classesDirectory = require('../services/classesDirectory'),
    abilitiesDirectory = require('../services/abilitiesDirectory');

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

function applyAbility(hero, abilityName){
    var ability = abilitiesDirectory.getByTitle(abilityName);

    if (!hero.abilities){
        hero.abilities = [];
    }

    if (ability){
        hero.abilities.push(ability);
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
    _.each(heroClass.defaultAbilities, ability => applyAbility(req.body, ability));

    next();
}
