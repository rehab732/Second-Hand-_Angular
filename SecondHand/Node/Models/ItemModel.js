
const mongoose = require("mongoose");

const ItemModel ={
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  };

  
module.exports  = ItemModel;