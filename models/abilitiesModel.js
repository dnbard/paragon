var mongoose = require('mongoose'),
    abilitiesSchema = require('./abilitiesSchema'),
    abilitiesModel = mongoose.model('abilities', abilitiesSchema);

module.exports = abilitiesModel;
