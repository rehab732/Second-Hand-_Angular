const mongoose = require("mongoose");
const itemModel = require("./ItemModel");
const EmailModel = require("./EmailSchema");
const productModel = require("./ProductModel");
// if(mongoose.connection.readyState==0){
//     mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/test/SecondHand");
// }

//2)Create Schema
customerSchema = mongoose.Schema({
  //_id:Number,
  Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
 Email:EmailModel,
  Password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  Addresses:[
    {
    ApartmentNumber: {
      type: Number,
      required: [false, "Apartment Number is required."],
    },
    FloorNumber: {
      type: Number,
      required: [true, "Floor Number is required."],
    },
    Street: {
      type: String,
      required: [true, "Street is required."],
      maxlength: 50,
    },
    Zone: {
      type: String,
      required: [true, "Zone is required."],
      maxlength: 50,
    },
    City: {
      type: String,
      required: [true, "City is required."],
      maxlength: 50,
    },
    Governorate: {
      type: String,
      required: [true, "Governorate is required."],
      maxlength: 50,
    },
  }],
  Cart:{
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        
      },
      items: [itemModel]
  },
  SellerProducts:[productModel],
  
  DateOfBirth: Date,
  Phone: String,
  Rating: Number,
  NuOfRatings: Number,
  CanSellStatus: Boolean,
});

//3)Connect Schema With Collection
module.exports = mongoose.model("Customer", customerSchema);
