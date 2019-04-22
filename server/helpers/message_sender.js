'use strict';

const message = Object.assign({}, require('./factory')());

const MessageSender = () => ({
    send: (data) => {
        return new Promise((res, rej) => {
            try {
                message.instanceOf(data.type).send(data.payload).
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

module.exports = MessageSender;