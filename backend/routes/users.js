const express = require("express");
const usersRouter = express.Router();
const {
  Register,
  login,
  getAllUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  SoftDeleteUserById,
} = require("../controllers/users");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
usersRouter.post("/register", Register);
usersRouter.post("/login", login);
usersRouter.get("/all", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/", getUserByUserName);
usersRouter.put("/:id", updateUserById);
usersRouter.put("/sd/:id", SoftDeleteUserById);



module.exports = usersRouter;

/* 
register/Admin
{
    "userName":"AdminMansaf",
    "firstName":"Admin",
    "lastName":"Mansaf",
    "email":"AdminMansaf@gmail.com",
    "password":"123456",
    "country":"jo",
    "dateOfBirth":"1990/08/17",
    "profileImage":"https://www.google.com/imgres?q=john%20doe&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F5a%2FJohn_Doe%252C_born_John_Nommensen_Duchac.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FJohn_Doe_(musician)&docid=RSC-F2QpZef7-M&tbnid=wZtxbxnhZbjNrM&vet=12ahUKEwjq3uCB8s2JAxX_xgIHHSAtNbAQM3oECB0QAA..i&w=1280&h=1765&hcb=2&ved=2ahUKEwjq3uCB8s2JAxX_xgIHHSAtNbAQM3oECB0QAA",
    "bio":"no bio"
}


register/user
{
    "userName":"Abd",
    "firstName":"Abd",
    "lastName":"Aljamal",
    "email":"Abd@gmail.com",
    "password":"123456",
    "country":"jo",
    "dateOfBirth":"1990/08/17",
    "profileImage":"https://www.google.com/imgres?q=john%20doe&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F5a%2FJohn_Doe%252C_born_John_Nommensen_Duchac.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FJohn_Doe_(musician)&docid=RSC-F2QpZef7-M&tbnid=wZtxbxnhZbjNrM&vet=12ahUKEwjq3uCB8s2JAxX_xgIHHSAtNbAQM3oECB0QAA..i&w=1280&h=1765&hcb=2&ved=2ahUKEwjq3uCB8s2JAxX_xgIHHSAtNbAQM3oECB0QAA",
    "bio":"no bio"
}


*/

