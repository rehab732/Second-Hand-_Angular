const express = require("express");
const router = new express.Router();
const CharityController = require("../Controllers/CharityController");
const adminPermission = require("../Middlewares/adminPermission");

router.get("",CharityController.GetAllCharities);
router.get("/ById/:id", adminPermission,CharityController.GetCharityById);

router.post("", adminPermission,CharityController.AddNewCharity);

router.put("/:name", adminPermission,CharityController.UpdateCharityByName);
router.put("/DonatedItems/:name",CharityController.UpdateCharityDonatedItems);

router.delete("/:name", adminPermission, CharityController.DeleteCharityByName);
router.delete("/By/Id/:id", adminPermission, CharityController.DeleteCharityByID);

module.exports = router;