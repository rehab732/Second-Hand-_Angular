const Ajv = require("ajv");
const ajv = new Ajv(); 

// const dateTimeRegex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
const dateTimeRegex 
    = new RegExp('((?:2|1)\\d{3}(?:-|\/)(?:(?:0[1-9])|(?:1[0-2]))(?:-|\/)(?:(?:0[1-9])|(?:[1-2][0-9])|(?:3[0-1]))((?:T|\\s)(?:(?:[0-1][0-9])|(?:2[0-3])):(?:[0-5][0-9]):(?:[0-5][0-9])){0,1})')

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

const OrderSchema = {
    type:"object",
    properties:{
        buyer:{type: 'string', pattern: '^[a-f\\d]{24}$'},
        Status:{enum: ["Accepted", "Rejected","Shipped","Delivered"] },
        PaymentMethod:{enum: ["Cash", "Stripe"] },
        RegistrationDate:{"type":"string"
         ,  "format": "date-time" 
        },
        ShippingDate:{"type":"string" ,  "format": "date-time" },
        ArrivalDate:{"type":"string" ,  "format": "date-time" },
        TotalPrice:{type:"number" , minimum: 0},
        Address:{type:"string"},
        orderItems:{type:"array" , items:{
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
            }},
    },

    required:["PaymentMethod"  
            , "TotalPrice" , "buyer",
            "orderItems"
        ],
    //additionalProperties:false
}

module.exports = ajv.compile(OrderSchema);