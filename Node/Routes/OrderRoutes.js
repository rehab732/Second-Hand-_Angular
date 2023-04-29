const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController");

router.post("/add",OrderController.AddNewOrder);
router.get("/get/:id",OrderController.GetOrderById);
router.get("/get",OrderController.GetAllOrders);
// router.put("status/:id",OrderController.updateOrderStatus);
router.get("/get/buyer/:id",OrderController.GetBuyerOrders);


module.exports = router;