const express = require("express");
const greetingRouter = express.Router();
const { sendGreeting } = require("../controllers/greeting");

const authentication = require("../middleware/authentication");
greetingRouter.post("/send", authentication, sendGreeting);


module.exports = greetingRouter;