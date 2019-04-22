exports.parse = (template, payload) => {

    let content = "";

    content = template.replace(new RegExp("\{\{title\}\}", "gim"), payload.title);
    content = content.replace(new RegExp("\{\{pretext\}\}", "gim"), payload.pretext);
    content = content.replace(new RegExp("\{\{text\}\}", "gim"), payload.text);
    content = content.replace(new RegExp("\{\{realm\}\}", "gim"), payload.realm);
    content = content.replace(new RegExp("\{\{app\}\}", "gim"), payload.app);
    content = content.replace(new RegExp("\{\{webhook\}\}", "gim"), payload.webhook);

    return content;
}