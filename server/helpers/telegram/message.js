'use strict';
const Request = require('request-promise');
const configFacade = require('./../config_facade');
const config = configFacade.consolidatedConfig();
const parser = Object.assign({}, require('./../dictionary/parser')());

const Message = () => ({
    parse: (requestData, isSimple) => {

        const message = parser.format(requestData);

        let title = `*${message.title}*`;
        let pretext = `\n *NOTICE*: ${message.pretext}`;
        let text = `\n \n *MESSAGE*: ${message.text}`;

        let action = "";

        if(message.webhook != null) {
            action = "\n *TAKE ACTION: * ["+message.webhook+"]("+message.webhook+")";
        }

        let realm = `\n *Realm*: ${message.realm}`;
        let app = `\n *App*: ${message.app}`;

        let body = `${title}${pretext}${realm}${app}${text}${action}`;
        body = encodeURIComponent(body)
        
        
        let payload =  `${config.api["telegram"].address}${config.api["telegram"].token}/sendMessage?chat_id=-${config.api["telegram"].chat}&text=${body}&parse_mode=Markdown`;

        return {payload: {url: payload}, type: 'telegram'};
    },
    send: (payload) => {
        
        return new Promise((res, rej) => {
            try {
                Request.get(payload).
                then((response) => {
                    res(response);
                }).
                catch((exception) => {
                    rej(exception);
                });
            }
            catch(error) {
                rej(error);
            }
            
        }); 
    }
});

module.exports = Message;