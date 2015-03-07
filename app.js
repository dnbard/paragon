require('babel/register');

var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    config = require('./config'),
    routing = require('./routing'),
    middlewares = require('./middlewares');

mongoose.connect(config.mongodb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    middlewares(app);
    routing(app);

    var server = app.listen(config.port, function(){
        var port = server.address().port;
        console.log('Paragon app listening to %s port', port);
    });
});
