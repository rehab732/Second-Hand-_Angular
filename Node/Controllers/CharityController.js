const CharityModel = require("../Models/CharityModel");
const ItemModel = require("../Models/ItemModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");

let AddNewCharity = async (req,res)=>{
    
    let newCharity = req.body;
    newCharity=(req.body);
    // newCharity=new mongoose.Types.ObjectId(req.body);
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

let UpdateCharityByName = async (req,res)=>{
    
    try{
        let oldName= req.params.name;//From Client
        let newBody=req.body;
        //find old data
        let found = await CharityModel.findOne({name:oldName}).exec();//From DB [Encrypted]
        if(!found)
             return res.status(401).json({message:"Invalid name"});

    
        found.name=newBody.name;
        found.description=newBody.description;
        found.website=newBody.website;
    
        await found.save();
        return res.status(201).json({message:"Charity Updated Successfully",data:found});


    }
    catch(ex){
        return res.status(401).json({message:"Error",data:ex.message});

    }
   

}


//->>>>>Done but not tested

let AddItemToCharity= async (req,res)=>{
    // {
        //product:{}
        //quantity:{}
    // }
    try{
        let name = req.params.name;//From Client
        let DonatedItem=req.body;

        console.log("add item to charity");
        let found = await CharityModel.findOne({name:name}).exec();
        if(!found) return res.status(401).json({message:"Invalid name"});
    
        //check format
        let productID=new mongoose.Types.ObjectId(DonatedItem.product);
        //check if product exists
        let find=await ProductModel.findOne({_id:productID}).exec();
        if(find){
            let item= DonatedItem;
            item.product=productID;
            item.quantity=DonatedItem.quantity;
            found.DonatedItems.push(item);
            await found.save();
            return res.status(201).json({message:"Item added to charity Successfully",data:DonatedItem});
        }
        else 
            return res.status(401).json({message:"Invalid product id",data:DonatedItem.product});
    }
    catch(err){
        return res.status(401).json({message:"Error",data:err.message});
    }
    


}
let UpdateCharityDonatedItems = async (req,res)=>{
    //DB
    let name = req.params.name;//From Client
    let DonatedItems=req.body.DonatedItems;

    let found = await CharityModel.findOne({name:name}).exec();
    if(!found) return res.status(401).json({message:"Invalid name"});

    let items=[];
    for(var i in DonatedItems){
        try{
            //check format
            let productID=new mongoose.Types.ObjectId(DonatedItems[i].product);
            //check if product exists
            let find=await ProductModel.findOne({_id:productID}).exec();
            if(find){
                let item= ItemModel;
                item.product=productID;
                item.quantity=DonatedItems[i].quantity;
                items.push(item)
            }
            else 
                return res.status(401).json({message:"Invalid product id",data:DonatedItems[i].product});
        }
        catch(err){
            return res.status(401).json({message:"Error",data:err.message});
        }
        
    }
    found.DonatedItems=items;
    await found.save();
    
    return res.status(201).json({message:"Charity Updated Successfully",data:found});

}


module.exports = {
    AddNewCharity,
    GetAllCharities,
    GetCharityById,
    GetCharityByName,
    DeleteCharityByID,
    DeleteCharityByName,
    UpdateCharityByName,
    UpdateCharityDonatedItems,
    AddItemToCharity
}

