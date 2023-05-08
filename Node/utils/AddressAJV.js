//TODO: ajv file test add address ui
const Ajv = require("ajv");
const ajv = new Ajv();

const AddressSchema = {type:"array" , items:{
    type:"object",
    properties:{
        ApartmentNumber:{type:"number"},
        FloorNumber:{type:"number"},
        Street:{type:"string" , maxLength:50},
        Zone:{type:"string" , maxLength:50},
        City:{type:"string" , maxLength:50},
        Governorate:{type:"string" , maxLength:50},
    },
    required:["FloorNumber" , "Street" , "Zone" , "City" , "Governorate"],
    additionalProperties:false
    }
}

module.exports = ajv.compile(AddressSchema);