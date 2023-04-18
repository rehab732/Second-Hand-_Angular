const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      default: ''
    }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);

  
  
  
  
  