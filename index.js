'use strict';

var express = require('express'),
  app = express();

var rest = require('./source')({
  models: [{
    schema: require('./models/user'),
    all: function(req, res, next) {
      next();
    },
    plural: {
      hidden: false
    },
    singular: {
      hidden: false,
      get: {
        hidden: false
      },
      post: {
        before: function(req, res, next) { next(); },
      },
      put: {
        before: function(req, res, next) { next(); },
      },
      patch: {
        before: function(req, res, next) { next(); },
      },
      delete: {
        before: function(req, res, next) { next(); },
      },
    }
  }],
  namespace: '/api/v1',
});

rest.create();

app.listen(8082);