const CharityModel = require("../Models/CharityModel");
const ItemModel = require("../Models/ItemModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");

let AddNewCharity = async (req,res)=>{
   
    
    let newCharity = req.body;
    newCharity=new mongoose.Types.ObjectId(req.body);
    let found = await CharityModel.findOne({name:newCharity.name}).exec();//found[true] || notFound[false]
    if(found) return res.status(401).json({message:"Charity Already Exist !!"});



   
    let items=[];
    for(var i in newCharity.DonatedItems){
        try{
            //check format
            let productID=new mongoose.Types.ObjectId(newCharity.DonatedItems[i].product);
            //check if product exists
            let find=await ProductModel.findOne({_id:productID}).exec();
            if(find){
            let item= ItemModel;
            item.product=productID;
            item.quantity=newCharity.DonatedItems[i].quantity;
            console.log(item);
            items.push(item)
            }
            else 
                return res.status(401).json({message:"Invalid product id",data:newCharity.DonatedItems[i].product});
        }
        catch{
            return res.status(401).json({message:"Invalid Product ID Format",data:newCharity.DonatedItems[i].product});
        }
        
    }

    newCharity.DonatedItems=items;
    let newDoc= new CharityModel(newCharity);
    await newDoc.save();
    return res.status(201).json({message:"Charity Added Successfully",data:newDoc});

}
let GetCharityById = async (req,res)=>{
    try{
        let getCharity = new mongoose.Types.ObjectId(req.params.id);//From Client
        let found = await CharityModel.findOne({_id:getCharity}).exec();//From DB [Encrypted]
        if(!found) return res.status(401).json({message:"Invalid id"});
        res.status(200).json({message:"Charity found",data:found})
    }
    catch{
        return res.status(401).json({message:"Invalid Charity ID Format",data:getCharity});

    }
}
let GetCharityByName = async (req,res)=>{
    //DB
    let getCharity = req.params.name;//From Client
    let found = await CharityModel.findOne({name:getCharity}).exec();
    if(!found) return res.status(401).json({message:"Invalid name"});

    res.status(200).json({message:"Charity found",data:found})
}


let GetAllCharities = async (req,res)=>{
   //DB
    let allCharitys= await CharityModel.find().exec();//From DB
    if(!allCharitys||allCharitys.length==0) return res.status(401).json({message:"No Charities found"});

    res.status(200).json({message:"Charities found",data:allCharitys})


}

let DeleteCharityByID = async (req,res)=>{
    //DB
    try{
        let getCharity = new mongoose.Types.ObjectId(req.params.id);//From Client
        let found = await CharityModel.findOneAndRemove({_id:getCharity}).exec();//From DB [Encrypted]
        if(!found) return res.status(401).json({message:"Invalid id"});
        res.status(200).json({message:"Charity deleted"})
    }
    catch{
        return res.status(401).json({message:"Invalid Charity ID Format",data:getCharity});

    }

}
let DeleteCharityByName= async (req,res)=>{
    //DB
    
    let getCharity = req.params.name;//From Client
    let found = await CharityModel.findOneAndRemove({name:getCharity}).exec();
    if(!found)
        return res.status(401).json({message:"Invalid name"})
    res.status(200).json({message:"Charity deleted"})

    
   

}
//->>>>>Done but not tested

// let UpdateCharity = async (req,res)=>{
//     //DB
//     let getCharity = req.params.id;//From Client
//     let found = await CharityModel.findOne({_id:getCharity}).exec();//From DB [Encrypted]
//     if(!found) return res.status(401).json({message:"Invalid id"});

//     found.name=getCharity.name;
//     found.description=getCharity.description;
//     found.website=getCharity.website;

//     await found.save();
//     return res.status(201).json({message:"Charity Updated Successfully",data:found});

// }


//->>>>>Done but not tested


// let UpdateCharityDonatedItems = async (req,res)=>{
//     //DB
//     let getCharity = req.params.id;//From Client
//     let found = await CharityModel.findOne({_id:getCharity}).exec();//From DB [Encrypted]
//     if(!found) return res.status(401).json({message:"Invalid id"});

//     let items=[];
//     for(var i in getCharity.DonatedItems){
//         try{
//             //check format
//             let productID=new mongoose.Types.ObjectId(getCharity.DonatedItems[i].product);
//             //check if product exists
//             let find=await ProductModel.findOne({_id:productID}).exec();
//             if(find){
//             let item= ItemModel;
//             item.product=productID;
//             item.quantity=getCharity.DonatedItems[i].quantity;
//             console.log(item);
//             items.push(item)
//             }
//             else 
//                 return res.status(401).json({message:"Invalid product id",data:getCharity.DonatedItems[i].product});
//         }
//         catch{
//             return res.status(401).json({message:"Invalid ID Format",data:getCharity.DonatedItems[i].product});
//         }
        
//     }
//     found.DonatedItems=items;
//     await found.save();
    
//     return res.status(201).json({message:"Charity Updated Successfully",data:found});

// }


module.exports = {
    AddNewCharity,
    GetAllCharities,
    GetCharityById,
    GetCharityByName,
    DeleteCharityByID,
    DeleteCharityByName,
    //UpdateCharity,
    //UpdateCharityDonatedItems
}

