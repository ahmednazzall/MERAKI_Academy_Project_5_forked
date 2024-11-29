const express=require("express")
const messageRouter=express.Router()
const authentication = require("../middleware/authentication")
const { getMessages} = require("../controllers/messages")

messageRouter.get("/:senderId/:receiverId",getMessages)



module.exports=messageRouter
