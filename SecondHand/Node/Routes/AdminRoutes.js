const express = require("express");
const router = new express.Router();
const AdminController = require("../Controllers/adminController");

router.post("/reg",AdminController.AddNewAdmin);
router.post("/login",AdminController.LoginAdmin);

module.exports = router;