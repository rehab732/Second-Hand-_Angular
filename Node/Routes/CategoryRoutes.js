const express = require("express");
const router = new express.Router();
const CategoryController = require("../Controllers/CategoryController");

router.get("",CategoryController.GetAllCategories);
router.get("/:name",CategoryController.GetCategoryByName);

router.post("",CategoryController.AddNewCategory);

router.delete("/:name",CategoryController.DeleteCategoryByName);
router.put("/:name",CategoryController.UpdateCategoryByName);

module.exports = router;