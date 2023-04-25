const OrderModel = require("../Models/OrderModel");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");



let AddNewOrder = async (req,res)=>{

    let newOr = req.body;
   
    //TODO:check schema
    //check Item Model -->[existence of product + product Qty]

    let newOrder = new OrderModel(newOr);
    await newOrder.save();

    return res.status(201).json({message:"Order Added Successfully",data:newOrder});

}

//get order by id
let GetOrderById = async (req,res)=>{
    try{
        let getOrder = new mongoose.Types.ObjectId(req.params.id);//From Client
        //console.log(getOrder)
        let found = await OrderModel.findOne({_id:getOrder}).exec();//From DB [Encrypted]
        if(!found) return res.status(401).json({message:"Invalid id"});
        res.status(200).json({message:"Order found",data:found})
    }
    catch(err){
        return res.status(401).json({message:"Invalid Order ID Format",erroe:err.message});

    }
}

//get all orders
let GetAllOrders = async (req,res)=>{
    //DB
     let allOrders= await OrderModel.find().exec();//From DB
     if(!allOrders||allOrders.length==0) 
        return res.status(401).json({message:"No Orders found"});
     res.status(200).json({message:"Orders found",data:allOrders})
 
 
}

//TODO:y update order status
// let updateOrderStatus = async (req,res)=>{
//     try{
//         let getOrder = new mongoose.Types.ObjectId(req.params.id);//From Client
//         //console.log(getOrder)
//         let found = await OrderModel.findOne({_id:getOrder}).exec();//From DB [Encrypted]
//         if(!found) return res.status(401).json({message:"Invalid id"});
//         console.log(req.body);
//         res.status(200).json({message:"Order found",data:found})
//     }
//     catch(err){
//         return res.status(401).json({message:"Invalid Order ID Format",erroe:err.message});

//     }
// }

//update order (low priority/later)


//exports
module.exports = {
    AddNewOrder,
    GetOrderById,
    GetAllOrders,
    // updateOrderStatus
}