const CustomerModel = require("../Models/CustomerModel");
const bcrypt = require("bcrypt");

let AddNewCustomer = async (req,res)=>{
    //DB
    /**
     * 1-body ==> email ===> Exist
     * 2- Email Exist ==> "Already Exist"
     * 3- Email Not Exist ==> next Step ==> Hash Password
     * 4- Add Customer to DB
     */
    console.log("sarahhhhhh"+req.body);
    let newCus= req.body;
    let foundCustomer = await CustomerModel.findOne({Email:newCus.Email}).exec();//found[true] || notFound[false]
    if(foundCustomer) return res.status(401).json({message:"Customer Already Exist !!"});

    //Hash Password?? [npm i bcrypt]
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newCus.Password, genSalt);
    newCus.Password = hashedPassword;

    let newCustomer = new CustomerModel(newCus);
    await newCustomer.save();

    return res.status(201).json({message:"Customer Added Successfully",data:newCustomer});

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

    res.status(200).json({message:"Logged-In Successfully"})

}


module.exports = {
    AddNewCustomer,
    LoginCustomer
}

