'use strict';

var mongoose = require('mongoose'),
  hidden = require('mongoose-hidden')();

var Schema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    hide: true
  },
  email: {
    type: String,
    required: true,
    hide: true
  },
  dgu: {
    type: String,
    required: true,
    hide: true
  },
  username: {
    type: String,
    required: true,
    hide: true
  },
});

Schema.plugin(hidden);

module.exports = mongoose.model('User', Schema);