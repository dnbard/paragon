function bootstrapDataInDatabase(model, data, field, id){
    var query = {};
    query[field] = id;

    model.findOne(query)
        .exec()
        .then((entity) => {
            if(entity){
                //TODO: check with data and modify if needed
            } else {
                entity = new model(data);
                entity.save();
            }
        })
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
