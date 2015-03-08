var mongoose = require('mongoose'),
    parameterSchema = mongoose.Schema({
        title: String,
        value: Number
    },{ _id : false });

module.exports = parameterSchema;
