var fs = require('fs'),
    sax = require("sax"),
    tagStack = [],
    isText = false,
    isId = false;
var saxStream = sax.createStream({
    strict: true,
    normalize: true
});

saxStream.on("opentag", function (node) {
    if (node.name === "text") {
        isText = true;
        console.log(node.tag);
    }
    else
        isText = false;
    isId = !!(node.name === "id" && tagStack.indexOf("revision") <= -1);
    tagStack.push(node.name);
});

saxStream.on("closetag", function () {
    tagStack.pop();
    isText = false;
    isId = false;

});
saxStream.on("end", function () {
    fs.appendFileSync('data.json', '] \n');
});
saxStream.on("error", function (e) {
    console.error("error!", e);
    this._parser.error = null;
    this._parser.resume();
});

saxStream.on("text", function (text) {
    if (isId) {
        fs.appendFileSync('data.json', '{\n"id": ' + text.replace(/(\r\n|\n|\r)/gm, '')
            .replace(/[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, '') + ', \n');
    }
    if (isText && !isId) {
        fs.appendFileSync('data.json', ' "text": ' + '" ' + text.replace(/(\r\n|\n|\r)/gm, '')
            .replace(/[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ ]/g, '').substring(0, 40) + '" \n' + ' }, \n');
    }
});

fs.appendFileSync('data.json', '[ \n');

fs.createReadStream("thumb.xml").pipe(saxStream);

