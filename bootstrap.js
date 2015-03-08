var _ = require('lodash');

function bootstrapDataInDatabase(model, data, field, id){
    var query = {};
    query[field] = id;

    return new Promise((resolve, reject) => {
        model.findOne(query)
        .exec()
        .then((entity) => {
            var modified = false;
            if(entity){
                _.each(data, (value, key) => entity[key] = value);
            } else {
                entity = new model(data);
            }

            entity.save((err) => {
                if (err){
                    return reject(err);
                }

                return resolve();
            });
        });
    });
}

exports.all = function(app){
    var Classes = require('./models/classesModel'),
        Abilities = require('./models/abilitiesModel'),
        promises;

    function bootstrapClass(id, data){
        return bootstrapDataInDatabase(Classes, data, 'title', id);
    }

    function bootstrapAbility(id, data){
        return bootstrapDataInDatabase(Abilities, data, 'title', id);
    }

    var classPromises = _.map(require('./data/classes'), (classData) => bootstrapClass(classData.title, classData));
    var abilityPromises = _.map(require('./data/abilities'), (abilityData) => bootstrapAbility(abilityData.title, abilityData));

    promises = _.union(classPromises, abilityPromises);

    return Promise.all(promises);
}
