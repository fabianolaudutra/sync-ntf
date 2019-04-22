'use strict';

var os = require('os');
var v8 = require('v8');
var dns = require('dns');
var server = require('net');
var moment = require('moment-timezone');
var osLocale = require('os-locale');
var healthcheck = require('healthcheck-middleware');
var MongoClient = require('mongodb').MongoClient;

var c = require('../config.json');
var p = require('../../package.json');
var name = p.name;
var version = p.version;

module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/healthcheck', healthcheck({
    healthInfo: function(passInfo) {
      if (passInfo.status == 'success') {
        var status = 'alive';
      }
      return {
        status: status,
        uptime: process.uptime(),
      };
    },
  }));

  router.get('/healthcheck/complete', healthcheck({
    healthInfo: function(passInfo) {
      if (passInfo.status == 'success') {
        var status = 'alive';
      }
      return {
        status: status,
        processUptime: process.uptime(),
      };
    },
  }));

  router.get('/about', healthcheck({
    healthInfo: function(passInfo) {
      return {
        appName: p.name,
        appVersion: p.version,
        nodeVersion: process.release.lts + '/' + process.version,
        depVersions: process.versions,
        serverName: os.hostname(),
        serverArch: os.arch(),
        serverPlatform: os.platform(),
        serverOS: os.release(),
        serverUptime: os.uptime(),
        dnsServers: dns.getServers(),
        envHost: process.env.HOST || c.host,
        envPort: process.env.PORT || c.port,
        envTZ: process.env.TZ || moment.tz.guess(),
        timeZoneOffset: moment().format('Z'),
        locale: osLocale.sync(),
      };
    },
  }));

  router.get('/perfstat', healthcheck({
    healthInfo: function(passInfo) {
      return {
        serverUptime: os.uptime(),
        serverLoadAvg: os.loadavg(),
        serverFreeMem: os.freemem(),
        serverCpus: os.cpus(),
        processMem: process.memoryUsage(),
        v8HeapStatistics: v8.getHeapStatistics(),
        v8HeapSpaceStats: v8.getHeapSpaceStatistics(),
      };
    },
  }));
  app.use(router);
};
