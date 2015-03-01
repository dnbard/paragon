var NotImplementedError = require('./core/errors/notImplemented'),
    package = require('./package.json'),
    REST = require('./core/rest'),
    usersHelper = require('./helpers/usersHelper'),
    Operations = require('./enums/operations');

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

    REST.createRoute({
        route: '/api/users',
        methods: ['post'],
        model: require('./models/usersModel'),
        app: app,
        middleware: [ usersHelper.createToken, usersHelper.tranformPassword ]
    });

    REST.createRoute({
        route: '/api/users/:_id',
        methods: ['get', 'delete'],
        model: require('./models/usersModel'),
        app: app,
        select: { salt: false, password: false, __v: false, token: false }
    });

    //Log all routing errors
    app.use((err, req, res, next) => {
        if (err){ console.error(err); }
        next(err);
    });

    //Send appropriate failure responses to the client
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
            .send({ error: err.message });
    });
}
