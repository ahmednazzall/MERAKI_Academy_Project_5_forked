const express = require("express");
const settingsRouter = express.Router();
const { getHowToUse,updateGeneralSettings, updatePrivacySettings, updateSecuritySettings ,getContactUs,postContactUs} = require("../controllers/settings");

const authentication = require("../middleware/authentication");

settingsRouter.get("/howToUse", authentication, getHowToUse);
settingsRouter.put("/general", authentication, updateGeneralSettings);
settingsRouter.put("/privacy", authentication, updatePrivacySettings);
settingsRouter.put("/security", authentication, updateSecuritySettings);
settingsRouter.put("/contactUs", authentication, getContactUs);
settingsRouter.put("/contactUs", postContactUs);




module.exports = settingsRouter;