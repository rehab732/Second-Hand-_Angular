const Ajv = require("ajv");
const ajv = new Ajv(); 

const ItemSchema = {
    type:"object",
    properties:{
        product: {type: 'string', pattern: '^[a-f\\d]{24}$'},
        quantity: {type: "number",minimum: 1},
        userRating:{type:"number"}
    },
    required:[
        "product" ,     
        "quantity"
    ],
    // additionalProperties:false
}
module.exports = ajv.compile(ItemSchema);