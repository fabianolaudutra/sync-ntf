'use strict';


const explanation = Object.assign({}, require('./../helpers/routes_explanations')());

const messageModel = Object.assign({}, require('./../helpers/message_builder')());

module.exports = function(Message) {

    Message.remoteMethod('ping', {
        http: { "path": "/ping", "verb": "get" },
        accepts: [{ arg: "req", type: "object", required: true, http: function(ctx) { return ctx.req; } }],
        returns: { arg: "result", type: "object" }
    });

    Message.ping = async function(req) {

        return { response: "pong" }
    }


    Message.remoteMethod('dispatch', {
        http: { "path": "/dispatch", "verb": "post" },
        accepts: [{ arg: "req", type: "object", required: true, http: function(ctx) { return ctx.req; } }],
        returns: { arg: "result", type: "object" }
    });


    Message.dispatch = async function(req) {

        const channels = req.body.channels;
        const type = req.body.type;
        const message = req.body.message;
        const groups = req.body.groups;
        const raw_response = req.body.raw_response;
        const webhook = req.body.webhook;
        const level = req.body.level;
        const realm = req.body.realm;
        const app = req.body.app;


        let exited = false;
        return new Promise((resolve, reject) => {
            if((channels == null && type == null) || (message == null) || (realm == null) || (app == null)) {
                exited = true;
                resolve(explanation.dispatch());
            }

            let payload = {};

            if(level == null) {
                exited = true;
                resolve(explanation.dispatch());
            }
            else {
                payload.level = level;
            }

            if(realm == null) {
                exited = true;
                resolve(explanation.dispatch());
            }
            else {
                payload.realm = realm;
            }


            if(app == null) {
                exited = true;
                resolve(explanation.dispatch());
            }   
            else {
                payload.app = app;
            }

            if(raw_response != null) {
                payload.raw_response = raw_response;

                if(!raw_response) {
                    if(webhook == null) {
                        exited = true;
                        resolve(explanation.dispatch());
                    }
                    else {
                        payload.webhook = webhook;
                    }
                }
            }
            else {
                payload.raw_response = false;
            }

            if(channels != null) {
                payload.channels = channels;
                payload.hasChannels = true;
                payload.hasType = false;
            }
            else {
                if(type == null) {
                    exited = true;
                    resolve(explanation.dispatch());
                }
                else {
                    payload.type = type;
                    payload.hasChannels = false;
                    payload.hasType = true;
                }
            }

            if(groups == null) {
                payload.groups = null;
                payload.hasGroups = false;
            }
            else {
                payload.hasGroups = true;
                payload.groups = groups;
            }

            if(message == null) {
                exited = true;
                resolve(explanation.dispatch());
            }
            else {
                payload.message = message;
            }
            
            console.log("--------------------------------------------------------------------------------");
            console.log('channels: ', channels, ' isNull? ', channels == null, ' typeof: ', typeof channels);
            console.log('type: ', type, ' isNull? ', type == null, ' typeof: ', typeof type);
            console.log('message: ', JSON.stringify(message), 'isNull? ', message == null, ' typeof: ', typeof message);
            //console.log('groups: ', groups, ' isNull? ', groups == null, ' typeof: ', typeof groups);
            console.log('raw_response: ', raw_response, ' isNull? ', raw_response == null, ' typeof: ', typeof raw_response);
            console.log('webhook: ', webhook, ' isNull? ', webhook == null, ' typeof: ', typeof webhook);
            console.log('level: ', level, ' isNull? ', level == null, ' typeof: ', typeof level);
            console.log('realm: ', realm, ' isNull? ', realm == null, ' typeof: ', typeof realm);
            console.log('app: ', app, ' isNull? ', app  == null, ' typeof: ', typeof app);
            console.log("--------------------------------------------------------------------------------");

            function save(load) {
                Message.create(payload);
            }

            if(!exited) {
                messageModel.build(payload).
                then((data) => {
                    save();
                    resolve({type: "success", data: data});
                }).
                catch((exception) => {
                    save();
                    reject({type: "error", exception: exception, data: null});
                });
            }

        });
    }

};
