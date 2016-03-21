'use strict';

var express = require('express'),
  crud = require('./crud'),
  rest = {
    models: [],
    app: null,
    namespace: '',
  },
  verbs = [
    'get',
    'post',
    'patch',
    'put',
    'delete'
  ];

module.exports = function(opts) {
  rest.app = opts.app || null;
  rest.models = opts.models || [];
  rest.namespace = opts.namespace || '';
  return {
    create: create
  };
};

function create() {
  if (rest.app) {
    rest.models.forEach(endpoints);
  }
}

function endpoints(model) {
  var schema = model.schema,
    router = express.Router(),
    path = rest.namespace + '/' + schema.modelName.toLowerCase() + 's';
  if (!model.plural || !model.plural.hidden) {
    register(model.plural, router, path);
  }
  if (!model.singular || !model.singular.hidden) {
    register(model.singular, router, path + '/:id');
  }
  rest.app.use(router);
}

function fallback(req, res) {
  res.json({
    message: 'forbidden'
  });
}

function before(req, res, next) {
  next();
}

function after(req, res) {
  res.json({
    verb: res.locals.verb
  });
}

function register(collection, router, path) {
  var plural = router.route(path);
  verbs.forEach(function(verb) {
    var route = collection[verb];
    if (!route || !route.hidden) {
      var hooks = {
        before: route && route.before ? route.before : before,
        after: route && route.after ? route.after : after,
      };
      plural[verb](hooks.before, crud[verb], hooks.after);
    }
  });
  plural.all(fallback);
}