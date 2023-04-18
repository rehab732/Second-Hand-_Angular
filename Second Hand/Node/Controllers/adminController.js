const AdminModel = require("../Models/AdminModel");

const bcrypt = require("bcrypt");

let AddNewAdmin = async (req,res)=>{

    let newAd = req.body;
   
    let foundAdmin = await AdminModel.findOne({Email:newAd.Email}).exec();//found[true] || notFound[false]
    if(foundAdmin) return res.status(401).json({message:"Admin Already Exist !!"});


    //Hash Password?? [npm i bcrypt]
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newAd.Password, genSalt);
    newAd.Password = hashedPassword;

    let newAdmin = new AdminModel(newAd);
    await newAdmin.save();

    return res.status(201).json({message:"Admin Added Successfully",data:newAdmin});

}


let LoginAdmin = async (req,res)=>{
    //DB
    let logAdmin = req.body;//From Client
    let foundAdmin = await AdminModel.findOne({Email:logAdmin.Email}).exec();//From DB [Encrypted]
    if(!foundAdmin) return res.status(401).json({message:"Invalid Email Or Password"});
     
    //2)Check Password
    let checkPass = bcrypt.compareSync(logAdmin.Password, foundAdmin.Password);//true | false
    if(!checkPass) return res.status(401).json({message:"Invalid  Password"});

    res.status(200).json({message:"Logged-In Successfully"})

}


module.exports = {
    AddNewAdmin,
    LoginAdmin
}

