'use strict';


const configFacade = require('./../config_facade');
const config = configFacade.consolidatedConfig();
const parser = Object.assign({}, require('./../dictionary/parser')());
const cache = Object.assign({}, require('./../cache/cache_loader')());
const emailParser = require('./parser');


const Message = () => ({
    parse: (requestData, isSimple) => {

        const mailTemplate = cache.get("default");
        
        let msg = parser.format(requestData);

        let txtEmail = `${msg.title}\n\n REALM:${msg.pretext}\n\n APP:${msg.realm}\n${msg.app}\n\n${msg.text}`
        
        
        let HTMLEmail = emailParser.parse(mailTemplate.template, msg);
        
        
        let payload = {
            from: config.api["mailgun"].bot,
            to: config.api["mailgun"].to,
            subject: msg.title,
            text: txtEmail,
            html: HTMLEmail 
        }

        let objReturn = {
            payload: payload,
            type: 'mailgun'
        }

        return objReturn;
    },
    send: (payload) => {
        return new Promise((res, rej) => {
            try {

                const mailgun = require('mailgun-js')({ apiKey: config.api["mailgun"].apiKey, domain: config.api["mailgun"].domain });

                
                mailgun.messages().send(payload).
                    then((response) => {
                        res(response);
                    }).
                    catch((exception) => {
                        rej(exception);
                    })
            }
            catch(error) {
                rej(error);
            }
        }); 
    }
});

module.exports = Message;