var NotImplementedError = require('./core/errors/notImplemented'),
    REST = require('./core/rest'),
    usersMiddleware = require('./middleware/users'),
    Operations = require('./enums/operations'),
    healthController = require('./controllers/health'),
    loginController = require('./controllers/login');

module.exports = function(app){
    app.get('/', (req, res, next) => {
        throw new NotImplementedError('GET /');
    });

    app.get('/_health', healthController.default);

    REST.createRoute({
        route: '/api/users',
        methods: ['post'],
        model: require('./models/usersModel'),
        app: app,
        middleware: [ usersMiddleware.createToken, usersMiddleware.tranformPassword ]
    });

    REST.createRoute({
        route: '/api/users/:_id',
        methods: ['get', 'delete'],
        model: require('./models/usersModel'),
        app: app,
        select: { salt: false, password: false, __v: false, token: false }
    });

    app.post('/login', loginController.default);


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
