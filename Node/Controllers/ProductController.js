const ProductModel = require("../Models/ProductModel");
const ItemModel = require("../Models/ItemModel");
const CustomerModel = require("../Models/CustomerModel");
const mongoose = require("mongoose");

let AddNewProduct = async (req,res)=>{
   
    let newProduct = req.body;
    let found = await ProductModel.findOne({_id:newProduct._id}).exec();//found[true] || notFound[false]
    if(found) return res.status(401).json({message:"Product Already Exist !!"});
    else{
        try{
            //check format
            let sellerId=new mongoose.Types.ObjectId(newProduct.Seller.SellerID);
                //check if seller exists
            if(await CustomerModel.findOne({_id:sellerId}).exec())
            {
                newProduct.Seller.SellerID= sellerId;
                let newDoc= new ProductModel(newProduct);
                await newDoc.save();
                return res.status(201).json({message:"Product Added Successfully",data:newDoc});
            }
            return res.status(401).json({message:"Invalid Seller ID",data:newProduct.Seller.SellerID});
            
        }
        catch {
            return res.status(401).json({message:"Invalid ID Format",data:newProduct.Seller.SellerID});
        }
        
    }
    

}
let GetProductById = async (req,res)=>{
    //DB
    try{
        let getProduct = new mongoose.Types.ObjectId(req.params.id);
        let found = await ProductModel.findOne({_id:getProduct}).exec();
        if(!found) return res.status(401).json({message:"Invalid id"});

        res.status(200).json({message:"Product found",data:found})
    }
    catch{
        return res.status(401).json({message:"Invalid ID Format",data:req.params.id});
    }
}

//**********TODO

// let GetProductByName = async (req,res)=>{
//     //DB
//     let getProduct = req.params.name;//From Client
//     let found = await ProductModel.findOne({name:getProduct}).exec();
//     if(!found) return res.status(401).json({message:"Invalid name"});

//     res.status(200).json({message:"Product found",data:found})
// }


let GetAllProducts = async (req,res)=>{
   //DB
    let allProducts= await ProductModel.find().exec();//From DB
    if(!allProducts||allProducts.length==0) return res.status(401).json({message:"No Products found"});
    res.status(200).json({message:"Products found",data:allProducts})


}

let DeleteProductByID = async (req,res)=>{
    //DB
    try{
        let getProduct = new mongoose.Types.ObjectId(req.params.id);

        let found = await ProductModel.findOneAndRemove({_id:getProduct}).exec();
        if(!found) return res.status(401).json({message:"Invalid id"});
    
        res.status(200).json({message:"Product deleted"})

    }
    catch{
        return res.status(401).json({message:"Invalid ID Format",data:req.params.id});
    }
   

}
//**********TODO


// let DeleteProductByName= async (req,res)=>{
//     //DB
//     let getProduct = req.params.name;//From Client
//     let found = await ProductModel.findOneAndRemove({name:getProduct}).exec();//From DB [Encrypted]
//     if(!found) return res.status(401).json({message:"Invalid name"});

//     res.status(200).json({message:"Product deleted"})

// }


//******TODO */

// let UpdateProduct = async (req,res)=>{
   
    
    
    
//     let found = await ProductModel.findOne({_id:getProduct}).exec();
//     if(!found) return res.status(401).json({message:"Invalid id"});

//     found.name=getProduct.name;
//     found.description=getProduct.description;
//     found.website=getProduct.website;

//     await found.save();
//     return res.status(201).json({message:"Product Updated Successfully",data:found});

// }




module.exports = {
    AddNewProduct,
    GetAllProducts,
    GetProductById,
   // GetProductByName,
    DeleteProductByID,
    //DeleteProductByName,
    //UpdateProduct,
   
}

