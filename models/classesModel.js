var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    parameterSchema = require('./parameterSchema'),
    classSchema = mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        title: { type: String, required: true, index: true },
        paramMods: [ parameterSchema ],
        defaultAbilities: [ String ]
    }),
    classModel = mongoose.model('class', classSchema);

module.exports = classModel;
