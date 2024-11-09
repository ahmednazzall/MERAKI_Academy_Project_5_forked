const { pool } = require("../models/db");
const bcrypt=require("bcrypt")
const saltRounds=parseInt(process.env.SALT)
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
  const role_id = "4"; //! create admin then switch to user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `INSERT INTO users (userName,
      firstName,
      lastName,
      email,
      password,
      country,
      dateOfBirth,
      profileImage,
      bio,
       role_id) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
    const data = [
      userName,
      firstName,
      lastName,
      email.toLowerCase(),
      hashedPassword,
      country,
      dateOfBirth,
      profileImage,
      bio,
      role_id,
    ];
  
  try {
    const result= await pool.query(query,data)
    res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "The email already exists",
      error:error.message,
    });
  }
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
