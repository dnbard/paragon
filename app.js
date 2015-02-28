var express = require('express'),
    app = express(),
    config = require('./config');

app.get('/', (req, res) => {
    res.send('hello world');
});

var server = app.listen(config.port, () => {
    var port = server.address().port;
    console.log('Paragon app listening to %s port', port);
});
