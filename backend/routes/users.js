const express = require("express");
const usersRouter = express.Router();
const {
  Register,
  login,
  getAllUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

module.exports = usersRouter;
