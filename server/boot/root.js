'use strict';

const cache = Object.assign({}, require('./../helpers/cache/cache_loader')());

module.exports = function(server) {
  // Install a `/` route that returns server status

  console.log('init')
  cache.init();
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
