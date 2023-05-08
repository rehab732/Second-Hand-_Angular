const Ajv = require("ajv");
const ajv = new Ajv(); 


const CategorySchema = {
    type:"object",
    properties:{
        name:{"type":"string" ,"minLength":2 , "maxLength":50},
    },
    required:["name"],
    //additionalProperties:false
}

module.exports = ajv.compile(CategorySchema);