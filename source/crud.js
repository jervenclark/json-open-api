'use strict';

module.exports = {
  post: post,
  get: get,
  patch: patch,
  put: put,
  delete: remove
}

function get(req, res, next) {
	res.locals = {
    verb: 'get'
  }
  next();
}

function post(req, res, next) {
  res.locals = {
    verb: 'post'
  }
  next();
}

function put(req, res, next) {
  res.locals = {
    verb: 'put'
  }
  next();
}

function patch(req, res, next) {
  res.locals = {
    verb: 'patch'
  }
  next();
}

function remove(req, res, next) {
  res.locals = {
    verb: 'remove'
  }
  next();
}