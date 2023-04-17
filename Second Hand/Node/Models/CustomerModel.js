const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/test/SecondHand");

//2)Create Schema
customerSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    dateOfBirth:Date,
    phone:String,
    rating:Number,
    NuOfRatings:Number,
    email:String,
    password:String,
    cartId:Number,
    canSellStatus:Boolean
    
})

//3)Connect Schema With Collection
module.exports = mongoose.model("CustomerSchema",customerSchema);