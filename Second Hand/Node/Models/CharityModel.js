const mongoose = require("mongoose");
const ItemModel = require("ItemModel");
const CharitySchema =  mongoose.Schema({
    //_id: Number,
     name: {
       type: String,
       required: true,
       unique:true,
       maxlength: 100
     },
     description: {
       type: String,
       maxlength: 500
     },
     website: {
       type: String,
       match: /^https?:\/\//
     },
     DonatedItems: [ItemModel]

   });
   
   
   module.exports = mongoose.model('Charity', CharitySchema);