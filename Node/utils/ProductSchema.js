const Ajv = require("ajv");
const ajv = new Ajv(); // Schema ==> compile(schema)(body)

// const dateTimeRegex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
const dateTimeRegex 
    = new RegExp('((?:2|1)\\d{3}(?:-|\/)(?:(?:0[1-9])|(?:1[0-2]))(?:-|\/)(?:(?:0[1-9])|(?:[1-2][0-9])|(?:3[0-1]))((?:T|\\s)(?:(?:[0-1][0-9])|(?:2[0-3])):(?:[0-5][0-9]):(?:[0-5][0-9])){0,1})')

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

//#region Students Schema
const ProductSchema = {
    type:"object",
    properties:{
        Name:{type:"string"},
        Description:{type:"string"},
        Category:{type:"string"},
        Price:{type:"number"},
        AvailableQuantity:{type:"number", minimum:1},
        IsDeleted: {type: "boolean"},
        Images:{type:"array" , "minItems": 0,"maxItems": 6

                ,"items": {
                    // "type": "string" , maxLength:50//FIXME:nulls sent from front-end
                }, 

            },
        ReleaseDate:{"type":"string" ,  
                        "format": "date-time" 
                    },
        Color:{"type":"string"},
        Status:{enum: ["PendingAddApproval", "PendingEditApproval","Approved", "Rejected"] },
        Donate:{"type":"boolean"},
        Charity:{"type":"string"},
        SoldQuantity:{type:"number" , minimum:0},
        Seller:{type:"object"}//FIXME:ajv seller object
    },
    required:["Name", "Price", "AvailableQuantity" , "Color","Donate","Seller"],

    //additionalProperties:false
}

module.exports = ajv.compile(ProductSchema);//validate(body)==> true || false ===> method()
//#endregion