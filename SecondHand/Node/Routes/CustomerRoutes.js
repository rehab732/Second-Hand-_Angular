const express = require("express");
const router = new express.Router();
const CustomerController = require("../Controllers/customerController");

router.post("/reg",CustomerController.AddNewCustomer);
router.post("/login",CustomerController.LoginCustomer);

module.exports = router;