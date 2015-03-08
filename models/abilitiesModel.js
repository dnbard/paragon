var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    abilitiesSchema = new mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        title: { type: String, required: true, index: true },
        cost: {
            mana: {type: Number, default: 0},
            rage: {type: Number, default: 0},
            health: {type: Number, default: 0},
            focus: {type: Number, default: 0}
        },
        ranged: { type: Boolean, default: false }, // ranged attacks cannot be parried
        description: String,
        damage: { type: Number, default: 1 },
        requirements: [{
            title: String,
            value: Number
        }]
    }),
    abilitiesModel = mongoose.model('abilities', abilitiesSchema);

module.exports = abilitiesModel;
