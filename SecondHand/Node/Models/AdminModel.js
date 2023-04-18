const mongoose = require("mongoose");
const emailSchema = require("./EmailSchema");
const EmailModel = require("./EmailSchema");
// if(mongoose.connection.readyState==0){
//     mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/test/SecondHand");
// }

//2)Create Schema
adminSchema = new mongoose.Schema({
   // _id:Number,
   Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
    },
    Email:EmailModel,
    Password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
   }
})


//3)Connect Schema With Collection
module.exports = mongoose.model("Admin",adminSchema);