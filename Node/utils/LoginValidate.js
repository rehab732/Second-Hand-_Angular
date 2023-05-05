//AJV
const Ajv = require("ajv");
var ajv = new Ajv();

LoginSchema = {
    "type":"object",
    "properties":{
        "Email":{"type":"string","pattern":"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        "Password":{"type":"string","minLength":5}
    },
    "required":["Email","Password"]
}


module.exports = ajv.compile(LoginSchema);