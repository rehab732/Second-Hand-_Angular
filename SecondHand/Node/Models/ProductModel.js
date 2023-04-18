const mongoose = require("mongoose");
// if(mongoose.connection.readyState==0){
//     mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/test/SecondHand");
// }

const productSchema = mongoose.Schema({
    //_id:Number,
    Name: {
      type: String,
      required: [true, 'A name is required.'], 
      maxLength:[50,'A name must not exceed 50 characters'],
      minLength:[1,'A name must not be less than 1 characters'],
    },
    Description: {
        type: String,
        required: [true, 'A description is required.'], 
        maxLength:[200,'A description must not exceed 200 characters'],
        minLength:[1,'A description must not be less than 1 characters'],
    },
    Price: {
        type: Number,
        required: [true, 'A price is required.'], 
        min:[0,'Price must be positive'],
        max:[1000000,'Price must be less than 1000000'],
       
    },
    AvailableQuantity: {
        type: Number,
        required: [true, 'A quantity is required.'], 
    },
    IsDeleted: {
        type: Boolean,
        required: [true, 'An IsDeleted is required.'], 
    },
    Images:{
        type: [imageSchema],
        validate: {
            validator: function(value) {
              return value.length >= 1 && value.length <= 6;
            },
            message: 'Number of images should be between 1 and 6'
        },
        
    },
    ReleaseDate:{
        type: Date,
        validate: [validDate, 'Date must be must be a valid date']
        

    },
    color: {
        type: string,
        required: [true, 'A color is required.']
    },
    Category:{
        type:String,
        index:true
    },
    Status:{
        type:String,
        enum:ProdStatus,
        default:"PendingAddApproval"
    },
    Donate:{
        type:Boolean,
        default:false
    },
    Seller:{
        Name:String,
        Rating: Number,
        SellerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, 'Product must have a seller.']
        }
    }

    
})

const imageSchema =  Schema({
    data: Buffer,
    contentType: String
});
function validDate(date) {
    return date<=Date.now
}

const ProdStatus = ["PendingAddApproval", "PendingEditApproval","Approved"];

module.exports = mongoose.model("Product",productSchema);