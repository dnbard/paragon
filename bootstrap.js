var _ = require('lodash');

function checkProperty(entity, fieldValue, fieldName){
    var isModified, arrayOpenResult;

        if (typeof fieldValue === 'object' && typeof entity[fieldName] === 'object'){
            arrayOpenResult = _.map(fieldValue, (value, name) => checkProperty(entity[fieldName], value, name));
            isModified = _.reduce(arrayOpenResult, (res, curr) => res || curr);
        } else if (entity[fieldName] !== fieldValue){
            entity[fieldName] = fieldValue;
            isModified = true;
        }

        return isModified;
}

function checkEntity(entity, entityValue){
    var arrayOpenResult = _.map(entityValue, (fieldValue, fieldName) => checkProperty(entity, fieldValue, fieldName));
    return _.reduce(arrayOpenResult, (res, curr) => res || curr);
}

function bootstrapDataInDatabase(model, data, field, id){
    var query = {};
    query[field] = id;

    model.findOne(query)
        .exec()
        .then((entity) => {
            var modified = false;
            if(entity){
                modified = checkEntity(entity, data);
            } else {
                entity = new model(data);
                modified = true;
            }

            if (modified){
                console.log('save');
                entity.save();
            }
        });
}

exports.classes = function(){
    var Classes = require('./models/classesModel');

    function bootstrapClass(id, data){
        bootstrapDataInDatabase(Classes, data, 'title', id);
    }

    bootstrapClass('hunter', {
        title: 'hunter',
        paramMods: [{
            title: 'dexterity',
            value: 10
        }]
    });
}

exports.all = function(app){
    exports.classes();
}
