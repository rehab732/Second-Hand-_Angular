const Ajv = require("ajv");
const ajv = new Ajv(); 
// const addressSchema = require("../utils/AddressAJV")

const dateTimeRegex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

// var innerArraySchema = {
//     "type": "array",
//     "items" : {
//         "#ref": addressSchema
//     }
// }
var x = { type:"number", default:0 }

const CustomerSchema = {
    type:"object",
    properties:{
        Name:{"type":"string" ,"minLength":2 , "maxLength":50},
        Email:{"type":"string","pattern":"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        Password:{"type":"string","minLength":5},
        DateOfBirth:{"type":"string" ,  "format": "date-time" },
        Phone:{"type":"string" , "pattern":"^[0-9]{8,11}$"},
        CanSellStatus:{"type":"string"},
        NumOfRatings:{ type:"number",default:0 },
        Rating: { type:"number", default:0 },
        Addresses:{type:"array" , items:{
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
        }},
        // Addresses:x
    },
    required:["Name", "Email", "Password" , "Phone"]
    //additionalProperties:false
}

module.exports = ajv.compile(CustomerSchema);