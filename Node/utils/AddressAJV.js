const Ajv = require("ajv");
const ajv = new Ajv();

const AddressSchema = {
    type:"object",
    properties:{
        ApartmentNumber:{type:"number"},
        FloorNumber:{type:"number"},
    },
    required:["FloorNumber"]
    //additionalProperties:false
}

module.exports = ajv.compile(AddressSchema);