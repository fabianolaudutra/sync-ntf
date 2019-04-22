/*jshint node:true*/
/*jshint esversion: 6 */
//require('dotenv').config();

const _ = require('lodash');
const environment = process.env.NODE_ENV || "dev";

const preconfig = require('./../conf/global');
const postConfig = require('./../conf/' + environment);

exports.consolidatedConfig = function() {

    let config = {};

    config = _.concat(preconfig, postConfig);
    config[0].platform = environment;

    console.log('=====> LOADING ENVIRONMENT: ', environment);
    
    config = _.merge(config[0], config[1]);

    return config;
    
};