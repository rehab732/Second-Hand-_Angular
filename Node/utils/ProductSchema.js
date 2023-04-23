const Ajv = require("ajv");
const ajv = new Ajv(); // Schema ==> compile(schema)(body)

//#region Students Schema
const ProductSchema = {
    type:"object",
    properties:{
        Name:{type:"string"},
        Description:{type:"string"},
        Category:{type:"string"},
        Price:{type:"number"},
        AvailableQuantity:{type:"number", minimum:1},
        
    },
    required:["Name", "Price", "AvailableQuantity"]
    //additionalProperties:false
}
module.exports = ajv.compile(ProductSchema);//validate(body)==> true || false ===> method()
//#endregion