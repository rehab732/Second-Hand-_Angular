const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController");
const loginPermission = require("../Middlewares/loginPermission");

router.post("/add", loginPermission, OrderController.AddNewOrder);
router.get("/get/:id", loginPermission, OrderController.GetOrderById);
router.get("/get", loginPermission, OrderController.GetAllOrders);
router.get("/getSeller/:id", OrderController.GetSellerOrders);
// router.put("status/:id",OrderController.updateOrderStatus);
router.get("/get/buyer/:id", loginPermission, OrderController.GetBuyerOrders);
router.put("/update/:id",loginPermission,OrderController.updateOrderItemRating)

module.exports = router;