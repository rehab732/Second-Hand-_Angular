const mongoose = require("mongoose");
const EmailModel = require("./EmailSchema");

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