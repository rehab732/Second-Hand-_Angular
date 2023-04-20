const OrderModel = require("../Models/OrderModel");

const bcrypt = require("bcrypt");


//TODO:add new order
let AddNewOrder = async (req,res)=>{

    let newOr = req.body;
   
    //TODO:check schema

    let newOrder = new OrderModel(newOr);
    await newOrder.save();

    return res.status(201).json({message:"Order Added Successfully",data:newOrder});

}

//get order by id
let GetOrderById = async (req,res)=>{
    try{
        let getOrder = new mongoose.Types.ObjectId(req.params.id);//From Client
        let found = await OrderModel.findOne({_id:getOrder}).exec();//From DB [Encrypted]
        if(!found) return res.status(401).json({message:"Invalid id"});
        res.status(200).json({message:"Order found",data:found})
    }
    catch{
        return res.status(401).json({message:"Invalid Charity ID Format",data:getCharity});

    }
}

//get all orders

//update order (low priority/later)


//exports
module.exports = {
    AddNewOrder,
    GetOrderById
}