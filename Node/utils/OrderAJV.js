const Ajv = require("ajv");
const ajv = new Ajv(); 

const dateTimeRegex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

const OrderSchema = {
    type:"object",
    properties:{
        buyer:{},
        Status:{enum: ["Accepted", "Rejected","Shipped","Delivered"] },
        PaymentMethod:{enum: ["Cash", "Stripe"] },
        RegistrationDate:{"type":"string"
        //  ,  "format": "date-time" 
        },
        ShippingDate:{"type":"string" ,  "format": "date-time" },
        ArrivalDate:{"type":"string" ,  "format": "date-time" },
        TotalPrice:{type:"number" , minimum: 0},
        Address:{type:"string"}
    },
    required:[ "PaymentMethod" , 
             "TotalPrice", "Address" , "buyer"],
    //additionalProperties:false
}

module.exports = ajv.compile(OrderSchema);