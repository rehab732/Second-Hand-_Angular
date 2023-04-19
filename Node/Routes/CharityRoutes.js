const express = require("express");
const router = new express.Router();
const CharityController = require("../Controllers/CharityController");

router.get("",CharityController.GetAllCharities);

router.post("",CharityController.AddNewCharity);

router.delete("/:name",CharityController.DeleteCharityByName);

module.exports = router;