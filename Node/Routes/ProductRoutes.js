const express = require("express");
const router = new express.Router();
const adminPremission = require("../Middlewares/adminPermission")
const loginPermission = require("../Middlewares/loginPermission");
const ProductController = require("../Controllers/ProductController");

router.get("",ProductController.GetAllProducts);
router.get("/getById/:id",ProductController.GetProductById);
router.get("/getByName/:name",ProductController.GetProductByName);
router.get("/getByCategory/:category",ProductController.GetProductByCategory);

router.get("/Seller/:id", loginPermission, ProductController.GetProductBySellerId);
router.get("/pending", adminPremission,ProductController.GetPendingProducts);


router.post("", loginPermission, ProductController.AddNewProduct);
router.put("/:id", loginPermission, ProductController.UpdateProduct);
router.put("/quantity/:id", loginPermission, ProductController.UpdateProductQuantity);
//router.post("/Seller/:id",ProductController.UpdateSeller);

router.delete("/:id", loginPermission, ProductController.DeleteProductByID);

module.exports = router;