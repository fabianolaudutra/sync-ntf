'use strict';

const RoutesExplanations = () => ({
    dispatch: () => {
        let payload = {
            type: "payload error",
            message: "Your request payload was sent with errors. Following, the correct way to use it...",
            body_params: {
                realm: {
                    type: "string",
                    explanation: " it should contain the REALM to where the app is deployed.",
                    example: "{ realm: 'production' }"
                },
                app: {
                    type: "string",
                    explanation: "it should contain which app is the notification refering to.",
                    example: "{ app: 'matching' }"
                },
                level: {
                    type: "string",
                    explanation: "it should contain one string with one of the following options: 'good', 'warning', 'danger'",
                    example: "{ level: 'warning' }"
                },
                message: {
                    type: "object",
                    explanation: "it should contain an object with [text] => mandatory, [title] => optional, and [icon] => optional attributes",
                    example: "{ message: 'Hello World!' }"
                },
                channels: {
                    type: "array",
                    explanation: "it should contain a array with all the options you may need.",
                    example: "{ channels: ['slack', 'telegram', 'mailgun'] }"
                },
                raw_response: {
                    type: "boolean",
                    explanation: "whether the message should be pure text, or with action button. If it should contain an action button {raw_response: false}, then webhook parameter is necessary.",
                    example: "{ raw_response: true }"
                },
                webhook: {
                    type: "string",
                    explanation: "an URL for callback purposes. This callback route should expect an argument called payload",
                    example: "{ webhook: 'https://sysmagnum.com/api/v1/messageaction' }"
                }/*,
                groups: {
                    type: "array",
                    explanation: "it should contain an array with all the necessary groups, iterated by it's type. If nothing, it will be sent to the defaults, pointed at config file.",
                    example: "{ groups: [{slack: 'daemon-notifications', telegram: 'api-error', email: 'api-error-message'}]}"
                }*/
            }
        }

        return payload;
    }
});

module.exports = RoutesExplanations;