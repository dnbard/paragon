require('babel/register');

var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    config = require('./config'),
    routing = require('./routing'),
    middlewares = require('./middlewares'),
    bootstrap = require('./bootstrap'),
    classesDirectory = require('./services/classesDirectory'),
    abilitiesDirectory = require('./services/abilitiesDirectory');


mongoose.connect(config.mongodb);

var db = mongoose.connection;

classesDirectory.init(db);
abilitiesDirectory.init(db);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    middlewares(app);
    bootstrap.all(app);
    routing(app);

    var server = app.listen(config.port, function(){
        var port = server.address().port;
        console.log('Paragon app listening to %s port', port);
    });
});
