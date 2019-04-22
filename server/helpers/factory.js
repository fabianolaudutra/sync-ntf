'use strict';

const slack = require('./slack/message');
const telegram = require('./telegram/message');
const mailgun = require('./mailgun/message');

const Factory = () => ({
    instanceOf: (type) => {
        
        let objReturn;
        switch(type) {
            case "slack":
                objReturn = Object.assign({}, slack());
                break;
            case "telegram":
                objReturn = Object.assign({}, telegram());
                break;
            case "mailgun":
                objReturn = Object.assign({}, mailgun());
                break;
        }

        return objReturn;
    } 
});

module.exports = Factory;