/*jshint node:true*/
/*jshint esversion: 6 */

'use strict';


const fs = require('fs');
const flatCache = require('flat-cache');
const cache = flatCache.load('email-cache');

const cacheLoader = () => ({
    init: () => {
        try {
            const dir = `${__dirname}/../../templates/`;
            const arrTemplates = fs.readdirSync(dir);

            const templates = arrTemplates.map((d) => {
                const file = fs.readFileSync(`${dir}${d}`, 'utf-8');
                return {
                    name: d.replace(/\.html/gim, ""),
                    template: file
                };
            })

            
            cache.removeKey('templates');
            cache.setKey('templates', { templates: templates });
            cache.save();
        }
        catch(exception) {
            console.log(exception)
        }
    },
    get: (name) => {
        const templates = cache.getKey('templates');

        var template = templates.templates.filter(function(template) {
            return template.name == name;
        })[0];

        
        // template = JSON.parse(JSON.stringify(template));
        return template;
    }
});


module.exports = cacheLoader;