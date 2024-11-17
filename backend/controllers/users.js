const { pool } = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const {
    user_name,
    first_name,
    last_name,
    email,
    password,
    country,
    birth_date,
    bio,
  } = req.body;

  const role_id = 1; //! create admin then switch to user

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (user_name,
      first_name,
      last_name,
      email,
      password,
      country,
      birth_date,
      bio,
       role_id) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING*`;
  const data = [
    user_name,
    first_name,
    last_name,
    email.toLowerCase(),
    hashedPassword,
    country,
    birth_date,
    bio,
    role_id,
  ];

  try {
    const result = await pool.query(query, data);

    res.status(200).json({
      success: true,
      message: "Account created successfully",
      result: result.rows[0],
    });
  } catch (error) {
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
  const query = `SELECT * FROM users WHERE is_deleted=0`;
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
  const query = `SELECT * FROM users u 
left JOIN followers f ON u.user_id=f.follower_id
WHERE u.user_id=$1 AND u.is_deleted=0`;
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length) {
      res.status(200).json({
        success: true,
        User: result.rows[0],
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
      error: error.message,
    });
  }
};

const getUserByUserName = async (req, res) => {
  const { searchUser } = req.query;

  const query = `SELECT * FROM users where userName=$1 And is_deleted=0`;
  main;

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
    user_name,
    first_name,
    last_name,
    email,
    password,
    country,
    birth_date,
    profile_image,
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
    user_name || null,
    first_name || null,
    last_name || null,
    email || null,
    updatedPassword || null,
    country || null,
    birth_date || null,
    profile_image || null,
    bio || null,
    id,
  ];

  const query = `UPDATE users SET user_name=COALESCE($1,user_name),first_name=COALESCE($2,first_name), last_name=COALESCE($3,last_name),email=COALESCE($4,email),password=COALESCE($5,password),country=COALESCE($6,country),birth_date=COALESCE($7,birth_date),profile_image=COALESCE($8,profile_image),bio=COALESCE($9,bio) where user_id=$10 RETURNING*`;

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
const ResetPassByEmail = async (req, res) => {
  const { email } = req.query;
  const { password } = req.body;
// console.log(email);
// console.log(password);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = `UPDATE users SET password=$1 where email=$2 RETURNING*`;
  const values = [hashedPassword, email];
  try {
    const result = await pool.query(query, values);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
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
  const query = `UPDATE users SET is_deleted=1 where user_id=$1`;

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

const hardDeletedUserById = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users where user_id=$1 RETURNING*`;
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
      message: error.message,
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
  hardDeletedUserById,
  ResetPassByEmail,
};
