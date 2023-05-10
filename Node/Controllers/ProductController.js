const ProductModel = require("../Models/ProductModel");
const ItemModel = require("../Models/ItemModel");
const CustomerModel = require("../Models/CustomerModel");
const ProductValidate = require("../utils/ProductSchema");
const mongoose = require("mongoose");

let AddNewProduct = async (req, res) => {

    let newProduct = req.body;
    //console.log(req.body);
    //console.log("Product Add Validate" , ProductValidate(newProduct));
    if (ProductValidate(newProduct) == false)//bad request
        return res.status(400).json({ message: "Request Body is Wrong!!" });
    newProduct.SoldQuantity = 0;
    newProduct.ReleaseDate = Date.now() - 10000;
    newProduct.Status = "PendingAddApproval";

    let found = await ProductModel.findOne({ _id: newProduct._id }).exec();//found[true] || notFound[false]
    if (found) return res.status(401).json({ message: "Product Already Exist !!" });
    else {
        try {
            //check format
            let sellerId = new mongoose.Types.ObjectId(newProduct.Seller.SellerID);
            //check if seller exists
            if (await CustomerModel.findOne({ _id: sellerId }).exec()) {
                newProduct.Seller.SellerID = sellerId;
                let newDoc = new ProductModel(newProduct);
                await newDoc.save();
                return res.status(201).json({ message: "Product Added Successfully", data: newDoc });
            }
            return res.status(401).json({ message: "Invalid Seller ID", data: newProduct.Seller.SellerID });

        }
        catch (err) {
            return res.status(401).json({ message: "Invalid ID Format", Error: err.message, data: newProduct.Seller.SellerID });
        }

    }


}
let GetProductById = async (req, res) => {
    //DB
    try {
        let getProduct = new mongoose.Types.ObjectId(req.params.id);
        let found = await ProductModel.findOne({ _id: getProduct }).populate({
            path: "Seller.SellerID",
            strictPopulate: false

        }).exec();
        if (!found) return res.status(401).json({ message: "Invalid id" });

        res.status(200).json({ message: "Product found", data: found })
    }
    catch {
        return res.status(401).json({ message: "Invalid ID Format", data: req.params.id });
    }
}

let GetProductBySellerId = async (req, res) => {
    //DB
    try {
        let getProduct = new mongoose.Types.ObjectId(req.params.id);
        let found = await ProductModel.find({["Seller.SellerID"]:getProduct}).populate({
            path:"Seller.SellerID",
            strictPopulate: false 
            
        }).exec();
        if (!found) return res.status(401).json({ message: "Invalid id" });

        res.status(200).json({ message: "Products found", data: found })
    }
    catch (err) {
        return res.status(401).json({ message: "Error", data: err.message });
    }
}

//**********TODO
//get product by category--Done
let GetProductByCategory = async (req, res) => {
    //DB
    try {
        //console.log("GetProductByCategory " + req.params.category);
        let getProductCategory = req.params.category;//From Client
        let found = await ProductModel.find({ Category: getProductCategory }).exec();
        if (found.length == 0) return res.status(401).json({ message: "Invalid Category" });
        res.status(200).json({ message: "Products of specified category found", data: found })
    } catch (err) {
        return res.status(401).json({ message: "Invalid Name Format", error: err.message });
    }

}

//get product by name--Done
let GetProductByName = async (req, res) => {
    //DB
    try {
        // console.log("GetProductByName " + req.params.name);
        let getProductName = req.params.name;//From Client
        let found = await ProductModel.find({ Name: getProductName }).exec();
        if (!found) return res.status(401).json({ message: "Invalid name" });
        res.status(200).json({ message: "Product found", data: found })
    } catch (err) {
        return res.status(401).json({ message: "Invalid Name Format", error: err.message });
    }

}


let GetAllProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    console.log(req.query);
    const skip = (page - 1) * limit;
    //DB
    let productsAvailable = await ProductModel.find({ ["Seller.SellerID"]: { $ne: getProduct } }).exec();

    let allProducts = await productsAvailable.find().skip(skip).limit(limit);
    const totalProducts = await ProductModel.countDocuments();
    //await ProductModel.find().exec();//From DB



    if (!allProducts || allProducts.length == 0) return res.status(401).json({ message: "No Products found" });
    res.status(200).json({ message: "Products found", data: allProducts, page, limit, totalProducts });


}

let DeleteProductByID = async (req, res) => {
    //DB
    try {
        let getProductId = new mongoose.Types.ObjectId(req.params.id);

        let found = await ProductModel.findOne({ _id: getProductId }).exec();
        if (!found) return res.status(401).json({ message: "Invalid id" });

        if (found.SoldQuantity == 0) {
            await ProductModel.findByIdAndRemove({ _id: getProductId }).exec();
        } else {
            found.IsDeleted = true;
            found.save();
        }


        res.status(200).json({ message: "Product deleted" })

    }
    catch {
        return res.status(401).json({ message: "Invalid ID Format", data: req.params.id });
    }


}



//******TODO */
//update product without seller--Done
let UpdateProduct = async (req, res) => {
    //param -> id
    //body  ->{
    // "Name":"",
    // "Description":"",
    //  "Price":,
    //  "AvailableQuantity":,
    //  "Color":"",
    //  "Category":"",
    //   "Status":"",
    //   "Images":""
    //}
    console.log("UpdateProduct --> controller", req.body)
    try {
        let getProductId = new mongoose.Types.ObjectId(req.params.id);
        let UpdatedProduct = req.body;

        // if(ProductValidate(UpdatedProduct) == false)
        // UpdatedProduct = req.body.product
        console.log("Product Validate", ProductValidate(UpdatedProduct));
        console.log("ProductToUpdate", (UpdatedProduct));
        if (ProductValidate(UpdatedProduct) == false)//bad request
            return res.status(400).json({ message: "Request Body is Wrong!!" });

        let found = await ProductModel.findOne({ _id: getProductId }).exec();
        if (!found) return res.status(401).json({ message: "Invalid id" });


        found.Name = UpdatedProduct.Name;
        found.Description = UpdatedProduct.Description;
        found.Price = UpdatedProduct.Price;
        found.AvailableQuantity = UpdatedProduct.AvailableQuantity;
        found.Color = UpdatedProduct.Color;
        found.Category = UpdatedProduct.Category;
        found.Status = UpdatedProduct.Status;
        found.Images = UpdatedProduct.Images;

        await found.save();
        console.log("saved")
        return res.status(201).json({ message: "Product Updated Successfully", data: found });
    } catch (err) {
        console.log(err.message)
    }

}
let UpdateProductQuantity = async (req, res) => {
    try {
        let getProductId = new mongoose.Types.ObjectId(req.params.id);
        let BoughtQuantity = req.body.quantity;


        let found = await ProductModel.findOne({ _id: getProductId }).exec();
        if (!found) return res.status(401).json({ message: "Invalid id" });

        if (found.AvailableQuantity - BoughtQuantity < 0) {
            return res.status(401).json({ message: "Not enough products in inventory" });
        }
        found.AvailableQuantity -= BoughtQuantity;
        found.SoldQuantity += BoughtQuantity;
        await found.save();
        return res.status(201).json({ message: "Product Quantity Updated Successfully", data: found });

    } catch (err) {
        return res.status(401).json({ message: "Error", error: err.message });
    }

}
let GetPendingProducts = async (req, res) => {
    try {
        //console.log("GetProductByCategory " + req.params.category);
        let getProductCategory = req.params.category;//From Client
        let found = await ProductModel.find(
            { $or: [{ "Status": "PendingAddApproval" }, { "Status": "PendingEditApproval" }] }
        ).exec();
        if (found.length == 0) return res.status(200).json({ message: "there is no pending Products" });
        //res.header("x-auth-token", localStorage.getItem("UserToken"));
        res.status(200).json({ message: "Pending Products found", data: found })
    } catch (err) {
        return res.status(401).json({ message: "Error", error: err.message });
    }

}

//update product's seller
// let UpdateSeller = async (req,res)=>{

//     try{
//         let getSellerId = new mongoose.Types.ObjectId(req.params.id);
//         let UpdatedProductSeller = req.body;

//         let allProducts= await ProductModel.find().exec();//From DB

//         for(let prod of allProducts){
//             if(prod.Seller.SellerID.toString() == getSellerId.toString()){
//                 console.log(prod.Seller["Name"]);
//                 prod.Seller.Name = UpdatedProductSeller.Name;
//                 prod.Seller.Rating = UpdatedProductSeller.Rating;
//             }
//         }

//         await allProducts.save();
//         return res.status(201).json({message:"Product Seller Updated Successfully",data:allSellers});
//     }catch{

//         return res.status(401).json({message:"Invalid "});
//     }
//}

module.exports = {
    AddNewProduct,
    GetAllProducts,
    GetProductById,
    GetProductByName,
    GetProductByCategory,
    GetProductBySellerId,
    DeleteProductByID,
    UpdateProduct,
    GetPendingProducts,
    UpdateProductQuantity
}

