'use strict';
module.exports = function (AuditTrail) {

    AuditTrail.disableRemoteMethod('updateAttributes');

    var p = require('../../package.json');
    var name = p.name;

    AuditTrail.observe('before save', function (ctx, next) {

        if (ctx.instance) { // create operation
            ctx.instance.system_name = p.name;
            next();
        }
    });
};
