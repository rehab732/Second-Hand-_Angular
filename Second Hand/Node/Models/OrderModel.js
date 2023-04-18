
const mongoose = require("mongoose");
const ItemModel = require("ItemModel");
let OrderSchema = new mongoose.Schema({

   // _id:Number,
    RegistrationDate: {
           type: Date,
           default: Date.now,
           required: [true, 'A Registration Date is required.']
    },
    ShippingDate: {
           type: Date,
    },
    //OrderItems
    orderItems: [
       ItemModel
       //     {
       //            product: {
       //                   type: Schema.Types.ObjectId,
       //                   ref: "Product",
       //            },
       //            qty: Number,
       //     },
    ],
    //userId
    buyer: {
           type: Schema.Types.ObjectId,
           ref: "Customer",
           required: [true, 'Buyer is required for Order.']
    },



    //payment
});
module.exports = mongoose.model("Order",OrderSchema);