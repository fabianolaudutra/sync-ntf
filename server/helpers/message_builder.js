'use strict';

const message = Object.assign({}, require('./factory')());
const request = Object.assign({}, require('./message_sender')());

const MessageBuilder = () => ({
    build: (requestData) => {
        return new Promise((res, rej) => {
            
            try {
                let receivers = [];
                if(!requestData.hasChannels) requestData.channels = [requestData.type];
                
                let payload = requestData.channels.map((r) => {
                    let msg = requestData.message;
                    msg.webhook = requestData.webhook;
                    msg.level = requestData.level;
                    msg.realm = requestData.realm;
                    msg.app = requestData.app;
                    
                    return message.instanceOf(r).parse(msg, requestData.raw_response);
                });

                let async = payload.map(request.send);
    
                Promise.all(async).
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

module.exports = MessageBuilder;

