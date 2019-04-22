'use strict';

const Request = require('request-promise');
const configFacade = require('./../config_facade');
const config = configFacade.consolidatedConfig();
const parser = Object.assign({}, require('./../dictionary/parser')());

const takeAction = (txt, level) => {
    return {
        "title": "Take Action!",
        "color": level,
        "attachment_type": "default",
        "mrkdwn_in": ["text", "pretext"],
        "text": txt
    }
}

const Message = () => ({
    parse: (requestData, isSimple) => {

        let msg = parser.format(requestData, true);
        let message = {
            "attachments": [
                {
                    "title": msg.title,
                    "pretext": msg.pretext || "",
                    "text": msg.text,
                    "color": msg.level,
                    "mrkdwn_in": ["text", "pretext"]
                },
                {
                    "title": "Notification Infos",
                    "text": "*Realm*: " + msg.realm + "\n*App*: " + msg.app,
                    "color": "good",
                    "mkrdwn_in": ["text", "pretext"]
                }
            ]
        }

        if(!isSimple) message.attachments.push(takeAction(msg.webhook, msg.level));

        let payload = {
            url: config.api["slack"].address,
            json: true,
            body: message
        }

        let objReturn = {
            payload: payload,
            type: 'slack'
        }
        return objReturn;
    },
    send: (payload) => {
        return new Promise((res, rej) => {
            Request.post(payload).
                then((response) => {
                    res(response);
                }).
                catch((exception) => {
                    rej(exception);
                });
        }); 
    }
});

module.exports = Message;