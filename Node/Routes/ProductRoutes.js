const express = require("express");
const router = new express.Router();
const ProductController = require("../Controllers/ProductController");

router.get("",ProductController.GetAllProducts);
router.get("/getById/:id",ProductController.GetProductById);
router.get("/getByName/:name",ProductController.GetProductByName);
router.get("/getByCategory/:category",ProductController.GetProductByCategory);
router.get("/Seller/:id",ProductController.GetProductBySellerId);

router.post("",ProductController.AddNewProduct);
router.post("/:id",ProductController.UpdateProduct);
//router.post("/Seller/:id",ProductController.UpdateSeller);

router.delete("/:id",ProductController.DeleteProductByID);

module.exports = router;