var NotImplementedError = require('./core/errors/notImplemented'),
    package = require('./package.json');

module.exports = function(app){
    app.get('/', (req, res, next) => {
        throw new NotImplementedError('GET /');
    });

    app.get('/_health', (req, res, next) => {
        res.send({
            status: "OK",
            version: package.version
        });
    });


    //Log all routing errors
    app.use((err, req, res, next) => {
        if (err){ console.error(err); }
        next(err);
    });

    //Send appropriate failure responses to the client
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
            .send({ error: err });
    });
}
