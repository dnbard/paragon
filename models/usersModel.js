var mongoose = require('mongoose'),
    uuid = require('node-uuid').v4,
    Schema = mongoose.Schema;;

module.exports = mongoose.model('user', new Schema({
    _id: { type: String, unique: true, default: uuid },
    login: { type: String, index: true, required: true },
    token: { type: String, index: true },
    salt: String,
    password: { type: String, required: true }
}));
