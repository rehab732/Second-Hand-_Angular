const mongoose = require("mongoose");
const CategoryModel = require("../Models/CategoryModel");
const ValidateCategory = require("../utils/CategoryAJV")

let AddNewCategory= async (req,res)=>{
   try{
    let newCategory = req.body;

    console.log(`Charity Validation:${ValidateCategory(newCategory)}`)
    if(ValidateCategory(newCategory) == false)//bad request
        return res.status(400).json({message:"Request Body is Wrong!!"});

    let found = await CategoryModel.findOne({name:newCategory.name}).exec();//found[true] || notFound[false]
    if(found) 
        return res.status(401).json({message:"Category Already Exist !!"});

    let newDoc= new CategoryModel(newCategory);
    await newDoc.save();
    return res.status(201).json({message:"Category Added Successfully",data:newDoc});
   }
   catch(err){
         return res.status(404).json({message:"Error",data:err.message});
   }

}

let GetCategoryByName = async (req,res)=>{
   
    try{
        let getCategory = req.params.name;//From Client
        let found = await CategoryModel.findOne({name:getCategory}).exec();
        if(!found) return res.status(401).json({message:"Invalid name"});

        res.status(200).json({message:"Category found",data:found})
    }
    catch(err){
        return res.status(404).json({message:"Error",data:err.message});
    }
    
}

let GetAllCategories = async (req,res)=>{
    try{
        let allCategorys= await CategoryModel.find().exec();//From DB
        if(!allCategorys||allCategorys.length==0) return res.status(401).json({message:"No Categories found"});
    
        res.status(200).json({message:"Categories found",data:allCategorys})

    }
    catch(err){
        return res.status(404).json({message:"Error",data:err.message});
    }
    
 }

 let DeleteCategoryByName= async (req,res)=>{
    
    //do we remove category from product??
    try{
        let getCategory = req.params.name;//From Client
        let found = await CategoryModel.findOneAndRemove({name:getCategory}).exec();//From DB [Encrypted]
        if(!found)
            return res.status(401).json({message:"Invalid name"})
        res.status(200).json({message:"Category deleted"})
    }
    catch(err){
        return res.status(404).json({message:"Error",data:err.message});
    }
    
}


let UpdateCategoryByName = async (req,res)=>{
    try{
        let oldName= req.params.name;//From Client
        let newName = req.body;//From Client

        //check if new name already exsists
        let newCat = await CategoryModel.findOne({name:newName.name}).exec();//From DB
        if(!newCat) {

            let found = await CategoryModel.findOne({name:oldName}).exec();//From DB
            if(!found) 
                return res.status(401).json({message:"Name not found"});
             
            found.name=newName.name;
            await found.save();
            return res.status(201).json({message:"Category Updated Successfully",data:found});
        }
        else
            return res.status(401).json({message:"New  Category Name alrady exists",data:req.body});
       
    }
    catch(err){
        return res.status(404).json({message:"Error",data:err.message});
    }
    

}


module.exports = {
    AddNewCategory,
    GetCategoryByName,
    GetAllCategories,
    DeleteCategoryByName,
    UpdateCategoryByName

}
