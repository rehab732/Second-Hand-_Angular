const mongoose = require("mongoose");

// if(mongoose.connection.readyState==0){
//     mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/test/SecondHand");
// }
/*
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});*/
const ProdStatus = ["PendingAddApproval", "PendingEditApproval","Approved", "Rejected"];

function validDate(date) {
    return date<=Date.now()
}

const productSchema =new  mongoose.Schema({
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
        default:0,
        min:[0,'Price must be positive'],
        max:[1000000,'Price must be less than 1000000'],
       
    },
    AvailableQuantity: {
        type: Number,
        default:1,
        required: [true, 'A quantity is required.'], 
    },
    IsDeleted: {
        type: Boolean,
        default:false,
        required: [true, 'An IsDeleted is required.'], 
    },
    Images:{
        type: [String],
        validate: {
            validator: function(value) {
                //change later to 1
              return value.length >=0 && value.length <= 6;
            },
            message: 'Number of images should be between 1 and 6'
        },     
    },
    ReleaseDate:{
        type: Date,
        default:Date.now()-10000,
        validate: [validDate, 'Date must be must be a valid date']
        

    },
    Color: {
        type: String,
        default:"Black",
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
        default:false,
        required: [true, 'choose donation status.']
    },
    Charity:{
        type:String,
        
    },
    SoldQuantity: {
        type: Number,
        default:0,    
    },
    Seller:{
        SellerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, 'Product must have a seller.']
        }
    }    
})

module.exports = mongoose.model("Product",productSchema);