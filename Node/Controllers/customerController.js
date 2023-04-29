const CustomerModel = require("../Models/CustomerModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ItemModel = require("../Models/ItemModel");
const jwt = require("jsonwebtoken");


// tested
let AddNewCustomer = async (req,res)=>{
  
    let newCus= req.body;
    let foundCustomer = await CustomerModel.findOne({Email:newCus.Email}).exec();//found[true] || notFound[false]
    if(foundCustomer) return res.status(401).json({message:"Customer Already Exist !!"});

    //Hash Password?? [npm i bcrypt]
    
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newCus.Password, genSalt);
    newCus.Password = hashedPassword;
    let newCustomer = new CustomerModel(newCus);
    await newCustomer.save();

    var token = jwt.sign({customerId: newCustomer._id}, process.env.JWTSecret)
    //res.header("x-auth-token",token);

    return res.status(201).json({message:"Customer Added Successfully",data:{newCustomer, token:token}});

}

// tested
let LoginCustomer = async (req,res)=>{
    //DB
    let logCustomer = req.body;//From Client
    let foundCustomer = await CustomerModel.findOne({Email:logCustomer.Email}).exec();//From DB [Encrypted]
    if(!foundCustomer) return res.status(401).json({message:"Invalid Email Or Password"});
    console.log(req.body);
    //2)Check Password
    let checkPass = bcrypt.compareSync(logCustomer.Password, foundCustomer.Password);//true | false
    if(!checkPass) return res.status(401).json({message:"Invalid Password"});

    var token = jwt.sign({customerId: foundCustomer._id}, process.env.JWTSecret);
    //res.header("x-auth-token",token);
    
    res.status(200).json({message:"Logged-In Successfully", data:{token:token}})

}

//update customer
//get customer By id
//add new Address
//remove Address
//add item to cart
//remove item from cart
//update item quantity in cart
// tested
let GetCustomerByID = async (req,res)=>{
    try
    {
    let customerID = new mongoose.Types.ObjectId(req.params.id);
    let found = await CustomerModel.findOne({_id:customerID}).exec();
    if(!found) return res.status(401).json({message:"Invalid Customer id"});
    res.status(200).json({message:"Customer found",data:found});
    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }
    
}

let GetCartItems = async (req,res)=>{
    try
    {
        let customerID = new mongoose.Types.ObjectId(req.params.id);
        let found = await CustomerModel.findOne({_id:customerID}).populate({
            path:"Cart.items.product",
            strictPopulate: false 
        
        }).exec();
        if(!found) return res.status(401).json({message:"Invalid Customer id"});
     
       
        res.status(200).json({message:"Customer found",data:found.Cart});
    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }
    
}

// tested
let AddNewAddress = async (req,res)=>{
   
    // {
    //         "ApartmentNumber":25,
    //         "FloorNumber":9,
    //         "Street": "street1",
    //         "Zone":"Giza",
    //         "City":"Imbaba",
    //         "Governorate":"Giza"
    //  }

    try{
    let body = req.body;
    let customerID = new mongoose.Types.ObjectId(req.params.id);
    let found = await CustomerModel.findOne({_id:customerID}).exec();
    if(!found) return res.status(401).json({message:"Invalid Customer id"});

    console.log("body");
    found.Addresses.push(body);
    await found.save();
    return res.status(201).json({message:"Address Added Successfully",data:found});
    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }
}

//tested 
let AddItemToCart = async (req,res)=>{
    // {   
    //         "product": "529590520"
    //         "quantity": "5"           
    // }

    try{
        let body= req.body;
        let customerID = new mongoose.Types.ObjectId(req.params.id);
        let found = await CustomerModel.findOne({_id:customerID}).populate({
            path:"Cart.items.product",
            strictPopulate: false 
        
        }).exec();
        if(!found) return res.status(401).json({message:"Invalid Customer id"});
        
        let productID = new mongoose.Types.ObjectId(body.product);
        let foundProduct =await ProductModel.findOne({_id:productID}).exec();
        if(!foundProduct) return res.status(401).json({message:"product not found"});
        
        let cartProduct =await CustomerModel.findOne({["Cart.items.product"]:productID}).exec();
        console.log(cartProduct);
        if(cartProduct) return res.status(401).json({message:"product already in cart"});

        found.Cart.items.push(body);
        await found.save();
        return res.status(201).json({message:"Item  Added To Cart Successfully",data:found});

    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }

}

// tested
let RemoveItemFromCart = async (req,res)=>{
    // {   
    //         "product": "529590520"
    //         "quantity": "5"           
    // }

    try{
        let body= req.body;
        let customerID = new mongoose.Types.ObjectId(req.params.id);
        let found = await CustomerModel.findOne({_id:customerID}).exec();
        if(!found) return res.status(401).json({message:"Invalid Customer id"});
    
        let isItemFound = false;
              for(var i in found.Cart.items){
                if(body.product== found.Cart.items[i].product)
                {
                    found.Cart.items.splice(i,1);
                    isItemFound=true;
                    break;
                }
              }
        
        if(!isItemFound)
            return res.status(401).json({message:"Item Not Found",data:found});
        
        await found.save();
        return res.status(201).json({message:"Item removed From Cart Successfully",data:found});
        }
        catch(err){
            return res.status(500).json({message:"Server Error",Error:err.message});
        }
}


// tested
let UpdateItemQuantityInCart = async (req,res)=>{
   
    // {
    //     "{
    //         "product": "529590520"
    //         "quantity": "5"           
    //     }
    // }

    try{
    let body= req.body;
    let customerID = new mongoose.Types.ObjectId(req.params.id);
    let found = await CustomerModel.findOne({_id:customerID}).exec();
    if(!found) return res.status(401).json({message:"Invalid Customer id"});

    let isItemFound = false;
    for(var i in found.Cart.items){
        if(body.product== found.Cart.items[i].product.toString())
        {
            found.Cart.items[i].quantity = body.quantity;
            isItemFound=true;
            break;
        }
    }
    
    if(!isItemFound)
        return res.status(401).json({message:"Item Not Found",data:found});
    
    await found.save();
    return res.status(201).json({message:"Item Quantity Updated Successfully",data:found});
    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }
}


//tested
let UpdateCustomer = async (req,res)=>{
    // {
    //     "Name":"cust1",
    //     "Email":"cust1@yahoo.com",
    //     "DateOfBirth":"2023-03-28T00:00:00.000+00:00",
    //     "Phone":"210215"
    // }
    
    try{

    let body= req.body;
    let customerID = new mongoose.Types.ObjectId(req.params.id);
    let found = await CustomerModel.findOne({_id:customerID}).exec();
    if(!found) return res.status(401).json({message:"Invalid Customer id"});

    found.Name = body.Name;
    found.Email = body.Email;

    
    found.DateOfBirth = body.DateOfBirth;
    found.Phone = body.Phone;
    
    // found.NuOfRatings = body.NuOfRatings;
    // found.CanSellStatus = body.CanSellStatus;
    // found.Rating = body.Rating;

    await found.save();
    return res.status(201).json({message:"Customer Updated Successfully",data:found});
    }
    catch(err){
        return res.status(500).json({message:"Server Error",Error:err.message});
    }
}






//remove Address // problem //try

//remove item from cart //  make sure

// ToDo
// update Seller , Address

module.exports = {
    AddNewCustomer,
    LoginCustomer,
    GetCustomerByID,
    AddNewAddress,
    UpdateCustomer,
    AddItemToCart,
    UpdateItemQuantityInCart,
    RemoveItemFromCart,
    GetCartItems
}


