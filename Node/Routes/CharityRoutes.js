const express = require("express");
const router = new express.Router();
const CharityController = require("../Controllers/CharityController");

router.get("",CharityController.GetAllCharities);
router.get("/ById/:id",CharityController.GetCharityById);

router.post("",CharityController.AddNewCharity);

router.delete("/:name",CharityController.DeleteCharityByName);
router.delete("/By/Id/:id",CharityController.DeleteCharityByID);

module.exports = router;