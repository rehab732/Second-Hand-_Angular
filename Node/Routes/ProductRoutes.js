const express = require("express");
const router = new express.Router();
const ProductController = require("../Controllers/ProductController");

router.get("",ProductController.GetAllProducts);
router.get("/:id",ProductController.GetProductById);

router.post("",ProductController.AddNewProduct);

router.delete("/:id",ProductController.DeleteProductByID);

module.exports = router;