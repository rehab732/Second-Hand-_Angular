const Ajv = require("ajv");
const ajv = new Ajv(); 

// const UrlRegex = new RegExp(/^https?:\/\//);

const CharitySchema = {
    type:"object",
    properties:{
        name:{"type":"string" ,"minLength":2 , "maxLength":100},
        description:{"type":"string" , "maxLength":500},
        website:{"type":"string" , "maxLength":200 , "pattern":"^(https?:\/\/){0,1}" },
        DonatedItems:{"type":"array"},//TODO:ref itemAJV
    },
    required:["name"],
    additionalProperties:false
}

module.exports = ajv.compile(CharitySchema);