var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    parameterSchema = require('./parameterSchema'),
    abilitiesSchema = new mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        title: { type: String, required: true, index: true },
        cost: {
            mana: { type: Number },
            rage: { type: Number },
            health: { type: Number },
            focus: { type: Number }
        },
        ranged: { type: Boolean, default: false }, // ranged attacks cannot be parried
        description: String,
        damage: { type: Number, default: 1 },
        requirements: [ parameterSchema ]
    },{ _id : false });

module.exports = abilitiesSchema;
