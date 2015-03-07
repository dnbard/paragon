var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    heroSchema = new mongoose.Schema({
        _id: { type: String, unique: true, default: uuid },
        userId: { type: String, index: true },
        name: { type: String, required: true },
        params: [{
            title: String,
            value: Number
        }],
        abilities: [String],
        class: { type: String, required: true }
    }),
    heroModel = mongoose.model('heroes', heroSchema);

module.exports = heroModel;
