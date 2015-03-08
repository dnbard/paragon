var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    parameterSchema = require('./parameterSchema'),
    abilitiesSchema = require('./abilitiesSchema'),
    heroSchema = new mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        userId: { type: String, index: true },
        name: { type: String, required: true },
        params: [ parameterSchema ],
        abilities: [ abilitiesSchema ],
        class: { type: String, required: true }
    }),
    heroModel = mongoose.model('heroes', heroSchema);

module.exports = heroModel;
