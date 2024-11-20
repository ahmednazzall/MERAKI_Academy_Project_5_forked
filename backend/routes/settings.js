const express = require("express");
const settingsRouter = express.Router();
const { getHowToUse,updateGeneralSettings, updatePrivacySettings, updateSecuritySettings ,getContactUs,postContactUs} = require("../controllers/settings");

const authentication = require("../middleware/authentication");

settingsRouter.get("/howToUse", authentication, getHowToUse);
settingsRouter.post("/general", authentication, updateGeneralSettings);
settingsRouter.post("/privacy", authentication, updatePrivacySettings);
settingsRouter.post("/security", authentication, updateSecuritySettings);
settingsRouter.get("/contactUs", authentication, getContactUs);
settingsRouter.post("/contactUs", postContactUs);




module.exports = settingsRouter;