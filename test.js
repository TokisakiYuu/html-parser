const htmlParser = require("htmlparser2");
const stringify = require("domutils/lib/stringify");

const doc = htmlParser.parseDocument("<div>123123</div>");

const data = doc.children[0].children[0].data;
doc.children[0].children[0].data = "<em>X<em>" + data;

console.log(stringify.getInnerHTML(doc, { decodeEntities: false }));
