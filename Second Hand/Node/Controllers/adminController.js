const AdminModel = require("../Models/AdminModel");
const bcrypt = require("bcrypt");

let AddNewAdmin = async (req,res)=>{
    //DB
    /**
     * 1-body ==> email ===> Exist
     * 2- Email Exist ==> "Already Exist"
     * 3- Email Not Exist ==> next Step ==> Hash Password
     * 4- Add Admin to DB
     */
    let newAd = req.body;
    let foundAdmin = await AdminModel.findOne({email:newAd.email}).exec();//found[true] || notFound[false]
    if(foundAdmin) return res.status(401).json({message:"Admin Already Exist !!"});

    console.log()
    //Hash Password?? [npm i bcrypt]
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newAd.password, genSalt);
    newAd.password = hashedPassword;

    let newAdmin = new AdminModel(newAd);
    await newAdmin.save();

    return res.status(201).json({message:"Admin Added Successfully",data:newAdmin});

}


let LoginAdmin = async (req,res)=>{
    //DB
    let logAdmin = req.body;//From Client
    let foundAdmin = await AdminModel.findOne({email:logAdmin.email}).exec();//From DB [Encrypted]
    if(!foundAdmin) return res.status(401).json({message:"Invalid Email Or Password"});

    //2)Check Password
    let checkPass = bcrypt.compareSync(logAdmin.password, foundAdmin.password);//true | false
    if(!checkPass) return res.status(401).json({message:"Invalid Email Or Password"});

    res.status(200).json({message:"Logged-In Successfully"})

}


module.exports = {
    AddNewAdmin,
    LoginAdmin
}

