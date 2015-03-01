var Joi = require('joi'),
    _ = require('lodash'),
    Operations = require('../enums/operations');

var createRouteSchema = Joi.object().keys({
    route: Joi.string().min(1),
    methods: Joi.any().required(),
    model: Joi.any().required(),
    middleware: Joi.any(),
    select: Joi.any(),
    app: Joi.any().required(),
    operation: Joi.string().min(1)
});

var createEndpointSchema = Joi.object().keys({
    route: Joi.string().min(1),
    method: Joi.string().required(),
    model: Joi.any().required(),
    middleware: Joi.any(),
    select: Joi.any(),
    app: Joi.any().required(),
    operation: Joi.string().min(1)
});

var methodCreationHandlers = {
    'POST': function(options){
        return (req, res, next) => {
            var model = options.model,
                data = req.body;

            var entity = new model(data);
            entity.save(function(err, newEntity){
                if (err){
                    next(new Error(err));
                }

                res.status(200).send(newEntity);
            });
        }
    },
    'GET': function(options){
        return (req, res, next) => {
            var model = options.model,
                queryParams = req.params,
                operation = options.operation || Operations.GET.ONE,
                query = model[operation](queryParams);

            if (options.select){
                query.select(options.select);
            }

            query.exec().then(function(results){
                res.status(200).send(results);
            }, function(err){
                next(new Error(err));
            });
        }
    },
    'DELETE': function(options){
        return (req, res, next) => {
            var model = options.model,
                queryParams = req.params,
                operation = options.operation || Operations.DELETE.ONE,
                query;

            if (operation === Operations.DELETE.ONE){
                query = model[operation](queryParams._id);
            }

            //TODO: implement DELETE.FEW operation

            query.exec().then(function(document){
                res.status(200).send(document);
            }, function(err){
                next(new Error(err));
            });
        }
    }
};

function createRoute(options){
    Joi.validate(options, createRouteSchema, function(err){
        if (err){
            throw new Error(err);
        }

        _.each(options.methods, function(method){
            createEndpoint({
                method: method,
                route: options.route,
                model: options.model,
                app: options.app,
                middleware: options.middleware,
                select: options.select,
                operation: options.operation
            });
        });
    });
}

function createEndpoint(options){
    Joi.validate(options, createEndpointSchema, function(err){
        if (err){
            throw new Error(err);
        }

        var method = options.method.toUpperCase();

        if (options.middleware){
            options.app[method.toLowerCase()](options.route, options.middleware, methodCreationHandlers[method](options));
        } else {
            options.app[method.toLowerCase()](options.route, methodCreationHandlers[method](options));
        }
        console.log('REST >> %s %s endpoint initialized',method, options.route);
    });
}

exports.createRoute = createRoute;
exports.createEndpoint = createEndpoint;
