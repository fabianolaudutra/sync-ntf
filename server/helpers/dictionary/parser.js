const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const removeAccents = (str) => {
    var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
      if ((x = accents.indexOf(str[i])) != -1) {
        str[i] = accentsOut[x];
      }
    }
    return str.join('');
};

const Parser = () => ({
    format:(objMSG, onlyHTMLEntities = false) => {

        objMSG = {
            title: entities.decode(objMSG.title),
            pretext: entities.decode(objMSG.pretext),
            text: entities.decode(objMSG.text),
            webhook: objMSG.webhook,
            realm: objMSG.realm,
            app: objMSG.app,
            level: objMSG.level
        }
        
        let retorno = {
            title: (onlyHTMLEntities) ? objMSG.title : removeAccents(objMSG.title),
            pretext: (onlyHTMLEntities) ? objMSG.pretext : removeAccents(objMSG.pretext),
            text: (onlyHTMLEntities) ? objMSG.text : removeAccents(objMSG.text),
            realm: objMSG.realm,
            app: objMSG.app,
            webhook: objMSG.webhook,
            level: objMSG.level
        }

        
        return retorno;
    }
});

module.exports = Parser;