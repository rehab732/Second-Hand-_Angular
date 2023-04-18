const AdminModel = require("../Models/CharityModel");

let AddNewCharity = async (req,res)=>{
   
    let newCharity = req.body;
    let foundUser = await CharityModel.findOne({_id:newCharity._id}).exec();//found[true] || notFound[false]
    if(foundUser) return res.status(401).json({message:"Charity Already Exist !!"});

    let newDoc= new CharityModel(newCharity);
    await newDoc.save();
    return res.status(201).json({message:"Charity Added Successfully",data:newDoc});

}
let GetCharityById = async (req,res)=>{
    //DB
    let getCharity = req.params.id;//From Client
    let foundUser = await CharityModel.findOne({_id:getCharity}).exec();
    if(!foundUser) return res.status(401).json({message:"Invalid id"});

    res.status(200).json({message:"Charity found",data:foundUser})
}


let GetAllCharitys = async (req,res)=>{
   //DB
    let allCharitys= await CharityModel.find().exec();//From DB
    if(allCharitys.length==0) return res.status(401).json({message:"No Charitys found"});

    res.status(200).json({message:"Charitys found",data:allCharitys})


}

let DeleteCharity = async (req,res)=>{
    //DB
    let getCharity = req.params.id;//From Client
    let foundUser = await CharityModel.findOneAndRemove({_id:getCharity}).exec();//From DB [Encrypted]
    if(!foundUser) return res.status(401).json({message:"Invalid id"});

    res.status(200).json({message:"Charity deleted"})

}

let UpdateCharity = async (req,res)=>{
    //DB
    let getCharity = req.params.id;//From Client
    let foundUser = await CharityModel.findOne({_id:getCharity}).exec();//From DB [Encrypted]
    if(!foundUser) return res.status(401).json({message:"Invalid id"});

    foundUser.name=getCharity.name;
    foundUser.age=getCharity.age;
    foundUser.email=getCharity.email;
    foundUser.password=getCharity.password;
    foundUser.type=getCharity.type;

    await foundUser.save();
    return res.status(201).json({message:"Charity Updated Successfully",data:foundUser});

}


module.exports = {
    AddNewCharity,
    GetAllCharitys,
    GetCharityById,
    DeleteCharity,
    UpdateCharity
}

