var _ = require('lodash');

function bootstrapDataInDatabase(model, data, field, id){
    var query = {};
    query[field] = id;

    model.findOne(query)
        .exec()
        .then((entity) => {
            var modified = false;
            if(entity){
                _.each(data, (value, key) => entity[key] = value);
            } else {
                entity = new model(data);
            }

            entity.save();
        });
}

exports.all = function(app){
    var Classes = require('./models/classesModel'),
        Abilities = require('./models/abilitiesModel');

    function bootstrapClass(id, data){
        bootstrapDataInDatabase(Classes, data, 'title', id);
    }

    function bootstrapAbility(id, data){
        bootstrapDataInDatabase(Abilities, data, 'title', id);
    }

    _.each(require('./data/classes'), (classData) => bootstrapClass(classData.title, classData));
    _.each(require('./data/abilities'), (abilityData) => bootstrapAbility(abilityData.title, abilityData));
}
