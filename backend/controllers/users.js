const { pool } = require("../models/db");



const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);
const jwt = require("jsonwebtoken");

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

  const role_id = 3; //! create admin then switch to user

  
  
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
   
    
    const result = await pool.query(query, data);
   
    res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    
    res.status(409).json({
      success: false,
      message: "The email already exists",
      error: error.message,
    });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;
  const values = [email.toLowerCase()];
  const query = `SELECT * FROM users where email=$1`;
  try {
    const result = await pool.query(query, values);
    if (result.rows.length) {
      try {
        const valid = await bcrypt.compare(password, result.rows[0].password);
        if (valid) {
          const payload = {
            userId: result.rows[0].user_id,
            role_id: result.rows[0].role_id,
            country: result.rows[0].country,
          };
          const options = { expiresIn: "1d" };
          const token = jwt.sign(payload, process.env.SECRET, options);
          if (token) {
            return res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              userId: result.rows[0].user_id,
              token,
            });
          } else {
            throw Error;
          }
        } else {
          res.status(403).json({
            success: false,
            message: `The email doesn’t exist or the password you’ve entered is incorrect`,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: `The email doesn’t exist or the password you’ve entered is incorrect`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  const query = `SELECT * FROM users`;
  try {
    const result = await pool.query(query);
    if (result.rows.length) {
      res.status(200).json({
        success: true,
        Users: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No users",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM users where user_id=$1`;
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length) {
      res.status(200).json({
        success: true,
        User: result.rows,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "User does not exist ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error,
    });
  }
};

const getUserByUserName = async (req, res) => {
  const { searchUser } = req.query;
  const query = `SELECT * FROM users where userName=$1`;

  try {
    const result = await pool.query(query, [searchUser]);
    if (result.rows.length) {
      res.status(200).json({
        success: true,
        User: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User does not exist ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error,
    });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
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
  let updatedPassword = "";
  if (password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    updatedPassword = hashedPassword;
  } else {
    updatedPassword = password;
  }

  const values = [
    userName || null,
    firstName || null,
    lastName || null,
    email || null,
    updatedPassword || null,
    country || null,
    dateOfBirth || null,
    profileImage || null,
    bio || null,
    id,
  ];
  const query = `UPDATE users SET userName=COALESCE($1,userName),firstName=COALESCE($2,firstName), lastName=COALESCE($3,lastName),email=COALESCE($4,email),password=COALESCE($5,password),country=COALESCE($6,country),dateOfBirth=COALESCE($7,dateOfBirth),profileImage=COALESCE($8,profileImage),bio=COALESCE($9,bio) where user_id=$10 RETURNING*`;

  try {
    const result = await pool.query(query, values);
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error,
    });
  }
};

const SoftDeleteUserById = async (req, res) => {
  const { id } = req.params;
  const query = `UPDATE users SET is_deleted=1 where user_id=$1 RETURNING*`;

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length) {
      res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
      error,
    });
  }
};




module.exports = {
  Register,
  login,
  getAllUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  SoftDeleteUserById,
};
