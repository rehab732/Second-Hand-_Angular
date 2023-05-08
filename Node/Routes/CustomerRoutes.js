const express = require("express");
const router = new express.Router();
const CustomerController = require("../Controllers/customerController");
const adminPermission = require("../Middlewares/adminPermission");
const loginPermission = require("../Middlewares/loginPermission");

router.post("/reg",CustomerController.AddNewCustomer);
router.post("/login",CustomerController.LoginCustomer);
router.get("/GetCustomerByID/:id", loginPermission,CustomerController.GetCustomerByID);
router.get("", adminPermission,CustomerController.getAllCustomers);
router.post("/AddAddress/:id", loginPermission, CustomerController.AddNewAddress);
router.post("/UpdateCustomer/:id", loginPermission, CustomerController.UpdateCustomer);
router.post("/AddItemToCart/:id", loginPermission, CustomerController.AddItemToCart);
router.post("/UpdateItemQuantity/:id", loginPermission, CustomerController.UpdateItemQuantityInCart);
router.post("/RemoveItemFromCart/:id", loginPermission, CustomerController.RemoveItemFromCart);
router.get("/GetCartItems/:id", loginPermission, CustomerController.GetCartItems);
router.put("/EditCustomer/:id", loginPermission,  CustomerController.EditCustomerProfile);


module.exports = router;

