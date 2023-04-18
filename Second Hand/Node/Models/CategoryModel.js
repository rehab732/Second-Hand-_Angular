const CategorySchema =  mongoose.Schema({
   // _id:Number,
     name: {
       type: String,
       required: true,
       unique:true,
       minlength: 2,
       maxlength: 50
     }
    //  description: {
    //    type: String,
    //    maxlength: 500
    //  }
});

module.exports = mongoose.model("Category",CategorySchema);