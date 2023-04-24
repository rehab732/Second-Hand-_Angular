const CustomerModel = require("../Models/CustomerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = {
    AddNewCustomer,
    LoginCustomer
}

