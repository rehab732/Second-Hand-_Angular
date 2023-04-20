const express = require("express");
const router = new express.Router();
const CharityController = require("../Controllers/CharityController");

router.get("",CharityController.GetAllCharities);
router.get("/ById/:id",CharityController.GetCharityById);

router.post("",CharityController.AddNewCharity);

router.put("/:name",CharityController.UpdateCharityByName);
router.put("/DonatedItems/:name",CharityController.UpdateCharityDonatedItems);

router.delete("/:name",CharityController.DeleteCharityByName);
router.delete("/By/Id/:id",CharityController.DeleteCharityByID);

module.exports = router;