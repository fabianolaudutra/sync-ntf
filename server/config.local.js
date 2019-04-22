'use strict';

var c = require('./config.json');
var p = require('../package.json');
var name = p.name;
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version + '/' + name : ''),
  host: process.env.HOST || c.host,
  port: process.env.PORT || c.port,
};