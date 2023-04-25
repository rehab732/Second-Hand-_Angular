const express = require("express");
const router = new express.Router();
const CustomerController = require("../Controllers/customerController");

router.post("/reg",CustomerController.AddNewCustomer);
router.post("/login",CustomerController.LoginCustomer);

router.get("/GetCustomerByID/:id",CustomerController.GetCustomerByID);
router.get("/GetCartItems/:id",CustomerController.GetCartItems);
router.post("/AddAddress/:id",CustomerController.AddNewAddress);
router.post("/UpdateCustomer/:id",CustomerController.UpdateCustomer);
router.post("/AddItemToCart/:id",CustomerController.AddItemToCart);
router.post("/UpdateItemQuantity/:id",CustomerController.UpdateItemQuantityInCart);
router.post("/RemoveItemFromCart/:id",CustomerController.RemoveItemFromCart);


module.exports = router;