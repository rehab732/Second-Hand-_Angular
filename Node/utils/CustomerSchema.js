const Ajv = require("ajv");
const ajv = new Ajv(); 


const dateTimeRegex = new RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);

ajv.addFormat('date-time', {
    validate: (dateTimeString) => dateTimeRegex.test(dateTimeString)
  })

const CustomerSchema = {
    type:"object",
    properties:{
        Name:{"type":"string" ,"minLength":2 , "maxLength":50},
        Email:{"type":"string","pattern":"^[a-zA-Z0-9]+\@{1}[a-zA-Z0-9]+(.com){1}$"},
        Password:{"type":"string","minLength":5},
        DateOfBirth:{"type":"string" ,  "format": "date-time" },
        Phone:{"type":"string" , "pattern":"^[0-9]{8,11}$"},
        CanSellStatus:{"type":"string"}
    },
    required:["Name", "Email", "Password" , "Phone"]
    //additionalProperties:false
}
ajv.addKeyword({
    keyword: 'isDate',
    type: 'object',
    code(ctx) {
      const { data } = ctx;
      ctx.pass(_`${data} instanceof Date && !isNaN(+${data})`);
    },
});

module.exports = ajv.compile(CustomerSchema);