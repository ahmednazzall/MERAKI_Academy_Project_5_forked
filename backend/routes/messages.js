const express=require("express")
const messageRouter=express.Router()
const authentication = require("../middleware/authentication")
const { saveMessages ,getMessages} = require("../controllers/messages")
messageRouter.post("/",authentication,saveMessages)
messageRouter.get("/:senderId/:receiverId",getMessages)



module.exports=messageRouter
