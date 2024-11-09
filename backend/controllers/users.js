const { pool } = require("../models/db");

const Register = async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    country,
    dateOfBirth,
    profileImage,
    bio,
  } = req.body;
  
};

const login = /*async*/ (req, res) => {};

const getAllUsers = /*async*/ (req, res) => {};

const getUserById = /*async*/ (req, res) => {};

const getUserByUserName = /*async*/ (req, res) => {};

const updateUserById = /*async*/ (req, res) => {};

const deleteUserById = /*async*/ (req, res) => {};

module.exports = {
  Register,
  login,
  getAllUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  deleteUserById,
};
