var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    classSchema = new mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        title: { type: String, required: true, index: true },
        paramMods: [{
            title: String,
            value: Number
        }],
        defaultAbilities: [ String ]
    }),
    classModel = mongoose.model('class', classSchema);

module.exports = classModel;
