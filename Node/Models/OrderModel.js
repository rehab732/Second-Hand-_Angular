
const mongoose = require("mongoose");
const ItemModel = require("./ItemModel");

const OrderStatus = ["Accepted", "Rejected","Shipped","Delivered"];
const PaymentMethod = ["Cash", "Stripe"];

let OrderSchema = new mongoose.Schema({

   // _id:Number,
    RegistrationDate: {
           type: Date,
           default: Date.now,
       //     required: [true, 'A Registration Date is required.']
    },
    ShippingDate: {
           type: Date,
    },
    ArrivalDate: {
      type: Date,
    },
    //OrderItems
    orderItems: [
       ItemModel
    ],
    TotalPrice:Number,
    //BuyerId
    buyer: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Customer",
           required: [true, 'Buyer is required for Order.']
    },
    Status:{
       type:String,
       enum:OrderStatus,
       default:"Accepted"
   },
   Address:String,

   PaymentMethod:{
      type:String,
      enum:PaymentMethod,
      default:"Cash"
   }

    //TODO:payment
});

module.exports = mongoose.model("Order",OrderSchema);