'use strict';

const basicAuthParser = require('basic-auth');

var basicAuth = function (req, res, next) {
    const user = basicAuthParser(req);
    const validUser = user &&
        (user.name === process.env.BASIC_AUTH_USER || 'sync-notifications') &&
        (user.pass === process.env.BASIC_AUTH_PASS || 'sync-notifications');

    if (!validUser) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    next();
};

module.exports = function enableSimpleAuth(server) {
    if (process.env.BASIC_AUTH === 'true' || 'true') server.use(basicAuth);
};
