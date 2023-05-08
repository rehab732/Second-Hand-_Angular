const OrderModel = require("../Models/OrderModel");
const mongoose = require("mongoose");
const validateOrder = require("../utils/OrderAJV")
const ValidateOrderItems = require("../utils/ItemModelAJV")





let AddNewOrder = async (req,res)=>{

    let newOr = req.body;
    
    //console.log(validateOrder(newOr))
    //console.log((newOr))
    var valid= validateOrder(newOr)
    if(valid == false)//bad request
        return res.status(400).json({message:{
            valid:validateOrder.errors,
            OrderItems:newOr.orderItems
        }});
    

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

// //get all orders of certain user
// let GetBuyerOrders = async (req,res)=>{
//     let buyerId = new mongoose.Types.ObjectId(req.params.id);//From Client
//         //console.log(getOrder)
//     let allOrders = await OrderModel.find({buyer:buyerId}).populate({
//         path:"orderItems.product",
//         strictPopulate: false 
    
//     }).exec();//From DB [Encrypted]
//      if(!allOrders)//||allOrders.length==0) 
//         return res.status(401).json({message:"No Orders found"});
//      res.status(200).json({message:"Orders found",data:allOrders})
 
 
// }

//get all orders of certain user
let GetBuyerOrders = async (req,res)=>{
    let buyerId = new mongoose.Types.ObjectId(req.params.id);//From Client
        //console.log(getOrder)
    let find ={ $and:[
        {buyer:buyerId},
        {$or: [
             {ShippingDate:{$gt:Date('2022-04-29T10:37:41.356+00:00')}} ,
             {ShippingDate:{ $exists: false }},
            //  {RegistrationDate:{ $exists: true }},
            ],
        },],
    };
    let allOrders = await OrderModel.find({
         buyer:buyerId
    }).populate({
        path:"orderItems.product",
        strictPopulate: false 
    
    }).exec();//From DB [Encrypted]
     if(!allOrders)//||allOrders.length==0) 
        return res.status(401).json({message:"No Orders found"});
     res.status(200).json({message:"Orders found",data:allOrders})
 
 
}


let GetSellerOrders = async (req,res)=>{
    let sellerId = new mongoose.Types.ObjectId(req.params.id);//From Client
        //console.log(getOrder)
       
    let ord=[];
    let allOrders = await OrderModel.find({ "orderItems.0":{$exists: true} }
        ).populate({
            path:"orderItems.product",
            strictPopulate: false,        

        }).populate({
            path:"orderItems.product.Seller.SellerID",
            strictPopulate: false,
            match: {
                "SellerID": sellerId,         
            }}
    ).then((res)=> 
        res.filter((order)=> 
        {
                let orderit=order.orderItems.filter((item) =>{
                    return item.product.Seller.SellerID.toString()== sellerId.toString()
                    
                })
                if(orderit.length>0)
                    return {buyer: order.buyer,
                            Status: order.Status,
                            Address: order.Address,
                            PaymentMethod: order.PaymentMethod,
                            RegistrationDate: order.RegistrationDate,
                            ShippingDate:order.ShippingDate,
                            ArrivalDate:order.ArrivalDate,
                            orderItems:orderit
             
                    }
                
        })

           
       );
    
    
    
 
     if(!allOrders)//||allOrders.length==0) 
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

let updateOrderItemRating = async (req,res)=>{

    try{
        let orderId= req.params.id;
        let order = req.body;
        const valid=validateOrder(order);
        console.log("orderToUpdate" , order , "up-valid" , valid)
        if(valid == false)//bad request
            return res.status(400).json({message:validateOrder.errors});
        let found = await OrderModel.findOne({_id:orderId}).exec();//From DB [Encrypted]
        if(!found)
            return res.status(401).json({message:"Invalid id"});

        for(var i=0;i< found.orderItems.length ;i++)
        {
            found.orderItems[i].userRating = order.orderItems[i].userRating;
        }
        //*/
        await found.save();
        return res.status(201).json({message:"Order Rating Updated Successfully",data:found});
    }catch(ex){
        return res.status(401).json({message:"Error",data:ex.message});
    }
}


//exports
module.exports = {
    AddNewOrder,
    GetOrderById,
    GetAllOrders,
    // updateOrderStatus,
    GetBuyerOrders,
    updateOrderItemRating,
    GetSellerOrders
}