const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/SecondHand");

//2)Create Schema
adminSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password:String
})

//3)Connect Schema With Collection
module.exports = mongoose.model("AdminSchema",adminSchema);