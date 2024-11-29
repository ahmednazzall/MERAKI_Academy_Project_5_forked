const express = require("express");
const notifyRouter = express.Router();
const { getNotify } = require("../controllers/notifications");
const authentication = require("../middleware/authentication");
notifyRouter.get("/",authentication, getNotify);

module.exports = notifyRouter;
