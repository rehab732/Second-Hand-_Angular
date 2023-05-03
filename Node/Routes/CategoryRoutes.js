const express = require("express");
const router = new express.Router();
const CategoryController = require("../Controllers/CategoryController");
const adminPermission = require("../Middlewares/adminPermission");

router.get("",CategoryController.GetAllCategories);
router.get("/:name", adminPermission, CategoryController.GetCategoryByName);

router.post("", adminPermission, CategoryController.AddNewCategory);

router.delete("/:name", adminPermission, CategoryController.DeleteCategoryByName);
router.put("/:name", adminPermission, CategoryController.UpdateCategoryByName);

module.exports = router;