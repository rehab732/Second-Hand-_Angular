const express = require("express");
const router = new express.Router();
const OrderController = require("../Controllers/OrderController");

router.post("/addorder",OrderController.AddNewOrder);
router.post("/getorder",OrderController.GetOrderById);

module.exports = router;